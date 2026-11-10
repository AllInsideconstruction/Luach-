// Transcribes 16 kHz mono audio on the device with Whisper (transformers.js).
// The audio is cut into windows of at most 30 seconds, each cut placed at the quietest
// moment near the end of the window so words are not split.
import { pipeline, env } from "./vendor/transformers.min.js";

env.allowLocalModels = false;
env.useBrowserCache = true;
env.backends.onnx.wasm.wasmPaths = new URL("./vendor/", self.location.href).href;
env.backends.onnx.wasm.numThreads = self.crossOriginIsolated ? Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 1)) : 1;

const MODELS = {
  tiny: "onnx-community/whisper-tiny",
  base: "onnx-community/whisper-base",
  small: "onnx-community/whisper-small",
};
const SR = 16000, MAXW = 30 * SR, MINW = 20 * SR, FRAME = SR / 10;

let asr = null, loadedKey = "", device = "";

async function pickDevice() {
  try {
    if (navigator.gpu) {
      const a = await navigator.gpu.requestAdapter();
      if (a) return "webgpu";
    }
  } catch (_) {}
  return "wasm";
}

async function load(model, dev) {
  const key = model + "|" + dev;
  if (asr && loadedKey === key) return asr;
  if (asr) { try { await asr.dispose(); } catch (_) {} asr = null; }
  const files = {};
  let last = 0;
  asr = await pipeline("automatic-speech-recognition", MODELS[model] || MODELS.base, {
    device: dev,
    dtype: dev === "webgpu" ? { encoder_model: "fp32", decoder_model_merged: "q4" } : "q8",
    progress_callback: p => {
      if (p.status === "progress" && p.total) {
        files[p.file] = [p.loaded, p.total];
        const now = Date.now();
        if (now - last < 250 && p.loaded < p.total) return;
        last = now;
        let l = 0, t = 0;
        for (const [a, b] of Object.values(files)) { l += a; t += b; }
        postMessage({ type: "download", loaded: l, total: t });
      }
    },
  });
  loadedKey = key;
  return asr;
}

function frameRms(a, from, to) {
  let s = 0;
  for (let i = from; i < to; i++) s += a[i] * a[i];
  return Math.sqrt(s / Math.max(1, to - from));
}
// quietest 100 ms frame between from and to; returns the sample to cut at
function quietest(a, from, to) {
  let best = to, bestV = Infinity;
  for (let i = from; i + FRAME <= to; i += FRAME / 2) {
    const v = frameRms(a, i, i + FRAME);
    if (v < bestV) { bestV = v; best = i + FRAME / 2; }
  }
  return Math.floor(best);
}
function loudest(a, from, to) {
  let m = 0;
  for (let i = from; i + FRAME <= to; i += FRAME) m = Math.max(m, frameRms(a, i, i + FRAME));
  return m;
}

self.onmessage = async e => {
  const { audio, start, model, lang } = e.data;
  try {
    if (!device) device = await pickDevice();
    postMessage({ type: "status", text: "Loading the speech model…" });
    try {
      await load(model, device);
    } catch (err) {
      if (device === "wasm") throw err;
      device = "wasm"; // graphics chip failed: fall back to the processor
      await load(model, device);
    }
    postMessage({ type: "ready", device, threads: env.backends.onnx.wasm.numThreads });

    const opts = { return_timestamps: true, task: "transcribe" };
    if (lang && lang !== "auto") opts.language = lang;

    let pos = Math.floor((start || 0) * SR);
    let prevText = "";
    while (pos < audio.length) {
      let end = Math.min(audio.length, pos + MAXW);
      if (end < audio.length) end = quietest(audio, pos + MINW, end);
      const off = pos / SR;
      let segs = [];
      // skip windows that are silence: Whisper tends to invent words for them
      if (end - pos > SR / 2 && loudest(audio, pos, end) > 0.006) {
        const slice = audio.slice(pos, end);
        const out = await asr(slice, opts);
        const chunks = out.chunks && out.chunks.length ? out.chunks : [{ timestamp: [0, slice.length / SR], text: out.text || "" }];
        for (const c of chunks) {
          const t = (c.text || "").trim();
          if (!t || t === prevText || /^\[.*\]$|^\(.*\)$/.test(t)) continue;
          prevText = t;
          const s0 = c.timestamp && c.timestamp[0] != null ? c.timestamp[0] : 0;
          const s1 = c.timestamp && c.timestamp[1] != null ? c.timestamp[1] : slice.length / SR;
          segs.push({ s: +(off + s0).toFixed(2), e: +(off + Math.min(s1, slice.length / SR)).toFixed(2), t });
        }
      }
      pos = end;
      postMessage({ type: "segs", segs, upto: pos / SR, total: audio.length / SR });
    }
    postMessage({ type: "done" });
  } catch (err) {
    postMessage({ type: "error", message: String((err && err.message) || err) });
  }
};

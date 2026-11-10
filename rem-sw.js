/* Reminders: offline copy of the app, and Done/Snooze buttons on alerts. */
const CACHE="reminders-v1";
const SHELL=["reminders.html","rem-core.js","hebcal.js","reminders.webmanifest","rem-icon.svg","rem-icon-192.png","rem-icon-512.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).catch(()=>{}).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("reminders-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET"||u.origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(res=>{ if(res.ok){ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); } return res; })
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("reminders.html"))));
});
self.addEventListener("notificationclick",e=>{
  const n=e.notification, d=n.data||{}; n.close();
  const type=e.action==="done"?"done":e.action==="snooze"?"snooze":null;
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
    const c=list.find(w=>/reminders/.test(w.url))||list[0];
    if(c){ if(type) c.postMessage({type,id:d.id,k:d.k}); return c.focus&&c.focus(); }
    const q=type?"?"+type+"="+encodeURIComponent(d.id)+"&k="+encodeURIComponent(d.k):"?view=today";
    return self.clients.openWindow("reminders.html"+q);
  }));
});

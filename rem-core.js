/* Shared reminder rules for the Luach and the Reminders app.
   A reminder is {id, title, date:"YYYY-MM-DD", time:"HH:MM"|"", repeat, hd, hm, hy, done:{ymd:1}, ...}
   Optional: every (interval), days (weekly weekdays 0-6), until (YYYY-MM-DD), list, flag, prio, notes, before, steps, snooze. */
(function(g){
"use strict";
const pad = n => String(n).padStart(2,"0");
const ymd = d => d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const parseYmd = s => { const [y,m,d]=String(s).split("-").map(Number); return new Date(y,m-1,d); };
const dayNum = d => Math.round(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5);
const dim = (y,m) => new Date(y,m+1,0).getDate();
const WD = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const ORD = n => n+(n%100>=11&&n%100<=13?"th":["th","st","nd","rd"][n%10]||"th");

function occursOn(r,d){
  if(!r || !r.date) return false;
  const k=ymd(d); if(k<r.date) return false; if(r.until && k>r.until) return false;
  const s=parseYmd(r.date), n=Math.max(1,parseInt(r.every,10)||1);
  switch(r.repeat){
    case "daily": return (dayNum(d)-dayNum(s))%n===0;
    case "weekdays": return d.getDay()>0 && d.getDay()<6;
    case "weekly": {
      const days=(r.days&&r.days.length)?r.days:[s.getDay()];
      if(!days.includes(d.getDay())) return false;
      return ((dayNum(d)-d.getDay())-(dayNum(s)-s.getDay()))/7 % n===0;
    }
    case "monthly": {
      const m=(d.getFullYear()-s.getFullYear())*12+d.getMonth()-s.getMonth(); if(m%n) return false;
      return d.getDate()===Math.min(s.getDate(), dim(d.getFullYear(),d.getMonth()));
    }
    case "yearly": {
      if((d.getFullYear()-s.getFullYear())%n || d.getMonth()!==s.getMonth()) return false;
      return d.getDate()===Math.min(s.getDate(), dim(d.getFullYear(),d.getMonth()));
    }
    case "hebyearly": {
      try{ const {HDate,HebrewCalendar}=g.hc; const o=HebrewCalendar.getBirthdayOrAnniversary(new HDate(d).getFullYear(), new HDate(r.hd,r.hm,r.hy)); return !!o && ymd(o.greg())===k; }catch(e){ return false; }
    }
    case "hebmonthly": {
      try{ const h=new g.hc.HDate(d); return h.getDate()===Math.min(r.hd, h.daysInMonth()); }catch(e){ return false; }
    }
    default: return k===r.date;
  }
}

/* next n dates (local midnight) on or after `from` that the reminder falls on */
function nextOcc(r, from, n){
  const out=[]; if(!r || !r.date) return out;
  if(r.repeat==="hebyearly" && g.hc){ // jump year by year instead of testing every day
    try{
      const {HDate,HebrewCalendar}=g.hc, s=parseYmd(r.date), start=(from&&from>s)?from:s, startK=ymd(start), orig=new HDate(r.hd,r.hm,r.hy);
      let hy=new HDate(start).getFullYear();
      for(let i=0;i<(n||1)+5 && out.length<(n||1);i++,hy++){
        const o=HebrewCalendar.getBirthdayOrAnniversary(hy,orig); if(!o) continue;
        const gd=o.greg(), k=ymd(gd); if(k<startK) continue; if(r.until && k>r.until) break; out.push(new Date(gd.getFullYear(),gd.getMonth(),gd.getDate()));
      }
      return out;
    }catch(e){ out.length=0; }
  }
  let d=parseYmd(r.date); if(from && d<from) d=new Date(from.getFullYear(),from.getMonth(),from.getDate());
  for(let i=0;i<4000 && out.length<(n||1);i++){ const x=new Date(d); x.setDate(x.getDate()+i); if(r.until && ymd(x)>r.until) break; if(occursOn(r,x)) out.push(x); }
  return out;
}

function repeatText(r){
  const n=Math.max(1,parseInt(r.every,10)||1);
  switch(r.repeat){
    case "daily": return n>1?`Every ${n} days`:"Every day";
    case "weekdays": return "Every weekday";
    case "weekly": { const s=r.date?parseYmd(r.date):new Date(); const days=(r.days&&r.days.length?r.days:[s.getDay()]).slice().sort();
      return (n>1?`Every ${n} weeks`:"Every week")+" on "+days.map(x=>WD[x]).join(", "); }
    case "monthly": return n>1?`Every ${n} months`:"Every month";
    case "yearly": return n>1?`Every ${n} years`:"Every year";
    case "hebyearly": { let t=""; try{ t=" ("+new g.hc.HDate(r.hd,r.hm,r.hy).render("en",false).replace(/^(\d+)\w+ of /,"$1 ")+")"; }catch(e){} return "Every year on the Hebrew date"+t; }
    case "hebmonthly": return "Every Hebrew month on the "+ORD(r.hd||1);
    default: return "";
  }
}

/* iCalendar RRULE for a reminder, or null when it has to be written out as dates */
function rrule(r){
  const BY=["SU","MO","TU","WE","TH","FR","SA"], s=parseYmd(r.date), n=Math.max(1,parseInt(r.every,10)||1);
  const iv=n>1?";INTERVAL="+n:"", un=r.until?";UNTIL="+r.until.replace(/-/g,"")+"T235959Z":"";
  switch(r.repeat){
    case "daily": return "RRULE:FREQ=DAILY"+iv+un;
    case "weekdays": return "RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"+un;
    case "weekly": return "RRULE:FREQ=WEEKLY"+iv+";BYDAY="+((r.days&&r.days.length?r.days:[s.getDay()]).map(x=>BY[x]).join(","))+un;
    case "monthly": return "RRULE:FREQ=MONTHLY"+iv+";BYMONTHDAY="+s.getDate()+un;
    case "yearly": return "RRULE:FREQ=YEARLY"+iv+un;
    default: return null;
  }
}

g.RemCore = {occursOn, nextOcc, repeatText, rrule, ymd, parseYmd, dayNum};
})(typeof window!=="undefined"?window:globalThis);

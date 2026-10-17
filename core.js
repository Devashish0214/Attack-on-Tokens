const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TS={st:JSON.parse(sessionStorage.ts||'{}'),busy:false,captcha:false,
save(){sessionStorage.ts=JSON.stringify(this.st)},
n(k){this.st[k]=(this.st[k]||0)+1;this.save();return this.st[k]},
free(){return !this.busy&&!this.captcha}};
// id, name, trigger, escape condition. Set enabled:false to switch a mechanic off.
const CHAOS_REGISTRY=[
[1,'Escalating password rules','each rule satisfied','7 rules, then it stops'],
[2,'Date picker from hell','year starts at 1900, 250ms step limit','typing unlocks after 3 failed attempts'],
[3,'Shrinking character limit','typing in bio','floor of 40 characters'],
[4,'Fields that clear','blur on one random non-critical field','once per session'],
[5,'Late validation','Save click','one error per submit, list is finite'],
[6,'Mandatory fields for nothing','Save click','any non-empty value passes'],
[7,'Dodging Save button','mouse nearby','stops after 5 dodges, keyboard focus, or touch'],
[8,'Swapped labels','every 4s','actions never change'],
[9,'Fake Back button','click','native browser back works'],
[10,'Shuffling nav','hover nav','items always clickable'],
[11,'Infinite breadcrumb','nav/Save click','click Home to reset'],
[12,'Click-5 confirm','confirmation step','5 clicks within 1.5s gaps'],
[13,'Fake loading bars','saving, access request','always finishes in ~10s'],
[14,'Arguing confirmation dialogs','after valid Save','3 stages max, trivia has hint'],
[15,'Cookie banner, 40 toggles','page load','Accept at bottom; Reject after all toggled off'],
[16,'Edit mode timeout','30s of editing','Request edit access flow'],
[17,'Session expiry mid-edit','20s of editing, once per session','sign in + CAPTCHA, draft preserved'],
[18,'Maintenance popups','random, 20-40s','3-5s, max 4, never during CAPTCHA/dialogs'],
[19,'Lying completeness meter','typing','jumps to 100% on final save'],
[20,'Flipping theme','scroll past 300px and 700px','contrast kept in both themes'],
[21,'Absurd CAPTCHA','session expiry','any selection accepted on 3rd attempt'],
[22,'Pixel-exact slider','final save','arrow keys give fine control'],
[23,'Expiring email code','final save','unlimited resend'],
[24,'Speed limit','7+ characters typed in 1s','field frozen for 2s only'],
[25,'Phantom autocorrect','email blur without a full domain','backspace twice, or type a full domain'],
[26,'Autosave regret','20s into writing the bio, once per session','Undo restores your text once'],
[27,'Rate limiter','3 quick actions in 5s','lifts after 10s'],
[28,'Cursor drift','every 8-15s','lasts 1.5s, never during dialogs'],
[29,'Runaway checkbox','mouse nearby','hold the mouse button, Tab + Space, or touch'],
[30,'Scroll resistance','wheel in Terms box near the bottom','slows to 25%, never stops; scrollbar unaffected'],
[31,'Reverse scroll zone','wheel in handbook box','dashed edge marks it; page scrolls at its limits']
].map(([id,name,trigger,escape])=>({id,name,trigger,escape,enabled:true}));
const on=id=>CHAOS_REGISTRY.find(m=>m.id===id).enabled;
TS.open=h=>{const o=$('#ov');o.hidden=false;TS.busy=true;o.innerHTML=`<div class="modal">${h}</div>`;return o.firstChild};
TS.close=()=>{$('#ov').hidden=true;TS.busy=false};
TS.ask=(h,btns)=>new Promise(r=>{const m=TS.open(h+'<div class="mb"></div>');btns.forEach(([t,v])=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{TS.close();r(v)};m.lastChild.append(b)})});
TS.load=async t=>{if(!on(13))return;TS.open(`<p>${t}</p><div class="bar"><i id="lb"></i></div><small id="lt">0%</small>`);const b=$('#lb'),l=$('#lt');
for(const[p,d]of[[60,1500],[35,1200],[90,2500],[99,2000],[99,2000],[100,600]]){b.style.transitionDuration=d+'ms';b.style.width=p+'%';l.textContent=p+'%';await sleep(d)}TS.close()};

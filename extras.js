const note=(h,ms=3000)=>{const n=$('#note');n.innerHTML=h;n.hidden=false;clearTimeout(note.t);note.t=setTimeout(()=>n.hidden=true,ms)};
const C=['The user agrees to be agreeable.','Synergy shall be maintained at all times.','Profile data may be reviewed by a committee of one.','Any joy detected will be reported.','These terms were last updated tomorrow.','The company is not liable for liability.'];
$('#tc').innerHTML=Array.from({length:40},(_,i)=>`<p><b>${i+1}.</b> ${C[i%6]}</p>`).join('');
$('#rv').innerHTML=Array.from({length:20},(_,i)=>`<p>Handbook item ${i+1}: ${C[(i+2)%6]}</p>`).join('');
const _v=validate;validate=()=>_v()||(!$('#tca').checked?'Please accept the Terms and Conditions.':'')||(!$('#nr').checked?'Please confirm you are not a robot.':'');
// wheel helper: only intercepts when the box can actually move, so the page never gets trapped
const wheelBox=(box,fn)=>box.addEventListener('wheel',e=>{const max=box.scrollHeight-box.clientHeight,nt=Math.min(max,Math.max(0,box.scrollTop+fn(e.deltaY,max-box.scrollTop)));if(nt===box.scrollTop)return;e.preventDefault();box.scrollTop=nt},{passive:false});
// 24 speed limit
M(24,()=>{const T=[];$('#fs').addEventListener('input',e=>{const t=e.target;if(!e.isTrusted||!/^(INPUT|TEXTAREA)$/.test(t.tagName)||/range|checkbox/.test(t.type)||t.readOnly)return;T.push(Date.now());if(T.length>7)T.shift();
if(T.length==7&&T[6]-T[0]<1000){T.length=0;t.readOnly=true;note('Please slow down. Our servers are tired.',2000);setTimeout(()=>{t.readOnly=false;t.focus()},2000)}})});
// 25 phantom autocorrect
M(25,()=>{const f=$('#f-email');let inj='',bs=0;
f.addEventListener('blur',()=>{const v=f.value.trim();if(v&&!/@[^@\s]+\.[^@\s]+$/.test(v)){inj=v.split('@')[0];f.value=inj+'@synergycorp.com';bs=0;note('Email helpfully completed.');pct();draft()}});
f.addEventListener('keydown',e=>{if(e.key=='Backspace'&&inj&&f.value==inj+'@synergycorp.com'){e.preventDefault();if(++bs>=2){f.value=inj;inj='';bs=0;pct();draft()}}})});
// 26 autosave regret
M(26,()=>{const b=$('#f-bio');let started=0,snap=null;const fire=d=>setTimeout(()=>{if(!TS.free())return fire(2000);const cur=b.value;if(snap===null||snap===cur){started=0;snap=null;return}
TS.st.asr=1;TS.save();b.value=snap;b.dispatchEvent(new Event('input',{bubbles:true}));note('Autosave restored an earlier version of your bio. <button id="un">Undo</button>',9000);
$('#un').onclick=()=>{b.value=cur;b.dispatchEvent(new Event('input',{bubbles:true}));$('#un').remove()}},d);
b.addEventListener('input',e=>{if(started||TS.st.asr||!e.isTrusted)return;started=1;setTimeout(()=>snap=b.value,6000);fire(20000)})});
// 27 rate limiter
M(27,()=>{const A=[];let lim=0;document.addEventListener('click',e=>{if(!e.target.closest('#save,#cancel,#nav a,#ds,#back')||TS.busy||!e.isTrusted)return;
if(lim){e.stopImmediatePropagation();e.preventDefault();return}A.push(Date.now());if(A.length>3)A.shift();
if(A.length==3&&A[2]-A[0]<5000){A.length=0;lim=10;const iv=setInterval(()=>{if(lim<=0)return clearInterval(iv);note(`You are being productive too fast. Try again in ${lim}s.`,1200);lim--},1000);note('You are being productive too fast. Try again in 10s.',1200)}},true)});
// 28 cursor drift
M(28,()=>{const fc=document.createElement('div');fc.id='fc';fc.hidden=true;document.body.append(fc);const h=[];let m=0,mode=0;
addEventListener('mousemove',e=>{h.push([e.clientX,e.clientY,Date.now()]);if(h.length>120)h.shift()});
const tick=()=>{if(!m)return;const n=Date.now(),l=h[h.length-1];if(l){const p=mode?[innerWidth-l[0],innerHeight-l[1]]:(h.find(q=>q[2]>=n-400)||l);fc.style.transform=`translate(${p[0]}px,${p[1]}px)`}requestAnimationFrame(tick)};
(function go(){setTimeout(()=>{if(TS.free()&&h.length){m=1;mode=Math.random()<.5;document.body.classList.add('drift');fc.hidden=false;tick();setTimeout(()=>{m=0;document.body.classList.remove('drift');fc.hidden=true},1500)}go()},8000+Math.random()*7000)})()});
// 29 runaway checkbox
M(29,()=>{const w=$('#rbw'),l=$('#rb'),cb=$('#nr');let held=0,out=0,t=0,coarse=matchMedia('(pointer:coarse)').matches;addEventListener('touchstart',()=>coarse=true,{once:true});
document.addEventListener('mousedown',e=>{held=1;out=!l.contains(e.target)});document.addEventListener('mouseup',e=>{if(held&&out&&l.contains(e.target))cb.checked=true;held=0});
document.addEventListener('mousemove',e=>{if(held||coarse||document.activeElement===cb||Date.now()-t<300)return;const r=l.getBoundingClientRect();if(Math.hypot(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2)>r.width/2+30)return;t=Date.now();l.style.left=Math.random()*(w.clientWidth-r.width)+'px'})});
// 30 scroll resistance (Terms box), accept unlocks at the bottom
M(30,()=>wheelBox($('#tc'),(d,rem)=>d>0&&rem<150?d*.25:d));
if(!on(30))$('#tca').disabled=false;else $('#tc').onscroll=e=>{const b=e.target;if(b.scrollHeight-b.clientHeight-b.scrollTop<4)$('#tca').disabled=false};
// 31 reverse scroll zone
M(31,()=>wheelBox($('#rv'),d=>-d));

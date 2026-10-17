const M=(id,f)=>on(id)&&f();
const ids=['f-name','f-email','f-pass','f-bio','f-title','f-loc','m1','m2','m3'],LBL=["Mother's maiden name of your favorite pet",'Employee ID of your cat','Colour of your Wi-Fi password'];
let shown=1,dob=null,cr=['Home','Profile','Edit'];
// 1 password rules
const day=new Date().toLocaleDateString('en',{weekday:'short'}).toLowerCase();
const RULES=[['At least 8 characters',p=>p.length>=8],['An uppercase letter',p=>/[A-Z]/.test(p)],['A digit',p=>/\d/.test(p)],['A symbol',p=>/[^\w\s]/.test(p)],
['Not the first letter of your name',p=>{const c=($('#f-name').value.trim()[0]||'').toLowerCase();return !c||!p.toLowerCase().includes(c)}],
['A 3-character palindrome (e.g. aba)',p=>/(.).\1/.test(p)],[`Today's weekday abbreviation ("${day}")`,p=>p.toLowerCase().includes(day)]];
function rr(){const p=$('#f-pass').value;if(on(1))while(shown<7&&RULES.slice(0,shown).every(r=>r[1](p)))shown++;
$('#rules').innerHTML=RULES.slice(0,on(1)?shown:1).map(r=>`<li class="${r[1](p)?'ok':'no'}">${r[1](p)?'✓':'○'} ${r[0]}</li>`).join('')}
const passOk=()=>RULES.slice(0,on(1)?7:1).every(r=>r[1]($('#f-pass').value))&&(!on(1)||shown===7);
// 2 date picker
const dd={y:1900,m:1,d:1};let lt=0,fails=0;
$('#dp').innerHTML=[['y','Year'],['m','Month'],['d','Day']].map(([k,n])=>`${n} <button type="button" data-k="${k}" data-s="-1">−</button><b id="db-${k}">${dd[k]}</b><button type="button" data-k="${k}" data-s="1">+</button>`).join(' ')+' <button type="button" id="ds">Set date</button> <span id="dv"></span>';
function setd(y,m,d){const D=new Date(y,m-1,d),a=(Date.now()-D)/31557600000;if(D.getMonth()===m-1&&a>=18&&a<=100){dob=`${y}-${m}-${d}`;$('#dv').textContent='Set: '+dob;draft();return 1}
$('#dv').textContent='Not a valid adult date of birth.';if(++fails>=3&&on(2))$('#dtxt').hidden=false}
$('#dp').onclick=e=>{const b=e.target,k=b.dataset.k;if(k){if(Date.now()-lt<250)return;lt=Date.now();const mx={y:new Date().getFullYear(),m:12,d:31}[k],mn=k=='y'?1900:1;dd[k]=Math.min(mx,Math.max(mn,dd[k]+ +b.dataset.s));$('#db-'+k).textContent=dd[k]}else if(b.id=='ds')setd(dd.y,dd.m,dd.d)};
$('#dtxt').onchange=e=>{const m=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(e.target.value);m?setd(+m[1],+m[2],+m[3]):$('#dv').textContent='Use YYYY-MM-DD.'};
// draft, meter, bio limit, field clearing
function draft(){TS.st.dr=Object.fromEntries(ids.filter(i=>i!='f-pass').map(i=>[i,$('#'+i).value]));TS.st.dr.dob=dob;TS.save()}
function pct(){const n=ids.filter(i=>$('#'+i).value).length;M(19,()=>{$('#pct').textContent=$('#pbar').style.width=Math.max(3,60-6*n)+'%';$('#pct').textContent+=''});$('#hname').textContent=$('#f-name').value||'Your name'}
$('#fs').addEventListener('input',e=>{if(e.target.id=='f-pass')rr();if(e.target.id=='f-bio'){const t=e.target,L=t.value.length,lim=on(3)?Math.max(40,280-L):280;if(L>lim)t.value=t.value.slice(0,lim);$('#bc').textContent=`${t.value.length}/${on(3)?Math.max(40,280-t.value.length):280}`}pct();draft()});
TS.st.cf=TS.st.cf||['f-title','f-loc'][Math.floor(Math.random()*2)];
$('#fs').addEventListener('focusout',e=>{if(on(4)&&e.target.id===TS.st.cf&&e.target.value&&!TS.st.cleared){TS.st.cleared=1;TS.save();e.target.value='';pct()}});
if(TS.st.dr){ids.forEach(i=>{if(TS.st.dr[i])$('#'+i).value=TS.st.dr[i]});if(TS.st.dr.dob){dob=TS.st.dr.dob;$('#dv').textContent='Set: '+dob}}
rr();pct();
// 11 breadcrumb, 10 nav, 9 back
function rc(){$('#crumbs').innerHTML=cr.map((c,i)=>`<a data-i="${i}">${c}</a>`).join(' › ')}
const crumb=l=>{if(on(11)){cr.push(l);rc()}};rc();
$('#crumbs').onclick=e=>{if(e.target.dataset.i==='0'){cr=['Home'];rc()}};
$('#nav').onclick=e=>{if(e.target.tagName=='A'){crumb(e.target.textContent);crumb('Edit')}};
M(10,()=>$('#nav').onmouseenter=()=>{const n=$('#nav');[...n.children].sort(()=>Math.random()-.5).forEach(c=>n.append(c))});
M(9,()=>$('#back').onclick=()=>Math.random()<.5?location.reload():(history.forward(),crumb('Forward')));
// 7 dodging save, 8 swapped labels
M(7,()=>{const b=$('#save');let dn=0,t=0,px=0,py=0,coarse=matchMedia('(pointer:coarse)').matches;addEventListener('touchstart',()=>coarse=true,{once:true});
document.addEventListener('mousemove',e=>{if(dn>=5||coarse||TS.busy||document.activeElement===b||Date.now()-t<350)return;const r=b.getBoundingClientRect();
if(Math.hypot(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2)>90)return;t=Date.now();if(++dn>=5){px=py=0;b.style.transform='';return}
const nl=r.left-px,nt=r.top-py;px=Math.min(Math.max((Math.random()-.5)*320,8-nl),innerWidth-8-r.width-nl);py=Math.min(Math.max((Math.random()-.5)*160,8-nt),innerHeight-8-r.height-nt);b.style.transform=`translate(${px}px,${py}px)`})});
M(8,()=>setInterval(()=>{const a=$('#save'),b=$('#cancel');[a.textContent,b.textContent]=[b.textContent,a.textContent]},4000));
// 21-23 verification
async function captcha(){TS.captcha=true;const P=['Select all squares containing regret','Select all squares that feel like a Monday','Select all squares containing a sense of purpose'],T=['😬','🌧','📉','🪴','☕','📎','🧾','🕳','🙂'];let tries=0,msg='';
for(;;){TS.open(`<h3>Verify you are human</h3><p>${P[tries%3]}</p><p>${msg}</p><div class="grid">${T.map(t=>`<button type="button" class="tile">${t}</button>`).join('')}</div><div class="mb"><button id="cv" class="primary">Verify</button></div>`);
$$('.tile').forEach(b=>b.onclick=()=>b.classList.toggle('on'));await new Promise(r=>$('#cv').onclick=r);
if(!on(21)||++tries>=3)break;msg='Incorrect. Please reconsider your feelings.'}TS.close();TS.captcha=false}
async function slider(){if(!on(22))return;const t=200+Math.floor(Math.random()*600);let msg='';
for(;;){TS.open(`<h3>Slide to verify</h3><p>Set the slider to exactly <b>${t}</b>. Tip: arrow keys give fine control.</p><input id="sl" type="range" min="0" max="1000" value="0"><output id="so">0</output><p>${msg}</p><div class="mb"><button id="sv" class="primary">Verify</button></div>`);
$('#sl').oninput=e=>$('#so').textContent=e.target.value;await new Promise(r=>$('#sv').onclick=r);if(+$('#sl').value===t)break;msg='Not quite. Off by '+Math.abs($('#sl').value-t)+'.'}TS.close()}
async function emailCode(){if(!on(23))return;let msg='';
for(;;){const c=String(100000+Math.floor(Math.random()*900000)),t0=Date.now(),ts=$('#toast');ts.textContent='Your code: '+c;ts.hidden=false;clearTimeout(TS.tt);TS.tt=setTimeout(()=>ts.hidden=true,5000);
TS.open(`<h3>Email verification</h3><p>We emailed you a code. It expires in 5 seconds.</p><input id="ec" inputmode="numeric" maxlength="6"><p>${msg}</p><div class="mb"><button id="ev" class="primary">Verify</button><button id="er">Resend</button></div>`);
const a=await new Promise(r=>{$('#ev').onclick=()=>r(1);$('#er').onclick=()=>r(0)}),v=$('#ec').value;
if(!a){msg='A new code was sent.';continue}if(Date.now()-t0>5000){msg='Code expired. Try being faster.';continue}if(v===c)break;msg='Wrong code.'}TS.close();$('#toast').hidden=true}
// 12 click-5, 14 arguing dialogs
const c5=()=>on(12)?new Promise(res=>{TS.open('<h3>Confirm it is you</h3><p>Click the button to confirm.</p><button id="c5" class="primary">Confirm (0/5)</button>');let n=0,t=0;$('#c5').onclick=e=>{const now=Date.now();if(now-t>1500)n=0;t=now;e.target.textContent=`Confirm (${++n}/5)`;if(n>=5){TS.close();res()}}}):0;
async function argue(){if(!on(14))return 1;
if(!await TS.ask('<h3>Are you sure?</h3><p>This will save your profile.</p>',[['Yes',1],['No',0]]))return 0;
if(!await TS.ask('<h3>Are you REALLY sure?</h3><p>We noticed you hesitated.</p>',[['Yes, really',1],['Let me think',0]]))return 0;
let h='';for(;;){if(await TS.ask(`<h3>One last thing</h3><p>What is 7 × 8?${h}</p>`,[['54',0],['56',1],['63',0],['58',0]]))return 1;h='<br><small>Incorrect. Hint: it is between 55 and 57.</small>'}}
// 5 late validation, save, cancel
function validate(){const v=id=>$('#'+id).value.trim();
if(!v('f-name'))return 'Name cannot be blank. We checked.';if(!/^\S+@\S+\.\S+$/.test(v('f-email')))return 'That email looks suspicious.';
if(!passOk())return 'Password does not meet our evolving standards.';if(!dob)return 'Date of birth is required, as is patience.';
if(v('f-bio').length<10)return 'Bio must be at least 10 characters. Please elaborate.';
if(on(6))for(const i of[1,2,3])if(!v('m'+i))return `Required field ${i} of 3 is empty: ${LBL[i-1]}`;return ''}
$('#save').onclick=async()=>{if(TS.busy)return;crumb('Profile');crumb('Edit');const e=on(5)?validate():'';$('#err').textContent=e;if(e)return;
if(!await argue())return;await c5();await TS.load('Saving your profile...');await slider();await emailCode();
$('#pct').textContent='100%';$('#pbar').style.width='100%';await TS.ask('<h3>Profile saved</h3><p>Your profile is now 100% complete.</p>',[['Done',1]])};
$('#cancel').onclick=async()=>{if(TS.busy||!await TS.ask('<h3>Discard all changes?</h3>',[['Discard',1],['Keep editing',0]]))return;
ids.forEach(i=>$('#'+i).value='');dob=null;shown=1;$('#dv').textContent='';TS.st.dr={};TS.save();rr();pct();$('#err').textContent=''};
// 15 cookie banner
M(15,()=>{const K=['Essential-ish','Analytics','Marketing','Telemetry','Personalisation','Social','Heatmaps','A/B testing','Retargeting','Partner sync'],S=['first-party','third-party','fourth-party','mystery'];
TS.open(`<h3>We value your privacy</h3><p>40 partners would like to process your data.</p><div class="ckl">${K.flatMap(k=>S.map(s=>`<label><input type="checkbox" checked> ${k} (${s})</label>`)).join('')}<div class="mb"><button id="acc" class="primary">Accept all</button></div></div><div class="mb"><button id="rej" disabled>Reject all</button></div>`);
$('.ckl').onchange=()=>$('#rej').disabled=$$('.ckl input').some(i=>i.checked);$('#acc').onclick=$('#rej').onclick=TS.close});
// 16 edit timeout, 17 session expiry
let el=0,editing=0,locked=0;
async function expire(){do{await TS.ask('<h3>Session expired</h3><p>For your security, sign in again. Your draft is safe.</p><input id="lu" placeholder="Username"><input id="lp" type="password" placeholder="Password">',[['Sign in',1]])}while(!$('#lu').value||!$('#lp').value);await captcha()}
$('#fs').addEventListener('focusin',()=>editing=1);
setInterval(async()=>{if(!editing||locked||!TS.free())return;el++;$('#timer').textContent=on(16)?`Edit session: ${Math.max(0,30-el)}s`:'';
if(el===20&&!TS.st.exp&&on(17)){TS.st.exp=1;TS.save();await expire();el=0}else if(el>=30&&on(16)){locked=1;$('#fs').disabled=true;$('#lock').hidden=false}},1000);
$('#req').onclick=async()=>{do{await TS.ask('<h3>Request edit access</h3><p>Briefly justify why you need to edit your own profile.</p><textarea id="rj"></textarea>',[['Submit',1]])}while($('#rj').value.trim().length<5);
await TS.load('Awaiting manager approval...');locked=0;el=0;$('#fs').disabled=false;$('#lock').hidden=true};
// 18 maintenance popups
(function mt(){setTimeout(async()=>{if(on(18)&&TS.free()&&(TS.st.mt||0)<4){TS.n('mt');TS.open('<h3>Scheduled maintenance</h3><p>Please hold. We are improving things.</p><div class="bar"><i class="ind"></i></div>');await sleep(3000+Math.random()*2000);TS.close()}mt()},20000+Math.random()*20000)})();
// 20 flipping theme
M(20,()=>{let z=0;addEventListener('scroll',()=>{const n=scrollY>700?2:scrollY>300?1:0;if(n!==z){z=n;document.documentElement.dataset.theme=n==1?'dark':'light'}})});

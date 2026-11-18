/* Style Studio — core: storage, sound, toasts, accounts, cloud closets, navigation */
const store={get(k){try{return JSON.parse(localStorage.getItem(k));}catch(e){return null;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};
const $=id=>document.getElementById(id);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const keysOf=o=>Object.keys(o);
const rint=n=>Math.floor(Math.random()*n);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/* ---------- sound ---------- */
let sound=store.get('ss_sound')!==false;
let actx=null;
function tone(freq,start,dur,vol=.07,type='sine'){
  try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();
    const t=actx.currentTime+start,o=actx.createOscillator(),g=actx.createGain();
    o.type=type;o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(freq*1.6,t+dur*.6);
    g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
    o.connect(g).connect(actx.destination);o.start(t);o.stop(t+dur+.02);}catch(e){}
}
const blip=()=>{if(sound)tone(620+Math.random()*260,0,.14);};
const fanfare=()=>{if(!sound)return;[523,659,784,1046].forEach((f,i)=>tone(f,i*.12,.3,.06,'triangle'));};
const jingle=()=>{if(sound)[0,.07,.14].forEach((t,i)=>tone(500+i*200,t,.12));};

/* ---------- little effects ---------- */
function sparkles(stageId,n){
  const st=$(stageId);if(!st)return;
  for(let i=0;i<n;i++){const e=document.createElement('span');e.className='sparkle';e.textContent=pick(['✨','⭐','💖','🌟']);
    e.style.left=(15+Math.random()*70)+'%';e.style.top=(10+Math.random()*60)+'%';e.style.animationDelay=(i*.08)+'s';st.appendChild(e);setTimeout(()=>e.remove(),1200);}
}
function popSvg(svg){svg.classList.remove('pop');void svg.getBoundingClientRect();svg.classList.add('pop');}
let toastT;
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),3200);}
function showOff(svgHtml,title,landscape){
  $('showSvg').innerHTML=svgHtml;$('showSvg').className=landscape?'wide':'';
  $('showName').textContent=title;
  const sh=$('show');sh.classList.add('on');
  sh.querySelectorAll('.confetti').forEach(c=>c.remove());
  for(let i=0;i<45;i++){const c=document.createElement('span');c.className='confetti';c.textContent=pick(['✨','⭐','💖','🎀','🌸','💜','🎉','🦋']);
    c.style.left=Math.random()*100+'vw';c.style.animationDuration=(2.5+Math.random()*3)+'s';c.style.animationDelay=(Math.random()*2.5)+'s';c.style.fontSize=(16+Math.random()*18)+'px';sh.appendChild(c);}
  fanfare();Track.hit('showoff');
}
function confirmTap(btn,label,fn){
  if(btn.dataset.confirm){delete btn.dataset.confirm;btn.innerHTML=label;fn();return;}
  btn.dataset.confirm='1';btn.innerHTML='<b>❓</b>Sure? Tap!';
  setTimeout(()=>{if(btn.dataset.confirm){delete btn.dataset.confirm;btn.innerHTML=label;}},2500);
}

/* ---------- accounts (shared Supabase project) ---------- */
const SB_URL='https://htkbjbfjipbrzidnafrs.supabase.co',SB_KEY='sb_publishable_XhiTniGMnL449MnIPNAGtw_7Hvi_T9i';
let sb=null;
try{if(window.supabase)sb=window.supabase.createClient(SB_URL,SB_KEY);}catch(e){sb=null;}
const Core={user:null,displayName:'',closets:[],listeners:[]};
Core.onAuth=fn=>Core.listeners.push(fn);

/* A closet keeps saved things: in the account when signed in, in this browser otherwise. */
function Closet(opts){
  const {table,field,nameCol,localKey,localMax,label,kind}=opts;
  const c={rows:[],local:store.get(localKey)||[],label};
  const extra=kind?{kind}:{};
  c.items=()=>Core.user?c.rows.map(r=>r[field]):c.local;
  c.load=async()=>{
    if(!Core.user||!sb){c.rows=[];return;}
    let q=sb.from(table).select(`id,${field},created_at`);
    if(kind)q=q.eq('kind',kind);
    const {data,error}=await q.order('created_at',{ascending:false}).limit(100);
    if(error){toast(`Couldn't load your ${label} right now.`);c.rows=[];}else c.rows=data;
  };
  c.add=async(obj,name)=>{
    if(Core.user){
      const {data,error}=await sb.from(table).insert({...extra,[nameCol]:(name||'').slice(0,40)||null,[field]:obj}).select(`id,${field},created_at`).single();
      if(error){toast(/full/i.test(error.message)?`Your ${label} closet is full! Remove one to save more.`:'Oops, that didn\'t save. Try again?');return false;}
      c.rows.unshift(data);
    }else{c.local.unshift(obj);c.local=c.local.slice(0,localMax);store.set(localKey,c.local);}
    Track.hit('saved_'+(kind||label));
    return true;
  };
  c.remove=async i=>{
    if(Core.user){
      const row=c.rows[i];if(!row)return false;
      const {error}=await sb.from(table).delete().eq('id',row.id);
      if(error){toast('Couldn\'t remove that. Try again?');return false;}
      c.rows=c.rows.filter(r=>r.id!==row.id);
    }else{c.local.splice(i,1);store.set(localKey,c.local);}
    return true;
  };
  c.migrate=async()=>{
    if(!c.local.length)return 0;
    const rows=c.local.map(o=>({...extra,[nameCol]:(o.name||'').slice(0,40)||null,[field]:o}));
    const {error}=await sb.from(table).insert(rows);
    if(error)return 0;
    const n=c.local.length;c.local=[];store.set(localKey,c.local);return n;
  };
  Core.closets.push(c);
  return c;
}

/* Progress (challenge stars and the like): one small object per account, kept locally too. */
const Progress={data:store.get('ss_progress')||{},t:null};
Progress.get=k=>Progress.data[k];
Progress.set=(k,v)=>{Progress.data[k]=v;store.set('ss_progress',Progress.data);Progress.push();};
Progress.push=()=>{
  clearTimeout(Progress.t);
  Progress.t=setTimeout(async()=>{if(!Core.user||!sb)return;await sb.from('stylestudio_progress').upsert({user_id:Core.user.id,data:Progress.data,updated_at:new Date().toISOString()});},700);
};
Progress.pull=async()=>{
  if(!Core.user||!sb)return;
  const {data}=await sb.from('stylestudio_progress').select('data').maybeSingle();
  const remote=(data&&data.data)||{};
  for(const [k,v] of Object.entries(remote)){const mine=Progress.data[k];Progress.data[k]=(typeof v==='number'&&typeof mine==='number')?Math.max(v,mine):(mine===undefined?v:mine);}
  store.set('ss_progress',Progress.data);Progress.push();
};

/* Track counts things kids do (saves, shows, stories...) so the Sticker Book can hand out rewards. */
const Track={fns:[],
  n:k=>Progress.get('n_'+k)||0,
  hit(k,by=1){Progress.set('n_'+k,Track.n(k)+by);Track.fns.forEach(f=>{try{f(k);}catch(e){}});},
  on(fn){Track.fns.push(fn);}};

function updateAcct(){
  const a=$('acct');
  if(!sb){a.hidden=true;return;}
  a.textContent=Core.user?'👤 '+Core.displayName:'👤 Sign in';a.classList.toggle('in',!!Core.user);
  $('authIn').hidden=!!Core.user;$('authOut').hidden=!Core.user;$('aWho').textContent=Core.displayName;
}
async function onUser(u){
  Core.user=u;
  if(u){
    Core.displayName=(u.user_metadata&&(u.user_metadata.full_name||u.user_metadata.name))||(u.email||'').split('@')[0]||'friend';
    try{const {data}=await sb.schema('plico').from('profiles').select('display_name').eq('user_id',u.id).maybeSingle();if(data&&data.display_name)Core.displayName=data.display_name;}catch(e){}
    updateAcct();
    const moved=[];
    for(const c of Core.closets){const n=await c.migrate();if(n)moved.push(`${n} ${c.label}`);}
    if(moved.length)toast(`Moved ${moved.join(' and ')} from this device into your account ☁️`);
    for(const c of Core.closets)await c.load();
    await Progress.pull();
  }else{for(const c of Core.closets)c.rows=[];updateAcct();}
  Core.listeners.forEach(fn=>fn());
}
let signUp=false;
const openAuth=()=>{$('aMsg').textContent='';$('authModal').classList.add('on');if(!Core.user)setTimeout(()=>$('aEmail').focus(),50);};
const closeAuth=()=>$('authModal').classList.remove('on');

/* ---------- studios + navigation between them ---------- */
const Views={home:{el:'home'}};
const Studios=[];
/* A studio is {hash, el, emoji, title, blurb, preview(), init(), show()}. Home cards follow registration order. */
function registerStudio(s){Studios.push(s);Views[s.hash]={el:s.el,show:s.show};}
function addSection(id,html){const sec=document.createElement('section');sec.className='view';sec.id=id;sec.hidden=true;sec.innerHTML=html;$('studios').appendChild(sec);return sec;}
function injectCss(css){const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);}
Views.home.show=()=>{
  $('cards').innerHTML=Studios.map(s=>`<a class="card" href="#${s.hash}"><div class="card-art">${s.preview?s.preview():''}</div><h2>${s.emoji} ${s.title}</h2><p>${typeof s.blurb==='function'?s.blurb():s.blurb}</p></a>`).join('');
};
function route(){
  const k=location.hash.slice(1),key=Views[k]?k:'home';
  for(const [n,v] of Object.entries(Views))$(v.el).hidden=n!==key;
  $('homeBtn').hidden=key==='home';
  if(Views[key].show)Views[key].show();
  if(key!=='home'&&!Track.n('visit_'+key))Track.hit('visit_'+key);
  window.scrollTo(0,0);
}

Core.start=()=>{
  $('snd').textContent=sound?'🔊':'🔇';
  $('snd').addEventListener('click',()=>{sound=!sound;store.set('ss_sound',sound);$('snd').textContent=sound?'🔊':'🔇';blip();});
  $('acct').addEventListener('click',()=>{blip();openAuth();});
  $('authClose').addEventListener('click',closeAuth);
  $('authModal').addEventListener('click',e=>{if(e.target.id==='authModal')closeAuth();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAuth();$('show').classList.remove('on');}});
  $('aToggle').addEventListener('click',e=>{
    e.preventDefault();signUp=!signUp;
    $('aSubmit').textContent=signUp?'Create account':'Sign in';
    $('aToggle').textContent=signUp?'Already have an account? Sign in':'New here? Create an account';
    $('aPass').autocomplete=signUp?'new-password':'current-password';$('aMsg').textContent='';
  });
  $('authForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const msg=$('aMsg'),btn=$('aSubmit'),email=$('aEmail').value.trim(),password=$('aPass').value;
    msg.className='amsg';msg.textContent='';btn.disabled=true;
    try{
      if(signUp){
        const {data,error}=await sb.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});
        if(error)throw error;
        if(!data.session){msg.className='amsg ok';msg.textContent='Check your email to confirm your account, then sign in here.';}
        else closeAuth();
      }else{
        const {error}=await sb.auth.signInWithPassword({email,password});
        if(error)throw error;
        closeAuth();$('aPass').value='';
      }
    }catch(err){msg.textContent=/invalid login/i.test(err.message)?'That email or password didn\'t match. Try again!':err.message;}
    btn.disabled=false;
  });
  $('gBtn').addEventListener('click',async()=>{
    const {error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});
    if(error)$('aMsg').textContent=error.message;
  });
  $('aSignOut').addEventListener('click',async()=>{await sb.auth.signOut();closeAuth();toast('Signed out. See you next time! 👋');});
  $('closeShow').addEventListener('click',()=>{$('show').classList.remove('on');blip();});
  $('homeBtn').addEventListener('click',()=>{blip();location.hash='';});
  $('logo').addEventListener('click',()=>{location.hash='';});
  Studios.forEach(s=>{try{s.init();}catch(e){console.error('Studio failed to start:',s.title,e);}});
  window.addEventListener('hashchange',route);
  updateAcct();route();
  if(sb){
    sb.auth.onAuthStateChange((ev,session)=>{
      const u=session?session.user:null;
      if((u&&u.id)!==(Core.user&&Core.user.id))setTimeout(()=>onUser(u),0);
    });
  }
};

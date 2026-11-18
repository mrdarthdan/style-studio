/* Style Studio — Fashion Show. Pick models (saved looks), a runway and music; models walk the runway and the pet judges score them. */
const Fashion=(()=>{
  const THEMES={
    stage:{l:'Glam Stage',sky:['#2A1840','#4A2A6E'],floor:'#3A2350',run:'#E0336F',edge:'#FFD84D'},
    castle:{l:'Royal Ballroom',sky:['#C9B6FF','#FFD9F0'],floor:'#E9DDFF',run:'#FF8FC6',edge:'#FFD84D'},
    beach:{l:'Sunset Beach',sky:['#FF9AB0','#FFD27A'],floor:'#F6D9A0',run:'#38C6C6',edge:'#fff'},
    space:{l:'Space Station',sky:['#0E1033','#3A1F6E'],floor:'#1E1846',run:'#5DA9FF',edge:'#9FE7FF'},
    candy:{l:'Candy Land',sky:['#FFC9EA','#FFF1D6'],floor:'#FFB8DB',run:'#fff',edge:'#FF6FA8'}
  };
  const MUSIC={
    pop:{l:'🎵 Pop',bpm:128,mel:[72,76,79,76,74,77,81,77,72,76,79,84,83,79,77,74],bass:[48,48,53,53,45,45,55,55]},
    princess:{l:'👑 Princess Waltz',bpm:150,mel:[76,79,83,81,79,76,74,76,79,77,76,74,72,74,76,72],bass:[48,55,52,53,57,53,55,52]},
    disco:{l:'🪩 Disco',bpm:118,mel:[69,72,76,72,74,77,81,77,69,72,76,79,77,74,72,69],bass:[45,57,45,57,50,62,50,62]},
    none:{l:'🔇 No music'}
  };
  const JUDGES=[
    {name:'Lady Whiskers',pet:{species:'kitty',fur:0,pattern:'none',eyes:1,eyeStyle:'round',neck:'bowtie',head:'crown',accColor:8,accent:9}},
    {name:'Sir Waggles',pet:{species:'puppy',fur:2,pattern:'patch',eyes:0,eyeStyle:'sparkle',neck:'bowtie',head:'none',accColor:7,accent:9}},
    {name:'Miss Hops',pet:{species:'bunny',fur:8,pattern:'none',eyes:5,eyeStyle:'round',neck:'none',head:'glasses',accColor:0,accent:9}}
  ];
  const midi=n=>440*Math.pow(2,(n-69)/12);
  let theme=store.get('ss_fs_theme')||'stage',music=store.get('ss_fs_music')||'pop',picked=['cur'],running=false,runId=0,raf=0,beatT=0,tab='models';

  const looksAll=()=>[{k:'cur',look:Dress.state,l:Dress.state.name||'Current look'}].concat(Dress.closet.items().map((l,i)=>({k:String(i),look:l,l:l.name||'Look '+(i+1)})));
  const lookOf=k=>{const x=looksAll().find(a=>a.k===k);return x?Object.assign({},DEF,x.look):null;};

  function scene(u,opts={}){
    const T=THEMES[theme];
    let o=`<defs><linearGradient id="${u}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${T.sky[0]}"/><stop offset="1" stop-color="${T.sky[1]}"/></linearGradient></defs><rect width="480" height="360" fill="url(#${u}sk)"/>`;
    const r=rng(9);
    if(theme==='stage'||theme==='space')for(let i=0;i<40;i++)o+=`<circle cx="${(r()*480).toFixed(0)}" cy="${(r()*150).toFixed(0)}" r="${(r()*1.5+.5).toFixed(1)}" fill="#fff" opacity=".7"/>`;
    if(theme==='stage')o+=`<path d="M0 0 H70 Q60 120 78 230 L0 240Z M480 0 H410 Q420 120 402 230 L480 240Z" fill="#C2185B"/>`+(()=>{let v='M0 0 H480 V26';for(let x=480;x>0;x-=32)v+=` Q${x-16} 48 ${x-32} 26`;return `<path d="${v} Z" fill="#E0336F"/>`;})();
    if(theme==='castle')o+=`<g fill="#fff" opacity=".7">${[60,140,340,420].map(x=>`<rect x="${x-14}" y="40" width="28" height="110" rx="14"/>`).join('')}</g>`+[100,380].map(x=>`<path d="M${x-30} 20 Q${x} 70 ${x+30} 20" stroke="#FFD84D" stroke-width="3" fill="none"/>`+[x-20,x,x+20].map(cx=>`<circle cx="${cx}" cy="${cx===x?44:34}" r="4" fill="#FFF6C8"/>`).join('')).join('');
    if(theme==='beach')o+=`<circle cx="240" cy="150" r="42" fill="#FFF1A8"/><rect y="150" width="480" height="20" fill="#3FB6E0" opacity=".9"/>`+[[40,140],[440,140]].map(([x,y])=>`<path d="M${x} ${y+60} Q${x+6} ${y} ${x-4} ${y-40}" stroke="#9C6B3C" stroke-width="8" fill="none"/><g fill="#3BAE5A"><path d="M${x-4} ${y-40} Q${x-40} ${y-50} ${x-50} ${y-20} Q${x-30} ${y-40} ${x-4} ${y-36}Z"/><path d="M${x-4} ${y-40} Q${x+30} ${y-60} ${x+50} ${y-30} Q${x+24} ${y-44} ${x-2} ${y-36}Z"/></g>`).join('');
    if(theme==='space')o+=`<circle cx="80" cy="70" r="30" fill="#FF8FC6"/><ellipse cx="80" cy="70" rx="50" ry="10" fill="none" stroke="#FFD84D" stroke-width="4" transform="rotate(-15 80 70)"/><circle cx="410" cy="60" r="18" fill="#F2F2FF"/>`;
    if(theme==='candy')o+=[[50,90,'#FF6FA8'],[430,80,'#8F7CFF'],[110,40,'#38C6C6'],[370,40,'#FFD84D']].map(([x,y,c])=>`<rect x="${x-3}" y="${y}" width="6" height="${170-y}" fill="#fff"/><circle cx="${x}" cy="${y}" r="22" fill="${c}"/><path d="M${x} ${y} m-4 0 a4 4 0 1 1 8 0 a8 8 0 1 1 -16 0 a12 12 0 1 1 24 0" stroke="#fff" stroke-width="3" fill="none"/>`).join('');
    /* floor + runway */
    o+=`<rect y="168" width="480" height="192" fill="${T.floor}"/><path d="M200 168 L280 168 L380 360 L100 360 Z" fill="${T.run}"/><path d="M200 168 L100 360 M280 168 L380 360" stroke="${T.edge}" stroke-width="4"/>`;
    for(let i=0;i<8;i++){const t=i/7,y=172+t*184,xl=200-100*t,xr=280+100*t;o+=`<circle cx="${xl.toFixed(1)}" cy="${y.toFixed(1)}" r="${2+t*3}" fill="${T.edge}"/><circle cx="${xr.toFixed(1)}" cy="${y.toFixed(1)}" r="${2+t*3}" fill="${T.edge}"/>`;}
    /* spotlights */
    o+=`<path d="M170 0 L230 0 L330 360 L150 360 Z" fill="#FFF6C8" opacity=".12"/><path d="M250 0 L310 0 L330 360 L150 360 Z" fill="#FFF6C8" opacity=".08"/>`;
    /* audience (left) */
    const crowd=['#6B4A8F','#8F6BBF','#5A3F7A','#7B5AA8'];
    for(let i=0;i<7;i++){const x=10+i*14,y=300+(i%2)*26;o+=`<circle cx="${x}" cy="${y}" r="13" fill="${crowd[i%4]}"/><ellipse cx="${x}" cy="${y+26}" rx="17" ry="16" fill="${crowd[(i+1)%4]}"/>`;}
    /* judges' table (right) */
    JUDGES.forEach((j,i)=>{const s=.2,x=400+i*30-30,y=304;o+=`<g transform="translate(${(x-150*s).toFixed(1)} ${(y-290*s).toFixed(1)}) scale(${s})">${renderPet(j.pet,u+'j'+i,{noBg:true})}</g>`;});
    o+=`<rect x="352" y="300" width="128" height="60" rx="6" fill="#fff" opacity=".95"/><rect x="352" y="300" width="128" height="10" fill="#FFD84D"/><text x="416" y="340" text-anchor="middle" font-family="Fredoka,Arial" font-weight="700" font-size="16" fill="#8F6BFF">JUDGES</text>`;
    o+=`<g id="${u}cards"></g><g id="${u}actor">${opts.actor||''}</g><g id="${u}name"></g>`;
    return o;
  }
  /* where a model stands: t=0 back of runway, t=1 front */
  const actorAt=(look,t,bob,uid,x=240)=>{const s=.16+t*.42,y=176+t*176-bob;return `<g transform="translate(${(x-150*s).toFixed(1)} ${(y-470*s).toFixed(1)}) scale(${s.toFixed(3)})">${render(look,{bg:false,uid})}</g>`;};

  function drawStage(){
    const look=lookOf(picked[0])||Dress.state;
    $('fsSvg').innerHTML=scene('fs',{actor:actorAt(look,1,0,'fsa')});
    $('fsPlate').textContent=running?'':'🎬 Ready for the show!';
  }
  function drawTabs(){
    const T=[['models','👗','Models'],['runway','✨','Runway'],['music','🎵','Music']];
    $('fsTabs').innerHTML=T.map(([id,ic,l])=>`<button class="tab${tab===id?' on':''}" data-tab="${id}"><b>${ic}</b>${l}</button>`).join('');
  }
  function drawBody(){
    let o='';
    if(tab==='models'){
      o=`<div class="sec"><h2>Pick your models</h2><p class="note">Tap looks to add them to the show, up to 6. They walk in the order you pick them.</p><div class="grid">`+
        looksAll().map(x=>{const n=picked.indexOf(x.k);return `<button class="opt${n>=0?' on':''}" data-model="${x.k}" style="position:relative"><svg viewBox="20 0 260 480" xmlns="http://www.w3.org/2000/svg">${render(Object.assign({},DEF,x.look),{bg:false,uid:'fm'+x.k})}</svg><span>${x.l}</span>${n>=0?`<em class="badge">${n+1}</em>`:''}</button>`;}).join('')+`</div>`+
        (Dress.closet.items().length?'':`<p class="note">Save looks in <a href="#dress-up">👗 Dress Up</a> to put more models in your show!</p>`)+`</div>`;
    }else if(tab==='runway'){
      o=`<div class="sec"><h2>Pick a runway</h2><div class="grid land">`+Object.entries(THEMES).map(([k,t])=>{const keep=theme;theme=k;const svg=scene('ft'+k);theme=keep;return `<button class="opt${theme===k?' on':''}" data-theme="${k}"><svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">${svg}</svg><span>${t.l}</span></button>`;}).join('')+`</div></div>`;
    }else{
      o=`<div class="sec"><h2>Pick the music</h2><div class="musics">`+Object.entries(MUSIC).map(([k,m])=>`<button class="pill${music===k?' go':''}" data-music="${k}">${m.l}</button>`).join('')+`</div><p class="note">Tap a song to hear a little bit of it.</p></div>`;
    }
    $('fsBody').innerHTML=o;
  }

  /* ---------- music ---------- */
  function startMusic(){
    stopMusic();const M=MUSIC[music];if(!M.mel||!sound)return;
    let i=0;const beat=60000/M.bpm/2;
    beatT=setInterval(()=>{tone(midi(M.mel[i%M.mel.length]),0,beat/1000*.9,.045,'triangle');if(i%2===0)tone(midi(M.bass[(i/2|0)%M.bass.length]),0,beat/1000*1.6,.05,'sine');i++;},beat);
  }
  function stopMusic(){clearInterval(beatT);beatT=0;}

  /* ---------- the show ---------- */
  const wait=ms=>new Promise(r=>setTimeout(r,ms));
  function animate(dur,fn,alive){return new Promise(res=>{const t0=performance.now();const step=now=>{if(!alive())return res();const k=Math.min(1,(now-t0)/dur);fn(k,now);if(k<1)raf=requestAnimationFrame(step);else res();};raf=requestAnimationFrame(step);});}
  async function runShow(){
    if(running)return;
    const models=picked.map(lookOf).filter(Boolean);
    if(!models.length){toast('Pick at least one model first!');return;}
    running=true;const my=++runId,alive=()=>running&&my===runId;$('fsGo').innerHTML='<b>⏹</b>Stop';$('fsPlate').textContent='';
    startMusic();
    $('fsSvg').innerHTML=scene('fs');
    const actor=$('fsactor'),cards=$('fscards'),nameEl=$('fsname');
    for(let m=0;m<models.length&&alive();m++){
      const look=models[m];cards.innerHTML='';nameEl.innerHTML='';
      await animate(2600,(k,now)=>{actor.innerHTML=actorAt(look,k,Math.abs(Math.sin(now/170))*6,'fsw'+m);},alive);
      if(!alive())break;
      nameEl.innerHTML=`<rect x="150" y="12" width="180" height="34" rx="17" fill="#fff" opacity=".92"/><text x="240" y="35" text-anchor="middle" font-family="Fredoka,Arial" font-weight="700" font-size="18" fill="#3b2453">✨ ${(look.name||'Model '+(m+1)).replace(/[<&>]/g,'')} ✨</text>`;
      sparkles('fsStage',6);if(sound)tone(1046,0,.25,.05,'triangle');
      await wait(700);if(!alive())break;
      cards.innerHTML=JUDGES.map((j,i)=>{const sc=8+rint(3),x=400+i*30-30;return `<g class="fscard" style="animation-delay:${i*.25}s"><rect x="${x-15}" y="226" width="30" height="34" rx="4" fill="#fff" stroke="#8F6BFF" stroke-width="2"/><text x="${x}" y="251" text-anchor="middle" font-family="Fredoka,Arial" font-weight="700" font-size="20" fill="#FF5FA2">${sc}</text><path d="M${x} 260 V276" stroke="#8a7a9c" stroke-width="2"/></g>`;}).join('');
      if(sound)[0,.25,.5].forEach(t=>tone(784,t,.12,.05,'square'));
      await wait(1700);if(!alive())break;
      await animate(900,(k)=>{actor.innerHTML=`<g opacity="${(1-k).toFixed(2)}">${actorAt(look,1-k*.4,0,'fso'+m,240+k*140)}</g>`;},alive);
      actor.innerHTML='';
    }
    if(alive()){
      cards.innerHTML='';nameEl.innerHTML='';
      const n=models.length,gap=Math.min(70,300/n);
      const line=models.map((l,i)=>{const x=240-(n-1)*gap/2+i*gap,s=.36;return `<g transform="translate(${(x-150*s).toFixed(1)} ${(330-470*s).toFixed(1)}) scale(${s})">${render(l,{bg:false,uid:'fin'+i})}</g>`;}).join('');
      actor.innerHTML=line;
      Track.hit('show_done');
      showOff(`<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">${scene('fsf',{actor:line})}</svg>`,'🎉 What a show! Everyone is a superstar! 🎉',true);
    }
    if(my===runId)endShow();
  }
  function endShow(){running=false;cancelAnimationFrame(raf);stopMusic();$('fsGo').innerHTML='<b>▶️</b>Start the Show';}

  function init(){
    addSection('mod-fashion',`<div class="app room-app"><div class="stage-col">`+
      `<div class="stage" id="fsStage"><svg id="fsSvg" viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Fashion show runway"></svg><div class="plate" id="fsPlate"></div></div>`+
      `<div class="actions two"><button class="act primary" id="fsGo"><b>▶️</b>Start the Show</button><button class="act" id="fsMix"><b>🎲</b>Random models</button></div>`+
      `<p class="hint">Pick your models, a runway and some music, then start the show!</p></div>`+
      `<div class="panel"><div class="tabs" id="fsTabs"></div><div class="tab-body" id="fsBody"></div></div></div>`);
    $('fsTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;blip();drawTabs();drawBody();});
    $('fsBody').addEventListener('click',e=>{
      const m=e.target.closest('[data-model]'),t=e.target.closest('[data-theme]'),mu=e.target.closest('[data-music]');
      if(m){const k=m.dataset.model,i=picked.indexOf(k);if(i>=0)picked.splice(i,1);else if(picked.length<6)picked.push(k);else toast('The show has room for 6 models.');blip();drawBody();if(!running)drawStage();}
      if(t){theme=t.dataset.theme;store.set('ss_fs_theme',theme);blip();drawBody();if(!running)drawStage();}
      if(mu){music=mu.dataset.music;store.set('ss_fs_music',music);drawBody();if(!running&&music!=='none'){startMusic();setTimeout(stopMusic,2400);}}
    });
    $('fsGo').addEventListener('click',()=>{if(running)endShow(),drawStage();else runShow();});
    $('fsMix').addEventListener('click',()=>{const all=looksAll().map(x=>x.k);picked=all.sort(()=>Math.random()-.5).slice(0,Math.min(4,all.length));jingle();drawBody();drawStage();});
    window.addEventListener('hashchange',()=>{if(running&&location.hash!=='#fashion-show')endShow();});
    injectCss(`
      .actions.two{grid-template-columns:2fr 1fr}
      .badge{position:absolute;top:4px;left:6px;background:#ff5fa2;color:#fff;font-style:normal;font-weight:700;border-radius:999px;width:24px;height:24px;line-height:24px;font-size:14px}
      .musics{display:flex;flex-wrap:wrap;gap:10px}
      .fscard{animation:cardup .4s ease both}
      @keyframes cardup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
    `);
  }
  function show(){picked=picked.filter(k=>lookOf(k));if(!picked.length)picked=['cur'];drawTabs();drawBody();drawStage();}
  registerStudio({hash:'fashion-show',el:'mod-fashion',emoji:'💃',title:'Fashion Show',blurb:'Your looks strut the runway while the pet judges hold up their scores!',init,show,
    preview:()=>`<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">${scene('fsp',{actor:actorAt(Object.assign({},DEF,Dress.state),1,0,'fspa')})}</svg>`});
  return {};
})();

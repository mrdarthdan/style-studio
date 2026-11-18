/* Style Studio — Sticker Book. Doing things across the studios earns achievements; each one unlocks a sticker
   to place on the sticker book pages. Earned stickers and placements live in Progress (account + this device). */
const Stickers=(()=>{
  const saved=(key,closet)=>Math.max(Track.n('saved_'+key),closet?closet.items().length:0);
  const chStars=()=>typeof Challenge!=='undefined'?Challenge.total():0;
  const chMax=()=>typeof Challenge!=='undefined'?Challenge.max():45;
  const perfect=()=>typeof Challenge!=='undefined'?Challenge.list.filter(c=>(Progress.get('ch_'+c.id)||0)>=3).length:0;
  const looks=()=>Dress.closet.items();
  const visited=()=>Studios.filter(s=>Track.n('visit_'+s.hash)>0).length;
  const cl=n=>{const m={Pets:typeof Pets!=='undefined'?Pets:null,Coloring:typeof Coloring!=='undefined'?Coloring:null,Nails:typeof Nails!=='undefined'?Nails:null,
    Bakery:typeof Bakery!=='undefined'?Bakery:null,Story:typeof Story!=='undefined'?Story:null,Room:typeof Room!=='undefined'?Room:null}[n];return m?m.closet:null;};
  /* [id, sticker emoji, title, how to earn it, current(), goal, color] */
  const A=[
    ['look1','👗','Fashion Star','Save your first look in Dress Up',()=>saved('looks',Dress.closet),1,'#FF8FC6'],
    ['look10','🛍️','Full Closet','Save 10 looks',()=>saved('looks',Dress.closet),10,'#C77DFF'],
    ['buddies','👫','Best Buddies','Save a girl look and a boy look',()=>(looks().some(l=>l.body==='boy')?1:0)+(looks().some(l=>l.body!=='boy')?1:0),2,'#5DA9FF'],
    ['room1','🛏️','Room Designer','Save a room',()=>saved('rooms',cl('Room')),1,'#FFB86B'],
    ['room3','🏡','Dream Home','Save 3 rooms',()=>saved('rooms',cl('Room')),3,'#7BD88F'],
    ['pet1','🐶','Pet Pal','Save a pet in Pet Studio',()=>saved('pet',cl('Pets')),1,'#C68A45'],
    ['pet5','🐾','Pet Parade','Save 5 pets',()=>saved('pet',cl('Pets')),5,'#FF9F43'],
    ['star1','⭐','First Star','Earn a star in Style Challenge',chStars,1,'#FFD84D'],
    ['perfect','🌟','Perfect Style','Get 3 stars on a challenge',perfect,1,'#FFC233'],
    ['star25','🏆','Style Champion','Earn 25 challenge stars',chStars,25,'#E9B93A'],
    ['starall','👑','Style Royalty','Earn every challenge star',chStars,chMax,'#FF6FA8'],
    ['show1','💃','Runway Ready','Finish a fashion show',()=>Track.n('show_done'),1,'#FF4D6D'],
    ['show5','🎤','Fashion Week','Finish 5 fashion shows',()=>Track.n('show_done'),5,'#B06BFF'],
    ['color1','🖍️','Little Artist','Save a coloring page',()=>saved('coloring',cl('Coloring')),1,'#38C6C6'],
    ['color100','🌈','Color Splash','Color in 100 shapes',()=>Track.n('color_fill'),100,'#FF8FA3'],
    ['nails1','💅','Nail Pro','Save a nail design',()=>saved('nails',cl('Nails')),1,'#FF6FA8'],
    ['bake1','🧁','Sweet Baker','Save a cake or cupcake',()=>saved('bakery',cl('Bakery')),1,'#FFB6D0'],
    ['candles','🕯️','Make a Wish','Blow out the candles 5 times',()=>Track.n('candles'),5,'#FFD84D'],
    ['story1','📖','Author','Save a story in Story Maker',()=>saved('story',cl('Story')),1,'#8F7CFF'],
    ['story3','📚','Bookshelf','Save 3 stories',()=>saved('story',cl('Story')),3,'#5DA9FF'],
    ['read1','🦉','Bookworm','Read a story all the way to The End',()=>Track.n('story_read'),1,'#A0703C'],
    ['showoff','🎉','Show-Off','Tap Show Off 10 times',()=>Track.n('showoff'),10,'#FF9F43'],
    ['surprise','🎲','Surprise!','Use Surprise 20 times',()=>Track.n('surprise'),20,'#7BD88F'],
    ['explore','🗺️','Explorer','Visit every studio',visited,()=>Studios.length,'#38C6C6'],
    ['collector','🏅','Sticker Collector','Collect 20 other stickers',()=>A.filter(a=>a[0]!=='collector'&&got(a[0])).length,20,'#E9B93A']
  ];
  const goalOf=a=>typeof a[5]==='function'?a[5]():a[5];
  const curOf=a=>{try{return Math.min(goalOf(a),a[4]()||0);}catch(e){return 0;}};
  const got=id=>!!Progress.get('sb_got_'+id);
  const count=()=>A.filter(a=>got(a[0])).length;
  const PAGES=[['park','Rainbow Park'],['space','Outer Space'],['sea','Under the Sea'],['candy','Candy Land']];
  const MAXPLACED=24;
  let page='park',tab='tray',sel=-1,drag=null,ready=false,queued=[],qT=null;

  function badge(a,uid,locked){
    const [id,e,,,,,col]=a;let d='';
    for(let i=0;i<=24;i++){const t=i/24*Math.PI*2,r=i%2?40:44;d+=(i?'L':'M')+(r*Math.cos(t)).toFixed(1)+' '+(r*Math.sin(t)).toFixed(1)+' ';}
    const c=locked?'#E6E0EC':col;
    return `<path d="${d}Z" fill="#fff" stroke="${locked?'#d4cbe0':shade(c,-.25)}" stroke-width="3" stroke-linejoin="round"/>`+
      `<circle r="34" fill="${c}" opacity="${locked?1:.9}"/><circle r="34" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="2 5" opacity=".9"/>`+
      `<ellipse cx="-12" cy="-18" rx="12" ry="6" fill="#fff" opacity=".35" transform="rotate(-30 -12 -18)"/>`+
      `<text y="13" text-anchor="middle" font-size="38" ${locked?'opacity=".25" style="filter:grayscale(1)"':''}>${e}</text>`+
      (locked?`<text x="22" y="34" text-anchor="middle" font-size="18">🔒</text>`:'');
  }
  const placed=()=>{const all=Progress.get('sb_place')||{};return Array.isArray(all[page])?all[page]:[];};
  const setPlaced=list=>{const all=Object.assign({},Progress.get('sb_place')||{});all[page]=list;Progress.set('sb_place',all);};
  const byId=id=>A.find(a=>a[0]===id);

  function check(silent){
    const fresh=[];
    A.forEach(a=>{if(!got(a[0])&&curOf(a)>=goalOf(a)){Progress.set('sb_got_'+a[0],1);fresh.push(a);}});
    if(fresh.length&&!silent){queued.push(...fresh);clearTimeout(qT);qT=setTimeout(announce,900);}
    if(fresh.length&&!$('mod-stickers').hidden)drawAll();
    return fresh;
  }
  function announce(){
    if(!queued.length)return;
    const a=queued.shift();
    const pop=$('sbPop');
    pop.innerHTML=`<svg viewBox="-50 -50 100 100">${badge(a,'pp')}</svg><div><small>New sticker!</small><b>${a[2]}</b><span>${a[3]}</span></div>`;
    pop.classList.remove('on');void pop.offsetWidth;pop.classList.add('on');
    if(sound)[784,988,1175,1568].forEach((f,i)=>tone(f,i*.09,.25,.06,'triangle'));
    setTimeout(()=>{pop.classList.remove('on');if(queued.length)setTimeout(announce,350);},3200);
  }

  /* ---------- drawing ---------- */
  function drawStage(){
    let o=(SCENES[page]||SCENES.park).d('sbs');
    placed().forEach(([id,x,y,z,r],i)=>{const a=byId(id);if(!a)return;
      o+=`<g transform="translate(${x} ${y}) rotate(${r||0}) scale(${(z||1)*.8})" data-st="${i}" style="cursor:grab">${badge(a,'pl'+i)}</g>`;
      if(i===sel)o+=`<circle cx="${x}" cy="${y}" r="${42*(z||1)}" fill="none" stroke="#ff5fa2" stroke-width="3" stroke-dasharray="6 5" pointer-events="none"/>`;});
    if(!placed().length)o+=`<rect x="90" y="120" width="300" height="56" rx="18" fill="#fff" opacity=".88"/><text x="240" y="154" text-anchor="middle" font-family="Fredoka,Arial" font-weight="600" font-size="17" fill="#8a7a9c">Tap a sticker below to stick it here!</text>`;
    $('sbSvg').innerHTML=o;
  }
  function drawTool(){
    const t=$('sbTool'),p=placed()[sel];
    if(!p){t.hidden=true;return;}
    t.hidden=false;
    t.innerHTML=`<span>${byId(p[0])[2]}</span><button data-sbt="small" title="Smaller">➖</button><button data-sbt="big" title="Bigger">➕</button><button data-sbt="turn" title="Turn">🔄</button><button data-sbt="del" title="Peel off">🗑️</button>`;
  }
  function drawHead(){
    $('sbCount').innerHTML=`🏅 <b>${count()}</b> of ${A.length} stickers`;
    $('sbPages').innerHTML=PAGES.map(([k,l])=>`<button class="pill${k===page?' go':''}" data-page="${k}">${l}</button>`).join('');
  }
  const TABS=[{id:'tray',icon:'🏅',label:'My Stickers'},{id:'goals',icon:'🎯',label:'How to Earn'}];
  function drawTabs(){$('sbTabs').innerHTML=TABS.map(t=>`<button class="tab${t.id===tab?' on':''}" data-tab="${t.id}"><b>${t.icon}</b>${t.label}</button>`).join('');}
  function drawBody(){
    let h='';
    if(tab==='tray'){
      const mine=A.filter(a=>got(a[0]));
      h=`<div class="sec"><h2>🏅 Tap a sticker to stick it on the page</h2>`+(mine.length?`<div class="sbgrid">`+mine.map(a=>`<button class="sbst" data-add="${a[0]}" title="${a[3]}"><svg viewBox="-50 -50 100 100">${badge(a,'t'+a[0])}</svg><span>${a[2]}</span></button>`).join('')+`</div>`
        :`<p class="note">No stickers yet! Save a look in Dress Up, finish a challenge, or bake a cupcake to earn your first one. Peek at 🎯 How to Earn.</p>`)+`</div>`;
    }else{
      h=`<div class="sec"><h2>🎯 Stickers to earn</h2><div class="sblist">`+A.map(a=>{const g=got(a[0]),gl=goalOf(a),c=curOf(a),pc=Math.round(c/gl*100);
        return `<div class="sbrow${g?' got':''}"><svg viewBox="-50 -50 100 100">${badge(a,'g'+a[0],!g)}</svg><div><b>${a[2]}</b><small>${a[3]}</small>`+
          (g?`<span class="sbdone">✅ Earned!</span>`:`<div class="sbbar"><i style="width:${pc}%"></i></div><span class="sbnum">${c} / ${gl}</span>`)+`</div></div>`;}).join('')+`</div></div>`;
    }
    const B=$('sbBody'),y=B.scrollTop;B.innerHTML=h;B.scrollTop=y;
  }
  function drawAll(){drawHead();drawStage();drawTool();drawTabs();drawBody();}
  const svgPoint=e=>{const r=$('sbSvg').getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*480,y:(e.clientY-r.top)/r.height*300};};

  function init(){
    addSection('mod-stickers',`<div class="app room-app sticker-app"><div class="stage-col">
      <div class="sbhead"><span class="pill" id="sbCount"></span><div class="sbpages" id="sbPages"></div></div>
      <div class="stage" id="sbStage"><svg id="sbSvg" viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sticker book page"></svg></div>
      <div class="tool" id="sbTool" hidden></div>
      <p class="hint">Drag stickers to move them. Tap one to make it bigger, turn it or peel it off.</p>
    </div><div class="panel"><div class="tabs" id="sbTabs"></div><div class="tab-body" id="sbBody"></div></div></div>`);
    const pop=document.createElement('div');pop.className='sbpop';pop.id='sbPop';pop.addEventListener('click',()=>{pop.classList.remove('on');location.hash='sticker-book';});document.body.appendChild(pop);

    $('sbTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;blip();drawTabs();drawBody();$('sbBody').scrollTop=0;});
    $('sbPages').addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(!b)return;page=b.dataset.page;sel=-1;blip();drawHead();drawStage();drawTool();popSvg($('sbSvg'));});
    $('sbBody').addEventListener('click',e=>{
      const b=e.target.closest('[data-add]');if(!b)return;
      const list=placed().slice();
      if(list.length>=MAXPLACED){toast('This page is full! Try another page.');return;}
      list.push([b.dataset.add,120+rint(240),90+rint(140),1,rint(31)-15]);setPlaced(list);sel=list.length-1;
      if(sound)tone(660,0,.12,.07,'triangle');drawStage();drawTool();sparkles('sbStage',4);
    });
    const svg=$('sbSvg');
    svg.addEventListener('pointerdown',e=>{
      const t=e.target.closest('[data-st]');
      if(!t){if(sel>=0){sel=-1;drawStage();drawTool();}return;}
      sel=+t.dataset.st;const p=placed()[sel],P=svgPoint(e);
      drag={sx:P.x,sy:P.y,ox:p[1],oy:p[2],moved:false,list:placed().map(x=>x.slice())};
      try{svg.setPointerCapture(e.pointerId);}catch(err){}e.preventDefault();drawStage();drawTool();
    });
    svg.addEventListener('pointermove',e=>{
      if(!drag)return;const P=svgPoint(e),dx=P.x-drag.sx,dy=P.y-drag.sy;
      if(!drag.moved&&Math.hypot(dx,dy)<4)return;drag.moved=true;
      const p=drag.list[sel];p[1]=Math.round(clamp(drag.ox+dx,20,460));p[2]=Math.round(clamp(drag.oy+dy,20,280));
      const all=Object.assign({},Progress.get('sb_place')||{});all[page]=drag.list;Progress.data.sb_place=all;drawStage();
    });
    const end=()=>{if(!drag)return;if(drag.moved)setPlaced(drag.list);drag=null;};
    svg.addEventListener('pointerup',end);svg.addEventListener('pointercancel',end);
    $('sbTool').addEventListener('click',e=>{
      const b=e.target.closest('[data-sbt]');if(!b)return;const list=placed().map(x=>x.slice()),p=list[sel];if(!p)return;
      const k=b.dataset.sbt;
      if(k==='small')p[3]=Math.max(.6,+((p[3]||1)-.2).toFixed(1));
      if(k==='big')p[3]=Math.min(2,+((p[3]||1)+.2).toFixed(1));
      if(k==='turn')p[4]=((p[4]||0)+30)%360;
      if(k==='del'){list.splice(sel,1);sel=-1;}
      setPlaced(list);blip();drawStage();drawTool();
    });
    injectCss(`
      .sticker-app .stage svg{touch-action:none;aspect-ratio:480/300}
      .sbhead{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between}
      .sbpages{display:flex;flex-wrap:wrap;gap:6px}
      .sbpages .pill{padding:7px 12px;font-size:14px}
      .sbgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:10px}
      .sbst{border:none;background:#faf5ff;border-radius:18px;padding:8px 4px;display:flex;flex-direction:column;align-items:center;gap:2px;font:inherit;font-size:13px;font-weight:600;color:var(--ink)}
      .sbst svg{width:66px;height:66px}.sbst:hover{background:var(--pink-soft);transform:scale(1.04)}
      .sblist{display:flex;flex-direction:column;gap:8px}
      .sbrow{display:flex;gap:12px;align-items:center;background:#faf5ff;border-radius:18px;padding:8px 12px}
      .sbrow.got{background:linear-gradient(#fff,#fff8dc)}
      .sbrow svg{width:58px;height:58px;flex:0 0 auto}
      .sbrow>div{flex:1;display:flex;flex-direction:column;gap:2px}
      .sbrow small{color:var(--muted)}
      .sbbar{height:10px;background:#ece3f6;border-radius:999px;overflow:hidden;margin-top:4px}
      .sbbar i{display:block;height:100%;background:linear-gradient(90deg,#ff7ab6,#b06bff);border-radius:999px}
      .sbnum{font-size:12px;color:var(--muted);font-weight:600}
      .sbdone{color:#2f9e5b;font-weight:700;font-size:14px}
      .sbpop{position:fixed;left:50%;top:18px;transform:translate(-50%,-160%);z-index:80;display:flex;gap:12px;align-items:center;background:#fff;border-radius:24px;padding:10px 18px 10px 10px;
        box-shadow:0 14px 40px rgba(143,107,255,.35);border:3px solid #ffd84d;cursor:pointer;transition:transform .45s cubic-bezier(.2,1.4,.4,1);max-width:92vw}
      .sbpop.on{transform:translate(-50%,0)}
      .sbpop svg{width:64px;height:64px;flex:0 0 auto;animation:sbspin 1s ease}
      .sbpop div{display:flex;flex-direction:column}
      .sbpop small{color:#e0457a;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:11px}
      .sbpop b{font-size:18px}.sbpop span{color:var(--muted);font-size:13px}
      @keyframes sbspin{from{transform:scale(.2) rotate(-200deg)}to{transform:none}}
    `);
    Track.on(()=>{if(ready)check(false);});
    Core.onAuth(()=>{check(true);if(!$('mod-stickers').hidden)drawAll();});
    setTimeout(()=>{ready=true;const f=check(true);if(f.length)toast(`🏅 You earned ${f.length} sticker${f.length>1?'s':''}! Open the Sticker Book to see.`);},1500);
  }
  function show(){check(true);sel=-1;drawAll();}
  registerStudio({hash:'sticker-book',el:'mod-stickers',emoji:'🏅',title:'Sticker Book',blurb:()=>`Earn stickers by playing, then decorate your book! (${count()} of ${A.length})`,init,show,
    preview:()=>{const mine=A.filter(a=>got(a[0])).slice(0,6);let o=SCENES.park.d('sbh');
      (mine.length?mine:A.slice(0,6)).forEach((a,i)=>{o+=`<g transform="translate(${80+(i%3)*160} ${90+Math.floor(i/3)*120}) rotate(${(i*17)%30-15}) scale(.85)">${badge(a,'h'+i,!mine.length)}</g>`;});
      return `<svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${o}</svg>`;}});
  return {check,list:A,count};
})();

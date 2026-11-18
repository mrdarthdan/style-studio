/* Style Studio — Room Designer module */
const Room=(()=>{
  const L=o=>Object.entries(o).map(([v,x])=>({v,l:x.l}));
  const TABS=[
    {id:'walls',icon:'🎨',label:'Walls',secs:[
      {t:'Wall color',type:'sw',key:'wall',colors:WALLC},
      {t:'Wallpaper',type:'it',key:'pattern',crop:'0 0 480 262',items:[['plain','Plain'],['stripes','Stripes'],['dots','Polka Dots'],['hearts','Hearts'],['stars','Stars'],['flowers','Flowers'],['clouds','Clouds'],['plaid','Plaid']].map(([v,l])=>({v,l}))}]},
    {id:'floor',icon:'🪵',label:'Floor',secs:[
      {t:'Floor',type:'it',key:'floor',crop:'0 200 480 160',items:L(FLOORS)}]},
    {id:'window',icon:'🪟',label:'Window',secs:[
      {t:'Window',type:'it',key:'window',crop:'0 10 270 210',items:[{v:'none',l:'No Window'}].concat(L(Object.fromEntries(Object.entries(WINDOWS).filter(([k])=>k!=='none'))))},
      {t:'The view outside',type:'it',key:'view',crop:'0 10 270 210',items:L(VIEWS)},
      {t:'Curtains',type:'sw',key:'curtain',colors:CURT}]},
    {id:'bed',icon:'🛏️',label:'Bed',secs:[
      {t:'Bed',type:'it',key:'bed',crop:'262 50 218 290',items:L(BEDS)},
      {t:'Bedding color',type:'sw',key:'bedColor',colors:CLOTH}]},
    {id:'rug',icon:'🟣',label:'Rug',secs:[
      {t:'Rug',type:'it',key:'rug',crop:'60 282 260 76',items:L(RUGS)},
      {t:'Rug color',type:'sw',key:'rugColor',colors:CLOTH}]},
    {id:'lights',icon:'💡',label:'Lights',secs:[
      {t:'Lights',type:'it',key:'light',crop:'0 0 480 262',items:L(LIGHTS)}]},
    {id:'decor',icon:'🧸',label:'Decorate',secs:DECOR_GROUPS.map(g=>({t:g,type:'decor',group:g}))},
    {id:'avatar',icon:'👧',label:'Move In',secs:[{t:'Who lives here?',type:'avatar'}]}
  ];
  const clone=o=>JSON.parse(JSON.stringify(o));
  function normalize(r){
    const o=Object.assign(clone(ROOM_DEF),r||{});
    o.items=(Array.isArray(o.items)?o.items:[]).filter(it=>it&&(ITEM_KINDS[it.t]?it[ITEM_KINDS[it.t].field]&&typeof it[ITEM_KINDS[it.t].field]==='object':DECOR[it.t]))
      .map(it=>{const K=ITEM_KINDS[it.t];return {t:it.t,x:+it.x||200,y:+it.y||330,s:clamp(+it.s||1,.4,2.5),f:!!it.f,c:it.c|0,...(K?{[K.field]:it[K.field]}:{})};}).slice(0,40);
    return o;
  }
  let room=null; /* loaded in init(), after every studio has registered its room item kinds */
  let tab='walls',sel=-1,drag=null;
  const closet=Closet({table:'stylestudio_rooms',field:'room',nameCol:'name',localKey:'ss_rooms',localMax:8,label:'rooms'});
  const save=()=>store.set('ss_room',room);

  function drawRoom(animate){
    const svg=$('rSvg');
    svg.innerHTML=renderRoom(room,{uid:'r',sel,interactive:true});
    $('rPlate').textContent=room.name?'🏠 '+room.name:'';
    drawTool();
    if(animate){popSvg(svg);sparkles('rStage',3);}
  }
  function drawTool(){
    const t=$('rTool'),it=room.items[sel];
    $('rHint').hidden=!!it;t.hidden=!it;if(!it)return;
    const K=ITEM_KINDS[it.t];
    $('rToolName').textContent=K?K.label(it):DECOR[it.t].l;
    t.querySelector('[data-act="color"]').hidden=!!K;
  }
  function drawTabs(){
    $('rTabs').innerHTML=TABS.map(t=>`<button class="tab${t.id===tab?' on':''}" data-tab="${t.id}"><b>${t.icon}</b>${t.label}</button>`).join('');
  }
  function avatarSection(){
    const cur=Dress.state,saved=Dress.closet.items(),has=room.items.find(i=>i.t==='avatar');
    const btn=(look,key,label)=>`<button class="opt" data-av="${key}"><svg viewBox="20 0 260 480" xmlns="http://www.w3.org/2000/svg">${render(Object.assign({},DEF,look),{bg:false,uid:'ra'+key})}</svg><span>${label}</span></button>`;
    let o=`<p class="note">Pick one of your avatars to move into this room. Then drag them anywhere you like!</p><div class="grid">`+btn(cur,'cur',cur.name||'Current look');
    saved.forEach((l,i)=>o+=btn(l,i,l.name||'Saved look '+(i+1)));
    o+=`</div>`;
    if(!saved.length)o+=`<p class="note">Save looks in <a href="#dress-up">👗 Dress Up</a> and they'll show up here too.</p>`;
    if(has)o+=`<button class="pill wide" data-moveout="1">🚪 Move out</button>`;
    if(typeof Pets!=='undefined'){
      const pets=[{p:Pets.state,k:'cur',l:Pets.state.name||'My pet'}].concat(Pets.closet.items().map((pt,i)=>({p:pt,k:i,l:pt.name||'Saved pet '+(i+1)})));
      o+=`<h2 style="margin-top:22px">🐾 Pets</h2><p class="note">Tap a pet to bring it into the room. You can have lots of pets!</p><div class="grid">`+
        pets.map(x=>`<button class="opt" data-pet="${x.k}"><svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">${renderPet(x.p,'rp'+x.k,{noBg:true})}</svg><span>${x.l}</span></button>`).join('')+`</div>`;
    }
    return o;
  }
  function drawBody(){
    const T=TABS.find(t=>t.id===tab);let n=0;
    $('rBody').innerHTML=T.secs.map(sec=>{
      let inner='';
      if(sec.type==='sw'){
        inner=`<div class="swatches">`+sec.colors.map((c,i)=>`<button class="sw${c?'':' none'}${room[sec.key]===i?' on':''}" style="${c?'background:'+c:''}" data-key="${sec.key}" data-val="${i}" data-num="1" aria-label="${c?'color '+(i+1):'none'}" title="${c?'':'None'}"></button>`).join('')+`</div>`;
      }else if(sec.type==='it'){
        inner=`<div class="grid land">`+sec.items.map(it=>{
          const r=Object.assign({},room,{[sec.key]:it.v});
          const svg=`<svg viewBox="${sec.crop}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${renderRoom(r,{uid:'rt'+(n++),noItems:true})}</svg>`;
          return `<button class="opt${room[sec.key]===it.v?' on':''}" data-key="${sec.key}" data-val="${it.v}">${svg}<span>${it.l}</span></button>`;
        }).join('')+`</div>`;
      }else if(sec.type==='decor'){
        inner=`<div class="grid">`+Object.entries(DECOR).filter(([,d])=>d.g===sec.group).map(([k,d])=>{
          const svg=`<svg viewBox="${d.box.join(' ')}" xmlns="http://www.w3.org/2000/svg">${drawItem({t:k,c:d.c},'rd'+k)}</svg>`;
          return `<button class="opt" data-add="${k}">${svg}<span>${d.l}</span></button>`;
        }).join('')+`</div>`;
      }else if(sec.type==='avatar')inner=avatarSection();
      return `<div class="sec"><h2>${sec.t}</h2>${inner}</div>`;
    }).join('')+(tab==='decor'?`<p class="note">Tap something to add it, then drag it around the room. Tap it again for bigger, smaller, flip and color buttons.</p><button class="pill wide" data-clear="1">🧹 Clear all decorations</button>`:'');
  }
  function drawCloset(){
    const box=$('rCloset'),list=closet.items();
    $('rClosetTitle').textContent=Core.user?'☁️ My Rooms — saved to your account':'🏠 My Rooms — saved on this device';
    if(list.length&&window.matchMedia('(max-width:820px)').matches)$('rClosetBox').classList.add('mobile');
    if(!list.length){box.innerHTML=`<div class="closet-empty">Tap 💾 Save Room to keep your favorite rooms here!${Core.user||!sb?'':' Sign in to keep them on every device.'}</div>`;return;}
    box.innerHTML=list.map((r,i)=>`<div class="look room" role="button" tabindex="0" data-look="${i}" title="Open this room"><svg viewBox="0 0 480 360">${renderRoom(normalize(r),{uid:'rc'+i})}</svg><button class="del" data-del="${i}" aria-label="Remove room">✖</button></div>`).join('');
  }
  function changed(redrawBody=true){
    save();drawRoom(true);
    if(redrawBody){const y=$('rBody').scrollTop;drawBody();$('rBody').scrollTop=y;}
  }
  function select(i){sel=i;drawRoom(false);}
  function addItem(t){
    if(room.items.length>=40){toast('Your room is full! Remove something to add more.');return;}
    const D=DECOR[t];
    room.items.push({t,x:clamp(150+Math.random()*100-50,30,450),y:D.y,s:1,f:false,c:D.c});
    sel=room.items.length-1;blip();changed(false);
  }
  function placeAvatar(look){
    const old=room.items.findIndex(i=>i.t==='avatar');
    const it={t:'avatar',look:Object.assign({},DEF,look),x:200,y:346,s:1,f:false,c:0};
    if(old>=0){it.x=room.items[old].x;it.y=room.items[old].y;it.s=room.items[old].s;it.f=room.items[old].f;room.items[old]=it;sel=old;}
    else{room.items.push(it);sel=room.items.length-1;}
    fanfare();changed();sparkles('rStage',6);
  }
  function surprise(){
    const avatar=room.items.find(i=>i.t==='avatar');
    Object.assign(room,{wall:rint(WALLC.length),pattern:pick(['plain','stripes','dots','hearts','stars','flowers','clouds','plaid']),floor:pick(keysOf(FLOORS)),
      window:pick(keysOf(WINDOWS).filter(k=>k!=='none')),view:pick(keysOf(VIEWS)),curtain:rint(CURT.length),bed:pick(keysOf(BEDS).filter(k=>k!=='none')),bedColor:rint(CLOTH.length),
      rug:pick(keysOf(RUGS)),rugColor:rint(CLOTH.length),light:pick(keysOf(LIGHTS))});
    const by=g=>keysOf(DECOR).filter(k=>DECOR[k].g===g);
    const items=[];
    [pick(by('Furniture')),pick(by('Plants')),pick(by('Toys & Pets')),pick(by('Toys & Pets'))].forEach((t,i)=>items.push({t,x:30+i*72+Math.random()*20,y:DECOR[t].y,s:1,f:Math.random()<.5,c:rint(CLOTH.length)}));
    const w=pick(by('Wall Decor'));items.unshift({t:w,x:245,y:DECOR[w].y,s:1,f:false,c:rint(CLOTH.length)});
    if(avatar)items.push(avatar);
    room.items=items;sel=-1;jingle();changed();sparkles('rStage',6);
  }

  /* ---------- dragging things around ---------- */
  function svgPoint(e){const svg=$('rSvg'),p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
  function onDown(e){
    const g=e.target.closest('[data-i]');
    if(!g){if(sel!==-1)select(-1);return;}
    const i=+g.dataset.i,it=room.items[i],p=svgPoint(e);
    if(sel!==i)select(i);
    drag={i,dx:it.x-p.x,dy:it.y-p.y,id:e.pointerId,moved:false};
    try{$('rSvg').setPointerCapture(e.pointerId);}catch(err){}
    e.preventDefault();
  }
  function onMove(e){
    if(!drag||e.pointerId!==drag.id)return;
    const it=room.items[drag.i],p=svgPoint(e);
    it.x=clamp(p.x+drag.dx,0,480);it.y=clamp(p.y+drag.dy,30,360);drag.moved=true;
    const g=$('rSvg').querySelector(`[data-i="${drag.i}"]`);if(g)g.setAttribute('transform',itemTransform(it));
  }
  function onUp(e){if(!drag||e.pointerId!==drag.id)return;if(drag.moved)save();drag=null;}

  function toolAction(act){
    const it=room.items[sel];if(!it)return;
    if(act==='bigger')it.s=clamp(+(it.s*1.15).toFixed(3),.4,2.5);
    else if(act==='smaller')it.s=clamp(+(it.s/1.15).toFixed(3),.4,2.5);
    else if(act==='flip')it.f=!it.f;
    else if(act==='front'){room.items.splice(sel,1);room.items.push(it);sel=room.items.length-1;}
    else if(act==='back'){room.items.splice(sel,1);room.items.unshift(it);sel=0;}
    else if(act==='color')it.c=(it.c+1)%CLOTH.length;
    else if(act==='delete'){room.items.splice(sel,1);sel=-1;}
    blip();save();drawRoom(false);
    if(tab==='avatar'){const y=$('rBody').scrollTop;drawBody();$('rBody').scrollTop=y;}
  }

  function init(){
    room=normalize(store.get('ss_room'));
    $('rTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;blip();drawTabs();drawBody();$('rBody').scrollTop=0;});
    $('rBody').addEventListener('click',e=>{
      const add=e.target.closest('[data-add]');if(add){addItem(add.dataset.add);return;}
      const av=e.target.closest('[data-av]');if(av){placeAvatar(av.dataset.av==='cur'?Dress.state:Dress.closet.items()[+av.dataset.av]);return;}
      const pt=e.target.closest('[data-pet]');
      if(pt){
        if(room.items.length>=40){toast('Your room is full! Remove something to add more.');return;}
        const pet=JSON.parse(JSON.stringify(pt.dataset.pet==='cur'?Pets.state:Pets.closet.items()[+pt.dataset.pet]));
        room.items.push({t:'pet',pet,x:clamp(120+Math.random()*80,30,450),y:346,s:1,f:Math.random()<.5,c:0});sel=room.items.length-1;fanfare();changed(false);return;
      }
      if(e.target.closest('[data-moveout]')){room.items=room.items.filter(i=>i.t!=='avatar');sel=-1;blip();changed();return;}
      if(e.target.closest('[data-clear]')){const b=e.target.closest('[data-clear]');confirmTap(b,'🧹 Clear all decorations',()=>{room.items=room.items.filter(i=>i.t==='avatar');sel=-1;blip();changed();});return;}
      const b=e.target.closest('[data-key]');if(!b)return;
      const key=b.dataset.key,val=b.dataset.num?Number(b.dataset.val):b.dataset.val;
      room[key]=val;
      if(key==='curtain'&&room.window==='none'&&val)room.window='classic';
      if(key==='bedColor'&&room.bed==='none')room.bed='simple';
      if(key==='rugColor'&&room.rug==='none')room.rug='round';
      blip();changed();
    });
    const svg=$('rSvg');
    svg.addEventListener('pointerdown',onDown);
    svg.addEventListener('pointermove',onMove);
    svg.addEventListener('pointerup',onUp);
    svg.addEventListener('pointercancel',onUp);
    $('rTool').addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(b)toolAction(b.dataset.act);});
    $('rName').value=room.name||'';
    $('rName').addEventListener('input',e=>{room.name=e.target.value;save();$('rPlate').textContent=room.name?'🏠 '+room.name:'';});
    $('rRand').addEventListener('click',()=>{surprise();Track.hit('surprise');});
    const resetLabel='<b>🔄</b>Start Over';
    $('rReset').addEventListener('click',()=>confirmTap($('rReset'),resetLabel,()=>{blip();room=normalize(Object.assign(clone(ROOM_DEF),{name:room.name}));sel=-1;changed();}));
    $('rSave').addEventListener('click',async()=>{
      const b=$('rSave');b.disabled=true;
      const ok=await closet.add(clone(room),room.name);
      b.disabled=false;if(!ok)return;
      drawCloset();fanfare();sparkles('rStage',8);
      b.innerHTML='<b>💖</b>Saved!';setTimeout(()=>b.innerHTML='<b>💾</b>Save Room',1400);
    });
    $('rCloset').addEventListener('click',async e=>{
      const d=e.target.closest('[data-del]');
      if(d){e.stopPropagation();if(await closet.remove(Number(d.dataset.del))){drawCloset();blip();}return;}
      const l=e.target.closest('[data-look]');if(!l)return;
      room=normalize(clone(closet.items()[Number(l.dataset.look)]));sel=-1;$('rName').value=room.name||'';blip();changed();
    });
    $('rShow').addEventListener('click',()=>{sel=-1;drawRoom(false);showOff(`<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">${renderRoom(room,{uid:'rs'})}</svg>`,room.name?`🏠 ${room.name} 🏠`:'🏠 My Dream Room 🏠',true);});
    Core.onAuth(()=>{drawCloset();if(tab==='avatar')drawBody();});
  }
  function show(){drawTabs();drawRoom(false);drawBody();drawCloset();}
  registerStudio({hash:'room-designer',el:'mod-room',emoji:'🛏️',title:'Room Designer',blurb:'Decorate your dream bedroom, then move in!',init,show,
    preview:()=>`<svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg">${renderRoom(room,{uid:'hr'})}</svg>`});
  return {init,show,closet,get room(){return room;}};
})();

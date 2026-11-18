/* Style Studio — Dress Up module */
const Dress=(()=>{
  const L=a=>a.map(([v,l])=>({v,l}));
  const TABS=[
    {id:'me',icon:'🙂',label:'Me',secs:[
      {t:'Skin tone',type:'sw',key:'skin',colors:SKIN},
      {t:'Eye color',type:'sw',key:'eyes',colors:EYEC},
      {t:'Lashes',type:'it',key:'lashes',crop:'104 98 92 48',items:L([[0,'Natural'],[1,'Lashy'],[2,'Glam']])}]},
    {id:'hair',icon:'💇',label:'Hair',secs:[
      {t:'Hairstyle',type:'it',key:'hair',crop:'34 0 232 300',items:L([['long','Long'],['bob','Bob'],['ponytail','Ponytail'],['pigtails','Pigtails'],['bun','Top Bun'],['spacebuns','Space Buns'],['curly','Curly'],['braids','Braids'],['pixie','Pixie']])},
      {t:'Hair color',type:'sw',key:'hairColor',colors:HAIRC}]},
    {id:'makeup',icon:'💄',label:'Makeup',secs:[
      {t:'Eyeshadow',type:'sw',key:'shadow',colors:SHADOW},
      {t:'Blush',type:'sw',key:'blush',colors:BLUSH},
      {t:'Lip color',type:'sw',key:'lips',colors:LIPS},
      {t:'Face sparkles',type:'it',key:'sticker',crop:'96 96 108 82',items:L([['none','None'],['freckles','Freckles'],['stars','Stars'],['hearts','Hearts'],['gems','Gems'],['butterfly','Butterfly'],['rainbow','Rainbow']])}]},
    {id:'tops',icon:'👚',label:'Tops',secs:[
      {t:'Tops',type:'it',key:'top',crop:'74 176 152 136',items:L([['tee','Heart Tee'],['tank','Star Tank'],['sweater','Sweater'],['hoodie','Hoodie'],['blouse','Blouse'],['jacket','Jacket'],['jersey','Jersey']])},
      {t:'Top color',type:'sw',key:'topColor',colors:CLOTH}]},
    {id:'bottoms',icon:'👖',label:'Bottoms',secs:[
      {t:'Bottoms',type:'it',key:'bottom',crop:'54 250 192 220',items:L([['skirt','Skirt'],['longskirt','Long Skirt'],['jeans','Jeans'],['shorts','Shorts'],['tutu','Tutu'],['leggings','Leggings']])},
      {t:'Bottom color',type:'sw',key:'bottomColor',colors:CLOTH}]},
    {id:'dresses',icon:'👗',label:'Dresses',secs:[
      {t:'Dresses',type:'it',key:'dress',crop:'20 170 260 310',items:L([['none','No Dress'],['gown','Princess Gown'],['sundress','Sundress'],['party','Party Dress'],['ballerina','Ballerina'],['mermaid','Mermaid']])},
      {t:'Dress color',type:'sw',key:'dressColor',colors:CLOTH}]},
    {id:'shoes',icon:'👟',label:'Shoes',secs:[
      {t:'Shoes',type:'it',key:'shoes',crop:'96 372 108 100',items:L([['sneakers','Sneakers'],['boots','Boots'],['flats','Sparkle Flats'],['rainboots','Rain Boots'],['ballet','Ballet'],['sandals','Sandals'],['none','Barefoot']])},
      {t:'Shoe color',type:'sw',key:'shoesColor',colors:CLOTH}]},
    {id:'acc',icon:'👑',label:'Extras',secs:[
      {t:'Hats & headwear',type:'it',key:'hat',crop:'40 -4 220 170',items:L([['none','None'],['tiara','Tiara'],['bow','Big Bow'],['headband','Headband'],['sunhat','Sun Hat'],['beanie','Beanie'],['flowers','Flower Crown'],['catears','Cat Ears'],['unicorn','Unicorn']])},
      {t:'Headwear color',type:'sw',key:'hatColor',colors:CLOTH},
      {t:'Glasses',type:'it',key:'glasses',crop:'90 92 120 70',items:L([['none','None'],['round','Round'],['heart','Hearts'],['star','Stars'],['cateye','Cat Eye']])},
      {t:'Glasses color',type:'sw',key:'glassesColor',colors:CLOTH},
      {t:'Necklace',type:'it',key:'necklace',crop:'112 176 76 66',items:L([['none','None'],['pearls','Pearls'],['heart','Heart'],['rainbow','Rainbow'],['star','Star']])},
      {t:'Earrings',type:'it',key:'earrings',crop:'70 108 60 60',items:L([['none','None'],['studs','Sparkle'],['hoops','Hoops'],['stars','Stars'],['hearts','Hearts']])},
      {t:'Hold something',type:'it',key:'held',crop:'150 110 130 260',items:L([['none','Nothing'],['purse','Purse'],['wand','Magic Wand'],['balloon','Balloon'],['bouquet','Flowers'],['teddy','Teddy Bear']])}]},
    {id:'places',icon:'🏞️',label:'Places',secs:[
      {t:'Where are you?',type:'it',key:'bg',wide:true,bgOnly:true,items:L([['bedroom','Bedroom'],['beach','Beach'],['castle','Castle'],['stage','Stage'],['park','Park'],['space','Space'],['snow','Snow Day'],['candy','Candy Land']])}]}
  ];

  let state=Object.assign({},DEF,store.get('ss_state')||{});
  let tab='me';
  const closet=Closet({table:'stylestudio_looks',field:'look',nameCol:'avatar_name',localKey:'ss_closet',localMax:12,label:'looks'});
  const save=()=>store.set('ss_state',state);

  function drawAvatar(animate){
    const svg=$('dSvg');svg.innerHTML=render(state);
    $('dPlate').textContent=state.name?'⭐ '+state.name+' ⭐':'';
    if(animate){popSvg(svg);sparkles('dStage',3);}
  }
  function drawTabs(){
    $('dTabs').innerHTML=TABS.map(t=>`<button class="tab${t.id===tab?' on':''}" data-tab="${t.id}"><b>${t.icon}</b>${t.label}</button>`).join('');
  }
  function drawBody(){
    const T=TABS.find(t=>t.id===tab);let n=0;
    $('dBody').innerHTML=T.secs.map(sec=>{
      let inner='';
      if(sec.type==='sw'){
        inner=`<div class="swatches">`+sec.colors.map((c,i)=>`<button class="sw${c?'':' none'}${state[sec.key]===i?' on':''}" style="${c?'background:'+c:''}" data-key="${sec.key}" data-val="${i}" data-num="1" aria-label="${c?'color '+(i+1):'none'}" title="${c?'':'None'}"></button>`).join('')+`</div>`;
      }else{
        inner=`<div class="grid${sec.wide?' wide':''}">`+sec.items.map(it=>{
          const s=Object.assign({},state,{[sec.key]:it.v});
          if(sec.key==='top'||sec.key==='bottom')s.dress='none';
          const vb=sec.bgOnly?'0 0 300 480':sec.crop;
          const svg=`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${render(s,{uid:'dt'+(n++),bg:!!sec.bgOnly,bgOnly:!!sec.bgOnly})}</svg>`;
          const on=state[sec.key]===it.v&&!((sec.key==='top'||sec.key==='bottom')&&state.dress!=='none');
          return `<button class="opt${on?' on':''}" data-key="${sec.key}" data-val="${it.v}" ${typeof it.v==='number'?'data-num="1"':''}>${svg}<span>${it.l}</span></button>`;
        }).join('')+`</div>`;
      }
      return `<div class="sec"><h2>${sec.t}</h2>${inner}</div>`;
    }).join('');
  }
  function drawCloset(){
    const box=$('dCloset'),list=closet.items();
    $('dClosetTitle').textContent=Core.user?'☁️ My Looks — saved to your account':'👗 My Looks — saved on this device';
    if(list.length&&window.matchMedia('(max-width:820px)').matches)$('dClosetBox').classList.add('mobile');
    if(!list.length){box.innerHTML=`<div class="closet-empty">Tap 📸 Save Look to keep your favorite outfits here!${Core.user||!sb?'':' Sign in to keep them on every device.'}</div>`;return;}
    box.innerHTML=list.map((s,i)=>`<div class="look" role="button" tabindex="0" data-look="${i}" title="Wear this look"><svg viewBox="0 0 300 480">${render(Object.assign({},DEF,s),{uid:'dc'+i})}</svg><button class="del" data-del="${i}" aria-label="Remove look">✖</button></div>`).join('');
  }
  function update(){save();drawAvatar(true);const y=$('dBody').scrollTop;drawBody();$('dBody').scrollTop=y;}

  function init(){
    $('dTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;blip();drawTabs();drawBody();$('dBody').scrollTop=0;});
    $('dBody').addEventListener('click',e=>{
      const b=e.target.closest('[data-key]');if(!b)return;
      const key=b.dataset.key,val=b.dataset.num?Number(b.dataset.val):b.dataset.val;
      state[key]=val;
      if(['top','bottom','topColor','bottomColor'].includes(key))state.dress='none';
      if(key==='dressColor'&&state.dress==='none')state.dress='gown';
      if(key==='hatColor'&&state.hat==='none')state.hat='bow';
      if(key==='glassesColor'&&state.glasses==='none')state.glasses='heart';
      blip();update();
    });
    $('dName').value=state.name||'';
    $('dName').addEventListener('input',e=>{state.name=e.target.value;save();drawAvatar(false);});
    $('dRand').addEventListener('click',()=>{
      Object.assign(state,{
        eyes:rint(EYEC.length),lashes:pick([0,1,2]),hair:pick(keysOf(HAIR)),hairColor:rint(HAIRC.length),
        shadow:Math.random()<.5?0:rint(SHADOW.length),blush:rint(BLUSH.length),
        lips:Math.random()<.4?0:rint(LIPS.length),sticker:Math.random()<.5?'none':pick(['freckles','stars','hearts','gems','butterfly','rainbow']),
        top:pick(keysOf(TOPS)),topColor:rint(CLOTH.length),bottom:pick(keysOf(BOTTOMS)),bottomColor:rint(CLOTH.length),
        dress:Math.random()<.45?pick(keysOf(DRESSES).filter(d=>d!=='none')):'none',dressColor:rint(CLOTH.length),
        shoes:pick(keysOf(SHOES).filter(x=>x!=='none')),shoesColor:rint(CLOTH.length),
        hat:Math.random()<.4?'none':pick(keysOf(HATS)),hatColor:rint(CLOTH.length),
        glasses:Math.random()<.7?'none':pick(keysOf(GLASSES)),glassesColor:rint(CLOTH.length),
        necklace:Math.random()<.5?'none':pick(keysOf(NECKLACES)),earrings:Math.random()<.5?'none':pick(keysOf(EARRINGS)),
        held:Math.random()<.5?'none':pick(keysOf(HELD)),bg:pick(keysOf(BG))
      });
      jingle();update();sparkles('dStage',6);
    });
    const resetLabel='<b>🔄</b>Start Over';
    $('dReset').addEventListener('click',()=>confirmTap($('dReset'),resetLabel,()=>{blip();state=Object.assign({},DEF,{name:state.name});update();}));
    $('dSave').addEventListener('click',async()=>{
      const b=$('dSave');b.disabled=true;
      const ok=await closet.add(Object.assign({},state),state.name);
      b.disabled=false;if(!ok)return;
      drawCloset();fanfare();sparkles('dStage',8);
      b.innerHTML='<b>💖</b>Saved!';setTimeout(()=>b.innerHTML='<b>📸</b>Save Look',1400);
    });
    $('dCloset').addEventListener('click',async e=>{
      const d=e.target.closest('[data-del]');
      if(d){e.stopPropagation();if(await closet.remove(Number(d.dataset.del))){drawCloset();blip();}return;}
      const l=e.target.closest('[data-look]');if(!l)return;
      state=Object.assign({},DEF,closet.items()[Number(l.dataset.look)]);$('dName').value=state.name||'';blip();update();
    });
    $('dShow').addEventListener('click',()=>showOff(`<svg viewBox="0 0 300 480" xmlns="http://www.w3.org/2000/svg">${render(state,{uid:'s'})}</svg>`,state.name?`🌟 ${state.name} 🌟`:'🌟 Superstar! 🌟'));
    Core.onAuth(drawCloset);
  }
  function show(){drawTabs();drawAvatar(false);drawBody();drawCloset();}
  return {init,show,closet,get state(){return state;}};
})();

/* Style Studio — studio kit: the shared layout, option panel, closet and buttons most studios use.
   makeStudio(cfg) builds a whole "pick options, see it change, save it" studio from:
     prefix, hash, emoji, title, blurb, viewBox, label, defaults, storeKey, kind, closetLabel,
     render(state,uid,opts) -> svg markup, tabs [{id,icon,label,secs:[...]}], surprise(state) -> state,
     plus optional hooks: onPick, onAct, onStageClick, afterDraw, belowStage, showTitle, plate, previewBox, wideStage,
     reset(state) -> state, toSave(state) -> what gets saved, load(state, saved) -> state. */
function studioLayout(p,o){
  return `<div class="app${o.wideStage?' room-app':''}"><div class="stage-col">`+
    `<div class="stage" id="${p}Stage"><svg id="${p}Svg" viewBox="${o.viewBox}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.label}"></svg><div class="plate" id="${p}Plate"></div></div>`+
    (o.belowStage||'')+
    `<div class="name-row"><label for="${p}Name">${o.nameLabel||'Name'}</label><input id="${p}Name" maxlength="${o.nameMax||20}" placeholder="${o.namePh||''}" autocomplete="off"></div>`+
    `<div class="actions">${o.actions.map(a=>`<button class="act${a.primary?' primary':''}" id="${p}${a.id}"><b>${a.icon}</b>${a.label}</button>`).join('')}</div>`+
    `<div class="closet" id="${p}ClosetBox"><h3 id="${p}ClosetTitle"></h3><div class="closet-list" id="${p}Closet"></div></div>`+
    `</div><div class="panel"><div class="tabs" id="${p}Tabs"></div><div class="tab-body" id="${p}Body"></div></div></div>`;
}
function swatchRow(sec,cur){
  return `<div class="swatches">`+sec.colors.map((c,i)=>`<button class="sw${c?'':' none'}${cur===i?' on':''}" style="${c?'background:'+c:''}" data-key="${sec.key}" data-val="${i}" data-num="1" aria-label="${c?'color '+(i+1):'none'}" title="${c?'':'None'}"></button>`).join('')+`</div>`;
}

function makeStudio(cfg){
  const p=cfg.prefix;
  const clone=o=>JSON.parse(JSON.stringify(o));
  const fresh=()=>Object.assign(clone(cfg.defaults),cfg.normalize?cfg.normalize({}):{});
  let state=Object.assign(clone(cfg.defaults),store.get(cfg.storeKey)||{});
  if(cfg.normalize)state=cfg.normalize(state);
  let tab=cfg.tabs[0].id;
  const closet=Closet({table:'stylestudio_items',kind:cfg.kind,field:'data',nameCol:'name',localKey:cfg.storeKey+'_saved',localMax:12,label:cfg.closetLabel});
  const S={closet,get state(){return state;},set state(v){state=v;}};
  const save=()=>store.set(cfg.storeKey,state);
  const plate=()=>state.name?(cfg.plate?cfg.plate(state.name):'⭐ '+state.name+' ⭐'):'';

  S.draw=animate=>{
    const svg=$(p+'Svg');svg.innerHTML=cfg.render(state,'m'+p,{stage:true});
    $(p+'Plate').textContent=plate();
    if(cfg.afterDraw)cfg.afterDraw(state);
    if(animate){popSvg(svg);sparkles(p+'Stage',3);}
  };
  function drawTabs(){
    $(p+'Tabs').innerHTML=cfg.tabs.map(t=>`<button class="tab${t.id===tab?' on':''}" data-tab="${t.id}"><b>${t.icon}</b>${t.label}</button>`).join('');
  }
  S.drawBody=()=>{
    const T=cfg.tabs.find(t=>t.id===tab);let n=0;
    $(p+'Body').innerHTML=T.secs.filter(sec=>!sec.when||sec.when(state)).map(sec=>{
      let inner='';
      if(sec.type==='sw')inner=swatchRow(sec,sec.get?sec.get(state):state[sec.key]);
      else if(sec.type==='it'){
        const items=typeof sec.items==='function'?sec.items(state):sec.items;
        inner=`<div class="grid${sec.cls?' '+sec.cls:''}">`+items.map(it=>{
          const preview=sec.apply?sec.apply(clone(state),it.v):Object.assign(clone(state),{[sec.key]:it.v});
          const svg=`<svg viewBox="${sec.crop||cfg.viewBox}" ${sec.slice?'preserveAspectRatio="xMidYMid slice"':''} xmlns="http://www.w3.org/2000/svg">${(sec.thumb||cfg.render)(preview,'t'+p+(n++),{thumb:true,sec})}</svg>`;
          const on=sec.isOn?sec.isOn(state,it.v):state[sec.key]===it.v;
          return `<button class="opt${on?' on':''}" data-key="${sec.key}" data-val="${it.v}" ${typeof it.v==='number'?'data-num="1"':''}>${svg}<span>${it.l}</span></button>`;
        }).join('')+`</div>`;
      }else if(sec.type==='html')inner=sec.html(state);
      return `<div class="sec">${sec.t?`<h2>${sec.t}</h2>`:''}${inner}</div>`;
    }).join('')+(T.note?`<p class="note">${T.note}</p>`:'');
  };
  S.drawCloset=()=>{
    const box=$(p+'Closet'),list=closet.items();
    $(p+'ClosetTitle').textContent=(Core.user?'☁️ ':cfg.emoji+' ')+'My '+cfg.closetLabel+(Core.user?' — saved to your account':' — saved on this device');
    if(list.length&&window.matchMedia('(max-width:820px)').matches)$(p+'ClosetBox').classList.add('mobile');
    if(!list.length){box.innerHTML=`<div class="closet-empty">Tap 💾 Save to keep your favorites here!${Core.user||!sb?'':' Sign in to keep them on every device.'}</div>`;return;}
    box.innerHTML=list.map((s,i)=>`<div class="look ${cfg.closetCls||'sq'}" role="button" tabindex="0" data-look="${i}" title="Open this one"><svg viewBox="${cfg.viewBox}">${cfg.render(cfg.normalize?cfg.normalize(Object.assign(clone(cfg.defaults),s)):Object.assign(clone(cfg.defaults),s),'c'+p+i,{thumb:true})}</svg><button class="del" data-del="${i}" aria-label="Remove">✖</button></div>`).join('');
  };
  S.update=(animate=true,body=true)=>{
    save();S.draw(animate);
    if(body){const el=$(p+'Body'),y=el.scrollTop;S.drawBody();el.scrollTop=y;}
  };

  function init(){
    addSection(cfg.el,studioLayout(p,Object.assign({},cfg,{actions:[
      {id:'Rand',icon:'🎲',label:'Surprise'},{id:'Save',icon:'💾',label:'Save'},
      {id:'Show',icon:'🌟',label:'Show Off',primary:true},{id:'Reset',icon:'🔄',label:'Start Over'}]})));
    $(p+'Tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;blip();drawTabs();S.drawBody();$(p+'Body').scrollTop=0;});
    $(p+'Body').addEventListener('click',e=>{
      const act=e.target.closest('[data-act]');
      if(act&&cfg.onAct){cfg.onAct(state,act.dataset.act,act,S);return;}
      const b=e.target.closest('[data-key]');if(!b)return;
      const key=b.dataset.key,val=b.dataset.num?Number(b.dataset.val):b.dataset.val;
      if(!(cfg.onPick&&cfg.onPick(state,key,val,S)))state[key]=val;
      blip();S.update();
    });
    $(p+'Svg').addEventListener('click',e=>{if(cfg.onStageClick)cfg.onStageClick(state,e,S);});
    $(p+'Name').value=state.name||'';
    $(p+'Name').addEventListener('input',e=>{state.name=e.target.value;save();$(p+'Plate').textContent=plate();if(cfg.nameRedraws)S.draw(false);});
    $(p+'Rand').addEventListener('click',()=>{state=cfg.surprise(clone(state));jingle();Track.hit('surprise');S.update();sparkles(p+'Stage',6);});
    const resetLabel='<b>🔄</b>Start Over';
    $(p+'Reset').addEventListener('click',()=>confirmTap($(p+'Reset'),resetLabel,()=>{blip();const n=state.name;state=cfg.reset?cfg.reset(clone(state)):fresh();state.name=n;S.update();}));
    $(p+'Save').addEventListener('click',async()=>{
      const b=$(p+'Save');b.disabled=true;
      const ok=await closet.add(clone(cfg.toSave?cfg.toSave(state):state),state.name);
      b.disabled=false;if(!ok)return;
      S.drawCloset();fanfare();sparkles(p+'Stage',8);
      b.innerHTML='<b>💖</b>Saved!';setTimeout(()=>b.innerHTML='<b>💾</b>Save',1400);
    });
    $(p+'Closet').addEventListener('click',async e=>{
      const d=e.target.closest('[data-del]');
      if(d){e.stopPropagation();if(await closet.remove(Number(d.dataset.del))){S.drawCloset();blip();}return;}
      const l=e.target.closest('[data-look]');if(!l)return;
      const saved=clone(closet.items()[Number(l.dataset.look)]);
      state=cfg.load?cfg.load(clone(state),saved):Object.assign(clone(cfg.defaults),saved);
      if(cfg.normalize)state=cfg.normalize(state);
      $(p+'Name').value=state.name||'';blip();S.update();
    });
    $(p+'Show').addEventListener('click',()=>{
      if(cfg.beforeShow)cfg.beforeShow(state,S);
      showOff(`<svg viewBox="${cfg.viewBox}" xmlns="http://www.w3.org/2000/svg">${cfg.render(state,'s'+p,{show:true})}</svg>`,cfg.showTitle(state),!!cfg.wideStage);
    });
    if(cfg.init)cfg.init(S);
    Core.onAuth(S.drawCloset);
  }
  S.show=()=>{drawTabs();S.draw(false);S.drawBody();S.drawCloset();if(cfg.onShow)cfg.onShow(S);};
  registerStudio({hash:cfg.hash,el:cfg.el,emoji:cfg.emoji,title:cfg.title,blurb:cfg.blurb,init,show:S.show,
    preview:()=>`<svg viewBox="${cfg.previewBox||cfg.viewBox}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${cfg.render(state,'h'+p,{thumb:true,preview:true})}</svg>`});
  return S;
}

injectCss(`
  .look.sq svg{width:90px;height:90px}
  .cbanner{background:linear-gradient(135deg,#fff4c2,#ffe3f1);border-radius:20px;padding:12px 14px;box-shadow:0 4px 14px rgba(255,170,60,.18)}
  .cbanner[hidden]{display:none}
`);

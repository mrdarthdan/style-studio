/* Style Studio — Coloring Studio. Tap-to-fill coloring pages (400 x 400). Every fillable shape has a region id;
   shapes that share an id fill together (both ears, all the petals...). */
const PAL=['#FF4D6D','#FF8FA3','#FFC2D1','#FF9F43','#FFC872','#FFD84D','#FFF3A3','#7BD88F','#3BAE5A','#A8E6C9','#38C6C6','#9FE7FF',
  '#5DA9FF','#3D63C9','#8F7CFF','#C77DFF','#E4D9FF','#F4A6D7','#C68A45','#8B5A2B','#FDE7D6','#9AA3B5','#2E2E3A','#FFFFFF'];
const INK='#3b2453';
const ring=(cx,cy,R,r,a0,a1)=>{const p=(rad,a)=>[(cx+rad*Math.cos(a)).toFixed(1),(cy+rad*Math.sin(a)).toFixed(1)];const[x0,y0]=p(R,a0),[x1,y1]=p(R,a1),[x2,y2]=p(r,a1),[x3,y3]=p(r,a0);
  return `M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r} ${r} 0 0 0 ${x3} ${y3} Z`;};
const flowerR=(F,id,cx,cy,r)=>{let o='';for(let i=0;i<5;i++){const a=i*Math.PI*2/5-Math.PI/2;o+=`<circle ${F(id+'p')} cx="${(cx+Math.cos(a)*r).toFixed(1)}" cy="${(cy+Math.sin(a)*r).toFixed(1)}" r="${r*.8}"/>`;}return o+`<circle ${F(id+'c')} cx="${cx}" cy="${cy}" r="${r*.62}"/>`;};
const starPts=(cx,cy,r)=>{const p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;p.push((cx+rr*Math.cos(a)).toFixed(1)+','+(cy+rr*Math.sin(a)).toFixed(1));}return p.join(' ');};
const PAGES={
  kitty:{l:'Kitty',draw:F=>`<rect ${F('bg')} width="400" height="400"/><circle ${F('sun')} cx="340" cy="60" r="32"/><path ${F('grass')} d="M0 322 Q200 292 400 322 V400 H0 Z"/>`+
    flowerR(F,'fa',52,340,14)+flowerR(F,'fb',352,350,12)+
    `<path ${F('tail')} d="M262 300 Q344 302 332 220 Q328 188 306 196 Q320 240 300 268 Q282 290 258 280 Z"/>`+
    `<path ${F('ears')} d="M130 124 L120 46 L184 98 Z"/><path ${F('ears')} d="M270 124 L280 46 L216 98 Z"/><path ${F('inner')} d="M138 108 L132 70 L168 96 Z"/><path ${F('inner')} d="M262 108 L268 70 L232 96 Z"/>`+
    `<ellipse ${F('body')} cx="200" cy="290" rx="90" ry="74"/><ellipse ${F('belly')} cx="200" cy="304" rx="48" ry="46"/>`+
    `<ellipse ${F('paws')} cx="160" cy="360" rx="28" ry="16"/><ellipse ${F('paws')} cx="240" cy="360" rx="28" ry="16"/>`+
    `<circle ${F('head')} cx="200" cy="172" r="86"/><ellipse ${F('eyes')} cx="168" cy="166" rx="13" ry="17"/><ellipse ${F('eyes')} cx="232" cy="166" rx="13" ry="17"/>`+
    `<circle cx="168" cy="170" r="6" fill="${INK}"/><circle cx="232" cy="170" r="6" fill="${INK}"/><path ${F('nose')} d="M192 194 H208 L200 204 Z"/>`+
    `<path d="M200 204 Q192 214 184 208 M200 204 Q208 214 216 208 M160 200 L118 194 M160 208 L120 214 M240 200 L282 194 M240 208 L280 214" fill="none"/>`+
    `<path ${F('bow')} d="M200 256 L170 240 L170 272 Z"/><path ${F('bow')} d="M200 256 L230 240 L230 272 Z"/><circle ${F('knot')} cx="200" cy="256" r="8"/>`},
  unicorn:{l:'Unicorn',draw:F=>`<rect ${F('bg')} width="400" height="400"/>`+
    `<path ${F('rb1')} d="${ring(300,360,170,148,Math.PI,2*Math.PI)}"/><path ${F('rb2')} d="${ring(300,360,148,126,Math.PI,2*Math.PI)}"/><path ${F('rb3')} d="${ring(300,360,126,104,Math.PI,2*Math.PI)}"/>`+
    `<g><ellipse ${F('cloud')} cx="60" cy="70" rx="40" ry="20"/><circle ${F('cloud')} cx="48" cy="58" r="20"/><circle ${F('cloud')} cx="72" cy="54" r="22"/></g>`+
    [[330,40],[360,120],[40,200]].map(([x,y],i)=>`<polygon ${F('st'+i)} points="${starPts(x,y,18)}"/>`).join('')+
    `<path ${F('head')} d="M150 400 L168 262 Q120 252 88 232 Q58 212 68 180 Q84 148 132 150 Q170 120 212 130 Q262 142 272 202 Q282 262 262 400 Z"/>`+
    `<ellipse ${F('muzzle')} cx="92" cy="206" rx="32" ry="27"/><circle cx="80" cy="200" r="4" fill="${INK}"/><path d="M76 222 Q90 230 104 222" fill="none"/>`+
    `<path ${F('ear')} d="M214 134 L232 84 L246 142 Z"/><path ${F('horn')} d="M178 130 L200 40 L216 134 Z"/><path d="M186 104 L210 98 M192 80 L206 76 M196 60 L203 58" fill="none"/>`+
    `<path d="M168 182 Q182 172 196 182 M170 182 l-6 -6 M178 177 l-3 -8 M188 177 l1 -8" fill="none"/>`+
    [[246,142,26],[272,182,28],[284,228,28],[290,276,28],[290,326,28],[288,374,26],[228,124,22]].map(([x,y,r],i)=>`<circle ${F(i%2?'maneB':'maneA')} cx="${x}" cy="${y}" r="${r}"/>`).join('')+
    flowerR(F,'mf',246,150,10)},
  butterfly:{l:'Butterfly',draw:F=>`<rect ${F('bg')} width="400" height="400"/><path ${F('grass')} d="M0 340 Q200 316 400 340 V400 H0 Z"/>`+
    flowerR(F,'fa',70,350,14)+flowerR(F,'fb',200,362,12)+flowerR(F,'fc',330,350,14)+
    `<ellipse ${F('wingTop')} cx="128" cy="150" rx="84" ry="66" transform="rotate(-24 128 150)"/><ellipse ${F('wingTop')} cx="272" cy="150" rx="84" ry="66" transform="rotate(24 272 150)"/>`+
    `<ellipse ${F('wingLow')} cx="150" cy="252" rx="58" ry="52" transform="rotate(24 150 252)"/><ellipse ${F('wingLow')} cx="250" cy="252" rx="58" ry="52" transform="rotate(-24 250 252)"/>`+
    `<circle ${F('spotA')} cx="110" cy="140" r="24"/><circle ${F('spotA')} cx="290" cy="140" r="24"/><circle ${F('spotB')} cx="150" cy="110" r="12"/><circle ${F('spotB')} cx="250" cy="110" r="12"/>`+
    `<circle ${F('spotC')} cx="146" cy="260" r="18"/><circle ${F('spotC')} cx="254" cy="260" r="18"/><circle ${F('spotD')} cx="80" cy="186" r="10"/><circle ${F('spotD')} cx="320" cy="186" r="10"/>`+
    `<ellipse ${F('body')} cx="200" cy="212" rx="16" ry="92"/><circle ${F('headB')} cx="200" cy="108" r="22"/>`+
    `<path d="M192 90 Q170 50 150 44 M208 90 Q230 50 250 44" fill="none"/><circle ${F('ant')} cx="148" cy="42" r="9"/><circle ${F('ant')} cx="252" cy="42" r="9"/>`+
    `<circle cx="193" cy="106" r="3.5" fill="${INK}"/><circle cx="207" cy="106" r="3.5" fill="${INK}"/><path d="M193 116 Q200 122 207 116" fill="none"/>`},
  flowerpot:{l:'Flower Pot',draw:F=>{let o=`<rect ${F('bg')} width="400" height="400"/><circle ${F('sun')} cx="60" cy="60" r="34"/><rect ${F('table')} x="0" y="330" width="400" height="70"/>`;
    o+=`<rect ${F('stem')} x="193" y="180" width="14" height="128"/><ellipse ${F('leaves')} cx="160" cy="250" rx="34" ry="14" transform="rotate(-30 160 250)"/><ellipse ${F('leaves')} cx="240" cy="232" rx="34" ry="14" transform="rotate(30 240 232)"/>`;
    for(let i=0;i<8;i++){const a=i*Math.PI/4;o+=`<ellipse ${F(i%2?'petB':'petA')} cx="${(200+48*Math.cos(a)).toFixed(1)}" cy="${(140+48*Math.sin(a)).toFixed(1)}" rx="30" ry="18" transform="rotate(${i*45} ${(200+48*Math.cos(a)).toFixed(1)} ${(140+48*Math.sin(a)).toFixed(1)})"/>`;}
    o+=`<circle ${F('center')} cx="200" cy="140" r="30"/>`+flowerR(F,'sl',110,200,16)+`<rect ${F('stem2')} x="106" y="216" width="8" height="92"/>`+flowerR(F,'sr',300,180,16)+`<rect ${F('stem2')} x="296" y="196" width="8" height="112"/>`;
    o+=`<path ${F('pot')} d="M120 316 L280 316 L262 392 L138 392 Z"/><rect ${F('rim')} x="108" y="296" width="184" height="26" rx="8"/><path ${F('potHeart')} d="M200 372 C176 356 182 336 200 346 C218 336 224 356 200 372 Z"/>`;
    return o;}},
  house:{l:'Cozy House',draw:F=>`<rect ${F('sky')} width="400" height="400"/><circle ${F('sun')} cx="340" cy="64" r="34"/>`+
    `<g><ellipse ${F('cloud')} cx="90" cy="70" rx="44" ry="20"/><circle ${F('cloud')} cx="76" cy="58" r="20"/><circle ${F('cloud')} cx="102" cy="52" r="24"/></g>`+
    `<path ${F('hill')} d="M0 300 Q120 250 230 290 T400 280 V400 H0 Z"/><path ${F('path')} d="M190 400 Q196 350 200 330 L224 330 Q232 350 250 400 Z"/>`+
    `<rect ${F('chimney')} x="226" y="110" width="30" height="60"/><path ${F('roof')} d="M100 196 L200 104 L300 196 Z"/><rect ${F('wall')} x="118" y="196" width="164" height="134"/>`+
    `<rect ${F('door')} x="182" y="256" width="40" height="74" rx="20"/><circle cx="214" cy="296" r="4" fill="${INK}"/>`+
    `<rect ${F('window')} x="134" y="216" width="38" height="38"/><rect ${F('window')} x="232" y="216" width="38" height="38"/><path d="M153 216 V254 M134 235 H172 M251 216 V254 M232 235 H270" fill="none"/>`+
    `<rect ${F('trunk')} x="334" y="236" width="20" height="80"/><circle ${F('tree')} cx="344" cy="214" r="40"/>`+
    flowerR(F,'fa',60,330,12)+flowerR(F,'fb',100,350,10)+flowerR(F,'fc',300,350,12)},
  fish:{l:'Under the Sea',draw:F=>`<rect ${F('water')} width="400" height="400"/><path ${F('sand')} d="M0 340 Q200 312 400 340 V400 H0 Z"/>`+
    `<path ${F('weedA')} d="M60 344 Q40 300 62 260 Q84 220 62 180 Q92 220 80 262 Q70 300 84 342 Z"/><path ${F('weedB')} d="M340 340 Q320 290 344 250 Q366 214 350 190 Q380 222 364 260 Q350 300 362 338 Z"/>`+
    `<path ${F('tail')} d="M276 200 L352 146 L340 200 L352 254 Z"/><path ${F('finTop')} d="M170 132 Q210 84 256 136 Z"/>`+
    `<ellipse ${F('fish')} cx="200" cy="200" rx="92" ry="66"/><path ${F('stripe')} d="M178 138 Q190 200 178 262 L200 266 Q212 200 200 134 Z"/><path ${F('stripe2')} d="M232 144 Q242 200 232 256 L248 250 Q256 200 248 150 Z"/>`+
    `<path ${F('finSide')} d="M200 214 Q226 234 220 256 Q200 246 192 222 Z"/><circle ${F('eye')} cx="144" cy="186" r="16"/><circle cx="140" cy="186" r="7" fill="${INK}"/><path d="M118 216 Q128 224 138 218" fill="none"/>`+
    [[110,110,9],[90,80,6],[120,56,11],[300,90,8]].map(([x,y,r])=>`<circle ${F('bubbles')} cx="${x}" cy="${y}" r="${r}"/>`).join('')+
    `<polygon ${F('starfish')} points="${starPts(150,360,22)}"/><path ${F('shell')} d="M250 372 Q264 336 280 372 Z"/>`},
  cupcake:{l:'Cupcake',draw:F=>`<rect ${F('bg')} width="400" height="400"/><ellipse ${F('plate')} cx="200" cy="364" rx="150" ry="22"/>`+
    `<path ${F('wrap')} d="M118 236 L282 236 L260 354 L140 354 Z"/><path ${F('wrapStripes')} d="M146 236 L160 354 L176 354 L166 236 Z"/><path ${F('wrapStripes')} d="M192 236 L192 354 L208 354 L208 236 Z"/><path ${F('wrapStripes')} d="M234 236 L224 354 L240 354 L254 236 Z"/>`+
    `<path ${F('frost1')} d="M104 240 Q100 198 140 194 L260 194 Q300 198 296 240 Q200 256 104 240 Z"/><path ${F('frost2')} d="M126 196 Q124 156 160 152 L240 152 Q276 156 274 196 Z"/><path ${F('frost3')} d="M152 154 Q156 110 200 104 Q244 110 248 154 Z"/>`+
    `<path d="M200 82 Q206 66 222 60" fill="none"/><circle ${F('cherry')} cx="200" cy="92" r="18"/>`+
    [[150,214,'sprA'],[196,222,'sprB'],[244,212,'sprC'],[170,176,'sprB'],[226,170,'sprA'],[200,132,'sprC']].map(([x,y,id],i)=>`<rect ${F(id)} x="${x-9}" y="${y-4}" width="18" height="8" rx="4" transform="rotate(${(i*37)%90-40} ${x} ${y})"/>`).join('')+
    [[60,90],[340,100],[70,280],[332,270]].map(([x,y],i)=>`<path ${F(i%2?'heartB':'heartA')} d="M${x} ${y+14} C${x-22} ${y} ${x-10} ${y-16} ${x} ${y-4} C${x+10} ${y-16} ${x+22} ${y} ${x} ${y+14} Z"/>`).join('')},
  rocket:{l:'Rocket',draw:F=>`<rect ${F('space')} width="400" height="400"/><circle ${F('planet')} cx="80" cy="300" r="56"/><path ${F('ring')} d="M14 318 Q80 270 150 290 Q156 300 146 304 Q80 288 22 326 Q12 326 14 318 Z"/>`+
    `<circle ${F('moon')} cx="330" cy="70" r="30"/>`+[[60,60,14],[200,40,10],[360,200,14],[300,340,12],[150,150,8]].map(([x,y,r])=>`<polygon ${F('stars')} points="${starPts(x,y,r)}"/>`).join('')+
    `<path ${F('flameOut')} d="M184 314 Q200 390 216 314 Z"/><path ${F('flameIn')} d="M192 314 Q200 362 208 314 Z"/>`+
    `<path ${F('fins')} d="M170 250 L134 310 L170 300 Z"/><path ${F('fins')} d="M230 250 L266 310 L230 300 Z"/>`+
    `<path ${F('body')} d="M170 130 Q200 80 230 130 L230 314 L170 314 Z"/><path ${F('nose')} d="M170 130 Q200 60 230 130 Q200 120 170 130 Z"/>`+
    `<circle ${F('window')} cx="200" cy="186" r="22"/><circle ${F('glass')} cx="200" cy="186" r="13"/><rect ${F('band')} x="170" y="250" width="60" height="16"/>`},
  mandala:{l:'Mandala',draw:F=>{let o=`<rect ${F('bg')} width="400" height="400"/><circle ${F('m0')} cx="200" cy="200" r="180"/>`;
    for(let i=0;i<16;i++){const a=i*Math.PI/8;o+=`<circle ${F('dots')} cx="${(200+164*Math.cos(a)).toFixed(1)}" cy="${(200+164*Math.sin(a)).toFixed(1)}" r="9"/>`;}
    for(let i=0;i<8;i++){const a=i*Math.PI/4,x=(200+108*Math.cos(a)).toFixed(1),y=(200+108*Math.sin(a)).toFixed(1);o+=`<ellipse ${F(i%2?'big2':'big1')} cx="${x}" cy="${y}" rx="44" ry="24" transform="rotate(${i*45} ${x} ${y})"/>`;}
    o+=`<circle ${F('c1')} cx="200" cy="200" r="72"/>`;
    for(let i=0;i<12;i++){const a=i*Math.PI/6+Math.PI/12,x=(200+50*Math.cos(a)).toFixed(1),y=(200+50*Math.sin(a)).toFixed(1);o+=`<ellipse ${F(i%2?'sm2':'sm1')} cx="${x}" cy="${y}" rx="20" ry="10" transform="rotate(${i*30+15} ${x} ${y})"/>`;}
    o+=`<circle ${F('c2')} cx="200" cy="200" r="30"/><polygon ${F('cstar')} points="${starPts(200,200,24)}"/><circle ${F('c3')} cx="200" cy="200" r="8"/>`;
    return o;}}
};

function renderColoring(s,uid,o={}){
  const page=PAGES[s.page]?s.page:'kitty',fills=(s.fills&&s.fills[page])||{};
  const F=id=>`data-r="${id}" fill="${fills[id]||'#fff'}"`;
  return `<g stroke="${INK}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">${PAGES[page].draw(F)}</g>`;
}

const Coloring=(()=>{
  const undo=[];
  const TOOLS=[['fill','🪣','Fill'],['magic','🌈','Magic'],['eraser','🧽','Eraser']];
  const S=makeStudio({
    prefix:'cl',hash:'coloring',el:'mod-coloring',emoji:'🖍️',title:'Coloring Studio',blurb:'Pick a picture and tap to color it in!',
    viewBox:'0 0 400 400',label:'Your coloring page',nameLabel:'Title',namePh:'Name your picture',kind:'coloring',closetLabel:'Pictures',storeKey:'ss_color',
    defaults:{name:'',page:'kitty',fills:{},color:0,tool:'fill'},
    normalize:s=>{if(!s.fills||typeof s.fills!=='object')s.fills={};if(!PAGES[s.page])s.page='kitty';return s;},
    render:renderColoring,
    plate:n=>'🖍️ '+n,
    showTitle:s=>s.name?`🖍️ ${s.name} 🖍️`:'🖍️ My Masterpiece! 🖍️',
    belowStage:`<p class="hint">Pick a color, then tap any part of the picture to fill it in ✨</p>`,
    tabs:[
      {id:'colors',icon:'🎨',label:'Colors',secs:[
        {t:'Tools',type:'html',html:s=>`<div class="tools">`+TOOLS.map(([k,i,l])=>`<button class="pill${s.tool===k?' go':''}" data-act="tool:${k}">${i} ${l}</button>`).join('')+`<button class="pill" data-act="undo">↩️ Undo</button></div>`},
        {t:'Colors',type:'sw',key:'color',colors:PAL}]},
      {id:'pages',icon:'🖼️',label:'Pictures',secs:[{t:'Pick a picture',type:'it',key:'page',crop:'0 0 400 400',items:Object.entries(PAGES).map(([v,p])=>({v,l:p.l}))}]}
    ],
    surprise:s=>{const page=s.page,f={};PAGES[page].draw(id=>{f[id]=PAL[rint(PAL.length-1)];return '';});s.fills[page]=f;return s;},
    reset:s=>{s.fills[s.page]={};return s;},
    toSave:s=>({name:s.name,page:s.page,fills:{[s.page]:s.fills[s.page]||{}}}),
    load:(s,saved)=>{s.name=saved.name||'';s.page=PAGES[saved.page]?saved.page:'kitty';s.fills[s.page]=(saved.fills&&saved.fills[s.page])||{};return s;},
    onPick:(s,key,val)=>{if(key==='color'){s.color=val;if(s.tool==='eraser')s.tool='fill';return true;}return false;},
    onAct:(s,act,el,St)=>{
      if(act.startsWith('tool:')){s.tool=act.slice(5);blip();St.update(false);return;}
      if(act==='undo'){const u=undo.pop();if(!u){toast('Nothing to undo yet.');return;}const f=(s.fills[u.page]=s.fills[u.page]||{});if(u.prev)f[u.id]=u.prev;else delete f[u.id];s.page=u.page;blip();St.update(false);}
    },
    onStageClick:(s,e,St)=>{
      const el=e.target.closest('[data-r]');if(!el)return;
      const id=el.dataset.r,f=(s.fills[s.page]=s.fills[s.page]||{});
      undo.push({page:s.page,id,prev:f[id]});if(undo.length>60)undo.shift();
      if(s.tool==='eraser')delete f[id];
      else f[id]=s.tool==='magic'?PAL[rint(PAL.length-1)]:PAL[s.color];
      if(sound)tone(500+rint(500),0,.1,.05);
      St.update(false,false);
    },
    init:()=>injectCss(`#clSvg{cursor:pointer}#clSvg [data-r]:hover{opacity:.85}.tools{display:flex;flex-wrap:wrap;gap:8px}`)
  });
  return S;
})();

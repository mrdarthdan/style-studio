/* Style Studio — Cake & Cupcake Bakery. Build a layer cake or a cupcake (300 x 300), add toppings, light candles and blow them out. */
const CAKE_FLAVORS=['#F6E3B4','#7B4A2E','#FF9EBB','#FFD84D','#C9A3FF','#A8E6C9','#FFFFFF','#D94B5B'];
const FROST=['#FFFFFF','#FFC2D1','#FF8FA3','#C77DFF','#9FE7FF','#A8E6C9','#FFF3A3','#8B5A2B','#FF9F43','#5DA9FF'];
const PLATES=['#FFFFFF','#FFC2D1','#9FE7FF','#FFD84D','#C9CBDA'];
const BAKE_BG=['#FFF1E6','#FFE3F1','#E4D9FF','#D4F1FF','#DFF7DF'];
const FROST_STYLES={smooth:'Smooth',drip:'Drippy',swirl:'Swirls',ruffle:'Ruffles'};
const TOPPINGS={none:'None',sprinkles:'Sprinkles',cherries:'Cherries',strawberries:'Strawberries',stars:'Stars',hearts:'Hearts',pearls:'Pearls',choc:'Chocolate Chips'};
const CAKE_TOPS={none:'None',candles:'Candles',unicorn:'Unicorn Horn',crown:'Crown',flower:'Big Flower',heart:'Heart Topper',bear:'Teddy Bear'};
const bakeEsc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
const WRAPS={stripes:'Stripes',dots:'Dots',plain:'Plain',zigzag:'Zigzag'};

function bakeToppings(t,x0,x1,yOf,r){
  let o='';const w=x1-x0,n=Math.max(4,Math.round(w/18));
  for(let i=0;i<n;i++){
    const x=x0+(i+.5)*w/n+(r()-.5)*6,y=yOf(x)+(r()-.5)*8;
    if(t==='sprinkles'){const c=['#FF4D6D','#FFD84D','#5DA9FF','#7BD88F','#C77DFF','#FF9F43'][(r()*6)|0];o+=`<rect x="${(x-5).toFixed(1)}" y="${(y-2).toFixed(1)}" width="10" height="4" rx="2" fill="${c}" transform="rotate(${(r()*180)|0} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      const x2=x+(r()-.5)*10,y2=y+8+r()*6,c2=['#FF4D6D','#FFD84D','#5DA9FF','#7BD88F'][(r()*4)|0];o+=`<rect x="${(x2-4).toFixed(1)}" y="${(y2-1.5).toFixed(1)}" width="8" height="3" rx="1.5" fill="${c2}" transform="rotate(${(r()*180)|0} ${x2.toFixed(1)} ${y2.toFixed(1)})"/>`;}
    if(t==='cherries'&&i%2===0)o+=`<path d="M${x.toFixed(1)} ${(y-8).toFixed(1)} q3 -10 9 -12" stroke="#4E8A3A" stroke-width="2" fill="none"/><circle cx="${x.toFixed(1)}" cy="${(y-4).toFixed(1)}" r="7" fill="#D7263D" stroke="#9B1B2C" stroke-width="1.5"/><circle cx="${(x-2.5).toFixed(1)}" cy="${(y-6.5).toFixed(1)}" r="2" fill="#fff" opacity=".7"/>`;
    if(t==='strawberries'&&i%2===0)o+=`<path d="M${(x-8).toFixed(1)} ${(y-8).toFixed(1)} Q${x.toFixed(1)} ${(y+14).toFixed(1)} ${(x+8).toFixed(1)} ${(y-8).toFixed(1)} Z" fill="#FF4D6D" stroke="#C2185B" stroke-width="1.3"/><path d="M${(x-6).toFixed(1)} ${(y-9).toFixed(1)} l3 -4 l3 3 l3 -3 l3 4 Z" fill="#4E8A3A"/><circle cx="${(x-2).toFixed(1)}" cy="${(y-3).toFixed(1)}" r=".9" fill="#FFF3A3"/><circle cx="${(x+2).toFixed(1)}" cy="${(y).toFixed(1)}" r=".9" fill="#FFF3A3"/>`;
    if(t==='stars')o+=star(x,y-2,6,'#FFD84D','stroke="#E0B030" stroke-width="1"');
    if(t==='hearts')o+=heart(x,y-2,6,i%2?'#FF4D6D':'#FF8FA3','stroke="#C2185B" stroke-width="1"');
    if(t==='pearls')o+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="#FFFDF5" stroke="#D8CFC0"/><circle cx="${(x-1.4).toFixed(1)}" cy="${(y-1.4).toFixed(1)}" r="1.3" fill="#fff"/>`;
    if(t==='choc')o+=`<path d="M${(x-4).toFixed(1)} ${(y+3).toFixed(1)} Q${x.toFixed(1)} ${(y-9).toFixed(1)} ${(x+4).toFixed(1)} ${(y+3).toFixed(1)} Z" fill="#5A3420"/>`;
  }
  return o;
}
function frostTop(style,x0,x1,y,col,dark,r){
  /* icing band that sits on top of a layer: returns markup */
  const w=x1-x0;let o='';
  if(style==='drip'){let d=`M${x0-3} ${y-6} H${x1+3} V${y+6}`;const n=Math.round(w/16);
    for(let i=n;i>0;i--){const xa=x0+i*w/n,xm=xa-w/n/2,len=8+r()*18;d+=` Q${(xa-2).toFixed(1)} ${y+6} ${(xm+5).toFixed(1)} ${(y+6).toFixed(1)} V${(y+len).toFixed(1)} a5 5 0 0 1 -10 0 V${y+6}`;}
    d+=` H${x0-3} Z`;o+=`<path d="${d}" fill="${col}" stroke="${dark}" stroke-width="2"/>`;}
  else if(style==='ruffle'){o+=`<rect x="${x0-3}" y="${y-6}" width="${w+6}" height="12" rx="6" fill="${col}" stroke="${dark}" stroke-width="2"/>`;
    for(let x=x0;x<=x1;x+=11)o+=`<circle cx="${x}" cy="${y+6}" r="6" fill="${col}" stroke="${dark}" stroke-width="1.6"/>`;}
  else if(style==='swirl'){o+=`<rect x="${x0-3}" y="${y-6}" width="${w+6}" height="12" rx="6" fill="${col}" stroke="${dark}" stroke-width="2"/>`;
    for(let x=x0+6;x<=x1-4;x+=16)o+=`<path d="M${x-7} ${y-2} q7 -14 14 0 q-7 4 -14 0 Z" fill="${col}" stroke="${dark}" stroke-width="1.6"/><path d="M${x-3} ${y-6} q3 -5 6 0" stroke="${dark}" stroke-width="1.2" fill="none"/>`;}
  else o+=`<rect x="${x0-3}" y="${y-6}" width="${w+6}" height="14" rx="7" fill="${col}" stroke="${dark}" stroke-width="2"/>`;
  return o;
}
function candles(n,cx,y,out,flameOn){
  let o='';const gap=18,x0=cx-(n-1)*gap/2,cols=['#FF8FA3','#9FE7FF','#FFD84D','#C77DFF','#7BD88F'];
  for(let i=0;i<n;i++){const x=x0+i*gap,c=cols[i%5];
    o+=`<rect x="${x-4}" y="${y-34}" width="8" height="34" rx="2" fill="${c}" stroke="${shade(c,-.3)}" stroke-width="1.5"/><path d="M${x-4} ${y-26} l8 -5 M${x-4} ${y-16} l8 -5 M${x-4} ${y-6} l8 -5" stroke="#fff" stroke-width="2"/>`;
    o+=`<path d="M${x} ${y-34} v-5" stroke="#3b2453" stroke-width="1.5"/>`;
    if(!out&&flameOn)o+=`<g class="flame"><path d="M${x} ${y-54} Q${x+8} ${y-44} ${x} ${y-38} Q${x-8} ${y-44} ${x} ${y-54} Z" fill="#FFB020"/><path d="M${x} ${y-48} Q${x+4} ${y-43} ${x} ${y-40} Q${x-4} ${y-43} ${x} ${y-48} Z" fill="#FFF3A3"/></g>`;
    else o+=`<path d="M${x} ${y-42} q4 -6 0 -12 q-4 -6 0 -12" stroke="#C9CBDA" stroke-width="2" fill="none" opacity=".8"/>`;
  }
  return o;
}
function topper(t,cx,y,out){
  if(t==='candles')return candles(3,cx,y,out,true);
  if(t==='unicorn')return `<path d="M${cx-10} ${y} L${cx} ${y-50} L${cx+10} ${y} Z" fill="#FFD84D" stroke="#C9A43A" stroke-width="2"/><path d="M${cx-7} ${y-14} L${cx+8} ${y-18} M${cx-5} ${y-28} L${cx+6} ${y-31} M${cx-3} ${y-40} L${cx+3} ${y-42}" stroke="#C9A43A" stroke-width="1.6"/>`+
    `<path d="M${cx-34} ${y} L${cx-26} ${y-20} L${cx-16} ${y} Z" fill="#FFC2D1" stroke="#E07AA0" stroke-width="2"/><path d="M${cx+34} ${y} L${cx+26} ${y-20} L${cx+16} ${y} Z" fill="#FFC2D1" stroke="#E07AA0" stroke-width="2"/>`+flower(cx-20,y-2,5,'#C77DFF','#FFD84D')+flower(cx+20,y-2,5,'#5DA9FF','#FFD84D');
  if(t==='crown')return `<path d="M${cx-30} ${y} V${y-26} L${cx-15} ${y-12} L${cx} ${y-34} L${cx+15} ${y-12} L${cx+30} ${y-26} V${y} Z" fill="#FFD84D" stroke="#C9A43A" stroke-width="2"/><circle cx="${cx}" cy="${y-9}" r="5" fill="#FF4D6D"/><circle cx="${cx-18}" cy="${y-7}" r="3.5" fill="#5DA9FF"/><circle cx="${cx+18}" cy="${y-7}" r="3.5" fill="#7BD88F"/>`;
  if(t==='flower')return flower(cx,y-18,14,'#FF8FA3','#FFD84D')+`<path d="M${cx} ${y} v-6" stroke="#4E8A3A" stroke-width="3"/>`;
  if(t==='heart')return `<path d="M${cx} ${y} v-20" stroke="#C9A43A" stroke-width="2.5"/>`+heart(cx,y-30,16,'#FF4D6D','stroke="#C2185B" stroke-width="2"');
  if(t==='bear')return `<circle cx="${cx-14}" cy="${y-40}" r="8" fill="#C68A45" stroke="#8B5A2B" stroke-width="2"/><circle cx="${cx+14}" cy="${y-40}" r="8" fill="#C68A45" stroke="#8B5A2B" stroke-width="2"/><ellipse cx="${cx}" cy="${y-10}" rx="18" ry="14" fill="#C68A45" stroke="#8B5A2B" stroke-width="2"/><circle cx="${cx}" cy="${y-30}" r="16" fill="#C68A45" stroke="#8B5A2B" stroke-width="2"/><ellipse cx="${cx}" cy="${y-25}" rx="7" ry="5" fill="#F3D1A6"/><circle cx="${cx}" cy="${y-27}" r="2.2" fill="#3b2453"/><circle cx="${cx-6}" cy="${y-34}" r="2" fill="#3b2453"/><circle cx="${cx+6}" cy="${y-34}" r="2" fill="#3b2453"/>`+heart(cx,y-10,6,'#FF4D6D');
  return '';
}
function renderBake(s,uid,o={}){
  const r=rng(11),fc=FROST[s.frost]??FROST[0],fd=shade(fc,fc==='#FFFFFF'?-.18:-.3),plate=PLATES[s.plate]??PLATES[0];
  let out=`<rect width="300" height="300" fill="${BAKE_BG[s.bg]??BAKE_BG[0]}"/>`;
  out+=`<rect y="248" width="300" height="52" fill="${shade(BAKE_BG[s.bg]??BAKE_BG[0],-.08)}"/>`;
  [[30,40],[270,36],[24,200],[278,190]].forEach(([x,y])=>out+=star(x,y,5,'#fff','opacity=".9"'));
  out+=`<ellipse cx="150" cy="262" rx="${s.kind==='cake'?120:84}" ry="14" fill="${plate}" stroke="${shade(plate,-.2)}" stroke-width="2"/>`;
  if(s.kind==='cake'){
    const n=Math.max(1,Math.min(3,s.layers|0)),H=n===1?66:n===2?52:44,widths=[200,156,116];
    let y=256,topY=0;
    for(let i=0;i<n;i++){
      const w=widths[i],x0=150-w/2,x1=150+w/2,col=CAKE_FLAVORS[(s.flavors||[])[i]??0]??CAKE_FLAVORS[0],cd=shade(col,col==='#FFFFFF'?-.15:-.25);
      out+=`<rect x="${x0}" y="${y-H}" width="${w}" height="${H}" rx="6" fill="${col}" stroke="${cd}" stroke-width="2"/>`;
      out+=`<path d="M${x0+4} ${y-H/2} H${x1-4}" stroke="${fc}" stroke-width="5" stroke-linecap="round" opacity=".9"/>`;
      if(s.style==='ruffle')for(let x=x0+8;x<x1-4;x+=12)out+=`<path d="M${x} ${y-4} q6 -10 12 0" stroke="${fd}" stroke-width="1.6" fill="none"/>`;
      if(s.style==='swirl')out+=`<path d="M${x0+10} ${y-12} ${Array.from({length:Math.floor((w-20)/14)},()=>'q7 -7 14 0').join(' ')}" stroke="${fc}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      out+=frostTop(s.style,x0,x1,y-H,fc,fd,r);
      if(s.topping!=='none')out+=bakeToppings(s.topping,x0+6,x1-6,()=>y-H-2,r);
      topY=y-H-6;y-=H;
    }
    out+=topper(s.top,150,topY+2,s.blown);
    if(s.name&&!o.thumb)out+=`<text x="150" y="250" text-anchor="middle" font-family="'Baloo 2',Fredoka,sans-serif" font-weight="800" font-size="13" fill="${shade(fc,-.45)}">${bakeEsc(s.name).slice(0,16)}</text>`;
  }else{
    const wc=FROST[s.wrap]??FROST[2],wd=shade(wc,-.3),col=CAKE_FLAVORS[(s.flavors||[])[0]??0];
    out+=`<path d="M92 160 L208 160 L192 256 L108 256 Z" fill="${wc}" stroke="${wd}" stroke-width="2.5"/>`;
    if(s.wrapStyle==='stripes')for(let x=104;x<204;x+=16)out+=`<path d="M${x} 160 L${108+(x-92)*.72} 256" stroke="${shade(wc,-.15)}" stroke-width="6"/>`;
    if(s.wrapStyle==='dots')for(let y=172;y<252;y+=16)for(let x=108+((y/16)%2)*8;x<196;x+=16)out+=`<circle cx="${x}" cy="${y}" r="3.5" fill="#fff" opacity=".85"/>`;
    if(s.wrapStyle==='zigzag')[180,206,232].forEach(y=>out+=`<path d="M${100+(y-160)*.16} ${y} ${Array.from({length:8},(_,i)=>`l${(100-(y-160)*.32)/16} ${i%2?-6:6} l${(100-(y-160)*.32)/16} ${i%2?6:-6}`).join(' ')}" stroke="#fff" stroke-width="3" fill="none"/>`);
    out+=`<path d="M92 160 L208 160 L192 256 L108 256 Z" fill="none" stroke="${wd}" stroke-width="2.5"/>`;
    out+=`<path d="M86 164 Q84 136 110 134 H190 Q216 136 214 164 Z" fill="${col}" stroke="${shade(col,-.25)}" stroke-width="2"/>`;
    /* frosting pile */
    if(s.style==='swirl'||s.style==='smooth')out+=`<path d="M80 160 Q74 128 104 124 Q100 96 130 94 Q132 66 150 52 Q168 66 170 94 Q200 96 196 124 Q226 128 220 160 Q150 176 80 160 Z" fill="${fc}" stroke="${fd}" stroke-width="2.5"/>`+(s.style==='swirl'?`<path d="M100 132 Q150 146 200 132 M118 102 Q150 114 182 102" stroke="${fd}" stroke-width="2" fill="none"/>`:'');
    else if(s.style==='drip')out+=`<path d="M82 156 Q78 104 150 96 Q222 104 218 156 L210 156 V172 a6 6 0 0 1 -12 0 V156 H176 V180 a6 6 0 0 1 -12 0 V156 H142 V168 a6 6 0 0 1 -12 0 V156 H108 V176 a6 6 0 0 1 -12 0 V156 Z" fill="${fc}" stroke="${fd}" stroke-width="2.5"/>`;
    else{out+=`<path d="M84 158 Q80 112 150 100 Q220 112 216 158 Z" fill="${fc}" stroke="${fd}" stroke-width="2.5"/>`;for(let x=92;x<=208;x+=14)out+=`<circle cx="${x}" cy="158" r="8" fill="${fc}" stroke="${fd}" stroke-width="2"/>`;}
    const topY=s.style==='swirl'||s.style==='smooth'?64:104;
    if(s.topping!=='none')out+=bakeToppings(s.topping,98,202,x=>{const d=Math.abs(x-150)/52;return (s.style==='swirl'||s.style==='smooth')?100+d*d*40:120+d*d*28;},r);
    out+=topper(s.top,150,topY,s.blown);
  }
  return out;
}

const Bakery=(()=>{
  const flavorSec=i=>({t:i===0?'Bottom layer':i===1?'Middle layer':'Top layer',type:'sw',key:'fl'+i,colors:CAKE_FLAVORS,get:s=>s.flavors[i]??0,when:s=>s.kind==='cake'&&s.layers>i});
  const S=makeStudio({
    prefix:'bk',hash:'bakery',el:'mod-bakery',emoji:'🧁',title:'Cake & Cupcake Bakery',blurb:'Bake, frost and decorate — then blow out the candles!',
    viewBox:'0 0 300 300',label:'Your bakery treat',nameLabel:'Name',namePh:'Name your treat',kind:'bakery',closetLabel:'Treats',storeKey:'ss_bake',
    defaults:{name:'',kind:'cupcake',layers:2,flavors:[0,1,2],frost:1,style:'swirl',topping:'sprinkles',top:'candles',wrap:2,wrapStyle:'stripes',plate:0,bg:0,blown:false},
    normalize:s=>{if(!Array.isArray(s.flavors))s.flavors=[0,1,2];while(s.flavors.length<3)s.flavors.push(0);return s;},
    render:renderBake,previewBox:'40 30 220 240',
    plate:n=>'🧁 '+n,nameRedraws:true,
    showTitle:s=>s.name?`🎂 ${s.name} 🎂`:(s.kind==='cake'?'🎂 Happy Cake Day! 🎂':'🧁 Sweet Treat! 🧁'),
    belowStage:`<div class="row-btns"><button class="pill go" id="bkBlow">🌬️ Make a wish &amp; blow!</button></div>`,
    tabs:[
      {id:'base',icon:'🎂',label:'Treat',secs:[
        {t:'What are we baking?',type:'it',key:'kind',items:[{v:'cupcake',l:'Cupcake'},{v:'cake',l:'Layer Cake'}]},
        {t:'Layers',type:'it',key:'layers',when:s=>s.kind==='cake',items:[{v:1,l:'One'},{v:2,l:'Two'},{v:3,l:'Three'}]},
        {t:'Cake flavor',type:'sw',key:'fl0',colors:CAKE_FLAVORS,get:s=>s.flavors[0],when:s=>s.kind==='cupcake'},
        flavorSec(0),flavorSec(1),flavorSec(2),
        {t:'Cupcake wrapper',type:'sw',key:'wrap',colors:FROST,when:s=>s.kind==='cupcake'},
        {t:'Wrapper pattern',type:'it',key:'wrapStyle',crop:'80 150 140 112',when:s=>s.kind==='cupcake',items:Object.entries(WRAPS).map(([v,l])=>({v,l}))}],
        note:'Flavors: vanilla, chocolate, strawberry, lemon, grape, mint, coconut and red velvet!'},
      {id:'frost',icon:'🍦',label:'Frosting',secs:[
        {t:'Frosting color',type:'sw',key:'frost',colors:FROST},
        {t:'Frosting style',type:'it',key:'style',items:Object.entries(FROST_STYLES).map(([v,l])=>({v,l}))}]},
      {id:'top',icon:'🍓',label:'Toppings',secs:[
        {t:'Toppings',type:'it',key:'topping',items:Object.entries(TOPPINGS).map(([v,l])=>({v,l}))},
        {t:'On top',type:'it',key:'top',items:Object.entries(CAKE_TOPS).map(([v,l])=>({v,l}))}]},
      {id:'table',icon:'🍽️',label:'Table',secs:[
        {t:'Plate',type:'sw',key:'plate',colors:PLATES},
        {t:'Background',type:'sw',key:'bg',colors:BAKE_BG}]}
    ],
    surprise:s=>Object.assign(s,{kind:pick(['cake','cupcake']),layers:1+rint(2),flavors:[0,1,2].map(()=>rint(CAKE_FLAVORS.length)),frost:rint(FROST.length),
      style:pick(keysOf(FROST_STYLES)),topping:pick(keysOf(TOPPINGS)),top:pick(keysOf(CAKE_TOPS)),wrap:rint(FROST.length),wrapStyle:pick(keysOf(WRAPS)),plate:rint(PLATES.length),bg:rint(BAKE_BG.length),blown:false}),
    onPick:(s,key,val)=>{
      if(key.startsWith('fl')){s.flavors[+key.slice(2)]=val;return true;}
      if(key==='top'){s.top=val;s.blown=false;return false;}
      return false;
    },
    toSave:s=>Object.assign({},s,{blown:false}),
    init:()=>{
      injectCss(`#bkSvg .flame{transform-box:fill-box;transform-origin:50% 100%;animation:flick .5s ease-in-out infinite alternate}@keyframes flick{to{transform:scale(.85,1.1) rotate(4deg)}}.row-btns{display:flex;justify-content:center;margin-top:8px}`);
      $('bkBlow').addEventListener('click',()=>{
        const s=S.state;
        if(s.top!=='candles'){s.top='candles';s.blown=false;blip();S.update();toast('Candles are lit — make a wish! 🕯️');return;}
        if(s.blown){s.blown=false;blip();S.update(false);toast('Candles relit! 🕯️');return;}
        s.blown=true;S.update(false,false);fanfare();sparkles('bkStage',14);toast('🎉 Your wish is on its way! 🎉');
      });
    }
  });
  return S;
})();

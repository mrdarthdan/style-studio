/* Style Studio — Nail Salon. A hand in a 300 x 300 box; paint all nails at once or one at a time. */
const POLISH=['#FF4D6D','#FF8FA3','#FF2E63','#C2185B','#B83280','#C77DFF','#8F7CFF','#5DA9FF','#38C6C6','#7BD88F','#FFD84D','#FF9F43','#E9C75A','#C9CBDA','#FFFFFF','#2E2E3A'];
const SALON_BG=['#FFE3F1','#E4D9FF','#D4F1FF','#DFF7DF','#FFF4C2','#FFE2D1'];
const FINGERS=[{n:'Thumb',bx:88,by:212,a:-58,len:64,w:34},{n:'Pointer',bx:116,by:164,a:-12,len:94,w:30},{n:'Middle',bx:152,by:156,a:0,len:106,w:31},{n:'Ring',bx:188,by:160,a:11,len:96,w:30},{n:'Pinky',bx:220,by:176,a:24,len:74,w:26}];
const NAIL_SHAPES={round:'Round',square:'Square',almond:'Almond',pointy:'Pointy'};
const NAIL_PATTERNS={solid:'Shiny',french:'French Tip',glitter:'Glitter',dots:'Polka Dots',stripes:'Stripes',ombre:'Ombre',moon:'Half Moon',rainbow:'Rainbow'};
const NAIL_ART={none:'None',heart:'Heart',star:'Star',flower:'Flower',gem:'Gem',smile:'Smile',rainbow:'Rainbow'};
const RINGS={none:'None',band:'Gold Band',gem:'Gem Ring',heart:'Heart Ring',flower:'Flower Ring'};
const BRACELETS={none:'None',beads:'Beads',charm:'Charm',bangle:'Gold Bangle',friendship:'Friendship'};

function nailPath(shape,w){
  const nw=w*.74,hw=nw/2,nh=w*1.0;
  if(shape==='square'){const yt=-4,yb=yt+nh;return {d:`M${-hw} ${yb} V${yt+3} Q${-hw} ${yt} ${-hw+3} ${yt} H${hw-3} Q${hw} ${yt} ${hw} ${yt+3} V${yb} Q0 ${yb+5} ${-hw} ${yb} Z`,yt:yt,yb,nw};}
  if(shape==='almond'){const yt=2,yb=yt+nh;return {d:`M${-hw} ${yb} C${-hw} ${yt+nh*.2} ${-nw*.25} ${yt-8} 0 ${yt-12} C${nw*.25} ${yt-8} ${hw} ${yt+nh*.2} ${hw} ${yb} Q0 ${yb+5} ${-hw} ${yb} Z`,yt:yt-12,yb,nw};}
  if(shape==='pointy'){const yt=2,yb=yt+nh;return {d:`M${-hw} ${yb} C${-hw} ${yt+nh*.1} ${-nw*.15} ${yt-14} 0 ${yt-24} C${nw*.15} ${yt-14} ${hw} ${yt+nh*.1} ${hw} ${yb} Q0 ${yb+5} ${-hw} ${yb} Z`,yt:yt-24,yb,nw};}
  const yt=1,yb=yt+nh;return {d:`M${-hw} ${yb} V${yt+hw} A${hw} ${hw} 0 0 1 ${hw} ${yt+hw} V${yb} Q0 ${yb+5} ${-hw} ${yb} Z`,yt,yb,nw};
}
function renderNails(s,uid,o={}){
  const k=SKIN[s.skin]??SKIN[2],kd=shade(k,-.2);
  let out=`<rect width="300" height="300" fill="${SALON_BG[s.bg]??SALON_BG[0]}"/>`;
  [[30,40],[260,30],[40,260],[270,250],[150,20]].forEach(([x,y])=>out+=star(x,y,6,'#fff','opacity=".8"'));
  out+=`<ellipse cx="160" cy="300" rx="150" ry="34" fill="#fff" opacity=".7"/>`;
  /* fingers + nails */
  FINGERS.forEach((F,i)=>{
    const nail=s.nails[i]||s.nails[0],c=POLISH[nail.c]??POLISH[0],cd=shade(c,c==='#FFFFFF'?-.15:-.28),lt=shade(c,.55);
    const P=nailPath(s.shape,F.w);
    let g=`<g transform="translate(${F.bx} ${F.by}) rotate(${F.a})" data-nail="${i}">`;
    g+=`<rect x="${-F.w/2}" y="${-F.len}" width="${F.w}" height="${F.len+34}" rx="${F.w/2}" fill="${k}" stroke="${kd}" stroke-width="2.5"/>`;
    g+=`<path d="M${-F.w*.28} ${(-F.len*.42).toFixed(1)} q${F.w*.28} 4 ${F.w*.56} 0 M${-F.w*.22} ${(-F.len*.62).toFixed(1)} q${F.w*.22} 3 ${F.w*.44} 0" stroke="${kd}" stroke-width="1.6" fill="none" opacity=".7"/>`;
    if(i===3&&s.ring!=='none'){
      const rc=CLOTH[s.ringColor]??CLOTH[0],y=-F.len*.4;
      g+=`<rect x="${-F.w/2-2}" y="${y-5}" width="${F.w+4}" height="10" rx="5" fill="#FFD84D" stroke="#C9A43A" stroke-width="1.5"/>`;
      if(s.ring==='gem')g+=`<path d="M0 ${y-14} l9 9 l-9 9 l-9 -9 Z" fill="${rc}" stroke="${shade(rc,-.3)}" stroke-width="1.5"/><path d="M-3 ${y-8} l3 -3" stroke="#fff" stroke-width="2"/>`;
      if(s.ring==='heart')g+=heart(0,y-4,9,rc,`stroke="${shade(rc,-.3)}" stroke-width="1.5"`);
      if(s.ring==='flower')g+=flower(0,y-4,6,rc,'#FFD84D');
    }
    g+=`<g transform="translate(0 ${-F.len})">`;
    const id=`${uid}n${i}`;
    g+=`<defs><clipPath id="${id}c"><path d="${P.d}"/></clipPath>`+(nail.p==='ombre'?`<linearGradient id="${id}g" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="${lt}"/></linearGradient>`:'')+`</defs>`;
    g+=`<path d="${P.d}" fill="${nail.p==='ombre'?`url(#${id}g)`:c}"/>`;
    let pat='';const r=rng(7+i*13),top=P.yt,h=P.yb-P.yt,cw=P.nw;
    if(nail.p==='french')pat=`<rect x="${-cw}" y="${top-2}" width="${cw*2}" height="${(h*.32).toFixed(1)}" fill="${c==='#FFFFFF'?'#FFB6D0':'#fff'}"/>`;
    if(nail.p==='glitter')for(let j=0;j<16;j++)pat+=`<circle cx="${((r()-.5)*cw).toFixed(1)}" cy="${(top+r()*h).toFixed(1)}" r="${(r()*1.4+.6).toFixed(1)}" fill="${j%3?'#fff':'#FFD84D'}"/>`;
    if(nail.p==='dots')for(let y=top+4,row=0;y<P.yb;y+=7,row++)for(let x=-cw/2+(row%2?3.5:0);x<cw/2;x+=7)pat+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.9" fill="${c==='#FFFFFF'?'#FF6FA8':'#fff'}"/>`;
    if(nail.p==='stripes')for(let x=-cw;x<cw;x+=8)pat+=`<path d="M${x} ${P.yb} L${x+cw} ${top}" stroke="${c==='#FFFFFF'?'#FF6FA8':lt}" stroke-width="3"/>`;
    if(nail.p==='moon')pat=`<ellipse cx="0" cy="${P.yb}" rx="${(cw*.4).toFixed(1)}" ry="${(h*.28).toFixed(1)}" fill="#fff" opacity=".85"/>`;
    if(nail.p==='rainbow')['#FF4D6D','#FF9F43','#FFD84D','#7BD88F','#5DA9FF','#8F7CFF'].forEach((col,j)=>pat+=`<rect x="${-cw}" y="${(top+j*h/6).toFixed(1)}" width="${cw*2}" height="${(h/6+.5).toFixed(1)}" fill="${col}"/>`);
    pat+=`<path d="M${(-cw*.22).toFixed(1)} ${(top+h*.25).toFixed(1)} V${(top+h*.62).toFixed(1)}" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>`;
    g+=`<g clip-path="url(#${id}c)">${pat}</g><path d="${P.d}" fill="none" stroke="${cd}" stroke-width="1.5"/>`;
    const cy=top+h*.52,sz=cw*.3;
    if(nail.d==='heart')g+=heart(0,cy,sz,c==='#FF4D6D'||c==='#FF2E63'?'#fff':'#FF4D6D');
    if(nail.d==='star')g+=star(0,cy,sz*1.15,'#FFD84D','stroke="#E0B030" stroke-width=".8"');
    if(nail.d==='flower')g+=flower(0,cy,sz*.6,'#fff','#FFD84D');
    if(nail.d==='gem')g+=`<path d="M0 ${(cy-sz).toFixed(1)} l${sz.toFixed(1)} ${sz.toFixed(1)} l${(-sz).toFixed(1)} ${sz.toFixed(1)} l${(-sz).toFixed(1)} ${(-sz).toFixed(1)} Z" fill="#9FE7FF" stroke="#fff" stroke-width="1.2"/>`;
    if(nail.d==='smile')g+=`<circle cx="0" cy="${cy}" r="${sz}" fill="#FFD84D" stroke="#E0B030"/><circle cx="${-sz*.35}" cy="${cy-sz*.2}" r="1.1" fill="#3b2453"/><circle cx="${sz*.35}" cy="${cy-sz*.2}" r="1.1" fill="#3b2453"/><path d="M${-sz*.45} ${cy+sz*.2} Q0 ${cy+sz*.65} ${sz*.45} ${cy+sz*.2}" stroke="#3b2453" stroke-width="1" fill="none"/>`;
    if(nail.d==='rainbow')['#FF4D6D','#FFD84D','#5DA9FF'].forEach((col,j)=>g+=`<path d="M${-sz+j*2} ${cy+3} A${sz-j*2} ${sz-j*2} 0 0 1 ${sz-j*2} ${cy+3}" stroke="${col}" stroke-width="2" fill="none"/>`);
    if(o.stage&&s.target===i)g+=`<path d="${P.d}" fill="none" stroke="#ff5fa2" stroke-width="2.5" stroke-dasharray="4 3" transform="translate(0 0) scale(1.18)"/>`;
    g+=`</g></g>`;
    out+=g;
  });
  /* palm (back of the hand) */
  out+=`<path d="M68 300 C64 252 72 210 96 184 Q120 156 152 152 Q196 150 228 172 C248 198 250 252 242 300 Z" fill="${k}" stroke="${kd}" stroke-width="2.5"/>`;
  out+=`<path d="M128 200 q6 4 12 0 M160 196 q6 4 12 0 M192 202 q6 4 12 0" stroke="${kd}" stroke-width="1.6" fill="none" opacity=".6"/>`;
  /* bracelet */
  const br=s.bracelet;
  if(br==='beads'){const cs=['#FF6FA8','#FFD84D','#5DA9FF','#7BD88F','#C77DFF','#FF9F43'];for(let x=78;x<=234;x+=13)out+=`<circle cx="${x}" cy="${276+Math.sin((x-78)/156*Math.PI)*6}" r="7" fill="${cs[(x/13|0)%6]}" stroke="rgba(0,0,0,.15)"/>`;}
  if(br==='charm')out+=`<path d="M74 272 Q156 292 238 272" stroke="#E9B93A" stroke-width="4" fill="none" stroke-dasharray="2 3"/>`+heart(156,292,8,'#FF4D6D','stroke="#C2185B"')+star(110,288,6,'#FFD84D')+star(200,288,6,'#FFD84D');
  if(br==='bangle')out+=`<path d="M70 266 Q156 290 242 266 L242 280 Q156 304 70 280 Z" fill="#FFD84D" stroke="#C9A43A" stroke-width="2"/><path d="M90 276 Q156 294 222 276" stroke="#fff" stroke-width="2" opacity=".7" fill="none"/>`;
  if(br==='friendship'){const cs=['#FF6FA8','#5DA9FF','#FFD84D','#7BD88F'];for(let x=74;x<238;x+=8)out+=`<path d="M${x} ${270+Math.sin((x-74)/164*Math.PI)*8} l8 8" stroke="${cs[(x/8|0)%4]}" stroke-width="5" stroke-linecap="round"/>`;}
  return out;
}

const Nails=(()=>{
  const allSame=(s,f)=>s.nails.every(n=>n[f]===s.nails[0][f]);
  const targets=s=>s.target==='all'?[0,1,2,3,4]:[s.target];
  const cur=(s,f)=>s.nails[s.target==='all'?0:s.target][f];
  const targetRow=s=>`<div class="targets"><button class="pill${s.target==='all'?' go':''}" data-act="t:all">💅 All nails</button>`+FINGERS.map((F,i)=>`<button class="pill${s.target===i?' go':''}" data-act="t:${i}">${F.n}</button>`).join('')+`</div>`;
  const applyTo=(f)=>(s,v)=>{s.nails.forEach(n=>n[f]=v);return s;};
  const S=makeStudio({
    prefix:'nl',hash:'nail-salon',el:'mod-nails',emoji:'💅',title:'Nail Salon',blurb:'Polish, patterns, nail art and sparkly rings!',
    viewBox:'0 0 300 300',label:'Your nails',nameLabel:'Name',namePh:'Whose nails?',kind:'nails',closetLabel:'Nail Designs',storeKey:'ss_nails',
    defaults:{name:'',shape:'round',skin:2,nails:[0,1,2,3,4].map(()=>({c:1,p:'solid',d:'none'})),target:'all',ring:'none',ringColor:0,bracelet:'none',bg:0},
    normalize:s=>{if(!Array.isArray(s.nails)||s.nails.length!==5)s.nails=[0,1,2,3,4].map(()=>({c:1,p:'solid',d:'none'}));if(s.target!=='all'&&!(s.target>=0&&s.target<5))s.target='all';return s;},
    render:renderNails,previewBox:'0 20 300 225',
    plate:n=>'💅 '+n,
    showTitle:s=>s.name?`💅 ${s.name}'s Nails 💅`:'💅 Fabulous Nails! 💅',
    belowStage:`<p class="hint">Tap a nail to paint just that one, or paint them all at once ✨</p>`,
    tabs:[
      {id:'shape',icon:'💅',label:'Shape',secs:[
        {t:'Nail shape',type:'it',key:'shape',crop:'60 22 210 110',items:Object.entries(NAIL_SHAPES).map(([v,l])=>({v,l}))},
        {t:'Skin tone',type:'sw',key:'skin',colors:SKIN}]},
      {id:'polish',icon:'🎨',label:'Polish',secs:[
        {t:'Which nails?',type:'html',html:targetRow},
        {t:'Polish color',type:'sw',key:'c',colors:POLISH,get:s=>s.target==='all'&&!allSame(s,'c')?-1:cur(s,'c')}]},
      {id:'pattern',icon:'✨',label:'Patterns',secs:[
        {t:'Which nails?',type:'html',html:targetRow},
        {t:'Pattern',type:'it',key:'p',crop:'126 30 52 60',apply:applyTo('p'),isOn:(s,v)=>targets(s).every(i=>s.nails[i].p===v),items:Object.entries(NAIL_PATTERNS).map(([v,l])=>({v,l}))}]},
      {id:'art',icon:'💖',label:'Nail Art',secs:[
        {t:'Which nails?',type:'html',html:targetRow},
        {t:'Nail art',type:'it',key:'d',crop:'126 30 52 60',apply:applyTo('d'),isOn:(s,v)=>targets(s).every(i=>s.nails[i].d===v),items:Object.entries(NAIL_ART).map(([v,l])=>({v,l}))}]},
      {id:'jewelry',icon:'💍',label:'Jewelry',secs:[
        {t:'Ring',type:'it',key:'ring',crop:'150 40 100 110',items:Object.entries(RINGS).map(([v,l])=>({v,l}))},
        {t:'Ring gem color',type:'sw',key:'ringColor',colors:CLOTH},
        {t:'Bracelet',type:'it',key:'bracelet',crop:'50 220 210 90',items:Object.entries(BRACELETS).map(([v,l])=>({v,l}))}]},
      {id:'salon',icon:'🪞',label:'Salon',secs:[{t:'Background',type:'sw',key:'bg',colors:SALON_BG}]}
    ],
    surprise:s=>{
      const same=Math.random()<.5,base={c:rint(POLISH.length),p:pick(keysOf(NAIL_PATTERNS)),d:pick(keysOf(NAIL_ART))};
      s.nails=[0,1,2,3,4].map(()=>same?Object.assign({},base):{c:rint(POLISH.length),p:pick(keysOf(NAIL_PATTERNS)),d:pick(['none','none',...keysOf(NAIL_ART)])});
      Object.assign(s,{shape:pick(keysOf(NAIL_SHAPES)),ring:pick(keysOf(RINGS)),ringColor:rint(CLOTH.length),bracelet:pick(keysOf(BRACELETS)),bg:rint(SALON_BG.length),target:'all'});return s;
    },
    reset:s=>{const k=s.skin;s=JSON.parse(JSON.stringify({name:'',shape:'round',skin:k,nails:[0,1,2,3,4].map(()=>({c:1,p:'solid',d:'none'})),target:'all',ring:'none',ringColor:0,bracelet:'none',bg:0}));return s;},
    onPick:(s,key,val)=>{
      if(key==='c'||key==='p'||key==='d'){targets(s).forEach(i=>s.nails[i][key]=val);return true;}
      if(key==='ringColor'){s.ringColor=val;if(s.ring==='none')s.ring='gem';return true;}
      return false;
    },
    onAct:(s,act,el,St)=>{if(act.startsWith('t:')){const v=act.slice(2);s.target=v==='all'?'all':+v;blip();St.update(false);}},
    onStageClick:(s,e,St)=>{const g=e.target.closest('[data-nail]');if(!g)return;const i=+g.dataset.nail;s.target=s.target===i?'all':i;blip();St.update(false);},
    beforeShow:(s,St)=>{s.target='all';St.update(false,false);},
    init:()=>injectCss(`#nlSvg [data-nail]{cursor:pointer}.targets{display:flex;flex-wrap:wrap;gap:6px}`)
  });
  return S;
})();

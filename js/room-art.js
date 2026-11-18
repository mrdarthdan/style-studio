/* Style Studio — room art (Room Designer). Room canvas is 480 x 360; the floor starts at y=262. */
const WALLC=['#FFD6E8','#FFE7C2','#FFF4B8','#D7F2CC','#C9ECF2','#D4E4FF','#E4D9FF','#F4D6FF','#FFFFFF','#EFE2D4','#BFD0EA','#3B3358'];
const CURT=[null,...CLOTH];
const WOOD='#C9935E',WOODD='#A8743F';

/* ---------- walls ---------- */
function wallPattern(u,kind,wall){
  const dark=wall==='#3B3358',pc=dark?'#6E62A8':shade(wall,-.13),acc=dark?'#FFE98A':'#fff';
  const P=(w,h,inner)=>`<defs><pattern id="${u}pat" width="${w}" height="${h}" patternUnits="userSpaceOnUse">${inner}</pattern></defs><rect width="480" height="262" fill="url(#${u}pat)"/>`;
  switch(kind){
    case 'stripes':return P(36,10,`<rect width="18" height="10" fill="${pc}"/>`);
    case 'dots':return P(32,32,`<circle cx="8" cy="8" r="4" fill="${pc}"/><circle cx="24" cy="24" r="4" fill="${pc}"/>`);
    case 'hearts':return P(48,48,heart(12,12,5,pc)+heart(36,36,5,pc));
    case 'stars':return P(48,48,star(12,12,6,dark?'#FFE98A':pc)+star(36,36,4.5,dark?'#FFE98A':pc));
    case 'flowers':return P(56,56,flower(14,14,4,pc,acc)+flower(42,42,4,pc,acc));
    case 'clouds':return P(96,72,`<g fill="#fff" opacity="${dark?.25:.75}"><ellipse cx="24" cy="22" rx="17" ry="8"/><circle cx="17" cy="17" r="8"/><circle cx="29" cy="14" r="9"/><ellipse cx="72" cy="58" rx="17" ry="8"/><circle cx="65" cy="53" r="8"/><circle cx="77" cy="50" r="9"/></g>`);
    case 'plaid':return P(40,40,`<rect width="40" height="12" fill="${pc}" opacity=".6"/><rect width="12" height="40" fill="${pc}" opacity=".6"/>`);
  }
  return '';
}

/* ---------- floors ---------- */
function planks(base,line){
  let o=`<rect y="262" width="480" height="98" fill="${base}"/>`,row=0;
  for(let y=262;y<360;y+=24,row++){o+=`<path d="M0 ${y+24} H480" stroke="${line}" stroke-width="2"/>`;for(let x=(row%2?60:0);x<=480;x+=120)o+=`<path d="M${x} ${y} V${y+24}" stroke="${line}" stroke-width="2"/>`;}
  return o;
}
function carpet(base){const r=rng(21);let o=`<rect y="262" width="480" height="98" fill="${base}"/>`;for(let i=0;i<70;i++)o+=`<circle cx="${(r()*480).toFixed(0)}" cy="${(266+r()*92).toFixed(0)}" r="1.4" fill="${shade(base,-.12)}"/>`;return o;}
const FLOORS={
  woodLight:{l:'Light Wood',draw:()=>planks('#EBCB9F','#D2AE80')},
  woodDark:{l:'Dark Wood',draw:()=>planks('#9A6A45','#7C5233')},
  carpetPink:{l:'Pink Carpet',draw:()=>carpet('#F7B8D2')},
  carpetBlue:{l:'Blue Carpet',draw:()=>carpet('#A9CBEF')},
  carpetPurple:{l:'Purple Carpet',draw:()=>carpet('#C9B3EE')},
  checker:{l:'Checkers',draw:()=>{let o=`<rect y="262" width="480" height="98" fill="#fff"/>`;for(let y=262,r=0;y<360;y+=25,r++)for(let x=(r%2)*30;x<480;x+=60)o+=`<rect x="${x}" y="${y}" width="30" height="25" fill="#FFB6D0"/>`;return o;}},
  grass:{l:'Grass Rug',draw:()=>{const r=rng(8);let o=`<rect y="262" width="480" height="98" fill="#8BD17C"/>`;for(let i=0;i<90;i++){const x=r()*480,y=268+r()*90;o+=`<path d="M${x.toFixed(0)} ${y.toFixed(0)} l2 -6 l2 6" stroke="#5FAE55" stroke-width="1.5" fill="none"/>`;}return o;}}
};

/* ---------- windows ---------- */
const WINDOWS={
  none:null,
  classic:{l:'Classic',b:[70,48,190,168],path:'M70 48 H190 V168 H70 Z',panes:'M130 48 V168 M70 108 H190'},
  round:{l:'Round',b:[68,48,192,172],path:'M192 110 A62 62 0 1 1 68 110 A62 62 0 1 1 192 110 Z',panes:'M130 48 V172 M68 110 H192'},
  arch:{l:'Arch',b:[70,40,190,170],path:'M70 170 V100 A60 60 0 0 1 190 100 V170 Z',panes:'M130 40 V170 M70 118 H190'},
  big:{l:'Window Seat',b:[46,56,226,170],path:'M46 56 H226 V170 H46 Z',panes:'M106 56 V170 M166 56 V170'}
};
const VIEWS={
  day:{l:'Sunny Day',draw:u=>`<rect x="30" y="20" width="210" height="170" fill="#8FD3FF"/><circle cx="168" cy="80" r="16" fill="#FFE066"/>`+cloud(98,92,.9)+`<ellipse cx="130" cy="190" rx="130" ry="34" fill="#8BD17C"/>`},
  night:{l:'Starry Night',draw:u=>{const r=rng(31);let o=`<rect x="30" y="20" width="210" height="170" fill="#1E2152"/><circle cx="160" cy="80" r="15" fill="#FFF3B0"/><circle cx="167" cy="74" r="13" fill="#1E2152"/>`;for(let i=0;i<22;i++)o+=`<circle cx="${(40+r()*190).toFixed(0)}" cy="${(28+r()*140).toFixed(0)}" r="${(r()*1.3+.6).toFixed(1)}" fill="#fff"/>`;return o;}},
  sunset:{l:'Sunset',draw:u=>`<defs><linearGradient id="${u}sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF8FB1"/><stop offset="1" stop-color="#FFD27A"/></linearGradient></defs><rect x="30" y="20" width="210" height="170" fill="url(#${u}sun)"/><circle cx="130" cy="160" r="26" fill="#FFF1A8"/><path d="M30 190 Q90 140 150 170 T240 160 V200 H30Z" fill="#B07BC9"/>`},
  snow:{l:'Snowy',draw:u=>{const r=rng(13);let o=`<rect x="30" y="20" width="210" height="170" fill="#D5E9FF"/><path d="M160 160 L174 116 L188 160 Z M164 140 L174 104 L184 140 Z" fill="#3E9A6A"/><ellipse cx="130" cy="186" rx="130" ry="30" fill="#fff"/>`;for(let i=0;i<26;i++)o+=`<circle cx="${(36+r()*196).toFixed(0)}" cy="${(26+r()*140).toFixed(0)}" r="${(r()*1.6+1).toFixed(1)}" fill="#fff"/>`;return o;}},
  rainbow:{l:'Rainbow',draw:u=>{let o=`<rect x="30" y="20" width="210" height="170" fill="#A8DEFF"/>`;['#FF4D6D','#FF9F43','#FFD84D','#7BD88F','#5DA9FF','#8F7CFF'].forEach((c,i)=>o+=`<path d="M${40+i*7} 176 A${90-i*7} ${90-i*7} 0 0 1 ${220-i*7} 176" stroke="${c}" stroke-width="7" fill="none"/>`);return o+cloud(58,170,.8)+cloud(206,170,.8);}},
  beach:{l:'Beach',draw:u=>`<rect x="30" y="20" width="210" height="170" fill="#8FD3FF"/><circle cx="100" cy="70" r="14" fill="#FFE066"/><rect x="30" y="120" width="210" height="34" fill="#3FB6E0"/><path d="M30 130 q12 -5 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" stroke="#fff" stroke-width="2" fill="none" opacity=".7"/><rect x="30" y="152" width="210" height="40" fill="#F6D9A0"/>`}
};
function drawWindow(u,r){
  const W=WINDOWS[r.window];if(!W)return '';
  const [L,T,R,B]=W.b;let o='';
  o+=`<defs><clipPath id="${u}win"><path d="${W.path}"/></clipPath></defs><g clip-path="url(#${u}win)">${VIEWS[r.view].draw(u)}<path d="${W.panes}" stroke="#fff" stroke-width="5"/></g>`;
  o+=`<path d="${W.path}" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round"/><path d="${W.path}" fill="none" stroke="#e2d6e8" stroke-width="1.5"/>`;
  o+=`<rect x="${L-10}" y="${B}" width="${R-L+20}" height="9" rx="3" fill="#fff" stroke="#e2d6e8"/>`;
  const cc=CURT[r.curtain];
  if(r.window==='big')o+=`<rect x="${L-4}" y="${B+9}" width="${R-L+8}" height="14" rx="7" fill="${cc||'#FF9AB8'}" stroke="${shade(cc||'#FF9AB8',-.2)}"/><circle cx="${L+30}" cy="${B+6}" r="10" fill="#fff" stroke="#e2d6e8"/><circle cx="${R-30}" cy="${B+6}" r="10" fill="${cc?shade(cc,.4):'#FFD6E8'}" stroke="#e2d6e8"/>`;
  if(cc){
    const d=shade(cc,-.22),lt=shade(cc,.3);
    const left=`<path d="M${L-34} ${T-12} H${L+12} Q${L-2} ${T+44} ${L+6} ${B-8} Q${L-4} ${B+18} ${L} ${B+34} H${L-34} Z" fill="${cc}" stroke="${d}" stroke-width="1.5"/><path d="M${L-22} ${T-10} Q${L-26} ${(T+B)/2} ${L-22} ${B+32} M${L-8} ${T-10} Q${L-14} ${(T+B)/2} ${L-10} ${B+32}" stroke="${d}" stroke-width="1.5" fill="none" opacity=".5"/><rect x="${L-36}" y="${B-14}" width="44" height="7" rx="3" fill="${lt}" stroke="${d}"/>`;
    o+=left+`<g transform="translate(${L+R} 0) scale(-1 1)">${left}</g>`;
    o+=`<rect x="${L-44}" y="${T-17}" width="${R-L+88}" height="5" rx="2.5" fill="${WOODD}"/><circle cx="${L-44}" cy="${T-14.5}" r="5" fill="${WOOD}"/><circle cx="${R+44}" cy="${T-14.5}" r="5" fill="${WOOD}"/>`;
  }
  return o;
}

/* ---------- beds (side view, along the right wall) ---------- */
function bedCore(c,d,lt,frame,frameD,dy=0){
  return `<g transform="translate(0 ${dy})"><rect x="296" y="276" width="160" height="20" rx="4" fill="${frame}" stroke="${frameD}" stroke-width="1.5"/><rect x="302" y="292" width="8" height="${28}" fill="${frameD}"/><rect x="442" y="292" width="8" height="28" fill="${frameD}"/>`+
    `<rect x="302" y="254" width="152" height="24" rx="8" fill="#fff" stroke="#e2d6e8" stroke-width="1.5"/>`+
    `<ellipse cx="430" cy="252" rx="24" ry="11" fill="#fff" stroke="#e2d6e8" stroke-width="1.5"/>`+
    `<path d="M300 258 H404 Q412 258 412 268 V300 Q356 310 300 300 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><rect x="300" y="256" width="112" height="9" rx="4.5" fill="${lt}"/>`+
    star(340,284,5,lt)+star(372,288,4,lt)+`</g>`;
}
const BEDS={
  none:{l:'No Bed',draw:()=>''},
  simple:{l:'Cozy Bed',draw:(c,d,lt)=>`<rect x="450" y="186" width="22" height="134" rx="9" fill="${WOOD}" stroke="${WOODD}" stroke-width="1.5"/><rect x="286" y="234" width="18" height="86" rx="7" fill="${WOOD}" stroke="${WOODD}" stroke-width="1.5"/>`+bedCore(c,d,lt,WOOD,WOODD)},
  canopy:{l:'Princess Canopy',draw:(c,d,lt)=>`<path d="M296 74 Q300 170 298 250 L310 250 Q312 170 310 74 Z M470 74 Q466 170 468 250 L456 250 Q454 170 458 74 Z" fill="${lt}" opacity=".55"/>`+
    `<rect x="288" y="70" width="8" height="250" rx="4" fill="#fff" stroke="#e2d6e8"/><rect x="464" y="70" width="8" height="250" rx="4" fill="#fff" stroke="#e2d6e8"/><circle cx="292" cy="66" r="6" fill="#FFD84D"/><circle cx="468" cy="66" r="6" fill="#FFD84D"/>`+
    `<path d="M282 72 Q380 100 478 72 L478 84 Q450 102 430 92 Q404 108 380 94 Q356 108 330 92 Q310 102 282 84 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/>`+
    `<path d="M448 320 V206 Q460 184 472 206 V320 Z" fill="#fff" stroke="#e2d6e8" stroke-width="1.5"/>`+heart(460,214,5,c)+bedCore(c,d,lt,'#fff','#e2d6e8')},
  bunk:{l:'Bunk Bed',draw:(c,d,lt)=>`<rect x="288" y="150" width="10" height="170" rx="4" fill="${WOOD}" stroke="${WOODD}"/><rect x="460" y="150" width="10" height="170" rx="4" fill="${WOOD}" stroke="${WOODD}"/>`+
    bedCore(lt,shade(lt,-.25),'#fff',WOOD,WOODD,-110)+`<rect x="296" y="140" width="164" height="8" rx="4" fill="${WOOD}" stroke="${WOODD}"/>`+bedCore(c,d,lt,WOOD,WOODD)+
    `<g stroke="${WOODD}" stroke-width="4" stroke-linecap="round"><path d="M306 168 V320 M330 168 V320"/><path d="M306 196 H330 M306 226 H330 M306 290 H330"/></g>`},
  cloud:{l:'Cloud Bed',draw:(c,d,lt)=>`<g fill="#fff" stroke="#BFD9F2" stroke-width="2"><circle cx="458" cy="236" r="20"/><circle cx="446" cy="204" r="18"/><circle cx="466" cy="196" r="14"/><circle cx="452" cy="270" r="20"/><circle cx="292" cy="262" r="14"/><circle cx="300" cy="244" r="12"/></g>`+bedCore(c,d,lt,'#fff','#BFD9F2')+`<g fill="#fff"><circle cx="458" cy="236" r="18"/><circle cx="446" cy="206" r="16"/><circle cx="466" cy="198" r="12"/></g>`},
  heart:{l:'Heart Bed',draw:(c,d,lt)=>heart(452,214,30,lt,`stroke="${d}" stroke-width="2"`)+heart(452,214,18,c)+`<rect x="286" y="234" width="18" height="86" rx="7" fill="#fff" stroke="#e2d6e8" stroke-width="1.5"/>`+heart(295,246,5,c)+bedCore(c,d,lt,'#fff','#e2d6e8')}
};

/* ---------- rugs ---------- */
const RUGS={
  none:{l:'No Rug',draw:()=>''},
  round:{l:'Round',draw:(c,d,lt)=>`<ellipse cx="190" cy="322" rx="108" ry="24" fill="${c}" stroke="${d}" stroke-width="2"/><ellipse cx="190" cy="322" rx="82" ry="16" fill="none" stroke="${lt}" stroke-width="4" stroke-dasharray="8 6"/>`},
  square:{l:'Square',draw:(c,d,lt)=>`<path d="M96 300 L284 300 L306 344 L74 344 Z" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M112 306 L270 306 L286 338 L94 338 Z" fill="none" stroke="${lt}" stroke-width="3"/><path d="M74 344 v6 M90 344 v6 M106 344 v6 M290 344 v6 M306 344 v6" stroke="${d}" stroke-width="2"/>`},
  heart:{l:'Heart',draw:(c,d,lt)=>`<g transform="translate(190 316) scale(1.5 .42)">${heart(0,0,52,c,`stroke="${d}" stroke-width="3"`)}${heart(0,0,34,lt)}</g>`},
  star:{l:'Star',draw:(c,d,lt)=>`<g transform="translate(190 322) scale(1.6 .42)">${star(0,0,68,c,`stroke="${d}" stroke-width="3" stroke-linejoin="round"`)}${star(0,0,40,lt)}</g>`},
  rainbow:{l:'Rainbow',draw:()=>{let o='';['#FF4D6D','#FF9F43','#FFD84D','#7BD88F','#5DA9FF','#8F7CFF'].forEach((col,i)=>o+=`<ellipse cx="190" cy="322" rx="${110-i*16}" ry="${25-i*3.6}" fill="${col}"/>`);return o;}},
  fluffy:{l:'Fluffy',draw:(c,d,lt)=>{let o='';for(let i=0;i<22;i++){const a=i/22*Math.PI*2;o+=`<circle cx="${(190+100*Math.cos(a)).toFixed(1)}" cy="${(322+22*Math.sin(a)).toFixed(1)}" r="11" fill="${c}"/>`;}return o+`<ellipse cx="190" cy="322" rx="100" ry="22" fill="${c}"/><ellipse cx="174" cy="318" rx="60" ry="10" fill="${lt}" opacity=".6"/>`;}}
};

/* ---------- lights ---------- */
const LIGHTS={
  none:{l:'No Lights',draw:()=>''},
  fairy:{l:'Fairy Lights',draw:()=>{let o=`<path d="M0 18 Q240 74 480 18" stroke="#6b5b7b" stroke-width="1.5" fill="none"/>`;const cs=['#FF6FA8','#FFD84D','#7BD88F','#5DA9FF','#C77DFF','#FF9F43'];
    for(let i=1;i<20;i++){const t=i/20,x=480*t,y=(1-t)*(1-t)*18+2*(1-t)*t*74+t*t*18,c=cs[i%6];o+=`<circle cx="${x.toFixed(1)}" cy="${(y+5).toFixed(1)}" r="8" fill="${c}" opacity=".3"/><ellipse cx="${x.toFixed(1)}" cy="${(y+5).toFixed(1)}" rx="3.2" ry="4.4" fill="${c}"/>`;}return o;}},
  ceiling:{l:'Ceiling Lamp',draw:()=>`<path d="M240 0 V34" stroke="#8a7a9c" stroke-width="2"/><ellipse cx="240" cy="70" rx="64" ry="16" fill="#FFF6C8" opacity=".35"/><path d="M214 62 L226 34 L254 34 L266 62 Z" fill="#FF9AB8" stroke="#E0789A" stroke-width="1.5"/><circle cx="240" cy="64" r="6" fill="#FFF6C8"/>`},
  chandelier:{l:'Chandelier',draw:()=>{let o=`<path d="M240 0 V28" stroke="#C9A43A" stroke-width="2"/><ellipse cx="240" cy="60" rx="70" ry="18" fill="#FFF6C8" opacity=".3"/><path d="M204 44 Q240 66 276 44" stroke="#E9B93A" stroke-width="3" fill="none"/><circle cx="240" cy="34" r="8" fill="#FFD84D" stroke="#C9A43A"/>`;
    [204,222,240,258,276].forEach((x,i)=>{const y=i===2?54:i%2?50:44;o+=`<rect x="${x-2.5}" y="${y-14}" width="5" height="12" rx="2" fill="#fff"/><ellipse cx="${x}" cy="${y-17}" rx="2.5" ry="4" fill="#FFB347"/><path d="M${x} ${y} l-3 6 l3 6 l3 -6 Z" fill="#CDEBFF" stroke="#9FCFF0" stroke-width=".8"/>`;});return o;}},
  stars:{l:'Glow Stars',draw:()=>{const r=rng(44);let o='';for(let i=0;i<18;i++){const x=20+r()*440,y=16+r()*150,s=3+r()*4;o+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(s*2).toFixed(1)}" fill="#FFF3A3" opacity=".25"/>`+star(x,y,s,'#FFF3A3');}return o;}},
  disco:{l:'Disco Ball',draw:()=>{const r=rng(5);let o='';const cs=['#FF6FA8','#5DA9FF','#FFD84D','#7BD88F','#C77DFF'];for(let i=0;i<26;i++)o+=`<circle cx="${(10+r()*460).toFixed(0)}" cy="${(70+r()*180).toFixed(0)}" r="${(2+r()*3).toFixed(1)}" fill="${cs[i%5]}" opacity=".55"/>`;
    o+=`<path d="M240 0 V26" stroke="#8a7a9c" stroke-width="2"/><circle cx="240" cy="48" r="22" fill="#D7DCE6" stroke="#9AA3B5" stroke-width="1.5"/><path d="M218 48 H262 M222 37 H258 M222 59 H258 M240 26 V70 M229 28 Q224 48 229 68 M251 28 Q256 48 251 68" stroke="#9AA3B5" stroke-width="1" fill="none"/><circle cx="232" cy="40" r="4" fill="#fff" opacity=".8"/>`;return o;}}
};

/* ---------- decorations (drawn around (0,0) = bottom center) ---------- */
const books=(y0,seed)=>{const r=rng(seed),cs=['#FF6FA8','#5DA9FF','#FFD84D','#7BD88F','#C77DFF','#FF9F43','#38C6C6'];let o='',x=-34;while(x<26){const w=6+r()*5,h=20+r()*10;o+=`<rect x="${x.toFixed(1)}" y="${(y0-h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="1" fill="${cs[Math.floor(r()*7)]}" stroke="rgba(0,0,0,.15)"/>`;x+=w+1;}return o;};
const DECOR={
  /* furniture */
  bookshelf:{l:'Bookshelf',g:'Furniture',y:332,c:9,box:[-44,-124,88,126],draw:(c,d,lt)=>`<rect x="-40" y="-120" width="80" height="120" rx="3" fill="${c}" stroke="${d}" stroke-width="2"/><rect x="-35" y="-115" width="70" height="110" fill="${shade(c,-.12)}"/>`+books(-84,1)+books(-46,2)+books(-6,3)+`<rect x="-36" y="-84" width="72" height="4" fill="${d}"/><rect x="-36" y="-46" width="72" height="4" fill="${d}"/>`},
  desk:{l:'Desk',g:'Furniture',y:334,c:6,box:[-60,-92,120,94],draw:(c,d,lt)=>`<path d="M-30 -62 L-26 -88 L6 -88 L2 -62 Z" fill="#9aa3b5" stroke="#7d8597"/><path d="M-24 -84 L2 -84 L-1 -66 L-27 -66 Z" fill="#CFE6FF"/><rect x="-38" y="-64" width="46" height="3" rx="1.5" fill="#7d8597"/><rect x="30" y="-76" width="12" height="14" rx="2" fill="#FFD84D"/><path d="M33 -76 l-2 -10 M37 -76 v-11 M40 -76 l2 -9" stroke="#FF6FA8" stroke-width="2.5" stroke-linecap="round"/>`+
    `<rect x="-56" y="-62" width="112" height="8" rx="3" fill="${c}" stroke="${d}" stroke-width="1.5"/><rect x="-52" y="-54" width="7" height="54" fill="${d}"/><rect x="16" y="-54" width="36" height="54" rx="2" fill="${c}" stroke="${d}" stroke-width="1.5"/><rect x="20" y="-48" width="28" height="20" rx="2" fill="${lt}"/><rect x="20" y="-24" width="28" height="20" rx="2" fill="${lt}"/><circle cx="34" cy="-38" r="2" fill="${d}"/><circle cx="34" cy="-14" r="2" fill="${d}"/>`},
  dresser:{l:'Dresser',g:'Furniture',y:332,c:0,box:[-46,-104,92,106],draw:(c,d,lt)=>`<rect x="-42" y="-68" width="84" height="64" rx="4" fill="${c}" stroke="${d}" stroke-width="2"/>`+[-62,-42,-22].map(y=>`<rect x="-36" y="${y}" width="72" height="16" rx="3" fill="${lt}" stroke="${d}" stroke-width="1"/><circle cx="-12" cy="${y+8}" r="2.5" fill="#E9B93A"/><circle cx="12" cy="${y+8}" r="2.5" fill="#E9B93A"/>`).join('')+
    `<rect x="-38" y="-4" width="6" height="4" fill="${d}"/><rect x="32" y="-4" width="6" height="4" fill="${d}"/><path d="M-26 -68 L-28 -84 L-16 -84 L-18 -68 Z" fill="#8EC9FF"/>`+flower(-22,-90,4,'#FF8FC6')+`<rect x="8" y="-90" width="22" height="22" rx="2" fill="#fff" stroke="#E9B93A" stroke-width="2"/>`+heart(19,-80,4,'#FF6FA8')},
  vanity:{l:'Vanity',g:'Furniture',y:332,c:0,box:[-46,-134,92,136],draw:(c,d,lt)=>`<ellipse cx="0" cy="-96" rx="26" ry="32" fill="#DDF3FF" stroke="#E9B93A" stroke-width="5"/><path d="M-12 -112 Q-4 -118 4 -112" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>`+[-110,-90,-70].map(y=>`<circle cx="-30" cy="${y}" r="3" fill="#FFF6C8" stroke="#E9B93A"/><circle cx="30" cy="${y}" r="3" fill="#FFF6C8" stroke="#E9B93A"/>`).join('')+
    `<rect x="-42" y="-58" width="84" height="8" rx="3" fill="#fff" stroke="#e2d6e8"/><path d="M-40 -50 H40 V-8 Q30 -2 20 -8 Q10 -2 0 -8 Q-10 -2 -20 -8 Q-30 -2 -40 -8 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><rect x="-24" y="-70" width="7" height="12" rx="2" fill="#C77DFF"/><rect x="-14" y="-66" width="6" height="8" rx="2" fill="#5DA9FF"/><circle cx="18" cy="-63" r="5" fill="#FF6FA8"/><rect x="-36" y="-8" width="5" height="8" fill="${d}"/><rect x="31" y="-8" width="5" height="8" fill="${d}"/>`},
  nightstand:{l:'Nightstand',g:'Furniture',y:330,c:9,box:[-28,-80,56,82],draw:(c,d,lt)=>`<ellipse cx="0" cy="-60" rx="22" ry="8" fill="#FFF6C8" opacity=".35"/><rect x="-2" y="-58" width="4" height="18" fill="#8a7a9c"/><path d="M-14 -56 L-9 -76 L9 -76 L14 -56 Z" fill="#FFF6C8" stroke="#E0B030" stroke-width="1.2"/><ellipse cx="0" cy="-41" rx="8" ry="2" fill="#8a7a9c"/>`+
    `<rect x="-24" y="-40" width="48" height="40" rx="4" fill="${c}" stroke="${d}" stroke-width="1.5"/><rect x="-18" y="-34" width="36" height="13" rx="2" fill="${lt}"/><circle cx="0" cy="-27" r="2" fill="${d}"/><rect x="-18" y="-17" width="36" height="13" rx="2" fill="${lt}"/><circle cx="0" cy="-10" r="2" fill="${d}"/>`},
  toychest:{l:'Toy Chest',g:'Furniture',y:336,c:1,box:[-40,-62,80,64],draw:(c,d,lt)=>`<circle cx="-16" cy="-46" r="10" fill="#5DA9FF"/><path d="M-26 -46 H-6" stroke="#fff" stroke-width="2"/><circle cx="10" cy="-50" r="6" fill="#C68A45"/><circle cx="20" cy="-50" r="6" fill="#C68A45"/><circle cx="15" cy="-44" r="8" fill="#C68A45"/>`+
    `<rect x="-36" y="-38" width="72" height="38" rx="4" fill="${c}" stroke="${d}" stroke-width="2"/><rect x="-39" y="-44" width="78" height="9" rx="4" fill="${lt}" stroke="${d}" stroke-width="1.5"/>`+star(0,-18,10,'#FFD84D','stroke="#E0B030"')},
  beanbag:{l:'Beanbag',g:'Furniture',y:340,c:8,box:[-38,-48,76,50],draw:(c,d,lt)=>`<path d="M-34 0 Q-42 -30 -16 -40 Q4 -48 22 -38 Q42 -26 34 0 Z" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M-20 -30 Q-4 -40 14 -32" stroke="${lt}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-30 -8 Q0 -16 30 -8" stroke="${d}" stroke-width="1.5" fill="none" opacity=".4"/>`},
  floorlamp:{l:'Floor Lamp',g:'Furniture',y:332,c:3,box:[-32,-134,64,136],draw:(c,d,lt)=>`<ellipse cx="0" cy="-100" rx="32" ry="11" fill="#FFF6C8" opacity=".35"/><ellipse cx="0" cy="-2" rx="16" ry="4" fill="#8a7a9c"/><rect x="-2" y="-110" width="4" height="108" fill="#8a7a9c"/><path d="M-22 -108 L-14 -130 L14 -130 L22 -108 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/>`},
  /* toys & pets */
  teddy:{l:'Teddy Bear',g:'Toys & Pets',y:340,c:0,box:[-26,-58,52,60],draw:(c,d,lt)=>`<g stroke="#8B5A2B" stroke-width="1.5" fill="#C68A45"><circle cx="-13" cy="-50" r="7"/><circle cx="13" cy="-50" r="7"/><ellipse cx="-12" cy="-4" rx="9" ry="6"/><ellipse cx="12" cy="-4" rx="9" ry="6"/><ellipse cx="0" cy="-20" rx="18" ry="17"/><circle cx="0" cy="-40" r="15"/><ellipse cx="-19" cy="-24" rx="6" ry="9"/><ellipse cx="19" cy="-24" rx="6" ry="9"/></g><ellipse cx="0" cy="-35" rx="6" ry="4.5" fill="#F0D2A8"/><circle cx="-6" cy="-43" r="2" fill="#2a1a1a"/><circle cx="6" cy="-43" r="2" fill="#2a1a1a"/><circle cx="0" cy="-36" r="1.8" fill="#2a1a1a"/><path d="M0 -26 L-8 -30 L-8 -22 Z M0 -26 L8 -30 L8 -22 Z" fill="${c}"/><circle cx="0" cy="-26" r="2.5" fill="${d}"/>`},
  unicorn:{l:'Unicorn Plush',g:'Toys & Pets',y:340,c:9,box:[-30,-62,60,64],draw:(c,d,lt)=>`<g stroke="#e2d6e8" stroke-width="1.5" fill="#fff"><ellipse cx="-4" cy="-16" rx="22" ry="14"/><rect x="-22" y="-10" width="8" height="10" rx="3"/><rect x="8" y="-10" width="8" height="10" rx="3"/><ellipse cx="16" cy="-36" rx="11" ry="14"/><ellipse cx="22" cy="-28" rx="8" ry="6"/></g><path d="M14 -48 L18 -62 L22 -48 Z" fill="#FFE07A" stroke="#E0B84A"/><path d="M6 -46 Q-2 -40 4 -28 Q-6 -30 -4 -20" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-26 -18 Q-34 -10 -28 -2" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="18" cy="-38" r="1.8" fill="#2a1a1a"/><ellipse cx="22" cy="-30" rx="3" ry="2" fill="#FFB6D0"/>`},
  dollhouse:{l:'Dollhouse',g:'Toys & Pets',y:334,c:0,box:[-42,-90,84,92],draw:(c,d,lt)=>`<rect x="-34" y="-54" width="68" height="54" fill="#FFF4E6" stroke="#E5CDB5" stroke-width="1.5"/><path d="M-42 -52 L0 -88 L42 -52 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/><rect x="-26" y="-44" width="16" height="14" fill="#9AD4FF" stroke="#fff" stroke-width="2"/><rect x="10" y="-44" width="16" height="14" fill="#9AD4FF" stroke="#fff" stroke-width="2"/><rect x="-8" y="-24" width="16" height="24" rx="8" fill="${d}"/><circle cx="0" cy="-66" r="6" fill="#9AD4FF" stroke="#fff" stroke-width="2"/>`+heart(-18,-16,4,c)+heart(18,-16,4,c)},
  guitar:{l:'Guitar',g:'Toys & Pets',y:338,c:1,box:[-20,-102,40,104],draw:(c,d,lt)=>`<rect x="-3" y="-96" width="6" height="56" fill="#8B5A2B"/><rect x="-6" y="-104" width="12" height="12" rx="3" fill="#6B4226"/><circle cx="0" cy="-46" r="12" fill="${c}" stroke="${d}" stroke-width="1.5"/><circle cx="0" cy="-20" r="17" fill="${c}" stroke="${d}" stroke-width="1.5"/><circle cx="0" cy="-30" r="5" fill="#2a1a1a"/><rect x="-7" y="-12" width="14" height="4" fill="#6B4226"/><path d="M-1.5 -96 V-10 M1.5 -96 V-10" stroke="#eee" stroke-width=".7"/>`},
  easel:{l:'Art Easel',g:'Toys & Pets',y:336,c:6,box:[-32,-104,64,106],draw:(c,d,lt)=>`<path d="M-24 0 L-4 -100 M24 0 L4 -100 M0 -60 L0 0" stroke="${WOODD}" stroke-width="4" stroke-linecap="round"/><rect x="-28" y="-96" width="56" height="50" fill="#fff" stroke="#e2d6e8" stroke-width="1.5"/><rect x="-25" y="-93" width="50" height="44" fill="#DFF3FF"/><circle cx="12" cy="-82" r="6" fill="#FFD84D"/><path d="M-25 -55 Q-8 -72 6 -60 T25 -64 V-49 H-25 Z" fill="${c}"/><rect x="-30" y="-46" width="60" height="5" rx="2" fill="${WOOD}"/><path d="M-14 -46 l2 -6 M-6 -46 l1 -6" stroke="#FF6FA8" stroke-width="3" stroke-linecap="round"/>`},
  balloons:{l:'Balloons',g:'Toys & Pets',y:300,c:0,box:[-36,-122,72,124],draw:(c,d,lt)=>`<path d="M0 0 Q-10 -40 -20 -78 M0 0 Q2 -50 4 -96 M0 0 Q14 -40 22 -72" stroke="#9a8aa8" stroke-width="1.2" fill="none"/>`+
    [[-20,-92,c],[4,-110,'#FFD84D'],[22,-86,'#5DA9FF']].map(([x,y,col])=>`<ellipse cx="${x}" cy="${y}" rx="13" ry="16" fill="${col}" stroke="${shade(col,-.2)}"/><ellipse cx="${x-4}" cy="${y-6}" rx="3" ry="5" fill="#fff" opacity=".5"/>`).join('')+`<circle cx="0" cy="0" r="3" fill="#9a8aa8"/>`},
  cat:{l:'Kitty',g:'Toys & Pets',y:342,c:2,box:[-30,-34,60,36],draw:(c,d,lt)=>`<path d="M-24 -6 Q-36 -10 -30 -22" stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="-4" cy="-11" rx="22" ry="11" fill="${c}" stroke="${d}" stroke-width="1.5"/><circle cx="16" cy="-16" r="11" fill="${c}" stroke="${d}" stroke-width="1.5"/><path d="M8 -24 L9 -33 L15 -26 Z M18 -26 L24 -33 L25 -24 Z" fill="${c}" stroke="${d}" stroke-width="1.2"/><path d="M11 -16 q2 2 4 0 M18 -16 q2 2 4 0" stroke="#2a1a1a" stroke-width="1.4" fill="none"/><circle cx="17" cy="-12" r="1.4" fill="#FF8FA3"/><path d="M-14 -16 q4 -3 8 0 M-2 -18 q4 -3 8 0" stroke="${d}" stroke-width="1.4" fill="none" opacity=".6"/>`},
  dog:{l:'Puppy',g:'Toys & Pets',y:342,c:1,box:[-26,-56,52,58],draw:(c,d,lt)=>`<g fill="#E8C27A" stroke="#B88B4A" stroke-width="1.5"><ellipse cx="0" cy="-16" rx="16" ry="16"/><ellipse cx="-9" cy="-3" rx="7" ry="4"/><ellipse cx="9" cy="-3" rx="7" ry="4"/><circle cx="0" cy="-38" r="14"/></g><ellipse cx="-14" cy="-36" rx="5" ry="11" fill="#9C6B3C"/><ellipse cx="14" cy="-36" rx="5" ry="11" fill="#9C6B3C"/><ellipse cx="0" cy="-32" rx="7" ry="5" fill="#F6E2BC"/><circle cx="0" cy="-34" r="2.4" fill="#2a1a1a"/><circle cx="-5" cy="-41" r="2" fill="#2a1a1a"/><circle cx="5" cy="-41" r="2" fill="#2a1a1a"/><path d="M-10 -26 Q0 -21 10 -26" stroke="${c}" stroke-width="4" fill="none"/><circle cx="0" cy="-22" r="2.5" fill="#FFD84D"/><path d="M14 -10 Q24 -14 22 -24" stroke="#B88B4A" stroke-width="4" fill="none" stroke-linecap="round"/>`},
  fishbowl:{l:'Fishbowl',g:'Toys & Pets',y:338,c:2,box:[-24,-46,48,48],draw:(c,d,lt)=>`<circle cx="0" cy="-22" r="20" fill="#BFE8FF" stroke="#8EC9FF" stroke-width="2" opacity=".9"/><path d="M-19 -18 Q0 -24 19 -18 A20 20 0 0 1 -19 -18 Z" fill="#7FC8F0" opacity=".6"/><ellipse cx="-3" cy="-20" rx="7" ry="4.5" fill="${c}"/><path d="M4 -20 l6 -4 v8 Z" fill="${c}"/><circle cx="-6" cy="-21" r="1.2" fill="#2a1a1a"/><ellipse cx="0" cy="-41" rx="11" ry="3" fill="none" stroke="#8EC9FF" stroke-width="2"/><path d="M-10 -8 q3 -6 6 0 M2 -6 q3 -7 6 0" stroke="#4CAF50" stroke-width="2" fill="none"/>`},
  /* wall decorations */
  poster:{l:'Heart Poster',g:'Wall Decor',y:178,c:0,box:[-30,-74,60,76],draw:(c,d,lt)=>`<rect x="-26" y="-70" width="52" height="68" rx="2" fill="#fff" stroke="${c}" stroke-width="4"/>`+heart(0,-38,14,c)+star(-14,-60,4,'#FFD84D')+star(14,-14,4,'#FFD84D')+`<rect x="-30" y="-74" width="12" height="6" fill="#FFF3A3" opacity=".8" transform="rotate(-20 -24 -71)"/><rect x="18" y="-74" width="12" height="6" fill="#FFF3A3" opacity=".8" transform="rotate(20 24 -71)"/>`},
  rainbowposter:{l:'Rainbow Poster',g:'Wall Decor',y:178,c:6,box:[-30,-74,60,76],draw:(c,d,lt)=>{let o=`<rect x="-26" y="-70" width="52" height="68" rx="2" fill="#E8F6FF" stroke="${c}" stroke-width="4"/>`;['#FF4D6D','#FF9F43','#FFD84D','#7BD88F','#5DA9FF'].forEach((col,i)=>o+=`<path d="M${-20+i*4} -20 A${20-i*4} ${20-i*4} 0 0 1 ${20-i*4} -20" stroke="${col}" stroke-width="4" fill="none"/>`);return o+cloud(-16,-18,.4)+cloud(16,-18,.4);}},
  clock:{l:'Clock',g:'Wall Decor',y:120,c:8,box:[-22,-40,44,42],draw:(c,d,lt)=>`<circle cx="0" cy="-19" r="18" fill="#fff" stroke="${c}" stroke-width="4"/>`+[0,1,2,3].map(i=>`<circle cx="${(13*Math.cos(i*Math.PI/2)).toFixed(1)}" cy="${(-19+13*Math.sin(i*Math.PI/2)).toFixed(1)}" r="1.6" fill="${d}"/>`).join('')+`<path d="M0 -19 V-29 M0 -19 L7 -15" stroke="#3b2453" stroke-width="2" stroke-linecap="round"/><circle cx="0" cy="-19" r="2" fill="${c}"/>`},
  mirror:{l:'Mirror',g:'Wall Decor',y:206,c:9,box:[-28,-72,56,74],draw:(c,d,lt)=>`<ellipse cx="0" cy="-35" rx="23" ry="33" fill="#DDF3FF" stroke="${c}" stroke-width="5"/><path d="M-10 -52 Q-4 -60 4 -56 M-12 -42 Q-8 -46 -4 -44" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>`+heart(0,-70,5,c)},
  wallshelf:{l:'Wall Shelf',g:'Wall Decor',y:142,c:9,box:[-44,-40,88,44],draw:(c,d,lt)=>`<path d="M-34 0 L-34 8 L-26 0 M34 0 L34 8 L26 0" stroke="${d}" stroke-width="3" fill="none"/><path d="M-30 -2 L-32 -14 L-20 -14 L-22 -2 Z" fill="#FF9F43"/><g fill="#4CAF50"><ellipse cx="-30" cy="-20" rx="4" ry="8" transform="rotate(-20 -30 -20)"/><ellipse cx="-22" cy="-20" rx="4" ry="8" transform="rotate(20 -22 -20)"/></g><rect x="-10" y="-22" width="7" height="22" fill="#5DA9FF"/><rect x="-3" y="-18" width="6" height="18" fill="#FF6FA8"/><rect x="3" y="-24" width="7" height="24" fill="#FFD84D"/>`+star(26,-12,9,'#FFD84D','stroke="#E0B030"')+`<rect x="-42" y="-2" width="84" height="6" rx="2" fill="${c}" stroke="${d}"/>`},
  bunting:{l:'Bunting',g:'Wall Decor',y:66,c:0,box:[-78,-34,156,36],draw:(c,d,lt)=>{let o=`<path d="M-74 -28 Q0 -4 74 -28" stroke="#9a8aa8" stroke-width="1.5" fill="none"/>`;const cs=[c,'#FFD84D','#5DA9FF','#7BD88F','#C77DFF',lt,'#FF9F43'];for(let i=0;i<7;i++){const t=(i+.5)/7,x=-74+148*t,y=(1-t)*(1-t)*-28+2*(1-t)*t*-4+t*t*-28;o+=`<path d="M${(x-9).toFixed(1)} ${y.toFixed(1)} L${(x+9).toFixed(1)} ${y.toFixed(1)} L${x.toFixed(1)} ${(y+18).toFixed(1)} Z" fill="${cs[i]}"/>`;}return o;}},
  frames:{l:'Photo Frames',g:'Wall Decor',y:160,c:10,box:[-44,-62,88,64],draw:(c,d,lt)=>`<rect x="-42" y="-60" width="38" height="30" fill="#FFF4E6" stroke="${d}" stroke-width="3"/>`+heart(-23,-46,6,'#FF6FA8')+`<rect x="4" y="-60" width="34" height="42" fill="#E8F6FF" stroke="${d}" stroke-width="3"/>`+star(21,-40,9,'#FFD84D')+`<circle cx="-22" cy="-14" r="13" fill="#F0FFE8" stroke="${d}" stroke-width="3"/><circle cx="-26" cy="-16" r="1.5" fill="#3b2453"/><circle cx="-18" cy="-16" r="1.5" fill="#3b2453"/><path d="M-27 -10 Q-22 -6 -17 -10" stroke="#3b2453" stroke-width="1.5" fill="none"/>`},
  /* plants */
  plant:{l:'Leafy Plant',g:'Plants',y:336,c:2,box:[-32,-86,64,88],draw:(c,d,lt)=>`<g fill="#4CAF50" stroke="#3B8F40" stroke-width="1.5"><ellipse cx="-14" cy="-52" rx="9" ry="22" transform="rotate(-25 -14 -52)"/><ellipse cx="14" cy="-54" rx="9" ry="22" transform="rotate(25 14 -54)"/><ellipse cx="0" cy="-62" rx="9" ry="24"/><ellipse cx="-22" cy="-38" rx="7" ry="16" transform="rotate(-55 -22 -38)"/><ellipse cx="22" cy="-38" rx="7" ry="16" transform="rotate(55 22 -38)"/></g><path d="M-16 0 L-20 -30 L20 -30 L16 0 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><rect x="-22" y="-34" width="44" height="8" rx="3" fill="${lt}" stroke="${d}" stroke-width="1.5"/>`},
  flowerpot:{l:'Flowers',g:'Plants',y:336,c:6,box:[-28,-76,56,78],draw:(c,d,lt)=>`<path d="M-12 -30 Q-16 -50 -14 -60 M0 -30 V-68 M12 -30 Q16 -48 14 -58" stroke="#4CAF50" stroke-width="3" fill="none"/><ellipse cx="-8" cy="-44" rx="6" ry="3" fill="#4CAF50" transform="rotate(-30 -8 -44)"/>`+flower(-14,-62,5,'#FF6FA8')+flower(0,-70,5,'#FFD84D','#FF9F43')+flower(14,-60,5,'#C77DFF')+`<path d="M-14 0 Q-20 -16 -12 -30 H12 Q20 -16 14 0 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><path d="M-14 -16 H14" stroke="${lt}" stroke-width="3"/>`},
  cactus:{l:'Cactus',g:'Plants',y:336,c:1,box:[-24,-70,48,72],draw:(c,d,lt)=>`<g fill="#5BB85B" stroke="#3B8F40" stroke-width="1.5"><rect x="-8" y="-66" width="16" height="44" rx="8"/><path d="M-8 -40 H-16 Q-20 -40 -20 -46 V-52 Q-20 -56 -16 -56 Q-12 -56 -12 -52 V-46 H-8 Z"/><path d="M8 -46 H16 Q20 -46 20 -52 V-58 Q20 -62 16 -62 Q12 -62 12 -58 V-52 H8 Z"/></g>`+flower(0,-68,3.5,'#FF6FA8')+`<path d="M-14 0 L-16 -24 L16 -24 L14 0 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><rect x="-18" y="-27" width="36" height="6" rx="3" fill="${lt}" stroke="${d}"/>`}
};
const DECOR_GROUPS=['Furniture','Toys & Pets','Wall Decor','Plants'];
const AVATAR_SCALE=.44;

const ROOM_DEF={name:'',wall:0,pattern:'dots',floor:'woodLight',window:'classic',view:'day',curtain:7,bed:'canopy',bedColor:0,rug:'round',rugColor:9,light:'fairy',
  items:[{t:'bookshelf',x:30,y:330,s:.9,f:false,c:9},{t:'poster',x:245,y:178,s:1,f:false,c:0},{t:'plant',x:250,y:336,s:1,f:false,c:2},{t:'teddy',x:330,y:344,s:1,f:false,c:0}]};

function itemTransform(it){
  const s=it.t==='avatar'?AVATAR_SCALE*it.s:it.s;
  return `translate(${it.x.toFixed(1)} ${it.y.toFixed(1)}) scale(${(s*(it.f?-1:1)).toFixed(3)} ${s.toFixed(3)})`;
}
function drawItem(it,uid){
  if(it.t==='avatar')return `<g transform="translate(-150 -470)">${render(Object.assign({},DEF,it.look),{bg:false,uid})}</g>`;
  const D=DECOR[it.t];if(!D)return '';
  const c=CLOTH[it.c]||CLOTH[D.c];
  return D.draw(c,shade(c,c==='#FFFFFF'?-.15:-.25),c==='#2E2E3A'?'#6B6B80':shade(c,.45));
}
function renderRoom(r,o={}){
  const u=o.uid||'rm',wall=WALLC[r.wall]||WALLC[0];
  let out=`<rect width="480" height="262" fill="${wall}"/>`+wallPattern(u,r.pattern,wall)+`<rect width="480" height="8" fill="${shade(wall,-.1)}"/>`;
  out+=drawWindow(u,r);
  out+=(FLOORS[r.floor]||FLOORS.woodLight).draw()+`<rect y="252" width="480" height="12" fill="#fff"/><path d="M0 264 H480" stroke="#e2d6e8" stroke-width="2"/>`;
  out+=(LIGHTS[r.light]||LIGHTS.none).draw();
  const rc=CLOTH[r.rugColor],bc=CLOTH[r.bedColor];
  out+=(RUGS[r.rug]||RUGS.none).draw(rc,shade(rc,-.22),shade(rc,.4));
  out+=(BEDS[r.bed]||BEDS.none).draw(bc,shade(bc,bc==='#FFFFFF'?-.15:-.25),bc==='#2E2E3A'?'#6B6B80':shade(bc,.45));
  if(!o.noItems)(r.items||[]).forEach((it,i)=>{
    out+=`<g class="item${o.sel===i?' sel':''}"${o.interactive?` data-i="${i}"`:''} transform="${itemTransform(it)}">${drawItem(it,u+'a'+i)}</g>`;
  });
  return out;
}

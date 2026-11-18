/* Style Studio — avatar art (shared by every module) */
/* ---------- palettes ---------- */
const SKIN=['#FDE7D6','#F7D4BA','#EDBE9C','#DDA57F','#C98B64','#AC6E4B','#8C5437','#603C28'];
const HAIRC=['#2B1B12','#5A3420','#8B5A2B','#C68A45','#E8C27A','#F6E7BC','#B5402F','#FF7AB6','#A57CFF','#5DB2F0','#4CC79A','#EDEDF2'];
const CLOTH=['#FF6FA8','#FF4D6D','#FF9F43','#FFD84D','#7BD88F','#38C6C6','#5DA9FF','#3D63C9','#8F7CFF','#C77DFF','#FFFFFF','#2E2E3A'];
const EYEC=['#6B4226','#3D7BD9','#3AA05A','#9C7A3C','#7D8A99','#8A5BD6'];
const SHADOW=[null,'#F6A6C9','#C8A2FF','#8EC9FF','#9BE3B0','#FFC37A','#E9C75A','#C9CBDA'];
const BLUSH=[null,'#FF9AAE','#FFAA85','#FF6F91','#E58BD8'];
const LIPS=[null,'#E8788A','#FF2E63','#B83280','#FF9AB8','#C2185B','#9B59B6','#D2691E'];

/* ---------- helpers ---------- */
function shade(hex,amt){
  const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;
  const f=v=>Math.max(0,Math.min(255,Math.round(amt<0?v*(1+amt):v+(255-v)*amt)));
  return '#'+((1<<24)|(f(r)<<16)|(f(g)<<8)|f(b)).toString(16).slice(1);
}
const M=inner=>`<g transform="translate(300 0) scale(-1 1)">${inner}</g>`;
const both=inner=>inner+M(inner);
function limb(x1,y1,x2,y2,w,c){
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${shade(c,-.25)}" stroke-width="${w+3}" stroke-linecap="round"/>`+
         `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
}
function star(cx,cy,r,fill,extra=''){
  const p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;p.push((cx+rr*Math.cos(a)).toFixed(1)+','+(cy+rr*Math.sin(a)).toFixed(1));}
  return `<polygon points="${p.join(' ')}" fill="${fill}" ${extra}/>`;
}
function heart(cx,cy,s,fill,extra=''){
  return `<path d="M${cx} ${cy+s*.9} C${cx-s*1.5} ${cy+s*.05} ${cx-s*.75} ${cy-s*1} ${cx} ${cy-s*.3} C${cx+s*.75} ${cy-s*1} ${cx+s*1.5} ${cy+s*.05} ${cx} ${cy+s*.9} Z" fill="${fill}" ${extra}/>`;
}
function flower(cx,cy,r,petal,center='#FFD84D'){
  let o='';for(let i=0;i<5;i++){const a=i*Math.PI*2/5-Math.PI/2;o+=`<circle cx="${(cx+Math.cos(a)*r).toFixed(1)}" cy="${(cy+Math.sin(a)*r).toFixed(1)}" r="${r*.75}" fill="${petal}"/>`;}
  return o+`<circle cx="${cx}" cy="${cy}" r="${r*.6}" fill="${center}"/>`;
}
function rng(seed){return()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;}}
const contrast=c=>(c==='#FFFFFF'||c==='#FFD84D')?'#FF6FA8':'#FFFFFF';

/* ---------- backgrounds ---------- */
const lg=(id,a,b)=>`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`;
const cloud=(x,y,s)=>`<g fill="#fff" opacity=".9"><ellipse cx="${x}" cy="${y}" rx="${24*s}" ry="${12*s}"/><circle cx="${x-10*s}" cy="${y-6*s}" r="${11*s}"/><circle cx="${x+8*s}" cy="${y-9*s}" r="${13*s}"/></g>`;
const BG={
  bedroom:u=>{
    let o=lg(u+'w','#FFE6F3','#FBD0E7')+`<rect width="300" height="480" fill="url(#${u}w)"/>`;
    for(let y=30;y<400;y+=44)for(let x=(y/44%2?40:18);x<300;x+=46)o+=heart(x,y,5,'#fff','opacity=".6"');
    o+=`<path d="M0 22 Q150 60 300 22" stroke="#B48BD8" stroke-width="2" fill="none"/>`;
    ['#FF6FA8','#FFD84D','#5DA9FF','#7BD88F','#C77DFF','#FF9F43','#38C6C6'].forEach((c,i)=>{const x=22+i*42,y=22+38*(1-Math.pow((x-150)/150,2))*.95;o+=`<path d="M${x-8} ${y} L${x+8} ${y} L${x} ${y+16} Z" fill="${c}"/>`;});
    o+=`<rect x="16" y="78" width="76" height="96" rx="8" fill="#9AD4FF" stroke="#fff" stroke-width="7"/><path d="M54 78 V174 M16 126 H92" stroke="#fff" stroke-width="5"/>`+
       `<circle cx="34" cy="100" r="9" fill="#FFF6C8"/>`+star(74,104,5,'#fff')+star(66,150,4,'#fff')+
       `<path d="M8 72 Q30 120 18 186 L4 186 Z M100 72 Q78 120 90 186 L104 186 Z" fill="#C77DFF" opacity=".85"/>`+
       `<rect x="222" y="120" width="64" height="8" rx="3" fill="#C99A6B"/><rect x="230" y="96" width="14" height="24" rx="3" fill="#5DA9FF"/><rect x="246" y="102" width="12" height="18" rx="3" fill="#FFD84D"/><circle cx="272" cy="108" r="10" fill="#7BD88F"/><rect x="266" y="110" width="12" height="10" fill="#FF9F43"/>`+
       `<rect y="400" width="300" height="80" fill="#E9CBA7"/><path d="M0 425 H300 M0 452 H300 M70 400 V425 M190 400 V425 M30 425 V452 M140 425 V452 M250 425 V452 M90 452 V480 M210 452 V480" stroke="#D4AF86" stroke-width="2"/>`+
       `<ellipse cx="150" cy="458" rx="128" ry="20" fill="#C8A2FF" opacity=".75"/>`;
    return o;
  },
  beach:u=>lg(u+'s','#7FCBFF','#E3F6FF')+`<rect width="300" height="480" fill="url(#${u}s)"/>`+
    `<circle cx="244" cy="72" r="38" fill="#FFE98A" opacity=".5"/><circle cx="244" cy="72" r="28" fill="#FFE066"/>`+cloud(70,70,1.1)+cloud(170,120,.8)+
    `<rect y="300" width="300" height="80" fill="#3FB6E0"/><path d="M0 318 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 M0 346 q15 -8 30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0 t30 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`+
    `<path d="M0 372 Q150 352 300 372 V480 H0 Z" fill="#F6D9A0"/>`+
    `<path d="M30 400 Q40 300 26 230" stroke="#9C6B3C" stroke-width="9" fill="none" stroke-linecap="round"/>`+
    `<g fill="#3BAE5A"><path d="M26 232 Q-10 220 -14 250 Q10 230 26 236Z"/><path d="M26 232 Q60 210 82 236 Q52 226 26 238Z"/><path d="M26 230 Q20 196 50 186 Q34 206 30 232Z"/><path d="M26 232 Q0 200 -20 210 Q8 214 24 236Z"/></g>`+
    `<path d="M248 452 l10 -16 l10 16 Z" fill="#FFB0A0"/><circle cx="60" cy="460" r="7" fill="#FFF0E0" stroke="#F2B88A"/>`+star(220,468,8,'#FF9F43'),
  castle:u=>{
    let o=lg(u+'c','#C9B6FF','#FFD9F0')+`<rect width="300" height="480" fill="url(#${u}c)"/>`+cloud(60,60,1)+cloud(240,40,.8);
    o+=`<g fill="#E9DDFF" stroke="#BFA9F0" stroke-width="2"><rect x="20" y="170" width="54" height="230"/><rect x="226" y="170" width="54" height="230"/><rect x="74" y="250" width="152" height="150"/><rect x="118" y="200" width="64" height="70"/></g>`+
       `<g fill="#FF8FC6"><path d="M14 172 L47 98 L80 172Z"/><path d="M220 172 L253 98 L286 172Z"/><path d="M112 202 L150 140 L188 202Z"/></g>`+
       `<path d="M47 98 V76 l18 6 l-18 6 M253 98 V76 l18 6 l-18 6 M150 140 V116 l18 6 l-18 6" stroke="#8F6BFF" stroke-width="2" fill="#FFD84D"/>`+
       `<g fill="#B79BEA"><rect x="38" y="210" width="18" height="26" rx="9"/><rect x="244" y="210" width="18" height="26" rx="9"/><rect x="140" y="220" width="20" height="30" rx="10"/></g>`+
       `<path d="M0 400 Q150 370 300 400 V480 H0Z" fill="#9EE0A0"/><path d="M0 430 Q150 410 300 430 V480 H0Z" fill="#7FCF85"/>`;
    for(let i=0;i<9;i++)o+=flower(20+i*34,450+(i%2)*14,4,['#fff','#FFD84D','#FF8FC6'][i%3],'#FF9F43');
    return o;
  },
  stage:u=>{
    let o=`<rect width="300" height="480" fill="#2A1840"/>`;
    const r=rng(7);for(let i=0;i<26;i++)o+=`<circle cx="${(r()*300).toFixed(0)}" cy="${(r()*200).toFixed(0)}" r="${(r()*1.8+.6).toFixed(1)}" fill="#FFE9A8" opacity=".8"/>`;
    o+=`<path d="M150 0 L50 470 L250 470 Z" fill="#FFF6C8" opacity=".22"/><ellipse cx="150" cy="452" rx="110" ry="20" fill="#FFF6C8" opacity=".35"/>`+
       `<rect y="420" width="300" height="60" fill="#7A4430"/><path d="M0 440 H300 M0 462 H300" stroke="#5E3222" stroke-width="2"/>`+
       `<path d="M0 0 H70 Q60 160 80 300 Q50 380 66 480 H0Z" fill="#C2185B"/><path d="M300 0 H230 Q240 160 220 300 Q250 380 234 480 H300Z" fill="#C2185B"/>`+
       `<path d="M18 0 Q12 200 22 480 M42 0 Q38 220 46 480 M282 0 Q288 200 278 480 M258 0 Q262 220 254 480" stroke="#8E1042" stroke-width="3" fill="none"/>`;
    let v='M0 0 H300 V30';for(let x=300;x>0;x-=30)v+=` Q${x-15} 54 ${x-30} 30`;o+=`<path d="${v} Z" fill="#E0336F"/>`;
    for(let x=15;x<300;x+=30)o+=`<circle cx="${x}" cy="44" r="3" fill="#FFD84D"/>`;
    return o;
  },
  park:u=>{
    let o=lg(u+'p','#A8DEFF','#E8F7FF')+`<rect width="300" height="480" fill="url(#${u}p)"/>`+cloud(70,60,1)+cloud(220,90,1.2)+
      `<path d="M0 300 Q90 250 180 290 T300 270 V480 H0Z" fill="#9BDB86"/><path d="M0 350 Q150 320 300 350 V480 H0Z" fill="#7CCB6E"/>`;
    [[40,270,1],[262,250,1.2],[200,300,.7]].forEach(([x,y,s])=>{o+=`<rect x="${x-6*s}" y="${y}" width="${12*s}" height="${60*s}" rx="4" fill="#A0703F"/><g fill="#55B04E"><circle cx="${x}" cy="${y-6*s}" r="${30*s}"/><circle cx="${x-22*s}" cy="${y+8*s}" r="${20*s}"/><circle cx="${x+22*s}" cy="${y+8*s}" r="${20*s}"/></g><circle cx="${x-8*s}" cy="${y-14*s}" r="${4*s}" fill="#FF4D6D"/><circle cx="${x+12*s}" cy="${y-2*s}" r="${4*s}" fill="#FF4D6D"/>`;});
    o+=`<path d="M120 480 Q140 420 150 360 Q160 420 190 480Z" fill="#F2E2B8" opacity=".8"/>`;
    const r=rng(3);for(let i=0;i<16;i++)o+=flower((r()*300).toFixed(0)*1,370+r()*100,3.5,['#fff','#FFD84D','#FF8FC6','#C77DFF'][i%4],'#FF9F43');
    return o;
  },
  space:u=>{
    let o=lg(u+'x','#0E1033','#3A1F6E')+`<rect width="300" height="480" fill="url(#${u}x)"/>`;
    const r=rng(11);for(let i=0;i<70;i++)o+=`<circle cx="${(r()*300).toFixed(0)}" cy="${(r()*480).toFixed(0)}" r="${(r()*1.6+.4).toFixed(1)}" fill="#fff" opacity="${(r()*.6+.4).toFixed(2)}"/>`;
    o+=`<ellipse cx="236" cy="96" rx="58" ry="12" fill="none" stroke="#FFD84D" stroke-width="5" opacity=".9" transform="rotate(-18 236 96)"/><circle cx="236" cy="96" r="32" fill="#FF8FC6"/><path d="M206 88 Q236 80 266 92" stroke="#E0629E" stroke-width="5" fill="none"/><path d="M214 108 Q236 116 262 104" stroke="#E0629E" stroke-width="4" fill="none"/>`+
       `<path d="M190 82 A58 12 -18 0 0 282 106" fill="none" stroke="#FFD84D" stroke-width="5" opacity=".9" transform="rotate(0)"/>`+
       `<circle cx="50" cy="60" r="20" fill="#F2F2FF"/><circle cx="44" cy="54" r="4" fill="#D8D8EE"/><circle cx="58" cy="68" r="3" fill="#D8D8EE"/>`+
       `<path d="M40 200 L110 160" stroke="#fff" stroke-width="2" opacity=".7"/>`+star(112,159,6,'#fff')+
       `<ellipse cx="150" cy="470" rx="190" ry="40" fill="#5A3E9E"/><circle cx="80" cy="462" r="8" fill="#4A2F86"/><circle cx="220" cy="470" r="11" fill="#4A2F86"/>`;
    return o;
  },
  snow:u=>{
    let o=lg(u+'n','#BFDFFF','#F2F8FF')+`<rect width="300" height="480" fill="url(#${u}n)"/>`;
    [[40,330,1.2],[262,320,1.4],[100,350,.8],[210,360,.9]].forEach(([x,y,s])=>{o+=`<rect x="${x-4*s}" y="${y}" width="${8*s}" height="${18*s}" fill="#8B5A2B"/><path d="M${x} ${y-90*s} L${x-34*s} ${y} L${x+34*s} ${y}Z M${x} ${y-110*s} L${x-26*s} ${y-50*s} L${x+26*s} ${y-50*s}Z" fill="#2E8B57"/><path d="M${x} ${y-110*s} L${x-10*s} ${y-86*s} L${x+10*s} ${y-86*s}Z" fill="#fff"/>`;});
    o+=`<path d="M0 360 Q150 330 300 360 V480 H0Z" fill="#fff"/><path d="M0 400 Q120 380 300 410" stroke="#DDEBFA" stroke-width="4" fill="none"/>`;
    const r=rng(5);for(let i=0;i<50;i++)o+=`<circle cx="${(r()*300).toFixed(0)}" cy="${(r()*360).toFixed(0)}" r="${(r()*2.4+1).toFixed(1)}" fill="#fff"/>`;
    return o;
  },
  candy:u=>{
    let o=lg(u+'k','#FFC9EA','#FFF1D6')+`<rect width="300" height="480" fill="url(#${u}k)"/>`+cloud(60,70,1)+cloud(230,50,.9);
    o+=`<path d="M0 340 Q80 300 160 335 T300 320 V480 H0Z" fill="#FF9FD0"/><path d="M0 390 Q150 360 300 390 V480 H0Z" fill="#FFB8DB"/>`;
    [[40,240,'#FF6FA8'],[262,220,'#8F7CFF'],[220,300,'#38C6C6']].forEach(([x,y,c])=>{o+=`<rect x="${x-3}" y="${y}" width="6" height="${360-y+40}" fill="#fff"/><circle cx="${x}" cy="${y}" r="26" fill="${c}"/><path d="M${x} ${y} m-4 0 a4 4 0 1 1 8 0 a8 8 0 1 1 -16 0 a12 12 0 1 1 24 0 a16 16 0 1 1 -32 0" stroke="#fff" stroke-width="3" fill="none"/>`;});
    [[90,420,'#7BD88F'],[160,440,'#FFD84D'],[240,430,'#FF4D6D'],[40,450,'#C77DFF']].forEach(([x,y,c])=>{o+=`<path d="M${x-14} ${y+10} Q${x-14} ${y-14} ${x} ${y-14} Q${x+14} ${y-14} ${x+14} ${y+10}Z" fill="${c}"/><circle cx="${x-4}" cy="${y-6}" r="3" fill="#fff" opacity=".7"/>`;});
    return o;
  }
};

/* ---------- hair ---------- */
const CAP="M88 132 C84 62 118 44 150 44 C182 44 216 62 212 132 C208 108 200 96 186 90 C176 100 150 102 134 96 C122 101 112 100 104 96 C96 104 90 116 88 132 Z";
const HEADBACK="M90 124 C84 52 216 52 210 124 L206 150 L94 150 Z";
const TIE='#FF6FA8';
const HAIR={
  long:()=>({back:`<path d="M92 100 C86 40 214 40 208 100 C216 160 222 240 226 300 Q150 318 74 300 C78 240 84 160 92 100 Z"/>`,
             front:`<path d="${CAP}"/>`+both(`<path d="M89 118 C80 180 86 240 98 292 L115 286 C104 230 100 170 105 110 Z"/>`)}),
  bob:()=>({back:`<path d="M90 110 C82 44 218 44 210 110 L214 186 Q190 196 172 186 L128 186 Q110 196 86 186 Z"/>`,
            front:`<path d="${CAP}"/>`+both(`<path d="M89 118 C85 150 85 170 88 190 L106 186 C100 160 100 140 105 110 Z"/>`)}),
  ponytail:()=>({back:`<path d="${HEADBACK}"/><path d="M194 70 C252 66 266 150 248 226 C242 252 228 264 220 252 C236 200 232 130 198 98 Z"/>`,
                 front:`<path d="${CAP}"/><circle cx="200" cy="80" r="9" fill="${TIE}" stroke="#C94F80"/>`}),
  pigtails:()=>({back:`<path d="${HEADBACK}"/>`+both(`<path d="M100 96 C50 100 40 190 58 250 C64 268 78 264 76 248 C66 200 78 140 108 114 Z"/>`),
                 front:`<path d="${CAP}"/>`+both(`<circle cx="99" cy="104" r="9" fill="${TIE}" stroke="#C94F80"/>`)}),
  bun:()=>({back:`<path d="${HEADBACK}"/><circle cx="150" cy="36" r="30"/>`,
            front:`<path d="${CAP}"/><rect x="132" y="58" width="36" height="9" rx="4.5" fill="${TIE}" stroke="#C94F80"/>`}),
  spacebuns:()=>({back:`<path d="${HEADBACK}"/>`+both(`<circle cx="98" cy="60" r="25"/>`),
                  front:`<path d="${CAP}"/>`+both(`<circle cx="98" cy="60" r="25"/><path d="M84 52 Q98 42 112 52" stroke-width="2" fill="none" opacity=".5"/>`)}),
  curly:()=>{let b='';for(let a=140;a<=400;a+=18){const r=a*Math.PI/180;b+=`<circle cx="${(150+72*Math.cos(r)).toFixed(1)}" cy="${(116+74*Math.sin(r)).toFixed(1)}" r="28"/>`;}
             b+=`<circle cx="84" cy="196" r="26"/><circle cx="216" cy="196" r="26"/><circle cx="92" cy="230" r="22"/><circle cx="208" cy="230" r="22"/>`;
             let f=`<path d="${CAP}"/>`;[[106,92],[126,98],[148,96],[170,98],[192,92]].forEach(([x,y])=>f+=`<circle cx="${x}" cy="${y}" r="13"/>`);
             return {back:b,front:f};},
  braids:()=>{let br='';for(let i=0;i<8;i++)br+=`<ellipse cx="${98-i*.6}" cy="${148+i*20}" rx="11" ry="12.5"/>`;
              br+=`<circle cx="94" cy="312" r="6" fill="${TIE}" stroke="#C94F80"/><path d="M88 318 L94 334 L100 318 Z"/>`;
              return {back:`<path d="${HEADBACK}"/>`,front:`<path d="${CAP}"/>`+both(br)};},
  pixie:()=>({back:`<path d="M90 124 C84 52 216 52 210 124 L206 140 L94 140 Z"/>`,
              front:`<path d="${CAP}"/>`+both(`<path d="M89 120 C87 136 89 150 95 160 L104 150 C100 136 101 122 105 110 Z"/>`)})
};

/* ---------- body ---------- */
function bodyParts(k,kd){
  let o=both(limb(113,202,99,296,17,k));
  o+=both(limb(136,290,134,440,21,k)+`<ellipse cx="129" cy="452" rx="15" ry="8" fill="${k}" stroke="${kd}" stroke-width="1.5"/>`);
  o+=`<path d="M112 198 Q150 188 188 198 L182 272 L186 300 L114 300 L118 272 Z" fill="${k}" stroke="${kd}" stroke-width="2"/>`;
  o+=`<rect x="139" y="164" width="22" height="38" rx="8" fill="${k}"/><path d="M139 178 Q150 190 161 178 L161 188 Q150 198 139 188 Z" fill="${kd}" opacity=".35"/>`;
  return o;
}
const hands=(k,kd)=>both(`<circle cx="98" cy="304" r="10" fill="${k}" stroke="${kd}" stroke-width="1.5"/>`);
function head(k,kd){
  return both(`<ellipse cx="94" cy="126" rx="9" ry="13" fill="${k}" stroke="${kd}" stroke-width="2"/><path d="M93 120 Q89 126 94 132" stroke="${kd}" stroke-width="1.5" fill="none"/>`)+
         `<ellipse cx="150" cy="118" rx="56" ry="60" fill="${k}" stroke="${kd}" stroke-width="2"/>`;
}
function face(s,kd,hd){
  let o='';
  const sh=SHADOW[s.shadow];
  if(sh)o+=both(`<ellipse cx="127" cy="119" rx="14.5" ry="10.5" fill="${sh}" opacity=".85"/>`);
  const ec=EYEC[s.eyes];
  let eye=`<ellipse cx="128" cy="126" rx="10.5" ry="12" fill="#fff" stroke="#3a2a2a" stroke-width="1.5"/><circle cx="129" cy="128" r="7.6" fill="${ec}"/><circle cx="129" cy="128" r="4" fill="#1a1010"/><circle cx="131.6" cy="124.6" r="2.5" fill="#fff"/><circle cx="126.6" cy="131.2" r="1.2" fill="#fff"/>`;
  if(s.lashes>=1)eye+=`<path d="M117 123 Q128 111 140 122" stroke="#2a1a1a" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if(s.lashes>=2)eye+=`<path d="M118 120 l-7 -4 M121 116 l-5 -6 M126 114 l-2 -7" stroke="#2a1a1a" stroke-width="2.2" stroke-linecap="round"/>`;
  o+=both(eye);
  o+=both(`<path d="M116 108 Q128 101 140 106" stroke="${hd}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`);
  o+=`<path d="M146 145 Q150 148 154 145" stroke="${kd}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  const bl=BLUSH[s.blush];
  if(bl)o+=both(`<ellipse cx="117" cy="148" rx="11" ry="6.5" fill="${bl}" opacity=".55"/>`);
  const lp=LIPS[s.lips];
  if(lp)o+=`<path d="M139 157 Q144 152.5 150 155.5 Q156 152.5 161 157 Q150 170 139 157 Z" fill="${lp}" stroke="${shade(lp,-.3)}" stroke-width="1"/><path d="M140 157.4 Q150 161 160 157.4" stroke="${shade(lp,-.35)}" stroke-width="1.2" fill="none"/><ellipse cx="153" cy="162" rx="3" ry="1.2" fill="#fff" opacity=".5"/>`;
  else o+=`<path d="M140 156 Q150 166 160 156" stroke="#B5525E" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  const st=s.sticker;
  if(st==='freckles')o+=both(`<g fill="${kd}" opacity=".7"><circle cx="112" cy="140" r="1.6"/><circle cx="118" cy="143" r="1.4"/><circle cx="124" cy="140" r="1.6"/><circle cx="115" cy="147" r="1.3"/><circle cx="122" cy="146" r="1.4"/></g>`);
  if(st==='stars')o+=star(178,150,7,'#FFD84D','stroke="#E0B030" stroke-width=".8"')+star(190,140,4,'#FF8FC6')+star(184,160,3.5,'#8EC9FF');
  if(st==='hearts')o+=both(heart(115,146,5,'#FF4D6D','opacity=".85"'));
  if(st==='gems')o+=both(`<path d="M120 140 l3 -4 l3 4 l-3 4 Z M128 142 l2.4 -3 l2.4 3 l-2.4 3 Z M136 140 l2 -2.6 l2 2.6 l-2 2.6 Z" fill="#9FE7FF" stroke="#5DB2F0" stroke-width=".6"/>`);
  if(st==='butterfly')o+=`<g transform="translate(182 148) rotate(-12)"><path d="M0 0 C-14 -16 -20 2 -4 4 C-16 10 -6 20 0 6 Z" fill="#C77DFF"/><path d="M0 0 C14 -16 20 2 4 4 C16 10 6 20 0 6 Z" fill="#FF8FC6"/><path d="M0 -4 V8" stroke="#3b2453" stroke-width="1.6"/></g>`;
  if(st==='rainbow')o+=`<g transform="translate(180 152)" fill="none" stroke-width="2.4" stroke-linecap="round"><path d="M-12 4 A12 12 0 0 1 12 4" stroke="#FF4D6D"/><path d="M-9 4 A9 9 0 0 1 9 4" stroke="#FFD84D"/><path d="M-6 4 A6 6 0 0 1 6 4" stroke="#5DA9FF"/></g>`;
  return o;
}

/* ---------- clothes ---------- */
const NECKLINE="M112 198 Q128 192 138 192 Q150 206 162 192 Q172 192 188 198";
const torso=(by,c,d,start=NECKLINE)=>`<path d="${start} L183 ${by} L117 ${by} Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>`;
const TOPS={
  tee:(c,d,lt)=>both(limb(114,204,107,236,23,c))+torso(286,c,d)+heart(150,242,13,contrast(c),'opacity=".9"'),
  tank:(c,d,lt)=>torso(286,c,d,"M118 199 L127 199 Q150 228 173 199 L182 199")+star(150,252,10,contrast(c),'opacity=".85"'),
  sweater:(c,d,lt)=>both(limb(114,204,99,286,21,c)+`<circle cx="99" cy="290" r="10" fill="${lt}" stroke="${d}" stroke-width="1.5"/>`)+torso(290,c,d)+
     `<path d="M118 236 l8 -8 l8 8 l8 -8 l8 8 l8 -8 l8 8 l8 -8 l8 8" stroke="${lt}" stroke-width="4" fill="none" stroke-linejoin="round"/><rect x="117" y="278" width="66" height="12" fill="${lt}" opacity=".6"/>`,
  hoodie:(c,d,lt)=>both(limb(114,204,99,286,21,c)+`<circle cx="99" cy="290" r="10" fill="${d}"/>`)+torso(292,c,d)+
     `<path d="M128 256 L172 256 L177 284 L123 284 Z" fill="${d}" opacity=".35"/><path d="M144 202 L142 230 M156 202 L158 230" stroke="${lt}" stroke-width="3" stroke-linecap="round"/><circle cx="142" cy="232" r="3" fill="${lt}"/><circle cx="158" cy="232" r="3" fill="${lt}"/>`,
  blouse:(c,d,lt)=>both(`<circle cx="116" cy="208" r="15" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M106 214 Q116 222 128 214" stroke="${d}" stroke-width="1.5" fill="none"/>`)+torso(284,c,d)+
     both(`<path d="M150 201 Q141 216 126 201 Q133 192 140 193 Z" fill="#fff" stroke="#e2d6e8" stroke-width="1.5"/>`)+
     `<circle cx="150" cy="226" r="3" fill="#fff"/><circle cx="150" cy="244" r="3" fill="#fff"/><circle cx="150" cy="262" r="3" fill="#fff"/>`,
  jacket:(c,d,lt)=>both(limb(114,204,99,286,21,c)+`<circle cx="99" cy="290" r="10" fill="${d}"/>`)+torso(290,'#FFFFFF','#e2d6e8')+
     heart(150,238,9,'#FF6FA8')+both(`<path d="M112 198 Q124 193 136 193 L143 292 L117 292 Z" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M137 194 L129 216 L120 199 Z" fill="${d}"/><path d="M121 240 H136" stroke="${d}" stroke-width="2" stroke-dasharray="3 3"/><circle cx="138" cy="250" r="2.5" fill="${lt}"/>`),
  jersey:(c,d,lt)=>both(limb(114,204,107,238,23,c)+`<line x1="108" y1="232" x2="106" y2="240" stroke="${contrast(c)}" stroke-width="20" stroke-linecap="butt" opacity=".9"/>`)+torso(288,c,d)+
     `<path d="M138 193 Q150 207 162 193" stroke="${contrast(c)}" stroke-width="4" fill="none"/><text x="150" y="262" text-anchor="middle" font-family="Fredoka,Arial" font-weight="700" font-size="34" fill="${contrast(c)}">7</text>`
};
const BOTTOMS={
  skirt:(c,d,lt)=>`<path d="M118 266 L182 266 L204 356 Q150 368 96 356 Z" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M134 276 L124 360 M150 276 L150 364 M166 276 L176 360" stroke="${d}" stroke-width="2" opacity=".45"/><rect x="117" y="263" width="66" height="11" rx="5" fill="${d}"/>`,
  longskirt:(c,d,lt)=>{let o=`<path d="M118 266 L182 266 C192 320 206 380 212 426 Q150 440 88 426 C94 380 108 320 118 266 Z" fill="${c}" stroke="${d}" stroke-width="2"/><rect x="117" y="263" width="66" height="11" rx="5" fill="${d}"/>`;
    [[130,300],[166,312],[118,350],[150,342],[184,360],[108,400],[140,392],[176,404],[198,400]].forEach(([x,y])=>o+=flower(x,y,3.4,lt,'#FFD84D'));return o;},
  jeans:(c,d,lt)=>`<path d="M117 266 L183 266 L186 302 L178 440 L153 440 L151 312 L149 312 L147 440 L122 440 L114 302 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>`+
     `<rect x="116" y="263" width="68" height="10" rx="4" fill="${d}"/><path d="M150 273 V305 M124 282 Q132 290 140 282 M176 282 Q168 290 160 282" stroke="${lt}" stroke-width="1.6" fill="none" stroke-dasharray="3 2"/><path d="M122 432 H147 M153 432 H178" stroke="${lt}" stroke-width="3"/>`,
  shorts:(c,d,lt)=>`<path d="M117 266 L183 266 L188 332 L154 332 L150 298 L146 332 L112 332 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/><rect x="116" y="263" width="68" height="10" rx="4" fill="${d}"/><path d="M113 324 H146 M154 324 H187" stroke="${lt}" stroke-width="4"/>`,
  tutu:(c,d,lt)=>{
    let out='';const layers=[[c,104,196,300],[lt,98,202,312],[c,94,206,322]];
    layers.reverse().forEach(([col,x1,x2,y])=>{let p=`M120 268 L180 268 L${x2} ${y}`;const n=8,w=(x2-x1)/n;for(let i=0;i<n;i++)p+=` Q${(x2-w*i-w/2).toFixed(1)} ${y+12} ${(x2-w*(i+1)).toFixed(1)} ${y}`;p+=' Z';out+=`<path d="${p}" fill="${col}" stroke="${d}" stroke-width="1.5" stroke-linejoin="round"/>`;});
    return out+`<rect x="117" y="263" width="66" height="10" rx="5" fill="${d}"/>`+star(130,290,3,'#fff')+star(166,300,3,'#fff')+star(186,316,2.5,'#fff')+star(112,312,2.5,'#fff');},
  leggings:(c,d,lt)=>{let o=`<path d="M118 266 L182 266 L184 300 L177 444 L154 444 L151 312 L149 312 L146 444 L123 444 L116 300 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/><rect x="117" y="263" width="66" height="10" rx="4" fill="${d}"/>`;
    const r=rng(9);for(let i=0;i<22;i++){const left=i%2,x=left?126+r()*16:157+r()*16,y=278+r()*156;o+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="${lt}"/>`;}return o;}
};
const SKIRT_SPARKLES=(n,seed,x1,x2,y1,y2)=>{const r=rng(seed);let o='';for(let i=0;i<n;i++)o+=star(x1+r()*(x2-x1),y1+r()*(y2-y1),2.5+r()*2.5,'#fff','opacity=".85"');return o;};
const DRESSES={
  none:()=>'',
  gown:(c,d,lt)=>both(`<circle cx="116" cy="207" r="15" fill="${lt}" stroke="${d}" stroke-width="2"/>`)+
     `<path d="M122 262 L178 262 C206 320 244 396 258 462 Q150 486 42 462 C56 396 94 320 122 262 Z" fill="${c}" stroke="${d}" stroke-width="2"/>`+
     `<path d="M122 262 L178 262 C190 300 196 340 196 380 Q150 396 104 380 C104 340 110 300 122 262Z" fill="${lt}" opacity=".45"/>`+
     `<path d="M138 282 Q118 380 98 470 M162 282 Q182 380 202 470 M150 282 L150 476" stroke="${d}" opacity=".3" fill="none" stroke-width="2"/>`+
     SKIRT_SPARKLES(14,4,70,230,300,460)+
     `<path d="${NECKLINE} L180 270 L120 270 Z" fill="${c}" stroke="${d}" stroke-width="2"/><rect x="119" y="258" width="62" height="12" rx="5" fill="${lt}"/>`+
     both(`<path d="M150 264 L132 254 L132 276 Z" fill="${lt}" stroke="${d}" stroke-width="1.2"/>`)+`<circle cx="150" cy="264" r="5" fill="${d}"/>`+star(150,214,6,'#FFD84D'),
  sundress:(c,d,lt)=>{let o=both(`<path d="M125 198 L130 222" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`)+
     `<path d="M120 264 L180 264 L212 374 Q150 388 88 374 Z" fill="${c}" stroke="${d}" stroke-width="2"/>`+
     `<path d="M121 214 Q150 228 179 214 L180 270 L120 270 Z" fill="${c}" stroke="${d}" stroke-width="2"/><rect x="119" y="260" width="62" height="9" rx="4" fill="${lt}"/>`;
     [[130,236],[168,244],[112,300],[150,292],[188,306],[104,350],[138,334],[172,346],[200,360],[124,364]].forEach(([x,y])=>o+=flower(x,y,3.6,contrast(c)==='#FFFFFF'?'#fff':'#FF6FA8','#FFD84D'));return o;},
  party:(c,d,lt)=>`<path d="M120 264 L180 264 L214 350 Q150 366 86 350 Z" fill="${d}" stroke="${shade(c,-.45)}" stroke-width="2"/>`+
     `<path d="M120 264 L180 264 L204 338 Q192 348 180 338 Q166 350 150 340 Q134 350 120 338 Q108 348 96 338 Z" fill="${c}" stroke="${d}" stroke-width="2"/>`+
     SKIRT_SPARKLES(9,8,100,200,280,340)+
     `<path d="M118 210 Q134 200 150 212 Q166 200 182 210 L180 270 L120 270 Z" fill="${c}" stroke="${d}" stroke-width="2"/>`+
     both(`<path d="M150 266 L128 254 L130 280 Z" fill="${lt}" stroke="${d}" stroke-width="1.2"/>`)+`<circle cx="150" cy="266" r="6" fill="${lt}" stroke="${d}"/>`,
  ballerina:(c,d,lt)=>{let out='';const layers=[[c,92,208,318],[lt,98,202,306],[c,104,196,296]];
     layers.forEach(([col,x1,x2,y])=>{let p=`M118 282 L182 282 L${x2} ${y}`;const n=9,w=(x2-x1)/n;for(let i=0;i<n;i++)p+=` Q${(x2-w*i-w/2).toFixed(1)} ${y+12} ${(x2-w*(i+1)).toFixed(1)} ${y}`;p+=' Z';out+=`<path d="${p}" fill="${col}" stroke="${d}" stroke-width="1.5" stroke-linejoin="round" opacity=".95"/>`;});
     return both(`<path d="M124 198 L128 212" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`)+
       `<path d="M118 210 Q134 202 150 212 Q166 202 182 210 L183 290 Q150 300 117 290 Z" fill="${c}" stroke="${d}" stroke-width="2"/>`+out+
       SKIRT_SPARKLES(8,12,100,200,290,320)+star(150,232,6,'#fff');},
  mermaid:(c,d,lt)=>{let o=`<path d="M120 264 L180 264 Q190 330 176 398 Q206 446 224 468 Q150 480 76 468 Q94 446 124 398 Q110 330 120 264 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/>`;
     for(let y=284;y<396;y+=14)for(let x=124+((y/14)%2?7:0);x<180;x+=14)o+=`<path d="M${x-7} ${y} Q${x} ${y+10} ${x+7} ${y}" stroke="${lt}" stroke-width="2" fill="none"/>`;
     o+=`<path d="M124 398 Q150 410 176 398" stroke="${d}" stroke-width="2" fill="none"/><path d="M110 440 L130 410 M150 470 L150 412 M190 440 L170 410" stroke="${lt}" stroke-width="2" opacity=".7"/>`;
     o+=`<path d="M118 212 Q134 200 150 212 Q166 200 182 212 L180 270 L120 270 Z" fill="${lt}" stroke="${d}" stroke-width="2"/>`+
        both(`<path d="M120 214 Q134 202 148 214" stroke="${d}" stroke-width="1.4" fill="none"/>`)+`<rect x="119" y="260" width="62" height="10" rx="4" fill="${d}"/><circle cx="150" cy="265" r="5" fill="#fff"/>`;
     return o;}
};
const SHOES={
  none:()=>'',
  sneakers:(c,d,lt)=>both(`<path d="M113 450 Q113 436 126 436 L143 436 Q151 438 151 450 L151 458 L112 458 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><rect x="110" y="455" width="42" height="8" rx="4" fill="#fff" stroke="#d8d0e0"/><path d="M132 440 L145 440 M131 446 L146 446" stroke="${contrast(c)}" stroke-width="2.2" stroke-linecap="round"/>`),
  boots:(c,d,lt)=>both(`<path d="M122 386 L149 386 L150 454 L151 462 L110 462 Q110 446 122 444 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><rect x="119" y="380" width="33" height="13" rx="5" fill="${lt}" stroke="${d}"/><rect x="109" y="458" width="43" height="6" rx="3" fill="${d}"/>`),
  flats:(c,d,lt)=>both(`<path d="M113 452 Q116 441 132 441 Q148 441 150 452 L150 460 Q131 466 112 460 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><circle cx="120" cy="450" r="1.3" fill="#fff"/><circle cx="128" cy="455" r="1.3" fill="#fff"/><circle cx="140" cy="452" r="1.3" fill="#fff"/><circle cx="135" cy="458" r="1.1" fill="#fff"/>`+heart(124,444,4,lt)),
  rainboots:(c,d,lt)=>both(`<path d="M121 394 L149 394 L150 454 L151 462 L109 462 Q109 446 121 444 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><path d="M127 402 V440" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/><rect x="108" y="458" width="45" height="6" rx="3" fill="${d}"/>`),
  ballet:(c,d,lt)=>both(`<path d="M126 444 L144 416 M142 444 L124 416 M124 416 L142 396 M144 416 L126 398" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/><path d="M114 452 Q117 442 132 442 Q147 442 149 452 L149 459 Q131 464 113 459 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/>`),
  sandals:(c,d,lt)=>both(`<rect x="110" y="456" width="42" height="7" rx="3.5" fill="${d}"/><path d="M118 450 Q130 440 146 448 M124 440 L124 456 M140 440 L140 456" stroke="${c}" stroke-width="4" fill="none" stroke-linecap="round"/>`+flower(132,446,2.6,lt,'#FFD84D'))
};
const NECKLACES={
  none:()=>'',
  pearls:()=>{let o='';for(let i=0;i<=10;i++){const t=i/10,x=(1-t)*(1-t)*132+2*(1-t)*t*150+t*t*168,y=(1-t)*(1-t)*196+2*(1-t)*t*226+t*t*196;o+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.3" fill="#fff" stroke="#d9d2df"/>`;}return o;},
  heart:()=>`<path d="M134 196 Q150 222 166 196" stroke="#E0B030" stroke-width="1.6" fill="none"/>`+heart(150,216,7,'#FF4D6D','stroke="#C2185B"'),
  rainbow:()=>{const cs=['#FF4D6D','#FF9F43','#FFD84D','#7BD88F','#5DA9FF','#8F7CFF','#C77DFF'];let o='';for(let i=0;i<=12;i++){const t=i/12,x=(1-t)*(1-t)*131+2*(1-t)*t*150+t*t*169,y=(1-t)*(1-t)*196+2*(1-t)*t*228+t*t*196;o+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="${cs[i%7]}"/>`;}return o;},
  star:()=>`<path d="M134 196 Q150 222 166 196" stroke="#E0B030" stroke-width="1.6" fill="none"/>`+star(150,216,8,'#FFD84D','stroke="#E0B030"')
};
const EARRINGS={
  none:()=>'',
  studs:()=>both(`<circle cx="93" cy="138" r="3.6" fill="#9FE7FF" stroke="#5DB2F0"/><circle cx="92" cy="137" r="1.2" fill="#fff"/>`),
  hoops:()=>both(`<circle cx="93" cy="146" r="8" fill="none" stroke="#E9B93A" stroke-width="2.6"/>`),
  stars:()=>both(`<line x1="93" y1="138" x2="93" y2="144" stroke="#E9B93A" stroke-width="1.5"/>`+star(93,150,6.5,'#FFD84D','stroke="#E0B030" stroke-width=".8"')),
  hearts:()=>both(`<line x1="93" y1="138" x2="93" y2="143" stroke="#E9B93A" stroke-width="1.5"/>`+heart(93,148,5.5,'#FF4D6D'))
};
const HATS={
  none:()=>'',
  tiara:(c)=>`<path d="M118 62 L126 36 L138 52 L150 24 L162 52 L174 36 L182 62 Q150 53 118 62 Z" fill="#FFD84D" stroke="#D9A82A" stroke-width="2" stroke-linejoin="round"/><circle cx="150" cy="46" r="5" fill="${c}"/><circle cx="127" cy="52" r="3.2" fill="${c}"/><circle cx="173" cy="52" r="3.2" fill="${c}"/><circle cx="150" cy="24" r="3" fill="#fff"/>`,
  bow:(c,d)=>`<g transform="translate(182 60) rotate(18) scale(1.25)"><path d="M0 0 L-24 -15 Q-31 0 -24 15 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><path d="M0 0 L24 -15 Q31 0 24 15 Z" fill="${c}" stroke="${d}" stroke-width="1.5"/><circle r="6" fill="${d}"/><circle cx="-14" cy="-3" r="2" fill="#fff" opacity=".6"/><circle cx="14" cy="-3" r="2" fill="#fff" opacity=".6"/></g>`,
  headband:(c,d)=>`<path d="M93 104 C96 50 204 50 207 104" stroke="${d}" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M93 104 C96 50 204 50 207 104" stroke="${c}" stroke-width="8" fill="none" stroke-linecap="round"/>`+flower(118,64,6,'#fff','#FFD84D'),
  sunhat:(c,d,lt)=>`<ellipse cx="150" cy="68" rx="94" ry="17" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M104 68 Q106 16 150 14 Q194 16 196 68 Z" fill="${c}" stroke="${d}" stroke-width="2"/><path d="M105 56 Q150 48 195 56 L196 66 Q150 59 104 66 Z" fill="${lt}"/>`+flower(186,58,6,'#fff','#FFD84D'),
  beanie:(c,d,lt)=>`<path d="M88 96 C84 26 216 26 212 96 Z" fill="${c}" stroke="${d}" stroke-width="2"/><rect x="85" y="84" width="130" height="19" rx="9.5" fill="${lt}" stroke="${d}" stroke-width="1.5"/><path d="M100 86 V101 M114 85 V102 M128 85 V102 M142 85 V102 M156 85 V102 M170 85 V102 M184 85 V102 M198 86 V101" stroke="${d}" stroke-width="1.2" opacity=".4"/><circle cx="150" cy="28" r="15" fill="#fff" stroke="#e2d6e8"/>`,
  flowers:(c,d,lt)=>{let o='';const cs=[c,'#fff',lt];for(let i=0;i<7;i++){const x=96+i*18,y=118-62*Math.sqrt(Math.max(0,1-Math.pow((x-150)/62,2)))+4;o+=`<ellipse cx="${x+8}" cy="${y+4}" rx="6" ry="3" fill="#5BB85B" transform="rotate(25 ${x+8} ${y+4})"/>`+flower(x,y,6,cs[i%3],'#FFD84D');}return o;},
  catears:(c,d)=>both(`<path d="M100 80 L96 28 L138 54 Z" fill="${c}" stroke="${d}" stroke-width="2" stroke-linejoin="round"/><path d="M104 70 L102 42 L126 56 Z" fill="#FFB6D0"/>`),
  unicorn:(c,d)=>`<path d="M140 54 L150 0 L160 54 Z" fill="#FFE07A" stroke="#E0B84A" stroke-width="2" stroke-linejoin="round"/><path d="M142 44 L157 38 M144 32 L155 26 M146 20 L153 15" stroke="#E0B84A" stroke-width="2"/>`+
     both(`<path d="M108 72 L112 44 L130 62 Z" fill="#fff" stroke="#e2d6e8" stroke-width="1.5"/><path d="M113 64 L114 52 L123 60 Z" fill="#FFB6D0"/>`)+flower(130,60,5,c,'#FFD84D')+flower(170,60,5,c,'#FFD84D')
};
const GLASSES={
  none:()=>'',
  round:(c)=>both(`<circle cx="128" cy="126" r="16" fill="#fff" fill-opacity=".15" stroke="${c}" stroke-width="3"/><path d="M112 122 L96 118" stroke="${c}" stroke-width="3"/>`)+`<path d="M144 124 Q150 119 156 124" stroke="${c}" stroke-width="3" fill="none"/>`,
  heart:(c)=>both(heart(128,128,15,c,`opacity=".85" stroke="${shade(c,-.3)}" stroke-width="2"`)+`<path d="M108 120 L96 118" stroke="${shade(c,-.3)}" stroke-width="3"/>`)+`<path d="M143 122 Q150 118 157 122" stroke="${shade(c,-.3)}" stroke-width="3" fill="none"/>`,
  star:(c)=>both(star(128,127,21,c,`opacity=".88" stroke="${shade(c,-.3)}" stroke-width="2" stroke-linejoin="round"`)+`<path d="M108 120 L96 118" stroke="${shade(c,-.3)}" stroke-width="3"/>`),
  cateye:(c)=>both(`<path d="M110 118 Q128 110 146 120 Q146 140 128 140 Q112 140 110 118 Z" fill="#fff" fill-opacity=".15" stroke="${c}" stroke-width="3.2" stroke-linejoin="round"/><path d="M110 118 L104 108" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/><path d="M110 120 L96 118" stroke="${c}" stroke-width="3"/>`)+`<path d="M146 122 Q150 119 154 122" stroke="${c}" stroke-width="3" fill="none"/>`
};
const HELD={
  none:()=>'',
  purse:()=>`<path d="M196 306 Q194 322 202 326 M208 306 Q216 316 230 324" stroke="#8B5A2B" stroke-width="3" fill="none"/><rect x="194" y="322" width="44" height="32" rx="9" fill="#FF6FA8" stroke="#C94F80" stroke-width="2"/><path d="M194 334 H238" stroke="#C94F80" stroke-width="2"/><circle cx="216" cy="334" r="4.5" fill="#FFD84D" stroke="#D9A82A"/>`,
  wand:()=>`<line x1="198" y1="310" x2="232" y2="232" stroke="#fff" stroke-width="5" stroke-linecap="round"/><line x1="198" y1="310" x2="232" y2="232" stroke="#C77DFF" stroke-width="2" stroke-dasharray="4 4"/>`+star(234,226,17,'#FFD84D','stroke="#E0B030" stroke-width="1.5"')+star(256,206,4,'#FF8FC6')+star(214,208,3.5,'#8EC9FF')+star(258,240,3,'#fff'),
  balloon:()=>`<path d="M203 306 Q228 250 236 178" stroke="#9a8aa8" stroke-width="1.6" fill="none"/><ellipse cx="238" cy="148" rx="24" ry="29" fill="#FF4D6D" stroke="#C93050" stroke-width="2"/><path d="M234 178 L242 178 L238 172 Z" fill="#C93050"/><ellipse cx="229" cy="136" rx="6" ry="10" fill="#fff" opacity=".45" transform="rotate(-20 229 136)"/>`,
  bouquet:()=>`<path d="M196 300 L216 262 M204 302 L226 268 M200 300 L204 260" stroke="#4E9F4E" stroke-width="3"/>`+flower(204,256,7,'#FF8FC6')+flower(220,262,7,'#fff')+flower(214,246,6,'#C77DFF')+flower(196,264,6,'#FFD84D','#FF9F43')+
     `<path d="M190 296 L214 296 L206 324 L196 324 Z" fill="#8EC9FF" stroke="#5DA9FF" stroke-width="1.5"/>`,
  teddy:()=>`<g stroke="#8B5A2B" stroke-width="1.5"><circle cx="212" cy="278" r="6" fill="#C68A45"/><circle cx="234" cy="278" r="6" fill="#C68A45"/><ellipse cx="223" cy="324" rx="18" ry="20" fill="#C68A45"/><circle cx="223" cy="292" r="15" fill="#C68A45"/><ellipse cx="223" cy="297" rx="6" ry="4.5" fill="#F0D2A8"/><circle cx="208" cy="318" r="6" fill="#C68A45"/></g><circle cx="217" cy="289" r="2" fill="#2a1a1a"/><circle cx="229" cy="289" r="2" fill="#2a1a1a"/><circle cx="223" cy="295" r="1.8" fill="#2a1a1a"/>`+heart(223,326,6,'#FF6FA8')
};

/* ---------- full avatar ---------- */
function render(s,o={}){
  const u=o.uid||'m';
  let out='';
  if(o.bg!==false)out+=BG[s.bg](u);
  if(o.bgOnly)return out;
  const k=SKIN[s.skin],kd=shade(k,-.2);
  const hc=HAIRC[s.hairColor],hd=shade(hc,-.32),browC=shade(hc,-.4);
  const H=HAIR[s.hair]();
  const col=i=>{const c=CLOTH[i];return [c,shade(c,c==='#FFFFFF'?-.12:-.25),c==='#2E2E3A'?'#6B6B80':shade(c,.45)];};
  out+=`<g fill="${hc}" stroke="${hd}" stroke-width="2" stroke-linejoin="round">${H.back}</g>`;
  const wearingDress=s.dress!=='none';
  if(!wearingDress&&s.top==='hoodie'){const[c,d]=col(s.topColor);out+=`<path d="M112 202 Q110 164 150 160 Q190 164 188 202 Z" fill="${d}" stroke="${shade(c,-.4)}" stroke-width="2"/>`;}
  out+=bodyParts(k,kd);
  out+=SHOES[s.shoes](...col(s.shoesColor));
  if(wearingDress)out+=DRESSES[s.dress](...col(s.dressColor));
  else{out+=BOTTOMS[s.bottom](...col(s.bottomColor));out+=TOPS[s.top](...col(s.topColor));}
  out+=hands(k,kd);
  out+=NECKLACES[s.necklace]();
  out+=head(k,kd);
  out+=face(s,kd,browC);
  out+=`<g fill="${hc}" stroke="${hd}" stroke-width="2" stroke-linejoin="round">${H.front}</g>`;
  out+=`<path d="M114 64 Q136 52 162 55" stroke="#fff" stroke-opacity=".32" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  out+=EARRINGS[s.earrings]();
  out+=GLASSES[s.glasses](CLOTH[s.glassesColor]);
  out+=HATS[s.hat](...col(s.hatColor));
  out+=HELD[s.held]();
  return out;
}

const DEF={name:'',skin:1,eyes:0,lashes:1,hair:'long',hairColor:2,shadow:0,blush:1,lips:0,sticker:'none',
  top:'tee',topColor:0,bottom:'skirt',bottomColor:6,dress:'none',dressColor:9,shoes:'sneakers',shoesColor:10,
  hat:'none',hatColor:0,glasses:'none',glassesColor:9,necklace:'none',earrings:'none',held:'none',bg:'bedroom'};

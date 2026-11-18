/* Style Studio — Story Maker artwork: wide story scenes (480 x 300) and story props. Ground line is about y 262. */
const sky=(u,a,b)=>`<defs><linearGradient id="${u}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="480" height="300" fill="url(#${u}sky)"/>`;
const pine=(x,y,s,c='#3F9E6E')=>`<path d="M${x} ${y-70*s} L${x+30*s} ${y-20*s} L${x+18*s} ${y-20*s} L${x+38*s} ${y+8*s} L${x-38*s} ${y+8*s} L${x-18*s} ${y-20*s} L${x-30*s} ${y-20*s} Z" fill="${c}"/><rect x="${x-5*s}" y="${y+8*s}" width="${10*s}" height="${16*s}" fill="#8B5A2B"/>`;
const leafy=(x,y,s,c='#6CC67A')=>`<rect x="${x-7*s}" y="${y-30*s}" width="${14*s}" height="${60*s}" rx="${5*s}" fill="#9A6A3C"/><circle cx="${x}" cy="${y-50*s}" r="${34*s}" fill="${c}"/><circle cx="${x-26*s}" cy="${y-32*s}" r="${22*s}" fill="${c}"/><circle cx="${x+26*s}" cy="${y-32*s}" r="${22*s}" fill="${c}"/>`;
const sparkleField=(n,seed,y0,y1,col='#fff')=>{const r=rng(seed);let o='';for(let i=0;i<n;i++)o+=`<circle cx="${(r()*480).toFixed(1)}" cy="${(y0+r()*(y1-y0)).toFixed(1)}" r="${(r()*1.6+.5).toFixed(1)}" fill="${col}" opacity="${(.5+r()*.5).toFixed(2)}"/>`;return o;};

const SCENES={
  bedroom:{l:'Bedroom',d:u=>{let o=`<rect width="480" height="300" fill="#FFE3F1"/>`;
    for(let y=20;y<220;y+=34)for(let x=(y/34%2)*24+14;x<480;x+=48)o+=heart(x,y,5,'#fff','opacity=".8"');
    o+=`<rect x="40" y="40" width="120" height="100" rx="10" fill="#BFE8FF" stroke="#fff" stroke-width="8"/><path d="M100 40 V140 M40 90 H160" stroke="#fff" stroke-width="6"/>`+cloud(76,70,.7)+`<circle cx="136" cy="62" r="12" fill="#FFE07A"/>`;
    o+=`<path d="M32 36 Q60 90 40 150 L20 150 L20 36 Z M168 36 Q140 90 160 150 L180 150 L180 36 Z" fill="#C77DFF" opacity=".75"/>`;
    o+=`<rect x="300" y="60" width="110" height="10" rx="4" fill="#C68A45"/><rect x="310" y="36" width="16" height="24" fill="#FF6FA8"/><rect x="330" y="30" width="14" height="30" fill="#5DA9FF"/><rect x="348" y="40" width="18" height="20" fill="#FFD84D"/><circle cx="388" cy="48" r="12" fill="#7BD88F"/>`;
    o+=`<rect y="216" width="480" height="84" fill="#E8C9A0"/>`;for(let x=0;x<480;x+=60)o+=`<path d="M${x} 216 V300" stroke="#D4B184" stroke-width="2"/>`;
    o+=`<path d="M360 160 H476 V230 H360 Z" fill="#FF8FC6"/><rect x="352" y="120" width="16" height="116" rx="6" fill="#C68A45"/><rect x="360" y="140" width="40" height="22" rx="10" fill="#fff"/><path d="M360 176 H476" stroke="#fff" stroke-width="6" opacity=".6"/>`;
    o+=`<ellipse cx="220" cy="262" rx="150" ry="22" fill="#C8A2FF" opacity=".75"/>`;return o;}},
  castle:{l:'Castle',d:u=>{let o=sky(u,'#9FD4FF','#E4D9FF')+cloud(70,50,1)+cloud(400,70,.8);
    o+=`<path d="M0 220 Q120 170 240 205 T480 196 V300 H0 Z" fill="#A6E3B0"/>`;
    o+=`<g><rect x="160" y="90" width="160" height="140" fill="#E9DDF8" stroke="#BBA6DA" stroke-width="3"/>`;
    [[140,70],[300,70]].forEach(([x,y])=>o+=`<rect x="${x}" y="${y}" width="40" height="160" fill="#F3ECFC" stroke="#BBA6DA" stroke-width="3"/><path d="M${x-6} ${y} L${x+20} ${y-46} L${x+46} ${y} Z" fill="#FF8FC6" stroke="#E06BA5" stroke-width="3"/><path d="M${x+20} ${y-46} V${y-70}" stroke="#8a7a9c" stroke-width="2"/><path d="M${x+20} ${y-70} L${x+40} ${y-63} L${x+20} ${y-56} Z" fill="#FFD84D"/><rect x="${x+12}" y="${y+40}" width="16" height="24" rx="8" fill="#8F7CFF"/>`);
    for(let x=160;x<320;x+=20)o+=`<rect x="${x}" y="80" width="12" height="12" fill="#E9DDF8" stroke="#BBA6DA" stroke-width="2"/>`;
    o+=`<path d="M218 230 V180 Q240 158 262 180 V230 Z" fill="#8B5A2B" stroke="#6A4320" stroke-width="3"/><rect x="200" y="120" width="18" height="26" rx="9" fill="#8F7CFF"/><rect x="262" y="120" width="18" height="26" rx="9" fill="#8F7CFF"/></g>`;
    o+=`<path d="M0 248 Q240 236 480 248 V300 H0 Z" fill="#7BD88F"/>`;
    [[40,270],[90,286],[400,272],[450,288],[330,284]].forEach(([x,y],i)=>o+=flower(x,y,5,['#fff','#FF8FC6','#FFD84D'][i%3]));return o;}},
  beach:{l:'Beach',d:u=>{let o=sky(u,'#7FD3FF','#D9F3FF')+`<circle cx="400" cy="60" r="34" fill="#FFE07A"/>`+cloud(120,50,.9);
    o+=`<rect y="140" width="480" height="70" fill="#3BB7E0"/><path d="M0 160 Q30 152 60 160 T120 160 T180 160 T240 160 T300 160 T360 160 T420 160 T480 160" stroke="#BFEFFF" stroke-width="3" fill="none"/><path d="M0 186 Q30 178 60 186 T120 186 T180 186 T240 186 T300 186 T360 186 T420 186 T480 186" stroke="#BFEFFF" stroke-width="3" fill="none"/>`;
    o+=`<path d="M0 206 Q240 192 480 206 V300 H0 Z" fill="#F6DCA3"/><path d="M0 206 Q240 192 480 206" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>`;
    o+=`<path d="M70 262 Q60 180 92 110" stroke="#A0703C" stroke-width="14" fill="none" stroke-linecap="round"/>`;
    [[-70,40],[-20,60],[30,40],[80,20],[-120,10]].forEach(([dx,dy])=>o+=`<path d="M92 110 Q${92+dx*.5} ${110-30+dy*.3} ${92+dx} ${110+dy}" stroke="#3FAE5A" stroke-width="12" fill="none" stroke-linecap="round"/>`);
    o+=star(400,270,8,'#FF9F43')+`<path d="M300 280 Q312 262 324 280 Z" fill="#FFB6D0"/><circle cx="200" cy="284" r="5" fill="#fff"/>`;return o;}},
  forest:{l:'Forest',d:u=>{let o=sky(u,'#CFF5DF','#EAFBE9');
    for(let i=0;i<9;i++)o+=pine(20+i*56,150,.9,'#8FD3A8');
    for(let i=0;i<6;i++)o+=leafy(40+i*86,214,1,i%2?'#4CB86A':'#5BC47A');
    o+=`<path d="M0 236 Q240 226 480 236 V300 H0 Z" fill="#8ED07F"/><path d="M200 300 Q228 260 240 236 L260 236 Q268 262 300 300 Z" fill="#E7D3A6"/>`;
    [[70,274],[420,268]].forEach(([x,y])=>o+=`<rect x="${x-3}" y="${y}" width="6" height="12" fill="#fff"/><path d="M${x-14} ${y+2} Q${x} ${y-16} ${x+14} ${y+2} Z" fill="#FF4D6D"/><circle cx="${x-5}" cy="${y-4}" r="2" fill="#fff"/><circle cx="${x+5}" cy="${y-2}" r="2" fill="#fff"/>`);
    o+=sparkleField(14,3,40,220,'#FFF7A8');return o;}},
  space:{l:'Outer Space',d:u=>{let o=sky(u,'#1B1745','#3D2C7A')+sparkleField(70,7,0,240);
    o+=`<circle cx="380" cy="80" r="42" fill="#FF8FC6"/><ellipse cx="380" cy="80" rx="70" ry="14" fill="none" stroke="#FFD84D" stroke-width="5" transform="rotate(-14 380 80)"/><circle cx="90" cy="60" r="20" fill="#9FE7FF"/>`;
    o+=star(220,40,7,'#FFD84D')+star(300,170,5,'#fff');
    o+=`<path d="M0 240 Q240 214 480 240 V300 H0 Z" fill="#8C7FB8"/>`;[[80,262,16],[210,278,10],[360,262,20],[440,284,8]].forEach(([x,y,r])=>o+=`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.4}" fill="#6E6199"/>`);return o;}},
  sea:{l:'Under the Sea',d:u=>{let o=sky(u,'#58C8F2','#1F7FC2');
    for(let i=0;i<5;i++)o+=`<path d="M${60+i*90} 0 L${100+i*90} 0 L${40+i*90} 240 L${20+i*90} 240 Z" fill="#fff" opacity=".08"/>`;
    o+=`<path d="M0 250 Q240 232 480 250 V300 H0 Z" fill="#F2D9A0"/>`;
    [[40,'#3FBF7F'],[120,'#2FA36A'],[430,'#3FBF7F'],[460,'#2FA36A']].forEach(([x,c])=>o+=`<path d="M${x} 262 Q${x-16} 220 ${x} 190 Q${x+16} 160 ${x} 130" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round"/>`);
    o+=`<path d="M330 262 L330 222 M330 236 L314 214 M330 230 L348 208 M314 214 L306 200 M348 208 L358 196" stroke="#FF7A8A" stroke-width="9" stroke-linecap="round"/>`;
    const r=rng(5);for(let i=0;i<16;i++)o+=`<circle cx="${(r()*480).toFixed(0)}" cy="${(20+r()*200).toFixed(0)}" r="${(3+r()*5).toFixed(1)}" fill="none" stroke="#fff" stroke-width="1.6" opacity=".7"/>`;
    o+=`<path d="M200 70 q12 -10 24 0 q-12 10 -24 0 Z M224 70 l8 -6 v12 Z" fill="#FFD84D"/>`+star(260,280,9,'#FF9F43');return o;}},
  snow:{l:'Snowy Hill',d:u=>{let o=sky(u,'#CDE8FF','#F4FAFF');
    o+=`<path d="M0 200 Q140 130 280 190 T480 170 V300 H0 Z" fill="#fff"/>`;
    [[60,190],[110,200],[400,180],[446,190]].forEach(([x,y])=>o+=pine(x,y,.9,'#4E9F78')+`<path d="M${x-26} ${y-30} L${x+26} ${y-30}" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`);
    o+=`<path d="M0 240 Q240 226 480 240 V300 H0 Z" fill="#EEF6FF"/>`;
    o+=`<circle cx="330" cy="236" r="24" fill="#fff" stroke="#D7E6F5" stroke-width="2"/><circle cx="330" cy="200" r="16" fill="#fff" stroke="#D7E6F5" stroke-width="2"/><path d="M330 202 l14 3 l-14 3 Z" fill="#FF9F43"/><circle cx="325" cy="196" r="2" fill="#3b2453"/><circle cx="335" cy="196" r="2" fill="#3b2453"/><path d="M314 212 H346" stroke="#FF4D6D" stroke-width="5"/>`;
    o+=sparkleField(40,9,0,260,'#fff');return o;}},
  candy:{l:'Candy Land',d:u=>{let o=sky(u,'#FFD6EC','#FFF0F8');
    o+=`<path d="M0 200 Q80 150 160 196 T320 190 T480 180 V300 H0 Z" fill="#FFB6D8"/>`;
    [[60,'#FF6FA8'],[200,'#8F7CFF'],[420,'#38C6C6']].forEach(([x,c])=>{o+=`<rect x="${x-4}" y="120" width="8" height="120" fill="#fff"/><circle cx="${x}" cy="110" r="30" fill="${c}"/><path d="M${x} 110 m-20 0 a20 20 0 1 1 20 20 a12 12 0 1 1 -12 -12" stroke="#fff" stroke-width="5" fill="none"/>`;});
    o+=`<path d="M320 240 V150 Q320 126 344 126 Q368 126 368 150" stroke="#fff" stroke-width="14" fill="none"/><path d="M320 240 V150 Q320 126 344 126 Q368 126 368 150" stroke="#FF4D6D" stroke-width="14" fill="none" stroke-dasharray="10 10"/>`;
    o+=`<path d="M0 246 Q240 232 480 246 V300 H0 Z" fill="#FF9BC9"/>`;
    [[120,276,'#FFD84D'],[260,284,'#7BD88F'],[380,272,'#C77DFF']].forEach(([x,y,c])=>o+=`<path d="M${x-14} ${y} Q${x-14} ${y-16} ${x} ${y-16} Q${x+14} ${y-16} ${x+14} ${y} Z" fill="${c}"/>`);return o;}},
  city:{l:'Big City',d:u=>{let o=sky(u,'#FFB88A','#FFE3C2')+`<circle cx="240" cy="150" r="40" fill="#FFE07A" opacity=".9"/>`;
    const b=[[0,90,'#8F7CFF'],[60,130,'#5DA9FF'],[110,70,'#FF8FC6'],[160,110,'#38C6C6'],[300,140,'#FF6FA8'],[350,80,'#8F7CFF'],[400,120,'#5DA9FF'],[440,90,'#FF9F43']];
    b.forEach(([x,h,c])=>{o+=`<rect x="${x}" y="${230-h}" width="54" height="${h}" fill="${c}"/>`;for(let y=240-h;y<220;y+=18)for(let wx=x+8;wx<x+50;wx+=16)o+=`<rect x="${wx}" y="${y}" width="8" height="10" fill="#FFF3A3" opacity=".85"/>`;});
    o+=`<rect y="230" width="480" height="70" fill="#B9B4C7"/><rect y="230" width="480" height="10" fill="#D9D5E3"/><path d="M0 272 H480" stroke="#fff" stroke-width="4" stroke-dasharray="26 20"/>`;
    o+=`<path d="M440 236 V150 Q440 136 454 136" stroke="#3b2453" stroke-width="5" fill="none"/><circle cx="458" cy="140" r="8" fill="#FFF3A3"/>`;return o;}},
  school:{l:'Classroom',d:u=>{let o=`<rect width="480" height="300" fill="#FFF4C2"/><rect x="110" y="34" width="260" height="120" rx="8" fill="#2F6F55" stroke="#C68A45" stroke-width="10"/>`;
    o+=`<text x="150" y="88" font-family="Fredoka,Arial" font-weight="700" font-size="34" fill="#fff">A B C</text><text x="270" y="130" font-family="Fredoka,Arial" font-size="24" fill="#fff">1+1=2</text>`+star(320,70,10,'#FFD84D');
    o+=`<circle cx="420" cy="70" r="26" fill="#fff" stroke="#3b2453" stroke-width="4"/><path d="M420 70 V54 M420 70 H432" stroke="#3b2453" stroke-width="3" stroke-linecap="round"/>`;
    o+=`<rect x="20" y="40" width="70" height="90" rx="6" fill="#BFE8FF" stroke="#fff" stroke-width="6"/>`+cloud(54,74,.5);
    o+=`<rect y="222" width="480" height="78" fill="#C9E7B8"/>`;for(let x=0;x<480;x+=40)o+=`<path d="M${x} 222 V300" stroke="#B3D8A0" stroke-width="2"/>`;
    o+=`<rect x="20" y="200" width="90" height="12" rx="3" fill="#C68A45"/><rect x="28" y="212" width="8" height="40" fill="#A0703C"/><rect x="94" y="212" width="8" height="40" fill="#A0703C"/><path d="M40 200 l10 -14 h20 l-6 14 Z" fill="#FF6FA8"/>`;
    o+=`<path d="M400 160 H470 V200 H400 Z" fill="#C68A45"/><rect x="408" y="140" width="10" height="20" fill="#FF4D6D"/><rect x="422" y="134" width="10" height="26" fill="#5DA9FF"/><rect x="436" y="144" width="12" height="16" fill="#FFD84D"/>`;return o;}},
  cave:{l:'Crystal Cave',d:u=>{let o=sky(u,'#3E2F5B','#5B4782');
    o+=`<path d="M0 0 H480 V40 Q440 70 420 40 Q400 90 370 40 Q340 60 320 30 Q290 80 260 30 Q230 70 200 34 Q170 76 140 36 Q110 66 80 30 Q50 70 30 36 Q14 60 0 40 Z" fill="#2A1F40"/>`;
    o+=`<ellipse cx="240" cy="170" rx="160" ry="100" fill="#8F7CFF" opacity=".25"/>`;
    [[60,250,'#9FE7FF'],[110,256,'#C77DFF'],[380,250,'#FF8FC6'],[430,256,'#9FE7FF']].forEach(([x,y,c])=>o+=`<path d="M${x} ${y} L${x-12} ${y-30} L${x} ${y-70} L${x+12} ${y-30} Z" fill="${c}" stroke="#fff" stroke-width="2" opacity=".95"/><path d="M${x+16} ${y} L${x+8} ${y-20} L${x+16} ${y-46} L${x+24} ${y-20} Z" fill="${c}" opacity=".8"/>`);
    o+=`<path d="M0 248 Q240 232 480 248 V300 H0 Z" fill="#4A3A6A"/>`+sparkleField(30,21,40,240,'#E4D9FF');return o;}},
  park:{l:'Rainbow Park',d:u=>{let o=sky(u,'#9FD4FF','#E8F7FF');
    ['#FF4D6D','#FF9F43','#FFD84D','#7BD88F','#5DA9FF','#8F7CFF'].forEach((c,i)=>o+=`<path d="M${60+i*12} 220 A${180-i*12} ${170-i*12} 0 0 1 ${420-i*12} 220" stroke="${c}" stroke-width="12" fill="none" opacity=".85"/>`);
    o+=cloud(70,214,1.2)+cloud(410,214,1.2);
    o+=`<path d="M0 222 Q240 200 480 222 V300 H0 Z" fill="#8ED07F"/><ellipse cx="380" cy="262" rx="60" ry="14" fill="#7FD3FF"/>`+leafy(60,234,1,'#5BC47A');
    [[150,270],[190,284],[250,276],[300,288],[460,280]].forEach(([x,y],i)=>o+=flower(x,y,5,['#fff','#FF8FC6','#FFD84D','#C77DFF'][i%4]));return o;}},
  stage:{l:'Big Stage',d:u=>{let o=`<rect width="480" height="300" fill="#2E2240"/>`;
    o+=`<path d="M120 0 L60 230 L180 230 Z M360 0 L300 230 L420 230 Z" fill="#FFF3A3" opacity=".12"/>`;
    o+=`<path d="M0 0 H70 Q60 120 90 240 H0 Z M480 0 H410 Q420 120 390 240 H480 Z" fill="#C2185B"/><path d="M0 0 H480 V30 Q400 50 320 30 Q240 50 160 30 Q80 50 0 30 Z" fill="#E0457A"/>`;
    o+=`<rect y="230" width="480" height="70" fill="#A0703C"/>`;for(let y=240;y<300;y+=14)o+=`<path d="M0 ${y} H480" stroke="#8B5A2B" stroke-width="2"/>`;
    o+=sparkleField(16,31,40,200,'#FFD84D');return o;}}
};

/* Props: drawn around (0,0), roughly 90 wide, standing on y = 40 */
const PROPS={
  map:{l:'Treasure Map',d:()=>`<path d="M-40 -26 L40 -30 L36 30 L-36 34 Z" fill="#F6E3B4" stroke="#C9A43A" stroke-width="2.5"/><path d="M-26 20 Q-6 -10 14 6 T24 -14" stroke="#B5402F" stroke-width="2.5" fill="none" stroke-dasharray="5 4"/><path d="M18 -20 l10 10 M28 -20 l-10 10" stroke="#D7263D" stroke-width="3.5" stroke-linecap="round"/>`+pine(-22,-4,.18,'#4E9F78')},
  chest:{l:'Treasure Chest',d:()=>`<rect x="-38" y="-6" width="76" height="46" rx="4" fill="#A0703C" stroke="#6A4320" stroke-width="3"/><path d="M-38 -6 Q0 -40 38 -6 Z" fill="#B88350" stroke="#6A4320" stroke-width="3"/><rect x="-38" y="6" width="76" height="8" fill="#E9C75A"/><rect x="-8" y="0" width="16" height="20" rx="3" fill="#E9C75A" stroke="#C9A43A" stroke-width="2"/>`+star(-20,-22,6,'#FFD84D')+star(18,-26,5,'#FFF3A3')},
  dragon:{l:'Friendly Dragon',d:()=>`<path d="M30 20 Q60 10 56 -14 Q66 0 62 22 Q50 40 24 36 Z" fill="#5FCB8C" stroke="#2F8A5A" stroke-width="2.5"/><ellipse cx="0" cy="18" rx="34" ry="24" fill="#7BD88F" stroke="#2F8A5A" stroke-width="2.5"/><ellipse cx="0" cy="24" rx="20" ry="14" fill="#E4F7C8"/>`+
    `<path d="M-10 -2 Q-40 -30 -6 -40 Q4 -12 -10 -2 Z" fill="#C77DFF" stroke="#8F5BC9" stroke-width="2"/><path d="M10 -2 Q40 -30 6 -40 Q-4 -12 10 -2 Z" fill="#C77DFF" stroke="#8F5BC9" stroke-width="2"/><circle cx="-24" cy="-12" r="20" fill="#7BD88F" stroke="#2F8A5A" stroke-width="2.5"/><path d="M-34 -30 l-4 -12 l10 8 Z M-18 -32 l0 -12 l8 10 Z" fill="#FFD84D"/><circle cx="-30" cy="-14" r="3.5" fill="#3b2453"/><circle cx="-18" cy="-14" r="3.5" fill="#3b2453"/><path d="M-32 -4 Q-24 2 -16 -4" stroke="#3b2453" stroke-width="2" fill="none"/><path d="M-14 36 v6 M12 36 v6" stroke="#2F8A5A" stroke-width="6" stroke-linecap="round"/>`},
  cake:{l:'Birthday Cake',d:()=>`<ellipse cx="0" cy="38" rx="44" ry="6" fill="#fff" stroke="#E2D6E8" stroke-width="2"/><rect x="-34" y="2" width="68" height="34" rx="5" fill="#FF9EBB" stroke="#E06B8F" stroke-width="2"/><path d="M-34 8 Q-26 18 -18 8 Q-10 18 -2 8 Q6 18 14 8 Q22 18 30 8 L34 8 L34 2 L-34 2 Z" fill="#fff"/>`+
    [-14,0,14].map((x,i)=>`<rect x="${x-3}" y="-18" width="6" height="20" rx="2" fill="${['#9FE7FF','#FFD84D','#C77DFF'][i]}"/><path d="M${x} -30 Q${x+5} -24 ${x} -20 Q${x-5} -24 ${x} -30 Z" fill="#FFB020"/>`).join('')},
  gift:{l:'Present',d:()=>`<rect x="-30" y="-6" width="60" height="46" rx="4" fill="#5DA9FF" stroke="#3D63C9" stroke-width="2.5"/><rect x="-34" y="-16" width="68" height="14" rx="3" fill="#8FC3FF" stroke="#3D63C9" stroke-width="2.5"/><rect x="-6" y="-16" width="12" height="56" fill="#FF6FA8"/><path d="M0 -16 Q-24 -40 -26 -22 Q-20 -14 0 -16 Q20 -14 26 -22 Q24 -40 0 -16 Z" fill="#FF6FA8" stroke="#C94F80" stroke-width="2"/>`},
  rainbow:{l:'Rainbow',d:()=>['#FF4D6D','#FF9F43','#FFD84D','#7BD88F','#5DA9FF','#8F7CFF'].map((c,i)=>`<path d="M${-44+i*6} 30 A${44-i*6} ${44-i*6} 0 0 1 ${44-i*6} 30" stroke="${c}" stroke-width="6.5" fill="none"/>`).join('')+cloud(-40,32,.6)+cloud(40,32,.6)},
  star:{l:'Wishing Star',d:()=>star(0,0,34,'#FFD84D','stroke="#E0B030" stroke-width="3" stroke-linejoin="round"')+`<circle cx="-9" cy="-2" r="3" fill="#3b2453"/><circle cx="9" cy="-2" r="3" fill="#3b2453"/><path d="M-7 8 Q0 14 7 8" stroke="#3b2453" stroke-width="2.4" fill="none" stroke-linecap="round"/>`+star(40,-26,6,'#fff')+star(-38,-30,5,'#fff')},
  potion:{l:'Magic Potion',d:()=>`<path d="M-8 -36 H8 V-16 Q30 -4 30 16 Q30 40 0 40 Q-30 40 -30 16 Q-30 -4 -8 -16 Z" fill="#E4D9FF" stroke="#8F7CFF" stroke-width="2.5" opacity=".9"/><path d="M-28 12 Q0 4 28 12 Q30 38 0 38 Q-30 38 -28 12 Z" fill="#C77DFF"/><rect x="-11" y="-44" width="22" height="10" rx="3" fill="#C68A45"/><circle cx="-10" cy="22" r="4" fill="#fff" opacity=".6"/><circle cx="6" cy="16" r="2.5" fill="#fff" opacity=".6"/>`+star(26,-30,6,'#FFD84D')},
  crown:{l:'Golden Crown',d:()=>`<path d="M-36 30 L-40 -16 L-18 6 L0 -26 L18 6 L40 -16 L36 30 Z" fill="#FFD84D" stroke="#C9A43A" stroke-width="3" stroke-linejoin="round"/><rect x="-37" y="22" width="74" height="12" rx="4" fill="#F5C232" stroke="#C9A43A" stroke-width="2"/><circle cx="0" cy="12" r="6" fill="#FF4D6D"/><circle cx="-20" cy="16" r="4" fill="#5DA9FF"/><circle cx="20" cy="16" r="4" fill="#7BD88F"/>`},
  flowers:{l:'Flower Patch',d:()=>[[-26,0,'#FF8FC6'],[0,-14,'#FFD84D'],[24,-2,'#C77DFF'],[-10,14,'#fff'],[14,16,'#FF6FA8']].map(([x,y,c])=>`<path d="M${x} ${y} V40" stroke="#4E9F4E" stroke-width="3"/>`+flower(x,y,8,c)).join('')},
  rocket:{l:'Rocket Ship',d:()=>`<path d="M-8 30 Q0 64 8 30 Z" fill="#FF9F43"/><path d="M-16 10 L-32 34 L-16 30 Z M16 10 L32 34 L16 30 Z" fill="#FF4D6D" stroke="#C93050" stroke-width="2"/><path d="M-16 32 V-10 Q0 -48 16 -10 V32 Z" fill="#fff" stroke="#9AA3B5" stroke-width="2.5"/><circle cx="0" cy="-4" r="9" fill="#5DA9FF" stroke="#3D63C9" stroke-width="2.5"/><path d="M-16 -16 Q0 -48 16 -16 Q0 -22 -16 -16 Z" fill="#FF4D6D"/>`},
  ghost:{l:'Silly Ghost',d:()=>`<path d="M-28 36 V-6 Q-28 -40 0 -40 Q28 -40 28 -6 V36 L18 28 L8 36 L-2 28 L-12 36 L-20 28 Z" fill="#fff" stroke="#C9CBDA" stroke-width="2.5"/><ellipse cx="-10" cy="-10" rx="4" ry="6" fill="#3b2453"/><ellipse cx="10" cy="-10" rx="4" ry="6" fill="#3b2453"/><path d="M-6 6 Q0 14 6 6" stroke="#3b2453" stroke-width="2.4" fill="none"/><ellipse cx="-18" cy="2" rx="5" ry="3" fill="#FFB6D0"/><ellipse cx="18" cy="2" rx="5" ry="3" fill="#FFB6D0"/>`},
  key:{l:'Magic Key',d:()=>`<circle cx="-18" cy="0" r="16" fill="none" stroke="#E9C75A" stroke-width="8"/><path d="M-2 0 H38 M24 0 V14 M34 0 V10" stroke="#E9C75A" stroke-width="8" stroke-linecap="round"/>`+heart(-18,0,6,'#FF4D6D')+star(30,-22,6,'#fff')},
  egg:{l:'Mystery Egg',d:()=>`<ellipse cx="0" cy="6" rx="28" ry="36" fill="#FFF7E0" stroke="#E9C75A" stroke-width="2.5"/><circle cx="-10" cy="-8" r="6" fill="#9FE7FF"/><circle cx="12" cy="10" r="7" fill="#FFB6D0"/><circle cx="-6" cy="22" r="5" fill="#C9A3FF"/><path d="M-20 -12 l8 6 l6 -8 l6 8" stroke="#C9A43A" stroke-width="2" fill="none"/>`+star(30,-30,6,'#FFD84D')},
  balloons:{l:'Balloons',d:()=>[[-18,-20,'#FF4D6D'],[6,-34,'#5DA9FF'],[22,-10,'#FFD84D']].map(([x,y,c])=>`<path d="M${x} ${y+18} Q${x/2} 20 0 40" stroke="#9a8aa8" stroke-width="1.5" fill="none"/><ellipse cx="${x}" cy="${y}" rx="14" ry="17" fill="${c}"/><ellipse cx="${x-5}" cy="${y-6}" rx="3" ry="5" fill="#fff" opacity=".5"/>`).join('')},
  magic:{l:'Magic Sparkles',d:()=>star(0,0,22,'#FFD84D')+star(-30,-20,10,'#FF8FC6')+star(28,-24,12,'#9FE7FF')+star(-26,24,8,'#C77DFF')+star(30,22,9,'#fff')+`<circle cx="0" cy="0" r="40" fill="none" stroke="#FFF3A3" stroke-width="2" stroke-dasharray="3 8"/>`},
  tree:{l:'Big Tree',d:()=>`<g transform="translate(0 -20) scale(1.3)">${leafy(0,40,.8)}</g>`},
  door:{l:'Magic Door',d:()=>`<path d="M-26 40 V-14 Q-26 -42 0 -42 Q26 -42 26 -14 V40 Z" fill="#8F7CFF" stroke="#5B47B8" stroke-width="3"/><path d="M-18 40 V-10 Q-18 -32 0 -32 Q18 -32 18 -10 V40" stroke="#C9A3FF" stroke-width="2" fill="none"/><circle cx="12" cy="10" r="4" fill="#FFD84D"/>`+star(0,-18,7,'#FFD84D')}
};

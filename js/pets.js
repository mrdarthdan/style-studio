/* Style Studio — Pet Studio. Pets are drawn in a 300 x 300 box, sitting with their feet at y≈290. */
const FUR=['#FFFFFF','#F6E7C8','#E8B860','#B97A44','#6E4A30','#A9A9B3','#3A3440','#F2994A','#FFB6D0','#C9B3F5','#9EE6C4','#9CCBF7'];
const PET_SPECIES={puppy:'Puppy',kitty:'Kitty',bunny:'Bunny',unicorn:'Unicorn',dragon:'Dragon',hamster:'Hamster'};
const PET_PATTERNS={none:'Plain',spots:'Spots',stripes:'Stripes',patch:'Eye Patch',hearts:'Hearts',sparkles:'Sparkles'};
const PET_EYES={round:'Round',sparkle:'Sparkly',sleepy:'Sleepy',wink:'Wink'};
const PET_NECK={none:'None',collar:'Collar',bandana:'Bandana',bowtie:'Bow Tie',bell:'Bell',scarf:'Scarf'};
const PET_HEAD={none:'None',bow:'Bow',crown:'Crown',flowers:'Flowers',partyhat:'Party Hat',glasses:'Heart Glasses'};

function renderPet(s,uid,o={}){
  const f=FUR[s.fur]??FUR[2],fd=shade(f,f==='#FFFFFF'?-.18:-.28),fl=shade(f,.55),a=CLOTH[s.accent]??CLOTH[9],ad=shade(a,-.25);
  const ac=CLOTH[s.accColor]??CLOTH[0],acd=shade(ac,-.25),ec=EYEC[s.eyes]??EYEC[0],sp=s.species;
  const line=`stroke="${fd}" stroke-width="2.5" stroke-linejoin="round"`;
  let o_='';
  if(!o.noBg)o_+=`<g transform="translate(0 -170)">${BG[s.bg||'park'](uid)}</g>`;
  o_+=`<ellipse cx="150" cy="290" rx="78" ry="9" fill="#000" opacity=".12"/>`;
  /* behind the body: tails, wings, bunny ears */
  if(sp==='puppy')o_+=`<path d="M196 248 Q232 236 236 196" stroke="${fd}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M196 248 Q232 236 236 196" stroke="${f}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
  if(sp==='kitty')o_+=`<path d="M198 262 Q252 256 246 206 Q244 186 230 190" stroke="${fd}" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M198 262 Q252 256 246 206 Q244 186 230 190" stroke="${f}" stroke-width="11" fill="none" stroke-linecap="round"/>`;
  if(sp==='bunny')o_+=`<circle cx="208" cy="262" r="17" fill="#fff" stroke="#e2d6e8" stroke-width="2"/>`+
    both(`<ellipse cx="124" cy="40" rx="17" ry="50" transform="rotate(-12 124 40)" fill="${f}" ${line}/><ellipse cx="124" cy="44" rx="8" ry="36" transform="rotate(-12 124 44)" fill="#FFB6D0"/>`);
  if(sp==='unicorn')o_+=`<path d="M200 250 Q250 250 244 200 Q262 230 252 262 Q236 280 204 268 Z" fill="${a}" stroke="${ad}" stroke-width="2"/>`;
  if(sp==='dragon')o_+=both(`<path d="M104 206 Q48 170 46 120 Q66 140 78 134 Q78 156 94 158 Q92 176 108 182 Z" fill="${a}" stroke="${ad}" stroke-width="2.5" stroke-linejoin="round"/>`)+
    `<path d="M196 256 Q244 260 252 226" stroke="${fd}" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M196 256 Q244 260 252 226" stroke="${f}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M252 210 L264 232 L240 230 Z" fill="${a}" stroke="${ad}" stroke-width="2"/>`;
  /* body + feet + head */
  o_+=`<ellipse cx="150" cy="226" rx="60" ry="56" fill="${f}" ${line}/><ellipse cx="150" cy="238" rx="34" ry="36" fill="${fl}"/>`;
  if(sp==='dragon')o_+=`<path d="M128 214 H172 M124 232 H176 M128 250 H172" stroke="${shade(fl,-.12)}" stroke-width="3"/>`;
  o_+=both(`<ellipse cx="120" cy="280" rx="22" ry="12" fill="${f}" ${line}/><path d="M112 284 v-6 M120 286 v-7 M128 284 v-6" stroke="${fd}" stroke-width="1.8"/>`);
  if(sp==='hamster')o_+=both(`<circle cx="104" cy="80" r="17" fill="${f}" ${line}/><circle cx="104" cy="80" r="9" fill="#FFB6D0"/>`);
  o_+=`<circle cx="150" cy="130" r="64" fill="${f}" ${line}/>`;
  /* pattern, clipped to head + body */
  if(s.pattern&&s.pattern!=='none'){
    let pat='';
    if(s.pattern==='spots')[[112,98,9],[184,108,7],[196,150,5],[108,212,11],[188,226,9],[150,262,7],[170,200,6],[128,78,6]].forEach(([x,y,r])=>pat+=`<circle cx="${x}" cy="${y}" r="${r}" fill="${fd}"/>`);
    if(s.pattern==='stripes')[[80,-14],[96,-8],[200,12],[214,18]].forEach(([x,r])=>pat+=`<path d="M${x} 80 q8 20 0 40" stroke="${fd}" stroke-width="7" fill="none" transform="rotate(${r} ${x} 100)"/>`),pat+=`<path d="M140 68 l-4 14 M150 66 v16 M160 68 l4 14" stroke="${fd}" stroke-width="6" stroke-linecap="round"/><path d="M94 210 q14 6 22 0 M184 210 q14 6 22 0 M92 236 q14 6 22 0 M186 236 q14 6 22 0" stroke="${fd}" stroke-width="6" fill="none"/>`;
    if(s.pattern==='patch')pat+=`<ellipse cx="176" cy="122" rx="30" ry="26" fill="${fd}"/><ellipse cx="114" cy="226" rx="24" ry="20" fill="${fd}"/>`;
    if(s.pattern==='hearts')[[108,96],[192,104],[110,214],[192,232],[150,276]].forEach(([x,y])=>pat+=heart(x,y,7,a));
    if(s.pattern==='sparkles')[[106,92,6],[194,98,5],[100,176,4],[202,170,5],[104,226,5],[196,248,6],[166,82,4]].forEach(([x,y,r])=>pat+=star(x,y,r,'#fff','opacity=".9"'));
    o_+=`<defs><clipPath id="${uid}pc"><circle cx="150" cy="130" r="63"/><ellipse cx="150" cy="226" rx="59" ry="55"/></clipPath></defs><g clip-path="url(#${uid}pc)">${pat}</g>`;
  }
  /* ears and species details on top of the head */
  if(sp==='puppy')o_+=both(`<ellipse cx="92" cy="132" rx="20" ry="42" transform="rotate(14 92 132)" fill="${fd}" stroke="${shade(fd,-.2)}" stroke-width="2"/>`);
  if(sp==='kitty')o_+=both(`<path d="M98 96 L92 44 L138 72 Z" fill="${f}" ${line}/><path d="M103 86 L100 58 L126 74 Z" fill="#FFB6D0"/>`);
  if(sp==='unicorn'){
    o_+=both(`<path d="M104 86 L106 56 L128 76 Z" fill="${f}" ${line}/>`)+`<path d="M140 74 L150 20 L160 74 Z" fill="#FFE07A" stroke="#E0B84A" stroke-width="2" stroke-linejoin="round"/><path d="M143 62 L157 56 M145 48 L155 42 M147 34 L153 30" stroke="#E0B84A" stroke-width="2"/>`;
    o_+=`<g fill="${a}" stroke="${ad}" stroke-width="2">`+[[116,74,14],[100,92,13],[90,114,12],[86,138,11],[92,160,10],[134,68,12]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')+`</g>`;
  }
  if(sp==='dragon')o_+=both(`<path d="M114 80 Q104 48 120 40 Q116 60 130 74 Z" fill="${a}" stroke="${ad}" stroke-width="2"/>`)+`<path d="M138 68 l6 -12 l6 12 M154 68 l6 -12 l6 12" fill="${a}" stroke="${ad}" stroke-width="2"/>`;
  /* face */
  const eye=(x,flip)=>{
    const st=s.eyeStyle==='wink'&&flip?'sleepy':s.eyeStyle;
    if(st==='sleepy')return `<path d="M${x-12} 130 Q${x} 140 ${x+12} 130" stroke="#2a1a1a" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M${x-12} 130 l-5 -3" stroke="#2a1a1a" stroke-width="2.5" stroke-linecap="round"/>`;
    const big=st==='sparkle';
    return `<ellipse cx="${x}" cy="128" rx="${big?15:13}" ry="${big?17:15}" fill="#fff" stroke="#2a1a1a" stroke-width="2"/><circle cx="${x}" cy="${big?131:130}" r="${big?11.5:9.5}" fill="${ec}"/><circle cx="${x}" cy="${big?131:130}" r="${big?6:5}" fill="#1a1010"/>`+
      (big?star(x+4,125,5,'#fff')+`<circle cx="${x-5}" cy="137" r="2" fill="#fff"/>`:`<circle cx="${x+3.5}" cy="125" r="3.3" fill="#fff"/><circle cx="${x-4}" cy="135" r="1.5" fill="#fff"/>`);
  };
  o_+=eye(124,false)+eye(176,true);
  o_+=both(`<ellipse cx="104" cy="156" rx="11" ry="7" fill="#FF9AAE" opacity=".55"/>`);
  if(sp==='puppy')o_+=`<ellipse cx="150" cy="160" rx="27" ry="19" fill="${fl}"/><ellipse cx="150" cy="150" rx="10" ry="7" fill="#3a2a2a"/><path d="M140 164 Q150 172 160 164" stroke="#3a2a2a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M146 167 Q150 180 156 167" fill="#FF8FA3"/>`;
  if(sp==='kitty'||sp==='hamster')o_+=(sp==='hamster'?both(`<ellipse cx="114" cy="158" rx="22" ry="16" fill="${fl}"/>`):'')+`<path d="M144 150 L156 150 L150 157 Z" fill="#FF8FA3"/><path d="M150 157 Q144 164 138 160 M150 157 Q156 164 162 160" stroke="#3a2a2a" stroke-width="2.2" fill="none" stroke-linecap="round"/>`+
    both(`<path d="M126 156 L94 150 M126 162 L96 166" stroke="${fd}" stroke-width="1.8" stroke-linecap="round"/>`);
  if(sp==='bunny')o_+=`<path d="M150 154 m-6 -4 q6 -4 12 0 q-6 8 -12 0 Z" fill="#FF8FA3"/><path d="M150 156 V162 M150 162 Q144 168 139 164 M150 162 Q156 168 161 164" stroke="#3a2a2a" stroke-width="2.2" fill="none" stroke-linecap="round"/><rect x="144.5" y="165" width="5" height="7" rx="1.5" fill="#fff" stroke="#ccc"/><rect x="150.5" y="165" width="5" height="7" rx="1.5" fill="#fff" stroke="#ccc"/>`;
  if(sp==='unicorn'||sp==='dragon')o_+=`<ellipse cx="150" cy="162" rx="30" ry="20" fill="${fl}"/><ellipse cx="141" cy="158" rx="3.5" ry="2.5" fill="${fd}"/><ellipse cx="159" cy="158" rx="3.5" ry="2.5" fill="${fd}"/><path d="M140 170 Q150 176 160 170" stroke="#3a2a2a" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  /* accessories */
  const nk=s.neck;
  if(nk==='collar'||nk==='bell')o_+=`<path d="M100 186 Q150 212 200 186 L200 197 Q150 223 100 197 Z" fill="${ac}" stroke="${acd}" stroke-width="2"/>`+(nk==='bell'?`<circle cx="150" cy="218" r="10" fill="#FFD84D" stroke="#C9A43A" stroke-width="2"/><path d="M142 218 H158" stroke="#C9A43A" stroke-width="2"/><circle cx="150" cy="223" r="2" fill="#8a6a1a"/>`:heart(150,218,7,'#FFD84D','stroke="#C9A43A" stroke-width="1.5"'));
  if(nk==='bandana')o_+=`<path d="M100 188 Q150 206 200 188 L150 240 Z" fill="${ac}" stroke="${acd}" stroke-width="2" stroke-linejoin="round"/><circle cx="140" cy="204" r="3" fill="#fff"/><circle cx="160" cy="206" r="3" fill="#fff"/><circle cx="150" cy="222" r="3" fill="#fff"/>`;
  if(nk==='bowtie')o_+=`<path d="M150 200 L124 186 L124 214 Z M150 200 L176 186 L176 214 Z" fill="${ac}" stroke="${acd}" stroke-width="2" stroke-linejoin="round"/><circle cx="150" cy="200" r="7" fill="${acd}"/>`;
  if(nk==='scarf')o_+=`<path d="M98 186 Q150 214 202 186 L202 202 Q150 230 98 202 Z" fill="${ac}" stroke="${acd}" stroke-width="2"/><path d="M168 204 L176 252 L192 250 L184 200 Z" fill="${ac}" stroke="${acd}" stroke-width="2"/><path d="M110 196 v8 M124 202 v8 M138 206 v8 M176 206 v8 M190 198 v8" stroke="${shade(ac,.4)}" stroke-width="3"/>`;
  const hd=s.head;
  if(hd==='bow')o_+=`<g transform="translate(192 78) rotate(18) scale(1.15)"><path d="M0 0 L-24 -15 Q-31 0 -24 15 Z" fill="${ac}" stroke="${acd}" stroke-width="1.8"/><path d="M0 0 L24 -15 Q31 0 24 15 Z" fill="${ac}" stroke="${acd}" stroke-width="1.8"/><circle r="6" fill="${acd}"/></g>`;
  if(hd==='crown')o_+=`<path d="M118 74 L124 42 L138 60 L150 34 L162 60 L176 42 L182 74 Q150 66 118 74 Z" fill="#FFD84D" stroke="#D9A82A" stroke-width="2" stroke-linejoin="round"/><circle cx="150" cy="58" r="5" fill="${ac}"/><circle cx="130" cy="64" r="3" fill="${ac}"/><circle cx="170" cy="64" r="3" fill="${ac}"/>`;
  if(hd==='flowers')for(let i=0;i<6;i++){const x=104+i*18.4,y=128-64*Math.sqrt(Math.max(0,1-Math.pow((x-150)/66,2)))+4;o_+=flower(x,y,6.5,[ac,'#fff',shade(ac,.45)][i%3],'#FFD84D');}
  if(hd==='partyhat')o_+=`<g transform="rotate(18 176 70)"><path d="M156 76 L176 14 L196 76 Z" fill="${ac}" stroke="${acd}" stroke-width="2" stroke-linejoin="round"/><circle cx="168" cy="58" r="3.5" fill="#fff"/><circle cx="180" cy="44" r="3.5" fill="#FFD84D"/><circle cx="184" cy="64" r="3.5" fill="#fff"/><circle cx="176" cy="12" r="8" fill="#FFD84D"/><rect x="152" y="72" width="48" height="7" rx="3.5" fill="#fff"/></g>`;
  if(hd==='glasses')o_+=both(heart(124,132,17,ac,`opacity=".85" stroke="${acd}" stroke-width="2.5"`))+`<path d="M141 126 Q150 121 159 126" stroke="${acd}" stroke-width="3" fill="none"/>`;
  return o_;
}

const Pets=makeStudio({
  prefix:'p',hash:'pet-studio',el:'mod-pets',emoji:'🐾',title:'Pet Studio',blurb:'Design your very own pet, then bring it home to your room!',
  viewBox:'0 0 300 300',label:'Your pet',nameLabel:'Pet name',namePh:'Name your pet',kind:'pet',closetLabel:'Pets',storeKey:'ss_pet',
  defaults:{name:'',species:'puppy',fur:2,pattern:'none',accent:9,eyes:0,eyeStyle:'round',neck:'collar',head:'none',accColor:0,bg:'park'},
  render:(s,uid,o={})=>renderPet(s,uid,{noBg:o.thumb&&!o.preview&&!(o.sec&&o.sec.key==='bg')}),
  plate:n=>'🐾 '+n+' 🐾',
  showTitle:s=>s.name?`🐾 ${s.name} 🐾`:'🐾 The Cutest Pet Ever! 🐾',
  tabs:[
    {id:'kind',icon:'🐶',label:'Pet',secs:[{t:'Pick a pet',type:'it',key:'species',crop:'40 0 220 300',items:Object.entries(PET_SPECIES).map(([v,l])=>({v,l}))}]},
    {id:'fur',icon:'🎨',label:'Fur',secs:[
      {t:'Fur color',type:'sw',key:'fur',colors:FUR},
      {t:'Pattern',type:'it',key:'pattern',crop:'70 50 160 240',items:Object.entries(PET_PATTERNS).map(([v,l])=>({v,l}))},
      {t:'Mane, wings & hearts color',type:'sw',key:'accent',colors:CLOTH}]},
    {id:'face',icon:'👀',label:'Eyes',secs:[
      {t:'Eye color',type:'sw',key:'eyes',colors:EYEC},
      {t:'Eyes',type:'it',key:'eyeStyle',crop:'96 100 108 60',items:Object.entries(PET_EYES).map(([v,l])=>({v,l}))}]},
    {id:'extras',icon:'🎀',label:'Extras',secs:[
      {t:'Around the neck',type:'it',key:'neck',crop:'80 160 140 100',items:Object.entries(PET_NECK).map(([v,l])=>({v,l}))},
      {t:'On the head',type:'it',key:'head',crop:'60 0 180 180',items:Object.entries(PET_HEAD).map(([v,l])=>({v,l}))},
      {t:'Accessory color',type:'sw',key:'accColor',colors:CLOTH}]},
    {id:'place',icon:'🏞️',label:'Places',secs:[{t:'Where is your pet?',type:'it',key:'bg',cls:'wide',crop:'0 0 300 300',
      items:[['park','Park'],['beach','Beach'],['bedroom','Bedroom'],['castle','Castle'],['snow','Snow Day'],['space','Space'],['candy','Candy Land'],['stage','Stage']].map(([v,l])=>({v,l}))}]}
  ],
  surprise:s=>Object.assign(s,{species:pick(keysOf(PET_SPECIES)),fur:rint(FUR.length),pattern:pick(keysOf(PET_PATTERNS)),accent:rint(CLOTH.length),eyes:rint(EYEC.length),
    eyeStyle:pick(['round','round','sparkle','sparkle','sleepy','wink']),neck:pick(keysOf(PET_NECK)),head:pick(keysOf(PET_HEAD)),accColor:rint(CLOTH.length),bg:pick(['park','beach','bedroom','castle','snow','space','candy','stage'])}),
  onPick:(s,key,val)=>{
    if(key==='accColor'){s.accColor=val;if(s.neck==='none'&&s.head==='none')s.neck='collar';return true;}
    return false;
  }
});
/* Pets can move into the Room Designer */
ITEM_KINDS.pet={field:'pet',scale:.36,label:it=>it.pet.name||'My pet',
  draw:(it,uid)=>`<g transform="translate(-150 -292)">${renderPet(it.pet,uid,{noBg:true})}</g>`};

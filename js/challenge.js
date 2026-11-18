/* Style Studio — Style Challenge. Pick a theme, dress up for it in Dress Up (a checklist shows what's done), earn up to 3 stars. */
const Challenge=(()=>{
  const FAM={pink:[0],red:[1],orange:[2],yellow:[3],green:[4],blue:[5,6,7],purple:[8,9],white:[10],black:[11]};
  const outfit=s=>s.dress!=='none'?[s.dressColor]:[s.topColor,s.bottomColor];
  const wears=(s,f)=>outfit(s).some(c=>FAM[f].includes(c));
  const C=[
    {id:'beach',e:'🏖️',t:'Beach Day',p:'Get ready for a sunny day at the beach!',checks:[
      ['At the beach','Places tab',s=>s.bg==='beach'],
      ['Something cool to wear','Shorts, a tank top or a sundress',s=>s.dress==='sundress'||(s.dress==='none'&&(s.bottom==='shorts'||s.top==='tank'))],
      ['Beach shoes','Sandals, flats or bare feet',s=>['sandals','flats','none'].includes(s.shoes)],
      ['Sun protection','A sun hat or glasses',s=>s.hat==='sunhat'||s.glasses!=='none']]},
    {id:'royal',e:'👑',t:'Royal Ball',p:'You are invited to the royal ball at the castle!',checks:[
      ['At the castle','Places tab',s=>s.bg==='castle'],
      ['Royal clothes','A princess gown or a suit',s=>s.dress==='gown'||(s.dress==='none'&&s.top==='suit')],
      ['A tiara or crown','Extras tab',s=>['tiara','crown'].includes(s.hat)],
      ['Something fancy','A necklace, earrings, tie or bow tie',s=>s.necklace!=='none'||s.earrings!=='none']]},
    {id:'snow',e:'❄️',t:'Snow Day',p:'It snowed! Bundle up to build a snowman.',checks:[
      ['Out in the snow','Places tab',s=>s.bg==='snow'],
      ['Something warm','A sweater, hoodie or jacket',s=>s.dress==='none'&&['sweater','hoodie','jacket'].includes(s.top)],
      ['Snow boots','Boots or rain boots',s=>['boots','rainboots'].includes(s.shoes)],
      ['A cozy hat','A beanie',s=>s.hat==='beanie']]},
    {id:'space',e:'🚀',t:'Space Explorer',p:'Blast off and explore the stars!',checks:[
      ['In outer space','Places tab',s=>s.bg==='space'],
      ['Galaxy colors','Wear blue or purple',s=>wears(s,'blue')||wears(s,'purple')],
      ['Something starry','Star glasses, earrings, necklace or face stars',s=>s.glasses==='star'||s.earrings==='stars'||s.necklace==='star'||s.sticker==='stars'],
      ['Sturdy shoes','Sneakers or boots',s=>['sneakers','boots'].includes(s.shoes)]]},
    {id:'ballet',e:'🩰',t:'Ballet Recital',p:'Tonight is your big ballet recital!',checks:[
      ['On stage','Places tab',s=>s.bg==='stage'],
      ['Ballet outfit','The ballerina dress or a tutu',s=>s.dress==='ballerina'||(s.dress==='none'&&s.bottom==='tutu')],
      ['Ballet slippers','Shoes tab',s=>s.shoes==='ballet'],
      ['A ballet bun','Hair tab',s=>s.hair==='bun']]},
    {id:'garden',e:'🌸',t:'Garden Party',p:'Tea and cookies at a garden party.',checks:[
      ['At the park','Places tab',s=>s.bg==='park'],
      ['Flowers','A flower crown or a bouquet',s=>s.hat==='flowers'||s.held==='bouquet'],
      ['Something pink','Wear pink',s=>wears(s,'pink')],
      ['A pretty dress or skirt','Sundress, party dress or long skirt',s=>['sundress','party'].includes(s.dress)||(s.dress==='none'&&s.bottom==='longskirt')]]},
    {id:'unicorn',e:'🦄',t:'Unicorn Dreams',p:'Dress like the most magical unicorn ever.',checks:[
      ['A unicorn horn','Extras tab',s=>s.hat==='unicorn'],
      ['Pink or purple','Wear pink or purple',s=>wears(s,'pink')||wears(s,'purple')],
      ['A rainbow','Rainbow face sparkle or rainbow necklace',s=>s.sticker==='rainbow'||s.necklace==='rainbow'],
      ['Magical hair','Pink, purple or blue hair',s=>[7,8,9].includes(s.hairColor)]]},
    {id:'mermaid',e:'🧜',t:'Under the Sea',p:'Swim with the fish as a mermaid!',checks:[
      ['At the beach','Places tab',s=>s.bg==='beach'],
      ['A mermaid tail','Dresses tab',s=>s.dress==='mermaid'],
      ['Ocean colors','Blue, teal or green',s=>wears(s,'blue')||wears(s,'green')],
      ['Pearls from the sea','A pearl necklace',s=>s.necklace==='pearls']]},
    {id:'popstar',e:'🎤',t:'Pop Star',p:'The crowd is cheering. Time for your concert!',checks:[
      ['On stage','Places tab',s=>s.bg==='stage'],
      ['Stage outfit','A jacket, suit, vest or party dress',s=>s.dress==='party'||(s.dress==='none'&&['jacket','suit','vest'].includes(s.top))],
      ['Cool shades','Star or heart glasses',s=>['star','heart'].includes(s.glasses)],
      ['Star power','Glam lashes or headphones',s=>s.lashes===2||s.hat==='headphones']]},
    {id:'purple',e:'💜',t:'All Purple',p:'Can you make a look that is all purple?',checks:[
      ['Purple outfit','Top and bottom, or a dress',s=>outfit(s).every(c=>FAM.purple.includes(c))],
      ['Purple shoes','Shoe color',s=>s.shoes!=='none'&&FAM.purple.includes(s.shoesColor)],
      ['Purple makeup','Purple eyeshadow or lips',s=>s.shadow===2||s.lips===6],
      ['Purple hair or hat','Hair color or headwear color',s=>s.hairColor===8||(s.hat!=='none'&&FAM.purple.includes(s.hatColor))]]},
    {id:'sporty',e:'🏀',t:'Game Day',p:'Your team has a big game at the park!',checks:[
      ['At the park','Places tab',s=>s.bg==='park'],
      ['Team jersey','Tops tab',s=>s.dress==='none'&&s.top==='jersey'],
      ['Sneakers','Shoes tab',s=>s.shoes==='sneakers'],
      ['Ready to play','Hair up or a ball cap',s=>['ponytail','pigtails','braids'].includes(s.hair)||s.hat==='cap']]},
    {id:'candy',e:'🍭',t:'Candy Land Party',p:'A sweet party in Candy Land!',checks:[
      ['In Candy Land','Places tab',s=>s.bg==='candy'],
      ['A party balloon','Extras tab, Hold something',s=>s.held==='balloon'],
      ['Sweet colors','Wear pink or yellow',s=>wears(s,'pink')||wears(s,'yellow')],
      ['Party outfit','A party dress or tutu',s=>s.dress==='party'||(s.dress==='none'&&s.bottom==='tutu')]]},
    {id:'rainy',e:'🌧️',t:'Rainy Day',p:'Time to splash in the puddles!',checks:[
      ['Rain boots','Shoes tab',s=>s.shoes==='rainboots'],
      ['A rain jacket','A hoodie or jacket',s=>s.dress==='none'&&['hoodie','jacket'].includes(s.top)],
      ['Bright yellow','Yellow clothes or boots',s=>wears(s,'yellow')||FAM.yellow.includes(s.shoesColor)],
      ['Outside','The park',s=>s.bg==='park']]},
    {id:'cozy',e:'📚',t:'Cozy Reading Day',p:'Curl up with a good book at home.',checks:[
      ['In your bedroom','Places tab',s=>s.bg==='bedroom'],
      ['Something comfy','A sweater or hoodie',s=>s.dress==='none'&&['sweater','hoodie'].includes(s.top)],
      ['Reading glasses','Round glasses',s=>s.glasses==='round'],
      ['A cuddle buddy','Hold the teddy bear',s=>s.held==='teddy']]},
    {id:'rainbow',e:'🌈',t:'Rainbow Bright',p:'Wear as many colors as you can!',checks:[
      ['A rainbow','Face sparkle or necklace',s=>s.sticker==='rainbow'||s.necklace==='rainbow'],
      ['Colorful hair','Pink, purple, blue or green hair',s=>[7,8,9,10].includes(s.hairColor)],
      ['Mix it up','A top and bottom in different colors',s=>s.dress==='none'&&s.topColor!==s.bottomColor],
      ['Bright shoes','Not black or white',s=>s.shoes!=='none'&&![10,11].includes(s.shoesColor)]]},
    {id:'pirate',e:'🏴‍☠️',t:'Pirate Adventure',p:'Ahoy! Sail the seas looking for treasure.',checks:[
      ['At the beach','Places tab',s=>s.bg==='beach'],
      ['A pirate hat','Extras tab',s=>s.hat==='pirate'],
      ['A trusty sword','Extras tab, Hold something',s=>s.held==='sword'],
      ['A striped shirt','Tops tab',s=>s.dress==='none'&&s.top==='stripes']]},
    {id:'wizard',e:'🧙',t:'Wizard School',p:'Your first day at a school for wizards!',checks:[
      ['At the castle','Places tab',s=>s.bg==='castle'],
      ['A wizard hat','Extras tab',s=>s.hat==='wizard'],
      ['Magic in hand','A wand or a story book',s=>['wand','book'].includes(s.held)],
      ['Wizard colors','Wear purple or blue',s=>wears(s,'purple')||wears(s,'blue')]]},
    {id:'sharp',e:'🤵',t:'Super Sharp',p:'Dress up for a fancy dinner party.',checks:[
      ['A suit or vest','Tops tab',s=>s.dress==='none'&&['suit','vest'].includes(s.top)],
      ['A tie or bow tie','Extras tab',s=>['tie','bowtie'].includes(s.necklace)],
      ['Dress shoes','Shoes tab',s=>s.shoes==='loafers'],
      ['Neat hair','Short, Swoop or Buzz Cut',s=>['short','sideswept','buzz'].includes(s.hair)]]},
    {id:'skate',e:'🛹',t:'Skate Park',p:'Show off your coolest tricks at the park!',checks:[
      ['At the park','Places tab',s=>s.bg==='park'],
      ['A cap or headphones','Extras tab',s=>['cap','headphones'].includes(s.hat)],
      ['High tops','Shoes tab',s=>s.shoes==='hightops'],
      ['Comfy clothes','A hoodie or the Lightning Tee',s=>s.dress==='none'&&['hoodie','bolt'].includes(s.top)]]}
  ];
  const byId=id=>C.find(c=>c.id===id);
  const starsFor=met=>met>=4?3:met===3?2:1;
  const earned=id=>Progress.get('ch_'+id)||0;
  const total=()=>C.reduce((n,c)=>n+earned(c.id),0);
  const starRow=n=>'<span class="stars">'+[0,1,2].map(i=>i<n?'⭐':'<i>☆</i>').join('')+'</span>';
  let active=store.get('ss_challenge')||null,lastMet=-1;

  function drawList(){
    $('chTotal').innerHTML=`⭐ ${total()} of ${C.length*3} stars`;
    $('chGrid').innerHTML=C.map(c=>`<button class="chcard${earned(c.id)===3?' done':''}" data-ch="${c.id}"><span class="che">${c.e}</span><b>${c.t}</b><small>${c.p}</small>${starRow(earned(c.id))}<span class="pill go">${earned(c.id)?'▶ Play again':'▶ Play'}</span></button>`).join('');
  }
  function start(id){active=id;lastMet=-1;store.set('ss_challenge',id);blip();location.hash='dress-up';}
  function stop(){active=null;store.set('ss_challenge',null);$('dBanner').hidden=true;}
  function drawBanner(s){
    const b=$('dBanner'),c=active&&byId(active);
    if(!c){b.hidden=true;return;}
    const res=c.checks.map(([l,h,f])=>{let ok=false;try{ok=!!f(s);}catch(e){}return {l,h,ok};});
    const met=res.filter(r=>r.ok).length;
    if(lastMet>=0&&met>lastMet&&sound)tone(880,0,.18,.06,'triangle');
    lastMet=met;
    b.hidden=false;
    b.innerHTML=`<div class="cb-top"><span class="cb-e">${c.e}</span><div><b>${c.t}</b><small>${c.p}</small></div></div>`+
      `<ul class="cb-list">${res.map(r=>`<li class="${r.ok?'ok':''}">${r.ok?'✅':'⬜'} ${r.l}${r.ok?'':` <small>(${r.h})</small>`}</li>`).join('')}</ul>`+
      `<div class="cb-btns"><button class="pill go" data-cb="done">🏁 I'm done!</button><button class="pill" data-cb="quit">✖ Stop</button></div>`;
  }
  function finish(){
    const c=byId(active);if(!c)return;
    const s=Dress.state,met=c.checks.filter(([, ,f])=>{try{return f(s);}catch(e){return false;}}).length,stars=starsFor(met);
    if(stars>earned(c.id))Progress.set('ch_'+c.id,stars);
    Track.hit('challenge_done');
    const msg=stars===3?'Perfect style!':stars===2?'Looking great!':'Nice try! Can you get 3 stars?';
    stop();
    showOff(`<svg viewBox="0 0 300 480" xmlns="http://www.w3.org/2000/svg">${render(s,{uid:'chs'})}</svg>`,`${'⭐'.repeat(stars)} ${c.t}: ${msg}`);
    location.hash='style-challenge';
  }
  function init(){
    addSection('mod-challenge',`<div class="home chal"><div class="chhead"><p class="hello">Dress up for each theme and earn up to 3 stars!</p><div class="chbar"><span class="pill" id="chTotal"></span><button class="pill go" id="chRand">🎲 Surprise challenge</button></div></div><div class="chgrid" id="chGrid"></div></div>`);
    $('chGrid').addEventListener('click',e=>{const b=e.target.closest('[data-ch]');if(b)start(b.dataset.ch);});
    $('chRand').addEventListener('click',()=>start(pick(C).id));
    $('dBanner').addEventListener('click',e=>{const b=e.target.closest('[data-cb]');if(!b)return;if(b.dataset.cb==='done')finish();else{blip();stop();}});
    Dress.onChange(drawBanner);
    Core.onAuth(()=>{if(!$('mod-challenge').hidden)drawList();});
    injectCss(`
      .chal .chhead{display:flex;flex-direction:column;align-items:center;gap:8px;margin-bottom:16px}
      .chbar{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
      .pill.go{background:linear-gradient(135deg,#ff7ab6,#b06bff);color:#fff}
      .chgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:14px}
      .chcard{border:none;background:#fff;border-radius:24px;padding:16px 14px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;
        box-shadow:0 8px 22px rgba(143,107,255,.14);transition:transform .15s}
      .chcard:hover{transform:translateY(-3px)}
      .chcard.done{background:linear-gradient(#fff,#fff8dc)}
      .che{font-size:44px;line-height:1}
      .chcard b{font-size:18px}.chcard small{color:var(--muted);min-height:34px}
      .stars{font-size:22px;letter-spacing:2px}.stars i{font-style:normal;color:#d9cbe8}
      .cbanner .cb-top{display:flex;gap:10px;align-items:center}.cb-e{font-size:34px}
      .cbanner b{display:block;font-size:17px}.cbanner small{color:var(--muted)}
      .cb-list{list-style:none;margin:8px 0;padding:0;display:grid;gap:3px;font-size:15px}
      .cb-list li.ok{color:#2f9e5b;font-weight:600}
      .cb-btns{display:flex;gap:8px}
    `);
  }
  function show(){drawList();}
  registerStudio({hash:'style-challenge',el:'mod-challenge',emoji:'🏆',title:'Style Challenge',
    blurb:()=>`Dress up for fun themes and earn stars. You have ${total()} of ${C.length*3}!`,init,show,
    preview:()=>`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="chg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE9A8"/><stop offset="1" stop-color="#FFC7E4"/></linearGradient></defs><rect width="400" height="300" fill="url(#chg)"/>`+
      [[60,60,14],[340,70,12],[80,230,10],[330,220,16],[200,40,10]].map(([x,y,r])=>star(x,y,r,'#fff','opacity=".8"')).join('')+
      `<path d="M150 70 H250 V120 Q250 175 200 180 Q150 175 150 120 Z" fill="#FFD84D" stroke="#D9A82A" stroke-width="4"/><path d="M150 85 Q115 85 118 115 Q122 140 152 140 M250 85 Q285 85 282 115 Q278 140 248 140" stroke="#D9A82A" stroke-width="8" fill="none"/>`+
      `<rect x="188" y="178" width="24" height="34" fill="#E9B93A"/><rect x="160" y="210" width="80" height="22" rx="6" fill="#B07BC9"/>`+star(200,122,22,'#fff')+
      `<text x="200" y="272" text-anchor="middle" font-family="Fredoka,Arial" font-weight="700" font-size="30" fill="#3b2453">⭐ ${total()} / ${C.length*3}</text></svg>`});
  return {start,list:C,total,max:()=>C.length*3};
})();

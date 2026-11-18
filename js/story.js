/* Style Studio — Story Maker. Cast your avatars and pets, build a picture book page by page, then read it like a real book.
   Each page follows a story part (beginning, problem, trying, solving, ending) with a question, ideas and a word bank. */
const Story=(()=>{
  const MAXPAGES=10,MAXCAST=6,MAXON=4,MAXPROPS=4;
  const clone=o=>JSON.parse(JSON.stringify(o));
  const escH=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
  const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
  const ROLES={hero:'⭐ Hero',friend:'💖 Best Friend',helper:'🤝 Helper',sidekick:'🐾 Sidekick',royal:'👑 Royal',wise:'🦉 Wise One',trouble:'😈 Troublemaker'};
  const PARTS={
    begin:{l:'The Beginning',q:'Who is in your story? Where are they? What are they doing?',ideas:[
      'Once upon a time, {A} lived near the {place}.','One sunny morning, {A} and {B} went to the {place}.','This is {A}. {A} loves big adventures!','It was a quiet day at the {place}. Then something amazing happened...']},
    problem:{l:'The Problem',q:'Uh oh! What goes wrong? What problem do they have?',ideas:[
      'Suddenly, there was a loud BOOM!','Oh no! {A} lost something very important.','But then, a big problem came along...','{B} looked worried. "Something is not right," {B} said.']},
    try:{l:'What Happens Next',q:'What do they try? Does it work? Who do they meet?',ideas:[
      'First, {A} tried to fix it, but it did not work.','{B} had an idea: "Let\'s look over there!"','They looked high and low.','Along the way, they met a new friend.']},
    solve:{l:'Solving It',q:'How do they fix the problem? Who helps?',ideas:[
      'Then {A} had a clever idea!','Working together, {A} and {B} fixed everything.','With a little magic, the problem was gone.','{A} was brave and tried one more time. It worked!']},
    end:{l:'The End',q:'How does the story end? How does everyone feel now?',ideas:[
      'And they all lived happily ever after. The End!','{A} smiled. It was the best day ever! The End!','From that day on, {A} and {B} were best friends. The End!','What an adventure! {A} could not wait for the next one. The End!']}
  };
  const partOf=(i,n)=>n<=1?'begin':i===0?'begin':i===n-1?'end':i===1?'problem':i===n-2?'solve':'try';
  const FEEL={happy:'happy',laugh:'so silly',wink:'sneaky',love:'full of love',surprised:'surprised',sad:'sad',angry:'grumpy',sleepy:'very sleepy'};
  const WORDS=[['Story words',['Once upon a time,','Then','Next,','Suddenly,','But','Finally,','The End!']],
    ['Feelings',['happy','excited','scared','brave','silly','proud','worried','surprised']],
    ['Sounds',['BOOM!','Whoosh!','Splash!','Ta-da!','Ha ha!','Zzz...','Pop!','Roar!']]];

  /* Story ideas: characters are [castIndex, mood, speech]; props are [prop, x, y]. {A} {B} are cast names. */
  const IDEAS=[
    {id:'treasure',e:'🏴‍☠️',t:'The Secret Treasure Map',pages:[
      {s:'beach',c:[[0,'happy']],p:[['map',370,230]],t:'One sunny morning, {A} found an old map buried in the sand at the beach.'},
      {s:'beach',c:[[0,'surprised','X marks the spot!'],[1,'happy']],p:[['map',250,250]],t:'{A} showed the map to {B}. The treasure was hidden deep in the forest!'},
      {s:'forest',c:[[0,'sad','Which way do we go?'],[1,'surprised']],t:'But the forest was dark and full of twisty paths. {A} felt a little lost.'},
      {s:'forest',c:[[0,'happy'],[1,'laugh','We found it!']],p:[['chest',240,240]],t:'{B} found the arrows on the map. Together they followed them to a big treasure chest!'},
      {s:'beach',c:[[0,'laugh','Best treasure ever!'],[1,'happy']],p:[['chest',240,244],['magic',240,190]],t:'Inside was gold, jewels and a note: Friends are the real treasure. The End!'}]},
    {id:'dragon',e:'🐉',t:'The Lonely Dragon',pages:[
      {s:'castle',c:[[0,'happy']],t:'{A} lived in a tall castle on top of a green hill.'},
      {s:'castle',c:[[0,'surprised','Who is there?']],p:[['dragon',370,236]],t:'One day, a big dragon landed in the garden! Everyone ran away... except {A}.'},
      {s:'cave',c:[[0,'sad']],p:[['dragon',360,236]],t:'{A} followed the dragon to its crystal cave. The dragon was crying. It had no friends.'},
      {s:'cave',c:[[0,'happy','I can be your friend!'],[1,'laugh']],p:[['dragon',400,236],['cake',250,250]],t:'{A} and {B} brought cake and games to the cave. The dragon smiled for the first time!'},
      {s:'park',c:[[0,'laugh'],[1,'happy']],p:[['dragon',400,236],['balloons',260,200]],t:'Now the dragon comes to every party. It even lights the birthday candles! The End!'}]},
    {id:'space',e:'🚀',t:'Lost in Space',pages:[
      {s:'city',c:[[0,'happy','I built a rocket!']],p:[['rocket',370,226]],t:'{A} built a shiny rocket ship right in the middle of the big city.'},
      {s:'space',c:[[0,'surprised','Whoa!']],p:[['rocket',360,190]],t:'5, 4, 3, 2, 1... BLAST OFF! {A} zoomed past the moon and the stars.'},
      {s:'space',c:[[0,'sad','Which way is home?']],t:'But the rocket ran out of fuel! {A} was lost in space.'},
      {s:'space',c:[[0,'happy'],[1,'surprised','I can help!']],p:[['star',380,110]],t:'A wishing star twinkled, and {B} floated over to help push the rocket home.'},
      {s:'bedroom',c:[[0,'sleepy'],[1,'happy']],t:'Back home, {A} looked up at the stars and smiled. What an adventure! The End!'}]},
    {id:'birthday',e:'🎂',t:'The Birthday Surprise',pages:[
      {s:'bedroom',c:[[0,'happy','Today is a special day!']],t:'{A} woke up with a big idea. Today was {B}\'s birthday!'},
      {s:'candy',c:[[0,'happy']],p:[['gift',360,246],['cake',150,250]],t:'{A} went to Candy Land to find the sweetest cake and the best present.'},
      {s:'city',c:[[0,'sad','Oh no!']],p:[['cake',340,252]],t:'But on the way home, the cake fell over. SPLAT!'},
      {s:'bedroom',c:[[0,'happy']],p:[['cake',330,252],['magic',330,190]],t:'{A} had an idea. With lots of frosting and a little magic, the cake was fixed!'},
      {s:'park',c:[[0,'laugh','Surprise!'],[1,'love']],p:[['cake',240,252],['balloons',420,190]],t:'SURPRISE! {B} was so happy. It was the best birthday ever! The End!'}]},
    {id:'missing',e:'🐾',t:'The Missing Friend',pages:[
      {s:'park',c:[[0,'happy'],[1,'laugh']],t:'{A} and {B} were playing catch in the park.'},
      {s:'park',c:[[0,'surprised','Where did you go?']],t:'{A} turned around... but {B} was gone!'},
      {s:'city',c:[[0,'sad']],t:'{A} looked all over the big city. No {B} anywhere.'},
      {s:'forest',c:[[0,'surprised'],[1,'laugh']],p:[['flowers',380,250]],t:'Then {A} heard a happy noise. It was {B}, playing in the flowers!'},
      {s:'bedroom',c:[[0,'happy'],[1,'sleepy']],t:'They went home together, safe and sound. {B} fell fast asleep. The End!'}]},
    {id:'wizard',e:'🧙',t:'A Magic Mix-Up',pages:[
      {s:'school',c:[[0,'happy']],t:'It was {A}\'s very first day at wizard school.'},
      {s:'school',c:[[0,'surprised','Oops!']],p:[['potion',300,240],['magic',300,170]],t:'{A} mixed a potion... POOF! Everything turned purple!'},
      {s:'castle',c:[[0,'sad'],[1,'angry','I am purple!']],t:'Even {B} was purple! {A} felt worried.'},
      {s:'cave',c:[[0,'happy'],[1,'surprised']],p:[['key',240,220]],t:'They found a magic key in the crystal cave. {A} said the magic words: Abra-ca-dabra!'},
      {s:'park',c:[[0,'laugh'],[1,'laugh']],t:'Everything turned back to normal, with a rainbow on top! The End!'}]},
    {id:'sea',e:'🧜',t:'Under the Sea',pages:[
      {s:'beach',c:[[0,'happy']],t:'{A} went for a swim at the beach.'},
      {s:'sea',c:[[0,'surprised','I can breathe underwater!']],p:[['magic',360,150]],t:'A magic bubble popped, and suddenly {A} could swim with the fish!'},
      {s:'sea',c:[[0,'sad']],p:[['egg',360,236]],t:'A sea turtle was crying. Her egg had rolled far away from home.'},
      {s:'sea',c:[[0,'happy'],[1,'happy','Found it!']],p:[['egg',250,240]],t:'{A} and {B} searched every rock and found the egg in the seaweed.'},
      {s:'beach',c:[[0,'laugh'],[1,'happy']],p:[['star',380,110]],t:'The turtle gave them a lucky star to say thank you. The End!'}]}
  ];

  const closet=Closet({table:'stylestudio_items',kind:'story',field:'data',nameCol:'name',localKey:'ss_story_saved',localMax:12,label:'stories'});
  let story=null,cur=0,tab='story',sel=null,drag=null,readAt=0,speakOn=false;
  const pg=()=>story.pages[cur];
  const save=()=>store.set('ss_story',{story,cur});

  /* ---------- cast ---------- */
  const avatarSources=()=>{const out=[{look:Dress.state,label:'Me now'}];Dress.closet.items().forEach(l=>out.push({look:l}));return out;};
  const petSources=()=>{if(typeof Pets==='undefined')return [];const out=[{look:Pets.state,label:'My pet now'}];Pets.closet.items().forEach(l=>out.push({look:l}));return out;};
  const castMember=(kind,look,role)=>({kind,role,name:(look.name||'').trim()||(kind==='pet'?'Buddy':'Star'),look:clone(look)});
  function defaultCast(){
    const c=[castMember('avatar',Dress.state,'hero')];
    if(typeof Pets!=='undefined')c.push(castMember('pet',Pets.state,'sidekick'));
    return c;
  }
  const nameIn=(cast,i)=>{const c=cast[i];return c?c.name:(i===0?'our hero':'a new friend');};
  const names=(t,cast)=>t.replace(/\{A\}/g,nameIn(cast,0)).replace(/\{B\}/g,nameIn(cast,1));
  const fill=t=>names(t,story.cast).replace(/\{place\}/g,(SCENES[pg().scene]||SCENES.park).l.toLowerCase());
  const slots=n=>n<=1?[240]:n===2?[165,320]:n===3?[110,240,370]:[80,190,300,410];
  const blankPage=(scene,who)=>({scene,text:'',props:[],chars:who.map((c,j)=>({c,x:slots(who.length)[j],mood:'happy',flip:false,far:false,say:''}))});
  function newStory(){
    const cast=defaultCast();
    return {sid:newId(),title:'',author:Core.user?Core.displayName:'',cast,pages:[blankPage('castle',cast.map((c,i)=>i).slice(0,2))]};
  }
  function fromIdea(I){
    const cast=story.cast.length?story.cast:defaultCast();
    const s={sid:newId(),title:I.t,author:story.author||'',cast,pages:[]};
    I.pages.forEach(P=>{
      const who=(P.c||[]).filter(([ci])=>ci<cast.length);
      const page=blankPage(P.s,who.map(([ci])=>ci));
      who.forEach(([ci,mood,say],j)=>{page.chars[j].mood=mood||'happy';page.chars[j].say=say||'';});
      if(page.chars.length===1&&(P.p||[]).some(p=>p[1]>300))page.chars[0].x=150;
      page.props=(P.p||[]).map(([p,x,y])=>({p,x,y,z:1}));
      page.text=names(P.t,cast);s.pages.push(page);
    });
    return s;
  }

  /* ---------- drawing ---------- */
  function wrap(t,n){const L=[];let line='';String(t).split(/\s+/).forEach(w=>{if(!w)return;if(line&&(line+' '+w).length>n){L.push(line);line=w;}else line=(line?line+' ':'')+w;});if(line)L.push(line);return L.slice(0,4);}
  function charArt(st,ch,uid){
    const c=st.cast[ch.c];if(!c)return {svg:'',top:0};
    const pet=c.kind==='pet',s=pet?(ch.far?.25:.36):(ch.far?.3:.42),foot=ch.far?238:286;
    const ax=pet?150:150,ay=pet?292:462;
    let inner=pet?renderPet(c.look,uid,{noBg:true}):render(Object.assign({},DEF,c.look),{bg:false,uid,mood:ch.mood});
    let g=`<g transform="translate(${(ch.x-ax*s).toFixed(1)} ${(foot-ay*s).toFixed(1)}) scale(${s})">${inner}</g>`;
    if(ch.flip)g=`<g transform="translate(${2*ch.x} 0) scale(-1 1)">${g}</g>`;
    if(pet&&ch.mood&&ch.mood!=='happy'){const e={laugh:'😆',wink:'😉',love:'😍',surprised:'😮',sad:'😢',angry:'😠',sleepy:'💤'}[ch.mood];g+=`<text x="${ch.x+34*s/.36}" y="${foot-200*s}" font-size="${26*s/.36}" text-anchor="middle">${e}</text>`;}
    return {svg:g,top:foot-(ay-(pet?60:40))*s,bottom:foot,half:(pet?120:85)*s};
  }
  function bubble(text,x,top){
    const L=wrap(text,18);if(!L.length)return '';
    const w=Math.max(70,Math.max(...L.map(l=>l.length))*7.8+26),h=L.length*17+16;
    const bx=clamp(x-w/2,4,476-w),by=Math.max(4,top-h-16),tx=clamp(x,bx+18,bx+w-18);
    return `<g><path d="M${(tx-9).toFixed(1)} ${(by+h-2).toFixed(1)} L${tx.toFixed(1)} ${(Math.min(top-2,by+h+14)).toFixed(1)} L${(tx+9).toFixed(1)} ${(by+h-2).toFixed(1)} Z" fill="#fff" stroke="#3b2453" stroke-width="2.5" stroke-linejoin="round"/>`+
      `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${w.toFixed(1)}" height="${h}" rx="14" fill="#fff" stroke="#3b2453" stroke-width="2.5"/><path d="M${(tx-7.5).toFixed(1)} ${(by+h-1.5).toFixed(1)} H${(tx+7.5).toFixed(1)}" stroke="#fff" stroke-width="4"/>`+
      `<text x="${(bx+w/2).toFixed(1)}" y="${(by+22).toFixed(1)}" text-anchor="middle" font-family="Fredoka,'Baloo 2',Arial" font-weight="600" font-size="14.5" fill="#3b2453">${L.map((l,i)=>`<tspan x="${(bx+w/2).toFixed(1)}" dy="${i?17:0}">${escH(l)}</tspan>`).join('')}</text></g>`;
  }
  function renderPage(st,page,uid,o={}){
    let out=(SCENES[page.scene]||SCENES.park).d(uid+'s');
    (page.props||[]).forEach((p,i)=>{const P=PROPS[p.p];if(!P)return;
      out+=`<g transform="translate(${p.x} ${p.y}) scale(${p.z||1})" data-sp="${i}">${P.d()}</g>`;
      if(o.edit&&sel&&sel.t==='p'&&sel.i===i)out+=`<rect x="${p.x-50*(p.z||1)}" y="${p.y-50*(p.z||1)}" width="${100*(p.z||1)}" height="${96*(p.z||1)}" rx="12" fill="none" stroke="#ff5fa2" stroke-width="3" stroke-dasharray="7 5" pointer-events="none"/>`;});
    const order=page.chars.map((c,i)=>i).sort((a,b)=>(page.chars[b].far?1:0)-(page.chars[a].far?1:0));
    const tops=[];
    order.forEach(i=>{const ch=page.chars[i],a=charArt(st,ch,`${uid}c${i}`);tops[i]=a.top;
      out+=`<g data-sc="${i}" style="cursor:${o.edit?'grab':'default'}">${a.svg}</g>`;
      if(o.edit&&sel&&sel.t==='c'&&sel.i===i)out+=`<rect x="${(ch.x-a.half).toFixed(1)}" y="${(a.top-6).toFixed(1)}" width="${(2*a.half).toFixed(1)}" height="${(a.bottom-a.top+12).toFixed(1)}" rx="14" fill="none" stroke="#ff5fa2" stroke-width="3" stroke-dasharray="7 5" pointer-events="none"/>`;});
    page.chars.forEach((ch,i)=>{if(ch.say)out+=bubble(ch.say,ch.x,tops[i]);});
    if(o.banner)out+=o.banner;
    return out;
  }
  function coverSvg(st,uid,end){
    const first=st.pages[end?st.pages.length-1:0]||blankPage('castle',[]);
    const who=st.cast.map((c,i)=>i).slice(0,4);
    const page={scene:first.scene,props:[],chars:who.map((c,j)=>({c,x:slots(who.length)[j],mood:end?'laugh':'happy',flip:false,far:false,say:''}))};
    const title=end?'The End':(st.title||'My Story');
    const L=wrap(title,22).slice(0,2),fs=L.length>1?26:30;
    const banner=`<rect x="40" y="14" width="400" height="${L.length>1?78:56}" rx="20" fill="#fff" opacity=".93" stroke="#ff7ab6" stroke-width="4"/>`+
      `<text x="240" y="${L.length>1?46:52}" text-anchor="middle" font-family="Fredoka,'Baloo 2',Arial" font-weight="700" font-size="${fs}" fill="#8F5BC9">${L.map((l,i)=>`<tspan x="240" dy="${i?32:0}">${escH(l)}</tspan>`).join('')}</text>`+
      star(56,28,9,'#FFD84D')+star(424,28,9,'#FFD84D')+(end?star(80,110,7,'#FF8FC6')+star(400,104,8,'#9FE7FF')+heart(240,112,10,'#FF4D6D'):'');
    return renderPage(st,page,uid,{banner});
  }
  const pageSvg=(st,page,uid,o)=>`<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg">${renderPage(st,page,uid,o)}</svg>`;

  /* ---------- editor ---------- */
  function drawStage(){$('stSvg').innerHTML=renderPage(story,pg(),'ed',{edit:true});}
  function drawPart(){
    const n=story.pages.length,part=PARTS[partOf(cur,n)];
    $('stPart').innerHTML=`<b>Page ${cur+1} of ${n} · ${part.l}</b><span>${part.q}</span>`;
    $('stText').placeholder=part.q;
    if(document.activeElement!==$('stText'))$('stText').value=pg().text||'';
  }
  function drawPages(){
    $('stPages').innerHTML=story.pages.map((p,i)=>`<button class="stpg${i===cur?' on':''}" data-pg="${i}" title="Page ${i+1}">${pageSvg(story,p,'pt'+i)}<span>${i+1}</span></button>`).join('')+
      (story.pages.length<MAXPAGES?`<button class="stpg add" data-act="addpage" title="Add a page"><b>＋</b><span>New page</span></button>`:'');
  }
  function drawTool(){
    const t=$('stTool');
    if(!sel){t.hidden=true;return;}
    if(sel.t==='c'){
      const ch=pg().chars[sel.i];if(!ch){sel=null;t.hidden=true;return;}
      const c=story.cast[ch.c];
      t.hidden=false;
      t.innerHTML=`<div class="tl-row"><b>${escH(c?c.name:'')}</b>`+Object.entries(MOODS).map(([m,l])=>`<button class="${ch.mood===m?'on':''}" data-mood="${m}" title="${l.slice(2)}">${l.split(' ')[0]}</button>`).join('')+`</div>`+
        `<div class="tl-row"><input id="stSay" maxlength="70" placeholder="💬 What does ${escH(c?c.name:'')} say?" value="${escH(ch.say)}">`+
        `<button data-tool="flip" title="Turn around">↔️</button><button data-tool="far" title="${ch.far?'Bring closer':'Move far away'}">${ch.far?'🔍':'🔭'}</button><button data-tool="feel" title="Write how they feel">✏️</button><button data-tool="del" title="Take off this page">🗑️</button></div>`;
    }else{
      const p=pg().props[sel.i];if(!p){sel=null;t.hidden=true;return;}
      t.hidden=false;
      t.innerHTML=`<div class="tl-row"><b>${PROPS[p.p].l}</b><button data-tool="small" title="Smaller">➖</button><button data-tool="big" title="Bigger">➕</button><button data-tool="del" title="Remove">🗑️</button><span class="tl-hint">Drag it anywhere in the picture</span></div>`;
    }
  }
  const TABS=[{id:'story',icon:'📚',label:'Story'},{id:'cast',icon:'🎭',label:'Cast'},{id:'people',icon:'🧍',label:'On Page'},{id:'scene',icon:'🏞️',label:'Places'},{id:'props',icon:'⭐',label:'Things'}];
  function drawTabs(){$('stTabs').innerHTML=TABS.map(t=>`<button class="tab${t.id===tab?' on':''}" data-tab="${t.id}"><b>${t.icon}</b>${t.label}</button>`).join('');}
  function thumb(kind,look,uid){
    return kind==='pet'?`<svg viewBox="40 60 220 220" xmlns="http://www.w3.org/2000/svg">${renderPet(look,uid,{noBg:true})}</svg>`
      :`<svg viewBox="60 20 180 230" xmlns="http://www.w3.org/2000/svg">${render(Object.assign({},DEF,look),{bg:false,uid})}</svg>`;
  }
  function drawBody(){
    const B=$('stBody');let h='';
    if(tab==='story'){
      h+=`<div class="sec"><h2>📖 Title</h2><div class="name-row"><input id="stTitle" maxlength="40" placeholder="Name your story" value="${escH(story.title)}"></div>`+
        `<div class="name-row" style="margin-top:8px"><label for="stAuthor">Written by</label><input id="stAuthor" maxlength="30" placeholder="Your name" value="${escH(story.author)}"></div></div>`;
      h+=`<div class="sec"><h2>✏️ Words to use</h2>`+WORDS.map(([t,ws])=>`<div class="wb"><small>${t}</small>${ws.map(w=>`<button class="chip" data-word="${escH(w)}">${escH(w)}</button>`).join('')}</div>`).join('')+`<p class="note">Tap a word to add it to this page.</p></div>`;
      h+=`<div class="sec"><h2>💡 Story ideas</h2><p class="note">Pick an idea to start a whole story with your cast. You can change everything after!</p><div class="ideas">`+
        IDEAS.map(I=>`<button class="idea" data-idea="${I.id}"><span>${I.e}</span><b>${I.t}</b></button>`).join('')+`</div></div>`;
    }else if(tab==='cast'){
      h+=`<div class="sec"><h2>🎭 Your cast (${story.cast.length}/${MAXCAST})</h2>`+(story.cast.length?story.cast.map((c,i)=>`<div class="castcard">${thumb(c.kind,c.look,'cc'+i)}<div class="cc-body"><input data-cname="${i}" maxlength="16" value="${escH(c.name)}" aria-label="Name"><select data-crole="${i}">${Object.entries(ROLES).map(([k,l])=>`<option value="${k}"${c.role===k?' selected':''}>${l}</option>`).join('')}</select></div><button class="cc-x" data-cdel="${i}" aria-label="Remove from cast">✖</button></div>`).join(''):'<p class="note">Add characters from below!</p>')+`</div>`;
      const add=(list,kind,pre)=>list.map((s,i)=>`<button class="opt" data-add="${kind}:${i}">${thumb(kind,s.look,pre+i)}<span>${escH(s.label||s.look.name||(kind==='pet'?'Pet':'Look'))}</span></button>`).join('');
      h+=`<div class="sec"><h2>👗 Add your avatars</h2><div class="grid">${add(avatarSources(),'avatar','ca')}</div><p class="note">Save looks in <a href="#dress-up">Dress Up</a> to see them here.</p></div>`;
      const pets=petSources();
      if(pets.length)h+=`<div class="sec"><h2>🐾 Add your pets</h2><div class="grid">${add(pets,'pet','cp')}</div><p class="note">Make more in <a href="#pet-studio">Pet Studio</a>.</p></div>`;
    }else if(tab==='people'){
      h+=`<div class="sec"><h2>🧍 Who is on page ${cur+1}?</h2><p class="note">Tap a character in the picture to change their face, make them talk, or drag them around.</p><div class="grid">`+
        story.cast.map((c,i)=>{const on=pg().chars.findIndex(ch=>ch.c===i);return `<button class="opt${on>=0?' on':''}" data-toggle="${i}">${thumb(c.kind,c.look,'pp'+i)}<span>${on>=0?'✅ ':''}${escH(c.name)}</span></button>`;}).join('')+`</div>`+(story.cast.length?'':'<p class="note">Add characters in the 🎭 Cast tab first.</p>')+`</div>`;
    }else if(tab==='scene'){
      h+=`<div class="sec"><h2>🏞️ Where does page ${cur+1} happen?</h2><div class="grid land">`+Object.entries(SCENES).map(([k,S])=>`<button class="opt${pg().scene===k?' on':''}" data-scene="${k}"><svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg">${S.d('sc'+k)}</svg><span>${S.l}</span></button>`).join('')+`</div></div>`;
    }else if(tab==='props'){
      h+=`<div class="sec"><h2>⭐ Add things to the picture</h2><p class="note">Up to ${MAXPROPS} on each page. Drag them where you want.</p><div class="grid">`+Object.entries(PROPS).map(([k,P])=>`<button class="opt" data-prop="${k}"><svg viewBox="-50 -50 100 100" xmlns="http://www.w3.org/2000/svg">${P.d()}</svg><span>${P.l}</span></button>`).join('')+`</div></div>`;
    }
    const y=B.scrollTop;B.innerHTML=h;B.scrollTop=y;
  }
  function drawCloset(){
    const box=$('stCloset'),list=closet.items();
    $('stClosetTitle').textContent=(Core.user?'☁️ ':'📚 ')+'My Stories'+(Core.user?' — saved to your account':' — saved on this device');
    if(!list.length){box.innerHTML=`<div class="closet-empty">Tap 💾 Save to keep your stories here!${Core.user||!sb?'':' Sign in to keep them on every device.'}</div>`;return;}
    box.innerHTML=list.map((s,i)=>`<div class="look wide" role="button" tabindex="0" data-look="${i}" title="${escH(s.title||'My Story')}"><svg viewBox="0 0 480 300">${coverSvg(s,'sc'+i)}</svg><button class="del" data-del="${i}" aria-label="Remove story">✖</button></div>`).join('');
  }
  function drawAll(){drawStage();drawPart();drawPages();drawTool();drawTabs();drawBody();}
  const changed=(pages=true)=>{save();drawStage();if(pages)drawPages();};

  function setPage(i){cur=clamp(i,0,story.pages.length-1);sel=null;save();drawStage();drawPart();drawPages();drawTool();if(['people','scene'].includes(tab))drawBody();}
  function addPage(){
    if(story.pages.length>=MAXPAGES){toast(`A story can have up to ${MAXPAGES} pages.`);return;}
    const prev=pg(),p=blankPage(prev.scene,[]);
    p.chars=prev.chars.map(ch=>Object.assign({},ch,{say:'',mood:'happy'}));
    story.pages.splice(cur+1,0,p);blip();setPage(cur+1);$('stText').value='';
  }
  function svgPoint(e){const r=$('stSvg').getBoundingClientRect();return {x:(e.clientX-r.left)/r.width*480,y:(e.clientY-r.top)/r.height*300};}

  function init(){
    addSection('mod-story',`<div class="app room-app story-app"><div class="stage-col">
      <div class="stage" id="stStage"><svg id="stSvg" viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Story page"></svg></div>
      <div class="tool st-tool" id="stTool" hidden></div>
      <div class="st-part" id="stPart"></div>
      <div class="st-write"><textarea id="stText" maxlength="220" rows="3"></textarea><button class="pill" id="stIdea" title="Give me an idea">💡 Idea</button></div>
      <div class="st-pages" id="stPages"></div>
      <div class="actions"><button class="act" id="stNew"><b>🆕</b>New Story</button><button class="act" id="stDelPage"><b>🗑️</b>Remove Page</button><button class="act" id="stSave"><b>💾</b>Save</button><button class="act primary" id="stReadBtn"><b>📖</b>Read It!</button></div>
      <div class="closet" id="stClosetBox"><h3 id="stClosetTitle"></h3><div class="closet-list" id="stCloset"></div></div>
    </div><div class="panel"><div class="tabs" id="stTabs"></div><div class="tab-body" id="stBody"></div></div></div>`);
    const R=document.createElement('div');R.className='st-read';R.id='stRead';
    R.innerHTML=`<div class="st-book"><div class="st-pic" id="stRPic"></div><div class="st-words" id="stRText"></div>
      <div class="st-nav"><button class="pill" id="stPrev" aria-label="Previous page">◀</button><span id="stPgNo"></span><button class="pill" id="stSpeak">🔊 Read to me</button><button class="pill go" id="stNext" aria-label="Next page">▶</button></div></div>
      <button class="close" id="stClose">✖ Close the book</button>`;
    document.body.appendChild(R);

    const st=store.get('ss_story');
    if(st&&st.story&&Array.isArray(st.story.pages)&&st.story.pages.length){story=st.story;cur=clamp(st.cur||0,0,story.pages.length-1);}

    $('stTabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(!b)return;tab=b.dataset.tab;blip();drawTabs();drawBody();$('stBody').scrollTop=0;});
    $('stBody').addEventListener('input',e=>{
      const t=e.target;
      if(t.id==='stTitle'){story.title=t.value;save();}
      else if(t.id==='stAuthor'){story.author=t.value;save();}
      else if(t.dataset.cname!=null){story.cast[+t.dataset.cname].name=t.value;save();drawStage();}
    });
    $('stBody').addEventListener('change',e=>{const t=e.target;if(t.dataset.crole!=null){story.cast[+t.dataset.crole].role=t.value;save();blip();}});
    $('stBody').addEventListener('click',e=>{
      const b=e.target.closest('button');if(!b)return;const d=b.dataset;
      if(d.word!=null){const ta=$('stText');const v=ta.value;ta.value=(v&&!/\s$/.test(v)?v+' ':v)+d.word;pg().text=ta.value.slice(0,220);save();blip();return;}
      if(d.idea){
        const I=IDEAS.find(x=>x.id===d.idea);
        if(story.pages.some(p=>p.text||p.chars.some(c=>c.say))&&!b.dataset.confirm){b.dataset.confirm='1';b.querySelector('b').textContent='Replace my story? Tap again';setTimeout(()=>{if(b.isConnected){delete b.dataset.confirm;b.querySelector('b').textContent=I.t;}},2600);return;}
        story=fromIdea(I);cur=0;sel=null;jingle();save();drawAll();sparkles('stStage',8);toast(`${I.e} "${I.t}" is ready! Change anything you like.`);return;
      }
      if(d.add){
        if(story.cast.length>=MAXCAST){toast(`Your cast is full (${MAXCAST}). Remove someone first.`);return;}
        const [kind,i]=d.add.split(':'),src=(kind==='pet'?petSources():avatarSources())[+i];if(!src)return;
        story.cast.push(castMember(kind,src.look,story.cast.length?(kind==='pet'?'sidekick':'friend'):'hero'));
        blip();save();drawBody();toast(`${story.cast[story.cast.length-1].name} joined the cast! 🎭`);return;
      }
      if(d.cdel!=null){
        const i=+d.cdel;story.cast.splice(i,1);
        story.pages.forEach(p=>{p.chars=p.chars.filter(ch=>ch.c!==i).map(ch=>Object.assign(ch,{c:ch.c>i?ch.c-1:ch.c}));});
        sel=null;blip();save();drawAll();return;
      }
      if(d.toggle!=null){
        const i=+d.toggle,ix=pg().chars.findIndex(ch=>ch.c===i);
        if(ix>=0){pg().chars.splice(ix,1);sel=null;}
        else{
          if(pg().chars.length>=MAXON){toast(`Up to ${MAXON} characters fit on a page.`);return;}
          const used=pg().chars.map(c=>c.x),xs=[240,120,360,60,420,180,300],x=xs.find(x=>used.every(u=>Math.abs(u-x)>60))||240;
          pg().chars.push({c:i,x,mood:'happy',flip:false,far:false,say:''});sel={t:'c',i:pg().chars.length-1};
        }
        blip();changed();drawTool();drawBody();return;
      }
      if(d.scene){pg().scene=d.scene;blip();changed();popSvg($('stSvg'));drawPart();drawBody();return;}
      if(d.prop){
        if(pg().props.length>=MAXPROPS){toast(`Up to ${MAXPROPS} things fit on a page.`);return;}
        pg().props.push({p:d.prop,x:120+rint(240),y:150+rint(80),z:1});sel={t:'p',i:pg().props.length-1};blip();changed();drawTool();sparkles('stStage',3);return;
      }
    });

    /* stage: tap to pick, drag to move */
    const svg=$('stSvg');
    svg.addEventListener('pointerdown',e=>{
      const t=e.target.closest('[data-sc],[data-sp]');
      if(!t){if(sel){sel=null;drawStage();drawTool();}return;}
      const isC=t.dataset.sc!=null,i=+(isC?t.dataset.sc:t.dataset.sp),it=isC?pg().chars[i]:pg().props[i];
      sel={t:isC?'c':'p',i};const P=svgPoint(e);
      drag={sx:P.x,sy:P.y,ox:it.x,oy:it.y||0,moved:false,id:e.pointerId};
      try{svg.setPointerCapture(e.pointerId);}catch(err){}
      e.preventDefault();drawStage();drawTool();
    });
    svg.addEventListener('pointermove',e=>{
      if(!drag||!sel)return;const P=svgPoint(e),dx=P.x-drag.sx,dy=P.y-drag.sy;
      if(!drag.moved&&Math.hypot(dx,dy)<4)return;drag.moved=true;
      const it=sel.t==='c'?pg().chars[sel.i]:pg().props[sel.i];if(!it)return;
      it.x=Math.round(clamp(drag.ox+dx,24,456));
      if(sel.t==='p')it.y=Math.round(clamp(drag.oy+dy,40,270));
      drawStage();
    });
    const endDrag=()=>{if(!drag)return;const m=drag.moved;drag=null;if(m){save();drawPages();}};
    svg.addEventListener('pointerup',endDrag);svg.addEventListener('pointercancel',endDrag);

    $('stTool').addEventListener('click',e=>{
      const b=e.target.closest('button');if(!b||!sel)return;
      if(sel.t==='c'){
        const ch=pg().chars[sel.i];if(!ch)return;
        if(b.dataset.mood){ch.mood=b.dataset.mood;blip();changed();drawTool();return;}
        const k=b.dataset.tool;
        if(k==='flip')ch.flip=!ch.flip;
        if(k==='far')ch.far=!ch.far;
        if(k==='feel'){const c=story.cast[ch.c],ta=$('stText'),line=`${c.name} felt ${FEEL[ch.mood]||'happy'}.`;ta.value=(ta.value?ta.value.replace(/\s*$/,' '):'')+line;pg().text=ta.value.slice(0,220);}
        if(k==='del'){pg().chars.splice(sel.i,1);sel=null;}
        blip();changed();drawTool();if(tab==='people')drawBody();
      }else{
        const p=pg().props[sel.i];if(!p)return;const k=b.dataset.tool;
        if(k==='small')p.z=Math.max(.6,+(p.z-.2).toFixed(1));
        if(k==='big')p.z=Math.min(1.8,+(p.z+.2).toFixed(1));
        if(k==='del'){pg().props.splice(sel.i,1);sel=null;}
        blip();changed();drawTool();
      }
    });
    $('stTool').addEventListener('input',e=>{if(e.target.id==='stSay'&&sel&&sel.t==='c'){pg().chars[sel.i].say=e.target.value;save();drawStage();}});
    $('stTool').addEventListener('focusout',e=>{if(e.target.id==='stSay')drawPages();});
    $('stText').addEventListener('input',e=>{pg().text=e.target.value;save();});
    $('stIdea').addEventListener('click',()=>{
      const part=PARTS[partOf(cur,story.pages.length)],ta=$('stText');
      const used=ta.value;let idea=fill(pick(part.ideas));for(let k=0;k<4&&used.includes(idea);k++)idea=fill(pick(part.ideas));
      ta.value=(used?used.replace(/\s*$/,' '):'')+idea;pg().text=ta.value.slice(0,220);save();jingle();
    });
    $('stPages').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.act==='addpage'){addPage();return;}if(b.dataset.pg!=null){blip();setPage(+b.dataset.pg);}});
    $('stDelPage').addEventListener('click',()=>confirmTap($('stDelPage'),'<b>🗑️</b>Remove Page',()=>{
      if(story.pages.length<=1){story.pages[0]=blankPage(story.pages[0].scene,[]);}else story.pages.splice(cur,1);
      blip();setPage(Math.min(cur,story.pages.length-1));$('stText').value=pg().text||'';}));
    $('stNew').addEventListener('click',()=>confirmTap($('stNew'),'<b>🆕</b>New Story',()=>{story=newStory();cur=0;sel=null;tab='story';save();jingle();drawAll();$('stText').value='';}));
    $('stSave').addEventListener('click',async()=>{
      const b=$('stSave');if(!story.title.trim()){tab='story';drawTabs();drawBody();toast('Give your story a title first! 📖');setTimeout(()=>$('stTitle')&&$('stTitle').focus(),50);return;}
      b.disabled=true;
      const old=closet.items().findIndex(s=>s.sid===story.sid);
      const ok=await closet.add(clone(story),story.title);
      if(ok&&old>=0)await closet.remove(old+1);
      b.disabled=false;if(!ok)return;
      drawCloset();fanfare();sparkles('stStage',8);
      b.innerHTML='<b>💖</b>Saved!';setTimeout(()=>b.innerHTML='<b>💾</b>Save',1400);
    });
    $('stCloset').addEventListener('click',async e=>{
      const d=e.target.closest('[data-del]');
      if(d){e.stopPropagation();if(await closet.remove(+d.dataset.del)){drawCloset();blip();}return;}
      const l=e.target.closest('[data-look]');if(!l)return;
      story=clone(closet.items()[+l.dataset.look]);if(!story.sid)story.sid=newId();cur=0;sel=null;save();blip();drawAll();$('stText').value=pg().text||'';
    });

    /* reading */
    $('stReadBtn').addEventListener('click',()=>openBook());
    $('stClose').addEventListener('click',closeBook);
    $('stPrev').addEventListener('click',()=>turn(-1));
    $('stNext').addEventListener('click',()=>turn(1));
    $('stSpeak').addEventListener('click',()=>{speakOn=!speakOn;$('stSpeak').textContent=speakOn?'🔇 Stop reading':'🔊 Read to me';if(speakOn)speakPage();else stopSpeak();});
    $('stRPic').addEventListener('click',()=>turn(1));
    document.addEventListener('keydown',e=>{if(!$('stRead').classList.contains('on'))return;if(e.key==='ArrowRight')turn(1);if(e.key==='ArrowLeft')turn(-1);if(e.key==='Escape')closeBook();});
    let sx=null;$('stRPic').addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
    $('stRPic').addEventListener('touchend',e=>{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>40){e.preventDefault();turn(dx<0?1:-1);}});

    injectCss(`
      .story-app .stage svg{touch-action:none;aspect-ratio:480/300}
      .st-tool{flex-direction:column;align-items:stretch}
      .tl-row{display:flex;flex-wrap:wrap;align-items:center;gap:5px}
      .tl-row b{margin-right:4px}
      .st-tool button.on{background:var(--pink-soft);outline:3px solid #ff7ab6}
      .tl-row input{flex:1;min-width:140px;border:2px solid var(--line);border-radius:14px;padding:8px 12px;font:inherit;font-size:16px;color:var(--ink)}
      .tl-hint{color:var(--muted);font-size:13px}
      .st-part{background:linear-gradient(135deg,#fff4c2,#ffe3f1);border-radius:18px;padding:10px 14px;display:flex;flex-direction:column;gap:2px}
      .st-part span{color:var(--muted);font-size:14px}
      .st-write{display:flex;gap:8px;align-items:stretch}
      .st-write textarea{flex:1;border:none;border-radius:18px;padding:12px 14px;font:inherit;font-size:17px;color:var(--ink);resize:vertical;min-height:70px;box-shadow:0 4px 14px rgba(143,107,255,.12)}
      .st-write textarea:focus{outline:3px solid #e4d9ff}
      .st-pages{display:flex;gap:8px;overflow-x:auto;padding:4px 2px 6px}
      .stpg{flex:0 0 auto;border:3px solid transparent;background:#fff;border-radius:14px;padding:3px;position:relative;box-shadow:0 3px 10px rgba(143,107,255,.12)}
      .stpg svg{display:block;width:96px;height:60px;border-radius:10px}
      .stpg span{position:absolute;left:6px;top:4px;background:#fff;border-radius:999px;font-size:12px;font-weight:700;padding:0 6px}
      .stpg.on{border-color:#ff7ab6}
      .stpg.add{width:104px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--muted)}
      .stpg.add b{font-size:26px;line-height:1}.stpg.add span{position:static;background:none}
      .look.wide svg{width:120px;height:75px}
      .wb{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:6px 0}
      .wb small{width:100%;color:var(--muted);font-weight:600}
      .chip{border:none;background:var(--purple-soft);border-radius:999px;padding:6px 12px;font:inherit;font-size:14px;font-weight:600;color:var(--ink)}
      .chip:hover{background:var(--pink-soft)}
      .ideas{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
      .idea{border:none;background:#faf5ff;border-radius:18px;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:4px;font:inherit;color:var(--ink)}
      .idea span{font-size:34px;line-height:1}.idea:hover{background:var(--pink-soft)}
      .castcard{display:flex;align-items:center;gap:10px;background:#faf5ff;border-radius:18px;padding:6px 10px;margin-bottom:8px}
      .castcard svg{width:56px;height:64px;flex:0 0 auto}
      .cc-body{display:flex;flex-direction:column;gap:4px;flex:1;min-width:0}
      .cc-body input,.cc-body select{font:inherit;font-size:15px;border:2px solid var(--line);border-radius:12px;padding:5px 9px;color:var(--ink);background:#fff}
      .cc-body input{font-weight:700}
      .cc-x{border:none;background:#fff;border-radius:50%;width:32px;height:32px}
      .st-read{position:fixed;inset:0;z-index:60;background:radial-gradient(circle at 50% 30%,#fff7fc,#e9dcff);display:none;flex-direction:column;align-items:center;justify-content:center;padding:16px;gap:10px}
      .st-read.on{display:flex}
      .st-book{background:#fff;border-radius:28px;box-shadow:0 18px 50px rgba(143,107,255,.3);padding:14px;width:min(96vw,980px);display:flex;flex-direction:column;gap:12px}
      .st-pic svg{display:block;width:100%;height:auto;max-height:62vh;border-radius:18px;cursor:pointer}
      .st-pic svg.turn{animation:pageturn .45s ease}
      @keyframes pageturn{from{opacity:0;transform:translateX(30px) rotateY(12deg)}to{opacity:1;transform:none}}
      .st-words{font-size:clamp(18px,2.6vw,26px);line-height:1.45;text-align:center;padding:0 12px;min-height:1.5em;font-weight:500}
      .st-words .by{color:var(--muted);font-size:.8em}
      .st-nav{display:flex;align-items:center;justify-content:center;gap:12px}
      .st-nav span{color:var(--muted);font-weight:600;min-width:90px;text-align:center}
      .st-read .close{position:static;border:none;background:#fff;border-radius:999px;padding:10px 20px;font:inherit;font-weight:700;font-size:16px;color:var(--ink);box-shadow:0 6px 18px rgba(143,107,255,.22);cursor:pointer}
      @media (max-width:820px){#mod-story .stage-col{position:static}.st-write textarea{font-size:16px}}
    `);
    Core.onAuth(()=>{if(!$('mod-story').hidden){drawCloset();if(tab==='cast')drawBody();}});
  }

  /* ---------- the book ---------- */
  const leaves=()=>story.pages.length+2;
  function readPage(){
    const n=leaves(),pic=$('stRPic'),words=$('stRText');
    let svg,txt;
    if(readAt===0){svg=coverSvg(story,'rc');txt=`<b>${escH(story.title||'My Story')}</b>`+(story.author?`<br><span class="by">by ${escH(story.author)}</span>`:'');}
    else if(readAt===n-1){svg=coverSvg(story,'re',true);txt=`<b>The End</b><br><span class="by">Starring ${story.cast.map(c=>escH(c.name)).join(', ')||'everyone'}!</span>`;
      sparkles('stRPic',10);fanfare();Track.hit('story_read');}
    else{const p=story.pages[readAt-1];svg=renderPage(story,p,'rp'+readAt);txt=escH(p.text||'').replace(/\n/g,'<br>')||'<span class="by">(no words on this page)</span>';}
    pic.innerHTML=`<svg class="turn" viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg">${svg}</svg>`;
    words.innerHTML=txt;
    $('stPgNo').textContent=readAt===0?'Cover':readAt===n-1?'The End':`Page ${readAt} of ${n-2}`;
    $('stPrev').disabled=readAt===0;$('stNext').textContent=readAt===n-1?'↺':'▶';
    if(speakOn)speakPage();
  }
  function speakText(){
    if(readAt===0)return `${story.title||'My Story'}.${story.author?' By '+story.author+'.':''}`;
    if(readAt===leaves()-1)return 'The End!';
    const p=story.pages[readAt-1];let t=p.text||'';
    p.chars.forEach(ch=>{if(ch.say){const c=story.cast[ch.c];t+=` ${c?c.name:'Someone'} says: ${ch.say}`;}});
    return t;
  }
  function stopSpeak(){try{speechSynthesis.cancel();}catch(e){}}
  function speakPage(){
    if(!('speechSynthesis' in window)){toast('Reading aloud is not available on this device.');speakOn=false;$('stSpeak').textContent='🔊 Read to me';return;}
    stopSpeak();const u=new SpeechSynthesisUtterance(speakText());u.rate=.9;u.pitch=1.1;speechSynthesis.speak(u);
  }
  function turn(d){
    const n=leaves();
    if(d>0&&readAt===n-1){readAt=0;}else readAt=clamp(readAt+d,0,n-1);
    if(sound)tone(d>0?520:420,0,.12,.05);readPage();
  }
  function openBook(){
    if(!story.pages.some(p=>p.text||p.chars.length)){toast('Add some characters or words to your story first! ✏️');return;}
    readAt=0;$('stRead').classList.add('on');document.body.style.overflow='hidden';jingle();readPage();
  }
  function closeBook(){$('stRead').classList.remove('on');document.body.style.overflow='';stopSpeak();speakOn=false;$('stSpeak').textContent='🔊 Read to me';}

  function show(){
    if(!story){story=newStory();cur=0;}
    /* keep any characters whose cast slot vanished from breaking the page */
    story.pages.forEach(p=>{p.chars=p.chars.filter(ch=>story.cast[ch.c]);p.props=p.props||[];});
    drawAll();drawCloset();$('stText').value=pg().text||'';
  }
  registerStudio({hash:'story-maker',el:'mod-story',emoji:'📖',title:'Story Maker',blurb:'Star your avatars and pets in your own picture book, then read it aloud!',init,show,
    preview:()=>{const s=story||{title:'My Story',cast:defaultCast(),pages:[{scene:'castle',chars:[],props:[]}]};return `<svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${coverSvg(s,'hs')}</svg>`;}});
  return {get story(){return story;},closet,renderPage,coverSvg,IDEAS};
})();

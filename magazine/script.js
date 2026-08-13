/* Immersive 3D reader upgrade. It takes over the reader while preserving the editorial sections below. */
if(false)(()=>{
const count=28,path=n=>`assets/pages/page-${String(n).padStart(2,'0')}.jpg`,key='viaseam-magazine-position';
const valid=n=>n===1||n===28||(n>=2&&n<=26&&n%2===0);let position=Number(localStorage.getItem(key)||1);if(!valid(position))position=1;let animating=false,touchX=0;
const modal=document.createElement('div');modal.className='real-reader';modal.setAttribute('aria-hidden','true');modal.innerHTML='<div class="reader-backdrop" data-reader-close></div><button class="reader-close" type="button" data-reader-close aria-label="关闭杂志">×</button><div class="reader-stage"><button class="reader-arrow reader-prev" type="button" aria-label="上一页">←</button><div class="real-book" tabindex="0"><div class="book-underlay"></div><div class="book-page-stack book-stack-left"></div><div class="book-page-stack book-stack-right"></div><div class="real-page real-page-left"></div><div class="real-page real-page-right"></div><div class="real-spine"></div><div class="flip-sheet"><div class="flip-face flip-front"></div><div class="flip-face flip-back"></div></div></div><button class="reader-arrow reader-next" type="button" aria-label="下一页">→</button></div><div class="reader-footer"><span class="reader-label"></span><span class="reader-help">CLICK SIDES · SCROLL · SWIPE · ARROW KEYS</span><span class="reader-progress"><i></i></span></div>';
document.body.appendChild(modal);const book=modal.querySelector('.real-book'),left=modal.querySelector('.real-page-left'),right=modal.querySelector('.real-page-right'),sheet=modal.querySelector('.flip-sheet');
sheet.insertAdjacentHTML('beforeend',Array.from({length:12},(_,index)=>`<i class="curl-strip" style="--strip:${index}"><b></b><b></b></i>`).join(''));
const markup=n=>n?`<img src="${path(n)}" alt="VIASEAM 杂志第 ${n} 页" draggable="false" decoding="async">`:'';
const pages=n=>n===1?[null,1]:n===28?[28,null]:[n,n+1];
const target=(n,d)=>d>0?(n===1?2:n===26?28:n===28?28:Math.min(26,n+2)):(n===28?26:n===2?1:n===1?1:Math.max(2,n-2));
const save=()=>localStorage.setItem(key,String(position));
const render=()=>{const pair=pages(position);left.innerHTML=markup(pair[0]);right.innerHTML=markup(pair[1]);book.classList.toggle('is-cover',position===1);book.classList.toggle('is-back-cover',position===28);book.classList.toggle('is-open',position!==1&&position!==28);modal.querySelector('.reader-label').textContent=position===1?'FRONT COVER / 01':position===28?'BACK COVER / 28':`P. ${String(position).padStart(2,'0')}–${String(position+1).padStart(2,'0')} / 28`;modal.querySelector('.reader-progress i').style.width=`${Math.max(3,position/count*100)}%`;modal.querySelector('.reader-prev').disabled=position===1;modal.querySelector('.reader-next').disabled=position===28;save()};
const turn=d=>{if(animating)return;const next=target(position,d);if(next===position)return;animating=true;const current=pages(position),incoming=pages(next),front=d>0?(current[1]||current[0]):(current[0]||current[1]),back=d>0?(incoming[0]||incoming[1]):(incoming[1]||incoming[0]);sheet.style.setProperty('--front-page',`url("${path(front)}")`);sheet.style.setProperty('--back-page',`url("${path(back)}")`);sheet.className=`flip-sheet is-flipping is-soft ${d>0?'is-forward':'is-backward'}`;sheet.querySelector('.flip-front').innerHTML='';sheet.querySelector('.flip-back').innerHTML='';book.classList.add('is-turning');setTimeout(()=>{position=next;render();sheet.className='flip-sheet';book.classList.remove('is-turning');animating=false},980)};
const open=()=>{modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');document.documentElement.classList.add('reader-open');render();setTimeout(()=>book.focus({preventScroll:true}),80)};
const close=()=>{modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true');document.documentElement.classList.remove('reader-open');save()};
document.querySelector('#enterButton')?.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();open()},{capture:true});modal.querySelector('.reader-next').addEventListener('click',()=>turn(1));modal.querySelector('.reader-prev').addEventListener('click',()=>turn(-1));modal.querySelectorAll('[data-reader-close]').forEach(x=>x.addEventListener('click',close));modal.querySelector('.reader-backdrop').addEventListener('dblclick',close);book.addEventListener('click',e=>{const r=book.getBoundingClientRect();turn(e.clientX<r.left+r.width/2?-1:1)});book.addEventListener('wheel',e=>{if(Math.abs(e.deltaY)<10)return;e.preventDefault();turn(e.deltaY>0?1:-1)},{passive:false});book.addEventListener('touchstart',e=>touchX=e.changedTouches[0].screenX,{passive:true});book.addEventListener('touchend',e=>{const d=e.changedTouches[0].screenX-touchX;if(Math.abs(d)>35)turn(d<0?1:-1)},{passive:true});document.addEventListener('keydown',e=>{if(!modal.classList.contains('is-open'))return;if(e.key==='ArrowRight')turn(1);if(e.key==='ArrowLeft')turn(-1);if(e.key==='Escape')close()});window.openViaseamReader=open;
})();

const pageCount=28;
const imagePath=n=>`assets/pages/page-${String(n).padStart(2,'0')}.jpg`;
const leftPage=document.querySelector('#leftPage');
const rightPage=document.querySelector('#rightPage');
const turnSheet=document.querySelector('#turnSheet');
const pageLabel=document.querySelector('#pageLabel');
const progressBar=document.querySelector('#progressBar');
let spread=2;
let isAnimating=false;
const loadedPages=new Set();

function preloadPage(n){
  if(n<1||n>pageCount||loadedPages.has(n))return;
  const image=new Image();image.decoding='async';image.src=imagePath(n);loadedPages.add(n);
}
function pageMarkup(n){
  if(n>pageCount)return '';
  preloadPage(n);
  return `<img src="${imagePath(n)}" alt="VIASEAM 杂志第 ${n} 页" loading="eager" decoding="async">`;
}
function renderSpread(){
  leftPage.innerHTML=pageMarkup(spread);
  rightPage.innerHTML=pageMarkup(spread+1);
  preloadPage(spread+2);preloadPage(spread+3);
  pageLabel.textContent=`P. ${String(spread).padStart(2,'0')}—${String(Math.min(spread+1,pageCount)).padStart(2,'0')} / ${pageCount}`;
  progressBar.style.width=`${Math.min(100,((spread+1)/pageCount)*100)}%`;
}
function turn(direction){
  if(isAnimating)return;
  const next=spread+direction*2;
  if(next<2||next>pageCount)return;
  isAnimating=true;preloadPage(next);preloadPage(next+1);
  turnSheet.classList.remove('is-turning');void turnSheet.offsetWidth;
  turnSheet.style.backgroundImage=`url("${imagePath(direction>0?spread+1:spread)}")`;
  turnSheet.style.right=direction>0?'0':'50%';
  turnSheet.style.transformOrigin=direction>0?'left center':'right center';
  turnSheet.classList.add('is-turning');
  setTimeout(()=>{spread=next;renderSpread();turnSheet.classList.remove('is-turning');isAnimating=false},480);
}
function jumpTo(page){const next=Math.max(2,Math.min(pageCount-1,page%2?page-1:page));spread=next;renderSpread();document.querySelector('#magazine').scrollIntoView({behavior:'smooth',block:'start'});}
document.querySelector('#nextButton').addEventListener('click',()=>turn(1));
document.querySelector('#prevButton').addEventListener('click',()=>turn(-1));
document.querySelector('#book').addEventListener('keydown',e=>{if(e.key==='ArrowRight')turn(1);if(e.key==='ArrowLeft')turn(-1)});
document.querySelector('#book').addEventListener('click',e=>{const rect=e.currentTarget.getBoundingClientRect();turn(e.clientX<rect.left+rect.width/2?-1:1)});
let touchStart=0;
document.querySelector('#book').addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].screenX},{passive:true});
document.querySelector('#book').addEventListener('touchend',e=>{const delta=e.changedTouches[0].screenX-touchStart;if(Math.abs(delta)>35)turn(delta<0?1:-1)},{passive:true});
let wheelLocked=false;
document.querySelector('#book').addEventListener('wheel',e=>{if(wheelLocked||Math.abs(e.deltaY)<12)return;e.preventDefault();wheelLocked=true;turn(e.deltaY>0?1:-1);setTimeout(()=>wheelLocked=false,560)},{passive:false});
document.querySelector('#enterButton').addEventListener('click',()=>{document.querySelector('#magazine').classList.remove('is-hidden');document.querySelector('#magazine').scrollIntoView({behavior:'smooth'});document.querySelector('#book').focus({preventScroll:true})});
document.querySelectorAll('[data-jump]').forEach(button=>button.addEventListener('click',()=>document.querySelector(`#${button.dataset.jump}`).scrollIntoView({behavior:'smooth'})));

const looks=[
  {n:'14',image:'assets/looks/look14-studio.png',name:'LOOK 14 · 海滨球场',fabric:'白色轻量面料、浅蓝结构线',detail:'白色结构线条与海蓝路径，呈现轻盈而明确的移动感。'},
  {n:'11',image:'assets/looks/look11-studio.png',name:'LOOK 11 · 海岸高地',fabric:'浅蓝轻量面料、珊瑚色结构线',detail:'明亮的黄色、浅蓝与珊瑚色，把抵达高地的光线收进廓形。'},
  {n:'19',image:'assets/looks/look19-studio.png',name:'LOOK 19 · 日光厅',fabric:'米白面料、深海蓝拼接、透明层次',detail:'不对称结构与透明层次，让身体与海边空气保持连接。'},
  {n:'02',image:'assets/looks/look02-studio.png',name:'LOOK 02 · 海滨抵达',fabric:'米白罗纹面料、深海蓝阔腿裤',detail:'米白背心与深海蓝阔腿裤，构成系列的核心路线造型。'},
  {n:'04',image:'assets/looks/look04-studio.png',name:'LOOK 04 · 泳池俱乐部',fabric:'深海蓝针织、浅蓝轻量裙身',detail:'深海蓝针织与浅蓝裙身，在秩序与松弛之间建立新的平衡。'}
];
const lookGrid=document.querySelector('#lookGrid');
lookGrid.innerHTML=looks.map(look=>`<article class="look-card" tabindex="0" data-look="${look.n}"><div class="look-image"><img src="${look.image}" alt="${look.name}" loading="eager" decoding="async"><span class="look-number">${look.name}</span><div class="look-info"><h3>${look.name}</h3><p><b>面料</b> ${look.fabric}</p><p><b>设计细节</b> ${look.detail}</p></div></div></article>`).join('');
const colorNames={'#d8d5c8':'CLOUD DANCER','#9aacc0':'MISTY BLUE','#c8b79d':'SHIFTING SAND','#355b83':'BLUE RIBBON','#c67b70':'CORAL ROSE'};
document.querySelectorAll('.swatch').forEach(swatch=>swatch.addEventListener('click',()=>{document.querySelectorAll('.swatch').forEach(item=>item.classList.remove('active'));swatch.classList.add('active');const color=swatch.dataset.color;document.querySelector('#looks').style.setProperty('--looks-bg',color);document.querySelector('#colorName').textContent=colorNames[color]||'VIASEAM COLOR'}));
const campaignData=[['assets/campaign/campaign-01-boarding.png','登船 / BEFORE DEPARTURE','清晨码头，两个方向在同一条路线短暂相遇。'],['assets/campaign/campaign-02-same-gate.png','同一扇门 / THE SAME GATE','玻璃连廊与服装线条呼应，风从两个人之间经过。'],['assets/campaign/campaign-03-boarding.png','同行 / BOARDING','衣摆、侧风与水面一起移动，形成共享的十八分钟。'],['assets/campaign/campaign-04-meeting-seam.png','会合缝 / MEETING SEAM','手扶栏杆、包袋与接缝细节，把品牌语言拉近。'],['assets/campaign/campaign-05-arrival.png','抵达 / ARRIVAL','城市岸线逐渐清晰，路线把两个人带向同一处终点。'],['assets/campaign/campaign-06-different-exits.png','分开 / DIFFERENT EXITS','抵岸之后各自走向不同出口，只留下短暂交汇的水纹。']];
document.querySelector('#campaignStory').innerHTML=campaignData.map(item=>`<figure class="campaign-frame"><img src="${item[0]}" alt="${item[1]}" loading="lazy" decoding="async"><figcaption class="campaign-caption"><strong>${item[1]}</strong><span>${item[2]}</span></figcaption></figure>`).join('');
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('is-visible')}),{threshold:.18});document.querySelectorAll('.campaign-frame').forEach(frame=>observer.observe(frame));
document.querySelectorAll('a[download]').forEach(link=>link.remove());
const backHome=document.createElement('a');backHome.className='back-to-viaseam';backHome.href='../';backHome.textContent='← BACK TO VIASEAM';backHome.setAttribute('aria-label','返回 VIASEAM 官网');document.body.appendChild(backHome);
renderSpread();

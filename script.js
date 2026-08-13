const header=document.querySelector('[data-header]');
const menu=document.querySelector('[data-mobile-menu]');
const modal=document.querySelector('[data-modal]');
const closeModal=()=>{if(!modal)return;modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')};
if(header)window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30),{passive:true});
const menuToggle=document.querySelector('[data-menu-toggle]');
if(menuToggle&&menu)menuToggle.addEventListener('click',()=>{menu.classList.add('is-open');menu.setAttribute('aria-hidden','false')});
const menuClose=document.querySelector('[data-menu-close]');
if(menuClose&&menu)menuClose.addEventListener('click',()=>{menu.classList.remove('is-open');menu.setAttribute('aria-hidden','true')});
document.querySelectorAll('[data-mobile-menu] a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('is-open');menu.setAttribute('aria-hidden','true')}));
document.querySelectorAll('[data-unavailable]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();if(modal){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}}));
const modalClose=document.querySelector('[data-modal-close]');
if(modalClose)modalClose.addEventListener('click',closeModal);
if(modal)modal.addEventListener('click',event=>{if(event.target===modal)closeModal()});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.14});
document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));
setTimeout(()=>document.querySelectorAll('.shop-card').forEach((card,index)=>{const number=String(index+1).padStart(2,'0');const link=card.querySelector('a');if(link)link.href=`product.html?look=${number}`}),0);
window.productDescriptions={"01":"米白色上装与轻盈下装组成利落套装。柔和色面平衡清晰结构，让廓形在行走中保持松弛而克制的节奏。","02":"浅黄色上装以轻盈层次打开肩颈线条，细腻褶皱和柔和色彩让造型带有明亮但不喧闹的夏日气息。","03":"浅蓝色上装以轻薄轮廓回应海岸光线，简洁线条与柔和比例形成安静、清透的日常造型。","04":"浅色套装以简洁廓形呈现轻盈秩序，柔和色面和自然垂坠让服装在身体移动时保持流动感。","05":"蓝色上装以清晰肩线和简约结构建立视觉重点，冷静色彩适合与轻盈下装形成利落层次。","06":"蓝色套装将舒展廓形与轻快色彩结合，适合海边、城市和度假空间之间的自由切换。","07":"蓝色上装以简洁比例保留身体活动的余地，柔和面料感和清爽色调让造型显得轻松而高级。","08":"粉色上装以柔和色彩和轻盈层次塑造细腻轮廓，保留女性气质，同时避免过度甜腻。","09":"蓝色套装以清爽色彩和宽松结构构成完整造型，线条简洁，适合从日间空间延伸至傍晚场景。","10":"米白色套装以干净色面和利落比例呈现克制的夏日质感，适合单独穿着，也适合与其他单品叠搭。","11":"蓝色连衣裙以流动线条拉长身体比例，简洁廓形在行走中自然展开，呈现安静而明确的女性气质。","12":"蓝色上装以结构感剪裁回应身体曲线，清爽色调与利落细节让日常造型保持时装感。","13":"米白色连衣裙以柔和色面和轻盈层次构成完整轮廓，细节克制，适合海岸与城市之间的多种场景。","14":"白色连衣裙以清晰线条勾勒身体轮廓，简洁结构中保留轻微的不对称变化，呈现现代而克制的优雅。","15":"浅色连衣裙以轻盈比例和柔和垂坠打造流动感，整体造型清透、安静，适合夏日光线下的自然移动。","16":"粉色上装以柔和色彩和层次结构形成视觉焦点，轻盈轮廓为搭配保留足够空间。","17":"蓝色上装以干净剪裁和冷静色调建立清晰识别，适合与轻薄半裙或宽松裤装组合。","18":"蓝粉色上装将两种柔和色彩置于流动结构之中，色彩关系轻盈而有层次，呈现细腻的度假气质。","19":"蓝粉色套装以半透明层次和轻柔色彩连接身体与空气，裹身结构让造型在行走中产生自然变化。","20":"白色上装以简洁交叠结构修饰身体线条，轻盈比例和干净色面呈现安静、现代的夏日质感。","21":"白色套装以清晰领口和宽松下装建立平衡，轻快线条中融入细节变化，适合日常与度假场景转换。","22":"蓝色套装以不对称结构和利落裤装形成鲜明轮廓，清爽色彩让造型保持理性、轻盈与行动感。","23":"蓝色连衣裙以简洁廓形和流动线条塑造身体比例，低调细节让整体气质保持安静而有力量。","24":"白色上装与蓝粉透明长裹裙构成轻盈套装，层叠裙片和柔和色彩在身体周围形成空气般的流动感。","25":"蓝白条纹交叉上装与蓝色白线阔腿裤形成清晰节奏，海岸感色彩结合流动线条，呈现松弛而鲜明的当代造型。"};setTimeout(()=>{const n=document.querySelector('.detail-info h1');const p=document.querySelector('.detail-info p:not(.eyebrow)');const id=new URLSearchParams(location.search).get('look')||'25';if(n&&p)p.textContent=window.productDescriptions[id]||window.productDescriptions['25']},0);
document.querySelectorAll('a[href="#unavailable"]').forEach(a=>{if(a.textContent.includes('关于 VIASEAM'))a.href='about.html'});
const magazineUrl='magazine/?site=1';document.querySelectorAll('a,button').forEach(el=>{if(el.textContent.includes('互动杂志')){if(el.tagName==='A'){el.href=magazineUrl;el.removeAttribute('target');el.removeAttribute('rel')}else{const replacement=el.cloneNode(true);replacement.removeAttribute('data-unavailable');replacement.addEventListener('click',()=>{location.href=magazineUrl});el.replaceWith(replacement)}}});
if(location.pathname.endsWith('/series.html')){const style=document.createElement('style');style.textContent='.look-gallery{display:none}.special-looks{padding:0 34px 160px}.special-looks h2{font-size:clamp(40px,5vw,78px);font-weight:400;margin:0 0 45px}.special-look-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.special-look-card{position:relative;background:#ddd;overflow:hidden}.special-look-card img{display:block;width:100%;aspect-ratio:3/4;object-fit:cover;transition:transform .7s ease}.special-look-card:hover img{transform:scale(1.035)}.special-look-card div{position:absolute;left:18px;right:18px;bottom:18px;color:#fff;z-index:1}.special-look-card:after{content:"";position:absolute;inset:35% 0 0;background:linear-gradient(transparent,rgba(0,0,0,.5))}.special-look-card h3{font-size:22px;font-weight:400;margin:0 0 7px}.special-look-card p{font-family:var(--sans);font-size:10px;margin:0}@media(max-width:800px){.special-looks{padding:0 20px 100px}.special-look-grid{display:flex;overflow-x:auto;gap:12px}.special-look-card{min-width:78vw}.special-look-card h3{font-size:25px}}';document.head.appendChild(style);const section=document.createElement('section');section.className='special-looks';section.innerHTML='<p class="eyebrow">LOOK02 特殊系列</p><h2>五套造型，独立成章</h2><div class="special-look-grid">'+[['01','抵达海滨','series-look-01.png'],['02','栏杆停留','series-look-02.png'],['03','遮阳棚停留','series-look-03.png'],['04','海风近景','series-look-04.png'],['05','临海收尾','series-look-05.png']].map(x=>`<a class="special-look-card" href="#"><img src="assets/${x[2]}" alt="LOOK02 ${x[1]}"><div><h3>LOOK${x[0]} · ${x[1]}</h3><p>系列造型 · 空间叙事</p></div></a>`).join('')+'</div>';document.querySelector('main').appendChild(section)}
if(location.pathname.endsWith('/series.html')){const models=['series-model-look02.png','series-model-look11.png','series-model-look19.png','series-model-look14.png','series-model-look04.png'];const hero=document.querySelector('.series-hero img');if(hero)hero.src='assets/series-model-look02.png';document.querySelectorAll('.special-look-card img').forEach((img,i)=>{if(models[i]){img.src=`assets/${models[i]}`;img.alt=`LOOK02 特殊系列第${i+1}套正面造型`}})}

/* 系列页：五套特殊系列造型，使用白棚正面模特图，并与项目品牌框架保持一致 */
if(location.pathname.endsWith('/series.html')){
  const models=['series-model-look14.png','series-model-look11.png','series-model-look19.png','series-model-look02.png','series-model-look04.png'];
  const titles=['LOOK14 · 海滨球场','LOOK11 · 海岸高地','LOOK19 · 日光厅','LOOK02 · 海滨抵达','LOOK04 · 泳池俱乐部'];
  const hero=document.querySelector('.series-hero img');
  if(hero){hero.src='assets/series-model-look14.png';hero.alt='VIASEAM 特殊系列正面造型白棚模特图'}
  document.querySelectorAll('.special-look-card').forEach((card,i)=>{
    const img=card.querySelector('img');
    const title=card.querySelector('h3');
    const detail=card.querySelector('p');
    if(models[i]&&img){img.src=`assets/${models[i]}`;img.alt=`${titles[i]} · 正面白棚模特图`}
    if(title)title.textContent=titles[i];
    if(detail)detail.textContent='特殊系列造型 · 正面棚拍';
  });
  const intro=document.querySelector('.series-intro');
  if(intro){
    const heading=intro.querySelector('h2');
    const paragraph=intro.querySelector('p:last-child');
    if(heading)heading.textContent='固定航线，变化水面。';
    if(paragraph)paragraph.textContent='VIASEAM ROUTE 01「循潮而行」从海滨抵达、海岸高地、玻璃日光厅、泳池俱乐部与海滨球场的移动经验出发。系列把稳定的路线与不断变化的光线、风向和同行者，转译为清晰线条、会合缝、轻量层次与可移动的身体结构。它不规定统一的抵达方式，而是在共同空间中保留每个人的节奏与方向。';
  }
  const heroCopy=document.querySelector('.series-hero p:not(.eyebrow)');
  if(heroCopy)heroCopy.textContent='ROUTE 01「循潮而行」——同行一程，各自抵达。';
}

/* 系列页五屏重构：概念、大片、说明、五套造型、结语 */
if(location.pathname.endsWith('/series.html')){
  const oldSeriesParts=document.querySelectorAll('.series-hero,.series-intro,.series-spaces,.look-gallery,.special-looks');
  oldSeriesParts.forEach(part=>part.style.display='none');
  const page=document.createElement('div');
  page.className='series-redesign';
  page.innerHTML=`
    <section id="concept" class="series-screen series-screen-concept">
      <img src="assets/series-concept-route01.png" alt="VIASEAM ROUTE 01 循潮而行系列概念图">
      <div class="series-concept-copy">
        <p class="eyebrow">VIASEAM · ROUTE 01</p>
        <h1>循潮而行</h1>
        <p class="series-slogan">路线不变，水面持续移动。</p>
        <p class="series-slogan-en">THE ROUTE STAYS. THE WATER MOVES.（路线不变，水面持续移动。）</p>
      </div>
      <span class="series-screen-number">01 / 05</span>
    </section>

    <section id="campaign" class="series-screen series-screen-campaign">
      <div class="series-section-heading"><p class="eyebrow">ROUTE 01 · 叙事大片</p><h2>一条路线，三种抵达。</h2><p>从日晒平台到湖蓝吧台，再到玻璃午后，服装跟随身体进入不同空间。</p></div>
      <div class="series-campaign-grid">
        <figure><img src="assets/series-campaign-look02-platform.png" alt="LOOK02 日晒平台大片"><figcaption><span>LOOK02</span><b>日晒平台</b></figcaption></figure>
        <figure><img src="assets/series-campaign-look04-bar.png" alt="LOOK04 湖蓝吧台大片"><figcaption><span>LOOK04</span><b>湖蓝吧台</b></figcaption></figure>
        <figure><img src="assets/series-campaign-look19-sunroom.png" alt="LOOK19 玻璃午后大片"><figcaption><span>LOOK19</span><b>玻璃午后</b></figcaption></figure>
      </div>
      <span class="series-screen-number">02 / 05</span>
    </section>

    <section id="writing" class="series-screen series-screen-writing">
      <div class="series-writing-layout"><p class="eyebrow">ROUTE 01 · 系列说明</p><h2>在共同空间中，保留自己的方向。</h2><div class="series-writing-copy"><p>VIASEAM ROUTE 01「循潮而行」以城市与海岸之间的移动经验为起点。稳定的路线把人带向不同的空间，而光线、风向、距离与同行者始终在变化。</p><p>系列从传统航海服饰的领型、甲板制衣结构、绳索线迹、帆片分割与港口工作服逻辑中提取识别基础，再以春夏轻量面料、城市化比例和当代女性廓形重新组合。保留航海来源，但避免戏服感、民族化符号与过重装饰。</p><p>服装不要求穿着者成为某一种统一形象。清晰的线条组织衣服，可靠的结构回应移动，柔软的空间则保留个人选择。</p></div></div>
      <div class="series-writing-note"><span>SHARE THE ROUTE. ARRIVE YOUR WAY.（同行一程，各自抵达。）</span><i>固定航线 × 变化水面</i></div>
      <span class="series-screen-number">03 / 05</span>
    </section>

    <section id="looks" class="series-screen series-screen-looks">
      <div class="series-section-heading"><p class="eyebrow">ROUTE 01 · 五套系列造型</p><h2>不同造型，相同路线。</h2><p>点击任意造型，查看它在系列中的主推展示。</p></div>
      <div class="series-look-showcase">
        <div class="series-look-feature"><img src="assets/series-model-look02.png" alt="LOOK02 海滨抵达正面造型"><div><span>LOOK02 · 海滨抵达</span><p>米白背心与深海蓝阔腿裤，构成系列的核心路线造型。</p></div></div>
        <div class="series-look-options">
          <button class="series-look-option" data-look="0"><img src="assets/series-model-look14.png" alt="LOOK14 海滨球场"><span>LOOK14 · 海滨球场</span></button>
          <button class="series-look-option" data-look="1"><img src="assets/series-model-look11.png" alt="LOOK11 海岸高地"><span>LOOK11 · 海岸高地</span></button>
          <button class="series-look-option is-active is-current" data-look="2"><img src="assets/series-model-look02.png" alt="LOOK02 海滨抵达"><span>LOOK02 · 海滨抵达</span></button>
          <button class="series-look-option" data-look="3"><img src="assets/series-model-look19.png" alt="LOOK19 日光厅"><span>LOOK19 · 日光厅</span></button>
          <button class="series-look-option" data-look="4"><img src="assets/series-model-look04.png" alt="LOOK04 泳池俱乐部"><span>LOOK04 · 泳池俱乐部</span></button>
        </div>
      </div>
      <span class="series-screen-number">04 / 05</span>
    </section>

    <section id="ending" class="series-screen series-screen-ending">
      <div><p class="eyebrow">VIASEAM · ROUTE 01</p><h2>同行一程，各自抵达。</h2><p>真正连接我们的，从来不是相同的终点，而是愿意共同经过的一程。</p><a href="shop.html" class="text-link">进入现售商品（查看现售商品） <span>→</span></a></div>
      <span class="series-screen-number">05 / 05</span>
    </section>`;
  document.querySelector('main').appendChild(page);

  const lookData=[
    ['series-model-look14.png','LOOK14 · 海滨球场','白色结构线条与海蓝路径，呈现轻盈而明确的移动感。'],
    ['series-model-look11.png','LOOK11 · 海岸高地','明亮的黄色、浅蓝与珊瑚色，把抵达高地的光线收进廓形。'],
    ['series-model-look02.png','LOOK02 · 海滨抵达','米白背心与深海蓝阔腿裤，构成系列的核心路线造型。'],
    ['series-model-look19.png','LOOK19 · 日光厅','不对称结构与透明层次，让身体与海边空气保持连接。'],
    ['series-model-look04.png','LOOK04 · 泳池俱乐部','深海蓝针织与浅蓝裙身，在秩序与松弛之间建立新的平衡。']
  ];
  const feature=page.querySelector('.series-look-feature');
  const options=page.querySelectorAll('.series-look-option');
  options.forEach((option,index)=>option.addEventListener('click',()=>{
    const item=lookData[index];
    feature.classList.add('is-changing');
    setTimeout(()=>{feature.querySelector('img').src=`assets/${item[0]}`;feature.querySelector('img').alt=item[1];feature.querySelector('span').textContent=item[1];feature.querySelector('p').textContent=item[2];feature.classList.remove('is-changing')},180);
    options.forEach(button=>{button.classList.remove('is-active');button.classList.remove('is-current')});option.classList.add('is-active');option.classList.add('is-current');
  }));

  const layoutStyle=document.createElement('style');
  layoutStyle.textContent=`.series-redesign{background:var(--paper);color:var(--ink)}.series-screen{position:relative;min-height:100svh;padding:clamp(90px,10vw,150px) clamp(20px,5vw,80px);display:flex;flex-direction:column;justify-content:center;overflow:hidden}.series-screen-number{position:absolute;right:clamp(20px,5vw,80px);bottom:28px;font:10px var(--sans);letter-spacing:.14em;color:var(--muted)}.series-screen-concept{min-height:100svh;padding:0;justify-content:flex-end;background:#d8c5bd}.series-screen-concept>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.series-screen-concept:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(25,22,20,.42),transparent 65%)}.series-concept-copy{position:relative;z-index:1;color:#fff;padding:clamp(30px,8vw,120px);max-width:650px}.series-concept-copy h1{font-size:clamp(64px,11vw,170px);font-weight:400;letter-spacing:.04em;margin:8px 0 20px}.series-slogan{font-size:clamp(22px,3vw,38px);margin:0 0 16px}.series-slogan-en{font:11px var(--sans);letter-spacing:.1em;line-height:1.8;margin:0}.series-section-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:40px;margin-bottom:48px}.series-section-heading h2{font-size:clamp(36px,5vw,72px);font-weight:400;margin:8px 0 0}.series-section-heading>p:last-child{max-width:290px;font-size:14px;line-height:1.9;margin:0}.series-campaign-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.series-campaign-grid figure{margin:0;position:relative;overflow:hidden;background:#ddd}.series-campaign-grid img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;transition:transform .8s ease}.series-campaign-grid figure:hover img{transform:scale(1.03)}.series-campaign-grid figcaption{position:absolute;left:20px;bottom:20px;color:#fff;display:flex;flex-direction:column;gap:5px;text-shadow:0 1px 8px rgba(0,0,0,.25)}.series-campaign-grid figcaption span{font:10px var(--sans);letter-spacing:.14em}.series-campaign-grid figcaption b{font-size:23px;font-weight:400}.series-screen-writing{background:var(--rose)}.series-writing-layout{display:grid;grid-template-columns:1fr 1.25fr;gap:clamp(50px,10vw,180px);align-items:start}.series-writing-layout h2{font-size:clamp(42px,6vw,90px);line-height:1.12;font-weight:400;margin:20px 0 0}.series-writing-copy{font-size:16px;line-height:2.1;max-width:650px;padding-top:20px}.series-writing-copy p{margin:0 0 22px}.series-writing-note{border-top:1px solid rgba(32,42,45,.3);margin-top:90px;padding-top:18px;display:flex;justify-content:space-between;gap:30px;font:11px var(--sans);letter-spacing:.08em}.series-writing-note i{font-style:normal}.series-look-showcase{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(260px,.85fr);gap:22px;align-items:start}.series-look-feature{background:#fff;position:relative;transition:opacity .35s ease,transform .35s ease}.series-look-feature.is-changing{opacity:.25;transform:scale(.985)}.series-look-feature img{display:block;width:100%;height:min(66vh,760px);object-fit:cover}.series-look-feature>div{padding:20px 22px 24px}.series-look-feature span{font-size:22px}.series-look-feature p{font:12px var(--sans);color:var(--muted);margin:8px 0 0}.series-look-options{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.series-look-option{padding:0;text-align:left;background:#fff;position:relative;overflow:hidden;opacity:.7;transition:opacity .35s ease,transform .35s ease}.series-look-option:hover,.series-look-option.is-active{opacity:1;transform:translateY(-4px)}.series-look-option img{display:block;width:100%;aspect-ratio:3/4;object-fit:cover}.series-look-option span{display:block;padding:11px 12px 13px;font-size:13px}.series-screen-ending{min-height:70svh;background:var(--ink);color:#f8f7f3;align-items:center;text-align:center}.series-screen-ending h2{font-size:clamp(48px,8vw,120px);font-weight:400;margin:24px 0}.series-screen-ending p:not(.eyebrow){font-size:16px;line-height:1.9;margin:0 auto 34px}.series-screen-ending .text-link{border-bottom:1px solid currentColor;padding-bottom:7px;font:11px var(--sans);letter-spacing:.08em}.series-screen-ending .series-screen-number{color:rgba(248,247,243,.6)}@media(max-width:800px){.series-section-heading{display:block;margin-bottom:28px}.series-section-heading>p:last-child{margin-top:18px}.series-campaign-grid{grid-template-columns:1fr;gap:12px}.series-campaign-grid img{aspect-ratio:4/5}.series-writing-layout{grid-template-columns:1fr;gap:20px}.series-writing-copy{padding-top:0}.series-writing-note{margin-top:45px;display:block;line-height:1.8}.series-writing-note i{display:block;margin-top:10px}.series-look-showcase{grid-template-columns:1fr}.series-look-feature img{height:auto;aspect-ratio:3/4}.series-look-options{grid-template-columns:repeat(2,1fr)}.series-look-option:last-child{grid-column:span 2}.series-screen{min-height:auto;padding-top:100px;padding-bottom:100px}.series-screen-concept{min-height:100svh;padding-bottom:0}.series-concept-copy{padding:30px 24px 80px}.series-concept-copy h1{font-size:68px}.series-screen-ending{min-height:80svh}}`;
  document.head.appendChild(layoutStyle);
  const lookInteractionStyle=document.createElement('style');
  lookInteractionStyle.textContent='.series-look-option.is-current{display:none}.series-look-options{align-content:start}.series-look-option.is-active{outline:1px solid var(--ink);outline-offset:3px}';
  document.head.appendChild(lookInteractionStyle);
}

/* 桌面端导航悬停展开：系列、商品、品牌信息分别显示二级入口 */
const desktopNav=document.querySelector('.desktop-nav');
if(desktopNav&&!desktopNav.dataset.dropdownReady){
  desktopNav.dataset.dropdownReady='true';
  const dropdowns={
    'series.html':[['系列概念','series.html#concept'],['三张叙事大片','series.html#campaign'],['完整系列说明','series.html#writing'],['五套系列造型','series.html#looks'],['系列结语','series.html#ending']],
    'shop.html':[['全部现售商品','shop.html'],['套装系列','shop.html#sets'],['上装','shop.html#tops'],['下装','shop.html#bottoms']],
    'about.html':[['品牌理念','about.html'],['互动杂志','https://fannnqie.github.io/viaseam-magazine/'],['服务与帮助','about.html#unavailable']]
  };
  desktopNav.querySelectorAll('a').forEach(link=>{
    const key=Object.keys(dropdowns).find(item=>link.getAttribute('href')?.endsWith(item));
    if(!key)return;
    const wrap=document.createElement('div');wrap.className='desktop-nav-item';link.parentNode.insertBefore(wrap,link);wrap.appendChild(link);
    const panel=document.createElement('div');panel.className='desktop-nav-dropdown';
    panel.innerHTML=`<div class="desktop-dropdown-label">${key==='series.html'?'系列导航':key==='shop.html'?'商品导航':'品牌导航'}</div><div class="desktop-dropdown-links">${dropdowns[key].map(item=>`<a href="${item[1]}">${item[0]}</a>`).join('')}</div>`;wrap.appendChild(panel);
  });
  const navStyle=document.createElement('style');
  navStyle.textContent='.desktop-nav-item{position:relative;height:100%;display:flex;align-items:center}.desktop-nav-item>a{display:flex;align-items:center;height:100%}.desktop-nav-dropdown{position:absolute;top:calc(100% + 16px);left:50%;min-width:190px;padding:16px 18px;background:rgba(248,247,243,.98);border:1px solid var(--line);box-shadow:0 18px 40px rgba(32,42,45,.1);opacity:0;visibility:hidden;transform:translate(-50%,-8px);transition:opacity .25s ease,transform .25s ease,visibility .25s ease;z-index:30}.desktop-nav-dropdown:before{content:"";position:absolute;left:0;right:0;top:-17px;height:17px}.desktop-nav-item:hover .desktop-nav-dropdown,.desktop-nav-item:focus-within .desktop-nav-dropdown{opacity:1;visibility:visible;transform:translate(-50%,0)}.desktop-nav-dropdown a{display:block;padding:9px 0;font-size:13px;white-space:nowrap;border-bottom:1px solid transparent}.desktop-nav-dropdown a:hover{border-bottom-color:currentColor}.desktop-nav-dropdown a:after{display:none}@media(max-width:800px){.desktop-nav-dropdown{display:none}}';
  document.head.appendChild(navStyle);
  const navPremiumStyle=document.createElement('style');
  navPremiumStyle.textContent='.desktop-nav-dropdown{position:fixed;top:76px;left:0;width:100vw;min-width:0;padding:30px clamp(28px,6vw,96px);border:0;border-top:1px solid var(--line);box-shadow:0 22px 42px rgba(32,42,45,.12);transform:translateY(-12px);background:rgba(248,247,243,.98)}.desktop-nav-item:hover .desktop-nav-dropdown,.desktop-nav-item:focus-within .desktop-nav-dropdown{transform:translateY(0)}.desktop-dropdown-label{font-family:var(--serif);font-size:22px;margin-bottom:18px}.desktop-dropdown-links{display:grid;grid-template-columns:repeat(4,minmax(150px,1fr));gap:0 40px;max-width:1000px}.desktop-dropdown-links a{padding:8px 0;font-size:13px}.desktop-nav-item>a:before{content:"";position:absolute;left:0;right:0;bottom:16px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:right;transition:transform .3s ease}.desktop-nav-item:hover>a:before,.desktop-nav-item:focus-within>a:before{transform:scaleX(1);transform-origin:left}@media(max-width:800px){.desktop-nav-dropdown{display:none}}';
  document.head.appendChild(navPremiumStyle);
}

/* 系列页滚动互动：进入视口时依次显现，动画保持轻量并支持减少动态效果设置 */
if(location.pathname.endsWith('/series.html')){
  const motionStyle=document.createElement('style');
  motionStyle.textContent='.special-looks{padding-top:clamp(56px,8vw,120px)}.special-look-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}.special-look-card{min-height:520px;opacity:0;transform:translateY(42px) scale(.97);transition:opacity 1s ease,transform 1.05s cubic-bezier(.22,.61,.36,1)}.special-look-card.is-visible{opacity:1;transform:translateY(0) scale(1)}.special-look-card:nth-child(2){transition-delay:.1s}.special-look-card:nth-child(3){transition-delay:.2s}.special-look-card:nth-child(4){transition-delay:.3s}.special-look-card:nth-child(5){transition-delay:.4s}.special-look-card img{height:100%;min-height:520px;object-fit:cover}.series-intro{transition:opacity 1s ease,transform 1s ease}.series-intro.series-reveal-ready{opacity:0;transform:translateY(28px)}.series-intro.series-reveal-ready.is-visible{opacity:1;transform:translateY(0)}@media(max-width:800px){.special-look-grid{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:14px}.special-look-card{min-width:82vw;min-height:560px;scroll-snap-align:start}.special-look-card img{min-height:560px}}@media(prefers-reduced-motion:reduce){.special-look-card,.series-intro{transition:none!important;transform:none!important;opacity:1!important}}';
  document.head.appendChild(motionStyle);
  const cards=[...document.querySelectorAll('.special-look-card')];
  const intro=document.querySelector('.series-intro');
  if(intro)intro.classList.add('series-reveal-ready');
  const seriesObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');seriesObserver.unobserve(entry.target)}
  }),{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  cards.forEach(card=>seriesObserver.observe(card));
  if(intro)seriesObserver.observe(intro);
}

if(location.pathname.endsWith('/series.html')){
  const currentLook=document.querySelector('.series-look-option.is-current');
  if(currentLook)currentLook.setAttribute('aria-current','true');
  document.querySelectorAll('.series-screen').forEach((screen,index)=>screen.dataset.screen=index+1);
}

/* 商品与购物袋：补充下装单品，并提供本地购物袋演示功能 */
const cartKey='viaseam-cart';
const readCart=()=>{try{return JSON.parse(localStorage.getItem(cartKey)||'[]')}catch(error){return[]}};
const writeCart=cart=>{localStorage.setItem(cartKey,JSON.stringify(cart));updateCartBadge();showCartToast(cart.length)};
const updateCartBadge=()=>{
  const count=readCart().length;
  document.querySelectorAll('.cart-count').forEach(badge=>badge.textContent=count);
  document.querySelectorAll('[data-cart]').forEach(button=>{button.setAttribute('aria-label',`购物袋 ${count} 件`)});
};
const showCartToast=count=>{
  let toast=document.querySelector('.cart-toast');
  if(!toast){toast=document.createElement('div');toast.className='cart-toast';document.body.appendChild(toast)}
  toast.textContent=`已加入购物袋 · 当前 ${count} 件 · 价格 XXX`;
  toast.classList.add('is-visible');
  clearTimeout(window.viaseamToastTimer);window.viaseamToastTimer=setTimeout(()=>toast.classList.remove('is-visible'),2400);
};
const addCartButton=(container,id,name)=>{
  if(!container||container.querySelector('[data-add-cart]'))return;
  const button=document.createElement('button');button.type='button';button.className='add-cart-button';button.dataset.addCart='true';button.dataset.productId=id;button.dataset.productName=name;button.textContent='加入购物袋 · XXX';container.appendChild(button);
};
const decorateShopCards=()=>document.querySelectorAll('.shop-card').forEach(card=>{
  const detail=card.querySelector('a');
  if(detail)addCartButton(card,detail.href.match(/look=(\d+)/)?.[1]||card.dataset.cat||'product',card.querySelector('h2')?.textContent||'VIASEAM 商品');
});
const decorateProduct=()=>{
  const info=document.querySelector('.detail-info');
  if(info)addCartButton(info,new URLSearchParams(location.search).get('look')||'25',document.querySelector('[data-name]')?.textContent||'VIASEAM 商品');
};
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-add-cart]');
  if(button){const cart=readCart();cart.push({id:button.dataset.productId,name:button.dataset.productName,price:'XXX'});writeCart(cart);button.textContent='已加入购物袋 · XXX';setTimeout(()=>button.textContent='加入购物袋 · XXX',1800);return}
  const cartButton=event.target.closest('[data-cart]');
  if(cartButton){event.preventDefault();showCartToast(readCart().length)}
});
setTimeout(()=>{
  const bagButton=document.querySelector('.header-actions button:last-of-type');
  if(bagButton){bagButton.dataset.cart='true';bagButton.innerHTML='□<span class="cart-count">0</span>'}
  const grid=document.querySelector('[data-shop-grid]');
  if(grid){
    const bottoms=[['02B','look-02-bottom-front-white.png','深海蓝下装','下装'],['03B','look-03-bottom-front-white.png','浅蓝下装','下装'],['04B','look-04-bottom-front-white.png','浅色下装','下装'],['05B','look-05-bottom-front-white.png','蓝色下装','下装'],['07B','look-07-bottom-front-white.png','蓝色阔腿裤','下装'],['12B','look-12-bottom-front-white.png','蓝色下装','下装'],['16B','look-16-bottom-front-white.png','粉色下装','下装'],['18B','look-18-bottom-front-white.png','蓝粉下装','下装']];
    const addBottoms=()=>{if(!document.querySelector('.bottom-product-card'))bottoms.forEach(item=>{const article=document.createElement('article');article.className='shop-card reveal bottom-product-card';article.dataset.cat='下装';article.innerHTML=`<div class="product-image"><img src="assets/products/${item[1]}" alt="${item[2]}"></div><h2>${item[2]}</h2><p>现售下装 · XXX</p><a href="product.html?look=${item[0].replace('B','')}">查看详情</a>`;grid.appendChild(article)})};
    const observer=new MutationObserver(()=>{decorateShopCards();const activeFilter=document.querySelector('[data-filter].is-active')?.dataset.filter;if(activeFilter==='all'||activeFilter==='下装')addBottoms()});observer.observe(grid,{childList:true});addBottoms();decorateShopCards();
  }
  decorateProduct();updateCartBadge();
},0);
const cartStyle=document.createElement('style');
cartStyle.textContent='.series-look-feature img{object-fit:contain!important;background:var(--paper);height:min(78vh,900px)!important}.series-look-feature{background:var(--paper)}.add-cart-button{display:block;width:100%;margin-top:18px;padding:14px 0;border:1px solid var(--ink);font-family:var(--sans);font-size:11px;letter-spacing:.08em;background:transparent;transition:background .25s ease,color .25s ease}.add-cart-button:hover{background:var(--ink);color:var(--paper)}.cart-count{display:inline-grid;place-items:center;min-width:15px;height:15px;margin-left:3px;border-radius:50%;background:var(--ink);color:var(--paper);font:9px var(--sans);vertical-align:top}.cart-toast{position:fixed;right:24px;bottom:24px;z-index:50;padding:14px 18px;background:var(--ink);color:var(--paper);font:11px var(--sans);letter-spacing:.04em;opacity:0;transform:translateY(10px);pointer-events:none;transition:opacity .25s ease,transform .25s ease}.cart-toast.is-visible{opacity:1;transform:translateY(0)}@media(max-width:800px){.series-look-feature img{height:auto!important;aspect-ratio:3/4}.cart-toast{left:20px;right:20px;bottom:20px;text-align:center}}';
document.head.appendChild(cartStyle);

/* 购物袋侧边面板 */
const createCartDrawer=()=>{
  if(document.querySelector('.cart-drawer'))return document.querySelector('.cart-drawer');
  const drawer=document.createElement('aside');drawer.className='cart-drawer';drawer.setAttribute('aria-hidden','true');
  drawer.innerHTML='<div class="cart-drawer-backdrop" data-cart-close></div><div class="cart-drawer-panel"><div class="cart-drawer-head"><h2>购物袋</h2><button type="button" data-cart-close aria-label="关闭购物袋">×</button></div><div class="cart-drawer-items"></div><div class="cart-drawer-foot"><div><span>合计</span><strong>XXX</strong></div><button type="button" class="cart-checkout" data-unavailable>去支付 · XXX</button><button type="button" class="cart-continue" data-cart-close>继续浏览</button></div></div>';
  document.body.appendChild(drawer);
  const checkout=drawer.querySelector('[data-unavailable]');
  if(checkout)checkout.addEventListener('click',event=>{event.preventDefault();if(modal){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}});
  return drawer;
};
const renderCartDrawer=()=>{
  const drawer=createCartDrawer();const list=drawer.querySelector('.cart-drawer-items');const cart=readCart();
  list.innerHTML=cart.length?cart.map((item,index)=>`<div class="cart-drawer-item"><div><span>${String(index+1).padStart(2,'0')}</span><p>${item.name}</p><small>价格 ${item.price}</small></div><button type="button" data-remove-cart="${index}">移除</button></div>`).join(''):'<p class="cart-empty">购物袋暂时为空。</p>';
  list.querySelectorAll('[data-remove-cart]').forEach(button=>button.addEventListener('click',()=>{const next=readCart();next.splice(Number(button.dataset.removeCart),1);writeCart(next);renderCartDrawer()}));
  drawer.classList.add('is-open');drawer.setAttribute('aria-hidden','false');
};
document.addEventListener('click',event=>{
  if(event.target.closest('[data-cart]')){event.preventDefault();renderCartDrawer()}
  const close=event.target.closest('[data-cart-close]');if(close){const drawer=document.querySelector('.cart-drawer');if(drawer){drawer.classList.remove('is-open');drawer.setAttribute('aria-hidden','true')}}
});
const drawerStyle=document.createElement('style');
drawerStyle.textContent='.cart-drawer{position:fixed;inset:0;z-index:60;visibility:hidden;pointer-events:none}.cart-drawer.is-open{visibility:visible;pointer-events:auto}.cart-drawer-backdrop{position:absolute;inset:0;background:rgba(32,42,45,.18);opacity:0;transition:opacity .3s ease}.cart-drawer-panel{position:absolute;right:0;top:0;height:100%;width:min(440px,92vw);background:var(--paper);padding:28px 28px 24px;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .4s cubic-bezier(.22,.61,.36,1);box-shadow:-18px 0 50px rgba(32,42,45,.12)}.cart-drawer.is-open .cart-drawer-backdrop{opacity:1}.cart-drawer.is-open .cart-drawer-panel{transform:translateX(0)}.cart-drawer-head{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:20px}.cart-drawer-head h2{font-size:30px;font-weight:400;margin:0}.cart-drawer-head button{font-size:28px;font-weight:300}.cart-drawer-items{flex:1;overflow:auto;padding:16px 0}.cart-drawer-item{display:flex;justify-content:space-between;gap:18px;padding:18px 0;border-bottom:1px solid var(--line)}.cart-drawer-item div{display:grid;grid-template-columns:28px 1fr;column-gap:10px}.cart-drawer-item span{font:10px var(--sans);color:var(--muted)}.cart-drawer-item p{font-size:16px;margin:0}.cart-drawer-item small{grid-column:2;font:10px var(--sans);color:var(--muted);margin-top:8px}.cart-drawer-item button{font:10px var(--sans);color:var(--muted);align-self:start;border-bottom:1px solid var(--muted)}.cart-empty{font-size:15px;color:var(--muted);padding-top:20px}.cart-drawer-foot{border-top:1px solid var(--line);padding-top:18px}.cart-drawer-foot>div{display:flex;justify-content:space-between;font:12px var(--sans);margin-bottom:16px}.cart-drawer-foot strong{font-weight:400}.cart-checkout,.cart-continue{width:100%;padding:14px;margin-top:8px;font:11px var(--sans);letter-spacing:.06em}.cart-checkout{background:var(--ink);color:var(--paper)}.cart-continue{border:1px solid var(--ink)}@media(max-width:800px){.cart-drawer-panel{padding:24px 20px 20px}}';
document.head.appendChild(drawerStyle);

/* 图片性能收尾：首屏保留即时加载，其余图片交给浏览器按需加载 */
const optimizeImages=()=>document.querySelectorAll('img').forEach((image,index)=>{
  image.decoding='async';
  if(index>1&&!image.loading)image.loading='lazy';
});
setTimeout(optimizeImages,0);

/* LOOK NOW：官网导航中的当日天气编辑 */
const addLookNowNavigation=()=>{
  const addLink=(nav,href)=>{
    if(!nav||nav.querySelector(`[href="${href}"]`))return;
    const link=document.createElement('a');
    link.href=href;
    link.textContent='LOOK NOW';
    nav.appendChild(link);
  };
  addLink(document.querySelector('.desktop-nav'),'look-now.html');
  addLink(document.querySelector('.mobile-menu nav'),'look-now.html');
};

const createLookNowSection=()=>{
  if(document.querySelector('#look-now'))return document.querySelector('#look-now');
  const magazine=document.querySelector('#magazine');
  if(!magazine)return null;
  const section=document.createElement('section');
  section.className='look-now-section reveal';
  section.id='look-now';
  section.innerHTML=`
    <div class="section-heading">
      <div>
        <p class="eyebrow">WEATHER EDIT / VIASEAM</p>
        <h2>LOOK NOW <em>Today's edit</em></h2>
      </div>
      <p class="section-intro">根据当日气象，从 VIASEAM 现售款中选择适合此刻的造型。</p>
    </div>
    <div class="look-now-panel" id="lookNowPanel" aria-live="polite">
      <p class="look-now-status">正在读取上海天气……</p>
    </div>
  `;
  magazine.parentNode.insertBefore(section,magazine);
  return section;
};

const lookNowProducts=[
  ['01','look-01-product-front.png','米白套装','套装',[15,27],['城市漫游','日常通勤'],['轻薄','结构感']],
  ['02','look-02-top-front-white.png','浅黄上装','上装',[19,30],['城市漫游','海滨度假'],['轻量','明亮']],
  ['03','look-03-top-front-white.png','浅蓝上装','上装',[18,29],['城市漫游','日常通勤'],['轻薄','清爽']],
  ['04','look-04-top-front-white.png','浅色套装','套装',[18,28],['日常通勤','城市漫游'],['利落','轻量']],
  ['05','look-05-top-front-white.png','蓝色上装','上装',[16,27],['城市漫游','夜间出行'],['简洁','结构感']],
  ['06','look-06-top-front-white.png','蓝色套装','套装',[16,27],['海滨度假','城市漫游'],['轻风','移动感']],
  ['07','look-07-top-front-white.png','蓝色上装','上装',[16,26],['日常通勤','城市漫游'],['清爽','轻薄']],
  ['08','look-08-top-front-white.png','粉色上装','上装',[20,30],['海滨度假','夜间出行'],['柔和','轻量']],
  ['09','look-09-top-front-white.png','蓝色套装','套装',[17,28],['城市漫游','夜间出行'],['利落','层次']],
  ['10','look-10-product-front.png','米白套装','套装',[18,29],['日常通勤','海滨度假'],['干净','轻量']],
  ['11','look-11-dress-front-white.png','蓝色连衣裙','连衣裙',[21,31],['海滨度假','夜间出行'],['流动','轻盈']],
  ['12','look-12-top-front-white.png','蓝色上装','上装',[17,27],['日常通勤','城市漫游'],['结构感','清爽']],
  ['13','look-13-dress-front-white.png','米白连衣裙','连衣裙',[20,31],['海滨度假','城市漫游'],['轻盈','柔和']],
  ['14','look-14-dress-front-white.png','白色连衣裙','连衣裙',[21,32],['海滨度假','夜间出行'],['清晰','轻量']],
  ['15','look-15-dress-front-white.png','浅色连衣裙','连衣裙',[20,31],['海滨度假','城市漫游'],['流动','轻薄']],
  ['16','look-16-top-front-white.png','粉色上装','上装',[19,29],['夜间出行','城市漫游'],['雾粉','层次']],
  ['17','look-17-top-front-white.png','蓝色上装','上装',[16,27],['日常通勤','夜间出行'],['利落','清爽']],
  ['18','look-18-top-front-white.png','蓝粉上装','上装',[18,29],['夜间出行','海滨度假'],['柔和','层次']],
  ['19','look-19-top-back-white.png','蓝粉套装','套装',[18,28],['夜间出行','城市漫游'],['层次','轻风']],
  ['20','look-20-top-back-white.png','白色上装','上装',[18,29],['日常通勤','城市漫游'],['干净','轻量']],
  ['21','look-21-top-back-white.png','白色套装','套装',[17,28],['日常通勤','海滨度假'],['清晰','轻风']],
  ['22','look-22-product-front.png','蓝色套装','套装',[16,27],['城市漫游','日常通勤'],['利落','结构感']],
  ['23','look-23-product-front.png','蓝色连衣裙','连衣裙',[19,30],['夜间出行','海滨度假'],['流动','深蓝']],
  ['24','look-24-top-back-white.png','白色套装','套装',[18,29],['海滨度假','城市漫游'],['轻盈','层次']],
  ['25','look-25-top-back-white.png','蓝白条纹上装','上装',[17,28],['城市漫游','海滨度假'],['航线','轻风']]
].map(([id,image,name,category,temperature,scenes,tags])=>({id,image,name,category,temperature,scenes,tags}));

let lookNowWeather=null;
let lookNowScene='城市漫游';
let lookNowLocation={id:'101020100',name:'上海'};
let lookNowLead=null;
const savedLookKey='viaseam-look-list';

const readSavedLooks=()=>{try{return JSON.parse(localStorage.getItem(savedLookKey)||'[]')}catch(error){return[]}};
const writeSavedLooks=looks=>localStorage.setItem(savedLookKey,JSON.stringify(looks));
const getSavedLookSignature=lead=>`${lead.id}|${lookNowLocation.name}|${lookNowScene}|${lookNowWeather?.obsTime||''}`;

const renderSavedLooks=()=>{
  const grid=document.querySelector('[data-look-now-saved]');
  if(!grid)return;
  const looks=readSavedLooks();
  if(!looks.length){
    grid.innerHTML='<p class="look-list-empty">还没有收藏。当天气、地点和场景刚好相遇时，把这一套留在这里。</p>';
    return;
  }
  grid.innerHTML=looks.slice().reverse().map(look=>`
    <article class="look-list-card">
      <a href="product.html?look=${look.product.id}"><img src="assets/products/${look.product.image}" alt="${look.product.name}"></a>
      <div>
        <span>${look.location} / ${look.scene}</span>
        <h3>${look.product.name}</h3>
        <p>${look.weatherText} · ${look.temperature}°C</p>
        <button type="button" data-remove-saved-look="${look.signature}">移除收藏</button>
      </div>
    </article>
  `).join('');
};

const saveCurrentLook=()=>{
  if(!lookNowLead||!lookNowWeather)return;
  const signature=getSavedLookSignature(lookNowLead);
  const looks=readSavedLooks();
  const index=looks.findIndex(look=>look.signature===signature);
  if(index>=0){
    looks.splice(index,1);
  }else{
    looks.push({
      signature,
      product:{id:lookNowLead.id,image:lookNowLead.image,name:lookNowLead.name},
      location:lookNowLocation.name,
      scene:lookNowScene,
      weatherText:lookNowWeather.text,
      temperature:lookNowWeather.temp,
      savedAt:new Date().toISOString()
    });
  }
  writeSavedLooks(looks);
  renderLookNowRecommendations();
  renderSavedLooks();
};

const scoreLookNowProduct=product=>{
  if(!lookNowWeather)return 0;
  const temperature=Number(lookNowWeather.temp);
  const [min,max]=product.temperature;
  const temperatureScore=temperature>=min&&temperature<=max?5:Math.max(0,3-Math.min(Math.abs(temperature-min),Math.abs(temperature-max)));
  const sceneScore=product.scenes.includes(lookNowScene)?5:0;
  const windScore=Number(lookNowWeather.windSpeed)>=18&&product.tags.includes('轻风')?3:0;
  const weatherScore=/雨|雪|雾/.test(lookNowWeather.text)&&product.category==='套装'?2:1;
  return temperatureScore+sceneScore+windScore+weatherScore;
};

const getLookNowNarrative=()=>{
  if(!lookNowWeather)return '';
  const temperature=Number(lookNowWeather.temp);
  const wind=Number(lookNowWeather.windSpeed);
  if(/雨|雪|雾/.test(lookNowWeather.text))return '天气正在改变，完整的轮廓让今天的移动保持从容。';
  if(wind>=18)return '风感明显，保留完整轮廓，让服装在移动中仍然稳定。';
  if(temperature>=28)return '温度升高，减少负担，让面料和身体之间留出空气。';
  if(temperature<=16)return '温度尚未完全升起，用完整造型保留轻薄而清晰的层次。';
  return '温度刚好，选择一套能从空间自然过渡到下一段路线的造型。';
};

const renderLookNowRecommendations=()=>{
  const grid=document.querySelector('[data-look-now-recommendations]');
  const outfit=document.querySelector('[data-look-now-outfit]');
  if(!grid||!lookNowWeather)return;
  const ranked=[...lookNowProducts].map(product=>({...product,score:scoreLookNowProduct(product)})).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
  const lead=ranked.find(product=>product.category==='套装'||product.category==='连衣裙')||ranked[0];
  lookNowLead=lead;
  const products=ranked.filter(product=>product.id!==lead.id).slice(0,3);
  const isSaved=readSavedLooks().some(look=>look.signature===getSavedLookSignature(lead));
  if(outfit)outfit.innerHTML=`
    <div class="look-now-outfit-copy">
      <p class="eyebrow">TODAY'S COMPLETE LOOK / ${lookNowScene}</p>
      <h2>${lead.name}</h2>
      <p>${getLookNowNarrative()}</p>
      <div><span>${lead.category}</span><span>${lead.tags.join(' · ')}</span></div>
      <div class="look-now-outfit-actions">
        <a href="product.html?look=${lead.id}">查看完整造型 <b>→</b></a>
        <button type="button" data-save-look aria-pressed="${isSaved}">${isSaved?'已收藏 · 移除':'收藏此套造型'} <span>${isSaved?'−':'+'}</span></button>
      </div>
    </div>
    <a class="look-now-outfit-image" href="product.html?look=${lead.id}"><img src="assets/products/${lead.image}" alt="${lead.name}"></a>
  `;
  grid.innerHTML=products.map((product,index)=>`
    <article class="look-now-product-card">
      <a href="product.html?look=${product.id}" class="look-now-product-image"><img src="assets/products/${product.image}" alt="${product.name}"></a>
      <div class="look-now-product-copy">
        <span>0${index+1} / ${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.tags.join(' · ')}</p>
        <a href="product.html?look=${product.id}">查看单品 <b>→</b></a>
      </div>
    </article>
  `).join('');
};

const bindLookNowScenes=()=>{
  document.querySelectorAll('[data-look-now-scene]').forEach(button=>button.addEventListener('click',()=>{
    lookNowScene=button.dataset.lookNowScene;
    document.querySelectorAll('[data-look-now-scene]').forEach(item=>item.classList.toggle('is-active',item===button));
    renderLookNowRecommendations();
  }));
};

const bindSavedLookActions=()=>{
  document.addEventListener('click',event=>{
    if(event.target.closest('[data-save-look]')){
      saveCurrentLook();
      return;
    }
    const remove=event.target.closest('[data-remove-saved-look]');
    if(remove){
      writeSavedLooks(readSavedLooks().filter(look=>look.signature!==remove.dataset.removeSavedLook));
      renderSavedLooks();
      renderLookNowRecommendations();
    }
  });
};

const setLookNowLoading=message=>{
  const panel=document.querySelector('#lookNowPanel');
  if(panel)panel.innerHTML=`<p class="look-now-status">${message}</p>`;
};

const bindLookNowLocation=()=>{
  const select=document.querySelector('#lookNowCity');
  const locateButton=document.querySelector('#lookNowLocate');
  if(select)select.addEventListener('change',()=>{
    const [id,name]=select.value.split('|');
    lookNowLocation={id,name};
    loadLookNowWeather();
  });
  if(locateButton)locateButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
      setLookNowLoading('当前浏览器不支持定位，请从城市列表中选择。');
      return;
    }
    locateButton.disabled=true;
    locateButton.textContent='正在定位……';
    navigator.geolocation.getCurrentPosition(position=>{
      const longitude=position.coords.longitude.toFixed(2);
      const latitude=position.coords.latitude.toFixed(2);
      lookNowLocation={id:`${longitude},${latitude}`,name:'当前位置'};
      loadLookNowWeather().finally(()=>{
        locateButton.disabled=false;
        locateButton.innerHTML='使用我的位置 <span>↗</span>';
      });
    },()=>{
      setLookNowLoading('无法获取当前位置，请从城市列表中选择。');
      locateButton.disabled=false;
      locateButton.innerHTML='使用我的位置 <span>↗</span>';
    },{enableHighAccuracy:false,timeout:8000,maximumAge:600000});
  });
};

const loadLookNowWeather=async()=>{
  const panel=document.querySelector('#lookNowPanel');
  if(!panel)return;
  setLookNowLoading(`正在读取${lookNowLocation.name}天气……`);
  const query=new URLSearchParams({location:lookNowLocation.id});
  try{
    const response=await fetch(`/api/weather?${query}`);
    const data=await response.json();
    if(!response.ok||data.code!=='200')throw new Error(data.code||'weather_request_failed');
    const weather=data.now;
    lookNowWeather=weather;
    panel.innerHTML=`
      <div class="look-now-weather">
        <div class="look-now-location">
          <span class="eyebrow">CURRENT WEATHER / ${lookNowLocation.name.toUpperCase()}</span>
          <strong>${lookNowLocation.name}</strong>
          <span>${weather.text}</span>
        </div>
        <div class="look-now-temperature">${weather.temp}<sup>°C</sup></div>
        <div class="look-now-details">
          <span>体感 ${weather.feelsLike}°C</span>
          <span>${weather.windDir} ${weather.windSpeed} km/h</span>
          <span>湿度 ${weather.humidity}%</span>
        </div>
      </div>
      <p class="look-now-note">今天的风仍然经过海岸。轻薄的层次，让身体保留移动的余地。</p>
    `;
    renderLookNowRecommendations();
  }catch(error){
    panel.innerHTML='<p class="look-now-error">暂时无法读取天气，请稍后再试。</p>';
    console.error('LOOK NOW weather request failed:',error.message);
  }
};

const getAskViaseamCandidates=()=>{
  if(!lookNowWeather)return [];
  return [...lookNowProducts]
    .map(product=>({...product,score:scoreLookNowProduct(product)}))
    .sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id))
    .slice(0,5)
    .map(product=>({id:product.id,name:product.name,category:product.category,tags:product.tags}));
};

const renderAskViaseamProducts=ids=>{
  const container=document.querySelector('[data-ask-viaseam-products]');
  if(!container)return;
  const products=(Array.isArray(ids)?ids:[])
    .map(id=>lookNowProducts.find(product=>product.id===String(id).padStart(2,'0')))
    .filter(Boolean)
    .filter((product,index,list)=>list.findIndex(item=>item.id===product.id)===index)
    .slice(0,3);
  container.innerHTML=products.length?products.map(product=>`
    <a class="ask-viaseam-product" href="product.html?look=${product.id}">
      <span class="ask-viaseam-product-image"><img src="assets/products/${product.image}" alt="${product.name}"></span>
      <span class="ask-viaseam-product-copy">
        <small>PRODUCT ${product.id} / ${product.category}</small>
        <strong>${product.name}</strong>
        <em>${product.tags.join(' · ')}</em>
        <b>查看商品 →</b>
      </span>
    </a>
  `).join(''):'';
};

const setAskViaseamAnswer=(message,state='ready',productIds=[])=>{
  const answer=document.querySelector('[data-ask-viaseam-answer]');
  if(!answer)return;
  answer.dataset.state=state;
  const status=answer.querySelector('span');
  const copy=answer.querySelector('p');
  if(status)status.textContent=state==='loading'?'VIASEAM / EDITING':state==='error'?'VIASEAM / NOTICE':'VIASEAM / ROUTE';
  if(copy)copy.textContent=message;
  renderAskViaseamProducts(state==='ready'?productIds:[]);
};

const bindAskViaseam=()=>{
  const form=document.querySelector('[data-ask-viaseam-form]');
  const input=document.querySelector('#askViaseamInput');
  const context=document.querySelector('[data-ask-viaseam-context]');
  if(!form||!input)return;

  document.querySelectorAll('[data-ask-prompt]').forEach(button=>button.addEventListener('click',()=>{
    input.value=button.dataset.askPrompt;
    input.focus();
  }));

  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const message=input.value.trim();
    if(!message)return;
    const submit=form.querySelector('button[type="submit"]');
    submit.disabled=true;
    setAskViaseamAnswer('正在结合天气、场景和现售商品整理你的穿着路线……','loading');
    if(context)context.textContent=`${lookNowLocation.name} / ${lookNowScene}${lookNowWeather?` / ${lookNowWeather.text} ${lookNowWeather.temp}°C`:''}`;
    try{
      const response=await fetch('/api/ask',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          message,
          location:lookNowLocation.name,
          scene:lookNowScene,
          weather:lookNowWeather?{
            text:lookNowWeather.text,
            temp:lookNowWeather.temp,
            feelsLike:lookNowWeather.feelsLike,
            windDir:lookNowWeather.windDir,
            windSpeed:lookNowWeather.windSpeed,
            humidity:lookNowWeather.humidity
          }:null,
          candidates:getAskViaseamCandidates()
        })
      });
      const data=await response.json();
      if(!response.ok)throw new Error(data.error||'ask_request_failed');
      setAskViaseamAnswer(data.answer||'暂时没有生成合适的路线，请换一种说法再试。','ready',data.productIds||[]);
    }catch(error){
      setAskViaseamAnswer('咨询服务暂时无法连接，请稍后再试。','error');
      console.error('ASK VIASEAM request failed:',error.message);
    }finally{
      submit.disabled=false;
    }
  });
};

addLookNowNavigation();
bindLookNowScenes();
bindLookNowLocation();
bindSavedLookActions();
bindAskViaseam();
renderSavedLooks();
loadLookNowWeather();

/* VIASEAM global pointer: a two-sign coastal route marker with a restrained bubble wake. */
const initRoutePointer=()=>{
  if(!window.matchMedia('(pointer:fine)').matches||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const cursor=document.createElement('div');cursor.className='route-cursor';cursor.setAttribute('aria-hidden','true');cursor.innerHTML='<i class="route-cursor-post"></i><i class="route-cursor-sign"><span>FORWARD</span></i><i class="route-cursor-sign"><span>VIASEAM</span></i>';document.body.appendChild(cursor);document.body.classList.add('has-route-cursor');
  let targetX=-90,targetY=-90,currentX=-90,currentY=-90,lastBubbleX=-90,lastBubbleY=-90,bubbleCount=0;
  const move=event=>{targetX=event.clientX+9;targetY=event.clientY+8;cursor.classList.add('is-visible');const distance=Math.hypot(event.clientX-lastBubbleX,event.clientY-lastBubbleY);if(distance>24&&bubbleCount<16){const bubble=document.createElement('i');const size=4+Math.random()*10;bubble.className='cursor-bubble';bubble.style.width=`${size}px`;bubble.style.height=`${size}px`;bubble.style.left=`${event.clientX-size/2}px`;bubble.style.top=`${event.clientY-size/2}px`;bubble.style.setProperty('--bubble-x',`${(Math.random()-.5)*18}px`);document.body.appendChild(bubble);bubbleCount++;lastBubbleX=event.clientX;lastBubbleY=event.clientY;bubble.addEventListener('animationend',()=>{bubble.remove();bubbleCount--},{once:true})}};
  const draw=()=>{currentX+=(targetX-currentX)*.2;currentY+=(targetY-currentY)*.2;cursor.style.transform=`translate3d(${currentX}px,${currentY}px,0)`;requestAnimationFrame(draw)};window.addEventListener('pointermove',move,{passive:true});document.documentElement.addEventListener('mouseleave',()=>cursor.classList.remove('is-visible'));draw();
};
const initCleanHorizontalRails=()=>{document.querySelectorAll('.scene-rail,.product-rail,.special-look-grid').forEach(rail=>rail.addEventListener('wheel',event=>{if(Math.abs(event.deltaY)<=Math.abs(event.deltaX)||rail.scrollWidth<=rail.clientWidth)return;event.preventDefault();rail.scrollLeft+=event.deltaY},{passive:false}))};
const initHomeOpening=()=>{
  if(!document.body.classList.contains('home-page'))return;const loader=document.querySelector('.hero');const campaign=document.querySelector('.video-section');if(!loader||!campaign)return;document.body.classList.add('is-opening');
  const overlay=campaign.querySelector('.video-overlay');const nonProductLink=campaign.querySelector('.video-overlay .text-link');if(nonProductLink)nonProductLink.remove();
  if(overlay)overlay.innerHTML='<div class="campaign-brand"><span class="campaign-brand-mark">V</span><span class="campaign-brand-name">VIASEAM</span></div><div class="campaign-title"><small>VIASEAM 2027 SPRING / SUMMER</small><h1>沿线而行</h1></div>';
  const magazineAction=document.querySelector('.home-page .magazine-copy .text-link');if(magazineAction)magazineAction.remove();
  const water=document.createElementNS('http://www.w3.org/2000/svg','svg');water.setAttribute('class','home-water-lines');water.setAttribute('viewBox','0 0 1600 220');water.setAttribute('preserveAspectRatio','none');water.setAttribute('aria-hidden','true');water.innerHTML='<path d="M-40 140 C250 35 420 210 760 112 S1260 55 1660 130"/><path d="M-40 172 C220 78 480 214 770 148 S1260 80 1660 154"/><path d="M-40 105 C280 8 520 170 815 88 S1310 30 1660 92"/><path d="M-40 198 C270 130 520 228 850 176 S1320 135 1660 190"/>';campaign.appendChild(water);
  const finish=()=>{loader.classList.add('is-rippling');setTimeout(()=>{loader.classList.add('is-finished');document.body.classList.remove('is-opening')},1550)};const seen=sessionStorage.getItem('viaseam-opening-seen');if(seen)setTimeout(finish,260);else{sessionStorage.setItem('viaseam-opening-seen','1');setTimeout(finish,2200)}
};
const initHomeProductLoop=()=>{
  const rail=document.querySelector('.home-page .product-rail');
  if(!rail||window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const originals=[...rail.children];if(originals.length<2)return;
  originals.forEach(card=>{const clone=card.cloneNode(true);clone.classList.remove('reveal','is-visible');clone.setAttribute('aria-hidden','true');clone.querySelectorAll('a,button,input').forEach(item=>item.tabIndex=-1);rail.appendChild(clone)});
  rail.classList.add('is-auto-rail');let paused=false,last=performance.now();
  const cycleWidth=()=>rail.children[originals.length].offsetLeft-rail.children[0].offsetLeft;
  rail.addEventListener('pointerenter',()=>paused=true);rail.addEventListener('pointerleave',()=>paused=false);rail.addEventListener('focusin',()=>paused=true);rail.addEventListener('focusout',()=>paused=false);
const tick=now=>{const width=cycleWidth();if(!paused&&width>0){rail.scrollLeft+=(now-last)*.028;if(rail.scrollLeft>=width)rail.scrollLeft-=width}last=now;requestAnimationFrame(tick)};requestAnimationFrame(tick);
};
initRoutePointer();initCleanHorizontalRails();initHomeOpening();initHomeProductLoop();

/* Keep the interactive magazine inside the official website deployment. */
document.querySelectorAll('a[href*="viaseam-magazine"],a[href="#magazine"]').forEach(link=>{link.href='magazine/?site=1';link.removeAttribute('target');link.removeAttribute('rel')});

const sendJson=(response,status,payload)=>{
  response.status(status).setHeader('Content-Type','application/json; charset=utf-8');
  response.setHeader('Cache-Control','no-store');
  response.end(JSON.stringify(payload));
};

const readBody=request=>{
  if(request.body&&typeof request.body==='object')return Promise.resolve(request.body);
  return new Promise((resolve,reject)=>{
    let raw='';
    request.on('data',chunk=>{
      raw+=chunk;
      if(raw.length>16000)reject(new Error('request_too_large'));
    });
    request.on('end',()=>{
      try{resolve(JSON.parse(raw||'{}'))}catch(error){reject(new Error('invalid_json'))}
    });
    request.on('error',reject);
  });
};

module.exports=async function handler(request,response){
  if(request.method!=='POST')return sendJson(response,405,{error:'method_not_allowed'});
  const apiKey=String(process.env.DASHSCOPE_API_KEY||'').trim();
  const baseUrl=String(process.env.DASHSCOPE_BASE_URL||'').trim().replace(/\/$/,'');
  if(!apiKey)return sendJson(response,503,{error:'ask_service_not_configured'});
  if(!baseUrl||!/^https:\/\/[a-zA-Z0-9.-]+(?:\/compatible-mode\/v1)?$/.test(baseUrl))return sendJson(response,503,{error:'ask_base_url_not_configured'});

  try{
    const body=await readBody(request);
    const message=String(body.message||'').trim().slice(0,500);
    if(!message)return sendJson(response,400,{error:'message_required'});
    const location=String(body.location||'未知地点').slice(0,40);
    const scene=String(body.scene||'未选择场景').slice(0,40);
    const weather=body.weather&&typeof body.weather==='object'?body.weather:null;
    const candidates=Array.isArray(body.candidates)?body.candidates.slice(0,5).map(item=>({
      id:String(item.id||'').slice(0,8),
      name:String(item.name||'').slice(0,40),
      category:String(item.category||'').slice(0,20),
      tags:Array.isArray(item.tags)?item.tags.slice(0,4).map(tag=>String(tag).slice(0,20)):[]
    })):[];

    const context={location,scene,weather,candidates};
    const upstream=await fetch(`${baseUrl}/chat/completions`,{
      method:'POST',
      headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
      body:JSON.stringify({
        model:process.env.DASHSCOPE_MODEL||'qwen-plus',
        messages:[
          {role:'system',content:'你是 VIASEAM 品牌官网中的穿着路线编辑 ASK VIASEAM。使用克制、清晰、具有编辑感的中文回答。先直接给出穿着判断，再解释天气和场景依据，最后只从提供的 candidates 现售商品中推荐 1 至 3 件，并附上“商品编号 01”这种编号。严禁虚构候选列表之外的商品；严禁把 LOOK 02 系列展示造型当作现售商品；不要声称提供医疗或安全保证。若没有天气数据，明确说未取得实时天气，再根据用户描述回答。总长度控制在 180 个汉字左右，不使用 Markdown 表格。'},
          {role:'user',content:`用户问题：${message}\n当前页面上下文：${JSON.stringify(context)}`}
        ],
        max_tokens:420,
        temperature:0.6
      })
    });
    const data=await upstream.json();
    if(!upstream.ok){
      console.error('DashScope API error',upstream.status,data?.error?.type||data?.code||'unknown');
      return sendJson(response,502,{error:'assistant_upstream_failed'});
    }
    const answer=String(data?.choices?.[0]?.message?.content||'').trim();
    if(!answer)return sendJson(response,502,{error:'empty_assistant_response'});
    const allowedIds=new Set(candidates.map(item=>item.id));
    const mentionedIds=[...answer.matchAll(/(?:商品(?:编号)?|PRODUCT)\s*[：:#-]?\s*(\d{1,2})/gi)]
      .map(match=>match[1].padStart(2,'0'))
      .filter(id=>allowedIds.has(id));
    const productIds=[...new Set(mentionedIds)].slice(0,3);
    return sendJson(response,200,{answer,productIds});
  }catch(error){
    console.error('ASK VIASEAM request failed',error);
    return sendJson(response,400,{error:error.message||'ask_request_failed'});
  }
};

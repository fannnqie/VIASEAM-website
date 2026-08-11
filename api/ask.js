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

const extractOutputText=data=>{
  if(typeof data.output_text==='string')return data.output_text.trim();
  return (data.output||[]).flatMap(item=>item.content||[]).filter(item=>item.type==='output_text').map(item=>item.text||'').join('\n').trim();
};

module.exports=async function handler(request,response){
  if(request.method!=='POST')return sendJson(response,405,{error:'method_not_allowed'});
  const apiKey=String(process.env.OPENAI_API_KEY||'').trim();
  if(!apiKey)return sendJson(response,503,{error:'ask_service_not_configured'});

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
    const upstream=await fetch('https://api.openai.com/v1/responses',{
      method:'POST',
      headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},
      body:JSON.stringify({
        model:process.env.OPENAI_MODEL||'gpt-5-mini',
        store:false,
        max_output_tokens:420,
        instructions:'你是 VIASEAM 品牌官网中的穿着路线编辑 ASK VIASEAM。使用克制、清晰、具有编辑感的中文回答。先直接给出穿着判断，再解释天气和场景依据，最后只从提供的 candidates 现售商品中推荐 1 至 3 件，并附上“商品编号 01”这种编号。严禁虚构候选列表之外的商品；严禁把 LOOK 02 系列展示造型当作现售商品；不要声称提供医疗或安全保证。若没有天气数据，明确说未取得实时天气，再根据用户描述回答。总长度控制在 180 个汉字左右，不使用 Markdown 表格。',
        input:`用户问题：${message}\n当前页面上下文：${JSON.stringify(context)}`
      })
    });
    const data=await upstream.json();
    if(!upstream.ok){
      console.error('OpenAI API error',upstream.status,data?.error?.type||'unknown');
      return sendJson(response,502,{error:'assistant_upstream_failed'});
    }
    const answer=extractOutputText(data);
    if(!answer)return sendJson(response,502,{error:'empty_assistant_response'});
    return sendJson(response,200,{answer});
  }catch(error){
    console.error('ASK VIASEAM request failed',error);
    return sendJson(response,400,{error:error.message||'ask_request_failed'});
  }
};

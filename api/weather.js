const sendJson=(response,status,payload)=>{
  response.status(status).setHeader('Content-Type','application/json; charset=utf-8');
  response.setHeader('Cache-Control','s-maxage=300, stale-while-revalidate=600');
  response.end(JSON.stringify(payload));
};

module.exports=async function handler(request,response){
  if(request.method!=='GET')return sendJson(response,405,{error:'method_not_allowed'});

  const location=String(request.query?.location||'').trim();
  const host=String(process.env.QWEATHER_HOST||'').trim().replace(/^https?:\/\//,'').replace(/\/$/,'');
  const key=String(process.env.QWEATHER_API_KEY||'').trim();
  if(!location||location.length>50)return sendJson(response,400,{error:'invalid_location'});
  if(!host||!key)return sendJson(response,503,{error:'weather_service_not_configured'});

  try{
    const query=new URLSearchParams({location,lang:'zh',key});
    const upstream=await fetch(`https://${host}/v7/weather/now?${query}`,{headers:{Accept:'application/json'}});
    const data=await upstream.json();
    if(!upstream.ok||data.code!=='200')return sendJson(response,502,{error:'weather_upstream_failed',code:data.code||String(upstream.status)});
    return sendJson(response,200,{code:'200',updateTime:data.updateTime,now:data.now});
  }catch(error){
    console.error('QWeather request failed',error);
    return sendJson(response,500,{error:'weather_request_failed'});
  }
};

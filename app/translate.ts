export type Lang={code:string;name:string};
const KEY='neuroparsec-info-lang';
const cache=new Map<string,string>();

export const LANGUAGES:Lang[]=[
 {code:'en',name:'English'},
 {code:'es',name:'Español'},
 {code:'fr',name:'Français'},
 {code:'de',name:'Deutsch'},
 {code:'pt',name:'Português'},
 {code:'it',name:'Italiano'},
 {code:'nl',name:'Nederlands'},
 {code:'pl',name:'Polski'},
 {code:'ru',name:'Русский'},
 {code:'uk',name:'Українська'},
 {code:'tr',name:'Türkçe'},
 {code:'ro',name:'Română'},
 {code:'cs',name:'Čeština'},
 {code:'hu',name:'Magyar'},
 {code:'sv',name:'Svenska'},
 {code:'da',name:'Dansk'},
 {code:'fi',name:'Suomi'},
 {code:'no',name:'Norsk'},
 {code:'sk',name:'Slovenčina'},
 {code:'bg',name:'Български'},
 {code:'hr',name:'Hrvatski'},
 {code:'sr',name:'Српски'},
 {code:'el',name:'Ελληνικά'},
 {code:'ca',name:'Català'},
 {code:'zh-CN',name:'简体中文'},
 {code:'zh-TW',name:'繁體中文'},
 {code:'ja',name:'日本語'},
 {code:'ko',name:'한국어'},
 {code:'hi',name:'हिन्दी'},
 {code:'bn',name:'বাংলা'},
 {code:'ur',name:'اردو'},
 {code:'ta',name:'தமிழ்'},
 {code:'te',name:'తెలుగు'},
 {code:'mr',name:'मराठी'},
 {code:'gu',name:'ગુજરાતી'},
 {code:'pa',name:'ਪੰਜਾਬੀ'},
 {code:'kn',name:'ಕನ್ನಡ'},
 {code:'ml',name:'മലയാളം'},
 {code:'si',name:'සිංහල'},
 {code:'ne',name:'नेपाली'},
 {code:'ar',name:'العربية'},
 {code:'fa',name:'فارسی'},
 {code:'he',name:'עברית'},
 {code:'th',name:'ไทย'},
 {code:'vi',name:'Tiếng Việt'},
 {code:'id',name:'Indonesia'},
 {code:'ms',name:'Melayu'},
 {code:'fil',name:'Filipino'},
 {code:'sw',name:'Kiswahili'},
 {code:'am',name:'አማርኛ'},
 {code:'my',name:'မြန်မာ'},
 {code:'km',name:'ភាសាខ្មែរ'},
 {code:'lo',name:'ລາວ'},
 {code:'ka',name:'ქართული'},
 {code:'hy',name:'Հայերեն'},
 {code:'az',name:'Azərbaycan'},
 {code:'kk',name:'Қазақ'},
 {code:'uz',name:'Oʻzbek'},
 {code:'af',name:'Afrikaans'},
 {code:'et',name:'Eesti'},
 {code:'lv',name:'Latviešu'},
 {code:'lt',name:'Lietuvių'},
 {code:'sl',name:'Slovenščina'},
 {code:'is',name:'Íslenska'},
 {code:'ga',name:'Gaeilge'},
];

export function readInfoLang():string{
 if(typeof localStorage==='undefined')return 'en';
 const stored=localStorage.getItem(KEY);
 return LANGUAGES.some(l=>l.code===stored)?stored!:'en';
}

export function saveInfoLang(code:string){
 localStorage.setItem(KEY,code);
}

function parseGoogle(data:unknown):string{
 if(!Array.isArray(data)||!Array.isArray(data[0]))return '';
 return data[0].map((row:unknown)=>Array.isArray(row)&&typeof row[0]==='string'?row[0]:'').join('');
}

async function requestGoogle(url:string,q:string,tl:string):Promise<string>{
 const params=new URLSearchParams({client:'gtx',sl:'en',tl,dt:'t',q});
 const r=await fetch(`${url}?${params.toString()}`);
 if(!r.ok)throw new Error('translate failed');
 return parseGoogle(await r.json());
}

async function requestMemory(q:string,tl:string):Promise<string>{
 const r=await fetch(`https://api.mymemory.translated.net/get?${new URLSearchParams({q,langpair:`en|${tl}`}).toString()}`);
 if(!r.ok)throw new Error('translate failed');
 const data=await r.json() as {responseData?:{translatedText?:string}};
 const translated=data.responseData?.translatedText?.trim()??'';
 if(!translated||/myMemory warning/i.test(translated))throw new Error('translate failed');
 return translated;
}

export async function translateText(q:string,tl:string):Promise<string>{
 const text=q.trim();
 if(!text||tl==='en')return q;
 const key=`${tl}:${text}`;
 const hit=cache.get(key);
 if(hit)return hit;
 const endpoints=['/api/translate','https://translate.googleapis.com/translate_a/single'];
 let last:unknown;
 for(const url of endpoints){
  try{
   const translated=await requestGoogle(url,text,tl);
   if(translated){cache.set(key,translated);return translated;}
  }catch(e){last=e;}
 }
 try{
  const translated=await requestMemory(text,tl);
  if(translated){cache.set(key,translated);return translated;}
 }catch(e){last=e;}
 throw last instanceof Error?last:new Error('Translation unavailable');
}

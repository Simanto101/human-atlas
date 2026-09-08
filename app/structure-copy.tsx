import {useEffect,useState} from 'react';
import {Languages} from 'lucide-react';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
import {LANGUAGES,readInfoLang,saveInfoLang,translateText} from './translate';

export default function StructureCopy({name,description,note}:{name:string;description:string;note?:string}){
 const [lang,setLang]=useState(readInfoLang);
 const [title,setTitle]=useState(name);
 const [body,setBody]=useState(description);
 const [status,setStatus]=useState('');
 useEffect(()=>{
  let cancelled=false;
  const run=async()=>{
   if(lang==='en'){setTitle(name);setBody(description);setStatus('');return;}
   setStatus('Translating…');
   try{
    const [nextTitle,nextBody]=await Promise.all([translateText(name,lang),translateText(description,lang)]);
    if(!cancelled){setTitle(nextTitle||name);setBody(nextBody||description);setStatus('');}
   }catch{
    if(!cancelled){setTitle(name);setBody(description);setStatus('Translation unavailable. Showing English.');}
   }
  };
  run();
  return()=>{cancelled=true;};
 },[name,description,lang]);
 const rtl=/^(ar|fa|he|ur)$/.test(lang);
 return <div className="structure-copy" dir={rtl?'rtl':'ltr'} lang={lang}>
  <label className="translate-row">
   <Languages size={14} aria-hidden/>
   <span>Translate information</span>
   <Select value={lang} onValueChange={value=>{if(typeof value==='string'){setLang(value);saveInfoLang(value);}}} items={LANGUAGES.map(l=>({value:l.code,label:l.name}))}>
    <SelectTrigger className="translate-select" aria-label="Translate body part information"><SelectValue/></SelectTrigger>
    <SelectContent className="translate-menu" align="end" alignItemWithTrigger={false} side="bottom">{LANGUAGES.map(l=><SelectItem key={l.code} value={l.code}>{l.name}</SelectItem>)}</SelectContent>
   </Select>
  </label>
  <h2 className="structure-title translated-title">{title}</h2>
  <p className="structure-description">{body}</p>
  {status&&<p className="context-note" role="status">{status}</p>}
  {note&&<span className="context-note">{note}</span>}
 </div>;
}

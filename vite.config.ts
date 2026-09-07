import {copyFileSync,mkdirSync,writeFileSync} from 'node:fs';
import type {IncomingMessage,ServerResponse} from 'node:http';
import {fileURLToPath} from 'node:url';
import {defineConfig,type Plugin} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
const path=(relative:string)=>fileURLToPath(new URL(relative,import.meta.url));
// Mirror the deployment redirect before Vite's HTML fallback, in dev and preview.
function redirectRoot(req:IncomingMessage,res:ServerResponse,next:()=>void){
 const url=new URL(req.url??'/', 'http://localhost');
 if(url.pathname!=='/'){next();return;}
 res.writeHead(307,{Location:'/male'+url.search,'Cache-Control':'no-store'});
 res.end();
}
const modelRedirect:Plugin={
 name:'model-root-redirect',
 configureServer(server){server.middlewares.use(redirectRoot);},
 configurePreviewServer(server){server.middlewares.use(redirectRoot);},
};
const pagesFallbacks:Plugin={
 name:'github-pages-fallbacks',
 closeBundle(){
  const index=path('./dist/index.html');
  writeFileSync(path('./dist/.nojekyll'),'');
  copyFileSync(index,path('./dist/404.html'));
  mkdirSync(path('./dist/male'),{recursive:true});
  mkdirSync(path('./dist/female'),{recursive:true});
  copyFileSync(index,path('./dist/male/index.html'));
  copyFileSync(index,path('./dist/female/index.html'));
 },
};
export default defineConfig({root:path('./web'),publicDir:path('./public'),base:process.env.GITHUB_PAGES==='true'?'/human-atlas/':'/',plugins:[modelRedirect,react(),pagesFallbacks],resolve:{alias:{'@':path('./')}},css:{postcss:{plugins:[tailwindcss()]}},server:{watch:{usePolling:true},allowedHosts:['.monkeycode-ai.live']},build:{outDir:path('./dist'),emptyOutDir:true}});

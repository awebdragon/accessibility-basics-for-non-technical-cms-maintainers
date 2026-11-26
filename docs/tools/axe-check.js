// usage: node run.js <rootDir> <relPath...>  — serves rootDir over http and runs axe on each page
const http=require('http'),fs=require('fs'),path=require('path');
const {chromium}=require('playwright-core');
const axeSrc=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
const [root,...pages]=process.argv.slice(2);
const types={'.html':'text/html','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.pdf':'application/pdf'};
const srv=http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split(/[?#]/)[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(root,p);fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);return s.end();}s.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream'});s.end(d)})}).listen(0,async()=>{
  const port=srv.address().port;const b=await chromium.launch({channel:'msedge'});const pg=await b.newPage();
  for(const rel of pages){await pg.goto(`http://localhost:${port}/${rel}`,{waitUntil:'networkidle'}).catch(e=>console.log('load warn',e.message));await pg.addScriptTag({content:axeSrc});
    const r=await pg.evaluate(()=>axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}));
    console.log(`\n=== ${rel}: ${r.violations.length} violation types, ${r.incomplete.length} needs-review`);
    for(const v of r.violations){console.log(` [${v.impact}] ${v.id}: ${v.help}`);for(const n of v.nodes.slice(0,6))console.log('    -',n.target.join(' '),'|',(n.failureSummary||'').split('\n')[1]?.trim());}
    for(const v of r.incomplete){console.log(` (review) ${v.id}: ${v.help} x${v.nodes.length}`);}
  }
  await b.close();srv.close();});

const openInPsWeb = (function(e,n,t,o){return new Promise(((a,r)=>{import("./e2bb343a.js").then((i=>{const s=new URL(e);s.pathname="embed-content-proxy.html";const c=s.searchParams;c.append("origin",document.location.origin),s.search=c.toString();const d=document.createElement("iframe");d?(window.addEventListener("message",(async e=>{if(e.source!==d.contentWindow)return;if("psweb-embed-content-proxy-denied"===e.data)r(new Error("proxy denied"));else if("psweb-embed-content-proxy-ready"!==e.data)return;if(!d.contentWindow)return void r(new Error("proxyFrame.contentWindow null"));const c=i.getProxy(d.contentWindow,window,s.origin),m=`manifest_${(Math.random()+1).toString(36).substring(7)}`,w=[],p=t.map(((e,n)=>{const t=`${m}_imageData${n}/${e.filename}`;try{w.push(c.set(t,e.imageData))}catch(e){r(new Error(`proxy.set failed when writing ${t}, ${e}`))}return{filename:e.filename,imagePath:t}}));await Promise.all(w);const g={inputs:[{href:p[0].imagePath,storage:"idb"}],options:{actionJSON:o}};p.slice(1).length>0&&(g.options.additionalImages=p.slice(1).map((e=>({href:e.imagePath,storage:"idb"}))));const l={version:2,filename:n,data:g};await c.set(m,JSON.stringify(l));const h={proxyid:m,proxytype:"manifest"};s.searchParams.has("PR")&&(h.PR=s.searchParams.get("PR"));const f=new URLSearchParams(h),y=new URL(`${s.origin}/id?${f}`);window.parent.postMessage("navigate," + y, '*'),console.log('sssss', y),d.remove(),a()})),d.src=s.href,document.body.appendChild(d)):r(new Error("could not create proxy iframe"))}))}))})
console.log('sssq');
export { openInPsWeb }

// const openInPsWeb = (function (e, n, t, o) {
//     console.log('ab', e, n, t);
//     let executed = false;
//     return new Promise(((a, r) => {
//         import("./e2bb343a.js").then((i => {
//             const s = new URL(e);
//             // s.pathname = "embed-content-proxy.html";
//             console.log('s path', s);
//             // const c = s.searchParams;
//             // c.append("origin", document.location.origin),
//             //     s.search = c.toString();
//             //     console.log('s pathname', s);
//             const d = document.createElement("iframe");
//             d.classList.add('newIframe');
//             d ? (
//             d.src = s.href,
//             document.body.appendChild(d)) : r(new Error("could not create proxy iframe"));
//             console.log('d.contentWindow', d.contentWindow);
//             d.contentWindow.postMessage('imgObj', '*');
//             d.onerror = function() {
//                 console.error("Failed to load the iframe");
//             };
//             d.onload = function() {
//                 console.log("Iframe loaded successfully");
//             };
//         }
//         ))
//     }
//     ))
// }
// )
// export { openInPsWeb }

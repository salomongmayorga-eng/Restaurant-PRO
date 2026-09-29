const fs = require('fs');
let js = fs.readFileSync('public/assets/index-Ba5GN_S0.js', 'utf8');

const xeStart = js.indexOf('Xe={isFirestoreQuotaExceeded:');
const xeEnd = js.indexOf(',async testConnection(){', xeStart);

if (xeStart === -1 || xeEnd === -1) {
  console.error('Cannot find Xe block:', xeStart, xeEnd);
  process.exit(1);
}

const oldBlock = js.substring(xeStart, xeEnd);
console.log('Found Xe block of length:', oldBlock.length);

const newBlock = `Xe={_c(t){return (typeof t==='string' && !t.startsWith('rp_') && t!=='test') ? ('rp_'+t) : t},isFirestoreQuotaExceeded:rxe,subscribeToQuotaExceeded:sxe,async getCollection(t){const _t=this._c(t);try{const n=(await KL(iy(Ml,_t))).docs.map(r=>({...r.data(),id:r.id}));return U2(t,n),n}catch(e){return cl(e,'list',_t),fd(t)}},subscribeToCollection(t,e){const _t=this._c(t);const n=fd(t);n&&n.length>0&&e(n);try{const r=HL(iy(Ml,_t)),a=WL(r,i=>{const l=i.docs.map(c=>({...c.data(),id:c.id}));U2(t,l),e(l)},i=>{cl(i,'list',_t);const l=fd(t);l&&l.length>0&&e(l)});return()=>{try{a()}catch{}}}catch(r){return cl(r,'list',_t),()=>{}}},async setDocument(t,e,n){const _t=this._c(t);const r=Wx(n),a={...r,id:e};Rf(t,a);try{const i=qf(Ml,_t,e);await YL(i,{...r,createdAt:wr.now(),updatedAt:wr.now()})}catch(i){cl(i,'create',_t+'/'+e)}},async addDocument(t,e){const _t=this._c(t);const n=Wx(e),r='local_'+Date.now()+'_'+Math.random().toString(36).substring(2,7),a={...n,id:r};Rf(t,a);try{const i=await Kpe(iy(Ml,_t),{...n,createdAt:wr.now(),updatedAt:wr.now()});return Rf(t,{...n,id:i.id}),i.id}catch(i){return cl(i,'create',_t),r}},async updateDocument(t,e,n){const _t=this._c(t);const r=Wx(n);Rf(t,{...r,id:e});try{const a=qf(Ml,_t,e);await YL(a,{...r,updatedAt:wr.now()},{merge:!0})}catch(a){cl(a,'update',_t+'/'+e)}},async deleteDocument(t,e){const _t=this._c(t);Rf(t,{id:e},!0);try{const n=qf(Ml,_t,e);await qpe(n)}catch(n){cl(n,'delete',_t+'/'+e)}},async getDocument(t,e){const _t=this._c(t);try{const n=qf(Ml,_t,e),r=await Gpe(n);if(r.exists()){const a={...r.data(),id:r.id};return Rf(t,a),a}return null}catch(n){return cl(n,'get',_t+'/'+e),fd(t).find(a=>a.id===e)||null}},subscribeToDocument(t,e,n){const _t=this._c(t);try{const a=fd(t).find(i=>i.id===e);a&&n(a)}catch{}try{const r=qf(Ml,_t,e),a=WL(r,i=>{if(i.exists()){const l={...i.data(),id:i.id};Rf(t,l),n(l)}else n(null)},i=>{cl(i,'get',_t+'/'+e);const l=fd(t);n(l.find(c=>c.id===e)||null)});return()=>{try{a()}catch{}}}catch(r){return cl(r,'get',_t+'/'+e),()=>{}}}`;

js = js.replace(oldBlock, newBlock);
fs.writeFileSync('public/assets/index-Ba5GN_S0.js', js);
console.log('Successfully updated Xe with namespace isolation!');

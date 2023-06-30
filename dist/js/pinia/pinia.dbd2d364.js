import{i as B,e as H,E as I,n as Y,A as Z,f as A,l as G,j as L,B as q,aj as $,g as T,d as tt,q as et,t as st,k as nt}from"../@vue/@vue.133e0034.js";var ct=!1;/*!
  * pinia v2.0.33
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */let D;const R=t=>D=t,J=Symbol();function C(t){return t&&typeof t=="object"&&Object.prototype.toString.call(t)==="[object Object]"&&typeof t.toJSON!="function"}var k;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(k||(k={}));function it(){const t=B(!0),c=t.run(()=>H({}));let s=[],e=[];const r=I({install(u){R(r),r._a=u,u.provide(J,r),u.config.globalProperties.$pinia=r,e.forEach(f=>s.push(f)),e=[]},use(u){return!this._a&&!ct?e.push(u):s.push(u),this},_p:s,_a:null,_e:t,_s:new Map,state:c});return r}const N=()=>{};function V(t,c,s,e=N){t.push(c);const r=()=>{const u=t.indexOf(c);u>-1&&(t.splice(u,1),e())};return!s&&T()&&tt(r),r}function p(t,...c){t.slice().forEach(s=>{s(...c)})}function x(t,c){t instanceof Map&&c instanceof Map&&c.forEach((s,e)=>t.set(e,s)),t instanceof Set&&c instanceof Set&&c.forEach(t.add,t);for(const s in c){if(!c.hasOwnProperty(s))continue;const e=c[s],r=t[s];C(r)&&C(e)&&t.hasOwnProperty(s)&&!L(e)&&!q(e)?t[s]=x(r,e):t[s]=e}return t}const ot=Symbol();function rt(t){return!C(t)||!t.hasOwnProperty(ot)}const{assign:v}=Object;function ut(t){return!!(L(t)&&t.effect)}function at(t,c,s,e){const{state:r,actions:u,getters:f}=c,a=s.state.value[t];let g;function b(){a||(s.state.value[t]=r?r():{});const y=st(s.state.value[t]);return v(y,u,Object.keys(f||{}).reduce((d,m)=>(d[m]=I(nt(()=>{R(s);const j=s._s.get(t);return f[m].call(j,j)})),d),{}))}return g=W(t,b,c,s,e,!0),g}function W(t,c,s={},e,r,u){let f;const a=v({actions:{}},s),g={deep:!0};let b,y,d=I([]),m=I([]),j;const _=e.state.value[t];!u&&!_&&(e.state.value[t]={}),H({});let O;function F(o){let n;b=y=!1,typeof o=="function"?(o(e.state.value[t]),n={type:k.patchFunction,storeId:t,events:j}):(x(e.state.value[t],o),n={type:k.patchObject,payload:o,storeId:t,events:j});const h=O=Symbol();et().then(()=>{O===h&&(b=!0)}),y=!0,p(d,n,e.state.value[t])}const z=u?function(){const{state:n}=s,h=n?n():{};this.$patch(S=>{v(S,h)})}:N;function K(){f.stop(),d=[],m=[],e._s.delete(t)}function M(o,n){return function(){R(e);const h=Array.from(arguments),S=[],w=[];function U(i){S.push(i)}function X(i){w.push(i)}p(m,{args:h,name:o,store:l,after:U,onError:X});let E;try{E=n.apply(this&&this.$id===t?this:l,h)}catch(i){throw p(w,i),i}return E instanceof Promise?E.then(i=>(p(S,i),i)).catch(i=>(p(w,i),Promise.reject(i))):(p(S,E),E)}}const Q={_p:e,$id:t,$onAction:V.bind(null,m),$patch:F,$reset:z,$subscribe(o,n={}){const h=V(d,o,n.detached,()=>S()),S=f.run(()=>A(()=>e.state.value[t],w=>{(n.flush==="sync"?y:b)&&o({storeId:t,type:k.direct,events:j},w)},v({},g,n)));return h},$dispose:K},l=G(Q);e._s.set(t,l);const P=e._e.run(()=>(f=B(),f.run(()=>c())));for(const o in P){const n=P[o];if(L(n)&&!ut(n)||q(n))u||(_&&rt(n)&&(L(n)?n.value=_[o]:x(n,_[o])),e.state.value[t][o]=n);else if(typeof n=="function"){const h=M(o,n);P[o]=h,a.actions[o]=n}}return v(l,P),v($(l),P),Object.defineProperty(l,"$state",{get:()=>e.state.value[t],set:o=>{F(n=>{v(n,o)})}}),e._p.forEach(o=>{v(l,f.run(()=>o({store:l,app:e._a,pinia:e,options:a})))}),_&&u&&s.hydrate&&s.hydrate(l.$state,_),b=!0,y=!0,l}function lt(t,c,s){let e,r;const u=typeof c=="function";typeof t=="string"?(e=t,r=u?s:c):(r=t,e=t.id);function f(a,g){const b=Y();return a=a||b&&Z(J,null),a&&R(a),a=D,a._s.has(e)||(u?W(e,c,r,a):at(e,r,a)),a._s.get(e)}return f.$id=e,f}export{it as c,lt as d};

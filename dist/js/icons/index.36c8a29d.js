import{a as o}from"../geotiff/geotiff.85f1a328.js";import{R as x}from"../@element-plus/@element-plus.40532030.js";import{_ as w}from"../../assets/index.e0e05016.js";import{E as y}from"../element-plus/element-plus.f657e37f.js";import{F as k,e as L,c as n,a4 as r,_ as i,al as a,an as C,o as _,R as g,ad as d,$ as E,a2 as I,a3 as c,a as e,Z as z,a0 as $,V as B}from"../@vue/@vue.5df607be.js";import"../@amap/@amap.99378080.js";import"../pinia/pinia.e71ba6d6.js";import"../js-cookie/js-cookie.431252a9.js";import"../axios/axios.aade88d5.js";import"../form-data/form-data.3e107400.js";import"../vue-router/vue-router.3963f1f9.js";import"../path-to-regexp/path-to-regexp.ecb763cd.js";import"../fuse.js/fuse.js.8cd4e865.js";import"../path-browserify/path-browserify.3d3258d8.js";import"../screenfull/screenfull.55a5d770.js";import"../vue-i18n/vue-i18n.6da1d588.js";import"../@intlify/@intlify.4679f647.js";import"../mitt/mitt.fcf4f812.js";import"../lodash-es/lodash-es.67cc1c54.js";import"../@vueuse/@vueuse.7545b4f1.js";import"../qs/qs.8188ecf6.js";import"../side-channel/side-channel.c76b9d93.js";import"../get-intrinsic/get-intrinsic.5afea291.js";import"../has-symbols/has-symbols.37c383d9.js";import"../function-bind/function-bind.20151ab8.js";import"../has/has.21528ef4.js";import"../call-bind/call-bind.4790b089.js";import"../object-inspect/object-inspect.2ea46dc0.js";import"../nprogress/nprogress.47a88857.js";/* empty css                                 */import"../clipboard/clipboard.37ebffe6.js";import"../xe-utils/xe-utils.8594097a.js";import"../vxe-table/vxe-table.63d8fd70.js";import"../vue3-lottie/vue3-lottie.4fda5108.js";import"../lottie-web/lottie-web.0b3a3fa5.js";import"../vite-plugin-mock/vite-plugin-mock.ee99d99a.js";import"../mockjs/mockjs.7f7b19f3.js";import"../@popperjs/@popperjs.882fb711.js";import"../@ctrl/@ctrl.d3543c5e.js";import"../dayjs/dayjs.5b7a14e9.js";import"../async-validator/async-validator.d831b986.js";import"../memoize-one/memoize-one.9d6ffe8a.js";import"../escape-html/escape-html.d572c0fd.js";import"../normalize-wheel-es/normalize-wheel-es.636a88c9.js";import"../@floating-ui/@floating-ui.85752970.js";import"../vue/vue.94571519.js";import"../lodash-unified/lodash-unified.4e0b778c.js";let V=[];const N=Object.assign({"../../icons/svg/about.svg":()=>o(()=>import("../svg/about.ab9d7df8.js"),[],import.meta.url),"../../icons/svg/account.svg":()=>o(()=>import("../svg/account.8eead1a7.js"),[],import.meta.url),"../../icons/svg/animate.svg":()=>o(()=>import("../svg/animate.cd542170.js"),[],import.meta.url),"../../icons/svg/bug.svg":()=>o(()=>import("../svg/bug.1ac611be.js"),[],import.meta.url),"../../icons/svg/charts.svg":()=>o(()=>import("../svg/charts.60c0763c.js"),[],import.meta.url),"../../icons/svg/dashboard.svg":()=>o(()=>import("../svg/dashboard.d4298faa.js"),[],import.meta.url),"../../icons/svg/devices.svg":()=>o(()=>import("../svg/devices.5fd077e2.js"),[],import.meta.url),"../../icons/svg/directive.svg":()=>o(()=>import("../svg/directive.c2b1a5a9.js"),[],import.meta.url),"../../icons/svg/drag.svg":()=>o(()=>import("../svg/drag.6b93a285.js"),[],import.meta.url),"../../icons/svg/edit.svg":()=>o(()=>import("../svg/edit.fbb3b60b.js"),[],import.meta.url),"../../icons/svg/error.svg":()=>o(()=>import("../svg/error.1fe360e1.js"),[],import.meta.url),"../../icons/svg/excel.svg":()=>o(()=>import("../svg/excel.b4f2adb4.js"),[],import.meta.url),"../../icons/svg/exit-fullscreen.svg":()=>o(()=>import("../svg/exit-fullscreen.06284a06.js"),[],import.meta.url),"../../icons/svg/folder.svg":()=>o(()=>import("../svg/folder.5d4c7625.js"),[],import.meta.url),"../../icons/svg/fullscreen.svg":()=>o(()=>import("../svg/fullscreen.f9fbba03.js"),[],import.meta.url),"../../icons/svg/guide.svg":()=>o(()=>import("../svg/guide.e5a1fc29.js"),[],import.meta.url),"../../icons/svg/hamburger.svg":()=>o(()=>import("../svg/hamburger.ccf06722.js"),[],import.meta.url),"../../icons/svg/home.svg":()=>o(()=>import("../svg/home.06e40049.js"),[],import.meta.url),"../../icons/svg/image.svg":()=>o(()=>import("../svg/image.7a12320d.js"),[],import.meta.url),"../../icons/svg/language.svg":()=>o(()=>import("../svg/language.5c75281c.js"),[],import.meta.url),"../../icons/svg/list.svg":()=>o(()=>import("../svg/list.67a181af.js"),[],import.meta.url),"../../icons/svg/log.svg":()=>o(()=>import("../svg/log.c4f8d0bd.js"),[],import.meta.url),"../../icons/svg/map.svg":()=>o(()=>import("../svg/map.858624ae.js"),[],import.meta.url),"../../icons/svg/message.svg":()=>o(()=>import("../svg/message.438e97b4.js"),[],import.meta.url),"../../icons/svg/movie.svg":()=>o(()=>import("../svg/movie.5d404626.js"),[],import.meta.url),"../../icons/svg/msg.svg":()=>o(()=>import("../svg/msg.55a9120e.js"),[],import.meta.url),"../../icons/svg/msg_1.svg":()=>o(()=>import("../svg/msg_1.f37a0a9d.js"),[],import.meta.url),"../../icons/svg/nested.svg":()=>o(()=>import("../svg/nested.11903f64.js"),[],import.meta.url),"../../icons/svg/notice.svg":()=>o(()=>import("../svg/notice.cb4883fb.js"),[],import.meta.url),"../../icons/svg/ok.svg":()=>o(()=>import("../svg/ok.ee70b62d.js"),[],import.meta.url),"../../icons/svg/outside.svg":()=>o(()=>import("../svg/outside.5a8a595a.js"),[],import.meta.url),"../../icons/svg/password.svg":()=>o(()=>import("../svg/password.93ee6bd0.js"),[],import.meta.url),"../../icons/svg/permission.svg":()=>o(()=>import("../svg/permission.c0878683.js"),[],import.meta.url),"../../icons/svg/personal.svg":()=>o(()=>import("../svg/personal.f564b0d4.js"),[],import.meta.url),"../../icons/svg/phone.svg":()=>o(()=>import("../svg/phone.2a5a0cf3.js"),[],import.meta.url),"../../icons/svg/phone_1.svg":()=>o(()=>import("../svg/phone_1.09719635.js"),[],import.meta.url),"../../icons/svg/ppt.svg":()=>o(()=>import("../svg/ppt.c455a25d.js"),[],import.meta.url),"../../icons/svg/process.svg":()=>o(()=>import("../svg/process.a9a5ed09.js"),[],import.meta.url),"../../icons/svg/safe.svg":()=>o(()=>import("../svg/safe.a795b357.js"),[],import.meta.url),"../../icons/svg/search.svg":()=>o(()=>import("../svg/search.da128d05.js"),[],import.meta.url),"../../icons/svg/setting.svg":()=>o(()=>import("../svg/setting.6eb875ed.js"),[],import.meta.url),"../../icons/svg/size.svg":()=>o(()=>import("../svg/size.fa5c0fcb.js"),[],import.meta.url),"../../icons/svg/smsCode.svg":()=>o(()=>import("../svg/smsCode.3862f18d.js"),[],import.meta.url),"../../icons/svg/star.svg":()=>o(()=>import("../svg/star.ef02425a.js"),[],import.meta.url),"../../icons/svg/table.svg":()=>o(()=>import("../svg/table.abe98908.js"),[],import.meta.url),"../../icons/svg/tabs.svg":()=>o(()=>import("../svg/tabs.8a9ac4c3.js"),[],import.meta.url),"../../icons/svg/test.svg":()=>o(()=>import("../svg/test.07122d42.js"),[],import.meta.url),"../../icons/svg/text.svg":()=>o(()=>import("../svg/text.e0b1681e.js"),[],import.meta.url),"../../icons/svg/users.svg":()=>o(()=>import("../svg/users.2e3111d1.js"),[],import.meta.url),"../../icons/svg/warning.svg":()=>o(()=>import("../svg/warning.4ea8d727.js"),[],import.meta.url),"../../icons/svg/warning_1.svg":()=>o(()=>import("../svg/warning_1.f9110dd9.js"),[],import.meta.url),"../../icons/svg/wechat.svg":()=>o(()=>import("../svg/wechat.c7dccb15.js"),[],import.meta.url),"../../icons/svg/zip.svg":()=>o(()=>import("../svg/zip.9779fa17.js"),[],import.meta.url)});for(const D in N){const p=D.replace(/(.*\/)*([^.]+).*/gi,"$2");V=[...V,p]}const F=V;const S={class:"icons-container"},j={class:"icon-item"},q={class:"icon-item"},M={class:"icon-item"},Z=k({name:"Icons"}),G=Object.assign(Z,{setup(D){const p=L([{icon:"caret-top"},{icon:"caret-bottom"},{icon:"caret-left"},{icon:"caret-right"},{icon:"arrow-top"},{icon:"arrow-bottom"},{icon:"arrow-left"},{icon:"arrow-right"},{icon:"d-arrow-left"},{icon:"d-arrow-right"},{icon:"menu"},{icon:"edit-outline"},{icon:"more"},{icon:"check"},{icon:"close"},{icon:"plus"},{icon:"minus"},{icon:"refresh"},{icon:"refresh roll"},{icon:"funnel"},{icon:"question"},{icon:"info"},{icon:"warning"},{icon:"success"},{icon:"error"},{icon:"remove"},{icon:"circle-plus"},{icon:"zoomin"},{icon:"zoomout"},{icon:"upload"},{icon:"download"},{icon:"eye"},{icon:"eye-slash"},{icon:"calendar"},{icon:"dot"},{icon:"print"},{icon:"search"}]),O=L(F),R=s=>`<svg-icon icon-class="${s}" />`,T=s=>`<el-icon > <${s.name}/> </el-icon>`,P=s=>`<i class="vxe-icon--${s.icon}" />`,v=(s,A)=>{y.success("\u590D\u5236\u6210\u529F")};return(s,A)=>{const f=a("svg-icon"),l=a("el-tooltip"),u=a("el-tab-pane"),b=a("ElIcon"),h=a("el-tabs"),m=C("clipboard");return _(),n("div",S,[r(h,{type:"border-card"},{default:i(()=>[r(u,{label:"Svg Icons"},{default:i(()=>[(_(!0),n(g,null,d(O.value,t=>E((_(),n("div",{key:t},[r(l,{class:"item",effect:"dark",content:"Top Left \u63D0\u793A\u6587\u5B57",placement:"top"},{content:i(()=>[I(c(t),1)]),default:i(()=>[e("div",j,[r(f,{"icon-class":t,"class-name":"disabled"},null,8,["icon-class"]),e("span",null,c(t),1)])]),_:2},1024)])),[[m,R(t),"copy"],[m,v,"success"]])),128))]),_:1}),r(u,{label:"Element Icons"},{default:i(()=>[(_(),n(g,null,d(x,t=>E(e("div",{key:t.name,ref_for:!0,ref:t.name},[r(l,{class:"item",effect:"dark",placement:"top"},{content:i(()=>[I(c(t.name),1)]),default:i(()=>[e("div",q,[r(b,{size:30},{default:i(()=>[(_(),z($(t)))]),_:2},1024),e("span",null,c(t.name),1)])]),_:2},1024)]),[[m,T(t),"copy"],[m,v,"success"]])),64))]),_:1}),r(u,{label:"Vxe Icons"},{default:i(()=>[(_(!0),n(g,null,d(p.value,t=>E((_(),n("div",{key:t.icon,ref_for:!0,ref:t.icon},[r(l,{class:"item",effect:"dark",placement:"top"},{content:i(()=>[I(c(t.icon),1)]),default:i(()=>[e("div",M,[e("i",{class:B("vxe-icon--"+t.icon)},null,2),e("span",null,c(t.icon),1)])]),_:2},1024)])),[[m,P(t),"copy"],[m,v,"success"]])),128))]),_:1})]),_:1})])}}}),So=w(G,[["__scopeId","data-v-91b58fba"]]);export{So as default};
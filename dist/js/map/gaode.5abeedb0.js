import{A as s}from"../@amap/@amap.39c0400f.js";import{L as c}from"../index/index.b60df228.js";import{_ as d}from"../../assets/index-3cbbf7e2.js";import{h as l,f as _,Z as f,_ as r,u,al as k,o as v,a4 as M,a2 as y,a as e}from"../@vue/@vue.bfa18c0b.js";import"../element-plus/element-plus.6baf754a.js";import"../lodash-es/lodash-es.5134c8bf.js";import"../@vueuse/@vueuse.af00d1b7.js";import"../@element-plus/@element-plus.b501a0e2.js";import"../@popperjs/@popperjs.4b6c69cf.js";import"../@ctrl/@ctrl.5c843f8a.js";import"../dayjs/dayjs.c6f15c19.js";import"../async-validator/async-validator.acfb96ca.js";import"../memoize-one/memoize-one.0376b3d0.js";import"../escape-html/escape-html.1d60d822.js";import"../normalize-wheel-es/normalize-wheel-es.4ffea87d.js";import"../@floating-ui/@floating-ui.27f32adc.js";import"../vue/vue.a70161ca.js";import"../lodash-unified/lodash-unified.80ea3563.js";import"../pinia/pinia.e886b05f.js";import"../js-cookie/js-cookie.cf83ad76.js";import"../axios/axios.144d64ba.js";import"../form-data/form-data.d2a9677b.js";import"../geotiff/geotiff.31f9d28a.js";import"../vue-router/vue-router.fc3768a4.js";import"../path-to-regexp/path-to-regexp.36ea9d8d.js";import"../fuse.js/fuse.js.88e2763d.js";import"../path-browserify/path-browserify.188d1ff8.js";import"../screenfull/screenfull.b3e6dc1f.js";import"../vue-i18n/vue-i18n.294a1884.js";import"../@intlify/@intlify.771bffe6.js";import"../mitt/mitt.f7ef348c.js";import"../qs/qs.0b9b56d9.js";import"../side-channel/side-channel.436aebc0.js";import"../get-intrinsic/get-intrinsic.c22bc727.js";import"../has-symbols/has-symbols.e8f3ca0e.js";import"../function-bind/function-bind.22e7ee79.js";import"../has/has.de2ce4c3.js";import"../call-bind/call-bind.deeb90eb.js";import"../object-inspect/object-inspect.65a2a1b2.js";import"../nprogress/nprogress.d4529c63.js";/* empty css                                 */import"../clipboard/clipboard.a49fd553.js";import"../xe-utils/xe-utils.ae8f073f.js";import"../vxe-table/vxe-table.e0aa4c39.js";import"../vue3-lottie/vue3-lottie.0bad4d94.js";import"../lottie-web/lottie-web.f16ff010.js";import"../vite-plugin-mock/vite-plugin-mock.f2e75bf1.js";import"../mockjs/mockjs.21d1b872.js";const g={class:"section-container"},h={__name:"gaode",setup(w){const a=l(),i={key:"5dc1bd09758a3d8eaafa4a8e5800e29c",version:"2.0",plugins:["AMap.MarkerCluster"],AMapUI:{version:"1.1",plugins:[]},Loca:{version:"2.0.0"}},p=async o=>{const t=new AMap.Marker({position:new AMap.LngLat(116.39,39.9),title:"北京"});o.add(t)},n=async o=>{const t=new AMap.Marker({position:new AMap.LngLat(116.39,39.9),offset:new AMap.Pixel(-10,-10),icon:"//vdata.amap.com/icons/b18/1/2.png",title:"北京"});o.add(t)};return _(()=>{s.load(i).then(async o=>{const t=new o.Map(a.value,{zoom:12,center:[116.397428,39.90923],pitch:0,viewMode:"3D"});await p(t),await n(t)}).catch(o=>{console.log(o)})}),(o,t)=>{const m=k("el-link");return v(),f(u(c),{title:"高德地图"},{head:r(()=>[M(m,{type:"primary",href:"https://lbs.amap.com/api/jsapi-v2/guide/overlays/vector-overlay",target:"_blank",underline:!1},{default:r(()=>[y("高德开放平台")]),_:1})]),body:r(()=>[e("div",g,[e("div",{id:"container",ref_key:"container",ref:a},null,512)])]),_:1})}}},yo=d(h,[["__scopeId","data-v-86f622cf"]]);export{yo as default};

webpackJsonp([9],{"2suI":function(t,n){},"2uFj":function(t,n,e){"use strict";e.d(n,"a",function(){return r});var r="http://47.104.181.207:3000"},M93x:function(t,n,e){"use strict";function r(t){e("2suI")}var a=e("xJD8"),o=e("vrA+"),u=e("VU/8"),s=r,i=u(a.a,o.a,!1,s,null,null);n.a=i.exports},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("7+uW"),a=e("M93x"),o=e("YaEn"),u=e("mtWM"),s=e.n(u),i=e("2uFj"),c=e("NYxO"),l=e("cTzj"),d=e.n(l),m=e("bqTm"),p=e.n(m),f=e("ZoQJ"),h=e("K/Lq"),g=e.n(h),v=e("ESwS"),C=e.n(v);s.a.defaults.withCredentials=!0,r.a.use(g.a),r.a.use(C.a),r.a.use(p.a),r.a.use(c.a),r.a.use(d.a,{loading:"static/loading-svg/loading-bars.svg",attempt:3}),r.a.filter("currency",f.a),r.a.config.productionTip=!1;var b=new c.a.Store({state:{nickName:"",cartCount:0},getters:{cartCount:function(t){return t.cartCount},nickName:function(t){return t.nickName}},mutations:{updateUserInfo:function(t,n){return t.nickName=n},updateCartCount:function(t,n){return t.cartCount+=n}}});new r.a({el:"#app",store:b,router:o.a,mounted:function(){this.checkLogin(),this.getCartCount()},methods:{checkLogin:function(){var t=this;s.a.get(i.a+"/users/checkLogin").then(function(n){var n=n.data;"0"==n.status?t.$store.commit("updateUserInfo",n.result):"/goods"!=t.$route.path&&t.$router.push("/goods")})},getCartCount:function(){var t=this,n=this.$cookie.get("userId");s.a.get(i.a+"/users/getCartCount?userId="+n).then(function(n){var n=n.data;"0"==n.status&&t.$store.commit("updateCartCount",n.result)})}},template:"<App/>",components:{App:a.a}})},YaEn:function(t,n,e){"use strict";var r=e("7+uW"),a=e("/ocq"),o=function(){return Promise.all([e.e(0),e.e(2)]).then(e.bind(null,"sGZB"))},u=function(){return Promise.all([e.e(0),e.e(3)]).then(e.bind(null,"5Z7Z"))},s=function(){return Promise.all([e.e(0),e.e(1)]).then(e.bind(null,"/rwO"))},i=function(){return Promise.all([e.e(0),e.e(7)]).then(e.bind(null,"9I81"))},c=function(){return Promise.all([e.e(0),e.e(5)]).then(e.bind(null,"JsEr"))},l=function(){return Promise.all([e.e(0),e.e(6)]).then(e.bind(null,"yVc9"))},d=function(){return Promise.all([e.e(0),e.e(4)]).then(e.bind(null,"QRpD"))};r.a.use(a.a),n.a=new a.a({routes:[{path:"/",name:"GoodsList",component:o},{path:"/goods",name:"GoodsList",component:o},{path:"/cart",name:"Cart",component:u},{path:"/address",name:"Address",component:s},{path:"/orderConfirm",name:"OrderConfirm",component:i},{path:"/orderSuccess",name:"OrderSuccess",component:c},{path:"/OrderList",name:"OrderList",component:l},{path:"/OrderItem",name:"OrderItem",component:d}]})},ZoQJ:function(t,n,e){"use strict";function r(t,n,e){if(t=parseFloat(t),!isFinite(t)||!t&&0!==t)return"";n=null!=n?n:"￥",e=null!=e?e:2;var r=Math.abs(t).toFixed(e),o=e?r.slice(0,-1-e):r,u=o.length%3,s=u>0?o.slice(0,u)+(o.length>3?",":""):"",i=e?r.slice(-1-e):"";return(t<0?"-":"")+n+s+o.slice(u).replace(a,"$1,")+i}n.a=r;var a=/(\d{3})(?=\d)/g},"vrA+":function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},a=[],o={render:r,staticRenderFns:a};n.a=o},xJD8:function(t,n,e){"use strict";n.a={name:"app"}}},["NHnr"]);
//# sourceMappingURL=app.d4c03ce7ee293054809b.js.map
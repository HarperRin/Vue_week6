"use strict";(self["webpackChunkvue_week6"]=self["webpackChunkvue_week6"]||[]).push([[365],{5365:function(a,e,s){s.r(e),s.d(e,{default:function(){return N}});var t=s(6252);function n(a,e,s,n,o,i){const c=(0,t.up)("DashboardNavbar"),r=(0,t.up)("VLoading"),l=(0,t.up)("router-view");return(0,t.wg)(),(0,t.iD)(t.HY,null,[(0,t.Wm)(c),(0,t.Wm)(r,{active:o.isLoading},null,8,["active"]),o.checkSuccess?((0,t.wg)(),(0,t.j4)(l,{key:0})):(0,t.kq)("",!0)],64)}var o=s(9963);const i={class:"navbar navbar-expand-lg navbar-dark bg-dark"},c={class:"container-fluid"},r=(0,t.Uk)("蛋糕坊"),l=(0,t._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarNav","aria-controls":"navbarNav","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,t.Uk)(" > "),(0,t._)("span",{class:"navbar-toggler-icon"})],-1),u={class:"collapse navbar-collapse",id:"navbarNav"},v={class:"navbar-nav"},d={class:"nav-item"},h=(0,t.Uk)("返回前台"),k={class:"nav-item"},p=(0,t.Uk)("產品列表"),g={class:"nav-item"},b=(0,t.Uk)("訂單列表"),m={class:"nav-item"};function f(a,e,s,n,f,_){const w=(0,t.up)("router-link");return(0,t.wg)(),(0,t.iD)("nav",i,[(0,t._)("div",c,[(0,t.Wm)(w,{class:"navbar-brand",to:"/admin"},{default:(0,t.w5)((()=>[r])),_:1}),l,(0,t._)("div",u,[(0,t._)("ul",v,[(0,t._)("li",d,[(0,t.Wm)(w,{class:"nav-link active",to:"/"},{default:(0,t.w5)((()=>[h])),_:1})]),(0,t._)("li",k,[(0,t.Wm)(w,{class:"nav-link",to:"/admin/products"},{default:(0,t.w5)((()=>[p])),_:1})]),(0,t._)("li",g,[(0,t.Wm)(w,{class:"nav-link",to:"/admin/orders"},{default:(0,t.w5)((()=>[b])),_:1})]),(0,t._)("li",m,[(0,t._)("a",{class:"nav-link",href:"#",onClick:e[0]||(e[0]=(0,o.iM)(((...a)=>_.signout&&_.signout(...a)),["prevent"]))},"登出")])])])])])}var _={methods:{signout(){document.cookie="hexToken=;expires=;",alert("token 已清除"),this.$router.push("/products")}}},w=s(3744);const $=(0,w.Z)(_,[["render",f]]);var L=$,x={components:{DashboardNavbar:L},data(){return{checkSuccess:!1,isLoading:!1}},methods:{checkLogin(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");if(a){this.isLoading=!0,this.$http.defaults.headers.common.Authorization=`${a}`;const e="https://vue3-course-api.hexschool.io/v2/api/user/check";this.$http.post(e).then((()=>{this.checkSuccess=!0,this.isLoading=!1})).catch((a=>{alert(a.data.message),this.$router.push("/login")}))}else alert("您尚未登入。"),this.$router.push("/login")}},mounted(){this.checkLogin()}};const W=(0,w.Z)(x,[["render",n]]);var N=W}}]);
//# sourceMappingURL=365.873e3c5d.js.map
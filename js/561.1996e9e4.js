"use strict";(self["webpackChunkvue_week6"]=self["webpackChunkvue_week6"]||[]).push([[561],{3561:function(t,e,s){s.r(e),s.d(e,{default:function(){return v}});var c=s(6252),a=s(3577);const i=(0,c._)("h2",null,"單一產品",-1),o={class:"container"},u={class:"row"},n={class:"col"},r=["src"];function d(t,e,s,d,l,h){const p=(0,c.up)("VLoading");return(0,c.wg)(),(0,c.iD)(c.HY,null,[i,(0,c.Wm)(p,{active:l.isLoading},null,8,["active"]),(0,c._)("div",o,[(0,c._)("div",u,[(0,c._)("div",n,[(0,c._)("h3",null,"產品名稱: "+(0,a.zw)(l.product.title),1),(0,c._)("img",{src:l.product.imageUrl,alt:""},null,8,r)])])])],64)}var l={data(){return{product:{},isLoading:!1}},methods:{getProduct(){const{id:t}=this.$route.params,e=`https://vue3-course-api.hexschool.io/v2/api/hlin-hexschool/product/${t}`;this.$http(e).then((t=>{this.isLoading=!0,this.product=t.data.product})).catch((t=>{alert(t.data.message)}))}},mounted(){this.getProduct()}},h=s(3744);const p=(0,h.Z)(l,[["render",d]]);var v=p}}]);
//# sourceMappingURL=561.1996e9e4.js.map
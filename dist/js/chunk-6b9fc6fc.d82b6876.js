(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b9fc6fc"],{"0de4":function(e,t,r){"use strict";r.r(t);var n=r("7a23"),a={class:"main"},c={class:"title"},s={class:"text-align-right"};function o(e,t,r,o,u,i){var l=Object(n["S"])("a-input"),b=Object(n["S"])("a-form-item"),d=Object(n["S"])("a-input-password"),f=Object(n["S"])("a-button"),p=Object(n["S"])("router-link"),m=Object(n["S"])("a-alert"),j=Object(n["S"])("a-form");return Object(n["J"])(),Object(n["l"])("div",a,[Object(n["m"])("h1",c,Object(n["V"])(e.t("page.user.register.form.title")),1),Object(n["o"])(j,{"wrapper-col":{span:24}},{default:Object(n["db"])((function(){return[Object(n["o"])(b,Object(n["x"])({label:""},e.validateInfos.username),{default:Object(n["db"])((function(){return[Object(n["o"])(l,{value:e.modelRef.username,"onUpdate:value":t[0]||(t[0]=function(t){return e.modelRef.username=t}),placeholder:e.t("page.user.register.form-item-username"),onKeyup:Object(n["fb"])(e.handleSubmit,["enter"])},null,8,["value","placeholder","onKeyup"])]})),_:1},16),Object(n["o"])(b,Object(n["x"])({label:""},e.validateInfos.password),{default:Object(n["db"])((function(){return[Object(n["o"])(d,{value:e.modelRef.password,"onUpdate:value":t[1]||(t[1]=function(t){return e.modelRef.password=t}),placeholder:e.t("page.user.register.form-item-password"),onKeyup:Object(n["fb"])(e.handleSubmit,["enter"])},null,8,["value","placeholder","onKeyup"])]})),_:1},16),Object(n["o"])(b,Object(n["x"])({label:""},e.validateInfos.confirm),{default:Object(n["db"])((function(){return[Object(n["o"])(d,{value:e.modelRef.confirm,"onUpdate:value":t[2]||(t[2]=function(t){return e.modelRef.confirm=t}),placeholder:e.t("page.user.register.form-item-confirmpassword"),onKeyup:Object(n["fb"])(e.handleSubmit,["enter"])},null,8,["value","placeholder","onKeyup"])]})),_:1},16),Object(n["o"])(b,null,{default:Object(n["db"])((function(){return[Object(n["o"])(f,{type:"primary",class:"submit",onClick:e.handleSubmit,loading:e.submitLoading},{default:Object(n["db"])((function(){return[Object(n["n"])(Object(n["V"])(e.t("page.user.register.form.btn-submit")),1)]})),_:1},8,["onClick","loading"]),Object(n["m"])("div",s,[Object(n["o"])(p,{to:"/user/login"},{default:Object(n["db"])((function(){return[Object(n["n"])(Object(n["V"])(e.t("page.user.register.form.btn-jump")),1)]})),_:1})])]})),_:1}),""===e.errorMsg||"undefined"===typeof e.errorMsg||e.submitLoading?Object(n["k"])("",!0):(Object(n["J"])(),Object(n["j"])(m,{key:0,message:e.errorMsg,type:"error","show-icon":!0},null,8,["message"]))]})),_:1})])}var u=r("c7eb"),i=r("1da1"),l=(r("d3b7"),r("ac1f"),r("5319"),r("6605")),b=r("5502"),d=r("47e2"),f=r("3af3"),p=r("f64c"),m=r("d4a6"),j=f["a"].useForm,O=Object(n["q"])({name:"UserRegister",setup:function(){var e=Object(l["d"])(),t=Object(b["b"])(),r=Object(d["b"])(),a=r.t,c=Object(n["N"])({username:"",password:"",confirm:""}),s=Object(n["N"])({username:[{required:!0,message:"page.user.register.form-item-username.required"}],password:[{required:!0,message:"page.user.register.form-item-password.required"}],confirm:[{validator:function(e,t,r){return""===t?Promise.reject("page.user.register.form-item-password.required"):t!==c.password?Promise.reject("page.user.register.form-item-confirmpassword.compare"):Promise.resolve()}}]}),o=j(c,s),f=o.validate,O=o.validateInfos,g=Object(n["O"])(!1),v=function(){var r=Object(i["a"])(Object(u["a"])().mark((function r(n){var c,s;return Object(u["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n.preventDefault(),g.value=!0,r.prev=2,r.next=5,f();case 5:return c=r.sent,r.next=8,t.dispatch("userregister/register",c);case 8:s=r.sent,!0===s&&(p["a"].success(a("page.user.register.form.register-success")),e.replace("/user/login")),r.next=15;break;case 12:r.prev=12,r.t0=r["catch"](2),p["a"].warning(a("app.global.form.validatefields.catch"));case 15:g.value=!1;case 16:case"end":return r.stop()}}),r,null,[[2,12]])})));return function(e){return r.apply(this,arguments)}}(),h=Object(m["a"])(O),w=Object(n["h"])((function(){return t.state.userregister.errorMsg}));return{t:a,modelRef:c,validateInfos:h,submitLoading:g,handleSubmit:v,errorMsg:w}}}),g=(r("1496"),r("6b0d")),v=r.n(g);const h=v()(O,[["render",o],["__scopeId","data-v-12708a36"]]);t["default"]=h},1496:function(e,t,r){"use strict";r("3957")},3957:function(e,t,r){},d4a6:function(e,t,r){"use strict";r.d(t,"a",(function(){return c}));r("e9c4"),r("d81d");var n=r("7a23"),a=r("47e2");function c(e){var t=Object(a["b"])(),r=t.t,c=Object(n["h"])((function(){var t={};for(var n in e)t[n]=JSON.parse(JSON.stringify(e[n])),t[n]&&t[n]["help"]&&(t[n]["help"]=t[n]["help"].map((function(e){return"string"==typeof e?r(e):e.map((function(e){return e?r(e):""}))})));return t}));return c}}}]);
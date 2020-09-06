(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-090d882e"],{"2ca0":function(t,a,e){"use strict";var i=e("23e7"),n=e("06cf").f,s=e("50c4"),r=e("5a34"),l=e("1d80"),o=e("ab13"),c=e("c430"),u="".startsWith,f=Math.min,d=o("startsWith"),p=!c&&!d&&!!function(){var t=n(String.prototype,"startsWith");return t&&!t.writable}();i({target:"String",proto:!0,forced:!p&&!d},{startsWith:function(t){var a=String(l(this));r(t);var e=s(f(arguments.length>1?arguments[1]:void 0,a.length)),i=String(t);return u?u.call(a,i,e):a.slice(e,e+i.length)===i}})},"44e7":function(t,a,e){var i=e("861d"),n=e("c6b6"),s=e("b622"),r=s("match");t.exports=function(t){var a;return i(t)&&(void 0!==(a=t[r])?!!a:"RegExp"==n(t))}},"5a34":function(t,a,e){var i=e("44e7");t.exports=function(t){if(i(t))throw TypeError("The method doesn't accept regular expressions");return t}},"77be":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",[e("Header",{attrs:{title:t.username}}),t.loaded?t._e():e("div",{staticClass:"page-loader"},[t._m(0)]),t.loaded?e("h1",{staticClass:"head-title-underline"},[e("i",{staticClass:"fas fa-info-circle icon"}),t._v(" My Account")]):t._e(),t.loaded?e("form",{staticClass:"form"},[e("div",{staticClass:"form-field"},[e("p",{staticClass:"form-field-title"},[t._v("Avatar")]),e("p",{staticClass:"form-field-title-description"},[t._v("Your profile picture which will slow on the website publically, max size 3 megabytes.")]),e("input",{ref:"avatar",staticClass:"form-field-file-input",attrs:{type:"file",id:"avatar-file"},on:{change:t.avatarUpdate}}),e("label",{staticClass:"form-field-file-input-label",attrs:{for:"avatar-file"},domProps:{innerHTML:t._s(t.avatarInputText)}})]),e("div",{staticClass:"form-field"},[e("p",{staticClass:"form-field-title"},[t._v("Bio")]),e("p",{staticClass:"form-field-title-description"},[t._v("A text of maxim 100 characters birefly describing you.")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.bio,expression:"bio"}],staticClass:"form-field-textarea",attrs:{placeholder:"I'm a mysterious person."},domProps:{value:t.bio},on:{input:[function(a){a.target.composing||(t.bio=a.target.value)},function(a){return t.update()}]}})]),e("div",{staticClass:"form-field"},[e("p",{staticClass:"form-field-title"},[t._v("Banner")]),e("p",{staticClass:"form-field-title-description"},[t._v("Your profile banner which will slow on your profile publically, max size 5 megabytes.")]),e("input",{ref:"banner",staticClass:"form-field-file-input",attrs:{type:"file",id:"banner-file"},on:{change:t.bannerUpdate}}),e("label",{staticClass:"form-field-file-input-label",attrs:{for:"banner-file"},domProps:{innerHTML:t._s(t.bannerInputText)}})])]):t._e(),t.changed?e("Confirm",{attrs:{loading:t.saving},on:{save:t.save,discard:t.discard}}):t._e(),e("Cookie")],1)},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"page-pulse"},[e("div"),e("div"),e("div")])}],s=(e("99af"),e("b0c0"),e("2ca0"),e("96cf"),e("1da1")),r=e("0418"),l=e("11e0"),o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("center",[e("div",{staticClass:"confirmation"},[e("div",{staticClass:"confirmation-text"},[t._v("Careful — you have unsaved changes!")]),e("div",{staticClass:"confirmation-buttons"},[e("a",{staticClass:"confirmation-discard",attrs:{href:"javascript:void(0)"},on:{click:function(a){return t.$emit("discard")}}},[t._v("Discard Changes")]),t.loading?t._e():e("a",{staticClass:"confirmation-primary",attrs:{href:"javascript:void(0)"},on:{click:function(a){return t.$emit("save")}}},[t._v("Save Changes")]),t.loading?e("a",{staticClass:"confirmation-primary"},[e("div",{staticClass:"ball-pulse"},[e("div"),e("div"),e("div")])]):t._e()])])])},c=[],u={name:"Confirm",props:["loading"]},f=u,d=e("2877"),p=Object(d["a"])(f,o,c,!1,null,null,null),h=p.exports,v=e("2f62"),m={name:"Account",computed:Object(v["c"])(["id","username"]),components:{Header:r["a"],Cookie:l["a"],Confirm:h},data:function(){return{data:{},loaded:!1,bio:null,changed:!1,saving:!1,avatarInputText:"<i class='fas fa-image'></i> Choose a profile picture",avatarInputValue:null,bannerInputText:"<i class='fas fa-image'></i> Choose a banner picture",bannerInputValue:null}},methods:{loadProfileData:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$axios.get("".concat(this.$apiBase,"/fetch/user/").concat(this.id),{withCredentials:!0,credentials:"same-origin"});case 2:a=t.sent,a.data.exists?(this.data=a.data.user,this.loaded=!0):window.location.href="/login",this.init();case 5:case"end":return t.stop()}}),t,this)})));function a(){return t.apply(this,arguments)}return a}(),init:function(){this.bio=this.data.bio},update:function(){this.bio!==this.data.bio||null!==this.avatarInputValue||null!==this.bannerInputValue?this.changed=!0:this.changed=!1},save:function(){this.saving=!0},discard:function(){this.init(),this.avatarInputValue=null,this.avatarInputText="<i class='fas fa-image'></i> Choose a profile picture",this.$refs.avatar.value="",this.bannerInputValue=null,this.bannerInputText="<i class='fas fa-image'></i> Choose a banner picture",this.$refs.banner.value="",this.changed=!1},avatarUpdate:function(t){var a=t.target,e=a.files[0];e?e.size>3e6?(this.avatarInputText="<i class='fas fa-exclamation-triangle'></i> Chose a profile picture (Max. 3MB)",this.avatarInputValue=null):(this.avatarInputText="<i class='fas fa-image'></i> ".concat(e.name),this.avatarInputValue=e):(this.avatarInputText="<i class='fas fa-image'></i> Choose a profile picture",this.avatarInputValue=null),this.update()},bannerUpdate:function(t){var a=t.target,e=a.files[0];e?e.type.startsWith("image")?e.size>5e6?(this.bannerInputText="<i class='fas fa-exclamation-triangle'></i> Chose a banner picture (Max. 5MB)",this.bannerInputValue=null):(this.bannerInputText="<i class='fas fa-image'></i> ".concat(e.name),this.bannerInputValue=e):(this.bannerInputValue=null,this.bannerInputText="<i class='fas fa-exclamation-triangle'></i> Choose a banner picture",a.value=""):(this.bannerInputText="<i class='fas fa-image'></i> Choose a banner picture",this.bannerInputText=null),this.update()}},mounted:function(){this.loadProfileData()}},b=m,g=Object(d["a"])(b,i,n,!1,null,null,null);a["default"]=g.exports},ab13:function(t,a,e){var i=e("b622"),n=i("match");t.exports=function(t){var a=/./;try{"/./"[t](a)}catch(e){try{return a[n]=!1,"/./"[t](a)}catch(i){}}return!1}},b0c0:function(t,a,e){var i=e("83ab"),n=e("9bf2").f,s=Function.prototype,r=s.toString,l=/^\s*function ([^ (]*)/,o="name";i&&!(o in s)&&n(s,o,{configurable:!0,get:function(){try{return r.call(this).match(l)[1]}catch(t){return""}}})}}]);
//# sourceMappingURL=chunk-090d882e.7709a4b9.js.map
(function(t){function e(e){for(var n,i,r=e[0],l=e[1],u=e[2],d=0,p=[];d<r.length;d++)i=r[d],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&p.push(s[i][0]),s[i]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);c&&c(e);while(p.length)p.shift()();return a.push.apply(a,u||[]),o()}function o(){for(var t,e=0;e<a.length;e++){for(var o=a[e],n=!0,r=1;r<o.length;r++){var l=o[r];0!==s[l]&&(n=!1)}n&&(a.splice(e--,1),t=i(i.s=o[0]))}return t}var n={},s={app:0},a=[];function i(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=n,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(o,n,function(e){return t[e]}.bind(null,n));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/bbox/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var u=0;u<r.length;u++)e(r[u]);var c=l;a.push([0,"chunk-vendors"]),o()})({0:function(t,e,o){t.exports=o("56d7")},"56d7":function(t,e,o){"use strict";o.r(e);o("e260"),o("e6cf"),o("cca6"),o("a79d");var n=o("2b0e"),s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app h-full w-full"}},[o("BaseMap")],1)},a=[],i=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"col col--12 w-full absolute top bottom"},[o("div",{staticClass:"absolute top left z1 bg-white px12 py12"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.rawbounds,expression:"rawbounds"}],staticClass:"input w600 fl h36",class:{"border border--red":!t.isValid},attrs:{disabled:!t.ready,placeholder:"GeoJSON Bounding Box"},domProps:{value:t.rawbounds},on:{input:function(e){e.target.composing||(t.rawbounds=e.target.value)}}}),o("div",{staticClass:"select-container ml6"},[o("select",{directives:[{name:"model",rawName:"v-model",value:t.epsg,expression:"epsg"}],staticClass:"h36",on:{change:function(e){var o=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.epsg=e.target.multiple?o:o[0]}}},[o("option",[t._v("EPSG:4326")]),o("option",[t._v("EPSG:3857")])])]),o("button",{staticClass:"btn btn--stroke round fr h36 ml6 px12 color-gray color-green-on-hover",attrs:{disabled:!t.ready},on:{click:t.start_draw}},[o("svg",{staticClass:"icon"},[o("use",{attrs:{"xlink:href":"#icon-pencil"}})])]),o("button",{staticClass:"dropdown btn btn--stroke round fr h36 ml6 px12",class:{"color-gray":!t.show.tiles,"color-green":t.show.tiles},attrs:{disabled:!t.ready||!t.isValid},on:{click:function(e){t.show.tiles=!t.show.tiles}}},[o("svg",{staticClass:"icon"},[o("use",{attrs:{"xlink:href":"#icon-tileset"}})]),o("div",{staticClass:"dropdown-content round bg-transparent"},[o("div",{staticClass:"triangle--u triangle color-gray ml12"}),o("div",{staticClass:"bg-white border border--gray round shadow px6 py3"},[o("label",[t._v("Zoom")]),o("input",{directives:[{name:"model",rawName:"v-model",value:t.zoom,expression:"zoom"}],staticClass:"input w60 h36",class:{"border border--red":!t.isTileValid},attrs:{placeholder:"z"},domProps:{value:t.zoom},on:{input:function(e){e.target.composing||(t.zoom=e.target.value)}}})])])]),o("button",{staticClass:"btn btn--stroke round fr h36 ml6 px12 color-gray color-green-on-hover",attrs:{disabled:!t.ready||!t.isValid},on:{click:t.fitBounds}},[o("svg",{staticClass:"icon"},[o("use",{attrs:{"xlink:href":"#icon-fullscreen"}})])])]),o("div",{staticClass:"w-full h-full",attrs:{id:"map"}})])},r=[],l=(o("d81d"),o("ac1f"),o("1276"),o("498a"),o("a9e3"),o("a15b"),o("5319"),o("e192")),u=o.n(l),c=(o("ac6d"),o("8ae5")),d=o("5568"),p=o("31cb"),h=o("2514"),b=o("4ff4"),f=o.n(b),m=(o("bdd0"),o("cae8")),g=o.n(m),w=o("b106"),v=o.n(w),y={name:"BaseMap",data:function(){return{show:{tiles:!1,labels:!1},epsg:"EPSG:4326",zoom:0,initial:!0,rawbounds:"",bounds:[],map:!1,draw:!1,ready:!1}},computed:{isValid:function(){if(this.initial)return!0;var t=this.rawbounds.trim().split(",").map((function(t){return Number(t)}));return 4===t.length},isTileValid:function(){return!isNaN(parseInt(this.zoom))}},watch:{"show.tiles":function(){if(this.ready&&!this.show.tiles)for(var t=0,e=["tiles","tiles-centroid"];t<e.length;t++){var o=e[t];this.map.getSource(o).setData({type:"geojson",data:{type:"FeatureCollection",features:[]}})}},zoom:function(){this.ready&&this.tiles()},rawbounds:function(){this.ready&&this.compute_bounds()},bounds:function(){this.ready&&this.show_bounds()},epsg:function(){this.bounds.length&&("EPSG:4326"===this.epsg?this.rawbounds=Object(d["a"])(Object(p["b"])(Object(c["a"])(this.bounds))).join(","):"EPSG:3857"===this.epsg&&(this.rawbounds=Object(d["a"])(Object(p["a"])(Object(c["a"])(this.bounds))).join(",")))}},mounted:function(){window.location.hash&&decodeURIComponent(window.location.hash.replace("#","")).split(":").length?(this.epsg="EPSG:"+decodeURIComponent(window.location.hash.replace("#","")).split(":")[0],this.rawbounds=decodeURIComponent(window.location.hash.replace("#","")).split(":")[1]):window.location.hash="",this.init()},methods:{convert:function(){return"EPSG:4326"===this.epsg?this.bounds:Object(d["a"])(Object(p["b"])(Object(c["a"])(this.bounds)))},start_draw:function(){this.epsg="EPSG:4326",this.draw.changeMode("draw_rectangle")},tiles:function(){var t=this,e=f.a.geojson(Object(c["a"])(this.convert()).geometry,{min_zoom:parseInt(this.zoom),max_zoom:parseInt(this.zoom)});this.map.getSource("tiles").setData(e),e.features=e.features.map((function(e){return e=Object(h["a"])(e.geometry),e.properties.tile=f.a.tiles(e.geometry,{min_zoom:parseInt(t.zoom),max_zoom:parseInt(t.zoom)})[0].join(" - "),e})),this.map.getSource("tiles-centroid").setData(e)},compute_bounds:function(){if(this.initial=!1,!this.isValid)return this.bounds=!1;this.bounds=this.rawbounds.trim().split(",").map((function(t){return Number(t)})),4===this.bounds.length&&(this.rawbounds=this.bounds.join(", ")),window.location.hash=this.epsg.replace("EPSG:","")+":"+this.rawbounds},show_bounds:function(){this.isValid?(this.map.getSource("bounds").setData({type:"Feature",properties:{},geometry:Object(c["a"])(this.convert()).geometry}),this.fitBounds()):this.map.getSource("bounds").setData({type:"FeatureCollection",features:[]}),this.$emit("bounds",this.convert())},init:function(){var t=this;u.a.accessToken="pk.eyJ1IjoiaW5nYWxscyIsImEiOiJja2t5OGd0YzkwNDV1MnBwbHMweW16NTY0In0.g_OkZI1t3AOxWgRkmArlBQ",this.map=new u.a.Map({container:"map",zoom:1,style:"mapbox://styles/mapbox/light-v9"});var e=g.a.modes;e.draw_rectangle=v.a,this.draw=new g.a({displayControlsDefault:!1,modes:e}),this.map.addControl(this.draw,"bottom-right"),this.map.addControl(new u.a.NavigationControl,"bottom-right"),this.map.on("draw.create",(function(e){t.rawbounds=Object(d["a"])(e.features[0]).join(","),t.draw.deleteAll()})),this.map.on("load",(function(){for(var e=0,o=["bounds","tiles","tiles-centroid"];e<o.length;e++){var n=o[e];t.map.addSource(n,{type:"geojson",data:{type:"FeatureCollection",features:[]}})}t.map.addLayer({id:"bounds-poly",type:"fill",source:"bounds",paint:{"fill-color":"#0b6623","fill-opacity":.8}}),t.map.addLayer({id:"tiles-label",type:"symbol",source:"tiles-centroid",layout:{"text-field":["get","tile"],"text-size":12},paint:{}}),t.map.addLayer({id:"tiles-poly",type:"line",source:"tiles",paint:{"line-color":"#000"}}),t.ready=!0,t.compute_bounds(),t.show_bounds()}))},fitBounds:function(){this.isValid&&this.map.fitBounds(this.convert(),{padding:100,linear:!0})}}},j=y,O=(o("fa6e"),o("2877")),_=Object(O["a"])(j,i,r,!1,null,null,null),x=_.exports,C={name:"App",components:{BaseMap:x}},S=C,z=Object(O["a"])(S,s,a,!1,null,null,null),P=z.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(P)}}).$mount("#app")},"6ac6":function(t,e,o){},fa6e:function(t,e,o){"use strict";o("6ac6")}});
//# sourceMappingURL=app.b2683e3b.js.map
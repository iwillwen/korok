/*!
 * Korok (version 0.0.1) - Configurable Components System
 * 
 * Will Wen Gunn(iwillwen) and other contributors
 * 
 * @license MIT-license
 * @copyright 2019 iwillwen(willwengunn@gmail.com)
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("korok",[],t):"object"==typeof exports?exports.korok=t():e.korok=t()}(this,function(){return function(r){var n={};function o(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}return o.m=r,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(r,n,function(e){return t[e]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,p,t){"use strict";var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};Object.defineProperty(p,"__esModule",{value:!0});var r,o,i=t(1),s=t(2);(o=r=p.PropType||(p.PropType={}))[o.string=0]="string",o[o.number=1]="number",o[o.boolean=2]="boolean",o[o.json=3]="json",p.BINDING_COLUMN_REGEX=/^\@\{([\w\d\/\_\-\(\):\'\%\*,]+)\}$/,p.BINDING_COLUMNS_REGEX=/\@\{([\w\d\/\_\-\(\):\'\%\*,]+)\}/g;var u={default:"",description:"",type:r.string,required:!1,title:""},a={description:"",scope:"korok"},f=function(){function e(e){this.key=e}return e.prototype.registerProp=function(e,t){return void 0===t&&(t=u),c.registerProp(this.key,e,t),this},e.prototype.registerParam=function(e,t){return void 0===t&&(t=a),c.registerParam(this.key,e,t),this},e}(),c=function(){function e(e,t){this.id=Math.random().toString(32).substr(2).substr(2,4),this.props={},this.paramsFunc=function(){return{}},this.reactionCallback=function(){},this.key=e,null!=t&&"[object Object]"===t.toString()&&(this.props=t),this.compose()}return e.register=function(e,t){return this.koroks[e]||(this.koroks[e]=t),new f(e)},e.get=function(e){return this.koroks[e]?this.koroks[e]:null},e.registerRegularProp=function(e,t){void 0===t&&(t=u),t.key=e,this.regularProps[e]=t},e.registerProp=function(e,t,r){void 0===r&&(r=u),this.korokPropsMap[e]||(this.korokPropsMap[e]=[]),this.korokPropsMap[e].push(n({key:t},r))},e.registerParam=function(e,t,r){void 0===r&&(r=a),this.korokParamsMap[e]||(this.korokParamsMap[e]=[]),this.korokParamsMap[e].push(n({key:t},r))},Object.defineProperty(e.prototype,"Korok",{get:function(){return this.constructor},enumerable:!0,configurable:!0}),e.prototype.reaction=function(e){return this.reactionCallback=e,this},e.prototype.compose=function(e){for(var t=0,r=this.Korok.korokParamsMap[this.key]||[];t<r.length;t++){var n=r[t];i.default.registerParam(("page"===n.scope?"page":this.id)+":"+n.key,this)}return e&&this.reaction(e),this.Korok.messageBus.on("reaction",this.reactionCallback),this},e.prototype.dispose=function(){return this.Korok.messageBus.removeListener("reaction",this.reactionCallback),this},e.prototype.dispatch=function(){return this.Korok.messageBus.emit("reaction"),this},e.prototype.setProp=function(e,t){return this.props[e]=t,this.Korok.messageBus.emit("reaction"),this},e.prototype.setProps=function(e){return"[object Object]"===e.toString()&&(this.props=n({},this.props,e),this.Korok.messageBus.emit("reaction")),this},e.prototype.getPropsList=function(){var e=[];for(var t in this.Korok.regularProps)e.push(this.Korok.regularProps[t]);return(this.Korok.korokPropsMap[this.key]||[]).concat(e)},e.prototype.getParamsList=function(){return this.Korok.korokParamsMap[this.key]||[]},e.prototype.bindParam=function(e){return this.paramsFunc=e.bind(this),this},e.prototype.serializationParams=function(){return this.paramsFunc()},e.prototype.getColumnField=function(e){var t=e.match(p.BINDING_COLUMN_REGEX);return t?t[1]:""},e.prototype.getProp=function(e){var t=this.getOriginalProp(e);return t&&"string"==typeof t?this.processColumnBinding(t):this.getOriginalProp(e)},e.prototype.getOriginalProp=function(t){var e=this.getPropsList().find(function(e){return e.key===t});if(!e)return null;var r=this.props[t];return null==r&&(r=e.default),r},e.prototype.getParam=function(e){return i.default.get(e.startsWith("page:")?e:this.id+":"+e)},e.prototype.getColumn=function(e){var t=this.getColumnField(e);return this.getParam(t)},e.prototype.processColumnBinding=function(e){var r=this;if("string"==typeof e&&e.match(p.BINDING_COLUMNS_REGEX)){if(e.match(p.BINDING_COLUMN_REGEX))return this.getColumn(e);var t=e.match(p.BINDING_COLUMNS_REGEX);if(t){for(var n=e,o=0,i=t.map(function(e){var t=r.getColumn(e)||r.getProp(r.getColumnField(e));return[r.getColumnField(e),t]}).filter(function(e){e[0];return!!e[1]});o<i.length;o++){var s=i[o],u=s[0],a=s[1];n=n.replace("@{"+u+"}",a)}return n}return null}return e},e.koroks={},e.regularProps={},e.korokPropsMap={},e.korokParamsMap={},e.PropTypes=r,e.messageBus=s.default,e}();p.default=c},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){this.pageScopedParamGetters={}}return e.prototype.registerParam=function(e,t){this.pageScopedParamGetters[e]=t},e.prototype.has=function(e){return this.pageScopedParamGetters,e},e.prototype.get=function(e){return this.pageScopedParamGetters[e]?this.pageScopedParamGetters[e].serializationParams()[e.substr(5)]:null},e.prototype.clear=function(){this.pageScopedParamGetters={}},e}();t.KorokParamsStore=n,t.default=new n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(3);t.default=new n.EventEmitter},function(e,t,r){"use strict";var n,o="object"==typeof Reflect?Reflect:null,f=o&&"function"==typeof o.apply?o.apply:function(e,t,r){return Function.prototype.apply.call(e,t,r)};n=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var i=Number.isNaN||function(e){return e!=e};function s(){s.init.call(this)}((e.exports=s).EventEmitter=s).prototype._events=void 0,s.prototype._eventsCount=0,s.prototype._maxListeners=void 0;var u=10;function a(e){return void 0===e._maxListeners?s.defaultMaxListeners:e._maxListeners}function p(e,t,r,n){var o,i,s;if("function"!=typeof r)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof r);if(void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,r.listener?r.listener:r),i=e._events),s=i[t]),void 0===s)s=i[t]=r,++e._eventsCount;else if("function"==typeof s?s=i[t]=n?[r,s]:[s,r]:n?s.unshift(r):s.push(r),0<(o=a(e))&&s.length>o&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,function(e){console&&console.warn&&console.warn(e)}(u)}return e}function c(e,t,r){var n={fired:!1,wrapFn:void 0,target:e,type:t,listener:r},o=function(){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t]);this.fired||(this.target.removeListener(this.type,this.wrapFn),this.fired=!0,f(this.listener,this.target,e))}.bind(n);return o.listener=r,n.wrapFn=o}function l(e,t,r){var n=e._events;if(void 0===n)return[];var o=n[t];return void 0===o?[]:"function"==typeof o?r?[o.listener||o]:[o]:r?function(e){for(var t=new Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}(o):v(o,o.length)}function h(e){var t=this._events;if(void 0!==t){var r=t[e];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function v(e,t){for(var r=new Array(t),n=0;n<t;++n)r[n]=e[n];return r}Object.defineProperty(s,"defaultMaxListeners",{enumerable:!0,get:function(){return u},set:function(e){if("number"!=typeof e||e<0||i(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");u=e}}),s.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},s.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||i(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},s.prototype.getMaxListeners=function(){return a(this)},s.prototype.emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t.push(arguments[r]);var n="error"===e,o=this._events;if(void 0!==o)n=n&&void 0===o.error;else if(!n)return!1;if(n){var i;if(0<t.length&&(i=t[0]),i instanceof Error)throw i;var s=new Error("Unhandled error."+(i?" ("+i.message+")":""));throw s.context=i,s}var u=o[e];if(void 0===u)return!1;if("function"==typeof u)f(u,this,t);else{var a=u.length,p=v(u,a);for(r=0;r<a;++r)f(p[r],this,t)}return!0},s.prototype.on=s.prototype.addListener=function(e,t){return p(this,e,t,!1)},s.prototype.prependListener=function(e,t){return p(this,e,t,!0)},s.prototype.once=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.on(e,c(this,e,t)),this},s.prototype.prependOnceListener=function(e,t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);return this.prependListener(e,c(this,e,t)),this},s.prototype.off=s.prototype.removeListener=function(e,t){var r,n,o,i,s;if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t);if(void 0===(n=this._events))return this;if(void 0===(r=n[e]))return this;if(r===t||r.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete n[e],n.removeListener&&this.emit("removeListener",e,r.listener||t));else if("function"!=typeof r){for(o=-1,i=r.length-1;0<=i;i--)if(r[i]===t||r[i].listener===t){s=r[i].listener,o=i;break}if(o<0)return this;0===o?r.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(r,o),1===r.length&&(n[e]=r[0]),void 0!==n.removeListener&&this.emit("removeListener",e,s||t)}return this},s.prototype.removeAllListeners=function(e){var t,r,n;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[e]),this;if(0===arguments.length){var o,i=Object.keys(r);for(n=0;n<i.length;++n)"removeListener"!==(o=i[n])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=r[e]))this.removeListener(e,t);else if(void 0!==t)for(n=t.length-1;0<=n;n--)this.removeListener(e,t[n]);return this},s.prototype.listeners=function(e){return l(this,e,!0)},s.prototype.rawListeners=function(e){return l(this,e,!1)},s.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):h.call(e,t)},s.prototype.listenerCount=h,s.prototype.eventNames=function(){return 0<this._eventsCount?n(this._events):[]}}])});
//# sourceMappingURL=korok.map
!function(){function t(t){return t&&t.__esModule?t.default:t}var e={};function n(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var o=function(){var t;function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.INITIAL_STATE;!function(t,e){if(!(t instanceof e))throw TypeError("Cannot call a class as a function")}(this,e),this.initialState=t,this.state=JSON.parse(JSON.stringify(this.initialState)),this.score=0,this.status=e.STATUS.idle,this.gameSize=t.length}return t=[{key:"moveLeft",value:function(){this.move(e.DIRECTION.left)}},{key:"moveRight",value:function(){this.move(e.DIRECTION.right)}},{key:"moveUp",value:function(){this.move(e.DIRECTION.up)}},{key:"moveDown",value:function(){this.move(e.DIRECTION.down)}},{key:"getScore",value:function(){return this.score}},{key:"getState",value:function(){return this.state}},{key:"getStatus",value:function(){return this.status}},{key:"start",value:function(){this.status=e.STATUS.playing,this.addTile(),this.addTile()}},{key:"restart",value:function(){this.state=JSON.parse(JSON.stringify(this.initialState)),this.score=0,this.status=e.STATUS.idle}},{key:"move",value:function(t){var n,r=this;this.getStatus()===e.STATUS.playing&&(t===e.DIRECTION.left&&(n=this.state.map(function(t){return r.updateRow(t)})),t===e.DIRECTION.right&&(n=this.reverseRows(this.reverseRows(this.state).map(function(t){return r.updateRow(t)}))),t===e.DIRECTION.up&&(n=this.columnsToRows(this.columnsToRows(this.state).map(function(t){return r.updateRow(t)}))),t===e.DIRECTION.down&&(n=this.columnsToRows(this.reverseRows(this.reverseRows(this.columnsToRows(this.state)).map(function(t){return r.updateRow(t)})))),this.shouldMove(this.state,n)&&(this.state=n,this.addTile()),this.updateGameStatus())}},{key:"getEmptyCells",value:function(){return this.state.reduce(function(t,e,n){return e.forEach(function(e,r){e||t.push({rowIndex:n,colIndex:r})}),t},[])}},{key:"addTile",value:function(){var t=this.getEmptyCells();if(t.length){var e=Math.floor(Math.random()*t.length),n=t[e],r=n.rowIndex,o=n.colIndex;this.state[r][o]=.1>=Math.random()?4:2}}},{key:"columnsToRows",value:function(t){return t.reduce(function(t,e){return e.forEach(function(e,n){t[n]||(t[n]=[]),t[n].push(e)}),t},[])}},{key:"reverseRows",value:function(t){return t.map(function(t){return((function(t){if(Array.isArray(t))return r(t)})(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return r(t,void 0);var n=Object.prototype.toString.call(t).slice(8,-1);if("Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return r(t,void 0)}}(t)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).reverse()})}},{key:"updateRow",value:function(t){for(var e=t.filter(function(t){return t}),n=0;n<e.length-1;n++){var r=e[n];if(r===e[n+1]){var o=2*r;e[n]=o,e.splice(n+1,1),this.score+=o}}for(;e.length<this.gameSize;)e.push(0);return e}},{key:"canMoveRow",value:function(t){return t.some(function(e,n){return e===t[n+1]})}},{key:"shouldMove",value:function(t,e){return e.some(function(e,n){return e.some(function(e,r){return e!==t[n][r]})})}},{key:"canMove",value:function(){var t=this;return this.state.some(function(e){return t.canMoveRow(e)})||this.columnsToRows(this.state).some(function(e){return t.canMoveRow(e)})}},{key:"updateGameStatus",value:function(){this.state.some(function(t){return t.includes(e.WIN_COUNT)})&&(this.status=e.STATUS.win),this.canMove()||(this.status=e.STATUS.lose)}}],function(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}(e.prototype,t),e}();n(o,"STATUS",{idle:"idle",playing:"playing",win:"win",lose:"lose"}),n(o,"DIRECTION",{left:"left",right:"right",up:"up",down:"down"}),n(o,"INITIAL_STATE",[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]),n(o,"WIN_COUNT",2048);var i=new(t(e=o)),s=document.querySelector(".button"),a=document.querySelector("tbody"),u=document.querySelector(".message-start"),c=document.querySelector(".message-lose"),l=document.querySelector(".message-win"),d=document.querySelector(".game-score");function f(){document.removeEventListener("keydown",h)}function h(n){switch(n.preventDefault(),n.key){case"ArrowLeft":i.moveLeft();break;case"ArrowRight":i.moveRight();break;case"ArrowUp":i.moveUp();break;case"ArrowDown":i.moveDown()}v(),[t(e).STATUS.win,t(e).STATUS.lose].includes(i.getStatus())&&(f(),m())}function v(){i.state.forEach(function(t,e){var n=document.createElement("tr");n.classList.add("field-row"),t.forEach(function(t){var e=document.createElement("td");e.classList.add("field-cell"),t&&e.classList.add("field-cell--".concat(t)),e.textContent=t||"",n.appendChild(e)}),a.replaceChild(n,a.rows[e])}),d.textContent=i.getScore().toString()}function m(){switch(i.getStatus()){case t(e).STATUS.idle:u.classList.remove("hidden"),l.classList.add("hidden"),c.classList.add("hidden");break;case t(e).STATUS.playing:u.classList.add("hidden");break;case t(e).STATUS.win:l.classList.remove("hidden");break;case t(e).STATUS.lose:c.classList.remove("hidden")}}s.addEventListener("click",function(){i.getStatus()===t(e).STATUS.idle?(document.addEventListener("keydown",h),s.textContent="Restart",i.start()):(s.textContent="Start",i.restart(),f()),s.classList.toggle("restart"),s.classList.toggle("start"),v(),m()})}();
//# sourceMappingURL=index.483d2aea.js.map

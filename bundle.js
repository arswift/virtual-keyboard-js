(()=>{"use strict";(()=>{const e=document.createElement("div");e.classList.add("wrapper"),e.insertAdjacentHTML("beforeend","<h1>RSS Virtual Keyboard</h1>"),e.insertAdjacentHTML("beforeend",'<textarea class="input" autofocus></textarea>'),document.body.append(e)})();const e=document.querySelector(".input"),t=new class{constructor({input:e,codeDict:t,dictEn:s,dictRu:i,shiftRuNorm:n,shiftRuReversed:r,shiftEnNorm:o,shiftEnReversed:a,shiftRuCode:c,shiftEnCode:h}){this.properties.input=e,this.elements.ruDict=i,this.elements.enDict=s,this.elements.codeDict=t,this.elements.shiftRu=n,this.elements.shiftrevRu=r,this.elements.shiftEn=o,this.elements.shiftrevEn=a,this.elements.shiftRuCode=c,this.elements.shiftEnCode=h}elements={keysContainer:null,keys:[],keyboardEn:{},keyboardRu:{},ruToEng:{},engToRu:{}};properties={value:"",capsLock:!1,shift:!1,lang:"ru",curShift:this.elements.shiftRu,curRShift:this.elements.shiftrevRu,curKeyboard:this.elements.keyboardRu,curShiftCode:this.elements.shiftRuCode};init(){this._generateKeyboard(),this._generateDict(this.elements.ruDict,this.elements.codeDict,this.elements.keyboardRu),this.elements.keyboardRu.Equal="=",this.properties.curKeyboard=this.elements.keyboardRu,this.properties.curShift=this.elements.shiftRu,this.properties.curRShift=this.elements.shiftrevRu,this.properties.curShiftCode=this.elements.shiftRuCode,this._generateDict(this.elements.enDict,this.elements.codeDict,this.elements.keyboardEn),this.elements.keyboardEn.Equal="=",this.properties.lang=localStorage.getItem("lang")||"ru",window.addEventListener("keydown",(e=>{this._keyboardPressHandler(e)})),window.addEventListener("keyup",(e=>{this.elements.keys.forEach((t=>{if(t.textContent===this.properties.curKeyboard[e.code]||t.textContent===this.properties.curShiftCode[e.code]||t.textContent.toLowerCase()===this.properties.curKeyboard[e.code])t.classList.remove("active");else if("Ctrl"!==t.textContent&&"Alt"!==t.textContent&&"Shift"!==t.textContent&&""!==t.textContent||!t.classList.contains(e.code))"Del"===t.textContent&&"Delete"===e.code&&t.classList.remove("active");else switch(t.classList.remove("active"),e.code){case"ShiftLeft":case"ShiftRight":this._offShift()}}))})),"ru"!==this.properties.lang&&(this.properties.lang="ru",this._switchLang())}_generateKeyboard(){const e=document.querySelector(".wrapper");this.elements.keysContainer=document.createElement("div"),this.elements.keysContainer.classList.add("keyboard"),this.elements.keysContainer.append(this._createKeys()),e.append(this.elements.keysContainer),this.elements.keys=e.querySelectorAll(".key"),e.insertAdjacentHTML("beforeend",'<p class="description">Клавиатура создана в операционной системе Windows</p>'),e.insertAdjacentHTML("beforeend",'<p class="language">Для переключения языка комбинация: левыe ctrl + alt</p>')}_keyboardPressHandler(e){const t=document.querySelector(".ControlLeft"),s=document.querySelector(".AltLeft");this.elements.keys.forEach((i=>{if(e.preventDefault(),i.textContent===this.properties.curKeyboard[e.code]||i.textContent===this.properties.curShiftCode[e.code]||i.textContent.toLowerCase()===this.properties.curKeyboard[e.code])switch(i.classList.add("active"),e.code){case"Backspace":this._backSpace();break;case"Tab":this._inputValue("    ");break;case"Delete":this._del();break;case"CapsLock":this._toggleCapsLock();break;case"Enter":this._inputValue("\n");break;case"MetaLeft":break;default:this._inputValue(i.textContent)}else if(("Ctrl"===i.textContent||"Alt"===i.textContent||"Shift"===i.textContent||""===i.textContent)&&i.classList.contains(e.code))switch(i.classList.add("active"),e.code){case"ShiftLeft":case"ShiftRight":this._onShift();break;case"ControlLeft":s.classList.contains("active")&&this._switchLang();break;case"ControlRight":case"AltRight":default:break;case"AltLeft":t.classList.contains("active")&&this._switchLang();break;case"Space":this._inputValue(" ")}}))}_createKeys(){const e=document.createDocumentFragment();return this.elements.ruDict.forEach((t=>{const s=document.createElement("button");switch(s.classList.add("key"),s.setAttribute("type","button"),s.textContent=t,t){case"Backspace":s.classList.add("back"),s.addEventListener("click",(()=>{this._backSpace()}));break;case"Tab":s.classList.add("m"),s.addEventListener("click",(()=>{this._inputValue("    ")}));break;case"Del":s.addEventListener("click",(()=>{this._del()}));break;case"CapsLock":s.classList.add("xl","caps"),s.addEventListener("click",(()=>{this._toggleCapsLock()}));break;case"Enter":s.classList.add("xxl"),s.addEventListener("click",(()=>{this._inputValue("\n")}));break;case"ShiftL":s.classList.add("xl","ShiftLeft"),s.textContent="Shift",s.addEventListener("mousedown",(()=>{this._onShift()})),s.addEventListener("mouseup",(()=>{this._offShift()}));break;case"ShiftR":s.classList.add("xxl","ShiftRight"),s.textContent="Shift",s.addEventListener("mousedown",(()=>{this._onShift()})),s.addEventListener("mouseup",(()=>{this._offShift()}));break;case"CtrlL":s.classList.add("l","ControlLeft"),s.textContent="Ctrl";break;case"CtrlR":s.classList.add("l","ControlRight"),s.textContent="Ctrl";break;case"Win":s.classList.add("l");break;case"AltL":s.classList.add("l","AltLeft"),s.textContent="Alt";break;case"AltR":s.classList.add("l","AltRight"),s.textContent="Alt";break;case"Space":s.classList.add("Space"),s.textContent="",s.addEventListener("click",(()=>{this._inputValue(" ")}));break;default:s.textContent=t.toLowerCase(),s.classList.add("letter"),s.addEventListener("click",(e=>{this._inputValue(e.target.textContent)}))}e.append(s)})),e}_toggleCapsLock(){this.properties.capsLock=!this.properties.capsLock;const e=document.querySelectorAll(".letter");document.querySelector(".caps").classList.toggle("caps-active");for(const t of e)t.textContent=this.properties.capsLock?t.textContent.toUpperCase():t.textContent.toLowerCase()}_onShift(){this.properties.capsLock?this.properties.shift=!1:this.properties.shift=!0,this._toggleShift()}_offShift(){this.properties.capsLock?this.properties.shift=!0:this.properties.shift=!1,this._toggleShift()}_toggleShift(){document.querySelectorAll(".letter").forEach((e=>{e.textContent=this.properties.shift?e.textContent.toUpperCase():e.textContent.toLowerCase()})),document.querySelectorAll(".key").forEach((e=>{this.properties.shift&&this.properties.curShift[e.textContent]?e.textContent=this.properties.curShift[e.textContent]:!this.properties.shift&&this.properties.curRShift[e.textContent]&&(e.textContent=this.properties.curRShift[e.textContent])}))}_inputValue(e){const t=this.properties.input.selectionStart,s=this.properties.input.selectionEnd,i=this.properties.value;i.length+1!==t?this.properties.value=i.slice(0,t)+e+i.slice(s):this.properties.value+=e,this.properties.input.value=this.properties.value,this.properties.input.setSelectionRange(t+e.length,t+e.length)}_backSpace(){const e=this.properties.input.selectionStart,t=this.properties.input.selectionEnd,s=this.properties.value;this.properties.value=e===t?s.slice(0,e-1)+s.slice(t):s.slice(0,e)+s.slice(t),this.properties.input.value=this.properties.value,e===t?this.properties.input.setSelectionRange(e-1,e-1):this.properties.input.setSelectionRange(e,e)}_del(){const e=this.properties.input.selectionStart,t=this.properties.input.selectionEnd,s=this.properties.value;if(s.length<=1||e<=1&&e===t)return this.properties.input.setSelectionRange(e,e);this.properties.value=e===t?s.slice(0,e)+s.slice(t+1):s.slice(0,e)+s.slice(t),this.properties.input.value=this.properties.value,this.properties.input.setSelectionRange(e,e)}_generateDict(e,t,s){for(let i=0;i<t.length;i++)s[t[i]]=e[i]}_switchLang(){let e=!1;this.properties.capsLock&&(this._toggleCapsLock(),e=!0),"ru"===this.properties.lang?(this.properties.lang="en",Object.keys(this.elements.ruToEng).length||this._generateDict(this.elements.enDict,this.elements.ruDict,this.elements.ruToEng),this.properties.curShift=this.elements.shiftEn,this.properties.curRShift=this.elements.shiftrevEn,this.properties.curShiftCode=this.elements.shiftEnCode,this.properties.curKeyboard=this.elements.keyboardEn):(this.properties.lang="ru",Object.keys(this.elements.engToRu).length||this._generateDict(this.elements.ruDict,this.elements.enDict,this.elements.engToRu),this.properties.curShift=this.elements.shiftRu,this.properties.curRShift=this.elements.shiftrevRu,this.properties.curShiftCode=this.elements.shiftRuCode,this.properties.curKeyboard=this.elements.keyboardRu);let t="en"===this.properties.lang?this.elements.ruToEng:this.elements.engToRu;this.elements.keys.forEach((e=>{"Shift"!==e.textContent&&"Alt"!==e.textContent&&"Ctrl"!==e.textContent&&(e.textContent=t[e.textContent])})),e&&this._toggleCapsLock(),this._setlocal()}_setlocal(){localStorage.setItem("lang",this.properties.lang)}}({input:e,codeDict:["Backquote","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9","Digit0","Minus","IntlYen","Backspace","Tab","KeyQ","KeyW","KeyE","KeyR","KeyT","KeyY","KeyU","KeyI","KeyO","KeyP","BracketLeft","BracketRight","Backslash","Delete","CapsLock","KeyA","KeyS","KeyD","KeyF","KeyG","KeyH","KeyJ","KeyK","KeyL","Semicolon","Quote","Enter","ShiftLeft","KeyZ","KeyX","KeyC","KeyV","KeyB","KeyN","KeyM","Comma","Period","Slash","ArrowUp","ShiftRight","ControlLeft","MetaLeft","AltLeft","Space","AltRight","ArrowLeft","ArrowDown","ArrowRight","ControlRight"],dictEn:["`","1","2","3","4","5","6","7","8","9","0","-","=","Backspace","Tab","q","w","e","r","t","y","u","i","o","p","[","]","\\","Del","CapsLock","a","s","d","f","g","h","j","k","l",";","'","Enter","ShiftL","z","x","c","v","b","n","m",",",".","/","↑","ShiftR","CtrlL","Win","AltL","Space","AltR","←","↓","→","CtrlR"],dictRu:["ё","1","2","3","4","5","6","7","8","9","0","-","=","Backspace","Tab","й","ц","у","к","е","н","г","ш","щ","з","х","ъ","\\","Del","CapsLock","ф","ы","в","а","п","р","о","л","д","ж","э","Enter","ShiftL","я","ч","с","м","и","т","ь","б","ю",".","↑","ShiftR","CtrlL","Win","AltL","Space","AltR","←","↓","→","CtrlR"],shiftRuNorm:{1:"!",2:'"',3:"№",4:";",5:"%",6:":",7:"?",8:"*",9:"(",0:")","-":"_","=":"+",".":",","\\":"/"},shiftRuReversed:{"!":"1",'"':"2","№":"3",";":"4","%":"5",":":"6","?":"7","*":"8","(":"9",")":"0",_:"-","+":"=",",":".","/":"\\"},shiftEnNorm:{"`":"~",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")","-":"_","=":"+",",":"<",".":">","\\":"|","[":"{","]":"}",";":":","'":'"',"/":"?"},shiftEnReversed:{"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=","<":",",">":".","|":"\\","{":"[","}":"]",":":";",'"':"'","?":"/"},shiftRuCode:{Digit1:"!",Digit2:'"',Digit3:"№",Digit4:";",Digit5:"%",Digit6:":",Digit7:"?",Digit8:"*",Digit9:"(",Digit0:")",Minus:"_",IntlYen:"+",Equal:"+",Slash:",",Backslash:"/"},shiftEnCode:{Backquote:"~",Digit1:"!",Digit2:"@",Digit3:"#",Digit4:"$",Digit5:"%",Digit6:"^",Digit7:"&",Digit8:"*",Digit9:"(",Digit0:")",Minus:"_",IntlYen:"+",Equal:"+",Period:">",Comma:"<",Backslash:"|",BracketLeft:"{",BracketRight:"}",Semicolon:":",Quote:'"',Slash:"?"}});t.init(),e.addEventListener("blur",(()=>{e.focus()}))})();
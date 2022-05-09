export class Keyboard {
  constructor({
    input,
    codeDict,
    dictEn,
    dictRu,
    shiftRuNorm,
    shiftRuReversed,
    shiftEnNorm,
    shiftEnReversed,
    shiftRuCode,
    shiftEnCode,
  }) {
    this.properties.input = input;
    this.elements.ruDict = dictRu;
    this.elements.enDict = dictEn;
    this.elements.codeDict = codeDict;
    this.elements.shiftRu = shiftRuNorm;
    this.elements.shiftrevRu = shiftRuReversed;
    this.elements.shiftEn = shiftEnNorm;
    this.elements.shiftrevEn = shiftEnReversed;
    this.elements.shiftRuCode = shiftRuCode;
    this.elements.shiftEnCode = shiftEnCode;
  }

  elements = {
    keysContainer: null,
    keys: [],
    keyboardEn: {},
    keyboardRu: {},
    ruToEng: {},
    engToRu: {},
  };

  properties = {
    value: '',
    capsLock: false,
    shift: false,
    lang: 'ru',
    curShift: this.elements.shiftRu,
    curRShift: this.elements.shiftrevRu,
    curKeyboard: this.elements.keyboardRu,
    curShiftCode: this.elements.shiftRuCode,
  };

  init() {
    this._generateKeyboard();
    this._generateDict(this.elements.ruDict, this.elements.codeDict, this.elements.keyboardRu);
    this.elements.keyboardRu.Equal = '=';
    this.properties.curKeyboard = this.elements.keyboardRu;
    this.properties.curShift = this.elements.shiftRu;
    this.properties.curRShift = this.elements.shiftrevRu;
    this.properties.curShiftCode = this.elements.shiftRuCode;
    this._generateDict(this.elements.enDict, this.elements.codeDict, this.elements.keyboardEn);
    this.elements.keyboardEn.Equal = '=';
    this.properties.lang = localStorage.getItem('lang') ||'ru';
    window.addEventListener('keydown', (e) => {
      this._keyboardPressHandler(e);
    });
    window.addEventListener('keyup', (e) => {
        this.elements.keys.forEach((key) => {
        if (key.textContent === this.properties.curKeyboard[e.code] || key.textContent === this.properties.curShiftCode[e.code] || key.textContent.toLowerCase() === this.properties.curKeyboard[e.code]) {
          key.classList.remove('active');
        } else if ((key.textContent === 'Ctrl' || key.textContent === 'Alt' || key.textContent === 'Shift') && key.classList.contains(e.code)) {
          key.classList.remove('active');
          switch (e.code) {
            case 'ShiftLeft':
                this._offShift();
                break;

            case 'ShiftRight':
                this._offShift();
                break;
            }
        } else if (key.textContent === 'Del' && e.code === 'Delete') key.classList.remove('active');
      });
    });
    if (this.properties.lang !== 'ru') {
        this.properties.lang = 'ru';
        this._switchLang();
    }
  }

  _generateKeyboard() {
    const main = document.querySelector('.wrapper');
    this.elements.keysContainer = document.createElement('div');
    const description = '<p class="description">Клавиатура создана в операционной системе Windows</p>';
    const language = '<p class="language">Для переключения языка комбинация: левыe ctrl + alt</p>';

    this.elements.keysContainer.classList.add('keyboard');
    this.elements.keysContainer.append(this._createKeys());
    main.append(this.elements.keysContainer);
    this.elements.keys = main.querySelectorAll('.key');
    main.insertAdjacentHTML('beforeend', description);
    main.insertAdjacentHTML('beforeend', language);
  }

  _keyboardPressHandler(e) {

    const ctrlL = document.querySelector('.ControlLeft');
    const altL = document.querySelector('.AltLeft');
        this.elements.keys.forEach((key) => {
        e.preventDefault();
        if (key.textContent === this.properties.curKeyboard[e.code] || key.textContent === this.properties.curShiftCode[e.code] || key.textContent.toLowerCase() === this.properties.curKeyboard[e.code]) {
          key.classList.add('active');
          switch (e.code) {
            case 'Backspace':
              this._backSpace();
              break;

            case 'Tab':
              this._inputValue('    ');
              break;

            case 'Delete':
              this._del();
              break;

            case 'CapsLock':
              this._toggleCapsLock();
              break;

            case 'Enter':
              this._inputValue('\n');
              break;

            case 'MetaLeft':
              break;

            case 'Space':
              this._inputValue(' ');
              break;

            default:
              this._inputValue(key.textContent);
          }
        } else if ((key.textContent === 'Ctrl' || key.textContent === 'Alt' || key.textContent === 'Shift') && key.classList.contains(e.code)) {
          key.classList.add('active');
          switch (e.code) {
            case 'ShiftLeft':
                this._onShift();
                break;

            case 'ShiftRight':
                this._onShift();
                break;

            case 'ControlLeft':
                if (altL.classList.contains('active')) this._switchLang();
              break;

            case 'ControlRight':
              break;

            case 'AltLeft':
                if (ctrlL.classList.contains('active')) this._switchLang();
              break;

            case 'AltRight':
              break;

            default:
              break;
          }
        }
      });
  }

  _createKeys() {
    const fragment = document.createDocumentFragment();

    this.elements.ruDict.forEach((key) => {
      const keyElement = document.createElement('button');
      keyElement.classList.add('key');
      keyElement.setAttribute('type', 'button');
      keyElement.textContent = key;

      switch (key) {
        case 'Backspace':
          keyElement.classList.add('back');
          keyElement.addEventListener('click', () => {
            this._backSpace();
          });
          break;

        case 'Tab':
          keyElement.classList.add('m');
          keyElement.addEventListener('click', () => {
            this._inputValue('    ');
          });
          break;

        case 'Del':
          keyElement.addEventListener('click', () => {
            this._del();
          });
          break;

        case 'CapsLock':
          keyElement.classList.add('xl', 'caps');
          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
          });
          break;

        case 'Enter':
          keyElement.classList.add('xxl');
          keyElement.addEventListener('click', () => {
            this._inputValue('\n');
          });
          break;

        case 'ShiftL':
          keyElement.classList.add('xl', 'ShiftLeft');
          keyElement.textContent = 'Shift';
          keyElement.addEventListener('mousedown', () => {
              this._onShift();
          })
          keyElement.addEventListener('mouseup', () => {
              this._offShift();
          })
          break;

        case 'ShiftR':
          keyElement.classList.add('xxl', 'ShiftRight');
          keyElement.textContent = 'Shift';
          keyElement.addEventListener('mousedown', () => {
            this._onShift();
          })
          keyElement.addEventListener('mouseup', () => {
            this._offShift();
          })
          break;

        case 'CtrlL':
          keyElement.classList.add('l', 'ControlLeft');
          keyElement.textContent = 'Ctrl';
          break;

        case 'CtrlR':
          keyElement.classList.add('l', 'ControlRight');
          keyElement.textContent = 'Ctrl';
          break;

        case 'Win':
          keyElement.classList.add('l');
          break;

        case 'AltL':
          keyElement.classList.add('l', 'AltLeft');
          keyElement.textContent = 'Alt';
          break;

        case 'AltR':
          keyElement.classList.add('l', 'AltRight');
          keyElement.textContent = 'Alt';
          break;

        case 'Space':
          keyElement.classList.add('space');
          keyElement.addEventListener('click', () => {
            this._inputValue(' ');
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.classList.add('letter');

          keyElement.addEventListener('click', (e) => {
            this._inputValue(e.target.textContent);
          });
      }

      fragment.append(keyElement);
    });

    return fragment;
  }

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    const keys = document.querySelectorAll('.letter');
    const caps = document.querySelector('.caps');
    caps.classList.toggle('caps-active');
    for (const key of keys) {
      key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    }
  }

  _onShift() {
    if(!this.properties.capsLock) this.properties.shift = true;
    else this.properties.shift = false;
    this._toggleShift();
  }

  _offShift() {
    if(!this.properties.capsLock) this.properties.shift = false;
    else this.properties.shift = true;
    this._toggleShift();
  }

  _toggleShift() {
    const keys = document.querySelectorAll('.letter');
    keys.forEach(key => {
        key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    })
    const shifted = document.querySelectorAll('.key');
    shifted.forEach(key => {
        if (this.properties.shift && this.properties.curShift[key.textContent]) key.textContent = this.properties.curShift[key.textContent];
        else if (!this.properties.shift && this.properties.curRShift[key.textContent]) key.textContent = this.properties.curRShift[key.textContent];
    })
  }

  _inputValue(letter) {
    const position = this.properties.input.selectionStart;
    const positionEnd = this.properties.input.selectionEnd;
    const text = this.properties.value;
    if (text.length + 1 !== position) {
      this.properties.value = text.slice(0, position) + letter + text.slice(positionEnd);
    } else {
      this.properties.value += letter;
    }
    this.properties.input.value = this.properties.value;
    this.properties.input.setSelectionRange(position + letter.length, position + letter.length);
  }

  _backSpace() {
    const position = this.properties.input.selectionStart;
    const positionEnd = this.properties.input.selectionEnd;
    const text = this.properties.value;
    this.properties.value = position === positionEnd ? text.slice(0, position - 1) + text.slice(positionEnd) : text.slice(0, position) + text.slice(positionEnd);
    this.properties.input.value = this.properties.value;
    position === positionEnd ? this.properties.input.setSelectionRange(position - 1, position - 1) : this.properties.input.setSelectionRange(position, position);
  }

  _del() {
    const position = this.properties.input.selectionStart;
    const positionEnd = this.properties.input.selectionEnd;
    const text = this.properties.value;
    if (text.length <= 1 || (position <= 1 && position === positionEnd)) return this.properties.input.setSelectionRange(position, position);
    this.properties.value = position === positionEnd ? text.slice(0, position) + text.slice(positionEnd + 1) : text.slice(0, position) + text.slice(positionEnd);
    this.properties.input.value = this.properties.value;
    position ===this.properties.input.setSelectionRange(position , position);
  }

  _generateDict(lang, code, obj) {
    for (let i = 0; i < code.length; i++) {
      obj[code[i]] = lang[i];
    }
  }

  _switchLang() {
      let back = false;
      if (this.properties.capsLock) {
          this._toggleCapsLock();
          back = true;
      }
      if (this.properties.lang === 'ru') {
        this.properties.lang = 'en';
        if (!Object.keys(this.elements.ruToEng).length)  this._generateDict(this.elements.enDict, this.elements.ruDict, this.elements.ruToEng);
        this.properties.curShift = this.elements.shiftEn;
        this.properties.curRShift = this.elements.shiftrevEn;
        this.properties.curShiftCode = this.elements.shiftEnCode;
        this.properties.curKeyboard = this.elements.keyboardEn;
      } else {
        this.properties.lang = 'ru';
        if (!Object.keys(this.elements.engToRu).length)  this._generateDict(this.elements.ruDict, this.elements.enDict, this.elements.engToRu);
        this.properties.curShift = this.elements.shiftRu;
        this.properties.curRShift = this.elements.shiftrevRu;
        this.properties.curShiftCode = this.elements.shiftRuCode;
        this.properties.curKeyboard = this.elements.keyboardRu;
      }
      let curDict = this.properties.lang === 'en' ? this.elements.ruToEng : this.elements.engToRu;
      
      this.elements.keys.forEach(key => {
          if (key.textContent !== 'Shift' && key.textContent !== 'Alt' && key.textContent !== 'Ctrl') {
            key.textContent = curDict[key.textContent];
          }
      })
      if (back) this._toggleCapsLock();
      this._setlocal();
  }

  _setlocal() {
    localStorage.setItem('lang', this.properties.lang);
  }
}

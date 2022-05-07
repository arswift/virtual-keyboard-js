export class Keyboard {
    elements = {
        keysContainer: null,
        keys: [],
        dictNumbers: {
            192: 'ё', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 48: '0', 189: '-', 187: '=', 8: 'backspace',
            9: 'tab', 81: 'й', 87: 'ц', 69: 'у', 82: 'к', 84: 'е', 89: 'н', 85: 'г', 73: 'ш', 79: 'щ', 80: 'з', 129: 'х', 221: 'ъ', 191: '\\', 46: 'del',
            20: 'capslock', 65: 'ф', 83: 'ы', 68: 'в', 70: 'а', 71: 'п', 72: 'р', 74: 'о', 75: 'л', 76: 'д', 186: 'ж', 222: 'э', 13: 'enter',
            16: 'shift', 90: 'я', 88: 'ч', 67: 'с', 86: 'м', 66: 'и', 78: 'т', 77: 'ь', 188: 'б', 190: 'ю', 191: '.', 38: '▲', 16: 'shift',
            17: 'ctrl', 91: 'win', 18: 'alt', 32: 'space', 37: '◄', 40: '▼', 39: '►', 17: 'ctrl'
            }
    };

    eventHandlers = {
        oninput: null
    };

    properties = {
        input: '',
        value: '',
        capsLock: false
    };

    constructor(input) {
        this.properties.input = input;
    }

    init() {
        const main = document.querySelector('.wrapper');
        this.elements.keysContainer = document.createElement("div");
        let description = `<p class="description">Клавиатура создана в операционной системе Windows</p>`;
        let language = `<p class="language">Для переключения языка комбинация: левыe ctrl + alt</p>`;

        this.elements.keysContainer.classList.add("keyboard");

        this.elements.keysContainer.append(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".key");

        main.append(this.elements.keysContainer);
        main.insertAdjacentHTML('beforeend', description);
        main.insertAdjacentHTML('beforeend', language);
        this.properties.value = document.querySelector('.input').value;
        let keys = document.querySelectorAll('.key');
        window.addEventListener('keydown', (e) => {
            console.log(e);
            keys.forEach(key => {
                if (key.textContent.toLowerCase() === this.elements.dictNumbers[e.which]) {
                    e.preventDefault();
                    key.classList.add('active');
                    switch(key.textContent) {
                        case "Backspace": 
                            this._backSpace();
                            break;
                            
                        case "Tab":
                            this._tab();
                            break;

                        case "Del":
                            this._del();
                            break;

                        case "CapsLock":
                            this._toggleCapsLock();
                            break;

                        case "Enter":
                            this._enter();
                            break;

                        case "Shift":
                            break;

                        case "Ctrl":
                            break;

                        case "Alt":
                            break;

                        case "Win":
                            break;

                        case "Space":
                            this._space();
                            break;

                        default:
                            this._defKey(key.textContent);
                    }
                };
            })
        })
        window.addEventListener('keyup', (e) => {
            keys.forEach(key => {
                if (key.textContent.toLowerCase() === this.elements.dictNumbers[e.which]) {
                    key.classList.remove('active');
                };
            })
        })
    }

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayoutRu = [
            'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
            'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', "\\", 'Del',
            'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
            'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift',
            'Control', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Control'
        ];

        let firstShift = false;
        
        keyLayoutRu.forEach(key => {
            const keyElement = document.createElement("button");
            keyElement.classList.add("key");
            keyElement.setAttribute("type", "button");
            keyElement.textContent = key;

            switch (key) {
                case "Backspace":
                    keyElement.classList.add("back");
                    keyElement.addEventListener("click", () => {
                        this._backSpace();
                    });
                    break;

                case "Tab":
                    keyElement.classList.add("m");
                    keyElement.addEventListener("click", () => {
                        this._tab();
                    });
                    break;
                
                case "Del":
                    keyElement.addEventListener("click", () => {
                        this._del();
                    });
                    break; 
                
                case "CapsLock":
                    keyElement.classList.add("xl", 'caps');
                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                    });
                    break;

                case "Enter":
                    keyElement.classList.add("xxl");
                    keyElement.addEventListener("click", () => {
                        this._enter();
                    });
                    break;
                
                case "Shift":
                    if (!firstShift) {
                        keyElement.classList.add("xl");
                        firstShift = true;
                    } else {
                        keyElement.classList.add("xxl");
                    }
                    break;
                
                 case "Control":
                    keyElement.classList.add("l");
                    keyElement.textContent = 'Ctrl';
                    break;

                case "Win":
                    keyElement.classList.add("l");
                    break;
                
                case "Alt":
                    keyElement.classList.add("l");  
                    break;
                
                case "Space":
                    keyElement.classList.add("space");
                    keyElement.addEventListener("click", () => {
                        this._space();
                    });
                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.classList.add("letter");

                    keyElement.addEventListener("click", (e) => {
                        this._defKey(e.target.textContent);
                    });
            }

            fragment.append(keyElement);
        });

        return fragment;
    }
    

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        let keys = document.querySelectorAll('.letter');
        const caps = document.querySelector('.caps');
        caps.classList.toggle('caps-active');
        for (const key of keys) {
            key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
    }

    _backSpace() {
        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
        this.properties.input.value = this.properties.value;
    }

    _defKey(letter) {
        this.properties.value += letter;
        this.properties.input.value = this.properties.value;
    }

    _tab() {
        this.properties.value += "    ";
        this.properties.input.value = this.properties.value;
    }

    _del() {
        
        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 2) + this.properties.value[this.properties.value.length - 1];
        this.properties.input.value = this.properties.value;
    }

    _enter() {
        this.properties.value += "\n";
        this.properties.input.value = this.properties.value;
    }

    _space() {
        this.properties.value += " ";
        this.properties.input.value = this.properties.value;
    }
}

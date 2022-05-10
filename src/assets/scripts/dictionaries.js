const codeDict = [
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'IntlYen', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
  'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
];

const dictEn = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
  'ShiftL', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'ShiftR',
  'CtrlL', 'Win', 'AltL', 'Space', 'AltR', '←', '↓', '→', 'CtrlR',
];

const dictRu = [
  'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
  'ShiftL', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'ShiftR',
  'CtrlL', 'Win', 'AltL', 'Space', 'AltR', '←', '↓', '→', 'CtrlR',
];

const shiftRuNorm = {
  1: '!',
  2: '"',
  3: '№',
  4: ';',
  5: '%',
  6: ':',
  7: '?',
  8: '*',
  9: '(',
  0: ')',
  '-': '_',
  '=': '+',
  '.': ',',
  '\\': '/',
};

const shiftRuCode = {
  Digit1: '!',
  Digit2: '"',
  Digit3: '№',
  Digit4: ';',
  Digit5: '%',
  Digit6: ':',
  Digit7: '?',
  Digit8: '*',
  Digit9: '(',
  Digit0: ')',
  Minus: '_',
  IntlYen: '+',
  Equal: '+',
  Slash: ',',
  Backslash: '/',
};

const shiftRuReversed = {
  '!': '1',
  '"': '2',
  '№': '3',
  ';': '4',
  '%': '5',
  ':': '6',
  '?': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  _: '-',
  '+': '=',
  ',': '.',
  '/': '\\',
};

const shiftEnNorm = {
  '`': '~',
  1: '!',
  2: '@',
  3: '#',
  4: '$',
  5: '%',
  6: '^',
  7: '&',
  8: '*',
  9: '(',
  0: ')',
  '-': '_',
  '=': '+',
  ',': '<',
  '.': '>',
  '\\': '|',
  '[': '{',
  ']': '}',
  ';': ':',
  '\'': '"',
  '/': '?',
};

const shiftEnCode = {
  Backquote: '~',
  Digit1: '!',
  Digit2: '@',
  Digit3: '#',
  Digit4: '$',
  Digit5: '%',
  Digit6: '^',
  Digit7: '&',
  Digit8: '*',
  Digit9: '(',
  Digit0: ')',
  Minus: '_',
  IntlYen: '+',
  Equal: '+',
  Period: '>',
  Comma: '<',
  Backslash: '|',
  BracketLeft: '{',
  BracketRight: '}',
  Semicolon: ':',
  Quote: '"',
  Slash: '?',
};

const shiftEnReversed = {
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  $: '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  _: '-',
  '+': '=',
  '<': ',',
  '>': '.',
  '|': '\\',
  '{': '[',
  '}': ']',
  ':': ';',
  '"': '\'',
  '?': '/',
};

const generateDict = (lang, code) => {
  const obj = {};
  for (let i = 0; i < code.length; i += 1) {
    obj[code[i]] = lang[i];
  }
  return obj;
};

const ruToEng = generateDict(dictEn, dictRu);

const engToRu = generateDict(dictRu, dictEn);

const keyboardRu = generateDict(dictRu, codeDict);
keyboardRu.Equal = '=';

const keyboardEn = generateDict(dictEn, codeDict);
keyboardEn.Equal = '=';

export {
  codeDict,
  dictEn,
  dictRu,
  shiftRuNorm,
  shiftRuReversed,
  shiftEnNorm,
  shiftEnReversed,
  shiftRuCode,
  shiftEnCode,
  ruToEng,
  engToRu,
  keyboardRu,
  keyboardEn,
};

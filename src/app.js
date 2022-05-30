import './assets/styles/style.css';
import {
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
} from './assets/scripts/dictionaries';
import Keyboard from './assets/scripts/keyboard';

const DOMGenerator = () => {
  const main = document.createElement('div');
  const title = '<h1>RSS Virtual Keyboard</h1>';
  const input = '<textarea class="input" autofocus></textarea>';
  main.classList.add('wrapper');
  main.insertAdjacentHTML('beforeend', title);
  main.insertAdjacentHTML('beforeend', input);
  document.body.append(main);
};

DOMGenerator();
const input = document.querySelector('.input');
const keyboard = new Keyboard({
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
  ruToEng,
  engToRu,
  keyboardRu,
  keyboardEn,
});
keyboard.init();

input.addEventListener('blur', () => {
  input.focus();
});

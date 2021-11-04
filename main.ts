import KeySignature from "./KeySignature.js";

new KeySignature('E♭m');
interface Song { 
  key?: KeySignature,
}
const song : Song = {};

(window as any).song = song;

function chooseOneFromArray(arr: any[]) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function generateChooseKeyButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.innerText = "Choose a key";
  button.addEventListener('click', chooseKey);
  return button;
}

function generateKeySignature(key: string): HTMLHeadingElement {
  const header = (document.querySelector('#KeySignature') as HTMLHeadingElement) || document.createElement('h1');
  header.innerText = `Key: ${key}`;
  header.setAttribute('id', 'KeySignature');
  return header;
}

const MAJOR_KEY_SIGNATURES = [
  'A', 'B♭', 'B', 'C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'G♯',
];
const KEY_SIGNATURES = MAJOR_KEY_SIGNATURES.reduce((acc, v) => acc.concat([v, v + 'm']), [] as string[]);

function chooseKey() {
  song.key = new KeySignature(chooseOneFromArray(KEY_SIGNATURES));
  console.log(song);
  document.body.append(generateKeySignature(song.key.key));
}

document.body.append(generateChooseKeyButton());
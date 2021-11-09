import KeySignature from "./KeySignature.js";

const keySignatureZone = document.getElementById('KeySignatureZone')!;

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
  button.setAttribute('id', 'ChooseKeyButton');
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
  'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭',
];

const MINOR_KEY_SIGNATURES = [
  'Am', 'B♭m', 'Bm', 'Cm', 'C♯m', 'Dm', 'D♯m', 'Em', 'Fm', 'F♯m', 'Gm', 'G♯m',
];
const KEY_SIGNATURES = MAJOR_KEY_SIGNATURES.concat(MINOR_KEY_SIGNATURES);

function chooseKey() {
  song.key = new KeySignature(chooseOneFromArray(KEY_SIGNATURES));
  console.log(song);
  keySignatureZone.append(generateKeySignature(song.key.key));
}

keySignatureZone.append(generateChooseKeyButton());
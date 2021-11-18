import KeyPicker from "./KeyPicker.js";
import KeySignature from "./KeySignature.js";
import SheetMusic from "./SheetMusic.js";

interface Song { 
  key?: KeySignature,
  chords: string[],
}
const song : Song = {
  chords: [],
};

(window as any).song = song;

const keySignatureZone = document.getElementById('KeySignatureZone')!;
const chordZone = document.getElementById('ChordZone')!;
const keyPickerCanvas = document.getElementById('KeyPicker')! as HTMLCanvasElement
const keyPicker = new KeyPicker(keyPickerCanvas, chooseKey);

const showKeyPickerButton = document.getElementById('ShowKeyPicker')!;
showKeyPickerButton.addEventListener('click', showKeyPicker);

const sheetMusicCanvas = document.getElementById('SheetMusic')! as HTMLCanvasElement;
const sheetMusic = new SheetMusic(song, sheetMusicCanvas);

function chooseOneFromArray(arr: any[]) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function chooseOneFromArrayWeighted(arr: any[], weightArr: number[]) {
  const total = weightArr.reduce((acc, w) => acc + w, 0);
  let rand = Math.random() * total; // Number between 0 and the total of all weights
  let index = -1;
  while (rand > 0) {
    index++;
    rand -= weightArr[index];
  }
  return arr[index];
}

function generateChooseChordsButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.innerText = "Choose some chords";
  button.setAttribute('id', 'ChooseChordsButton');
  button.addEventListener('click', chooseChords.bind(null, 8));
  return button;
}

function generateKeySignature(key: string): HTMLHeadingElement {
  const header = (document.querySelector('#KeySignature') as HTMLHeadingElement) || document.createElement('h1');
  header.innerText = `Key: ${key}`;
  header.setAttribute('id', 'KeySignature');
  return header;
}

function generateChord(chordName: string): HTMLSpanElement {
  const span = document.createElement('span');
  span.classList.add('Chord');
  span.innerText = chordName;
  return span;
}

const MAJOR_KEY_SIGNATURES = [
  'C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'D♭', 'A♭', 'E♭', 'B♭', 'F', 
];
const MAJOR_KEY_SIGNATURE_WEIGHTS = [
  1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
]

const MINOR_KEY_SIGNATURES = [
  'Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'D♯m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm',
];
const KEY_SIGNATURES = MAJOR_KEY_SIGNATURES.concat(MINOR_KEY_SIGNATURES);
const KEY_SIGNATURE_WEIGHTS = MAJOR_KEY_SIGNATURE_WEIGHTS.concat(MAJOR_KEY_SIGNATURE_WEIGHTS);

function chooseKey(key: string) {
  song.key = new KeySignature(key);
  //console.log(song);
  keySignatureZone.append(generateKeySignature(song.key.key));
  chordZone.style.display = 'block';
  hideKeyPicker();
}

function hideKeyPicker() {
  keyPicker.canvas.style.display = 'none';
  showKeyPickerButton.style.display = 'inline';
}

function showKeyPicker() {
  keyPicker.canvas.style.display = 'inline';
  showKeyPickerButton.style.display = 'none';
}

function chooseChords(numberOfChords: number) {
  song.chords = [];
  for (let i=0; i<numberOfChords; i++) {
    song.chords.push(chooseOneFromArrayWeighted(song.key!.chords, song.key!.chordWeights));
  }
  displayChords();
}

function displayChords() {
  while (chordZone.firstChild) {
    chordZone.removeChild(chordZone.firstChild);
  }
  chordZone.append(generateChooseChordsButton());
  song.chords.forEach(c => chordZone.append(generateChord(c)));
}

chordZone.append(generateChooseChordsButton());
function draw() {
  keyPicker.draw();
  sheetMusic.draw();
  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);

export { MAJOR_KEY_SIGNATURES, MINOR_KEY_SIGNATURES, KEY_SIGNATURES, KEY_SIGNATURE_WEIGHTS, chooseOneFromArray, chooseOneFromArrayWeighted, Song };
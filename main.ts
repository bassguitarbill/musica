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

const chordWeights = document.getElementById('ChordWeightZone')!;
const showChordWeightsButton = document.getElementById('ChordWeightZoneButton')!;
showChordWeightsButton.addEventListener('click', toggleChordWeights);

const showKeyPickerButton = document.getElementById('ShowKeyPicker')!;
showKeyPickerButton.addEventListener('click', showKeyPicker);

const sheetMusicCanvas = document.getElementById('SheetMusic')! as HTMLCanvasElement;
const sheetMusic = new SheetMusic(song, sheetMusicCanvas);

document.querySelectorAll('input[type=range]').forEach(e => {
  e.addEventListener('change', _ => {
    saveChordWeights();
  });
});

function saveChordWeights() {
  const weights:{ [k:string]: number} = {};
  document.querySelectorAll('input[type=range]').forEach(e => {
    weights[e.id] = Number((e as HTMLInputElement).value);
  });
  window.localStorage.setItem('chordWeights', JSON.stringify(weights));
  applyChordWeights();
}

let majorChordWeights = [8, 5, 3, 5, 7, 6, 2];
let minorChordWeights = [8, 5, 3, 5, 7, 6, 2];

const defaultChordWeights = {
  'major-I': 8, 'major-ii': 5, 'major-iii': 3, 'major-IV': 5,
  'major-V': 7, 'major-vi': 6, 'major-vii': 2,
  'minor-i': 8, 'minor-ii': 5, 'minor-III': 3, 'minor-iv': 5,
  'minor-v': 8, 'minor-VI': 8, 'minor-VII': 8, 
}

function loadChordWeights() {
  const chordWeights = window.localStorage.getItem('chordWeights');
  let cw:any = defaultChordWeights;
  if (chordWeights) {
    cw = JSON.parse(chordWeights);
  }
  return cw;
}

function applyChordWeights() {
  const cw = loadChordWeights();
  majorChordWeights = [ cw['major-I'], cw['major-ii'], cw['major-iii'], cw['major-IV'],
                        cw['major-V'], cw['major-vi'], cw['major-vii']];
  minorChordWeights = [ cw['minor-i'], cw['minor-ii'], cw['minor-III'], cw['minor-iv'],
                        cw['minor-v'], cw['minor-VI'], cw['minor-VII']];
  document.querySelectorAll('input[type=range]').forEach(e => {
    (e as HTMLInputElement).value = cw[e.id];
  });
}
applyChordWeights();

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

function showChordWeights() {
  chordWeights.style.display = "flex";
  showChordWeightsButton.innerText = "Hide chord weights";
}

function hideChordWeights() {
  chordWeights.style.display = "none";
  showChordWeightsButton.innerText = "Show chord weights";
}

function toggleChordWeights() {
  if (chordWeights.style.display === "flex") {
    hideChordWeights();
  } else {
    showChordWeights();
  }
}

function chooseChords(numberOfChords: number) {
  song.chords = [];
  for (let i=0; i<numberOfChords; i++) {
    const isMinor = song.key!.isMinor;
    const chordWeights = isMinor ? minorChordWeights : majorChordWeights;

    song.chords.push(chooseOneFromArrayWeighted(song.key!.chords, chordWeights));
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

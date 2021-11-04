export default class KeySignature {
  chords: string[];
  notes: string[];
  isMinor: boolean;
  tonic: string;

  sharps: number;
  flats: number;

  constructor(readonly key: string) {
    this.isMinor = key.endsWith('m');
    this.tonic = this.isMinor ? key.slice(0, key.length - 1) : key;
    let sharps = FIFTHS.indexOf(this.tonic);
    let flats = FOURTHS.indexOf(this.tonic);
    const keyDegreeMajor = sharps !== -1 ? sharps : flats !== -1 ? -flats : 0;
    const keyDegree = this.isMinor ? keyDegreeMajor - 3 : keyDegreeMajor;
    this.sharps = Math.max(keyDegree, 0);
    this.flats = -Math.min(keyDegree, 0);
    if (this.sharps > 0) console.log(`The key of ${key} has ${this.sharps} sharps`);
    else if (this.flats > 0) console.log(`The key of ${key} has ${this.flats} flats`);
    else console.log(`The key of ${key} has no sharps or flats`);

    this.notes = [];
    const keyLetterIndex = SCALE_DEGREES.indexOf(key.substring(0,1));
    for (let i=0; i < SCALE_DEGREES.length; i++) {
      const letter = SCALE_DEGREES[(keyLetterIndex + i) % SCALE_DEGREES.length];
      const isNoteSharp = this.sharps > SHARPS.indexOf(letter);
      const isNoteFlat = this.flats > FLATS.indexOf(letter);
      this.notes.push(`${letter}${isNoteSharp ? '♯' : isNoteFlat ? '♭' : ''}`)
    }
    console.log (`The key of ${key} is ${this.notes}`);

    this.chords = this.notes.map((n, i) => `${n}${this.isMinor ? MINOR_SCALE_CHORDS[i] : MAJOR_SCALE_CHORDS[i]}`)
    console.log (`The chords of ${key} are ${this.chords}`);
  }
}

const SHARPS = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
const FLATS = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];
const FIFTHS = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', ]//'G♯', 'D♯', 'A♯', 'E♯'];
const FOURTHS = ['C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭',] // 'F♭', 'B♭♭', 'E♭♭', 'A♭♭'];

const MAJOR_SCALE_CHORDS = ['', 'm', 'm', '', '', 'm', 'dim'];
const MINOR_SCALE_CHORDS = ['m', 'dim', '', 'm', 'm', '', ''];

const SCALE_DEGREES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
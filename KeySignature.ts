export default class KeySignature {
  chords: string[];
  notes: string[];

  constructor(readonly key: string) {
    const sharps = Math.max(FIFTHS.indexOf(key), 0);
    const flats = Math.max(FOURTHS.indexOf(key), 0);
    /* if (sharps) console.log(`The key of ${key} has ${sharps} sharps`);
    else if (flats) console.log(`The key of ${key} has ${flats} flats`);
    else console.log('The key of C has no sharps or flats'); */

    this.notes = [];
    const keyLetterIndex = SCALE_DEGREES.indexOf(key.substring(0,1));
    for (let i=0; i < SCALE_DEGREES.length; i++) {
      const letter = SCALE_DEGREES[(keyLetterIndex + i) % SCALE_DEGREES.length];
      const isNoteSharp = sharps > SHARPS.indexOf(letter);
      const isNoteFlat = flats > FLATS.indexOf(letter);
      this.notes.push(`${letter}${isNoteSharp ? '♯' : isNoteFlat ? '♭' : ''}`)
    }
    console.log (`The key of ${key} is ${this.notes}`);

    this.chords = this.notes.map((n, i) => `${n}${MAJOR_SCALE_CHORDS[i]}`)
    console.log (`The chords of ${key} are ${this.chords}`);

  }
}

const SHARPS = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];
const FLATS = ['B', 'E', 'A', 'D', 'G', 'C', 'F'];
const FIFTHS = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯', 'C♯', ]//'G♯', 'D♯', 'A♯', 'E♯'];
const FOURTHS = ['C', 'F', 'B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭',] // 'F♭', 'B♭♭', 'E♭♭', 'A♭♭'];

const MAJOR_SCALE_CHORDS = ['', 'm', 'm', '', '', 'm', 'dim'];
//const MINOR_SCALE_CHORDS = ['m', 'dim', '', 'm', 'm', '', ''];

const SCALE_DEGREES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

FIFTHS.forEach(f => new KeySignature(f));
FOURTHS.forEach(f => new KeySignature(f));
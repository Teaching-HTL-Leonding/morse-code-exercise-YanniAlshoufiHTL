import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MorseService {
  private static readonly MorseCode = [
    /* A */ '.-',
    /* B */ '-...',
    /* C */ '-.-.',
    /* D */ '-..',
    /* E */ '.',
    /* F */ '..-.',
    /* G */ '--.',
    /* H */ '....',
    /* I */ '..',
    /* J */ '.---',
    /* K */ '-.-',
    /* L */ '.-..',
    /* M */ '--',
    /* N */ '-.',
    /* O */ '---',
    /* P */ '.--.',
    /* Q */ '--.-',
    /* R */ '.-.',
    /* S */ '...',
    /* T */ '-',
    /* U */ '..-',
    /* V */ '...-',
    /* W */ '.--',
    /* X */ '-..-',
    /* Y */ '-.--',
    /* Z */ '--..',
  ];

  constructor() {
  }

  public encode(rawStr: string): string | Error {
    if ([...rawStr].some(chr => chr.toUpperCase() !== chr)) {
      return new Error("Please only enter uppercase letters!");
    }

    const encodedStrParts = [...rawStr]
      .map(chr => {
        if (chr === " ") {
          return " / ";
        }

        const idx = chr.charCodeAt(0) - 'A'.charCodeAt(0);

        if (idx < 0 || idx >= MorseService.MorseCode.length) {
          return new Error(`Character ${chr} cannot be converted, please only use capital case letters.`);
        }

        return MorseService.MorseCode[idx]
      })

    if (encodedStrParts.filter(x => x instanceof Error).length > 0) {
      return encodedStrParts.filter(x => x instanceof Error)[0];
    }

    return encodedStrParts.join(' ');
  }

  public decode(encodedStr: string): string | Error {
    const encodedWords = encodedStr.split(" / ");

    return encodedWords
      .map(encodedWord => {
        const encodedChars = encodedWord.split(' ');
        return encodedChars
          .map(encodedChar => {
            const idx = MorseService.MorseCode.findIndex(code => code === encodedChar);

            if (idx < 0 || idx > MorseService.MorseCode.length) {
              return '!';
            }

            return MorseService.MorseCode[idx]
          })
          .join("");
      })
      .join(" ")
  }
}

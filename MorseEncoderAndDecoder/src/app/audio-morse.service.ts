import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioMorseService {
  private note_context: AudioContext;
  private note_node: OscillatorNode;
  private readonly gain_node: GainNode;

  constructor() {
    this.note_context = new AudioContext();
    this.note_node = this.note_context.createOscillator();
    this.gain_node = this.note_context.createGain();
    this.note_node.frequency.value = 440;
    this.gain_node.gain.value = 0;
    this.note_node.connect(this.gain_node);
    this.gain_node.connect(this.note_context.destination);
    this.note_node.start();
  }

  private startNotePlaying() {
    // Pass a start time of 0 so it starts ramping up immediately.
    this.gain_node.gain.setTargetAtTime(0.1, 0, 0.001)
  }

  private stopNotePlaying() {
    // Pass a start time of 0 so it starts ramping down immediately.
    this.gain_node.gain.setTargetAtTime(0, 0, 0.001)
  }

  /** Duration of a dot sound */
  private static readonly DOT_TIME = 50;

  /** Duration of a dash sound */
  private static readonly DASH_TIME = AudioMorseService.DOT_TIME * 3;

  /** Waiting time between dashes and dots */
  private static readonly SYMBOL_BREAK = AudioMorseService.DOT_TIME;

  /** Waiting time between dashes and dots */
  private static readonly LETTER_BREAK = AudioMorseService.DOT_TIME * 3;

  /** Waiting time between words */
  private static readonly WORD_BREAK_OFFSET_TO_LETTER_BREAK = AudioMorseService.DOT_TIME;

  /** Sleep for a given amount of milliseconds */
  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** Play a dash sound */
  private async playDash() {
    this.startNotePlaying();
    await this.sleep(AudioMorseService.DASH_TIME);
    this.stopNotePlaying();
  }

  /** Play a dot sound */
  private async playDot() {
    this.startNotePlaying();
    await this.sleep(AudioMorseService.DOT_TIME);
    this.stopNotePlaying();
  }

  public async playMorseCode(morseCodeString: string) {
    for (const idx of [...morseCodeString].map((_, i) => i)) {
      const chr = morseCodeString[idx];

      switch (chr) {
        case '.':
          await this.playDot();
          break;
        case '-':
          await this.playDash();
          break;
        case ' ':
          await this.sleep(AudioMorseService.LETTER_BREAK);
          break;
        case '/':
          await this.sleep(AudioMorseService.WORD_BREAK_OFFSET_TO_LETTER_BREAK);
          break;
      }

      if (
        idx + 1 < morseCodeString.length &&
        (chr === "." || chr === "-") &&
        chr === morseCodeString[idx + 1]
      ) {
        await this.sleep(AudioMorseService.SYMBOL_BREAK);
      }
    }
  }
}

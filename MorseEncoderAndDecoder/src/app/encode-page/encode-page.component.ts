import { Component, computed, inject, signal } from '@angular/core';
import { MorseService } from "../morse.service";
import { FormsModule } from "@angular/forms";
import { AudioMorseService } from "../audio-morse.service";

@Component({
  selector: 'app-encode-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './encode-page.component.html',
  styleUrl: './encode-page.component.css'
})
export class EncodePageComponent {
  private morseService = inject(MorseService);
  private audioMorseService = inject(AudioMorseService);

  protected inputValue = signal<string>("");
  protected output = signal<string>("");
  protected errorMessage = signal<string>("");

  protected isButtonDisabled = computed<boolean>(() =>
    this.inputValue().length === 0 ||
    [...this.inputValue()].some(chr => !"ABCDEFGHIJKLMNOPQRSTUVWXYZ ".includes(chr)));

  async onSubmit() {
    const encoded = this.morseService.encode(this.inputValue())

    if (encoded instanceof Error) {
      this.output.set("");
      this.errorMessage.set(encoded.message);
      return;
    }

    this.output.set(encoded);
    this.errorMessage.set("");
    await this.audioMorseService.playMorseCode(encoded)
  }
}

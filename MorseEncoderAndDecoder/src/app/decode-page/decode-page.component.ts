import { Component, computed, effect, inject, signal } from '@angular/core';
import { MorseService } from "../morse.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AudioMorseService } from "../audio-morse.service";

@Component({
  selector: 'app-decode-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './decode-page.component.html',
  styleUrl: './decode-page.component.css'
})
export class DecodePageComponent {
  private morseService = inject(MorseService);
  private audioMorseService = inject(AudioMorseService);

  protected inputValue = signal<string>("");
  protected output = signal<string>("");
  protected errorMessage = signal<string>("");

  protected isButtonDisabled = computed<boolean>(() =>
    this.inputValue().length === 0 ||
    [...this.inputValue()].some(chr => !".-/ ".includes(chr)));

  constructor() {
    effect(() => {
      console.log(this.isButtonDisabled());
    });
  }

  async onSubmit() {
    const decoded = this.morseService.decode(this.inputValue())

    if (decoded instanceof Error) {
      this.output.set("");
      this.errorMessage.set(decoded.message);
      return;
    }

    this.output.set(decoded);
    this.errorMessage.set("");
    await this.audioMorseService.playMorseCode(this.inputValue())
  }
}

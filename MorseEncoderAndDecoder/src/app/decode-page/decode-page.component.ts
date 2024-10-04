import { Component, inject, signal } from '@angular/core';
import { MorseService } from "../morse.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
  protected inputValue = signal<string>("");
  protected output = signal<string>("");
  protected errorMessage = signal<string>("");

  onSubmit() {
    const decoded = this.morseService.decode(this.inputValue())

    if (decoded instanceof Error) {
      this.output.set("");
      this.errorMessage.set(decoded.message);
      return;
    }

    this.output.set(decoded);
    this.errorMessage.set("");
  }
}

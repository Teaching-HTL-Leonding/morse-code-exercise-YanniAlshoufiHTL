import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MorseHeaderComponent } from "./morse-header/morse-header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MorseHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MorseEncoderAndDecoder';
}

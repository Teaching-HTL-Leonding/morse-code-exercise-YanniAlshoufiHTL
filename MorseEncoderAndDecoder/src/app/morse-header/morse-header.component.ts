import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-morse-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './morse-header.component.html',
  styleUrl: './morse-header.component.css'
})
export class MorseHeaderComponent {

}

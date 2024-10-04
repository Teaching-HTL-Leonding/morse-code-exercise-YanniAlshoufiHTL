import { Routes } from '@angular/router';
import { EncodePageComponent } from "./encode-page/encode-page.component";
import { DecodePageComponent } from "./decode-page/decode-page.component";

export const routes: Routes = [
  {path: 'encode', component: EncodePageComponent},
  {path: 'decode', component: DecodePageComponent},
  {path: '', pathMatch: 'full', redirectTo: '/encode'},
];

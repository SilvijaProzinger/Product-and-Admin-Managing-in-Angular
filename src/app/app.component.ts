import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'product-admin-managing-app';
}

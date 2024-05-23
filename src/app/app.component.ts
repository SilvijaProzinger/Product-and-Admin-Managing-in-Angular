import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'product-admin-managing-app';
}

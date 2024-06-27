import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favorite-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-icon.component.html',
  styleUrl: './favorite-icon.component.scss',
})
export class FavoriteIconComponent {
  private _path!: string;

  @Input()
  public set path(filePath: string) {
    this._path = `url("${filePath}")`;
  }

  @Input() isFilled = false;
}

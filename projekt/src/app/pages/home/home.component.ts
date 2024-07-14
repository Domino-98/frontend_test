import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlockOneComponent } from '@app/components/block-one/block-one.component';
import { BlockContentComponent } from '@app/components/block-content/block-content.component';
import { BlockTwoComponent } from '@app/components/block-two/block-two.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, BlockOneComponent, BlockTwoComponent, BlockContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Strona główna';
}

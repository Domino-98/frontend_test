import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlockOneComponent } from '@app/components/block-one/block-one.component';
import { BlockTextComponent } from '@app/components/block-text/block-text.component';
import { BlockTwoComponent } from '@app/components/block-two/block-two.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, BlockOneComponent, BlockTwoComponent, BlockTextComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Strona główna';
}

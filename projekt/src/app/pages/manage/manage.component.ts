import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentComponent } from '@app/components/content/content.component';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [RouterOutlet, ContentComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent {
  title = 'Zarządzaj treścią';
}

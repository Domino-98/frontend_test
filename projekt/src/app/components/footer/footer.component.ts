import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlockStore } from '@app/block.store';
import { ButtonComponent } from '@components/button/button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ButtonComponent, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private blockStore = inject(BlockStore);

  checkboxChecked = false;

  toggleCheckbox() {
    this.checkboxChecked = !this.checkboxChecked;
  }

  handleReset() {
    this.blockStore.resetState();
  }

  handlePersonalData() {
    this.blockStore.setPersonalData('Dominik Buczek');
  }
}

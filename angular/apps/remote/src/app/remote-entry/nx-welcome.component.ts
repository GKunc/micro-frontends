import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'angular-nx-welcome',
  imports: [CommonModule],
  template: `
    <div class="wrapper">
      <h1>Hello from Angular Remote</h1>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'angular-remote-entry',
  template: `<angular-nx-welcome />`,
})
export class RemoteEntryComponent {}

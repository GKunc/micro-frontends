import { Component, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

const  MF_EVENT_NAME = 'test-mf';

@Component({
  selector: 'angular-nx-welcome',
  imports: [CommonModule],
  template: `
    <div class="wrapper">
      <h1>Hello from Angular Remote</h1>
      <div>Text from shell: {{test()}}</div>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit {
  test: WritableSignal<string> = signal('');

  ngOnInit(): void {
      document.addEventListener(MF_EVENT_NAME, this.onMFEvent.bind(this));
  }

  onMFEvent(e: any): void {
    this.test.set(e?.detail)
  }
}

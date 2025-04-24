import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

const  MF_EVENT_NAME = 'test-mf';

@Component({
  selector: 'angular-nx-welcome',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="wrapper">
      <h1>Hello from Angular Remote</h1>
      <div>Text from angular remote: {{test()}}</div>
      <library-button text="hi angular" color="yellow"></library-button>
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

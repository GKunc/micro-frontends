import { BrowserModule } from "@angular/platform-browser";
import { RemoteEntryComponent } from "./entry.component";
import { CommonModule } from "@angular/common";
import { Injector, NgModule } from "@angular/core";

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule],
  bootstrap: [RemoteEntryComponent],
 })
 export class EntryModule {
  constructor(injector: Injector) {
    const el = createCustomElement(RemoteEntryComponent, { injector: injector });
    customElements.define('new-system-invoices', el);
  }
 }
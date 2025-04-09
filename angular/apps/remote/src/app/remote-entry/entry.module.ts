const APPLICATION_TAG = 'my-angular-element';

import { BrowserModule } from "@angular/platform-browser";
import { RemoteEntryComponent } from "./entry.component";
import { CommonModule } from "@angular/common";
import { DoBootstrap, Injector, NgModule } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import 'zone.js';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule],
 })
 export class EntryModule implements DoBootstrap {
  constructor(
    private _injector: Injector,
  ) {}
 

  ngDoBootstrap(): void {
      try {
        // prevent 'has already been defined as a custom element' error
        if (customElements.get(APPLICATION_TAG)) {
          return;
        }
 
 
        // create custom elements from angular components
        const el = createCustomElement(RemoteEntryComponent, {
          injector: this._injector,
        });
        // define in browser registry
        customElements.define(APPLICATION_TAG, el);
      } catch (err) {
        console.error(err);
      }
  }
 }

 platformBrowserDynamic()
  .bootstrapModule(EntryModule)
  // eslint-disable-next-line no-console
  .then(() => console.log('Angular is running!'))
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err));

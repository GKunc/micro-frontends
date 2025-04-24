# Micro-Frontend Setup with Module Federation

This project demonstrates the implementation of micro-frontends using **Module Federation** within a React and Angular monorepo setup using NX.

## Table of Contents

- [Micro-Frontend Setup with Module Federation](#micro-frontend-setup-with-module-federation)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Prerequisites](#prerequisites)
  - [Installation \& Setup](#installation--setup)
    - [Library Setup](#library-setup)
    - [React Monorepo Setup](#react-monorepo-setup)
    - [Angular Setup](#angular-setup)
  - [Tutorial Steps](#tutorial-steps)
    - [React Monorepo](#react-monorepo)
    - [Angular](#angular)
    - [Library](#library)
  - [Important Topics](#important-topics)
  - [Useful Resources](#useful-resources)

## Overview

This project leverages NX workspaces to structure micro-frontends efficiently, enabling scalable and maintainable applications by dividing them into smaller, independently deployable units.

Module Federation facilitates sharing components and services dynamically between applications at runtime, significantly improving modularity and flexibility.

## Prerequisites

- Node.js installed (v18+ recommended)
- npm
- NX CLI (`npm install --global nx`)

## Installation & Setup

### Library Setup

```bash
cd micro-frontends/library
npm install
nx build component-lib
```

> **Important:**
>
> - After building, manually copy the built component library (`dist/libs/component-lib`) to the `node_modules` folder within the React (`agh-monorepo`) and Angular projects.

If there are issues with the NX build:

```bash
nx migrate nx@20.8.1
```

### React Monorepo Setup

```bash
cd micro-frontends/agh-monorepo
npm install
nx serve shell
nx serve remote
```

Open the application at: [http://localhost:4200](http://localhost:4200)

### Angular Setup

```bash
cd micro-frontends/angular
npm install
nx serve remote-angular
```

## Tutorial Steps

### React Monorepo

---

1. Create NX workspace:

   ```bash
   npx -y create-nx-workspace@latest myorg --preset=apps
   ```

2. Add React plugin:

   ```bash
   npx nx add @nx/react
   ```

3. Generate host and remote apps:

   ```bash
   npx nx g @nx/react:host apps/shell --remotes=remote
   ```

4. Run the project:

   ```bash
   npx nx serve shell
   ```

5. Add additional remote app:

   ```bash
   npx nx g @nx/react:remote apps/remote --host=shell
   ```

6. Access your app at [http://localhost:4200](http://localhost:4200) (Shell) and [http://localhost:4201](http://localhost:4201) (Remote)

7. Clear template.

8. Add react hooks

9. Fix error adding `disableNxRuntimeLibraryControlPlugin: true`

10. Add same css classes to shell and remote.

### Angular

---

1. Create NX workspace:

   ```bash
   npx create-nx-workspace@latest angular --preset=apps
   cd angular
   ```

2. Add Angular plugin:

   ```bash
   npx nx add @nx/angular
   ```

3. Generate remote app:

   ```bash
   nx g @nx/angular:remote apps/remote --prefix=angular
   ```

4. Build remote app:
   ```bash
   npx nx serve remote
   ```
5. Add custom element lib

   ```bash
   npm install @angular/elements --save
   ```

6. Expose custom element from module

```js
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
         if (customElements.get(APPLICATION_TAG)) {
            return;
         }

         const el = createCustomElement(RemoteEntryComponent, {
            injector: this._injector,
         });
         customElements.define(APPLICATION_TAG, el);
         } catch (err) {
         console.error(err);
         }
   }
   }

   platformBrowserDynamic()
   .bootstrapModule(EntryModule)
   .then(() => console.log('Angular is running!'))
   .catch((err) => console.error(err));
```

7. Add custom element loader in react

```js
import React, { useLayoutEffect, useRef } from 'react';
import { loadRemote, registerRemotes } from '@module-federation/runtime';

const registeredRemotes: any = {};

const RemoteWebComponent = () => {
  const elementRef = useRef(null);
  const customElAdded = useRef(false);

  useLayoutEffect(() => {
    const scope = 'angular';
    if (!registeredRemotes[scope]) {
      registerRemotes(
        [
          {
            name: scope,
            entry: `${'http://localhost:4203'}/mf-manifest.json?${new Date().toDateString()}`,
            type: 'module',
          },
        ],
        { force: true }
      );
      registeredRemotes[scope] = true;
    }

    if (customElAdded.current === false) {
      customElAdded.current = true;
      loadRemote(`${scope}/Module`).then(() => {
        const element = document.createElement('my-angular-element');
        (elementRef?.current as any).appendChild(element);
      });
    }
  }, []);

  return <div ref={elementRef}></div>;
};

export default RemoteWebComponent;

```

8. Load angular app as custom-element

```js
const RemoteAngular = React.lazy(() => import("./angular-remote"));
```

### Library

---

1. Create NX workspace:

   ```bash
   npx create-nx-workspace@latest library --preset=apps
   cd library
   ```

2. Add web capabilities:

   ```bash
   npx nx add @nx/web
   ```

3. Generate a publishable library:

   ```bash
   nx g @nx/js:lib libs/component-lib --publishable --importPath=@agh/component-lib
   ```

4. Build the library:

   ```bash
   nx build component-lib
   ```

5. Manually copy built files to other projects' `node_modules`.

## Important Topics

- **Iframe vs Module Federation:** Pros, cons, and use-cases
- **Style Leaking:** Approaches to isolate styles
- **Communication Between Apps:** Techniques for inter-app communication
- **Routing:** Managing routes across federated modules
- **Deploying Only Affected Apps:** Optimizing deployment process with NX

## Useful Resources

- [Module Federation Official Docs](https://module-federation.io/)
- [NX Official Documentation](https://nx.dev/)
- [React NX Documentation](https://nx.dev/react)
- [Angular NX Documentation](https://nx.dev/angular)

import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'remote',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  disableNxRuntimeLibraryControlPlugin: true,
  
};

export default config;

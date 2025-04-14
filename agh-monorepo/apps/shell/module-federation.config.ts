import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['remote'],
  disableNxRuntimeLibraryControlPlugin: true,
};

export default config;

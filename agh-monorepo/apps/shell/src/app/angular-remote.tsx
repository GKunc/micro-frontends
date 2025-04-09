import React, { useEffect, useRef } from 'react';
import { loadRemote, registerRemotes } from '@module-federation/runtime';

const registeredRemotes: any = {};

const RemoteWebComponent = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const scope = 'remote_angular';
    if (!registeredRemotes[scope]) {
      registerRemotes(
        [
          {
            name: scope,
            entry: `${'http://127.0.0.1:4202/'}/mf-manifest.json?${new Date().toDateString()}`,
            type: 'module',
          },
        ],
        { force: true }
      );
      registeredRemotes[scope] = true;
    }

    loadRemote(`${scope}/Module`).then(() => {
      const element = document.createElement('my-angular-element');
      (elementRef?.current as any).appendChild(element);
    });
  }, []);

  return <div ref={elementRef}></div>;
};

export default RemoteWebComponent;

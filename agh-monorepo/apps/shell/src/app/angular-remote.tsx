import React, { useLayoutEffect, useRef } from 'react';
import { loadRemote, registerRemotes } from '@module-federation/runtime';

const registeredRemotes: any = {};

const RemoteWebComponent = () => {
  const elementRef = useRef(null);
  const customElAdded = useRef(false);

  useLayoutEffect(() => {
    const scope = 'remote_angular';
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

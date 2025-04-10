import * as React from 'react';

const Remote = React.lazy(() => import('remote/Module'));
const RemoteAngular = React.lazy(() => import('./angular-remote'));

export function Grid() {
  return (
    <div>
      <h1>Grid</h1>
      <div>
        <RemoteAngular />
        <Remote />
      </div>
    </div>
  );
}

export default Grid;

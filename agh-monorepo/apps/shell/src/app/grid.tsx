import React, { useEffect, useState } from 'react';

const Remote = React.lazy(() => import('remote/Module'));
const RemoteAngular = React.lazy(() => import('./angular-remote'));

const MF_EVENT_NAME = 'test-mf';
const MF_EVENT = new CustomEvent(MF_EVENT_NAME, { detail: 'test text' });

export function Grid() {
  const [test, setTest] = useState('');

  const onMFEvent = (e: any) => {
    setTest(e.detail);
  };

  useEffect(() => {
    document.addEventListener(MF_EVENT_NAME, onMFEvent);
    return () => document.removeEventListener(MF_EVENT_NAME, onMFEvent);
  }, []);

  return (
    <div>
      <h1>Grid: {test}</h1>
      <button
        className="bg-cyan-500"
        onClick={() => document.dispatchEvent(MF_EVENT)}
      >
        Share state!
      </button>
      <React.Suspense fallback={'Loading...'}>
        <div className="grid">
          <div className="grid-item">
            <RemoteAngular />
          </div>
          <div className="grid-item">
            <Remote />
          </div>
        </div>
      </React.Suspense>
    </div>
  );
}

export default Grid;

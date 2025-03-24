import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const Remote = React.lazy(() => import('remote/Module'));

export function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/remote">Remote</Link>
        </li>
      </ul>
      <React.Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<NxWelcome title="shell" />} />
          <Route path="/remote" element={<Remote />} />
        </Routes>
      </React.Suspense>
    </>
  );
}

export default App;

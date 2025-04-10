import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';

const Remote = React.lazy(() => import('remote/Module'));
const RemoteAngular = React.lazy(() => import('./angular-remote'));
const Grid = React.lazy(() => import('./grid'));

export function App() {
  return (
    <div className="wrapper">
      <ul className="header__container">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/remote">Remote</Link>
        </li>
        <li>
          <Link to="/remote-angular">Remote Angular</Link>
        </li>
        <li>
          <Link to="/grid">Grid</Link>
        </li>
      </ul>
      <React.Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<NxWelcome title="shell" />} />
          <Route path="/remote" element={<Remote />} />
          <Route path="/remote-angular" element={<RemoteAngular />} />
          <Route path="/grid" element={<Grid />} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;

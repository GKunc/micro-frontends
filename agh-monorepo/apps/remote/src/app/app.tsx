import '../styles.css';
import { useEffect, useState } from 'react';
import 'component-lib';

const MF_EVENT_NAME = 'test-mf';

export function App() {
  const [test, setTest] = useState('');

  const onMFEvent = (e: any) => {
    setTest(e.detail);
  };

  useEffect(() => {
    document.addEventListener(MF_EVENT_NAME, onMFEvent);
    return () => document.removeEventListener(MF_EVENT_NAME, onMFEvent);
  }, []);

  return (
    <div className="wrapper">
      <h1>Hello from React Remote</h1>
      <h1>Text from remote: {test}</h1>
      {/* @ts-ignore */}
      <library-button text="hi there" color="blue"></library-button>
    </div>
  );
}

export default App;

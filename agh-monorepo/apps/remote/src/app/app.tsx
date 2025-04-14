import '../styles.css';
import { useEffect, useState } from 'react';

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
      <h1>Text from shell: {test}</h1>
    </div>
  );
}

export default App;

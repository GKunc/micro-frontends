import '../styles.css';

export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="wrapper-container">
      <h3>{title}</h3>
      <h1>Hello Remote</h1>
    </div>
  );
}

export default NxWelcome;

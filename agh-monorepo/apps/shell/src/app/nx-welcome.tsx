import '../styles.css';
export function NxWelcome({ title }: { title: string }) {
  return (
    <div className="wrapper">
      <h3>{title}</h3>
      <h1>Hello Shell</h1>
    </div>
  );
}

export default NxWelcome;

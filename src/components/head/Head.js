import './Head.css';

export const Head = ({username}) => {
  return (
    <div className="app-head">
      { username ? username : "HEAD"}
    </div>
  );
}


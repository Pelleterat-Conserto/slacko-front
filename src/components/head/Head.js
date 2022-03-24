import './Head.css';

export const Head = ({ username }) => {
  return (
    <div className="app-head">
      { username && username.length > 1 ? username : "HEAD" }
    </div>
  );
}


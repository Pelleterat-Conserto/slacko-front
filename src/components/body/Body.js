import { Chat } from './chat/Chat';
import './Body.css';

export const Body = ({ username }) => {
  return (
    <div className="app-body">
      <Chat username={username} />
    </div>
  );
}


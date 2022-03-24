import Chat from './chat/Chat';
//import Chat from './chat/ChatClass';
import './Body.css';

export const Body = ({ username }) => {
  return (
    <div className="app-body">
      <Chat username={username} />
    </div>
  );
}


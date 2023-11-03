import { Outlet } from 'react-router-dom';
import  StartBox  from './components/StartBox/index.jsx';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import TypingGame from './components/TypingGame/TypingGame'


function App() {
  return (
    <div className="container">
      <TypingGame/>
      <StartBox />
    </div>

  );


}
export default App;
import { Outlet } from 'react-router-dom';
import StartBox from './components/StartBox';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import TypingGame from './components/TypingGame/TypingGame'

import Home from './pages/Home'

function App() {
  return (
    <div className="container">
      <Home />
      <TypingGame />
    </div>
  );

}
export default App;
import { Outlet } from 'react-router-dom';
import { StartBox } from './components/StartBox';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import TypingGame from './components/TypingGame/TypingGame'

// import StartBox from './components/StartBox';

function App() {
  return (
    <div className="container">
      <h1>typetester</h1>
      <TypingGame/>
      <StartBox />
    </div>

  );


}
export default App;
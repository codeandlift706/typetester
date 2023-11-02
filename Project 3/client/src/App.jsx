import { Outlet } from 'react-router-dom';
import { StartBox } from './components/StartBox';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import StartBox from './components/StartBox';

function App() {
  return (
    <div className="container">
      <StartBox />
    </div>

  );
}


export default App;
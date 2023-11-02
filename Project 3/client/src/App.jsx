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
    <>
      <h1>typetester</h1>
      <TestArea />
    </>
  )
}


export default App;
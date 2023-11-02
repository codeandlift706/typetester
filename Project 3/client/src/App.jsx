import { Outlet } from 'react-router-dom';
import StartBox from './components/StartBox';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import TestArea from './components/TestArea/TestArea'
import Home from './pages/Home'

function App() {

  return (
    <>
      <h1>typetester</h1>
      <Home />
      <TestArea />
    </>
  )
}


export default App;
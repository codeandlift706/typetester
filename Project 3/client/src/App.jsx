<<<<<<< HEAD
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
=======
import TestArea from './components/TestArea/TestArea'

function App() {

  return (
    <>
      <h1>typetester</h1>
      <TestArea />
    </>
  )
>>>>>>> 1779347f89181aaeb8b53beb8d94d5096e13294b
}


export default App;
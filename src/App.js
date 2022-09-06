import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import Home from './components/pages/Home';
import 'antd/dist/antd.css';
import './App.css';
const errorLink = onError(({ graphqlErrors, networkError}) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path})=> {
      alert('Grapgql error ${message}');
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri: "https://beta.pokeapi.co/graphql/v1beta"})

])
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
})

function App() {
  return (
      <ApolloProvider client={client}>
      <div className='appcontainer'>
        <Home/>
      </div>
      </ApolloProvider>
  )
}

export default App;

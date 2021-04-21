import "./App.css";
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from 'axios';
import usePokemon from './usePokemon';

const queryClient = new QueryClient();


function Experience() {
  const { isLoading, isError, data, error } = usePokemon('exp');
  console.log(data?.data.results);
  return <div>Hi</div>;
}


function Pokemon({ name }) {
  const fetchedPokemons = useQuery(name, async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    //To check the error
    // if (true) {
    //   throw new Error('testing the error');
    // }
    
    const info = await axios.get("https://pokeapi.co/api/v2/pokemon");
    return info;
  }, { staleTime: 8000 });

  //console.log(fetchedPokemons.data?.data?.results)
  if (fetchedPokemons.error) return <h1>Error during Fetching...</h1>

  return (
    <div>
      {fetchedPokemons.isLoading ? 'Loading...'
        : fetchedPokemons.data.data.results.map(poke => <p key={poke.name}>{poke.name}</p>)}
      {fetchedPokemons.isFetching ? 'Updating invisible data...' : null}
      <br />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>pokemon</h1>
      <QueryClientProvider client={queryClient}>
        <Experience />
        <Pokemon name="p1" />
        <Pokemon name="p2" />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;

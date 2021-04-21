import { useQuery } from 'react-query'
import axios from 'axios';

const usePokemon = (name = 'myAPI') => {

    const fetchedPokemons = useQuery(name, async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return await axios.get("https://pokeapi.co/api/v2/pokemon");
    }, { staleTime: 2000 });

    return fetchedPokemons;
       
}

export default usePokemon

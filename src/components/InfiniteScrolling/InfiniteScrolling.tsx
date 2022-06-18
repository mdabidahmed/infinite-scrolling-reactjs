import axios from 'axios';
import {useLayoutEffect, useState} from 'react';
import '../../App.css';
const InfiniteScrolling = () => {
  let offset = 0;
  const [pokemon, setPokemon] = useState([]);
  const loadMorePokemon = () => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then(({data}) => {
        const newPokemon: any[] = [];
        data.results.forEach((item: any) => newPokemon.push(item.name));
        setPokemon(oldPokemon => [...oldPokemon, ...newPokemon]);
      });
    offset += 10;
  };
  const handleScroll = (e: any) => {
    console.log('top: ', e.target.documentElement.scrollTop);
    console.log('window-first-screen-height: ', window.innerHeight);
    console.log('height', e.target.documentElement.scrollHeight);
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 1 >=
      e.target.documentElement.scrollHeight
    ) {
      loadMorePokemon();
      console.log(pokemon);
    }
  };
  useLayoutEffect(() => {
    loadMorePokemon();
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <h3>Pokemon List</h3>
      <div>
        {pokemon.length &&
          pokemon.map((val: any, key: any) => (
            <div className='card' key={key}>
              <h3>
                {key + 1}. {val}
              </h3>
            </div>
          ))}
      </div>
    </>
  );
};

export default InfiniteScrolling;

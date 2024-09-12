import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './Display'; 
import Pagination from './pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
    const [pokemonData, setPokemonData] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [searchPokemon, setSearchPokemon] = useState('');  
    const postPerPage = 6;

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=800')
        .then((res) => {
            const PokemonList = res.data.results.map((pokemon, index) => ({
                name: pokemon.name,
                id: index + 1,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
            }));
            setPokemonData(PokemonList);
        })
        .catch((error) => {
            console.error("Error fetching Pokémon list:", error);
        });
    }, []);

    
    const findPokemon = pokemonData.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
    );

    const lastIndex = currentPage * postPerPage;
    const firstIndex = lastIndex - postPerPage;
    const currentPost = findPokemon.slice(firstIndex, lastIndex);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <nav className='bg-slate-800 md:flex items-center gap-x-[30%] p-6 '>
                <div className='flex items-center'>
                    <p className='text-yellow-300 font-bold text-3xl font-poppins'>POKEMON</p>
                </div>
                <div className='flex items-center mt-4 md:mt-0'>
                    <input 
                        type='text' 
                        placeholder='Search...' 
                        className='border-none rounded-md p-2 text-black w-96 h-8'
                        value={searchPokemon} 
                        onChange={(e) => setSearchPokemon(e.target.value)} 
                    />
                    <button className='ml-2 p-1 bg-yellow-300 rounded-md'>
                        <FontAwesomeIcon icon={faSearch} style={{ color: 'black' }} />
                    </button>
                </div>
            </nav>
            <Display pokemonData={currentPost} />
            <Pagination
                totalPosts={findPokemon.length}  
                postPerPage={postPerPage}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    );
}

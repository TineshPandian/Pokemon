// Display.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Display({ pokemonData }) {
    return (
        <div className='grid md:grid-cols-3 gap-20 px-20 md:px-32 py-14 grid grid-cols-1'>
            {pokemonData && pokemonData.length > 0 ? (
                pokemonData.map((pokemon) => (
                    <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
                        <div className='p-4 rounded-lg  flex flex-col items-center bg-red-500'>
                            <p className='text-white font-poppins text-xs font-light mb-3'>
                                #{pokemon.id}
                            </p>
                            <img
                                src={pokemon.image}
                                alt={pokemon.name}
                                className='w-28 h-28'
                            />
                            <p className='mt-2 text-lg font-medium capitalize text-white font-poppins'>
                                {pokemon.name}
                            </p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>Loading Pokémon...</p>
            )}
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function PokemonDetails() {
    const { id } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState(null);

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => setPokemonDetails(res.data))
        .catch((error) => console.error('Error fetching Pokémon details:',error));
    }, [id]);

    if (!pokemonDetails) {
        return <p>Loading details...</p>;
    }

    const {name,stats,types,sprites,abilities} = pokemonDetails;

    const typeColor = {
        grass: { bg: 'bg-green-500', text: 'text-green-700' },
        poison: { bg: 'bg-purple-500', text: 'text-purple-700' },
        fire: { bg: 'bg-orange-500', text: 'text-orange-700' },
        water: { bg: 'bg-blue-500', text: 'text-blue-700' },
        ground: { bg: 'bg-yellow-700', text: 'text-yellow-700' },
        flying: { bg: 'bg-gray-400', text: 'text-gray-600' },
        electric: { bg: 'bg-yellow-500', text: 'text-yellow-600' },
        bug: { bg: 'bg-lime-500', text: 'text-lime-600' },
        fairy: { bg: 'bg-pink-500', text: 'text-pink-600' },
        ice: { bg: 'bg-cyan-500', text: 'text-cyan-600' },
        psychic: { bg: 'bg-pink-400', text: 'text-pink-500' },
        dark: { bg: 'bg-gray-800', text: 'text-gray-900' },
        steel: { bg: 'bg-gray-700', text: 'text-gray-800' },
        dragon: { bg: 'bg-indigo-500', text: 'text-indigo-700' },
        ghost: { bg: 'bg-indigo-700', text: 'text-indigo-900' },
        rock: { bg: 'bg-yellow-600', text: 'text-yellow-800' },
        normal:{bg:'bg-slate-500', text:'text-slate-800'}
    };

    const bgColor = typeColor[types[0].type.name]?.bg || 'bg-red-500'; 
    const textColour = typeColor[types[0].type.name]?.text || 'bg-black';

    return (
        <div className={`flex justify-center items-center min-h-screen ${bgColor} `}>
            <div className={`bg-white h-auto w-96 rounded-2xl p-8 text-center shadow-lg m-10 md:m-0`}>
                <h1 className={`capitalize text-2xl font-bold mb-4 ${textColour}`}>{name}</h1>
                <img 
                    src={sprites.other['official-artwork'].front_default} 
                    alt={name} 
                    className='h-48 w-48 mx-auto mb-4' 
                />
                <div className='mb-2 flex items-center justify-center gap-x-3'>
                    {types.map((type, index) => (
                        <p
                            key={index}
                            className={`capitalize font-bold ${typeColor[type.type.name]?.text || 'text-black'} mb-1`}
                        >
                            {type.type.name}
                        </p>
                    ))}
                </div>
                <p><b className='text-slate-800'>HP:</b> {stats[0].base_stat}</p>
                <p><b className='text-slate-800'>Attack:</b> {stats[1].base_stat}</p>
                <p><b className='text-slate-800'>Defense:</b> {stats[2].base_stat}</p>
                <p><b className='text-slate-800'>Abilities:</b> {abilities.map(ability => ability.ability.name).join(', ')}</p>
            </div>
        </div>
    );
}

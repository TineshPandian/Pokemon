import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PokemonDetails from './components/pokemondetails'; // Import the new details page component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />}  />
    </Routes>
  );
}

export default App;

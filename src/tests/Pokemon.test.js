import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testes do componente "Pokemon', () => {
  it('Verifica  se é renderizado um card com as informações de determinado pokémon',
    () => {
      const pokemon = pokemons[0];
      const favorite = false;

      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ favorite } />);

      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(pokemon.name);

      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(pokemon.type);

      const pokemonWeight = screen.getByTestId('pokemon-weight');
      const pokemonWeighValue = pokemon.averageWeight.value;
      const pokemonWeighUnit = pokemon.averageWeight.measurementUnit;
      expect(pokemonWeight).toHaveTextContent(
        `Average weight: ${pokemonWeighValue} ${pokemonWeighUnit}`,
      );

      const pokemonImage = screen.getByRole('img', { name: `${pokemon.name} sprite` });
      expect(pokemonImage).toHaveAttribute('src', pokemon.image);
    });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do componente "PokemonDetails"', () => {
  it('Verifica se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);

      const pokemonDetailsLink = screen.getByRole('link', { name: 'More details' });
      userEvent.click(pokemonDetailsLink);

      const pokemonDetailsTitle = screen.getByRole(
        'heading', { name: `${pokemons[0].name} Details` },
      );
      expect(pokemonDetailsTitle).toBeInTheDocument();
      expect(pokemonDetailsLink).not.toBeInTheDocument();

      const detailSumary = screen.getByRole('heading', { name: /Summary/i });
      expect(detailSumary).toBeInTheDocument();

      const summaryParagraph = screen.getByText(/hard berries with electricity to make/i);
      expect(summaryParagraph).toBeInTheDocument();
    });

  it('Verifica se é exibido os mapas com as localizações de um pokemon', () => {
    renderWithRouter(<App />);

    const pokemonDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(pokemonDetailsLink);

    const pokemonLocationTitle = screen.getByRole(
      'heading', { name: `Game Locations of ${pokemons[0].name}` },
    );
    expect(pokemonLocationTitle).toBeInTheDocument();

    const locations = pokemons[0].foundAt;
    const imgLocationMap = screen.getAllByRole(
      'img', { name: `${pokemons[0].name} location` },
    );
    expect(imgLocationMap).toHaveLength(locations.length);

    imgLocationMap.forEach((imgMap, index) => {
      expect(imgMap).toHaveAttribute('src', locations[index].map);
    });

    locations.forEach((location) => {
      const locationName = screen.getByText(location.location);
      expect(locationName).toBeInTheDocument();
    });

  });
});

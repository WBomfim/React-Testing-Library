import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pokemon = pokemons[0];
const moreDetailsLink = 'More details';
let favorite = false;

describe('Testes do componente "Pokemon"', () => {
  it('Verifica  se é renderizado um card com as informações de determinado pokémon',
    () => {
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

  it('Verifica se o card do pokémon contém um link para exibir detalhes deste pokémon',
    () => {
      renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ favorite } />);

      const pokemonDetailsLink = screen.getByRole('link', { name: moreDetailsLink });
      expect(pokemonDetailsLink).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
    });

  it('Verifica se ao clicar no link é feito o redirecionamento para a página de detalhes',
    () => {
      renderWithRouter(<App />);

      const pokemonDetailsLink = screen.getByRole('link', { name: moreDetailsLink });
      userEvent.click(pokemonDetailsLink);

      const pokemonDetailsTitle = screen.getByRole(
        'heading', { name: `${pokemons[0].name} Details` },
      );
      expect(pokemonDetailsTitle).toBeInTheDocument();

      const pokemonLocationTitle = screen.getByRole(
        'heading', { name: `Game Locations of ${pokemons[0].name}` },
      );
      expect(pokemonLocationTitle).toBeInTheDocument();
    });

  it('Verifica se a URL exibida no navegador muda para o pokemon que está em exibição',
    () => {
      const { history } = renderWithRouter(
        <Pokemon pokemon={ pokemon } isFavorite={ favorite } />,
      );

      const pokemonDetailsLink = screen.getByRole('link', { name: moreDetailsLink });
      userEvent.click(pokemonDetailsLink);

      const { location: { pathname } } = history;
      expect(pathname).toBe(`/pokemons/${pokemon.id}`);
    });

  it('Verifica se o card do pokémon contém um ícone de favorito', () => {
    favorite = true;

    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite={ favorite } />);

    const pokemonFavoriteIcon = screen.getByRole(
      'img', { name: `${pokemon.name} is marked as favorite` },
    );
    expect(pokemonFavoriteIcon).toBeInTheDocument();
    expect(pokemonFavoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do componente "Pokedex', () => {
  it('Verifica se a página contém um heading h2 com o texto "Encountered pokémons"',
    () => {
      renderWithRouter(<App />);

      const heading = screen.getByRole(
        'heading', { level: 2, name: /Encountered pokémons/i },
      );
      expect(heading).toBeInTheDocument();
    });

  it('Verifica se a página exibe o próximo pokemon quando o botão próximo é clicado',
    () => {
      renderWithRouter(<App />);

      const button = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(button).toBeInTheDocument();

      pokemons.forEach((pokemon, index) => {
        const pokemonName = screen.getByText(`${pokemon.name}`);
        const pokemonImg = screen.getByRole('img', { name: `${pokemon.name} sprite` });
        expect(pokemonName).toBeInTheDocument();
        expect(pokemonImg).toBeInTheDocument();
        expect(pokemonImg.src).toBe(pokemon.image);
        userEvent.click(button);

        if (index === pokemons.length - 1) {
          const pikachu = screen.getByText(/Pikachu/i);
          const pikachuImg = screen.getByRole('img', { name: /Pikachu sprite/i });
          expect(pikachu).toBeInTheDocument();
          expect(pikachuImg).toBeInTheDocument();
          expect(pikachuImg.src).toBe(pokemons[0].image);
        }
      });
    });

  it('Verifica se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName).toHaveLength(1);
  });

  it('Verifica se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const pokemonsType = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];
    const getAllButtons = screen.getAllByTestId('pokemon-type-button');
    expect(getAllButtons).toHaveLength(pokemonsType.length);

    pokemonsType.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
    });

    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();

    const pokemonsFire = pokemons.filter((pokemon) => pokemon.type === 'Fire');
    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(buttonFire);
    pokemonsFire.forEach((pokemon) => {
      const pokemonName = screen.getByText(`${pokemon.name}`);
      const pokemonImg = screen.getByRole('img', { name: `${pokemon.name} sprite` });
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonImg).toBeInTheDocument();
      expect(pokemonImg.src).toBe(pokemon.image);
      userEvent.click(buttonNext);
    });
  });

  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonName = screen.getByTestId('pokemon-name');
    const buttonFire = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(buttonFire);
    expect(pokemonType).toHaveTextContent(/Fire/i);
    expect(pokemonName).toHaveTextContent(/Charmander/i);

    const buttonAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(buttonAll);
    expect(pokemonType).not.toHaveTextContent(/Fire/i);
    expect(pokemonName).not.toHaveTextContent(/Charmander/i);

    const buttonNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      expect(pokemonType).toHaveTextContent(pokemon.type);
      expect(pokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(buttonNext);
    });
  });
});

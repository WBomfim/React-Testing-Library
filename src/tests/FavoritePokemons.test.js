import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes do componente "FavoritePokemons"', () => {
  it('Verifica se contém o texto "No favorite pokemon found" quando não há favoritos',
    () => {
      render(<FavoritePokemons />);

      const text = screen.getByText(/No favorite pokemon found/i);
      expect(text).toBeInTheDocument();
    });

  it('Verifica se é exibido os cards de pokémons favoritados', () => {
    const favoritePokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: {
          value: '6.0',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          value: '8.5',
          measurementUnit: 'kg',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);

    const pikachu = screen.getByText(/Pikachu/i);
    const imgPikachu = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(pikachu).toBeInTheDocument();
    expect(imgPikachu).toBeInTheDocument();
    expect(imgPikachu.src).toBe(favoritePokemons[0].image);

    const charmander = screen.getByText(/Charmander/i);
    const imgCharmander = screen.getByRole('img', { name: /Charmander sprite/i });
    expect(charmander).toBeInTheDocument();
    expect(imgCharmander).toBeInTheDocument();
    expect(imgCharmander.src).toBe(favoritePokemons[1].image);
  });
});

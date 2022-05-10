import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes do componente "FavoritePokemons"', () => {
  it('Verifica se contém o texto "No favorite pokemon found" quando não há favoritos',
    () => {
      render(<FavoritePokemons />);

      const text = screen.getByText(/No favorite pokemon found/i);
      expect(text).toBeInTheDocument();
    });
});

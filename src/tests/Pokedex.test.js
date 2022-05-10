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
});

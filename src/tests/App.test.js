import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente "App"', () => {
  it('Verifica se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      renderWithRouter(<App />);

      const linkHome = screen.getByRole('link', { name: /Hom/i });
      expect(linkHome).toBeInTheDocument();

      const linkAbout = screen.getByRole('link', { name: /About/i });
      expect(linkAbout).toBeInTheDocument();

      const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(linkFavorite).toBeInTheDocument();
    });
});

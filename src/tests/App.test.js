import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('Verifica o direcionamento para a página inicial ao clicar no link "Home"', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Verifica o direcionamento para a página About ao clicar no link "About"', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('Verifica o direcionamento para a página favoritos ao clicar no link "Favorite"',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(linkFavorite);

      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

  it('Verifica o direcionamento para a página NotFound ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/NotFound');

      const notFoundExibition = screen.getByRole(
        'heading', { level: 2, name: /Page requested not found/i },
      );
      expect(notFoundExibition).toBeInTheDocument();
    });
});

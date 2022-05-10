import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testes do componente "About"', () => {
  it('Verifica se a página contém um heading com o texto "About Pokédex', () => {
    render(<About />);

    const titleAbout = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(titleAbout).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);

    const descriptionAbout01 = screen.getByText(/This application simulates a Pokédex/i);
    expect(descriptionAbout01).toBeInTheDocument();

    const descriptionAbout02 = screen.getByText(/One can filter Pokémons by type/i);
    expect(descriptionAbout02).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem de uma Pokédex', () => {
    render(<About />);

    const img = screen.getByRole('img', { name: /Pokédex/i });
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(src);
  });
});

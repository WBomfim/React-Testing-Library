import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do componente "NotFound"', () => {
  it('Verifica se contém um heading com o texto "Page requested not found 😭"', () => {
    render(<NotFound />);

    const heading = screen.getByRole(
      'heading', { level: 2, name: /Page requested not found/i },
    );
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se contém uma imagem com o atributo "src" igual a "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    render(<NotFound />);

    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const nameImg = 'Pikachu crying because the page requested was not found';
    const image = screen.getByRole('img', { name: nameImg });
    expect(image.src).toBe(src);
  });
});

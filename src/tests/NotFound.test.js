import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('testar component notFound', () => {
  it('a página contém um heading h2', () => {
    renderWithRouter(<NotFound />);
    const notFoundtitle = screen.getByRole('heading', {
      name: /Page requested not found/, level: 2,
    });

    expect(notFoundtitle).toBeInTheDocument();
  });

  it('a página contém um gif', () => {
    renderWithRouter(<NotFound />);
    const pikachuGif = screen.getByAltText(/Pikachu crying/);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(pikachuGif).toBeInTheDocument();
    expect(pikachuGif).toHaveAttribute('src', src);
  });
});

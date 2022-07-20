import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../pages/About';

describe('testar component About', () => {
  it('a página contém um heading h2 com o texto about pokedex', () => {
    renderWithRouter(<About />);
    const headTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(headTitle).toBeInTheDocument();
  });

  it('a página contém dois parágrafos com texto sobre a pokédex', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs).toHaveLength(2);
  });

  it('a página contém uma imagem de uma pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImage = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', src);
  });
});

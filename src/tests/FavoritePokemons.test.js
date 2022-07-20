import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import pokemons from '../data';

describe('testar componente favoritePokemons', () => {
  it('verificar se mensagem é exibida na tela quando não há favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const favoriteText = screen.getByText('No favorite pokemon found');
    expect(favoriteText).toBeInTheDocument();
  });

  it('verificar se todos os cards de pokémons favoritados são exibidos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    pokemons.forEach((pokemon) => {
      const name = screen.getByText(pokemon.name);
      expect(name).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('testar componente pokedex', () => {
  const verifyPokemonExists = (pokemon) => {
    const nextPokemonButton = screen.getByTestId('next-pokemon');
    const pokemonName = screen.getByText(pokemon.name);
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
  };

  it('a página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    });

    expect(pokedexTitle).toBeInTheDocument();
  });

  it('é exibido o próximo pokémon quando o botão próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      verifyPokemonExists(pokemon);
    });

    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });

  it('é exibido um pokémon por vez', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByTestId('next-pokemon');
    expect(nextPokemonButton).toBeInTheDocument();

    pokemons.forEach(() => {
      const pokemonName = screen.getAllByTestId('pokemon-name');
      expect(pokemonName).toHaveLength(1);
      userEvent.click(nextPokemonButton);
    });
  });

  it('os botões de filtros existem e funcionam', () => {
    renderWithRouter(<App />);

    const repeteadTypes = pokemons.map((pokemon) => pokemon.type);
    const uniqueTypes = [...new Set(repeteadTypes)];
    const seven = 7;
    const typeButtonById = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtonById).toHaveLength(seven);

    // existe um botão para cada tipo e o texto do botão corresponde ao nome do tipo
    uniqueTypes.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: `${type}` });
      expect(typeButton).toBeInTheDocument();
    });

    // verifica se ao clicar no filtro, ele so vai passar por pokemons do mesmo tipo
    uniqueTypes.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: `${type}` });
      userEvent.click(typeButton);

      const pokemonsOfType = pokemons.filter((pokemon) => pokemon.type === type);

      pokemonsOfType.forEach((pokemon) => {
        verifyPokemonExists(pokemon);
      });
    });
  });

  it('a pokédex possui botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const typeButton = screen.getByRole('button', { name: 'All' });
    expect(typeButton).toBeInTheDocument(typeButton);
    userEvent.click(typeButton);

    pokemons.forEach((pokemon) => {
      verifyPokemonExists(pokemon);
    });
  });
});

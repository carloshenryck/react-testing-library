import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('testar componente pokemon', () => {
  const details = 'More details';

  it('é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const averageWeight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText('Pikachu sprite');

    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(averageWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('o card possui um link para mais detalhes', () => {
    renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: details });
    expect(detailLink).toHaveProperty('href', 'http://localhost/pokemons/25');
    expect(detailLink).toBeInTheDocument();
  });

  it('ao clicar no link para mais detalhes há um redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: details });

    userEvent.click(detailLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('há ícone de estrelas nos favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailLink = screen.getByRole('link', { name: details });
    userEvent.click(detailLink);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    history.push('/');

    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});

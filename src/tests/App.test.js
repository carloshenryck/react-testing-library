import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('testar component App', () => {
  it('topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('é direcionado para a página inicial ao clicar no link home', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('é direcionado para a página about ao clicar no link about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('é direcionado para a página favoritos ao clicar no link favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('é direcionado para a página Not Found ao inserir uma Url desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');

    const notFoundTitle = screen.getByText('Page requested not found');
    expect(notFoundTitle).toBeInTheDocument();
  });
});

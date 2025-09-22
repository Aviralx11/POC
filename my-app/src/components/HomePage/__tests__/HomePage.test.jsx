import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest'; 
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import HomePage from '../HomePage';



const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock('../../assets/railway-logo.jpg', () => ({ default: 'railway-logo.jpg' }));
vi.mock('../../assets/hero-train.jpg', () => ({ default: 'hero-train.jpg' }));

const mockStore = configureStore([]);



describe('HomePage Component', () => {
  let store;

  
  beforeEach(() => {
    store = mockStore({
      auth: { isAuthenticated: true, user: { name: 'Test User' } },
    });
    mockedNavigate.mockClear();
    store.clearActions();
  });

  it('should render the main ticketing heading', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    const headingElement = screen.getByRole('heading', { name: /ticketing/i, level: 1 });
    expect(headingElement).toBeInTheDocument();
  });

  it('should navigate to /book-ticket when "Book Ticket" button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    const bookTicketButton = screen.getByRole('button', { name: /book ticket/i });
    fireEvent.click(bookTicketButton);
    expect(mockedNavigate).toHaveBeenCalledWith('/book-ticket');
  });

  it('should dispatch the logout action when "Logout" button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('auth/logout');
  });
});

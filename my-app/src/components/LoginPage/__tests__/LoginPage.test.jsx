import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import LoginPage from '../LoginPage';

// --- Mocking Dependencies ---
// This component depends on both useNavigate and useDispatch (via Redux)
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Setup for a fake Redux store
const mockStore = configureStore([]);

// --- The Tests ---

describe('LoginPage Component', () => {
  let store;

  // Before each test, create a fresh mock store and clear our spies
  beforeEach(() => {
    store = mockStore({}); // Start with an empty store
    mockedNavigate.mockClear();
    store.clearActions();
  });

  it('should render the login form', () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Assert
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile no/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields on submit', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Act: Click the login button without filling out the form
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Assert: Check that the required error messages appear
    // We use `findByText` because the state update is asynchronous
    expect(await screen.findByText('Name is required.')).toBeInTheDocument();
    expect(await screen.findByText('Mobile number is required.')).toBeInTheDocument();
    expect(await screen.findByText('Password is required.')).toBeInTheDocument();
  });

  it('should show an error for an invalid mobile number format', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Act: Fill in the form with an invalid mobile number
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/mobile no/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123@' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert
    expect(await screen.findByText('Mobile number must be exactly 10 digits.')).toBeInTheDocument();
  });

  it('should show an error for an invalid password format', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Act: Fill in the form with an invalid password
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/mobile no/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'weak' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert
    expect(await screen.findByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  });

  it('should show an error for invalid credentials', async () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Act: Fill in the form with incorrect (but validly formatted) credentials
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Wrong User' } });
    fireEvent.change(screen.getByLabelText(/mobile no/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123@' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert
    expect(await screen.findByText('Invalid credentials. Please try again.')).toBeInTheDocument();
  });

  it('should dispatch loginSuccess and navigate to home on successful login', () => {
    // Arrange
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Act: Fill in the form with the correct MOCK_USER credentials
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/mobile no/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'Password123@' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert: Check that the correct Redux action was dispatched
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('auth/loginSuccess');
    expect(actions[0].payload).toEqual({ name: 'Test User' });

    // Assert: Check that navigation to the home page occurred
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});

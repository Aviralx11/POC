import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import NoTrainsFoundPage from '../NoTrainsFoundPage';

// --- Mocking Dependencies ---
// This component's only dependency is the `useNavigate` hook.
const mockedNavigate = vi.fn(); // Create a spy to track calls

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate, // Replace the real hook with our spy
  };
});

// --- The Tests ---

describe('NoTrainsFoundPage Component', () => {
  // Before each test, clear any history from our mock navigate function
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('should render the "No Trains Found" message and the back button', () => {
    // Arrange
    render(
      <MemoryRouter>
        <NoTrainsFoundPage />
      </MemoryRouter>
    );

    // Assert: Check if the main heading is visible
    expect(screen.getByRole('heading', { name: /no trains found/i })).toBeInTheDocument();

    // Assert: Check if the descriptive paragraph is visible
    expect(screen.getByText(/sorry, we couldn't find any trains/i)).toBeInTheDocument();

    // Assert: Check if the button is visible
    expect(screen.getByRole('button', { name: /try a new search/i })).toBeInTheDocument();
  });

  it('should navigate back to the book ticket page with replace option on button click', () => {
    // Arrange
    render(
      <MemoryRouter>
        <NoTrainsFoundPage />
      </MemoryRouter>
    );

    // Act: Find the button and click it
    const backButton = screen.getByRole('button', { name: /try a new search/i });
    fireEvent.click(backButton);

    // Assert: Check that navigate was called with the correct path AND the replace option
    expect(mockedNavigate).toHaveBeenCalledWith(
      '/book-ticket', 
      { replace: true }
    );
  });
});

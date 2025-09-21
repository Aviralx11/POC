import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import BookTicketPage from '../BookTicketPage';

// --- Mocking Dependencies ---
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// --- The Tests ---

describe('BookTicketPage Component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('should render the form with default values', () => {
    // Arrange
    render(
      <MemoryRouter>
        <BookTicketPage />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByRole('heading', { name: /book ticket/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();

    const today = new Date().toISOString().split('T')[0];
    
    // --- THIS IS THE FIX ---
    // Use a more specific selector to find the label that is exactly "Date"
    expect(screen.getByLabelText(/^date$/i)).toHaveValue(today);
  });

  // ... (the rest of the test file remains exactly the same) ...

  it('should allow the user to type in the "From" and "To" fields', () => {
    render(
      <MemoryRouter>
        <BookTicketPage />
      </MemoryRouter>
    );

    const fromInput = screen.getByLabelText(/from/i);
    const toInput = screen.getByLabelText(/to/i);

    fireEvent.change(fromInput, { target: { value: 'New Delhi' } });
    fireEvent.change(toInput, { target: { value: 'Mumbai' } });

    expect(fromInput).toHaveValue('New Delhi');
    expect(toInput).toHaveValue('Mumbai');
  });

  it('should navigate to /search-results with search criteria on form submission', () => {
    render(
      <MemoryRouter>
        <BookTicketPage />
      </MemoryRouter>
    );

    const fromInput = screen.getByLabelText(/from/i);
    const toInput = screen.getByLabelText(/to/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(fromInput, { target: { value: 'SECUNDERABAD' } });
    fireEvent.change(toInput, { target: { value: 'VIJAYAWADA' } });
    
    fireEvent.click(searchButton);

    const today = new Date().toISOString().split('T')[0];
    expect(mockedNavigate).toHaveBeenCalledWith(
      '/search-results',
      {
        state: {
          searchCriteria: {
            from: 'SECUNDERABAD',
            to: 'VIJAYAWADA',
            date: today,
            allClasses: 'All Classes',
            quota: 'GENERAL',
          },
        },
      }
    );
  });

  it('should navigate to the home page when "Back to Home" is clicked', () => {
    render(
      <MemoryRouter>
        <BookTicketPage />
      </MemoryRouter>
    );

    const backButton = screen.getByRole('button', { name: /back to home/i });
    fireEvent.click(backButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});

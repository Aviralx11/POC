import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import NoTrainsFoundPage from '../NoTrainsFoundPage';



const mockedNavigate = vi.fn(); // Create a spy to track calls

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate, 
  };
});



describe('NoTrainsFoundPage Component', () => {
  
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

    
    expect(screen.getByRole('heading', { name: /no trains found/i })).toBeInTheDocument();

    
    expect(screen.getByText(/sorry, we couldn't find any trains/i)).toBeInTheDocument();

    
    expect(screen.getByRole('button', { name: /try a new search/i })).toBeInTheDocument();
  });

  it('should navigate back to the book ticket page with replace option on button click', () => {
    // Arrange
    render(
      <MemoryRouter>
        <NoTrainsFoundPage />
      </MemoryRouter>
    );

    
    const backButton = screen.getByRole('button', { name: /try a new search/i });
    fireEvent.click(backButton);

    
    expect(mockedNavigate).toHaveBeenCalledWith(
      '/book-ticket', 
      { replace: true }
    );
  });
});

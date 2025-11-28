import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import AnimeDetail from './AnimeDetail';
import { AnimeProvider } from '../context/AnimeContext';
import * as kitsuApi from '../services/kitsuApi';

// Mock the kitsuApi module
vi.mock('../services/kitsuApi');

const mockAnime = {
  id: '1',
  type: 'anime',
  attributes: {
    canonicalTitle: 'Test Anime',
    synopsis: 'This is a test anime synopsis',
    startDate: '2024-01-01',
    endDate: null,
    status: 'current',
    subtype: 'TV',
    episodeCount: 12,
    posterImage: {
      tiny: 'https://example.com/tiny.jpg',
      small: 'https://example.com/small.jpg',
      medium: 'https://example.com/medium.jpg',
      large: 'https://example.com/large.jpg',
      original: 'https://example.com/original.jpg',
    },
    coverImage: {
      tiny: 'https://example.com/cover-tiny.jpg',
      small: 'https://example.com/cover-small.jpg',
      large: 'https://example.com/cover-large.jpg',
      original: 'https://example.com/cover-original.jpg',
    },
    averageRating: '85.5',
    youtubeVideoId: 'dQw4w9WgXcQ',
  },
};

describe('AnimeDetail - Favorites Button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const renderWithRouter = (animeId = '1') => {
    return render(
      <MemoryRouter initialEntries={[`/anime/${animeId}`]}>
        <AnimeProvider>
          <Routes>
            <Route path="/anime/:id" element={<AnimeDetail />} />
          </Routes>
        </AnimeProvider>
      </MemoryRouter>
    );
  };

  it('should display favorites button', async () => {
    kitsuApi.getAnimeById.mockResolvedValue(mockAnime);

    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Test Anime')).toBeInTheDocument();
    });

    const favoriteButton = screen.getByRole('button', { name: /agregar a favoritos/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  it('should toggle favorite state when clicked', async () => {
    kitsuApi.getAnimeById.mockResolvedValue(mockAnime);

    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Test Anime')).toBeInTheDocument();
    });

    // Initially not favorited
    let favoriteButton = screen.getByRole('button', { name: /agregar a favoritos/i });
    expect(favoriteButton).toBeInTheDocument();
    expect(favoriteButton.textContent).toContain('Agregar a Favoritos');

    // Click to add to favorites
    fireEvent.click(favoriteButton);

    // Should now show as favorited
    await waitFor(() => {
      favoriteButton = screen.getByRole('button', { name: /quitar de favoritos/i });
      expect(favoriteButton.textContent).toContain('En Favoritos');
    });

    // Click again to remove from favorites
    fireEvent.click(favoriteButton);

    // Should be back to not favorited
    await waitFor(() => {
      favoriteButton = screen.getByRole('button', { name: /agregar a favoritos/i });
      expect(favoriteButton.textContent).toContain('Agregar a Favoritos');
    });
  });

  it('should persist favorite state in localStorage', async () => {
    kitsuApi.getAnimeById.mockResolvedValue(mockAnime);

    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Test Anime')).toBeInTheDocument();
    });

    const favoriteButton = screen.getByRole('button', { name: /agregar a favoritos/i });
    
    // Add to favorites
    fireEvent.click(favoriteButton);

    await waitFor(() => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      expect(favorites).toContain('1');
    });
  });

  it('should show correct icon for favorite state', async () => {
    kitsuApi.getAnimeById.mockResolvedValue(mockAnime);

    renderWithRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Test Anime')).toBeInTheDocument();
    });

    const favoriteButton = screen.getByRole('button', { name: /agregar a favoritos/i });
    
    // Check initial icon (white heart)
    expect(favoriteButton.textContent).toContain('🤍');

    // Click to favorite
    fireEvent.click(favoriteButton);

    // Check favorited icon (red heart)
    await waitFor(() => {
      const updatedButton = screen.getByRole('button', { name: /quitar de favoritos/i });
      expect(updatedButton.textContent).toContain('❤️');
    });
  });
});

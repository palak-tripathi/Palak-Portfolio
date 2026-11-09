/**
 * Palak Tripathi Portfolio — Unified Data Service Layer
 *
 * Provides an asynchronous, MongoDB-compatible interface.
 * Currently serves data from local JSON data stores with async promises,
 * allowing instant zero-latency loading in production, while mirroring
 * exact Mongoose document schema for seamless future backend integration.
 */

import travelData from "../data/travel.json";
import artData from "../data/art.json";
import booksData from "../data/books.json";
import creditsData from "../data/credits.json";

export const TravelService = {
  /**
   * Get all travel chapters
   * @returns {Promise<Array>} List of travel chapters with photos
   */
  async getChapters() {
    return Promise.resolve(travelData.chapters || []);
  },

  /**
   * Get a single chapter by slug/id
   * @param {string} id
   */
  async getChapterById(id) {
    const chapter = (travelData.chapters || []).find((c) => c.id === id);
    return Promise.resolve(chapter || null);
  },

  /**
   * Get all photos across all chapters flattened
   */
  async getAllPhotos() {
    const all = [];
    (travelData.chapters || []).forEach((c) => {
      (c.photos || []).forEach((p) => {
        all.push({ ...p, chapterId: c.id, chapterName: c.name });
      });
    });
    return Promise.resolve(all);
  },
};

export const ArtService = {
  /**
   * Get all artworks with metadata, palettes, and behind-the-canvas stories
   */
  async getArtworks() {
    return Promise.resolve(artData.artworks || []);
  },

  /**
   * Get a single artwork by ID
   * @param {string} id
   */
  async getArtworkById(id) {
    const art = (artData.artworks || []).find((a) => a.id === id);
    return Promise.resolve(art || null);
  },

  /**
   * Get artist details, tools & materials
   */
  async getArtistDetails() {
    return Promise.resolve({
      artistBio: artData.artistBio,
      tools: artData.tools,
      quotes: artData.sketchbookQuotes,
    });
  },
};

export const BooksAndMusicService = {
  /**
   * Get bookshelf books with ratings, spines and quotes
   */
  async getBooks() {
    return Promise.resolve(booksData.books || []);
  },

  /**
   * Get curated tracks and acoustic vocal sessions
   */
  async getTracks() {
    return Promise.resolve(booksData.musicVibes || []);
  },
};

export const CreditsService = {
  /**
   * Get full photographic attribution and licensing directory
   */
  async getCredits() {
    return Promise.resolve(creditsData);
  },
};

export default {
  TravelService,
  ArtService,
  BooksAndMusicService,
  CreditsService,
};

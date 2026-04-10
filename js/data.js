/**
 * Genre Definitions & TMDB Mapping
 * No pre-loaded movie database — everything searched live
 */

const GenreData = {
  // 26 Genres: 14 main + 12 sub-genres
  genres: {
    action: { name: 'Action', icon: '💥', group: 'main', tmdbId: 28 },
    adventure: { name: 'Adventure', icon: '🗺️', group: 'main', tmdbId: 12 },
    animation: { name: 'Animation', icon: '✨', group: 'main', tmdbId: 16 },
    comedy: { name: 'Comedy', icon: '😂', group: 'main', tmdbId: 35 },
    crime: { name: 'Crime', icon: '🔫', group: 'main', tmdbId: 80 },
    documentary: { name: 'Documentary', icon: '📹', group: 'main', tmdbId: 99 },
    drama: { name: 'Drama', icon: '🎭', group: 'main', tmdbId: 18 },
    fantasy: { name: 'Fantasy', icon: '🧙', group: 'main', tmdbId: 14 },
    horror: { name: 'Horror', icon: '👻', group: 'main', tmdbId: 27 },
    mystery: { name: 'Mystery', icon: '🔍', group: 'main', tmdbId: 9648 },
    romance: { name: 'Romance', icon: '❤️', group: 'main', tmdbId: 10749 },
    scifi: { name: 'Sci-Fi', icon: '🚀', group: 'main', tmdbId: 878 },
    thriller: { name: 'Thriller', icon: '😰', group: 'main', tmdbId: 53 },
    war: { name: 'War', icon: '⚔️', group: 'main', tmdbId: 10752 },
    // Sub-genres (searched via TMDB keywords)
    slapstick: { name: 'Slapstick', icon: '🤡', group: 'sub', parent: 'comedy', keyword: 'slapstick' },
    satire: { name: 'Satire', icon: '🎤', group: 'sub', parent: 'comedy', keyword: 'satire' },
    darkcomedy: { name: 'Dark Comedy', icon: '💀', group: 'sub', parent: 'comedy', keyword: 'dark comedy' },
    noir: { name: 'Film Noir', icon: '🌑', group: 'sub', parent: 'thriller', keyword: 'film noir' },
    cyberpunk: { name: 'Cyberpunk', icon: '🤖', group: 'sub', parent: 'scifi', keyword: 'cyberpunk' },
    psychological: { name: 'Psychological', icon: '🧠', group: 'sub', parent: 'horror', keyword: 'psychological thriller' },
    musical: { name: 'Musical', icon: '🎵', group: 'sub', parent: 'drama', tmdbId: 10402 },
    martialarts: { name: 'Martial Arts', icon: '🥋', group: 'sub', parent: 'action', keyword: 'martial arts' },
    western: { name: 'Western', icon: '🤠', group: 'sub', parent: 'adventure', tmdbId: 37 },
    dystopian: { name: 'Dystopian', icon: '🏙️', group: 'sub', parent: 'scifi', keyword: 'dystopia' },
    procedural: { name: 'Procedural', icon: '📋', group: 'sub', parent: 'crime', keyword: 'procedural' }
  },

  // Get main genres (those with TMDB genre IDs for discover API)
  getMainGenres() {
    return Object.entries(this.genres)
      .filter(([, g]) => g.group === 'main')
      .sort((a, b) => a[1].name.localeCompare(b[1].name));
  },

  // Get sub-genres
  getSubGenres() {
    return Object.entries(this.genres)
      .filter(([, g]) => g.group === 'sub')
      .sort((a, b) => a[1].name.localeCompare(b[1].name));
  },

  // Get TMDB genre IDs from active genre weights
  getActiveTmdbGenreIds(genreWeights) {
    const ids = [];
    for (const [key, weight] of Object.entries(genreWeights)) {
      if (weight <= 0) continue;
      const genre = this.genres[key];
      if (genre && genre.tmdbId && !ids.includes(genre.tmdbId)) {
        ids.push(genre.tmdbId);
      }
    }
    return ids;
  },

  // Get keyword search terms from active sub-genres
  getActiveKeywords(genreWeights) {
    const keywords = [];
    for (const [key, weight] of Object.entries(genreWeights)) {
      if (weight <= 0) continue;
      const genre = this.genres[key];
      if (genre && genre.keyword) {
        keywords.push(genre.keyword);
      }
    }
    return keywords;
  },

  // Count active genres
  countActive(genreWeights) {
    return Object.values(genreWeights).filter(w => w > 0).length;
  }
};

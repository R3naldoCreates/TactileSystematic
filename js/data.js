/**
 * Movie Database & Genre Definitions
 * Complete database with Tactile Systematic scores
 */

const MovieData = {
  // 26 Genres: 14 main + 12 sub-genres
  genres: {
    // Main genres
    action: { name: 'Action', icon: '💥', group: 'main' },
    thriller: { name: 'Thriller', icon: '😰', group: 'main' },
    scifi: { name: 'Sci-Fi', icon: '🚀', group: 'main' },
    drama: { name: 'Drama', icon: '🎭', group: 'main' },
    comedy: { name: 'Comedy', icon: '😂', group: 'main' },
    horror: { name: 'Horror', icon: '👻', group: 'main' },
    mystery: { name: 'Mystery', icon: '🔍', group: 'main' },
    romance: { name: 'Romance', icon: '❤️', group: 'main' },
    fantasy: { name: 'Fantasy', icon: '🧙', group: 'main' },
    animation: { name: 'Animation', icon: '✨', group: 'main' },
    documentary: { name: 'Documentary', icon: '📹', group: 'main' },
    war: { name: 'War', icon: '⚔️', group: 'main' },
    crime: { name: 'Crime', icon: '🔫', group: 'main' },
    adventure: { name: 'Adventure', icon: '🗺️', group: 'main' },
    // Sub-genres
    slapstick: { name: 'Slapstick', icon: '🤡', group: 'sub', parent: 'comedy' },
    satire: { name: 'Satire', icon: '🎤', group: 'sub', parent: 'comedy' },
    darkcomedy: { name: 'Dark Comedy', icon: '💀', group: 'sub', parent: 'comedy' },
    noir: { name: 'Film Noir', icon: ' noir', group: 'sub', parent: 'thriller' },
    cyberpunk: { name: 'Cyberpunk', icon: '🤖', group: 'sub', parent: 'scifi' },
    psychological: { name: 'Psychological', icon: '🧠', group: 'sub', parent: 'horror' },
    musical: { name: 'Musical', icon: '🎵', group: 'sub', parent: 'drama' },
    martialarts: { name: 'Martial Arts', icon: '🥋', group: 'sub', parent: 'action' },
    western: { name: 'Western', icon: '🤠', group: 'sub', parent: 'adventure' },
    dystopian: { name: 'Dystopian', icon: '🏙️', group: 'sub', parent: 'scifi' },
    procedural: { name: 'Procedural', icon: '📋', group: 'sub', parent: 'crime' }
  },

  // Pre-scored movies database
  movies: [
    {
      id: 1, title: 'Blade Runner 2049', year: 2017,
      genres: ['scifi', 'thriller', 'drama', 'cyberpunk'],
      poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 8.5, momentumVelocity: 8.0, industrialGrit: 9.5, metaPenalty: 1.0, nihilismCap: 30 }
    },
    {
      id: 2, title: 'Sicario', year: 2015,
      genres: ['thriller', 'crime', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/dvJyLQHn0AcMRMwZI38MXxokzAd.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 9.5, dialogueUtility: 8.0, momentumVelocity: 9.0, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 20 }
    },
    {
      id: 3, title: 'Mad Max: Fury Road', year: 2015,
      genres: ['action', 'scifi', 'adventure', 'dystopian'],
      poster: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 7.5, competencePorn: 9.0, dialogueUtility: 7.0, momentumVelocity: 10, industrialGrit: 9.5, metaPenalty: 1.0, nihilismCap: 15 }
    },
    {
      id: 4, title: 'The Dark Knight', year: 2008,
      genres: ['action', 'thriller', 'crime', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911BTUgMe1nNaD3.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 9.5, dialogueUtility: 9.0, momentumVelocity: 9.5, industrialGrit: 8.0, metaPenalty: 1.0, nihilismCap: 25 }
    },
    {
      id: 5, title: 'No Country for Old Men', year: 2007,
      genres: ['thriller', 'crime', 'drama', 'western'],
      poster: 'https://image.tmdb.org/t/p/w500/8s4h9U9U4aE9gbPcx1S2pImNxFY.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.5, competencePorn: 9.0, dialogueUtility: 9.5, momentumVelocity: 8.5, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 35 }
    },
    {
      id: 6, title: 'Children of Men', year: 2006,
      genres: ['scifi', 'thriller', 'drama', 'dystopian'],
      poster: 'https://image.tmdb.org/t/p/w500/cpk2sDjOHQH1XBPfBYxAJGRgJyB.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.5, competencePorn: 8.0, dialogueUtility: 8.0, momentumVelocity: 9.5, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 30 }
    },
    {
      id: 7, title: 'Arrival', year: 2016,
      genres: ['scifi', 'drama', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.5, competencePorn: 8.5, dialogueUtility: 9.5, momentumVelocity: 8.0, industrialGrit: 7.5, metaPenalty: 1.0, nihilismCap: 25 }
    },
    {
      id: 8, title: 'Heat', year: 1995,
      genres: ['crime', 'action', 'thriller', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/4X7qu6w2ln7C9RMqONK4ajf1rMH.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.0, competencePorn: 9.5, dialogueUtility: 8.5, momentumVelocity: 8.5, industrialGrit: 9.0, metaPenalty: 0.5, nihilismCap: 20 }
    },
    {
      id: 9, title: 'The Revenant', year: 2015,
      genres: ['action', 'drama', 'adventure', 'western'],
      poster: 'https://image.tmdb.org/t/p/w500/nnRZlVPGq7L10fXLXNPpsgMhAnS.jpg',
      scores: { tactileIndex: 10, systematicLogic: 8.0, competencePorn: 9.0, dialogueUtility: 6.5, momentumVelocity: 8.5, industrialGrit: 10, metaPenalty: 0.5, nihilismCap: 20 }
    },
    {
      id: 10, title: 'Parasite', year: 2019,
      genres: ['thriller', 'drama', 'darkcomedy', 'crime'],
      poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.5, competencePorn: 9.0, dialogueUtility: 9.0, momentumVelocity: 9.5, industrialGrit: 8.5, metaPenalty: 1.5, nihilismCap: 30 }
    },
    {
      id: 11, title: 'Dune: Part Two', year: 2024,
      genres: ['scifi', 'action', 'drama', 'adventure'],
      poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nez7S.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 8.5, industrialGrit: 9.0, metaPenalty: 1.0, nihilismCap: 15 }
    },
    {
      id: 12, title: 'The Matrix', year: 1999,
      genres: ['scifi', 'action', 'cyberpunk'],
      poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.0, competencePorn: 9.0, dialogueUtility: 8.0, momentumVelocity: 9.5, industrialGrit: 8.0, metaPenalty: 1.5, nihilismCap: 20 }
    },
    {
      id: 13, title: 'There Will Be Blood', year: 2007,
      genres: ['drama', 'western'],
      poster: 'https://image.tmdb.org/t/p/w500/sPu20FV0Tetn44aH8sNPOqChmG.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.0, competencePorn: 9.5, dialogueUtility: 9.0, momentumVelocity: 7.5, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 35 }
    },
    {
      id: 14, title: 'Whiplash', year: 2014,
      genres: ['drama', 'musical'],
      poster: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 10, dialogueUtility: 9.0, momentumVelocity: 9.5, industrialGrit: 8.0, metaPenalty: 0.5, nihilismCap: 10 }
    },
    {
      id: 15, title: 'The Grand Budapest Hotel', year: 2014,
      genres: ['comedy', 'drama', 'adventure', 'satire'],
      poster: 'https://image.tmdb.org/t/p/w500/eWDyPq3yD5dVkMGBmJMPeubMpmA.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.5, competencePorn: 9.0, dialogueUtility: 9.0, momentumVelocity: 9.0, industrialGrit: 7.5, metaPenalty: 1.5, nihilismCap: 15 }
    },
    {
      id: 16, title: 'Fury', year: 2014,
      genres: ['war', 'action', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/t6mMURuzaqP3qNk59riyfEOBTn4.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 7.5, competencePorn: 8.5, dialogueUtility: 7.5, momentumVelocity: 8.5, industrialGrit: 9.5, metaPenalty: 1.0, nihilismCap: 25 }
    },
    {
      id: 17, title: 'Dredd', year: 2012,
      genres: ['action', 'scifi', 'cyberpunk'],
      poster: 'https://image.tmdb.org/t/p/w500/kP0yQhBHVFpH5SbxUpAy2CCH.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 8.0, competencePorn: 9.0, dialogueUtility: 7.5, momentumVelocity: 9.0, industrialGrit: 9.0, metaPenalty: 1.0, nihilismCap: 15 }
    },
    {
      id: 18, title: 'Prisoners', year: 2013,
      genres: ['thriller', 'crime', 'drama', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/qvK30cMScQtvEMTMX9h7mWkFi9h.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 8.5, momentumVelocity: 8.5, industrialGrit: 9.0, metaPenalty: 0.5, nihilismCap: 35 }
    },
    {
      id: 19, title: 'Drive', year: 2011,
      genres: ['action', 'crime', 'drama', 'noir'],
      poster: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 8.5, dialogueUtility: 8.5, momentumVelocity: 8.0, industrialGrit: 9.0, metaPenalty: 2.0, nihilismCap: 25 }
    },
    {
      id: 20, title: 'Hereditary', year: 2018,
      genres: ['horror', 'drama', 'psychological', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/6M4PtsLq2tBdxfkJOqXYO0SjOwE.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 7.5, industrialGrit: 8.5, metaPenalty: 1.0, nihilismCap: 30 }
    },
    {
      id: 21, title: 'A Quiet Place', year: 2018,
      genres: ['horror', 'scifi', 'thriller'],
      poster: 'https://image.tmdb.org/t/p/w500/nTm6d4f3OytmOZihdjO8Lhl3GjV.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 7.5, competencePorn: 8.5, dialogueUtility: 7.0, momentumVelocity: 9.0, industrialGrit: 8.5, metaPenalty: 0.5, nihilismCap: 10 }
    },
    {
      id: 22, title: 'The Lighthouse', year: 2019,
      genres: ['horror', 'drama', 'psychological', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 7.5, competencePorn: 9.0, dialogueUtility: 7.5, momentumVelocity: 7.0, industrialGrit: 10, metaPenalty: 2.0, nihilismCap: 40 }
    },
    {
      id: 23, title: 'The Witch', year: 2015,
      genres: ['horror', 'drama', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/7f1Ueh0SlYBp5IVkGBAWJw9YnZT.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 7.5, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 25 }
    },
    {
      id: 24, title: 'John Wick', year: 2014,
      genres: ['action', 'thriller', 'crime'],
      poster: 'https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 7.5, competencePorn: 9.5, dialogueUtility: 7.0, momentumVelocity: 9.5, industrialGrit: 8.0, metaPenalty: 1.0, nihilismCap: 5 }
    },
    {
      id: 25, title: 'Nightcrawler', year: 2014,
      genres: ['thriller', 'crime', 'drama', 'noir'],
      poster: 'https://image.tmdb.org/t/p/w500/u8xYFzvV5y7lAXvMmOZfbMFOz7F.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 8.5, competencePorn: 9.0, dialogueUtility: 9.0, momentumVelocity: 9.0, industrialGrit: 9.0, metaPenalty: 1.0, nihilismCap: 30 }
    },
    {
      id: 26, title: 'Ex Machina', year: 2014,
      genres: ['scifi', 'thriller', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/EL4VIMxOn6gUkZGmOHhXtofBJs.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 9.5, competencePorn: 8.5, dialogueUtility: 9.5, momentumVelocity: 8.0, industrialGrit: 7.5, metaPenalty: 1.5, nihilismCap: 20 }
    },
    {
      id: 27, title: 'The Handmaiden', year: 2016,
      genres: ['thriller', 'drama', 'romance', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/9dKCjMry7nmAb8ANeGbPmLkG7Ma.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 9.5, competencePorn: 9.0, dialogueUtility: 8.5, momentumVelocity: 9.0, industrialGrit: 8.5, metaPenalty: 1.0, nihilismCap: 15 }
    },
    {
      id: 28, title: 'Zodiac', year: 2007,
      genres: ['crime', 'thriller', 'drama', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/kP0yQhBHVFpH5SbxUpAy2CCH.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 8.5, momentumVelocity: 7.5, industrialGrit: 9.0, metaPenalty: 0.5, nihilismCap: 25 }
    },
    {
      id: 29, title: 'The Prestige', year: 2006,
      genres: ['thriller', 'drama', 'mystery', 'scifi'],
      poster: 'https://image.tmdb.org/t/p/w500/cbj1KfBOeOY3Xfw1HbCPvCM2znh.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.5, competencePorn: 9.0, dialogueUtility: 9.0, momentumVelocity: 9.0, industrialGrit: 8.0, metaPenalty: 2.0, nihilismCap: 15 }
    },
    {
      id: 30, title: 'Inception', year: 2010,
      genres: ['scifi', 'action', 'thriller'],
      poster: 'https://image.tmdb.org/t/p/w500/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 9.0, dialogueUtility: 8.0, momentumVelocity: 9.0, industrialGrit: 7.5, metaPenalty: 1.5, nihilismCap: 15 }
    },
    {
      id: 31, title: 'Oppenheimer', year: 2023,
      genres: ['drama', 'thriller', 'war'],
      poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.0, competencePorn: 9.0, dialogueUtility: 9.5, momentumVelocity: 8.0, industrialGrit: 8.5, metaPenalty: 1.0, nihilismCap: 25 }
    },
    {
      id: 32, title: 'The Batman', year: 2022,
      genres: ['action', 'crime', 'thriller', 'noir'],
      poster: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 7.5, momentumVelocity: 7.5, industrialGrit: 9.0, metaPenalty: 1.5, nihilismCap: 20 }
    },
    {
      id: 33, title: 'Everything Everywhere All at Once', year: 2022,
      genres: ['action', 'scifi', 'comedy', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 7.5, competencePorn: 9.0, dialogueUtility: 8.5, momentumVelocity: 9.0, industrialGrit: 6.5, metaPenalty: 3.0, nihilismCap: 20 }
    },
    {
      id: 34, title: 'The Big Short', year: 2015,
      genres: ['drama', 'comedy', 'satire'],
      poster: 'https://image.tmdb.org/t/p/w500/vVpEOvxlzXAmRYzCYxLfoN9Le7K.jpg',
      scores: { tactileIndex: 7.5, systematicLogic: 9.0, competencePorn: 9.5, dialogueUtility: 9.0, momentumVelocity: 8.5, industrialGrit: 7.5, metaPenalty: 2.5, nihilismCap: 25 }
    },
    {
      id: 35, title: 'Saving Private Ryan', year: 1998,
      genres: ['war', 'drama', 'action'],
      poster: 'https://image.tmdb.org/t/p/w500/mfLL3bJwJm4iHo0cQsVoVdHDdGH.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.5, competencePorn: 9.0, dialogueUtility: 8.0, momentumVelocity: 9.0, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 15 }
    },
    {
      id: 36, title: 'Django Unchained', year: 2012,
      genres: ['action', 'drama', 'western'],
      poster: 'https://image.tmdb.org/t/p/w500/7oWY8VDz7HPVNy4jjWtzHtAJiFj.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 9.5, momentumVelocity: 9.0, industrialGrit: 8.0, metaPenalty: 2.0, nihilismCap: 10 }
    },
    {
      id: 37, title: 'Interstellar', year: 2014,
      genres: ['scifi', 'drama', 'adventure'],
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 8.5, dialogueUtility: 7.5, momentumVelocity: 8.5, industrialGrit: 8.0, metaPenalty: 1.5, nihilismCap: 20 }
    },
    {
      id: 38, title: 'The Godfather', year: 1972,
      genres: ['crime', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.5, competencePorn: 9.5, dialogueUtility: 9.5, momentumVelocity: 8.0, industrialGrit: 9.0, metaPenalty: 0, nihilismCap: 20 }
    },
    {
      id: 39, title: 'Goodfellas', year: 1990,
      genres: ['crime', 'drama', 'thriller'],
      poster: 'https://image.tmdb.org/t/p/w500/bXdLRhMx9uwWKBDXnpne7gMrEBQ.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 9.0, dialogueUtility: 9.5, momentumVelocity: 9.5, industrialGrit: 9.0, metaPenalty: 0.5, nihilismCap: 20 }
    },
    {
      id: 40, title: 'Se7en', year: 1995,
      genres: ['thriller', 'crime', 'mystery', 'noir'],
      poster: 'https://image.tmdb.org/t/p/w500/6b7QlZB6WFGqXqEGpZIn2fJLlh0.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 9.0, momentumVelocity: 9.0, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 35 }
    },
    {
      id: 41, title: 'The Shining', year: 1980,
      genres: ['horror', 'psychological', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/9j1VIUiI4FpKHFcl1G6VkXkjfBu.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 8.5, industrialGrit: 9.0, metaPenalty: 1.0, nihilismCap: 25 }
    },
    {
      id: 42, title: 'The Thing', year: 1982,
      genres: ['horror', 'scifi', 'thriller'],
      poster: 'https://image.tmdb.org/t/p/w500/fC7SsrR3XQNJmjVncUbvUjLpOvD.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 7.5, momentumVelocity: 9.0, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 20 }
    },
    {
      id: 43, title: 'Blade Runner', year: 1982,
      genres: ['scifi', 'thriller', 'noir', 'cyberpunk'],
      poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.5, competencePorn: 8.0, dialogueUtility: 8.5, momentumVelocity: 7.5, industrialGrit: 9.5, metaPenalty: 1.0, nihilismCap: 30 }
    },
    {
      id: 44, title: 'Alien', year: 1979,
      genres: ['scifi', 'horror', 'thriller'],
      poster: 'https://image.tmdb.org/t/p/w500/2h5T0yO0oYsr4N5gMfFyl3qr7aG.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.5, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 8.5, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 15 }
    },
    {
      id: 45, title: 'Aliens', year: 1986,
      genres: ['scifi', 'action', 'horror', 'thriller'],
      poster: 'https://image.tmdb.org/t/p/w500/nY5mZ1L8UEM5YzMNMCRIclliNN.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 9.0, dialogueUtility: 8.5, momentumVelocity: 9.5, industrialGrit: 8.5, metaPenalty: 1.0, nihilismCap: 10 }
    },
    {
      id: 46, title: 'Apocalypse Now', year: 1979,
      genres: ['war', 'drama', 'action'],
      poster: 'https://image.tmdb.org/t/p/w500/vL10JLs8iR2u7VKv6JNm3OWbJrT.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 8.5, momentumVelocity: 8.5, industrialGrit: 10, metaPenalty: 1.0, nihilismCap: 35 }
    },
    {
      id: 47, title: 'Taxi Driver', year: 1976,
      genres: ['drama', 'crime', 'thriller', 'noir'],
      poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 8.5, competencePorn: 8.5, dialogueUtility: 8.5, momentumVelocity: 8.0, industrialGrit: 9.5, metaPenalty: 1.0, nihilismCap: 35 }
    },
    {
      id: 48, title: 'The Departed', year: 2006,
      genres: ['crime', 'thriller', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/np9aOULbI8UbPJLkDHqRGFJWKMz.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 9.0, competencePorn: 9.0, dialogueUtility: 9.0, momentumVelocity: 9.0, industrialGrit: 8.0, metaPenalty: 1.0, nihilismCap: 20 }
    },
    {
      id: 49, title: 'Uncut Gems', year: 2019,
      genres: ['crime', 'thriller', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/aNrFGFPCbkHHkLQFBCgr7LzL9xL.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 8.5, momentumVelocity: 9.5, industrialGrit: 9.0, metaPenalty: 1.0, nihilismCap: 25 }
    },
    {
      id: 50, title: 'The Lobster', year: 2015,
      genres: ['comedy', 'drama', 'satire', 'psychological'],
      poster: 'https://image.tmdb.org/t/p/w500/8j58iEBwii89MPJuZ6t3kGDs5K6.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 8.5, competencePorn: 8.0, dialogueUtility: 8.0, momentumVelocity: 7.5, industrialGrit: 8.5, metaPenalty: 2.0, nihilismCap: 25 }
    },
    {
      id: 51, title: 'Annihilation', year: 2018,
      genres: ['scifi', 'horror', 'thriller', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/ooijGk46c1gcRKePOiSDDnPMEJZ.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.0, competencePorn: 8.0, dialogueUtility: 7.5, momentumVelocity: 8.0, industrialGrit: 8.5, metaPenalty: 1.5, nihilismCap: 25 }
    },
    {
      id: 52, title: 'Spider-Man: Into the Spider-Verse', year: 2018,
      genres: ['animation', 'action', 'comedy', 'adventure'],
      poster: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 9.0, dialogueUtility: 9.0, momentumVelocity: 9.5, industrialGrit: 7.5, metaPenalty: 1.5, nihilismCap: 5 }
    },
    {
      id: 53, title: 'The French Dispatch', year: 2021,
      genres: ['comedy', 'drama', 'satire'],
      poster: 'https://image.tmdb.org/t/p/w500/jtMDigFQ9TMqSNJx0EVE3NpGMgX.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.0, competencePorn: 9.0, dialogueUtility: 9.0, momentumVelocity: 8.0, industrialGrit: 8.0, metaPenalty: 2.0, nihilismCap: 15 }
    },
    {
      id: 54, title: '1917', year: 2019,
      genres: ['war', 'drama', 'action'],
      poster: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDhRkZUHahFXChJ.jpg',
      scores: { tactileIndex: 10, systematicLogic: 8.0, competencePorn: 9.0, dialogueUtility: 7.0, momentumVelocity: 9.5, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 15 }
    },
    {
      id: 55, title: 'Once Upon a Time in Hollywood', year: 2019,
      genres: ['comedy', 'drama', 'crime'],
      poster: 'https://image.tmdb.org/t/p/w500/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 8.0, industrialGrit: 9.0, metaPenalty: 2.5, nihilismCap: 15 }
    },
    {
      id: 56, title: 'Tenet', year: 2020,
      genres: ['scifi', 'action', 'thriller'],
      poster: 'https://image.tmdb.org/t/p/w500/aCIFMriQsRj2l0g4VkEKcqf1jdO.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 7.5, competencePorn: 9.0, dialogueUtility: 6.5, momentumVelocity: 9.0, industrialGrit: 8.5, metaPenalty: 1.5, nihilismCap: 15 }
    },
    {
      id: 57, title: 'The Social Network', year: 2010,
      genres: ['drama', 'procedural'],
      poster: 'https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRhcMaVnB.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 9.0, competencePorn: 9.0, dialogueUtility: 9.5, momentumVelocity: 9.0, industrialGrit: 7.5, metaPenalty: 1.0, nihilismCap: 20 }
    },
    {
      id: 58, title: 'Knives Out', year: 2019,
      genres: ['comedy', 'mystery', 'crime', 'thriller'],
      poster: 'https://image.tmdb.org/t/p/w500/pThyFovr0x8A9crxKXY9LDZvLKg.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 9.0, momentumVelocity: 9.0, industrialGrit: 7.5, metaPenalty: 1.5, nihilismCap: 10 }
    },
    {
      id: 59, title: 'The Fifth Element', year: 1997,
      genres: ['scifi', 'action', 'comedy', 'adventure'],
      poster: 'https://image.tmdb.org/t/p/w500/fvTZ6SjKctnnpW2JTBW5xKRkNYK.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 7.0, competencePorn: 8.0, dialogueUtility: 7.5, momentumVelocity: 8.5, industrialGrit: 8.0, metaPenalty: 2.0, nihilismCap: 10 }
    },
    {
      id: 60, title: 'Oldboy', year: 2003,
      genres: ['action', 'thriller', 'mystery', 'drama'],
      poster: 'https://image.tmdb.org/t/p/w500/60dhhJ6GiOKWBnWFRvMbEf3eyoN.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.0, competencePorn: 9.0, dialogueUtility: 8.0, momentumVelocity: 9.0, industrialGrit: 9.0, metaPenalty: 1.0, nihilismCap: 30 }
    },
    {
      id: 61, title: 'Incendies', year: 2010,
      genres: ['drama', 'war', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/pB8oMKm4SDX9EGMrjqmfZ9gzOWH.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.5, competencePorn: 8.5, dialogueUtility: 9.0, momentumVelocity: 9.0, industrialGrit: 9.0, metaPenalty: 0.5, nihilismCap: 30 }
    },
    {
      id: 62, title: 'Burning', year: 2018,
      genres: ['drama', 'thriller', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/lrzR8vMUQG2lHW7dpJfu3l2ScS0.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 8.5, momentumVelocity: 8.0, industrialGrit: 9.0, metaPenalty: 0.5, nihilismCap: 30 }
    },
    {
      id: 63, title: 'Snowpiercer', year: 2013,
      genres: ['scifi', 'action', 'dystopian'],
      poster: 'https://image.tmdb.org/t/p/w500/ykVKbZMzpRWu20kKzJPjKoRHC6H.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 7.5, competencePorn: 8.0, dialogueUtility: 7.5, momentumVelocity: 8.5, industrialGrit: 9.0, metaPenalty: 1.5, nihilismCap: 25 }
    },
    {
      id: 64, title: 'The Truman Show', year: 1998,
      genres: ['comedy', 'drama', 'satire'],
      poster: 'https://image.tmdb.org/t/p/w500/adOzdW9TY26sIu8gOluXskVKIPb.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 8.5, competencePorn: 8.0, dialogueUtility: 9.0, momentumVelocity: 8.5, industrialGrit: 7.5, metaPenalty: 1.0, nihilismCap: 15 }
    },
    {
      id: 65, title: 'Spirited Away', year: 2001,
      genres: ['animation', 'fantasy', 'adventure'],
      poster: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBmVYjh.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.5, competencePorn: 9.0, dialogueUtility: 8.0, momentumVelocity: 9.0, industrialGrit: 8.5, metaPenalty: 0.5, nihilismCap: 10 }
    },
    {
      id: 66, title: 'Grave of the Fireflies', year: 1988,
      genres: ['animation', 'drama', 'war'],
      poster: 'https://image.tmdb.org/t/p/w500/aoVXfGFJYQeqjuKSI7aXPz2yhAX.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 8.0, industrialGrit: 9.0, metaPenalty: 0, nihilismCap: 30 }
    },
    {
      id: 67, title: 'Your Name', year: 2016,
      genres: ['animation', 'romance', 'drama', 'fantasy'],
      poster: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgRORxdQJ.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 9.0, industrialGrit: 7.5, metaPenalty: 1.0, nihilismCap: 10 }
    },
    {
      id: 68, title: 'Akira', year: 1988,
      genres: ['animation', 'scifi', 'action', 'cyberpunk'],
      poster: 'https://image.tmdb.org/t/p/w500/5h5rM6qFfJCaNAGxFcKYqGmB7BO.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.0, competencePorn: 9.0, dialogueUtility: 7.5, momentumVelocity: 9.0, industrialGrit: 9.0, metaPenalty: 1.0, nihilismCap: 15 }
    },
    {
      id: 69, title: 'Perfect Blue', year: 1997,
      genres: ['animation', 'thriller', 'psychological', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/wMWFnRsBjtKDdKhUPQkPchYHkpF.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 9.0, dialogueUtility: 8.5, momentumVelocity: 9.0, industrialGrit: 8.0, metaPenalty: 0.5, nihilismCap: 20 }
    },
    {
      id: 70, title: 'WALL-E', year: 2008,
      genres: ['animation', 'scifi', 'romance'],
      poster: 'https://image.tmdb.org/t/p/w500/gt5Ma5TFnqjApokmFCxaG3t3KFE.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.5, competencePorn: 9.0, dialogueUtility: 8.0, momentumVelocity: 8.5, industrialGrit: 8.5, metaPenalty: 0.5, nihilismCap: 15 }
    },
    {
      id: 71, title: 'Logan', year: 2017,
      genres: ['action', 'drama', 'scifi'],
      poster: 'https://image.tmdb.org/t/p/w500/4ssKg5MEOyfWjP2iQFIWEIw1hKF.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 8.5, industrialGrit: 9.0, metaPenalty: 1.0, nihilismCap: 20 }
    },
    {
      id: 72, title: 'Moonlight', year: 2016,
      genres: ['drama', 'romance'],
      poster: 'https://image.tmdb.org/t/p/w500/aSeE2F7mMRqWenVexsX4A47dLOn.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 8.5, momentumVelocity: 8.0, industrialGrit: 8.0, metaPenalty: 0.5, nihilismCap: 15 }
    },
    {
      id: 73, title: 'Spotlight', year: 2015,
      genres: ['drama', 'procedural'],
      poster: 'https://image.tmdb.org/t/p/w500/ld7YB9vBRp1GM1DT3KmFWSmtBPB.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 9.5, competencePorn: 9.5, dialogueUtility: 9.0, momentumVelocity: 8.5, industrialGrit: 8.0, metaPenalty: 0.5, nihilismCap: 20 }
    },
    {
      id: 74, title: 'Sicario: Day of the Soldado', year: 2018,
      genres: ['action', 'thriller', 'crime'],
      poster: 'https://image.tmdb.org/t/p/w500/nl5fCqUWOuOGTqE2Kmfq3WLGKLR.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 7.5, competencePorn: 8.5, dialogueUtility: 7.0, momentumVelocity: 8.5, industrialGrit: 9.0, metaPenalty: 1.5, nihilismCap: 25 }
    },
    {
      id: 75, title: 'The Assassination of Jesse James', year: 2007,
      genres: ['western', 'drama', 'crime'],
      poster: 'https://image.tmdb.org/t/p/w500/uEWrapperDGIdbnYPbMsvIrrkjVQ.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 9.0, momentumVelocity: 7.5, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 30 }
    },
    {
      id: 76, title: 'The Master', year: 2012,
      genres: ['drama', 'psychological'],
      poster: 'https://image.tmdb.org/t/p/w500/eExnxr9fAhAUiUa6Sx4F2IMzBDF.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.0, competencePorn: 9.0, dialogueUtility: 8.5, momentumVelocity: 7.5, industrialGrit: 8.5, metaPenalty: 1.5, nihilismCap: 25 }
    },
    {
      id: 77, title: 'Ghost in the Shell', year: 1995,
      genres: ['animation', 'scifi', 'action', 'cyberpunk'],
      poster: 'https://image.tmdb.org/t/p/w500/6oH3DpyGNLEjgA2EjO7YhBuDM68.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 8.5, industrialGrit: 8.5, metaPenalty: 1.0, nihilismCap: 20 }
    },
    {
      id: 78, title: 'Hell or High Water', year: 2016,
      genres: ['crime', 'thriller', 'drama', 'western'],
      poster: 'https://image.tmdb.org/t/p/w500/5LpBPJq0pVYJVtexKmNElqUBHDz.jpg',
      scores: { tactileIndex: 8.5, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 9.5, momentumVelocity: 8.5, industrialGrit: 9.0, metaPenalty: 0.5, nihilismCap: 20 }
    },
    {
      id: 79, title: 'Wind River', year: 2017,
      genres: ['crime', 'thriller', 'drama', 'western'],
      poster: 'https://image.tmdb.org/t/p/w500/6uFTeE1igZ5nNdKqGpN3kYBJUBc.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 8.5, dialogueUtility: 9.0, momentumVelocity: 8.0, industrialGrit: 9.5, metaPenalty: 0.5, nihilismCap: 25 }
    },
    {
      id: 80, title: 'First Reformed', year: 2017,
      genres: ['drama', 'thriller', 'psychological'],
      poster: 'https://image.tmdb.org/t/p/w500/8ZGPi5Oed5WfpW9KCFoIDcZfvzH.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 9.0, competencePorn: 8.5, dialogueUtility: 9.0, momentumVelocity: 7.5, industrialGrit: 8.0, metaPenalty: 1.0, nihilismCap: 35 }
    },
    {
      id: 81, title: 'The Florida Project', year: 2017,
      genres: ['drama'],
      poster: 'https://image.tmdb.org/t/p/w500/wLwYRvNY9H1KSfLpusTQ2MVwFDG.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.5, competencePorn: 8.0, dialogueUtility: 7.5, momentumVelocity: 8.0, industrialGrit: 9.0, metaPenalty: 0.5, nihilismCap: 30 }
    },
    {
      id: 82, title: 'Columbus', year: 2017,
      genres: ['drama', 'romance'],
      poster: 'https://image.tmdb.org/t/p/w500/lVzfVdQofxilaswb2TXvHOKLmv.jpg',
      scores: { tactileIndex: 9.5, systematicLogic: 8.5, competencePorn: 8.0, dialogueUtility: 8.5, momentumVelocity: 7.5, industrialGrit: 8.5, metaPenalty: 0.5, nihilismCap: 15 }
    },
    {
      id: 83, title: 'Upgrade', year: 2018,
      genres: ['scifi', 'action', 'cyberpunk'],
      poster: 'https://image.tmdb.org/t/p/w500/sR0spPbQF5wgiP1MXMjRfhuBAdG.jpg',
      scores: { tactileIndex: 8.0, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 7.5, momentumVelocity: 8.5, industrialGrit: 7.5, metaPenalty: 1.0, nihilismCap: 10 }
    },
    {
      id: 84, title: 'Coherence', year: 2013,
      genres: ['scifi', 'thriller', 'mystery'],
      poster: 'https://image.tmdb.org/t/p/w500/n1jCOg3x4rgAMfFTXIxwP4udMt0.jpg',
      scores: { tactileIndex: 7.0, systematicLogic: 9.0, competencePorn: 8.0, dialogueUtility: 8.5, momentumVelocity: 8.5, industrialGrit: 7.0, metaPenalty: 0.5, nihilismCap: 15 }
    },
    {
      id: 85, title: 'The Wailing', year: 2016,
      genres: ['horror', 'mystery', 'drama', 'psychological'],
      poster: 'https://image.tmdb.org/t/p/w500/dL6yRFGTXL3eNML5U3SfIGu9Vqu.jpg',
      scores: { tactileIndex: 9.0, systematicLogic: 8.0, competencePorn: 8.5, dialogueUtility: 8.0, momentumVelocity: 8.5, industrialGrit: 9.0, metaPenalty: 0.5, nihilismCap: 25 }
    }
  ],

  /**
   * Search movies by title
   */
  searchMovies(query) {
    if (!query) return this.movies;
    const q = query.toLowerCase();
    return this.movies.filter(m => 
      m.title.toLowerCase().includes(q) || 
      m.year.toString().includes(q) ||
      m.genres.some(g => g.toLowerCase().includes(q))
    );
  },

  /**
   * Get movie by ID
   */
  getMovieById(id) {
    return this.movies.find(m => m.id === id);
  },

  /**
   * Get movies filtered by genres and year range
   */
  filterMovies({ genres = [], yearMin = 1920, yearMax = 2026, excludeOffGenres = true, genreWeights = {} }) {
    return this.movies.filter(movie => {
      // Year filter
      if (movie.year < yearMin || movie.year > yearMax) return false;
      
      // Genre filter - if excludeOffGenres is true, exclude movies that ONLY have OFF genres
      if (excludeOffGenres && Object.keys(genreWeights).length > 0) {
        const movieHasActiveGenre = movie.genres.some(g => {
          return genreWeights[g] === undefined || genreWeights[g] > 0;
        });
        if (!movieHasActiveGenre) return false;
      }
      
      return true;
    });
  },

  /**
   * Get next available ID for user-added movies
   */
  getNextId() {
    const maxId = Math.max(...this.movies.map(m => m.id), 0);
    return maxId + 1;
  }
};

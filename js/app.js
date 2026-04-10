/**
 * Tactile Systematic Movie Recommendation Engine
 * Main Application Logic
 */

const App = {
  // State
  state: {
    activeTab: 'discover',
    userMovies: [],
    likedMovieIds: [],
    genreWeights: {},
    yearRange: { min: 1920, max: 2026 },
    tmdbKey: '',
    searchQuery: '',
    selectedMovie: null,
    calculatorScores: {
      tactileIndex: 7, systematicLogic: 7, competencePorn: 7,
      dialogueUtility: 7, momentumVelocity: 7, industrialGrit: 7,
      metaPenalty: 0, nihilismCap: 0
    }
  },

  // Chart instances
  charts: {},

  // Initialize
  init() {
    this.loadState();
    this.bindEvents();
    this.renderGenreSliders();
    this.renderDiscoverTab();
    this.renderMyMoviesTab();
    this.renderTasteTab();
    this.renderCalculator();
    this.switchTab('discover');
    console.log('Tactile Systematic Engine initialized');
  },

  // ─── State Persistence ─────────────────────────────────────
  
  loadState() {
    try {
      const saved = localStorage.getItem('tsr_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state.userMovies = parsed.userMovies || [];
        this.state.likedMovieIds = parsed.likedMovieIds || [];
        this.state.genreWeights = parsed.genreWeights || this.getDefaultGenreWeights();
        this.state.yearRange = parsed.yearRange || { min: 1920, max: 2026 };
        this.state.tmdbKey = parsed.tmdbKey || '';
      } else {
        this.state.genreWeights = this.getDefaultGenreWeights();
      }
    } catch (e) {
      console.error('Failed to load state:', e);
      this.state.genreWeights = this.getDefaultGenreWeights();
    }
  },

  saveState() {
    try {
      localStorage.setItem('tsr_state', JSON.stringify({
        userMovies: this.state.userMovies,
        likedMovieIds: this.state.likedMovieIds,
        genreWeights: this.state.genreWeights,
        yearRange: this.state.yearRange,
        tmdbKey: this.state.tmdbKey
      }));
    } catch (e) {
      console.error('Failed to save state:', e);
    }
  },

  getDefaultGenreWeights() {
    const weights = {};
    for (const [key, genre] of Object.entries(MovieData.genres)) {
      weights[key] = genre.group === 'main' ? 5 : 3;
    }
    return weights;
  },

  // ─── Event Binding ─────────────────────────────────────────

  bindEvents() {
    // Tab buttons
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
    });
    
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value;
        this.renderDiscoverTab();
      });
    }

    // TMDB search
    const tmdbBtn = document.getElementById('tmdb-search-btn');
    if (tmdbBtn) {
      tmdbBtn.addEventListener('click', () => this.searchTMDB());
    }
    const tmdbInput = document.getElementById('tmdb-search-input');
    if (tmdbInput) {
      tmdbInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.searchTMDB();
      });
    }

    // Add movie button
    const addMovieBtn = document.getElementById('add-movie-btn');
    if (addMovieBtn) {
      addMovieBtn.addEventListener('click', () => this.showAddMovieModal());
    }

    // Year range
    const yearMin = document.getElementById('year-min');
    const yearMax = document.getElementById('year-max');
    if (yearMin) {
      yearMin.addEventListener('input', (e) => {
        this.state.yearRange.min = parseInt(e.target.value);
        if (this.state.yearRange.min > this.state.yearRange.max) {
          this.state.yearRange.min = this.state.yearRange.max;
          e.target.value = this.state.yearRange.min;
        }
        document.getElementById('year-min-label').textContent = this.state.yearRange.min;
        this.saveState();
        this.renderDiscoverTab();
        this.updateYearRangeDisplay();
      });
    }
    if (yearMax) {
      yearMax.addEventListener('input', (e) => {
        this.state.yearRange.max = parseInt(e.target.value);
        if (this.state.yearRange.max < this.state.yearRange.min) {
          this.state.yearRange.max = this.state.yearRange.min;
          e.target.value = this.state.yearRange.max;
        }
        document.getElementById('year-max-label').textContent = this.state.yearRange.max;
        this.saveState();
        this.renderDiscoverTab();
        this.updateYearRangeDisplay();
      });
    }
  },

  // ─── Tab Navigation ────────────────────────────────────────

  switchTab(tabName) {
    this.state.activeTab = tabName;
    
    // Hide all tabs
    document.querySelectorAll('.tab-panel').forEach(p => {
      p.classList.add('hidden');
    });
    
    // Show selected tab
    const panel = document.getElementById(`tab-${tabName}`);
    if (panel) panel.classList.remove('hidden');
    
    // Update tab buttons
    document.querySelectorAll('[data-tab]').forEach(btn => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle('tab-active', isActive);
      btn.classList.toggle('tab-inactive', !isActive);
    });

    // Re-render charts when switching to taste tab
    if (tabName === 'taste') {
      setTimeout(() => {
        this.renderTasteRadar();
        this.renderTasteBarChart();
      }, 100);
    }
  },

  // ─── Genre Sliders ─────────────────────────────────────────

  renderGenreSliders() {
    const container = document.getElementById('genre-sliders-container');
    if (!container) return;

    let html = '';
    let currentGroup = '';

    for (const [key, genre] of Object.entries(MovieData.genres)) {
      if (genre.group !== currentGroup) {
        if (currentGroup) html += '</div>';
        currentGroup = genre.group;
        const groupLabel = genre.group === 'main' ? 'Main Genres' : 'Sub-Genres';
        html += `<div class="mb-4"><h3 class="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">${groupLabel}</h3>`;
      }

      const weight = this.state.genreWeights[key] ?? (genre.group === 'main' ? 5 : 3);
      const isOff = weight === 0;
      
      html += `
        <div class="genre-slider-row ${isOff ? 'genre-off' : ''}" data-genre="${key}">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-2">
              <span>${genre.icon}</span>
              <span class="text-sm font-medium ${isOff ? 'text-zinc-500 line-through' : 'text-zinc-200'}">${genre.name}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs ${isOff ? 'text-red-400' : 'text-zinc-400'} font-mono w-6 text-right" id="genre-val-${key}">${isOff ? 'OFF' : weight}</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only genre-switch" data-genre="${key}" ${!isOff ? 'checked' : ''}>
                <div class="w-9 h-5 rounded-full transition-colors ${isOff ? 'bg-zinc-600' : 'bg-emerald-500'} genre-toggle" id="genre-toggle-${key}"></div>
              </label>
            </div>
          </div>
          <input type="range" min="0" max="10" step="1" value="${weight}" 
                 class="genre-range w-full h-1.5 rounded-lg appearance-none cursor-pointer ${isOff ? 'opacity-30' : ''}"
                 id="genre-range-${key}" data-genre="${key}">
        </div>`;
    }

    if (currentGroup) html += '</div>';
    container.innerHTML = html;

    // Bind events
    container.querySelectorAll('.genre-switch').forEach(sw => {
      sw.addEventListener('change', (e) => {
        const genre = e.target.dataset.genre;
        const isOn = e.target.checked;
        this.state.genreWeights[genre] = isOn ? 5 : 0;
        this.saveState();
        this.renderGenreSliders();
        this.renderDiscoverTab();
      });
    });

    container.querySelectorAll('.genre-range').forEach(range => {
      range.addEventListener('input', (e) => {
        const genre = e.target.dataset.genre;
        const val = parseInt(e.target.value);
        this.state.genreWeights[genre] = val;
        
        const valEl = document.getElementById(`genre-val-${genre}`);
        const toggleEl = document.getElementById(`genre-toggle-${genre}`);
        const rowEl = e.target.closest('.genre-slider-row');
        
        if (val === 0) {
          valEl.textContent = 'OFF';
          valEl.className = 'text-xs text-red-400 font-mono w-6 text-right';
          toggleEl.className = 'w-9 h-5 rounded-full transition-colors bg-zinc-600 genre-toggle';
          rowEl.classList.add('genre-off');
          e.target.classList.add('opacity-30');
          rowEl.querySelector('.genre-switch').checked = false;
        } else {
          valEl.textContent = val;
          valEl.className = 'text-xs text-zinc-400 font-mono w-6 text-right';
          toggleEl.className = 'w-9 h-5 rounded-full transition-colors bg-emerald-500 genre-toggle';
          rowEl.classList.remove('genre-off');
          e.target.classList.remove('opacity-30');
          rowEl.querySelector('.genre-switch').checked = true;
        }
        
        this.saveState();
        this.renderDiscoverTab();
      });
    });
  },

  // ─── Discover Tab ──────────────────────────────────────────

  renderDiscoverTab() {
    const container = document.getElementById('discover-grid');
    if (!container) return;

    let movies = MovieData.movies;

    // Apply year filter
    movies = movies.filter(m => m.year >= this.state.yearRange.min && m.year <= this.state.yearRange.max);

    // Apply search filter
    if (this.state.searchQuery) {
      const q = this.state.searchQuery.toLowerCase();
      movies = movies.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.year.toString().includes(q) ||
        m.genres.some(g => g.toLowerCase().includes(q) || (MovieData.genres[g] && MovieData.genres[g].name.toLowerCase().includes(q)))
      );
    }

    // Sort by calculated score
    movies = movies.map(m => ({
      ...m,
      finalScore: ScoringEngine.calculateFinalScore(m.scores).final
    })).sort((a, b) => b.finalScore - a.finalScore);

    // Mark liked
    movies = movies.map(m => ({
      ...m,
      isLiked: this.state.likedMovieIds.includes(m.id)
    }));

    if (movies.length === 0) {
      container.innerHTML = `
        <div class="col-span-full text-center py-16 text-zinc-400">
          <div class="text-4xl mb-4">🎬</div>
          <p class="text-lg font-medium">No movies match your filters</p>
          <p class="text-sm mt-2">Try adjusting the year range or search query</p>
        </div>`;
      return;
    }

    container.innerHTML = movies.map(movie => {
      const tier = ScoringEngine.getScoreTier(movie.finalScore);
      const genreTags = movie.genres.map(g => {
        const gd = MovieData.genres[g];
        return gd ? `<span class="inline-block px-1.5 py-0.5 text-xs rounded bg-zinc-700/60 text-zinc-300">${gd.icon} ${gd.name}</span>` : '';
      }).join('');

      return `
        <div class="movie-card group cursor-pointer" onclick="App.showMovieDetail(${movie.id})">
          <div class="relative overflow-hidden rounded-t-xl">
            <div class="movie-poster-container">
              <img src="${movie.poster}" alt="${movie.title}" 
                   class="movie-poster w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
              <div class="movie-poster-fallback hidden items-center justify-center w-full h-64 bg-gradient-to-br from-zinc-800 to-zinc-900">
                <span class="text-4xl text-zinc-500">🎬</span>
              </div>
            </div>
            <div class="absolute top-2 right-2 flex gap-1">
              <span class="px-2 py-1 rounded-lg text-xs font-bold" style="background:${tier.color}20; color:${tier.color}; border:1px solid ${tier.color}40">
                ${movie.finalScore}
              </span>
            </div>
            <div class="absolute top-2 left-2">
              <button onclick="event.stopPropagation(); App.toggleLike(${movie.id})" 
                      class="like-btn w-8 h-8 rounded-full flex items-center justify-center transition-all ${movie.isLiked ? 'bg-red-500/80 text-white' : 'bg-black/40 text-white/60 hover:bg-red-500/60 hover:text-white'}">
                ${movie.isLiked ? '♥' : '♡'}
              </button>
            </div>
          </div>
          <div class="p-3 bg-zinc-800/60 rounded-b-xl">
            <h3 class="text-sm font-semibold text-zinc-100 truncate">${movie.title}</h3>
            <p class="text-xs text-zinc-400 mt-0.5">${movie.year} · ${tier.label}</p>
            <div class="mt-2 flex flex-wrap gap-1">${genreTags}</div>
          </div>
        </div>`;
    }).join('');
  },

  // ─── Movie Detail Modal ────────────────────────────────────

  showMovieDetail(movieId) {
    const movie = MovieData.getMovieById(movieId) || this.state.userMovies.find(m => m.id === movieId);
    if (!movie) return;

    const result = ScoringEngine.calculateFinalScore(movie.scores);
    const tier = ScoringEngine.getScoreTier(result.final);
    const isLiked = this.state.likedMovieIds.includes(movie.id);

    const modal = document.getElementById('movie-detail-modal');
    const content = document.getElementById('movie-detail-content');

    const dims = Object.entries(ScoringEngine.dimensions);
    const dimBars = dims.map(([key, dim]) => {
      const val = movie.scores[key] || 0;
      return `
        <div class="flex items-center gap-3">
          <span class="text-xs text-zinc-400 w-24 text-right shrink-0">${dim.shortName}</span>
          <div class="flex-1 h-2.5 bg-zinc-700 rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all duration-700" style="width:${val*10}%; background:${dim.color}"></div>
          </div>
          <span class="text-xs font-mono text-zinc-300 w-8">${val}</span>
        </div>`;
    }).join('');

    const specialBars = Object.entries(ScoringEngine.specialDimensions).map(([key, dim]) => {
      const val = movie.scores[key] || 0;
      const max = dim.max;
      return `
        <div class="flex items-center gap-3">
          <span class="text-xs text-zinc-400 w-24 text-right shrink-0">${dim.shortName}</span>
          <div class="flex-1 h-2.5 bg-zinc-700 rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all duration-700" style="width:${(val/max)*100}%; background:${dim.color}"></div>
          </div>
          <span class="text-xs font-mono text-zinc-300 w-8">${val}</span>
        </div>`;
    }).join('');

    content.innerHTML = `
      <div class="flex flex-col md:flex-row gap-6">
        <div class="shrink-0">
          <img src="${movie.poster}" alt="${movie.title}" class="w-48 h-72 object-cover rounded-xl shadow-2xl"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="hidden items-center justify-center w-48 h-72 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl">
            <span class="text-5xl">🎬</span>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-2xl font-bold text-white">${movie.title}</h2>
              <p class="text-zinc-400 mt-1">${movie.year} · ${tier.label}</p>
            </div>
            <button onclick="App.toggleLike(${movie.id}); App.showMovieDetail(${movie.id});" 
                    class="text-2xl ${isLiked ? 'text-red-500' : 'text-zinc-500 hover:text-red-400'} transition-colors">
              ${isLiked ? '♥' : '♡'}
            </button>
          </div>
          
          <div class="mt-4 flex items-center gap-3">
            <div class="text-5xl font-black" style="color:${tier.color}">${result.final}</div>
            <div class="text-xs text-zinc-500">
              <div>Raw: ${result.raw}</div>
              <div>After Meta: ${result.metaAdjusted}</div>
              <div>After Nihilism: ${result.nihilismCapped}</div>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-1.5">
            ${movie.genres.map(g => {
              const gd = MovieData.genres[g];
              return gd ? `<span class="px-2 py-1 text-xs rounded-lg bg-zinc-700/80 text-zinc-300">${gd.icon} ${gd.name}</span>` : '';
            }).join('')}
          </div>

          <div class="mt-5 space-y-2">
            <h3 class="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Score Dimensions</h3>
            ${dimBars}
          </div>

          <div class="mt-4 space-y-2">
            <h3 class="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Modifiers</h3>
            ${specialBars}
          </div>
        </div>
      </div>`;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  closeModal() {
    const modal = document.getElementById('movie-detail-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  },

  // ─── My Movies Tab ─────────────────────────────────────────

  renderMyMoviesTab() {
    this.renderLikedGallery();
    this.renderUserMoviesList();
  },

  renderLikedGallery() {
    const container = document.getElementById('liked-gallery');
    if (!container) return;

    const likedMovies = MovieData.movies
      .filter(m => this.state.likedMovieIds.includes(m.id))
      .map(m => ({ ...m, finalScore: ScoringEngine.calculateFinalScore(m.scores).final }))
      .sort((a, b) => b.finalScore - a.finalScore);

    if (likedMovies.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-zinc-500">
          <p class="text-sm">No liked movies yet. Heart movies from the Discover tab!</p>
        </div>`;
      return;
    }

    container.innerHTML = likedMovies.map(movie => {
      const tier = ScoringEngine.getScoreTier(movie.finalScore);
      return `
        <div class="liked-card cursor-pointer" onclick="App.showMovieDetail(${movie.id})">
          <img src="${movie.poster}" alt="${movie.title}" class="liked-poster w-full h-36 object-cover rounded-lg"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="hidden items-center justify-center w-full h-36 bg-zinc-700 rounded-lg">
            <span class="text-2xl text-zinc-500">🎬</span>
          </div>
          <p class="text-xs font-medium text-zinc-300 mt-1.5 truncate">${movie.title}</p>
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono" style="color:${tier.color}">${movie.finalScore}</span>
            <span class="text-xs text-zinc-500">${movie.year}</span>
          </div>
        </div>`;
    }).join('');
  },

  renderUserMoviesList() {
    const container = document.getElementById('user-movies-list');
    if (!container) return;

    if (this.state.userMovies.length === 0) {
      container.innerHTML = `
        <div class="text-center py-8 text-zinc-500">
          <p class="text-sm">No custom movies added yet. Click "Add Movie" to score your own!</p>
        </div>`;
      return;
    }

    container.innerHTML = this.state.userMovies.map(movie => {
      const result = ScoringEngine.calculateFinalScore(movie.scores);
      const tier = ScoringEngine.getScoreTier(result.final);
      return `
        <div class="user-movie-row flex items-center gap-4 p-3 bg-zinc-800/40 rounded-xl hover:bg-zinc-800/60 transition-colors cursor-pointer"
             onclick="App.showMovieDetail(${movie.id})">
          <div class="text-2xl font-black w-12 text-center shrink-0" style="color:${tier.color}">${result.final}</div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-zinc-200 truncate">${movie.title}</h4>
            <p class="text-xs text-zinc-400">${movie.year} · ${movie.genres.map(g => MovieData.genres[g]?.name || g).join(', ')}</p>
          </div>
          <button onclick="event.stopPropagation(); App.deleteUserMovie(${movie.id})" 
                  class="text-xs text-zinc-500 hover:text-red-400 px-2 py-1 rounded-lg hover:bg-red-500/10 transition-all">
            ✕
          </button>
        </div>`;
    }).join('');
  },

  // ─── Add Movie ─────────────────────────────────────────────

  showAddMovieModal() {
    const modal = document.getElementById('add-movie-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    this.updateAddMoviePreview();
  },

  closeAddMovieModal() {
    const modal = document.getElementById('add-movie-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  },

  updateAddMoviePreview() {
    const scores = {};
    document.querySelectorAll('#add-movie-modal .score-input').forEach(input => {
      scores[input.dataset.dim] = parseFloat(input.value) || 0;
    });
    
    const result = ScoringEngine.calculateFinalScore(scores);
    const tier = ScoringEngine.getScoreTier(result.final);
    
    const previewEl = document.getElementById('add-movie-preview');
    if (previewEl) {
      previewEl.innerHTML = `
        <div class="text-center">
          <div class="text-4xl font-black" style="color:${tier.color}">${result.final}</div>
          <div class="text-xs mt-1" style="color:${tier.color}">${tier.label}</div>
          <div class="text-xs text-zinc-500 mt-1">Raw: ${result.raw} → ${result.metaAdjusted} → ${result.nihilismCapped}</div>
        </div>`;
    }
  },

  saveUserMovie() {
    const title = document.getElementById('add-movie-title')?.value.trim();
    const year = parseInt(document.getElementById('add-movie-year')?.value) || 2024;
    
    if (!title) {
      alert('Please enter a movie title');
      return;
    }

    const scores = {};
    document.querySelectorAll('#add-movie-modal .score-input').forEach(input => {
      scores[input.dataset.dim] = parseFloat(input.value) || 0;
    });

    // Collect selected genres
    const genres = [];
    document.querySelectorAll('#add-movie-genres input[type=checkbox]:checked').forEach(cb => {
      genres.push(cb.value);
    });

    const movie = {
      id: MovieData.getNextId(),
      title,
      year,
      genres,
      poster: '',
      scores,
      isCustom: true
    };

    this.state.userMovies.push(movie);
    // Also add to main data for discover tab
    MovieData.movies.push(movie);
    this.saveState();
    this.closeAddMovieModal();
    this.renderDiscoverTab();
    this.renderMyMoviesTab();
    this.renderTasteTab();
  },

  deleteUserMovie(id) {
    if (!confirm('Remove this movie?')) return;
    this.state.userMovies = this.state.userMovies.filter(m => m.id !== id);
    MovieData.movies = MovieData.movies.filter(m => m.id !== id);
    this.state.likedMovieIds = this.state.likedMovieIds.filter(i => i !== id);
    this.saveState();
    this.renderDiscoverTab();
    this.renderMyMoviesTab();
    this.renderTasteTab();
  },

  // ─── Like/Unlike ───────────────────────────────────────────

  toggleLike(movieId) {
    const idx = this.state.likedMovieIds.indexOf(movieId);
    if (idx === -1) {
      this.state.likedMovieIds.push(movieId);
    } else {
      this.state.likedMovieIds.splice(idx, 1);
    }
    this.saveState();
    this.renderDiscoverTab();
    this.renderMyMoviesTab();
    this.renderTasteTab();
  },

  // ─── TMDB Search ───────────────────────────────────────────

  async searchTMDB() {
    const query = document.getElementById('tmdb-search-input')?.value.trim();
    if (!query) return;

    if (!this.state.tmdbKey) {
      // Show API key prompt
      const key = prompt('Enter your TMDB API key (free at themoviedb.org):\n\nThis is saved in your browser only.');
      if (key) {
        this.state.tmdbKey = key;
        this.saveState();
      } else {
        return;
      }
    }

    const resultsContainer = document.getElementById('tmdb-results');
    resultsContainer.innerHTML = '<div class="text-center py-8 text-zinc-500"><div class="animate-spin text-2xl">⏳</div><p class="text-sm mt-2">Searching...</p></div>';

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.state.tmdbKey}&query=${encodeURIComponent(query)}&page=1`);
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        resultsContainer.innerHTML = '<p class="text-center py-8 text-zinc-500">No results found</p>';
        return;
      }

      resultsContainer.innerHTML = data.results.slice(0, 10).map(m => `
        <div class="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-700/50 transition-colors cursor-pointer"
             onclick="App.addTMDBMovie(${m.id})">
          ${m.poster_path 
            ? `<img src="https://image.tmdb.org/t/p/w92${m.poster_path}" class="w-12 h-18 object-cover rounded" alt="">` 
            : '<div class="w-12 h-18 bg-zinc-700 rounded flex items-center justify-center text-zinc-500">🎬</div>'}
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-zinc-200 truncate">${m.title}</p>
            <p class="text-xs text-zinc-400">${m.release_date ? m.release_date.substring(0,4) : 'Unknown'} · ${m.vote_average ? m.vote_average.toFixed(1) : 'N/A'}★</p>
          </div>
          <span class="text-xs text-emerald-400">+ Add</span>
        </div>`).join('');
    } catch (err) {
      resultsContainer.innerHTML = `<p class="text-center py-8 text-red-400 text-sm">Search failed: ${err.message}</p>`;
    }
  },

  async addTMDBMovie(tmdbId) {
    if (!this.state.tmdbKey) return;
    
    try {
      // Fetch movie details from TMDB
      const res = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${this.state.tmdbKey}`);
      const data = await res.json();

      // Map TMDB genres to our genre system
      const tmdbGenreMap = {
        28: 'action', 12: 'adventure', 16: 'animation', 35: 'comedy',
        80: 'crime', 99: 'documentary', 18: 'drama', 10751: 'family',
        14: 'fantasy', 36: 'history', 27: 'horror', 10402: 'musical',
        9648: 'mystery', 10749: 'romance', 878: 'scifi', 10770: 'tv_movie',
        53: 'thriller', 10752: 'war', 37: 'western'
      };

      const genres = (data.genres || [])
        .map(g => tmdbGenreMap[g.id])
        .filter(Boolean);

      // Check if already exists
      const existing = MovieData.movies.find(m => m.title.toLowerCase() === data.title.toLowerCase());
      if (existing) {
        this.showMovieDetail(existing.id);
        return;
      }

      // Open the add movie modal pre-filled
      this.showAddMovieModal();
      document.getElementById('add-movie-title').value = data.title;
      document.getElementById('add-movie-year').value = data.release_date ? data.release_date.substring(0,4) : 2024;
      
      // Set poster
      if (data.poster_path) {
        document.getElementById('add-movie-poster-preview').innerHTML = 
          `<img src="https://image.tmdb.org/t/p/w185${data.poster_path}" class="w-24 h-36 object-cover rounded-lg">`;
        document.getElementById('add-movie-poster-url').value = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      }

      // Check genre boxes
      document.querySelectorAll('#add-movie-genres input[type=checkbox]').forEach(cb => {
        cb.checked = genres.includes(cb.value);
      });

      this.updateAddMoviePreview();
    } catch (err) {
      alert('Failed to fetch movie details: ' + err.message);
    }
  },

  // ─── Taste Profile Tab ─────────────────────────────────────

  renderTasteTab() {
    this.updateTasteSummary();
    setTimeout(() => {
      this.renderTasteRadar();
      this.renderTasteBarChart();
    }, 150);
  },

  updateTasteSummary() {
    const likedMovies = MovieData.movies.filter(m => this.state.likedMovieIds.includes(m.id));
    const el = document.getElementById('taste-summary');
    if (!el) return;

    if (likedMovies.length === 0) {
      el.innerHTML = '<p class="text-zinc-500 text-sm">Like some movies to see your taste profile!</p>';
      return;
    }

    // Calculate average scores across liked movies
    const avgScores = {};
    const dimKeys = Object.keys(ScoringEngine.dimensions);
    
    dimKeys.forEach(key => {
      const sum = likedMovies.reduce((acc, m) => acc + (m.scores[key] || 0), 0);
      avgScores[key] = Math.round((sum / likedMovies.length) * 10) / 10;
    });
    avgScores.metaPenalty = Math.round(likedMovies.reduce((acc, m) => acc + (m.scores.metaPenalty || 0), 0) / likedMovies.length * 10) / 10;
    avgScores.nihilismCap = Math.round(likedMovies.reduce((acc, m) => acc + (m.scores.nihilismCap || 0), 0) / likedMovies.length * 10) / 10;

    const result = ScoringEngine.calculateFinalScore(avgScores);
    const tier = ScoringEngine.getScoreTier(result.final);

    // Genre distribution
    const genreCounts = {};
    likedMovies.forEach(m => {
      m.genres.forEach(g => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    });
    const topGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([g, count]) => `${MovieData.genres[g]?.icon || ''} ${MovieData.genres[g]?.name || g} (${count})`)
      .join(' · ');

    el.innerHTML = `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-zinc-800/40 rounded-xl p-4 text-center">
          <div class="text-3xl font-black" style="color:${tier.color}">${result.final}</div>
          <div class="text-xs text-zinc-400 mt-1">Taste Score</div>
        </div>
        <div class="bg-zinc-800/40 rounded-xl p-4 text-center">
          <div class="text-3xl font-black text-white">${likedMovies.length}</div>
          <div class="text-xs text-zinc-400 mt-1">Liked Movies</div>
        </div>
        <div class="bg-zinc-800/40 rounded-xl p-4 text-center col-span-2">
          <div class="text-xs text-zinc-300">${topGenres}</div>
          <div class="text-xs text-zinc-400 mt-1">Top Genres</div>
        </div>
      </div>`;
  },

  renderTasteRadar() {
    const canvas = document.getElementById('taste-radar');
    if (!canvas) return;

    const likedMovies = MovieData.movies.filter(m => this.state.likedMovieIds.includes(m.id));
    if (likedMovies.length === 0) return;

    // Average scores
    const avgScores = {};
    const dimKeys = Object.keys(ScoringEngine.dimensions);
    dimKeys.forEach(key => {
      avgScores[key] = likedMovies.reduce((acc, m) => acc + (m.scores[key] || 0), 0) / likedMovies.length;
    });

    if (this.charts.radar) this.charts.radar.destroy();

    this.charts.radar = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: dimKeys.map(k => ScoringEngine.dimensions[k].shortName),
        datasets: [{
          label: 'Your Taste Profile',
          data: dimKeys.map(k => Math.round(avgScores[k] * 10) / 10),
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          borderColor: '#f59e0b',
          borderWidth: 2,
          pointBackgroundColor: '#f59e0b',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 2,
              color: '#71717a',
              backdropColor: 'transparent',
              font: { size: 10 }
            },
            grid: { color: 'rgba(113, 113, 122, 0.15)' },
            angleLines: { color: 'rgba(113, 113, 122, 0.15)' },
            pointLabels: {
              color: '#a1a1aa',
              font: { size: 11, weight: '500' }
            }
          }
        }
      }
    });
  },

  renderTasteBarChart() {
    const canvas = document.getElementById('taste-bar');
    if (!canvas) return;

    const likedMovies = MovieData.movies.filter(m => this.state.likedMovieIds.includes(m.id));
    if (likedMovies.length === 0) return;

    const avgScores = {};
    const dimKeys = Object.keys(ScoringEngine.dimensions);
    dimKeys.forEach(key => {
      avgScores[key] = likedMovies.reduce((acc, m) => acc + (m.scores[key] || 0), 0) / likedMovies.length;
    });

    if (this.charts.bar) this.charts.bar.destroy();

    this.charts.bar = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: dimKeys.map(k => ScoringEngine.dimensions[k].shortName),
        datasets: [{
          label: 'Your Average',
          data: dimKeys.map(k => Math.round(avgScores[k] * 10) / 10),
          backgroundColor: dimKeys.map(k => ScoringEngine.dimensions[k].color + '80'),
          borderColor: dimKeys.map(k => ScoringEngine.dimensions[k].color),
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 28
        }, {
          label: 'Weight',
          data: dimKeys.map(k => ScoringEngine.dimensions[k].weight * 10),
          backgroundColor: 'rgba(255,255,255,0.08)',
          borderColor: 'rgba(255,255,255,0.15)',
          borderWidth: 1,
          borderRadius: 6,
          barThickness: 28
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: { color: '#a1a1aa', font: { size: 11 } }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            ticks: { color: '#71717a', font: { size: 10 } },
            grid: { color: 'rgba(113, 113, 122, 0.15)' }
          },
          x: {
            ticks: { color: '#a1a1aa', font: { size: 10 } },
            grid: { display: false }
          }
        }
      }
    });
  },

  // ─── Calculator ────────────────────────────────────────────

  renderCalculator() {
    // Bind calculator inputs
    document.querySelectorAll('.calc-input').forEach(input => {
      input.addEventListener('input', () => this.updateCalculator());
    });
    this.updateCalculator();
  },

  updateCalculator() {
    const scores = {};
    document.querySelectorAll('.calc-input').forEach(input => {
      scores[input.dataset.dim] = parseFloat(input.value) || 0;
    });

    const result = ScoringEngine.calculateFinalScore(scores);
    const tier = ScoringEngine.getScoreTier(result.final);

    // Update display
    const scoreEl = document.getElementById('calc-score');
    if (scoreEl) {
      scoreEl.innerHTML = `
        <div class="text-5xl font-black" style="color:${tier.color}">${result.final}</div>
        <div class="text-sm mt-1" style="color:${tier.color}">${tier.label}</div>`;
    }

    // Update breakdown
    const breakdownEl = document.getElementById('calc-breakdown');
    if (breakdownEl) {
      const entries = Object.entries(ScoringEngine.dimensions);
      breakdownEl.innerHTML = entries.map(([key, dim]) => {
        const val = scores[key] || 0;
        const contrib = result.breakdown[key.replace(/([A-Z])/g, '$1').replace(/([a-z])([A-Z])/g, '$1$2')];
        // Fix camelCase to match breakdown keys
        const contribKey = Object.keys(result.breakdown).find(k => 
          key.replace(/([A-Z])/g, (m) => m).startsWith(k.substring(0, 4).toLowerCase())
        );
        return `
          <div class="flex items-center gap-2 text-xs">
            <span class="w-20 text-zinc-400 text-right">${dim.shortName}</span>
            <span class="w-6 font-mono text-zinc-300">${val}</span>
            <span class="text-zinc-500">×</span>
            <span class="w-8 font-mono text-zinc-400">${dim.weight}</span>
            <span class="text-zinc-500">=</span>
            <span class="w-8 font-mono font-bold" style="color:${dim.color}">${(val * dim.weight).toFixed(2)}</span>
          </div>`;
      }).join('');
    }

    // Update formula
    const formulaEl = document.getElementById('calc-formula');
    if (formulaEl) {
      formulaEl.innerHTML = `
        <div class="text-xs text-zinc-500 space-y-1 font-mono">
          <div>Raw = ${result.raw}</div>
          <div>− Meta Penalty (${result.metaPenalty}) = ${result.metaAdjusted}</div>
          <div>× Nihilism Factor (${result.nihilismFactor}) = ${result.nihilismCapped}</div>
          <div class="text-zinc-300 font-bold">Final = ${result.final}</div>
        </div>`;
    }

    // Update dimension bars
    document.querySelectorAll('.calc-bar-fill').forEach(bar => {
      const dim = bar.dataset.dim;
      const val = scores[dim] || 0;
      const dimData = ScoringEngine.dimensions[dim];
      bar.style.width = `${val * 10}%`;
      bar.style.background = dimData ? dimData.color : '#f59e0b';
    });
  },

  // ─── Year Range Display ────────────────────────────────────

  updateYearRangeDisplay() {
    const minEl = document.getElementById('year-min-label');
    const maxEl = document.getElementById('year-max-label');
    if (minEl) minEl.textContent = this.state.yearRange.min;
    if (maxEl) maxEl.textContent = this.state.yearRange.max;
  },

  // ─── Recommendation Engine ─────────────────────────────────

  getRecommendations() {
    const likedMovies = MovieData.movies.filter(m => this.state.likedMovieIds.includes(m.id));
    if (likedMovies.length === 0) return [];

    // Calculate taste profile averages
    const avgScores = {};
    const dimKeys = Object.keys(ScoringEngine.dimensions);
    dimKeys.forEach(key => {
      avgScores[key] = likedMovies.reduce((acc, m) => acc + (m.scores[key] || 0), 0) / likedMovies.length;
    });

    // Score all non-liked movies
    const candidates = MovieData.movies
      .filter(m => !this.state.likedMovieIds.includes(m.id))
      .filter(m => m.year >= this.state.yearRange.min && m.year <= this.state.yearRange.max)
      .map(movie => {
        const similarity = ScoringEngine.calculateSimilarity(avgScores, movie.scores);
        const genreCompat = ScoringEngine.getGenreCompatibility(movie.genres, this.state.genreWeights);
        const movieScore = ScoringEngine.calculateFinalScore(movie.scores).final;
        
        // Combined recommendation score
        const recScore = (similarity * 0.5) + (genreCompat * 0.2) + (movieScore / 10 * 0.3);
        
        return { ...movie, recScore: Math.round(recScore * 100) / 100 };
      })
      .sort((a, b) => b.recScore - a.recScore)
      .slice(0, 12);

    return candidates;
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

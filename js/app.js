/**
 * Tactile Systematic — Genre Slider Movie Search Engine
 * No pre-loaded database. Everything searched live from TMDB.
 */

const App = {
  state: {
    activeTab: 'search',
    genreWeights: {},
    yearRange: { min: 1970, max: 2026 },
    resultCount: 12,
    tmdbKey: '',
    searchResults: [],
    scoredMovies: [],
    isGenerating: false,
    currentSearchPage: 1,
    totalResults: 0
  },

  charts: {},

  // ─── Init ──────────────────────────────────────────────

  init() {
    this.loadState();
    this.renderGenreSliders();
    this.renderScoredTab();
    this.switchTab('search');
    console.log('Tactile Systematic initialized — slider-first mode');
  },

  // ─── Persistence ──────────────────────────────────────

  loadState() {
    try {
      const saved = localStorage.getItem('tsr_state_v2');
      if (saved) {
        const p = JSON.parse(saved);
        this.state.genreWeights = p.genreWeights || this.defaultGenreWeights();
        this.state.yearRange = p.yearRange || { min: 1970, max: 2026 };
        this.state.tmdbKey = p.tmdbKey || '';
        this.state.scoredMovies = p.scoredMovies || [];
        this.state.resultCount = p.resultCount || 12;
      } else {
        this.state.genreWeights = this.defaultGenreWeights();
      }
    } catch (e) {
      this.state.genreWeights = this.defaultGenreWeights();
    }
  },

  saveState() {
    try {
      localStorage.setItem('tsr_state_v2', JSON.stringify({
        genreWeights: this.state.genreWeights,
        yearRange: this.state.yearRange,
        tmdbKey: this.state.tmdbKey,
        scoredMovies: this.state.scoredMovies,
        resultCount: this.state.resultCount
      }));
    } catch (e) {
      console.error('Save failed:', e);
    }
  },

  defaultGenreWeights() {
    const w = {};
    for (const [key, genre] of Object.entries(GenreData.genres)) {
      w[key] = 0; // All OFF by default
    }
    return w;
  },

  // ─── Tabs ─────────────────────────────────────────────

  switchTab(name) {
    this.state.activeTab = name;
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    const panel = document.getElementById('tab-' + name);
    if (panel) panel.classList.remove('hidden');
    document.querySelectorAll('[data-tab]').forEach(btn => {
      btn.classList.toggle('tab-active', btn.dataset.tab === name);
      btn.classList.toggle('tab-inactive', btn.dataset.tab !== name);
    });
    if (name === 'taste') {
      setTimeout(() => this.renderTasteCharts(), 100);
    }
  },

  // ─── Genre Sliders ────────────────────────────────────

  renderGenreSliders() {
    this.renderGenreGroup('main-genres', GenreData.getMainGenres(), 'Main Genres');
    this.renderGenreGroup('sub-genres', GenreData.getSubGenres(), 'Sub-Genres');
    this.updateActiveCount();
    this.bindSliderEvents();
  },

  renderGenreGroup(containerId, genres, label) {
    const el = document.getElementById(containerId);
    if (!el) return;
    let html = `<div class="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">${label}</div>`;
    for (const [key, genre] of genres) {
      const weight = this.state.genreWeights[key] ?? 0;
      const isOn = weight > 0;
      html += `
        <div class="genre-slider-row ${isOn ? '' : 'genre-off'}" data-genre="${key}">
          <div class="flex items-center justify-between mb-1">
            <div class="flex items-center gap-2">
              <span class="text-sm">${genre.icon}</span>
              <span class="text-sm font-medium ${isOn ? 'text-zinc-200' : 'text-zinc-500 line-through'}">${genre.name}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="text-xs font-mono ${isOn ? 'text-amber-400' : 'text-red-400'} w-6 text-right" id="gv-${key}">${isOn ? weight : 'OFF'}</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only genre-switch" data-genre="${key}" ${isOn ? 'checked' : ''}>
                <div class="w-9 h-5 rounded-full transition-colors ${isOn ? 'bg-emerald-500' : 'bg-zinc-600'} genre-toggle" id="gt-${key}"></div>
              </label>
            </div>
          </div>
          <input type="range" min="0" max="10" step="1" value="${weight}"
                 class="genre-range w-full h-1.5 rounded-lg appearance-none cursor-pointer ${isOn ? '' : 'opacity-30'}"
                 id="gr-${key}" data-genre="${key}">
        </div>`;
    }
    el.innerHTML = html;
  },

  bindSliderEvents() {
    document.querySelectorAll('.genre-switch').forEach(sw => {
      sw.addEventListener('change', (e) => {
        const g = e.target.dataset.genre;
        this.state.genreWeights[g] = e.target.checked ? 5 : 0;
        this.saveState();
        this.renderGenreSliders();
      });
    });
    document.querySelectorAll('.genre-range').forEach(range => {
      range.addEventListener('input', (e) => {
        const g = e.target.dataset.genre;
        const v = parseInt(e.target.value);
        this.state.genreWeights[g] = v;
        const valEl = document.getElementById('gv-' + g);
        const toggleEl = document.getElementById('gt-' + g);
        const row = e.target.closest('.genre-slider-row');
        if (v === 0) {
          valEl.textContent = 'OFF';
          valEl.className = 'text-xs font-mono text-red-400 w-6 text-right';
          toggleEl.className = 'w-9 h-5 rounded-full transition-colors bg-zinc-600 genre-toggle';
          row.classList.add('genre-off');
          e.target.classList.add('opacity-30');
          row.querySelector('.genre-switch').checked = false;
        } else {
          valEl.textContent = v;
          valEl.className = 'text-xs font-mono text-amber-400 w-6 text-right';
          toggleEl.className = 'w-9 h-5 rounded-full transition-colors bg-emerald-500 genre-toggle';
          row.classList.remove('genre-off');
          e.target.classList.remove('opacity-30');
          row.querySelector('.genre-switch').checked = true;
        }
        this.saveState();
        this.updateActiveCount();
      });
    });
  },

  updateActiveCount() {
    const el = document.getElementById('active-genre-count');
    if (el) {
      const count = GenreData.countActive(this.state.genreWeights);
      el.textContent = count + ' active';
      el.classList.toggle('text-amber-400', count > 0);
      el.classList.toggle('text-zinc-600', count === 0);
    }
    const btn = document.getElementById('generate-btn');
    if (btn) btn.disabled = count === 0;
  },

  // ─── TMDB Search / Generate ───────────────────────────

  async generate() {
    if (this.state.isGenerating) return;

    const activeCount = GenreData.countActive(this.state.genreWeights);
    if (activeCount === 0) {
      alert('Select at least one genre to generate results.');
      return;
    }

    // Check TMDB key
    if (!this.state.tmdbKey) {
      const key = prompt('Enter your free TMDB API key:\n\nGet one at: https://www.themoviedb.org/signup\nThen go to Settings > API > Create API Key\n\nThis key is saved in your browser only.');
      if (!key) return;
      this.state.tmdbKey = key.trim();
      this.saveState();
      const keyEl = document.getElementById('tmdb-key-input');
      if (keyEl) keyEl.value = this.state.tmdbKey;
    }

    // Show loading
    this.state.isGenerating = true;
    this.state.searchResults = [];
    this.renderResults();

    const container = document.getElementById('results-area');
    container.classList.remove('hidden');

    const genreIds = GenreData.getActiveTmdbGenreIds(this.state.genreWeights);
    const keywords = GenreData.getActiveKeywords(this.state.genreWeights);
    const yearMin = this.state.yearRange.min;
    const yearMax = this.state.yearRange.max;
    const count = this.state.resultCount;

    // Build TMDB discover URL
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.state.tmdbKey}`;
    if (genreIds.length > 0) {
      url += `&with_genres=${genreIds.join(',')}`;
    }
    url += `&primary_release_date.gte=${yearMin}-01-01&primary_release_date.lte=${yearMax}-12-31`;
    url += `&sort_by=popularity.desc&vote_count.gte=50&include_adult=false`;

    try {
      const allResults = [];
      const pagesNeeded = Math.ceil(count / 20);

      for (let page = 1; page <= Math.min(pagesNeeded, 3); page++) {
        const res = await fetch(url + `&page=${page}`);
        if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
        const data = await res.json();
        if (data.results) allResults.push(...data.results);
        this.state.totalResults = data.total_results || 0;
        if (!data.results || data.results.length < 20 || allResults.length >= count) break;
      }

      // If sub-genre keywords, supplement with search calls
      if (keywords.length > 0 && allResults.length < count) {
        for (const kw of keywords) {
          if (allResults.length >= count) break;
          const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${this.state.tmdbKey}&query=${encodeURIComponent(kw)}&primary_release_date.gte=${yearMin}-01-01&primary_release_date.lte=${yearMax}-12-31&vote_count.gte=20&page=1`;
          try {
            const res = await fetch(searchUrl);
            const data = await res.json();
            if (data.results) {
              const existingIds = new Set(allResults.map(m => m.id));
              for (const movie of data.results) {
                if (!existingIds.has(movie.id) && allResults.length < count) {
                  allResults.push(movie);
                  existingIds.add(movie.id);
                }
              }
            }
          } catch (e) {
            console.warn('Keyword search failed for:', kw, e);
          }
        }
      }

      // Sort by popularity and slice to count
      allResults.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      this.state.searchResults = allResults.slice(0, count);

      // Check if any already scored
      this.state.searchResults = this.state.searchResults.map(m => ({
        ...m,
        isScored: this.state.scoredMovies.some(s => s.tmdbId === m.id),
        savedScore: this.state.scoredMovies.find(s => s.tmdbId === m.id)
      }));

      this.renderResults();

    } catch (err) {
      console.error('Generate failed:', err);
      if (err.message.includes('401')) {
        alert('Invalid TMDB API key. Please check your key and try again.');
        this.state.tmdbKey = '';
        this.saveState();
      } else {
        alert('Search failed: ' + err.message);
      }
      this.renderResults();
    }

    this.state.isGenerating = false;

    // Scroll to results
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  renderResults() {
    const el = document.getElementById('results-grid');
    if (!el) return;

    if (this.state.isGenerating) {
      el.innerHTML = `
        <div class="col-span-full text-center py-16">
          <div class="text-4xl animate-spin mb-4">⏳</div>
          <p class="text-zinc-400 text-lg">Searching TMDB for matches...</p>
          <p class="text-zinc-600 text-sm mt-2">Looking for ${GenreData.countActive(this.state.genreWeights)} genres · ${this.state.yearRange.min}–${this.state.yearRange.max}</p>
        </div>`;
      return;
    }

    if (this.state.searchResults.length === 0) {
      el.innerHTML = `
        <div class="col-span-full text-center py-16 text-zinc-500">
          <div class="text-4xl mb-4">🎬</div>
          <p class="text-lg">No results yet</p>
          <p class="text-sm mt-2">Select some genres, set your year range, and hit Generate</p>
        </div>`;
      return;
    }

    el.innerHTML = this.state.searchResults.map(movie => {
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
        : '';
      const year = movie.release_date ? movie.release_date.substring(0, 4) : '?';
      const genres = (movie.genre_ids || []).map(id => {
        const entry = Object.entries(GenreData.genres).find(([, g]) => g.tmdbId === id);
        return entry ? entry[1] : null;
      }).filter(Boolean);
      const genreTags = genres.slice(0, 3).map(g => `<span class="inline-block px-1.5 py-0.5 text-[10px] rounded bg-zinc-700/60 text-zinc-400">${g.icon} ${g.name}</span>`).join('');

      const scored = movie.isScored;
      const savedScore = movie.savedScore;
      const finalScore = savedScore ? ScoringEngine.calculateFinalScore(savedScore.scores).final : null;
      const tier = finalScore ? ScoringEngine.getScoreTier(finalScore) : null;

      return `
        <div class="movie-card group cursor-pointer" onclick="App.openScoreModal(${movie.id})">
          <div class="relative overflow-hidden rounded-t-lg">
            ${poster
              ? `<img src="${poster}" alt="${movie.title}" class="movie-poster w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                       onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                 <div class="movie-poster-fallback hidden items-center justify-center w-full h-64 bg-gradient-to-br from-zinc-800 to-zinc-900">
                   <span class="text-4xl text-zinc-600">🎬</span>
                 </div>`
              : `<div class="flex items-center justify-center w-full h-64 bg-gradient-to-br from-zinc-800 to-zinc-900">
                   <span class="text-4xl text-zinc-600">🎬</span>
                 </div>`}
            ${finalScore !== null ? `
              <div class="absolute top-2 right-2">
                <span class="px-2 py-1 rounded-lg text-xs font-bold" style="background:${tier.color}20; color:${tier.color}; border:1px solid ${tier.color}40">
                  ${finalScore}
                </span>
              </div>` : ''}
            ${scored ? `
              <div class="absolute top-2 left-2">
                <span class="px-2 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Scored</span>
              </div>` : ''}
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
              <span class="text-xs font-medium text-amber-400 bg-black/50 px-3 py-1.5 rounded-lg border border-amber-500/30">
                ${scored ? 'Edit Score' : 'Score This'}
              </span>
            </div>
          </div>
          <div class="p-3">
            <h3 class="text-sm font-semibold text-zinc-100 truncate">${movie.title}</h3>
            <p class="text-xs text-zinc-500 mt-0.5">${year} ${movie.vote_average ? '· ' + movie.vote_average.toFixed(1) + '★' : ''}</p>
            <div class="mt-1.5 flex flex-wrap gap-1">${genreTags}</div>
          </div>
        </div>`;
    }).join('');

    // Update result info
    const infoEl = document.getElementById('results-info');
    if (infoEl) {
      infoEl.textContent = `${this.state.searchResults.length} movies found · ${this.state.totalResults > 0 ? this.state.totalResults.toLocaleString() + ' total matches' : ''}`;
    }
  },

  // ─── Score Modal ──────────────────────────────────────

  openScoreModal(tmdbId) {
    const movie = this.state.searchResults.find(m => m.id === tmdbId);
    if (!movie) return;

    const existing = this.state.scoredMovies.find(s => s.tmdbId === tmdbId);
    const scores = existing ? existing.scores : {
      tactileIndex: 7, systematicLogic: 7, competencePorn: 7,
      dialogueUtility: 7, momentumVelocity: 7, industrialGrit: 7,
      metaPenalty: 0, nihilismCap: 0
    };

    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w185${movie.poster_path}` : '';
    const year = movie.release_date ? movie.release_date.substring(0, 4) : '?';

    const modal = document.getElementById('score-modal');
    const content = document.getElementById('score-modal-content');

    content.innerHTML = `
      <div class="flex gap-4 mb-6">
        ${poster
          ? `<img src="${poster}" class="w-24 h-36 object-cover rounded-lg shrink-0" alt="">`
          : '<div class="w-24 h-36 bg-zinc-800 rounded-lg flex items-center justify-center shrink-0 text-2xl text-zinc-600">🎬</div>'}
        <div class="min-w-0">
          <h2 class="text-xl font-bold text-white leading-tight">${movie.title}</h2>
          <p class="text-sm text-zinc-400 mt-1">${year} ${movie.vote_average ? '· TMDB ' + movie.vote_average.toFixed(1) + '/10' : ''}</p>
          <p class="text-xs text-zinc-600 mt-1">Score each dimension 0-10, then save.</p>
        </div>
      </div>

      <div class="space-y-3 mb-6">
        ${this.scoreSliderRow('tactileIndex', 'Tactile Index', '×0.25', 'text-red-400', scores.tactileIndex)}
        ${this.scoreSliderRow('systematicLogic', 'Systematic Logic', '×0.20', 'text-orange-400', scores.systematicLogic)}
        ${this.scoreSliderRow('competencePorn', 'Competence Porn', '×0.15', 'text-yellow-400', scores.competencePorn)}
        ${this.scoreSliderRow('dialogueUtility', 'Dialogue Utility', '×0.15', 'text-green-400', scores.dialogueUtility)}
        ${this.scoreSliderRow('momentumVelocity', 'Momentum Velocity', '×0.15', 'text-blue-400', scores.momentumVelocity)}
        ${this.scoreSliderRow('industrialGrit', 'Industrial Grit', '×0.10', 'text-violet-400', scores.industrialGrit)}

        <div class="border-t border-zinc-700/50 pt-3 mt-3">
          ${this.scoreSliderRow('metaPenalty', 'Meta Penalty', 'max -5', 'text-red-400', scores.metaPenalty, 0, 5)}
          ${this.scoreSliderRow('nihilismCap', 'Nihilism Cap', '0-100', 'text-zinc-400', scores.nihilismCap, 0, 100)}
        </div>
      </div>

      <div id="score-live-preview" class="glass rounded-lg p-4 mb-4 text-center">
        ${this.scorePreviewHTML(scores)}
      </div>

      <div class="flex gap-3">
        <button onclick="App.saveScoreFromModal(${tmdbId})" class="btn-primary flex-1 py-2.5 text-sm font-semibold">
          💾 Save Score
        </button>
        <button onclick="App.closeScoreModal()" class="btn-secondary flex-1 py-2.5 text-sm">
          Cancel
        </button>
      </div>
      ${existing ? `<button onclick="App.deleteScore(${tmdbId})" class="w-full mt-2 text-xs text-red-400/60 hover:text-red-400 py-1 transition-colors">Delete this score</button>` : ''}`;

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Bind slider events inside modal
    content.querySelectorAll('.modal-score-input').forEach(input => {
      input.addEventListener('input', () => {
        const val = parseFloat(input.value);
        const label = input.closest('div').querySelector('.modal-score-val');
        if (label) label.textContent = input.dataset.dim === 'nihilismCap' ? val : val.toFixed(1);
        // Update preview
        const s = {};
        content.querySelectorAll('.modal-score-input').forEach(inp => {
          s[inp.dataset.dim] = parseFloat(inp.value) || 0;
        });
        document.getElementById('score-live-preview').innerHTML = this.scorePreviewHTML(s);
      });
    });
  },

  scoreSliderRow(dim, name, weight, colorClass, value, min = 0, max = 10) {
    const step = dim === 'nihilismCap' ? 5 : 0.5;
    return `
      <div>
        <div class="flex justify-between text-xs mb-1">
          <span class="text-zinc-300">${name} <span class="text-zinc-500">(${weight})</span></span>
          <span class="font-mono ${colorClass} modal-score-val">${dim === 'nihilismCap' ? value : value.toFixed(1)}</span>
        </div>
        <input type="range" min="${min}" max="${max}" step="${step}" value="${value}"
               class="modal-score-input calc-range w-full" data-dim="${dim}">
      </div>`;
  },

  scorePreviewHTML(scores) {
    const result = ScoringEngine.calculateFinalScore(scores);
    const tier = ScoringEngine.getScoreTier(result.final);
    return `
      <div class="text-4xl font-black" style="color:${tier.color}">${result.final}</div>
      <div class="text-xs mt-0.5" style="color:${tier.color}">${tier.label}</div>
      <div class="text-[10px] text-zinc-500 mt-1 font-mono">Raw ${result.raw} → ${result.metaAdjusted} → ${result.nihilismCapped}</div>`;
  },

  saveScoreFromModal(tmdbId) {
    const movie = this.state.searchResults.find(m => m.id === tmdbId);
    if (!movie) return;

    const content = document.getElementById('score-modal-content');
    const scores = {};
    content.querySelectorAll('.modal-score-input').forEach(inp => {
      scores[inp.dataset.dim] = parseFloat(inp.value) || 0;
    });

    const result = ScoringEngine.calculateFinalScore(scores);

    const scoredMovie = {
      tmdbId: movie.id,
      title: movie.title,
      year: movie.release_date ? movie.release_date.substring(0, 4) : '?',
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
      tmdbRating: movie.vote_average || null,
      genreIds: movie.genre_ids || [],
      scores,
      finalScore: result.final,
      savedAt: new Date().toISOString()
    };

    // Update or add
    const idx = this.state.scoredMovies.findIndex(s => s.tmdbId === tmdbId);
    if (idx >= 0) {
      this.state.scoredMovies[idx] = scoredMovie;
    } else {
      this.state.scoredMovies.push(scoredMovie);
    }

    this.saveState();
    this.closeScoreModal();
    this.renderResults();
    this.renderScoredTab();
  },

  deleteScore(tmdbId) {
    if (!confirm('Delete this score?')) return;
    this.state.scoredMovies = this.state.scoredMovies.filter(s => s.tmdbId !== tmdbId);
    this.saveState();
    this.closeScoreModal();
    this.renderResults();
    this.renderScoredTab();
  },

  closeScoreModal() {
    const modal = document.getElementById('score-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  },

  // ─── Scored Movies Tab ────────────────────────────────

  renderScoredTab() {
    const grid = document.getElementById('scored-grid');
    const list = document.getElementById('scored-list');
    if (!grid || !list) return;

    const movies = [...this.state.scoredMovies].sort((a, b) => b.finalScore - a.finalScore);

    if (movies.length === 0) {
      const empty = '<div class="text-center py-12 text-zinc-500"><p class="text-sm">No scored movies yet. Generate and score some movies to see your taste profile.</p></div>';
      grid.innerHTML = empty;
      list.innerHTML = empty;
      return;
    }

    grid.innerHTML = movies.map(m => {
      const tier = ScoringEngine.getScoreTier(m.finalScore);
      return `
        <div class="movie-card group cursor-pointer" onclick="App.showScoreDetail(${m.tmdbId})">
          <div class="relative overflow-hidden rounded-t-lg">
            ${m.poster
              ? `<img src="${m.poster}" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" alt="${m.title}"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                 <div class="hidden items-center justify-center w-full h-48 bg-gradient-to-br from-zinc-800 to-zinc-900"><span class="text-3xl text-zinc-600">🎬</span></div>`
              : '<div class="flex items-center justify-center w-full h-48 bg-gradient-to-br from-zinc-800 to-zinc-900"><span class="text-3xl text-zinc-600">🎬</span></div>'}
            <div class="absolute top-2 right-2">
              <span class="px-2 py-1 rounded-lg text-xs font-bold" style="background:${tier.color}20; color:${tier.color}; border:1px solid ${tier.color}40">${m.finalScore}</span>
            </div>
          </div>
          <div class="p-3">
            <h3 class="text-sm font-semibold text-zinc-100 truncate">${m.title}</h3>
            <p class="text-xs text-zinc-500 mt-0.5">${m.year} · ${tier.label}</p>
          </div>
        </div>`;
    }).join('');

    list.innerHTML = movies.map(m => {
      const tier = ScoringEngine.getScoreTier(m.finalScore);
      return `
        <div class="flex items-center gap-4 p-3 bg-zinc-800/40 rounded-lg hover:bg-zinc-800/60 transition-colors cursor-pointer"
             onclick="App.showScoreDetail(${m.tmdbId})">
          <div class="text-2xl font-black w-12 text-center shrink-0" style="color:${tier.color}">${m.finalScore}</div>
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-zinc-200 truncate">${m.title}</h4>
            <p class="text-xs text-zinc-500">${m.year} · ${tier.label}</p>
          </div>
          <button onclick="event.stopPropagation(); App.deleteScore(${m.tmdbId})" class="text-xs text-zinc-600 hover:text-red-400 px-2 py-1 rounded-lg hover:bg-red-500/10 transition-all">✕</button>
        </div>`;
    }).join('');

    // Update count
    const countEl = document.getElementById('scored-count');
    if (countEl) countEl.textContent = movies.length + ' movies scored';
  },

  showScoreDetail(tmdbId) {
    // If movie is in search results, open score modal
    const inResults = this.state.searchResults.find(m => m.id === tmdbId);
    if (inResults) {
      this.openScoreModal(tmdbId);
      return;
    }
    // Otherwise show a read-only detail
    const movie = this.state.scoredMovies.find(s => s.tmdbId === tmdbId);
    if (!movie) return;

    const tier = ScoringEngine.getScoreTier(movie.finalScore);
    const dims = Object.entries(ScoringEngine.dimensions);

    const content = document.getElementById('score-modal-content');
    content.innerHTML = `
      <div class="flex gap-4 mb-6">
        ${movie.poster ? `<img src="${movie.poster}" class="w-28 h-42 object-cover rounded-lg shrink-0" alt="">` : '<div class="w-28 h-42 bg-zinc-800 rounded-lg shrink-0 flex items-center justify-center text-3xl text-zinc-600">🎬</div>'}
        <div>
          <h2 class="text-xl font-bold text-white">${movie.title}</h2>
          <p class="text-sm text-zinc-400 mt-1">${movie.year} · ${tier.label}</p>
          <div class="mt-3 flex items-center gap-3">
            <div class="text-5xl font-black" style="color:${tier.color}">${movie.finalScore}</div>
            <div class="text-xs text-zinc-500">
              <div>TMDB: ${movie.tmdbRating ? movie.tmdbRating.toFixed(1) + '/10' : 'N/A'}</div>
              <div>Scored: ${new Date(movie.savedAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="space-y-2 mb-6">
        ${dims.map(([key, dim]) => {
          const val = movie.scores[key] || 0;
          return `
            <div class="flex items-center gap-3">
              <span class="text-xs text-zinc-400 w-24 text-right shrink-0">${dim.shortName}</span>
              <div class="flex-1 h-2.5 bg-zinc-700 rounded-full overflow-hidden">
                <div class="h-full rounded-full" style="width:${val*10}%; background:${dim.color}"></div>
              </div>
              <span class="text-xs font-mono text-zinc-300 w-8">${val}</span>
            </div>`;
        }).join('')}
        <div class="border-t border-zinc-700/50 pt-2 mt-2">
          <div class="flex items-center gap-3">
            <span class="text-xs text-zinc-400 w-24 text-right shrink-0">Meta</span>
            <div class="flex-1 h-2.5 bg-zinc-700 rounded-full overflow-hidden">
              <div class="h-full rounded-full" style="width:${((movie.scores.metaPenalty||0)/5)*100}%; background:#ef4444"></div>
            </div>
            <span class="text-xs font-mono text-zinc-300 w-8">${movie.scores.metaPenalty||0}</span>
          </div>
          <div class="flex items-center gap-3 mt-1">
            <span class="text-xs text-zinc-400 w-24 text-right shrink-0">Nihilism</span>
            <div class="flex-1 h-2.5 bg-zinc-700 rounded-full overflow-hidden">
              <div class="h-full rounded-full" style="width:${(movie.scores.nihilismCap||0)}%; background:#71717a"></div>
            </div>
            <span class="text-xs font-mono text-zinc-300 w-8">${movie.scores.nihilismCap||0}</span>
          </div>
        </div>
      </div>
      <div class="flex gap-3">
        <button onclick="App.closeScoreModal()" class="btn-secondary flex-1 py-2.5 text-sm">Close</button>
      </div>`;

    const modal = document.getElementById('score-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  },

  // ─── Taste Charts ─────────────────────────────────────

  renderTasteCharts() {
    this.renderTasteRadar();
    this.renderTasteBarChart();
    this.updateTasteSummary();
  },

  updateTasteSummary() {
    const el = document.getElementById('taste-summary');
    if (!el) return;
    const movies = this.state.scoredMovies;
    if (movies.length === 0) {
      el.innerHTML = '<p class="text-zinc-500 text-sm">Score some movies to see your taste profile.</p>';
      return;
    }
    const avg = {};
    Object.keys(ScoringEngine.dimensions).forEach(k => {
      avg[k] = movies.reduce((a, m) => a + (m.scores[k] || 0), 0) / movies.length;
    });
    avg.metaPenalty = movies.reduce((a, m) => a + (m.scores.metaPenalty || 0), 0) / movies.length;
    avg.nihilismCap = movies.reduce((a, m) => a + (m.scores.nihilismCap || 0), 0) / movies.length;
    const result = ScoringEngine.calculateFinalScore(avg);
    const tier = ScoringEngine.getScoreTier(result.final);

    el.innerHTML = `
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-zinc-800/40 rounded-xl p-4 text-center">
          <div class="text-3xl font-black" style="color:${tier.color}">${result.final}</div>
          <div class="text-xs text-zinc-400 mt-1">Taste Score</div>
        </div>
        <div class="bg-zinc-800/40 rounded-xl p-4 text-center">
          <div class="text-3xl font-black text-white">${movies.length}</div>
          <div class="text-xs text-zinc-400 mt-1">Movies Scored</div>
        </div>
      </div>`;
  },

  renderTasteRadar() {
    const canvas = document.getElementById('taste-radar');
    if (!canvas || this.state.scoredMovies.length === 0) return;
    const movies = this.state.scoredMovies;
    const dimKeys = Object.keys(ScoringEngine.dimensions);
    const avg = {};
    dimKeys.forEach(k => { avg[k] = movies.reduce((a, m) => a + (m.scores[k] || 0), 0) / movies.length; });
    if (this.charts.radar) this.charts.radar.destroy();
    this.charts.radar = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: dimKeys.map(k => ScoringEngine.dimensions[k].shortName),
        datasets: [{
          label: 'Your Taste',
          data: dimKeys.map(k => Math.round(avg[k] * 10) / 10),
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          borderColor: '#f59e0b', borderWidth: 2,
          pointBackgroundColor: '#f59e0b', pointRadius: 4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: { r: {
          beginAtZero: true, max: 10,
          ticks: { stepSize: 2, color: '#71717a', backdropColor: 'transparent', font: { size: 10 } },
          grid: { color: 'rgba(113,113,122,0.15)' },
          angleLines: { color: 'rgba(113,113,122,0.15)' },
          pointLabels: { color: '#a1a1aa', font: { size: 11, weight: '500' } }
        }}
      }
    });
  },

  renderTasteBarChart() {
    const canvas = document.getElementById('taste-bar');
    if (!canvas || this.state.scoredMovies.length === 0) return;
    const movies = this.state.scoredMovies;
    const dimKeys = Object.keys(ScoringEngine.dimensions);
    const avg = {};
    dimKeys.forEach(k => { avg[k] = movies.reduce((a, m) => a + (m.scores[k] || 0), 0) / movies.length; });
    if (this.charts.bar) this.charts.bar.destroy();
    this.charts.bar = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: dimKeys.map(k => ScoringEngine.dimensions[k].shortName),
        datasets: [{
          label: 'Your Average',
          data: dimKeys.map(k => Math.round(avg[k] * 10) / 10),
          backgroundColor: dimKeys.map(k => ScoringEngine.dimensions[k].color + '80'),
          borderColor: dimKeys.map(k => ScoringEngine.dimensions[k].color),
          borderWidth: 1, borderRadius: 6, barThickness: 28
        }, {
          label: 'Weight',
          data: dimKeys.map(k => ScoringEngine.dimensions[k].weight * 10),
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderColor: 'rgba(255,255,255,0.12)',
          borderWidth: 1, borderRadius: 6, barThickness: 28
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: { legend: { labels: { color: '#a1a1aa', font: { size: 11 } } } },
        scales: {
          y: { beginAtZero: true, max: 10, ticks: { color: '#71717a' }, grid: { color: 'rgba(113,113,122,0.12)' } },
          x: { ticks: { color: '#a1a1aa', font: { size: 10 } }, grid: { display: false } }
        }
      }
    });
  }
};

// ─── Boot ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // Year range binding
  const yMin = document.getElementById('year-min');
  const yMax = document.getElementById('year-max');
  if (yMin) yMin.addEventListener('input', e => {
    App.state.yearRange.min = parseInt(e.target.value);
    if (App.state.yearRange.min > App.state.yearRange.max) { App.state.yearRange.min = App.state.yearRange.max; e.target.value = App.state.yearRange.min; }
    document.getElementById('year-min-val').textContent = App.state.yearRange.min;
    App.saveState();
  });
  if (yMax) yMax.addEventListener('input', e => {
    App.state.yearRange.max = parseInt(e.target.value);
    if (App.state.yearRange.max < App.state.yearRange.min) { App.state.yearRange.max = App.state.yearRange.min; e.target.value = App.state.yearRange.max; }
    document.getElementById('year-max-val').textContent = App.state.yearRange.max;
    App.saveState();
  });

  // Result count
  const rc = document.getElementById('result-count');
  if (rc) rc.addEventListener('input', e => {
    App.state.resultCount = parseInt(e.target.value);
    document.getElementById('result-count-val').textContent = App.state.resultCount;
    App.saveState();
  });

  // TMDB key
  const keyInput = document.getElementById('tmdb-key-input');
  if (keyInput) {
    if (App.state.tmdbKey) keyInput.value = App.state.tmdbKey;
    keyInput.addEventListener('change', e => {
      App.state.tmdbKey = e.target.value.trim();
      App.saveState();
    });
  }

  // Generate button
  const genBtn = document.getElementById('generate-btn');
  if (genBtn) genBtn.addEventListener('click', () => App.generate());

  // Init year display
  document.getElementById('year-min-val').textContent = App.state.yearRange.min;
  document.getElementById('year-max-val').textContent = App.state.yearRange.max;
  document.getElementById('result-count-val').textContent = App.state.resultCount;
});

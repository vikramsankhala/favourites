(function () {
  const CATEGORY_KEYS = ['celine', 'shakira', 'enrique', 'dance', 'classics', 'football', 'pele', 'maradona', 'messi', 'messigear', 'ronaldo', 'cruyff', 'zidane', 'ronaldinho', 'r9', 'vanbasten', 'beckenbauer', 'oscar_songs', 'musical_films', 'classic_themes', 'movie_dance', 'romantic_moments', 'web_series', 'hindi_web_series', 'hindi_movies', 'bengali_movies', 'malayalam_dance_ladies', 'kannada_party_ladies', 'malayalam_movies', 'jubin_nautiyal', 'raabta', 'arijit_singh', 'kk', 'papon', 'atif_aslam', 'rubaru', 'aesthetic_colourful', 'sher_shayari_party', 'sufi_party', 'ghazal_party', 'mere_rashke_qamar', 'party_anthems', 'acoustic_guitar', 'punjabi_songs', 'dosti', 'soulful', 'punjabi_dance_ladies', 'punjabi_dance', 'tt_gear', 'tt_players', 'tt_legends', 'tt_styles', 'tt_matches', 'tennis_aces', 'tennis_dtl', 'tennis_crosscourt', 'tennis_single_dtl', 'tennis_single_crosscourt', 'tennis_gear', 'bike_secondhand', 'bike_customization', 'bike_enhancements', 'bike_gear', 'bike_repairs', 'playlist', 'love', 'african', 'latin', 'flamenco'];
  const BADGE_MAP = {
    celine: 'badge-celine', shakira: 'badge-shakira', enrique: 'badge-enrique', dance: 'badge-dance',
    classics: 'badge-classics', football: 'badge-football', playlist: 'badge-playlist', love: 'badge-love',
    african: 'badge-african', latin: 'badge-latin', flamenco: 'badge-flamenco',
    pele: 'badge-pele', maradona: 'badge-maradona', messi: 'badge-messi', messigear: 'badge-messigear',
    ronaldo: 'badge-ronaldo', cruyff: 'badge-cruyff', zidane: 'badge-zidane', ronaldinho: 'badge-ronaldinho',
    r9: 'badge-r9', vanbasten: 'badge-vanbasten', beckenbauer: 'badge-beckenbauer',
    oscar_songs: 'badge-oscar', musical_films: 'badge-musical', classic_themes: 'badge-themes',
    movie_dance: 'badge-movie-dance', romantic_moments: 'badge-romantic',
    hindi_movies: 'badge-hindi', bengali_movies: 'badge-bengali', malayalam_dance_ladies: 'badge-malayalam', kannada_party_ladies: 'badge-indian', malayalam_movies: 'badge-malayalam',
    jubin_nautiyal: 'badge-indian', raabta: 'badge-indian', arijit_singh: 'badge-indian', kk: 'badge-indian', papon: 'badge-indian', atif_aslam: 'badge-indian', rubaru: 'badge-indian',
    aesthetic_colourful: 'badge-indian', sher_shayari_party: 'badge-indian', sufi_party: 'badge-indian', ghazal_party: 'badge-indian', mere_rashke_qamar: 'badge-indian', party_anthems: 'badge-indian', acoustic_guitar: 'badge-indian', punjabi_songs: 'badge-indian', dosti: 'badge-indian', soulful: 'badge-indian', punjabi_dance_ladies: 'badge-indian', punjabi_dance: 'badge-indian',
    web_series: 'badge-web', hindi_web_series: 'badge-hindi-web',
    tt_gear: 'badge-tt', tt_players: 'badge-tt', tt_legends: 'badge-tt', tt_styles: 'badge-tt', tt_matches: 'badge-tt',
    tennis_aces: 'badge-tennis', tennis_dtl: 'badge-tennis', tennis_crosscourt: 'badge-tennis', tennis_single_dtl: 'badge-tennis', tennis_single_crosscourt: 'badge-tennis', tennis_gear: 'badge-tennis',
    bike_secondhand: 'badge-bike', bike_customization: 'badge-bike', bike_enhancements: 'badge-bike', bike_gear: 'badge-bike', bike_repairs: 'badge-bike',
  };

  function getAllVideos() {
    const out = [];
    const data = typeof CONCERT_DATA !== 'undefined' ? CONCERT_DATA : (window.CONCERT_DATA || {});
    CATEGORY_KEYS.forEach((key) => {
      const arr = data[key];
      if (Array.isArray(arr)) {
        arr.forEach((v) => out.push({ ...v, _cat: key }));
      }
    });
    return out;
  }

  function parseDuration(str) {
    const parts = String(str).split(':').map(Number);
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
  }

  function parseDate(str) {
    const n = parseInt(String(str).replace(/\D/g, ''), 10);
    return isNaN(n) ? 0 : n;
  }

  function parseViews(str) {
    const s = String(str).toLowerCase();
    const num = parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
    if (s.includes('b')) return num * 1e9;
    if (s.includes('m')) return num * 1e6;
    if (s.includes('k')) return num * 1e3;
    return num;
  }

  function sortVideos(videos, sortBy) {
    const arr = [...videos];
    switch (sortBy) {
      case 'date-desc':
        arr.sort((a, b) => parseDate(b.date) - parseDate(a.date));
        break;
      case 'date-asc':
        arr.sort((a, b) => parseDate(a.date) - parseDate(b.date));
        break;
      case 'duration-desc':
        arr.sort((a, b) => parseDuration(b.duration) - parseDuration(a.duration));
        break;
      case 'duration-asc':
        arr.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
        break;
      case 'title':
        arr.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default:
        arr.sort((a, b) => parseDate(b.date) - parseDate(a.date));
    }
    return arr;
  }

  function filterBySearch(videos, q) {
    if (!q || !q.trim()) return videos;
    const lower = q.trim().toLowerCase();
    return videos.filter(
      (v) =>
        (v.title && v.title.toLowerCase().includes(lower)) ||
        (v.category && v.category.toLowerCase().includes(lower)) ||
        (v.description && v.description.toLowerCase().includes(lower))
    );
  }

  function filterByTab(videos, tab) {
    if (!tab || tab === 'all') return videos;
    return videos.filter((v) => v._cat === tab);
  }

  function renderCard(v) {
    const badge = BADGE_MAP[v._cat] || 'badge-celine';
    const ytUrl = `https://www.youtube.com/watch?v=${v.videoId}`;
    return `
      <article class="video-card" data-video-id="${v.videoId}" data-title="${(v.title || '').replace(/"/g, '&quot;')}" data-duration="${v.duration || ''}" data-date="${v.date || ''}" data-views="${v.views || ''}" data-desc="${(v.description || '').replace(/"/g, '&quot;')}" data-category="${v.category || ''}">
        <div class="video-thumb">
          <img src="https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg" alt="" loading="lazy">
          <span class="video-duration">${v.duration || '—'}</span>
          <a href="${ytUrl}" target="_blank" rel="noopener" class="video-play-overlay" aria-label="Watch on YouTube">▶</a>
        </div>
        <div class="video-info">
          <h4>${v.title || 'Untitled'}</h4>
          <div class="video-meta">
            <span>${v.date || '—'}</span>
            <span>${v.views || '—'}</span>
          </div>
          <span class="badge ${badge}">${v.category || v._cat}</span>
          <a href="${ytUrl}" target="_blank" rel="noopener" class="video-yt-link">Watch on YouTube →</a>
        </div>
      </article>
    `;
  }

  function renderGrid(videos) {
    const grid = document.getElementById('videoGrid');
    if (!grid) return;
    if (!videos.length) {
      grid.innerHTML = '<p class="no-results">No videos match your filters.</p>';
      return;
    }
    grid.innerHTML = videos.map(renderCard).join('');
  }

  function renderTable(videos) {
    const tbody = document.querySelector('#dataTable tbody');
    if (!tbody) return;
    const ytBase = 'https://www.youtube.com/watch?v=';
    tbody.innerHTML = videos
      .map(
        (v) => `
      <tr data-video-id="${v.videoId}" data-title="${(v.title || '').replace(/"/g, '&quot;')}" data-duration="${v.duration || ''}" data-date="${v.date || ''}" data-views="${v.views || ''}" data-desc="${(v.description || '').replace(/"/g, '&quot;')}" data-category="${v.category || ''}">
        <td>${v.title || '—'}</td>
        <td>${v.category || '—'}</td>
        <td>${v.date || '—'}</td>
        <td>${v.duration || '—'}</td>
        <td>${v.views || '—'}</td>
        <td><a href="${ytBase}${v.videoId}" target="_blank" rel="noopener" class="yt-link">Watch</a></td>
      </tr>
    `
      )
      .join('');
  }

  function updateStatTotal(count) {
    const el = document.getElementById('stat-total');
    if (el) el.textContent = count;
  }

  function openModal(videoId, title, duration, date, views, desc, category) {
    const modal = document.getElementById('modal');
    const embed = document.getElementById('modalEmbed');
    const titleEl = document.getElementById('modalTitle');
    const metaEl = document.getElementById('modalMeta');
    const descEl = document.getElementById('modalDesc');
    const ytEl = document.getElementById('modalYt');
    if (!modal || !embed) return;
    embed.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    if (titleEl) titleEl.textContent = title || 'Video';
    if (metaEl) metaEl.innerHTML = `<span>${duration || '—'}</span> <span>${date || '—'}</span> <span>${views || '—'}</span> <span>${category || ''}</span>`;
    if (descEl) descEl.textContent = desc || '';
    if (ytEl) {
      ytEl.href = `https://www.youtube.com/watch?v=${videoId}`;
      ytEl.style.display = 'inline';
    }
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const modal = document.getElementById('modal');
    const embed = document.getElementById('modalEmbed');
    if (modal) modal.hidden = true;
    if (embed) embed.src = '';
    document.body.style.overflow = '';
  }

  function setupModalListeners() {
    document.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeModal);
    });
    document.getElementById('modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal' || e.target.classList.contains('modal-backdrop')) closeModal();
    });
  }

  function setupCardClicks() {
    document.getElementById('videoGrid')?.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const card = e.target.closest('.video-card');
      if (!card) return;
      const videoId = card.dataset.videoId;
      if (!videoId) return;
      openModal(
        videoId,
        card.dataset.title,
        card.dataset.duration,
        card.dataset.date,
        card.dataset.views,
        card.dataset.desc,
        card.dataset.category
      );
    });
  }

  function setupTableRowClicks() {
    document.getElementById('dataTable')?.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const row = e.target.closest('tbody tr');
      if (!row) return;
      const videoId = row.dataset.videoId;
      if (!videoId) return;
      openModal(
        videoId,
        row.dataset.title,
        row.dataset.duration,
        row.dataset.date,
        row.dataset.views,
        row.dataset.desc,
        row.dataset.category
      );
    });
  }

  function setupTableSort() {
    document.querySelectorAll('#dataTable th[data-sort]').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        const currentSort = document.getElementById('sortBy')?.value || 'date-desc';
        let nextSort = currentSort;
        if (key === 'title') nextSort = 'title';
        else if (key === 'date') nextSort = currentSort === 'date-desc' ? 'date-asc' : 'date-desc';
        else if (key === 'duration') nextSort = currentSort === 'duration-desc' ? 'duration-asc' : 'duration-desc';
        const sel = document.getElementById('sortBy');
        if (sel) sel.value = nextSort;
        refresh();
      });
    });
  }

  function refresh() {
    const all = getAllVideos();
    const tab = document.querySelector('.tab.active')?.dataset.tab || 'all';
    const q = document.getElementById('search')?.value || '';
    const sortBy = document.getElementById('sortBy')?.value || 'date-desc';

    let filtered = filterByTab(all, tab);
    filtered = filterBySearch(filtered, q);
    filtered = sortVideos(filtered, sortBy);

    renderGrid(filtered);
    renderTable(filtered);
    updateStatTotal(all.length);
  }

  function setupTabs() {
    document.querySelectorAll('.tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        showPlaylistForTab(btn.dataset.tab);
        refresh();
      });
    });
  }

  function setupSearchAndSort() {
    document.getElementById('search')?.addEventListener('input', refresh);
    document.getElementById('search')?.addEventListener('keyup', refresh);
    document.getElementById('sortBy')?.addEventListener('change', refresh);
  }

  function showPlaylistForTab(tab) {
    const section = document.getElementById('playlistSection');
    if (!section) return;
    section.style.display = tab === 'playlist' ? 'block' : 'none';
  }

  function init() {
    setupModalListeners();
    setupCardClicks();
    setupTableRowClicks();
    setupTableSort();
    setupTabs();
    setupSearchAndSort();

    const section = document.getElementById('playlistSection');
    if (section) section.style.display = 'none';

    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

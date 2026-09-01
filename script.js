/**
 * =========================================================================
 * VARUN G - BESPOKE INTERACTIVE PORTFOLIO & DEVELOPER OS ENGINE
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Global State
  // ------------------------------------------------------------------------
  const STORAGE_KEY = 'portfolio_custom_projects_v1';
  let activeProjects = loadStoredProjects();
  let currentFilter = 'all';
  let searchQuery = '';
  let soundEnabled = localStorage.getItem('portfolio_sound') !== 'disabled';

  // Audio Context (Synthesized Sci-Fi FX)
  let audioCtx = null;

  // Initialize all subsystems
  initSoundEngine();
  initConstellationCanvas();
  init3DTiltCards();
  initTiruppurClock();
  initProfileData();
  initSkills();
  initProjects();
  initEducationAndCerts();
  initProjectManager();
  initGitHubSync();
  initCommandPalette();
  initTerminalCLI();
  initRecruiterMode();
  initCopyButtons();
  initModalListeners();
  initNavbarScrollSpy();
  initContactForm();

  // ------------------------------------------------------------------------
  // 2. Audio Synthesizer Engine (Zero external dependencies)
  // ------------------------------------------------------------------------
  function initSoundEngine() {
    const soundToggleBtn = document.getElementById('btn-sound-toggle');
    const soundIcon = document.getElementById('sound-icon');

    function updateSoundUI() {
      if (soundIcon) soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      document.body.dataset.sound = soundEnabled ? 'enabled' : 'disabled';
    }
    updateSoundUI();

    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('portfolio_sound', soundEnabled ? 'enabled' : 'disabled');
        updateSoundUI();
        if (soundEnabled) playSciFiSound(600, 0.08, 'sine');
        showToast(soundEnabled ? '🔊 Sound effects enabled' : '🔇 Sound effects muted');
      });
    }
  }

  function playSciFiSound(freq = 440, duration = 0.06, type = 'sine') {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio not permitted yet
    }
  }

  // ------------------------------------------------------------------------
  // 3. Interactive Constellation / Cyber Background Canvas
  // ------------------------------------------------------------------------
  function initConstellationCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 18000), 70);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 0.8,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Mouse attraction lines
        const mdx = particles[i].x - mouseX;
        const mdy = particles[i].y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.25 * (1 - mdist / 140)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseX, mouseY);
          ctx.stroke();
        }

        // Move and draw particles
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${p.alpha})`;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    }
    draw();
  }

  // ------------------------------------------------------------------------
  // 4. 3D Tilt Cards & Glare Tracking
  // ------------------------------------------------------------------------
  function init3DTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Live Tiruppur IST Clock (Bottom Status Bar)
  // ------------------------------------------------------------------------
  function initTiruppurClock() {
    const clockEl = document.getElementById('local-time-clock');
    if (!clockEl) return;

    function updateClock() {
      const now = new Date();
      // IST format
      const options = {
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      clockEl.textContent = `Tiruppur, TN (IST): ${now.toLocaleTimeString('en-US', options)}`;
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  // ------------------------------------------------------------------------
  // 6. Data Storage & Loading Helper
  // ------------------------------------------------------------------------
  function loadStoredProjects() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not parse stored projects:', e);
    }
    return (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects) ? [...window.PORTFOLIO_DATA.projects] : [];
  }

  function saveProjectsToStorage(projects) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects:', e);
    }
  }

  // ------------------------------------------------------------------------
  // 7. Profile & Status Rendering
  // ------------------------------------------------------------------------
  function initProfileData() {
    const data = window.PORTFOLIO_DATA;
    if (!data || !data.profile) return;

    const profile = data.profile;
    const statusTextEl = document.getElementById('hero-status-text');
    if (statusTextEl && profile.statusBadge) {
      statusTextEl.textContent = profile.statusBadge;
    }

    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ------------------------------------------------------------------------
  // 8. Skills Matrix Rendering
  // ------------------------------------------------------------------------
  function initSkills() {
    const data = window.PORTFOLIO_DATA;
    if (!data || !data.skills) return;

    const container = document.getElementById('skills-container');
    if (!container) return;

    const iconMap = {
      code: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      layout: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
      database: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
      tool: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>',
      sparkles: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>'
    };

    container.innerHTML = data.skills.map(cat => `
      <div class="skill-category-card tilt-card">
        <div class="skill-category-header">
          <div class="skill-cat-icon">
            ${iconMap[cat.icon] || iconMap.code}
          </div>
          <h3 class="skill-cat-title">${escapeHTML(cat.category)}</h3>
        </div>
        <div class="skill-items-list">
          ${cat.items.map(item => `
            <div class="skill-item">
              <div class="skill-item-header">
                <span class="skill-item-name">${escapeHTML(item.name)}</span>
                <span class="skill-item-badge">${escapeHTML(item.level)}</span>
              </div>
              <div class="skill-item-desc">${escapeHTML(item.desc || '')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    init3DTiltCards();
  }

  // ------------------------------------------------------------------------
  // 9. Projects Showcase Engine
  // ------------------------------------------------------------------------
  function initProjects() {
    renderProjectGrid();

    // Filter Buttons
    const filterTabs = document.getElementById('filter-tabs');
    if (filterTabs) {
      filterTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        playSciFiSound(520, 0.05);
        filterTabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter || 'all';
        renderProjectGrid();
      });
    }

    // Search Input
    const searchInput = document.getElementById('project-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderProjectGrid();
      });
    }
  }

  function renderProjectGrid() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    let filtered = activeProjects.filter(p => {
      const matchesCat = (currentFilter === 'all') || (p.category === currentFilter);
      if (!matchesCat) return false;

      if (!searchQuery) return true;

      const title = (p.title || '').toLowerCase();
      const sub = (p.subtitle || '').toLowerCase();
      const desc = (p.shortDescription || '').toLowerCase();
      const techs = (p.technologies || []).join(' ').toLowerCase();

      return title.includes(searchQuery) || sub.includes(searchQuery) || desc.includes(searchQuery) || techs.includes(searchQuery);
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="projects-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" style="margin-bottom: 12px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3 style="font-size: 1.2rem; margin-bottom: 8px;">No projects match your filter</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try selecting 'All Projects' or clear your search input.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(proj => {
      const imgSrc = proj.image || 'Images/Project-2.png';
      const badgeHTML = proj.badge ? `<span class="project-badge-pill">${escapeHTML(proj.badge)}</span>` : '';
      const categoryLabel = proj.categoryLabel || proj.category.toUpperCase();

      return `
        <article class="project-card tilt-card" data-project-id="${escapeHTML(proj.id)}">
          <div class="project-img-wrapper">
            <img src="${escapeHTML(imgSrc)}" alt="${escapeHTML(proj.title)}" class="project-img" onerror="this.src='Images/Project-2.png'" loading="lazy" />
            ${badgeHTML}
          </div>
          <div class="project-content">
            <div class="project-category-tag">${escapeHTML(categoryLabel)}</div>
            <h3 class="project-card-title">${escapeHTML(proj.title)}</h3>
            <p class="project-card-desc">${escapeHTML(proj.shortDescription || proj.subtitle || '')}</p>
            
            <div class="project-tech-pills">
              ${(proj.technologies || []).slice(0, 4).map(tech => `
                <span class="tech-pill">${escapeHTML(tech)}</span>
              `).join('')}
              ${(proj.technologies || []).length > 4 ? `<span class="tech-pill">+${proj.technologies.length - 4}</span>` : ''}
            </div>

            <div class="project-card-footer">
              <div class="project-links">
                ${proj.liveUrl ? `<a href="${escapeHTML(proj.liveUrl)}" target="_blank" class="btn-card-link" title="Open Live Project">Live Demo ↗</a>` : ''}
                ${proj.githubUrl ? `<a href="${escapeHTML(proj.githubUrl)}" target="_blank" class="btn-card-link" style="color: var(--accent-emerald);" title="View Source Code">GitHub ↗</a>` : ''}
              </div>
              <button class="btn-card-details" data-open-project="${escapeHTML(proj.id)}" title="View details and highlights">
                <span>Details</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Reattach Tilt Physics and Details modal
    init3DTiltCards();

    grid.querySelectorAll('[data-open-project]').forEach(btn => {
      btn.addEventListener('click', () => {
        playSciFiSound(700, 0.06);
        const id = btn.dataset.openProject;
        openProjectDetailModal(id);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 10. Project Details Modal
  // ------------------------------------------------------------------------
  function openProjectDetailModal(id) {
    const project = activeProjects.find(p => p.id === id);
    if (!project) return;

    const modal = document.getElementById('project-detail-modal');
    const modalTitle = document.getElementById('modal-project-title');
    const modalBody = document.getElementById('modal-project-body');
    const modalFooter = document.getElementById('modal-project-footer');
    if (!modal || !modalBody) return;

    modalTitle.textContent = project.title;

    const highlightsList = (project.highlights && project.highlights.length > 0)
      ? project.highlights.map(h => `<li style="margin-bottom: 8px;">${escapeHTML(h)}</li>`).join('')
      : `<li>${escapeHTML(project.shortDescription || '')}</li>`;

    modalBody.innerHTML = `
      <div style="margin-bottom: 20px;">
        <p style="font-size: 1.05rem; color: var(--primary); font-weight: 700; margin-bottom: 8px;">
          ${escapeHTML(project.subtitle || project.title)}
        </p>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
          ${escapeHTML(project.shortDescription || '')}
        </p>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.92rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 10px;">
          Key Features & Technical Highlights
        </h4>
        <ul style="color: var(--text-secondary); padding-left: 20px; font-size: 0.92rem; line-height: 1.7;">
          ${highlightsList}
        </ul>
      </div>

      <div style="margin-bottom: 16px;">
        <h4 style="font-size: 0.92rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 10px;">
          Technologies Used
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${(project.technologies || []).map(t => `<span class="tech-pill" style="font-size: 0.82rem; padding: 4px 10px; color: var(--primary); border-color: var(--primary-glow);">${escapeHTML(t)}</span>`).join('')}
        </div>
      </div>
    `;

    modalFooter.innerHTML = `
      <button class="btn-secondary" data-close-modal="project-detail-modal">Close</button>
      ${project.githubUrl ? `<a href="${escapeHTML(project.githubUrl)}" target="_blank" class="btn-secondary" style="border-color: var(--accent-emerald); color: var(--accent-emerald);">GitHub Code ↗</a>` : ''}
      ${project.liveUrl ? `<a href="${escapeHTML(project.liveUrl)}" target="_blank" class="btn-primary">Launch Live App ↗</a>` : ''}
    `;

    modal.showModal();
  }

  // ------------------------------------------------------------------------
  // 11. Education & Certifications Timeline
  // ------------------------------------------------------------------------
  function initEducationAndCerts() {
    const data = window.PORTFOLIO_DATA;
    if (!data) return;

    const eduContainer = document.getElementById('education-timeline');
    if (eduContainer && data.education) {
      eduContainer.innerHTML = data.education.map(item => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content tilt-card">
            <div class="timeline-header">
              <h3 class="timeline-degree">${escapeHTML(item.degree)}</h3>
              <span class="timeline-period">${escapeHTML(item.period)}</span>
            </div>
            <div class="timeline-institution">${escapeHTML(item.institution)}</div>
            <div class="timeline-score-badge">Score: ${escapeHTML(item.grade)} • ${escapeHTML(item.badge || '')}</div>
            <p class="timeline-highlights">${escapeHTML(item.highlights || '')}</p>
          </div>
        </div>
      `).join('');
    }

    const certsContainer = document.getElementById('certs-container');
    if (certsContainer && data.certifications) {
      certsContainer.innerHTML = data.certifications.map(c => `
        <div class="cert-card tilt-card">
          <span class="cert-badge">${escapeHTML(c.badge || 'Certified')}</span>
          <h3 class="cert-title">${escapeHTML(c.title)}</h3>
          <div class="cert-issuer">Issued by ${escapeHTML(c.issuer)}</div>
          <p class="cert-desc">${escapeHTML(c.desc || '')}</p>
        </div>
      `).join('');
    }

    init3DTiltCards();

    // Tab Switcher
    const tabBtns = document.querySelectorAll('.edu-cert-tabs .tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        playSciFiSound(560, 0.05);
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.dataset.tab;
        document.querySelectorAll('.tab-content-pane').forEach(pane => {
          pane.classList.toggle('active', pane.id === targetId);
        });
      });
    });
  }

  // ------------------------------------------------------------------------
  // 12. Dynamic Project Manager (Add / Edit / Export)
  // ------------------------------------------------------------------------
  function initProjectManager() {
    const managerModal = document.getElementById('project-manager-modal');
    const openNavBtn = document.getElementById('btn-open-manager-nav');
    const openSectionBtn = document.getElementById('btn-open-manager');
    const addForm = document.getElementById('add-project-form');
    const exportBtn = document.getElementById('mgr-export-btn');
    const resetBtn = document.getElementById('mgr-reset-btn');

    const openMgr = () => {
      playSciFiSound(650, 0.08);
      renderManagerProjectsList();
      managerModal.showModal();
    };

    if (openNavBtn && managerModal) openNavBtn.addEventListener('click', openMgr);
    if (openSectionBtn && managerModal) openSectionBtn.addEventListener('click', openMgr);

    if (addForm) {
      addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('mgr-title').value.trim();
        const category = document.getElementById('mgr-category').value;
        const subtitle = document.getElementById('mgr-subtitle').value.trim();
        const desc = document.getElementById('mgr-desc').value.trim();
        const rawHighlights = document.getElementById('mgr-highlights').value.trim();
        const rawTech = document.getElementById('mgr-tech').value.trim();
        const badge = document.getElementById('mgr-badge').value.trim();
        const live = document.getElementById('mgr-live').value.trim();
        const github = document.getElementById('mgr-github').value.trim();

        if (!title || !desc) {
          showToast('Please fill in title and description.');
          return;
        }

        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `proj-${Date.now()}`;
        const highlights = rawHighlights ? rawHighlights.split('\n').map(l => l.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean) : [desc];
        const technologies = rawTech ? rawTech.split(',').map(t => t.trim()).filter(Boolean) : ['JavaScript', 'React'];

        const newProject = {
          id,
          title,
          subtitle: subtitle || title,
          category,
          categoryLabel: category.toUpperCase(),
          featured: true,
          image: 'Images/Project-3.png',
          badge: badge || 'New Project',
          shortDescription: desc,
          highlights,
          technologies,
          liveUrl: live || '',
          githubUrl: github || 'https://github.com/varun-program',
          updatedAt: new Date().getFullYear().toString()
        };

        activeProjects.unshift(newProject);
        saveProjectsToStorage(activeProjects);
        renderProjectGrid();
        renderManagerProjectsList();

        addForm.reset();
        playSciFiSound(880, 0.12, 'triangle');
        showToast(`✨ "${title}" added to portfolio!`);
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const fullData = { ...window.PORTFOLIO_DATA, projects: activeProjects };
        const jsCode = `const PORTFOLIO_DATA = ${JSON.stringify(fullData, null, 2)};\n\nif (typeof window !== "undefined") { window.PORTFOLIO_DATA = PORTFOLIO_DATA; }\nif (typeof module !== "undefined" && module.exports) { module.exports = PORTFOLIO_DATA; }`;
        
        navigator.clipboard.writeText(jsCode).then(() => {
          playSciFiSound(900, 0.1);
          showToast('📋 Configuration code copied! Paste it in data/portfolio-data.js');
        }).catch(() => {
          showToast('Failed to copy. Please check clipboard permissions.');
        });
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all projects back to the default resume configuration?')) {
          localStorage.removeItem(STORAGE_KEY);
          activeProjects = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects) ? [...window.PORTFOLIO_DATA.projects] : [];
          renderProjectGrid();
          renderManagerProjectsList();
          showToast('🔄 Projects reset to default.');
        }
      });
    }
  }

  function renderManagerProjectsList() {
    const listContainer = document.getElementById('mgr-projects-list');
    if (!listContainer) return;

    if (activeProjects.length === 0) {
      listContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">No projects in portfolio.</div>';
      return;
    }

    listContainer.innerHTML = activeProjects.map((p, idx) => `
      <div class="manager-proj-item">
        <div class="manager-proj-title">
          <span>${idx + 1}. ${escapeHTML(p.title)}</span>
          <span style="font-size: 0.75rem; color: var(--primary); margin-left: 8px;">(${escapeHTML(p.category)})</span>
        </div>
        <div class="manager-proj-actions">
          <button class="btn-icon-danger" data-delete-project="${escapeHTML(p.id)}" title="Delete project">
            ✕ Delete
          </button>
        </div>
      </div>
    `).join('');

    listContainer.querySelectorAll('[data-delete-project]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.deleteProject;
        if (confirm('Remove this project from your portfolio?')) {
          activeProjects = activeProjects.filter(p => p.id !== id);
          saveProjectsToStorage(activeProjects);
          renderProjectGrid();
          renderManagerProjectsList();
          showToast('Project removed.');
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 13. GitHub API Live Auto-Sync
  // ------------------------------------------------------------------------
  function initGitHubSync() {
    const syncBtn = document.getElementById('btn-sync-github');
    if (!syncBtn) return;

    syncBtn.addEventListener('click', async () => {
      syncBtn.disabled = true;
      syncBtn.innerHTML = '<span>Syncing...</span>';
      showToast('🔄 Syncing public repos from GitHub...');

      try {
        const res = await fetch('https://api.github.com/users/varun-program/repos?sort=updated&per_page=8');
        if (!res.ok) throw new Error('GitHub API responded with ' + res.status);

        const repos = await res.json();
        let added = 0;

        repos.forEach(repo => {
          if (repo.fork) return;
          const exists = activeProjects.find(p => p.id === repo.name || p.githubUrl === repo.html_url);
          if (!exists) {
            const lang = repo.language || 'JavaScript';
            let cat = 'javascript';
            if (lang.toLowerCase().includes('react')) cat = 'react';
            else if (lang.toLowerCase().includes('java')) cat = 'fullstack';
            else if (repo.name.toLowerCase().includes('ai')) cat = 'ai';

            activeProjects.push({
              id: repo.name,
              title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              subtitle: repo.description || 'Public GitHub Repository',
              category: cat,
              categoryLabel: lang,
              featured: false,
              image: 'Images/Project-2.png',
              badge: `⭐ ${repo.stargazers_count || 0}`,
              shortDescription: repo.description || 'Open source software repository on GitHub.',
              highlights: [
                `Primary Technology: ${lang}`,
                `Live stats: ${repo.stargazers_count || 0} stars, ${repo.forks_count || 0} forks.`,
                `Updated: ${new Date(repo.updated_at).toLocaleDateString()}`
              ],
              technologies: [lang, 'Git', 'GitHub'],
              liveUrl: repo.homepage || repo.html_url,
              githubUrl: repo.html_url,
              updatedAt: new Date(repo.updated_at).getFullYear().toString()
            });
            added++;
          }
        });

        if (added > 0) {
          saveProjectsToStorage(activeProjects);
          renderProjectGrid();
          playSciFiSound(800, 0.1);
          showToast(`✅ Synced! Added ${added} new repositories.`);
        } else {
          showToast('✅ All GitHub repositories are already up to date.');
        }
      } catch (e) {
        showToast('⚠️ Could not connect to GitHub API.');
      } finally {
        syncBtn.disabled = false;
        syncBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          <span>Sync GitHub</span>
        `;
      }
    });
  }

  // ------------------------------------------------------------------------
  // 14. Interactive Command Palette (Cmd+K / Ctrl+K)
  // ------------------------------------------------------------------------
  function initCommandPalette() {
    const paletteModal = document.getElementById('cmd-palette-modal');
    const searchInput = document.getElementById('cmd-search-input');
    const resultsContainer = document.getElementById('cmd-results');
    const triggerBtn = document.getElementById('btn-cmd-palette');

    if (!paletteModal || !resultsContainer) return;

    const commands = [
      { label: 'Go to Featured Projects', badge: 'Section', action: () => scrollToSection('projects') },
      { label: 'Go to Technical Skills', badge: 'Section', action: () => scrollToSection('skills') },
      { label: 'Go to Education Timeline', badge: 'Section', action: () => scrollToSection('education') },
      { label: 'Go to Contact & Connect', badge: 'Section', action: () => scrollToSection('contact') },
      { label: 'View Full Resume Overview', badge: 'Modal', action: () => document.getElementById('resume-modal')?.showModal() },
      { label: 'Open Project Manager (Add Project)', badge: 'Manager', action: () => document.getElementById('project-manager-modal')?.showModal() },
      { label: 'Launch Developer CLI Terminal', badge: 'CLI', action: () => document.getElementById('terminal-cli-modal')?.showModal() },
      { label: 'Copy Email: varunyt.sai@outlook.com', badge: 'Copy', action: () => copyText('varunyt.sai@outlook.com') },
      { label: 'Copy Phone: +91 8825677192', badge: 'Copy', action: () => copyText('+918825677192') },
      { label: 'Sync GitHub Repositories', badge: 'API', action: () => document.getElementById('btn-sync-github')?.click() },
      { label: 'Toggle Sci-Fi Audio FX', badge: 'Audio', action: () => document.getElementById('btn-sound-toggle')?.click() }
    ];

    function renderResults(query = '') {
      const q = query.toLowerCase();
      const filtered = commands.filter(c => c.label.toLowerCase().includes(q) || c.badge.toLowerCase().includes(q));

      if (filtered.length === 0) {
        resultsContainer.innerHTML = '<div style="padding: 16px 20px; color: var(--text-muted); font-size: 0.88rem;">No matching commands found.</div>';
        return;
      }

      resultsContainer.innerHTML = filtered.map((c, i) => `
        <div class="cmd-item ${i === 0 ? 'selected' : ''}" data-cmd-index="${i}">
          <div class="cmd-item-left">
            <span>⚡ ${escapeHTML(c.label)}</span>
          </div>
          <span class="cmd-badge">${escapeHTML(c.badge)}</span>
        </div>
      `).join('');

      resultsContainer.querySelectorAll('.cmd-item').forEach((el, idx) => {
        el.addEventListener('click', () => {
          filtered[idx].action();
          paletteModal.close();
        });
      });
    }

    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

    function copyText(txt) {
      navigator.clipboard.writeText(txt).then(() => showToast(`📋 Copied: ${txt}`));
    }

    // Keydown listeners for Cmd+K / Ctrl+K
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        playSciFiSound(750, 0.07);
        renderResults();
        paletteModal.showModal();
        if (searchInput) searchInput.focus();
      }
    });

    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        playSciFiSound(750, 0.07);
        renderResults();
        paletteModal.showModal();
        if (searchInput) searchInput.focus();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderResults(e.target.value);
      });
    }
  }

  // ------------------------------------------------------------------------
  // 15. Interactive Developer CLI Terminal Shell
  // ------------------------------------------------------------------------
  function initTerminalCLI() {
    const cliModal = document.getElementById('terminal-cli-modal');
    const triggerBtn = document.getElementById('btn-open-terminal');
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');

    if (!cliModal || !cliInput || !cliOutput) return;

    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        playSciFiSound(600, 0.08);
        cliModal.showModal();
        cliInput.focus();
      });
    }

    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = cliInput.value.trim().toLowerCase();
        if (!cmd) return;
        cliInput.value = '';

        playSciFiSound(500, 0.04);
        printLine(`varun@portfolio:~$ ${cmd}`, '#10b981');

        handleCommand(cmd);
        cliOutput.scrollTop = cliOutput.scrollHeight;
      }
    });

    function printLine(text, color = '#cbd5e1') {
      const p = document.createElement('p');
      p.style.color = color;
      p.style.margin = '4px 0';
      p.innerHTML = text;
      cliOutput.appendChild(p);
    }

    function handleCommand(cmd) {
      switch (cmd) {
        case 'help':
          printLine('Available commands:');
          printLine('  <span class="cli-highlight">skills</span>      - Output full technical stack');
          printLine('  <span class="cli-highlight">projects</span>    - List core production projects');
          printLine('  <span class="cli-highlight">education</span>   - View degree & college milestones');
          printLine('  <span class="cli-highlight">contact</span>     - Show direct email & phone');
          printLine('  <span class="cli-highlight">hire</span>        - Open interview inquiry');
          printLine('  <span class="cli-highlight">clear</span>       - Clear the terminal');
          printLine('  <span class="cli-highlight">exit</span>        - Close terminal shell');
          break;
        case 'skills':
          printLine('Languages: Java, JavaScript (ES6+)');
          printLine('Frontend: React.js, HTML5, CSS3, Modern UI Systems');
          printLine('Backend & DB: Node.js, Express, SQL, MongoDB');
          printLine('Tools & AI: Git, GitHub, Figma, Vercel, Antigravity, Claude');
          break;
        case 'projects':
          printLine('1. SmartExpense AI (React.js, Node.js, OCR AI Scanner)');
          printLine('2. Upgrade Finance (Privacy-first offline finance tracker)');
          printLine('3. Event Registration Portal (React, Admin Panel, CSV Export)');
          printLine('4. Weather Application (JavaScript API integration)');
          break;
        case 'education':
          printLine('• B.Tech IT (2023-2027) | VSB College of Engineering — 75.4%');
          printLine('• Diploma CSE (2021-2023) | Konghu Vellalar Polytechnic — 73%');
          printLine('• SSLC (2020-2021) | Bharathi Matric — 100%');
          break;
        case 'contact':
          printLine('Email: varunyt.sai@outlook.com');
          printLine('Phone: +91 8825677192');
          printLine('GitHub: https://github.com/varun-program');
          printLine('LinkedIn: https://www.linkedin.com/in/varun-g-54a683284');
          break;
        case 'hire':
          printLine('⚡ Status: Available for Developer Internships & Roles!');
          printLine('Opening mail client to varunyt.sai@outlook.com...');
          window.location.href = 'mailto:varunyt.sai@outlook.com?subject=Internship%20Offer%20for%20Varun%20G';
          break;
        case 'clear':
          cliOutput.innerHTML = '';
          break;
        case 'exit':
          cliModal.close();
          break;
        default:
          printLine(`Command not found: "${cmd}". Type <span class="cli-highlight">'help'</span> for list of commands.`, '#ef4444');
      }
    }
  }

  // ------------------------------------------------------------------------
  // 16. Recruiter Mode 30-Second Fast Track Toggle
  // ------------------------------------------------------------------------
  function initRecruiterMode() {
    const recruiterBtn = document.getElementById('btn-recruiter-mode');
    const drawer = document.getElementById('recruiter-drawer');
    const closeBtn = document.getElementById('btn-close-recruiter');
    const resumeBtn = document.getElementById('btn-recruiter-resume');

    if (recruiterBtn && drawer) {
      recruiterBtn.addEventListener('click', () => {
        const isHidden = drawer.style.display === 'none';
        drawer.style.display = isHidden ? 'block' : 'none';
        if (isHidden) {
          playSciFiSound(640, 0.08);
          drawer.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        drawer.style.display = 'none';
      });
    }

    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => {
        document.getElementById('resume-modal')?.showModal();
      });
    }
  }

  // ------------------------------------------------------------------------
  // 17. 1-Click Clipboard Copy & Toast Feedback
  // ------------------------------------------------------------------------
  function initCopyButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-copy]');
      if (!btn) return;

      const text = btn.dataset.copy;
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        playSciFiSound(800, 0.06);
        showToast(`📋 Copied: ${text}`);
      }).catch(() => {
        showToast('Failed to copy to clipboard.');
      });
    });
  }

  function showToast(message, duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${escapeHTML(message)}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ------------------------------------------------------------------------
  // 18. Native Modal Controls (<dialog>)
  // ------------------------------------------------------------------------
  function initModalListeners() {
    const resumeBtn = document.getElementById('btn-view-resume');
    const resumeModal = document.getElementById('resume-modal');
    if (resumeBtn && resumeModal) {
      resumeBtn.addEventListener('click', () => {
        playSciFiSound(600, 0.06);
        resumeModal.showModal();
      });
    }

    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('[data-close-modal]');
      if (closeBtn) {
        const modalId = closeBtn.dataset.closeModal;
        const modal = document.getElementById(modalId);
        if (modal && typeof modal.close === 'function') {
          modal.close();
        }
      }
    });

    document.querySelectorAll('dialog.custom-modal').forEach(dialog => {
      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
          dialog.close();
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 19. Navbar ScrollSpy & Mobile Navigation
  // ------------------------------------------------------------------------
  function initNavbarScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
        });
      });
    }

    window.addEventListener('scroll', () => {
      let current = '';
      const scrollPos = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 20. Contact Form Direct Mail
  // ------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const msg = document.getElementById('sender-message').value.trim();

      const subject = encodeURIComponent(`Internship / Project Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Varun,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}\n`);

      playSciFiSound(880, 0.12);
      showToast('🚀 Opening email client to send message...');
      window.location.href = `mailto:varunyt.sai@outlook.com?subject=${subject}&body=${body}`;
    });
  }

  // ------------------------------------------------------------------------
  // Helper: Sanitize HTML
  // ------------------------------------------------------------------------
  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});

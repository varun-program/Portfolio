/**
 * =========================================================================
 * VARUN G - DYNAMIC PORTFOLIO ENGINE & PROJECT MANAGER
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. State Management
  const STORAGE_KEY = 'portfolio_custom_projects_v1';
  let activeProjects = loadStoredProjects();
  let currentFilter = 'all';
  let searchQuery = '';

  // Initialize UI components
  initProfileData();
  initSkills();
  initProjects();
  initEducationAndCerts();
  initProjectManager();
  initGitHubSync();
  initCopyButtons();
  initModalListeners();
  initNavbarScrollSpy();
  initContactForm();

  // ------------------------------------------------------------------------
  // Helper: Load & Store Custom Projects
  // ------------------------------------------------------------------------
  function loadStoredProjects() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Could not parse stored projects:', e);
    }
    return (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects) ? [...window.PORTFOLIO_DATA.projects] : [];
  }

  function saveProjectsToStorage(projects) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  }

  // ------------------------------------------------------------------------
  // 2. Profile & Hero Data Rendering
  // ------------------------------------------------------------------------
  function initProfileData() {
    const data = window.PORTFOLIO_DATA;
    if (!data || !data.profile) return;

    const profile = data.profile;
    
    // Status text
    const statusTextEl = document.getElementById('hero-status-text');
    if (statusTextEl && profile.statusBadge) {
      statusTextEl.textContent = profile.statusBadge;
    }

    // Dynamic Year in Footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ------------------------------------------------------------------------
  // 3. Skills Matrix Rendering
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
      <div class="skill-category-card">
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
  }

  // ------------------------------------------------------------------------
  // 4. Projects Showcase Engine
  // ------------------------------------------------------------------------
  function initProjects() {
    renderProjectGrid();

    // Filter Buttons
    const filterTabs = document.getElementById('filter-tabs');
    if (filterTabs) {
      filterTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

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
      // Category check
      const matchesCat = (currentFilter === 'all') || (p.category === currentFilter);
      if (!matchesCat) return false;

      // Search query check
      if (!searchQuery) return true;

      const title = (p.title || '').toLowerCase();
      const sub = (p.subtitle || '').toLowerCase();
      const desc = (p.shortDescription || '').toLowerCase();
      const techs = (p.technologies || []).join(' ').toLowerCase();

      return title.includes(searchQuery) || 
             sub.includes(searchQuery) || 
             desc.includes(searchQuery) || 
             techs.includes(searchQuery);
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="projects-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" style="margin-bottom: 12px;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3 style="font-size: 1.2rem; margin-bottom: 8px;">No projects found</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">Try adjusting your filter category or search keyword.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(proj => {
      const imgSrc = proj.image || 'Images/Project-2.png';
      const badgeHTML = proj.badge ? `<span class="project-badge-pill">${escapeHTML(proj.badge)}</span>` : '';
      const categoryLabel = proj.categoryLabel || proj.category.toUpperCase();

      return `
        <article class="project-card" data-project-id="${escapeHTML(proj.id)}">
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
                ${proj.githubUrl ? `<a href="${escapeHTML(proj.githubUrl)}" target="_blank" class="btn-card-link" style="color: var(--accent-emerald);" title="View GitHub Code">GitHub ↗</a>` : ''}
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

    // Attach click handlers to "Details" triggers
    grid.querySelectorAll('[data-open-project]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.openProject;
        openProjectDetailModal(id);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 5. Project Details Modal
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
        <p style="font-size: 1.05rem; color: var(--primary); font-weight: 600; margin-bottom: 8px;">
          ${escapeHTML(project.subtitle || project.title)}
        </p>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 16px;">
          ${escapeHTML(project.shortDescription || '')}
        </p>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 10px;">
          Key Features & Resume Highlights
        </h4>
        <ul style="color: var(--text-secondary); padding-left: 20px; font-size: 0.92rem; line-height: 1.7;">
          ${highlightsList}
        </ul>
      </div>

      <div style="margin-bottom: 16px;">
        <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 10px;">
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
  // 6. Education & Certifications Rendering
  // ------------------------------------------------------------------------
  function initEducationAndCerts() {
    const data = window.PORTFOLIO_DATA;
    if (!data) return;

    // 1. Education Timeline
    const eduContainer = document.getElementById('education-timeline');
    if (eduContainer && data.education) {
      eduContainer.innerHTML = data.education.map(item => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
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

    // 2. Certifications Grid
    const certsContainer = document.getElementById('certs-container');
    if (certsContainer && data.certifications) {
      certsContainer.innerHTML = data.certifications.map(c => `
        <div class="cert-card">
          <span class="cert-badge">${escapeHTML(c.badge || 'Certified')}</span>
          <h3 class="cert-title">${escapeHTML(c.title)}</h3>
          <div class="cert-issuer">Issued by ${escapeHTML(c.issuer)}</div>
          <p class="cert-desc">${escapeHTML(c.desc || '')}</p>
        </div>
      `).join('');
    }

    // Tab Switcher
    const tabBtns = document.querySelectorAll('.edu-cert-tabs .tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
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
  // 7. Interactive Project Manager (Add / Edit / Export)
  // ------------------------------------------------------------------------
  function initProjectManager() {
    const managerModal = document.getElementById('project-manager-modal');
    const openNavBtn = document.getElementById('btn-open-manager-nav');
    const openSectionBtn = document.getElementById('btn-open-manager');
    const addForm = document.getElementById('add-project-form');
    const exportBtn = document.getElementById('mgr-export-btn');
    const resetBtn = document.getElementById('mgr-reset-btn');

    if (openNavBtn && managerModal) {
      openNavBtn.addEventListener('click', () => {
        renderManagerProjectsList();
        managerModal.showModal();
      });
    }

    if (openSectionBtn && managerModal) {
      openSectionBtn.addEventListener('click', () => {
        renderManagerProjectsList();
        managerModal.showModal();
      });
    }

    // Add New Project Submit Handler
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
          showToast('Please fill in the project title and description.');
          return;
        }

        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `proj-${Date.now()}`;
        
        const highlights = rawHighlights
          ? rawHighlights.split('\n').map(l => l.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean)
          : [desc];

        const technologies = rawTech
          ? rawTech.split(',').map(t => t.trim()).filter(Boolean)
          : ['JavaScript', 'Web'];

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

        // Add to state and save
        activeProjects.unshift(newProject);
        saveProjectsToStorage(activeProjects);
        renderProjectGrid();
        renderManagerProjectsList();

        addForm.reset();
        showToast(`✨ "${title}" added successfully!`);
      });
    }

    // Export / Copy Config Code
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const fullData = { ...window.PORTFOLIO_DATA, projects: activeProjects };
        const jsCode = `const PORTFOLIO_DATA = ${JSON.stringify(fullData, null, 2)};\n\nif (typeof window !== "undefined") { window.PORTFOLIO_DATA = PORTFOLIO_DATA; }\nif (typeof module !== "undefined" && module.exports) { module.exports = PORTFOLIO_DATA; }`;
        
        navigator.clipboard.writeText(jsCode).then(() => {
          showToast('📋 Configuration code copied to clipboard! Paste it in data/portfolio-data.js');
        }).catch(() => {
          showToast('Failed to copy. Please allow clipboard permissions.');
        });
      });
    }

    // Reset Defaults
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all projects back to the default resume configuration?')) {
          localStorage.removeItem(STORAGE_KEY);
          activeProjects = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects) ? [...window.PORTFOLIO_DATA.projects] : [];
          renderProjectGrid();
          renderManagerProjectsList();
          showToast('🔄 Projects reset to default resume list.');
        }
      });
    }
  }

  function renderManagerProjectsList() {
    const listContainer = document.getElementById('mgr-projects-list');
    if (!listContainer) return;

    if (activeProjects.length === 0) {
      listContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">No active projects.</div>';
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

    // Attach delete listeners
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
  // 8. GitHub API Live Repository Sync
  // ------------------------------------------------------------------------
  function initGitHubSync() {
    const syncBtn = document.getElementById('btn-sync-github');
    if (!syncBtn) return;

    syncBtn.addEventListener('click', async () => {
      syncBtn.disabled = true;
      syncBtn.innerHTML = '<span>Syncing...</span>';
      showToast('🔄 Fetching latest repositories from GitHub...');

      try {
        const res = await fetch('https://api.github.com/users/varun-program/repos?sort=updated&per_page=8');
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

        const repos = await res.json();
        let addedCount = 0;

        repos.forEach(repo => {
          if (repo.fork) return; // Skip forks
          const existing = activeProjects.find(p => p.id === repo.name || p.githubUrl === repo.html_url);
          if (!existing) {
            const lang = repo.language || 'JavaScript';
            let cat = 'javascript';
            if (lang.toLowerCase().includes('react')) cat = 'react';
            else if (lang.toLowerCase().includes('java')) cat = 'fullstack';
            else if (repo.name.toLowerCase().includes('ai')) cat = 'ai';

            activeProjects.push({
              id: repo.name,
              title: repo.name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              subtitle: repo.description || 'Public GitHub Open Source Repository',
              category: cat,
              categoryLabel: lang,
              featured: false,
              image: 'Images/Project-2.png',
              badge: `⭐ ${repo.stargazers_count || 0}`,
              shortDescription: repo.description || 'Open-source project hosted on GitHub by Varun G.',
              highlights: [
                `Primary Language: ${lang}`,
                `Open source repository with ${repo.stargazers_count || 0} stars and ${repo.forks_count || 0} forks.`,
                `Last updated: ${new Date(repo.updated_at).toLocaleDateString()}`
              ],
              technologies: [lang, 'Git', 'GitHub'],
              liveUrl: repo.homepage || repo.html_url,
              githubUrl: repo.html_url,
              updatedAt: new Date(repo.updated_at).getFullYear().toString()
            });
            addedCount++;
          }
        });

        if (addedCount > 0) {
          saveProjectsToStorage(activeProjects);
          renderProjectGrid();
          showToast(`✅ Synced! Added ${addedCount} new repositories from GitHub.`);
        } else {
          showToast('✅ All GitHub repositories are already up to date!');
        }
      } catch (err) {
        console.error('GitHub Sync Error:', err);
        showToast('⚠️ Could not connect to GitHub API. Please check connection.');
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
  // 9. 1-Click Clipboard Copy & Toast Feedback
  // ------------------------------------------------------------------------
  function initCopyButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-copy]');
      if (!btn) return;

      const text = btn.dataset.copy;
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
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
  // 10. Native Modal Listeners (<dialog>)
  // ------------------------------------------------------------------------
  function initModalListeners() {
    // Open Resume Modal
    const resumeBtn = document.getElementById('btn-view-resume');
    const resumeModal = document.getElementById('resume-modal');
    if (resumeBtn && resumeModal) {
      resumeBtn.addEventListener('click', () => {
        resumeModal.showModal();
      });
    }

    // Close button handlers for all modals
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

    // Close on backdrop click
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
  // 11. Navbar ScrollSpy & Mobile Navigation
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

      // Close menu on link click
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
        });
      });
    }

    window.addEventListener('scroll', () => {
      let currentSection = '';
      const scrollPos = window.scrollY + 200;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          currentSection = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 12. Contact Form Direct Mail Handling
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

      showToast('🚀 Opening your email client to send message...');
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

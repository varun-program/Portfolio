/**
 * =========================================================================
 * VARUN G — DEVELOPER PORTFOLIO ENGINE (WITH OWNER SECURITY)
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'portfolio_custom_projects_v1';
  const AUTH_KEY = 'portfolio_owner_authenticated_v1';
  const DEFAULT_PIN = '2025';

  let activeProjects = loadStoredProjects();
  let currentFilter = 'all';
  let searchQuery = '';

  // Initialize Modules
  initProfileData();
  initSkills();
  initProjects();
  initEducationAndCerts();
  initOwnerSecurity();
  initProjectManager();
  initGitHubSync();
  initCopyButtons();
  initModalListeners();
  initNavbarScrollSpy();
  initContactForm();

  // ------------------------------------------------------------------------
  // 1. Data Storage Helper
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
      console.error('Failed to save projects to localStorage:', e);
    }
  }

  // ------------------------------------------------------------------------
  // 2. Owner Security & Protected Access
  // ------------------------------------------------------------------------
  function isOwnerAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  function setOwnerAuthenticated(status = true) {
    if (status) {
      sessionStorage.setItem(AUTH_KEY, 'true');
    } else {
      sessionStorage.removeItem(AUTH_KEY);
    }
    updateAdminVisibility();
  }

  function updateAdminVisibility() {
    const adminBar = document.getElementById('admin-actions-bar');
    if (adminBar) {
      adminBar.style.display = isOwnerAuthenticated() ? 'flex' : 'none';
    }
  }

  function promptOwnerAuth(callback) {
    if (isOwnerAuthenticated()) {
      if (typeof callback === 'function') callback();
      return;
    }

    const authModal = document.getElementById('owner-auth-modal');
    const pinInput = document.getElementById('owner-pin-input');
    const pinForm = document.getElementById('owner-pin-form');

    if (!authModal || !pinForm) return;

    authModal.showModal();
    if (pinInput) {
      pinInput.value = '';
      pinInput.focus();
    }

    pinForm.onsubmit = (e) => {
      e.preventDefault();
      const enteredPin = (pinInput ? pinInput.value.trim() : '');
      const validPin = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.adminPin) ? window.PORTFOLIO_DATA.adminPin : DEFAULT_PIN;

      if (enteredPin === validPin) {
        setOwnerAuthenticated(true);
        authModal.close();
        showToast('🔓 Owner access unlocked.');
        if (typeof callback === 'function') callback();
      } else {
        showToast('❌ Incorrect PIN. Access denied.');
        if (pinInput) pinInput.value = '';
      }
    };
  }

  function initOwnerSecurity() {
    // Check URL parameters (e.g. ?admin=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('admin') || urlParams.has('edit')) {
      promptOwnerAuth();
    }

    updateAdminVisibility();

    // Secret Keyboard Shortcut: Ctrl + Shift + A or Cmd + Shift + A
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        promptOwnerAuth(() => {
          const managerModal = document.getElementById('project-manager-modal');
          if (managerModal) {
            renderManagerProjectsList();
            managerModal.showModal();
          }
        });
      }
    });

    // Footer Lock Button
    const footerLockBtn = document.getElementById('btn-footer-lock');
    if (footerLockBtn) {
      footerLockBtn.addEventListener('click', () => {
        promptOwnerAuth(() => {
          const managerModal = document.getElementById('project-manager-modal');
          if (managerModal) {
            renderManagerProjectsList();
            managerModal.showModal();
          }
        });
      });
    }
  }

  // ------------------------------------------------------------------------
  // 3. Profile & Year Init
  // ------------------------------------------------------------------------
  function initProfileData() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // ------------------------------------------------------------------------
  // 4. Skills Matrix Rendering
  // ------------------------------------------------------------------------
  function initSkills() {
    const data = window.PORTFOLIO_DATA;
    if (!data || !data.skills) return;

    const container = document.getElementById('skills-container');
    if (!container) return;

    const iconMap = {
      code: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      layout: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
      database: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
      tool: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>'
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
  // 5. Projects Showcase Engine
  // ------------------------------------------------------------------------
  function initProjects() {
    renderProjectGrid();

    // Filter Buttons
    const filterTabs = document.getElementById('filter-tabs');
    if (filterTabs) {
      filterTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (!btn) return;

        filterTabs.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
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
          <p>No projects match your filter.</p>
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
                ${proj.liveUrl ? `<a href="${escapeHTML(proj.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-link">Live Demo ↗</a>` : ''}
                ${proj.githubUrl ? `<a href="${escapeHTML(proj.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-card-link" style="color: var(--accent-green);">GitHub ↗</a>` : ''}
              </div>
              <button class="btn-card-details" data-open-project="${escapeHTML(proj.id)}">
                Details
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    grid.querySelectorAll('[data-open-project]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.openProject;
        openProjectDetailModal(id);
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. Project Details Modal
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
      ? project.highlights.map(h => `<li style="margin-bottom: 6px;">${escapeHTML(h)}</li>`).join('')
      : `<li>${escapeHTML(project.shortDescription || '')}</li>`;

    modalBody.innerHTML = `
      <div style="margin-bottom: 18px;">
        <p style="font-size: 1.05rem; color: var(--primary); font-weight: 600; margin-bottom: 6px;">
          ${escapeHTML(project.subtitle || project.title)}
        </p>
        <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6; margin-bottom: 14px;">
          ${escapeHTML(project.shortDescription || '')}
        </p>
      </div>

      <div style="margin-bottom: 18px;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 8px;">
          Highlights
        </h4>
        <ul style="color: var(--text-secondary); padding-left: 18px; font-size: 0.92rem; line-height: 1.6;">
          ${highlightsList}
        </ul>
      </div>

      <div style="margin-bottom: 14px;">
        <h4 style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin-bottom: 8px;">
          Technologies Used
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${(project.technologies || []).map(t => `<span class="tech-pill" style="font-size: 0.8rem; padding: 3px 8px;">${escapeHTML(t)}</span>`).join('')}
        </div>
      </div>
    `;

    modalFooter.innerHTML = `
      <button class="btn-secondary" data-close-modal="project-detail-modal">Close</button>
      ${project.githubUrl ? `<a href="${escapeHTML(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="border-color: var(--accent-green); color: var(--accent-green);">GitHub ↗</a>` : ''}
      ${project.liveUrl ? `<a href="${escapeHTML(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn-primary">View App ↗</a>` : ''}
    `;

    modal.showModal();
  }

  // ------------------------------------------------------------------------
  // 7. Education & Certifications
  // ------------------------------------------------------------------------
  function initEducationAndCerts() {
    const data = window.PORTFOLIO_DATA;
    if (!data) return;

    const eduContainer = document.getElementById('education-timeline');
    if (eduContainer && data.education) {
      eduContainer.innerHTML = data.education.map(item => `
        <div class="edu-item">
          <div class="edu-header">
            <h3 class="edu-degree">${escapeHTML(item.degree)}</h3>
            <span class="edu-period">${escapeHTML(item.period)}</span>
          </div>
          <div class="edu-inst">${escapeHTML(item.institution)}</div>
          <div class="edu-grade">${escapeHTML(item.grade)} • ${escapeHTML(item.badge || '')}</div>
          <p class="edu-desc">${escapeHTML(item.highlights || '')}</p>
        </div>
      `).join('');
    }

    const certsContainer = document.getElementById('certs-container');
    if (certsContainer && data.certifications) {
      certsContainer.innerHTML = data.certifications.map(c => `
        <div class="cert-item">
          <span class="cert-badge">${escapeHTML(c.badge || 'Certified')}</span>
          <h3 class="cert-title">${escapeHTML(c.title)}</h3>
          <div class="cert-issuer">Issued by ${escapeHTML(c.issuer)}</div>
          <p class="cert-desc">${escapeHTML(c.desc || '')}</p>
        </div>
      `).join('');
    }

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
  // 8. Project Manager (Protected)
  // ------------------------------------------------------------------------
  function initProjectManager() {
    const managerModal = document.getElementById('project-manager-modal');
    const openSectionBtn = document.getElementById('btn-open-manager');
    const addForm = document.getElementById('add-project-form');
    const exportBtn = document.getElementById('mgr-export-btn');
    const resetBtn = document.getElementById('mgr-reset-btn');

    const openMgr = () => {
      promptOwnerAuth(() => {
        renderManagerProjectsList();
        managerModal.showModal();
      });
    };

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
          showToast('Please provide a project title and description.');
          return;
        }

        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `proj-${Date.now()}`;
        const highlights = rawHighlights ? rawHighlights.split('\n').map(l => l.replace(/^[•\-\*]\s*/, '').trim()).filter(Boolean) : [desc];
        const technologies = rawTech ? rawTech.split(',').map(t => t.trim()).filter(Boolean) : ['JavaScript', 'HTML', 'CSS'];

        const newProject = {
          id,
          title,
          subtitle: subtitle || title,
          category,
          categoryLabel: category.toUpperCase(),
          featured: true,
          image: 'Images/Project-3.png',
          badge: badge || 'Project',
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
        showToast(`✨ "${title}" added to portfolio.`);
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const fullData = { ...window.PORTFOLIO_DATA, projects: activeProjects };
        const jsCode = `const PORTFOLIO_DATA = ${JSON.stringify(fullData, null, 2)};\n\nif (typeof window !== "undefined") { window.PORTFOLIO_DATA = PORTFOLIO_DATA; }\nif (typeof module !== "undefined" && module.exports) { module.exports = PORTFOLIO_DATA; }`;
        
        navigator.clipboard.writeText(jsCode).then(() => {
          showToast('📋 Configuration code copied! Paste in data/portfolio-data.js');
        }).catch(() => {
          showToast('Failed to copy. Please check clipboard permissions.');
        });
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset all projects back to default configuration?')) {
          localStorage.removeItem(STORAGE_KEY);
          activeProjects = (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects) ? [...window.PORTFOLIO_DATA.projects] : [];
          renderProjectGrid();
          renderManagerProjectsList();
          showToast('Projects reset to default.');
        }
      });
    }
  }

  function renderManagerProjectsList() {
    const listContainer = document.getElementById('mgr-projects-list');
    if (!listContainer) return;

    if (activeProjects.length === 0) {
      listContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem;">No active projects in portfolio.</div>';
      return;
    }

    listContainer.innerHTML = activeProjects.map((p, idx) => `
      <div class="manager-item">
        <div class="manager-item-title">
          <span>${idx + 1}. ${escapeHTML(p.title)}</span>
          <span style="font-size: 0.75rem; color: var(--primary); margin-left: 6px;">(${escapeHTML(p.category)})</span>
        </div>
        <button class="btn-delete-proj" data-delete-project="${escapeHTML(p.id)}" title="Delete project">
          Delete
        </button>
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
  // 9. GitHub API Live Sync (Protected)
  // ------------------------------------------------------------------------
  function initGitHubSync() {
    const syncBtn = document.getElementById('btn-sync-github');
    if (!syncBtn) return;

    syncBtn.addEventListener('click', async () => {
      syncBtn.disabled = true;
      syncBtn.innerHTML = '<span>Syncing...</span>';
      showToast('Fetching latest repositories from GitHub...');

      try {
        const res = await fetch('https://api.github.com/users/varun-program/repos?sort=updated&per_page=8');
        if (!res.ok) throw new Error('GitHub API error');

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
              shortDescription: repo.description || 'Open-source software repository on GitHub.',
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
          showToast(`Synced! Added ${added} new repositories.`);
        } else {
          showToast('All GitHub repositories are already up to date.');
        }
      } catch (e) {
        showToast('Could not connect to GitHub API.');
      } finally {
        syncBtn.disabled = false;
        syncBtn.innerHTML = 'Sync from GitHub';
      }
    });
  }

  // ------------------------------------------------------------------------
  // 10. Clipboard Copy & Toast Feedback
  // ------------------------------------------------------------------------
  function initCopyButtons() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-copy]');
      if (!btn) return;

      const text = btn.dataset.copy;
      if (!text) return;

      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied: ${text}`);
      }).catch(() => {
        showToast('Failed to copy to clipboard.');
      });
    });
  }

  function showToast(message, duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  // ------------------------------------------------------------------------
  // 11. Modal Controls
  // ------------------------------------------------------------------------
  function initModalListeners() {
    const resumeBtn = document.getElementById('btn-view-resume');
    const resumeModal = document.getElementById('resume-modal');
    if (resumeBtn && resumeModal) {
      resumeBtn.addEventListener('click', () => {
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

    document.querySelectorAll('dialog.modal-dialog').forEach(dialog => {
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
  // 12. Navbar ScrollSpy & Mobile Navigation
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
      const scrollPos = window.scrollY + 160;

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
  // 13. Contact Form
  // ------------------------------------------------------------------------
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const msg = document.getElementById('sender-message').value.trim();

      const subject = encodeURIComponent(`Message from ${name}`);
      const body = encodeURIComponent(`Hi Varun,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${msg}\n`);

      showToast('Opening email client...');
      window.location.href = `mailto:varunyt.sai@outlook.com?subject=${subject}&body=${body}`;
    });
  }

  // Helper
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

/**
 * Personal Portfolio - Jatin Jangir
 * Step 2: GitHub Profile and Projects Integration
 */

/**
 * Verified Projects Data Structure
 * Each entry strictly supports: title, description, technologies, githubUrl, liveUrl.
 * Empty strings are used for unavailable or pending URLs.
 */
const projectsData = [
  {
    number: "01",
    title: "Python Programs Collection",
    description: "A collection of Python programs, including factorial, Fibonacci, and structure-to-dictionary conversion, with an updated README.",
    technologies: ["Python", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/jatinjangir093-lgtm/python_basic_25bcon1380",
    liveUrl: ""
  },
  {
    number: "02",
    title: "Messy Python Code Improvement",
    description: "A Python code-improvement exercise using AI assistance to make a messy script more readable and maintainable.",
    technologies: ["Python", "AI-assisted development"],
    githubUrl: "https://github.com/jatinjangir093-lgtm/correcting-grade-25BCON1380",
    liveUrl: ""
  },
  {
    number: "03",
    title: "Bug Fixing Using Cursor AI",
    description: "A debugging exercise involving identifying and correcting errors in a program using Cursor AI.",
    technologies: ["Programming", "Debugging", "Cursor AI"],
    githubUrl: "",
    liveUrl: ""
  },
  {
    number: "04",
    title: "Interactive Quiz Application",
    description: "The interactive quiz application developed in Lecture 10.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/jatinjangir093-lgtm/QUIZ-PE",
    liveUrl: ""
  },
  {
    number: "05",
    title: "Book Reading List Application",
    description: "The reading-list application developed in Lecture 11. Include its deployed application URL when available.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/jatinjangir093-lgtm/jatinjangir093-lgtmjatinjangir093-lgtm-Books_reading_list",
    liveUrl: ""
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileMenu) {
    const toggleMenu = (isOpen) => {
      const willBeOpen = typeof isOpen === 'boolean' ? isOpen : !mobileMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', String(willBeOpen));
      mobileMenu.setAttribute('aria-hidden', String(!willBeOpen));
      if (willBeOpen) {
        mobileMenu.classList.add('open');
      } else {
        mobileMenu.classList.remove('open');
      }
    };

    mobileToggle.addEventListener('click', () => {
      toggleMenu();
    });

    // Close menu when a link is clicked
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (
        mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(event.target) &&
        !mobileToggle.contains(event.target)
      ) {
        toggleMenu(false);
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMenu(false);
        mobileToggle.focus();
      }
    });
  }

  // 3. Active Nav Link on Scroll via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  if (sections.length > 0 && desktopNavLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          desktopNavLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => sectionObserver.observe(section));
  }

  // 4. Light/Dark Mode Theme Toggle
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mobileThemeBtn = document.getElementById('mobile-theme-btn');
  const mobileThemeLabel = document.getElementById('mobile-theme-label');

  const updateThemeUI = (theme) => {
    const isLight = theme === 'light';
    const nextThemeLabel = isLight ? 'Switch to dark theme' : 'Switch to light theme';
    const mobileLabelText = isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode';

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', nextThemeLabel);
      themeToggleBtn.setAttribute('title', nextThemeLabel);
    }

    if (mobileThemeBtn) {
      mobileThemeBtn.setAttribute('aria-label', nextThemeLabel);
    }

    if (mobileThemeLabel) {
      mobileThemeLabel.textContent = mobileLabelText;
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeUI(newTheme);
  };

  // Initial UI state setup from active attribute
  const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeUI(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener('click', toggleTheme);
  }

  // 5. Project Search & Technology Filter System
  const searchInput = document.getElementById('project-search');
  const searchClearBtn = document.getElementById('search-clear-btn');
  const technologyFilter = document.getElementById('technology-filter');
  const resultsCount = document.getElementById('results-count');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const emptyResetBtn = document.getElementById('empty-reset-btn');
  const projectsGrid = document.getElementById('projects-grid');
  const projectsEmptyState = document.getElementById('projects-empty-state');
  const projectCards = document.querySelectorAll('.project-card');

  if (searchInput && technologyFilter && projectCards.length > 0) {
    const applyProjectsFilter = () => {
      const query = searchInput.value.trim().toLowerCase();
      const category = technologyFilter.value;

      // Toggle clear 'X' button inside search box
      if (searchClearBtn) {
        searchClearBtn.style.display = searchInput.value.length > 0 ? 'flex' : 'none';
      }

      let visibleCount = 0;

      projectCards.forEach((card) => {
        const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.tech-tag'))
          .map((tag) => tag.textContent.toLowerCase())
          .join(' ');
        const dataTech = card.getAttribute('data-technologies')?.toLowerCase() || '';

        // Query check: matches title, description, or technology tags
        const matchesQuery = query === '' ||
          title.includes(query) ||
          description.includes(query) ||
          tags.includes(query) ||
          dataTech.includes(query);

        // Category filter check based on actual project categories
        let matchesCategory = false;
        if (category === 'all') {
          matchesCategory = true;
        } else if (category === 'python') {
          matchesCategory = dataTech.includes('python') || tags.includes('python');
        } else if (category === 'javascript') {
          matchesCategory = dataTech.includes('javascript') || tags.includes('javascript');
        } else if (category === 'html-css') {
          matchesCategory = dataTech.includes('html') || dataTech.includes('css') || tags.includes('html') || tags.includes('css');
        } else if (category === 'ai-assisted') {
          matchesCategory = dataTech.includes('ai') || tags.includes('ai');
        } else if (category === 'debugging') {
          matchesCategory = dataTech.includes('debug') || dataTech.includes('cursor') || tags.includes('debug') || tags.includes('cursor');
        }

        const isVisible = matchesQuery && matchesCategory;
        card.style.display = isVisible ? '' : 'none';

        if (isVisible) {
          visibleCount++;
        }
      });

      // Update Results Counter text dynamically
      if (resultsCount) {
        if (visibleCount === 0) {
          resultsCount.textContent = 'No projects found';
        } else if (visibleCount === projectCards.length && query === '' && category === 'all') {
          resultsCount.textContent = `${visibleCount} projects`;
        } else if (visibleCount === 1) {
          resultsCount.textContent = '1 project found';
        } else {
          resultsCount.textContent = `${visibleCount} projects found`;
        }
      }

      // Toggle Empty State display vs Grid
      if (projectsEmptyState && projectsGrid) {
        if (visibleCount === 0) {
          projectsGrid.style.display = 'none';
          projectsEmptyState.style.display = 'block';
        } else {
          projectsGrid.style.display = 'grid';
          projectsEmptyState.style.display = 'none';
        }
      }

      // Show reset button whenever an active filter or search query exists
      const isFiltered = query !== '' || category !== 'all';
      if (resetFiltersBtn) {
        resetFiltersBtn.style.display = isFiltered ? 'inline-flex' : 'none';
      }
    };

    // Reset all filters to initial state
    const resetAllFilters = () => {
      searchInput.value = '';
      technologyFilter.value = 'all';
      applyProjectsFilter();
      searchInput.focus();
    };

    // Event listeners for immediate real-time filtering
    searchInput.addEventListener('input', applyProjectsFilter);
    technologyFilter.addEventListener('change', applyProjectsFilter);

    // Escape key in search input clears query
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchInput.value !== '') {
        searchInput.value = '';
        applyProjectsFilter();
      }
    });

    if (searchClearBtn) {
      searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        applyProjectsFilter();
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', resetAllFilters);
    }

    if (emptyResetBtn) {
      emptyResetBtn.addEventListener('click', resetAllFilters);
    }
  }

    // 6. Portfolio chatbot
    const chatPanel = document.getElementById('chat-panel');
    const chatLauncher = document.getElementById('chat-launcher');
    const chatClose = document.getElementById('chat-close');
    const chatNew = document.getElementById('chat-new');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    const chatStatus = document.getElementById('chat-status');

    if (chatPanel && chatLauncher && chatClose && chatNew && chatForm && chatInput && chatSend && chatMessages && chatStatus) {
      const conversation = [];
      const welcomeMessage = "Hi! Ask me about Jatin's education, skills, or projects.";
      const maxHistoryCharacters = 16000;
      let isPending = false;

      const setChatOpen = (isOpen) => {
        chatPanel.hidden = !isOpen;
        chatLauncher.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
          chatInput.focus();
        } else {
          chatLauncher.focus();
        }
      };

      const appendMessage = (role, text) => {
        const message = document.createElement('p');
        message.className = `chat-message chat-message-${role}`;
        message.textContent = text;
        chatMessages.appendChild(message);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      };

      const setPending = (pending) => {
        isPending = pending;
        chatInput.disabled = pending;
        chatSend.disabled = pending || chatInput.value.trim().length === 0;
        chatNew.disabled = pending;
        chatSend.textContent = pending ? 'Sending…' : 'Send';
      };

      const showTyping = (show) => {
        const existing = document.getElementById('chat-typing');
        if (show && !existing) {
          const indicator = document.createElement('p');
          indicator.className = 'chat-message chat-message-assistant chat-typing';
          indicator.id = 'chat-typing';
          indicator.setAttribute('role', 'status');
          indicator.textContent = 'Typing…';
          chatMessages.appendChild(indicator);
        } else if (!show && existing) {
          existing.remove();
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
      };

      const buildRequestMessages = (latestMessage) => {
        let history = [];
        let characterCount = latestMessage.length;

        for (let index = conversation.length - 2; index >= 0; index -= 2) {
          const turn = conversation.slice(index, index + 2);
          const turnLength = turn.reduce((total, item) => total + item.content.length, 0);
          if (characterCount + turnLength > maxHistoryCharacters) break;
          history = [...turn, ...history];
          characterCount += turnLength;
        }

        return [...history, { role: 'user', content: latestMessage }];
      };

      chatLauncher.addEventListener('click', () => setChatOpen(true));
      chatClose.addEventListener('click', () => setChatOpen(false));
      chatNew.addEventListener('click', () => {
        conversation.length = 0;
        chatMessages.replaceChildren();
        appendMessage('assistant', welcomeMessage);
        chatStatus.hidden = true;
        chatStatus.textContent = '';
        chatInput.value = '';
        chatInput.focus();
        setPending(false);
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !chatPanel.hidden) {
          setChatOpen(false);
        }
      });

      chatInput.addEventListener('input', () => {
        if (!isPending) chatSend.disabled = chatInput.value.trim().length === 0;
      });

      chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
          event.preventDefault();
          if (!isPending && chatInput.value.trim()) chatForm.requestSubmit();
        }
      });

      chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const message = chatInput.value.trim();
        if (!message || isPending) return;

        chatStatus.hidden = true;
        chatStatus.textContent = '';
        appendMessage('user', message);
        chatInput.value = '';
        setPending(true);
        showTyping(true);

        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: buildRequestMessages(message) })
          });
          const data = await response.json().catch(() => ({}));
          if (!response.ok) {
            const error = new Error('Chat request failed');
            error.status = response.status;
            throw error;
          }
          if (typeof data.reply !== 'string' || !data.reply.trim()) {
            throw new Error('Invalid chat response');
          }

          appendMessage('assistant', data.reply);
          conversation.push({ role: 'user', content: message }, { role: 'assistant', content: data.reply });
          if (conversation.length > 18) conversation.splice(0, conversation.length - 18);
        } catch (error) {
          let fallback = 'Sorry, I could not answer just now. Please try again in a moment.';
          if (error.status === 429) {
            fallback = 'The assistant is busy right now. Please wait a moment and try again.';
          } else if (error.status === 503) {
            fallback = 'The assistant is not configured yet. Please try again later.';
          } else if (error.status === 502) {
            fallback = 'The assistant service is temporarily unavailable. Please try again shortly.';
          }
          appendMessage('assistant', fallback);
          chatStatus.textContent = fallback;
          chatStatus.hidden = false;
        } finally {
          showTyping(false);
          setPending(false);
        }
      });
    }
});

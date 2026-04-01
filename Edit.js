const portfolioAgentData = window.portfolioAgentData || {};

function normalizeText(value) {
  return (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeText(value) {
  return normalizeText(value)
    .split(' ')
    .filter((token) => token.length > 1);
}

function textHasKeyword(normalizedQuestion, questionTokens, keyword) {
  const normalizedKeyword = normalizeText(keyword);
  if (!normalizedKeyword) return false;
  if (normalizedKeyword.includes(' ')) return normalizedQuestion.includes(normalizedKeyword);
  return questionTokens.includes(normalizedKeyword);
}

function matchesRule(normalizedQuestion, questionTokens, rule) {
  if (rule.maxTokens && questionTokens.length > rule.maxTokens) return false;
  const anyMatched =
    !rule.matchAny || rule.matchAny.some((item) => textHasKeyword(normalizedQuestion, questionTokens, item));
  const allMatched =
    !rule.matchAll || rule.matchAll.every((item) => textHasKeyword(normalizedQuestion, questionTokens, item));
  return anyMatched && allMatched;
}

function isAffirmative(questionTokens) {
  if (!questionTokens.length) return false;
  const allowed = new Set(['yes', 'yeah', 'yep', 'sure', 'okay', 'ok', 'please']);
  return questionTokens.every((token) => allowed.has(token));
}

function scoreTopic(normalizedQuestion, questionTokens, topic) {
  let score = 0;
  (topic.keywords || []).forEach((keyword) => {
    if (textHasKeyword(normalizedQuestion, questionTokens, keyword)) {
      score += normalizeText(keyword).includes(' ') ? 6 : 4;
    }
  });

  const searchableText = normalizeText([topic.summary].concat(topic.highlights || []).join(' '));
  questionTokens.forEach((token) => {
    if (searchableText.includes(token)) score += 1;
  });

  return score;
}

function scoreProject(normalizedQuestion, questionTokens, project) {
  let score = 0;
  (project.keywords || []).forEach((keyword) => {
    if (textHasKeyword(normalizedQuestion, questionTokens, keyword)) {
      score += normalizeText(keyword).includes(' ') ? 7 : 5;
    }
  });

  const searchableText = normalizeText(
    [
      project.title,
      project.tagline,
      project.overview,
      project.problem,
      ...(project.technologies || []),
      ...(project.architecture || []),
      ...(project.keyFeatures || []),
      ...(project.challenges || []),
      ...(project.impact || []),
    ].join(' ')
  );

  questionTokens.forEach((token) => {
    if (searchableText.includes(token)) score += 1;
  });

  return score;
}

function formatListAsSentences(list, prefix) {
  if (!list || !list.length) return '';
  return `${prefix} ${list.join(' ')}`;
}

function buildProjectReply(project, questionTokens) {
  const wantsArchitecture = questionTokens.some((token) =>
    ['architecture', 'stack', 'how', 'works', 'flow', 'system', 'backend', 'design'].includes(token)
  );
  const wantsChallenges = questionTokens.some((token) =>
    ['challenge', 'challenges', 'hard', 'hardest', 'difficult', 'problem'].includes(token)
  );
  const wantsImpact = questionTokens.some((token) =>
    ['impact', 'matters', 'matter', 'why', 'recruiter', 'value', 'important'].includes(token)
  );
  const wantsTech = questionTokens.some((token) =>
    ['tech', 'technologies', 'stack', 'tools', 'used'].includes(token)
  );

  const answerParts = [project.assistant.summary];

  if (wantsArchitecture) {
    answerParts.push(formatListAsSentences(project.architecture, 'Architecture-wise:'));
  } else if (wantsChallenges) {
    answerParts.push(formatListAsSentences(project.challenges, 'The harder parts were:'));
  } else if (wantsImpact) {
    answerParts.push(formatListAsSentences(project.impact, 'Why it matters:'));
  } else if (wantsTech) {
    answerParts.push(`Technologies used: ${(project.technologies || []).join(', ')}.`);
  } else {
    answerParts.push(formatListAsSentences(project.assistant.highlights, 'Key points:'));
  }

  return {
    answer: answerParts.filter(Boolean).join('\n\n'),
    followUp: project.assistant.followUp,
    nextFollowUpTopic: project.id,
  };
}

function buildTopicReply(topic) {
  const answerParts = [topic.summary];
  if (topic.highlights && topic.highlights.length) {
    answerParts.push(topic.highlights.slice(0, 3).join(' '));
  }

  return {
    answer: answerParts.join('\n\n'),
    followUp: topic.followUp || portfolioAgentData.fallback.followUp,
    nextFollowUpTopic: topic.id,
  };
}

function buildAgentReply(question, context = {}) {
  if (!portfolioAgentData || !portfolioAgentData.fallback) {
    return {
      answer: 'Portfolio AI data is not available.',
      followUp: '',
      nextFollowUpTopic: '',
    };
  }

  const normalizedQuestion = normalizeText(question);
  const questionTokens = tokenizeText(question);

  if (!normalizedQuestion) {
    return {
      answer: portfolioAgentData.emptyState,
      followUp: portfolioAgentData.fallback.followUp,
      nextFollowUpTopic: '',
    };
  }

  if (context.pendingFollowUpTopic && isAffirmative(questionTokens)) {
    const followUpTopic = (portfolioAgentData.topics || []).find((topic) => topic.id === context.pendingFollowUpTopic);
    if (followUpTopic) return buildTopicReply(followUpTopic);

    const followUpProject = Object.values(portfolioAgentData.projectShowcase || {}).find(
      (project) => project.id === context.pendingFollowUpTopic
    );
    if (followUpProject) return buildProjectReply(followUpProject, questionTokens);
  }

  const directAnswer = (portfolioAgentData.directAnswers || []).find((rule) =>
    matchesRule(normalizedQuestion, questionTokens, rule)
  );
  if (directAnswer) {
    return {
      answer: directAnswer.answer,
      followUp: directAnswer.followUp || portfolioAgentData.fallback.followUp,
      nextFollowUpTopic: directAnswer.followUpTopic || '',
    };
  }

  let bestProject = null;
  let bestProjectScore = 0;

  Object.values(portfolioAgentData.projectShowcase || {}).forEach((project) => {
    const score = scoreProject(normalizedQuestion, questionTokens, project);
    if (score > bestProjectScore) {
      bestProject = project;
      bestProjectScore = score;
    }
  });

  if (bestProject && bestProjectScore >= 5) {
    return buildProjectReply(bestProject, questionTokens);
  }

  let bestTopic = null;
  let bestTopicScore = 0;

  (portfolioAgentData.topics || []).forEach((topic) => {
    const score = scoreTopic(normalizedQuestion, questionTokens, topic);
    if (score > bestTopicScore) {
      bestTopic = topic;
      bestTopicScore = score;
    }
  });

  if (bestTopic && bestTopicScore >= 3) {
    return buildTopicReply(bestTopic);
  }

  return {
    ...portfolioAgentData.fallback,
    nextFollowUpTopic: '',
  };
}

function initializeAnnotationStream() {
  const annotationStream = document.getElementById('annotation-stream');
  if (!annotationStream) return;

  const phrases = portfolioAgentData.annotationPhrases || [];
  if (!phrases.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const noteCount = prefersReducedMotion ? Math.min(8, phrases.length) : Math.min(18, phrases.length);
  const modifiers = ['comment', 'keyword', 'metric'];

  annotationStream.innerHTML = '';

  for (let index = 0; index < noteCount; index += 1) {
    const note = document.createElement('div');
    const modifier = modifiers[index % modifiers.length];
    note.className = `annotation-note annotation-note--${modifier}`;
    note.textContent = phrases[index % phrases.length];
    note.style.setProperty('--x', `${6 + Math.random() * 78}%`);
    note.style.setProperty('--y', `${10 + Math.random() * 76}%`);
    note.style.setProperty('--duration', `${18 + Math.random() * 14}s`);
    note.style.setProperty('--delay', `${-Math.random() * 14}s`);
    annotationStream.appendChild(note);
  }
}

function initializeNavigationObserver() {
  const navLinks = document.querySelectorAll('.navigation__item');
  if (!navLinks.length) return;

  function setActiveNav(id) {
    navLinks.forEach((link) => link.classList.remove('navigation__item--active'));
    const active = document.querySelector(`#nav-${id}`);
    if (active) active.classList.add('navigation__item--active');
  }

  const sections = ['hero', 'about', 'projects', 'experience', 'community', 'gallery', 'contact'];
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    },
    {
      root: null,
      threshold: 0.45,
      rootMargin: '-10% 0px -45% 0px',
    }
  );

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

function renderProjectModalList(container, items) {
  container.innerHTML = '';
  items.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item;
    container.appendChild(listItem);
  });
}

function initializeProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('project-modal-close');
  const openButtons = document.querySelectorAll('[data-project-open]');

  if (!modal || !modalClose || !openButtons.length) return;

  const modalKicker = document.getElementById('project-modal-kicker');
  const modalTitle = document.getElementById('project-modal-title');
  const modalTagline = document.getElementById('project-modal-tagline');
  const modalLinks = document.getElementById('project-modal-links');
  const modalOverview = document.getElementById('project-modal-overview');
  const modalProblem = document.getElementById('project-modal-problem');
  const modalTechnologies = document.getElementById('project-modal-technologies');
  const modalArchitecture = document.getElementById('project-modal-architecture');
  const modalFeatures = document.getElementById('project-modal-features');
  const modalChallenges = document.getElementById('project-modal-challenges');
  const modalImpact = document.getElementById('project-modal-impact');
  const modalScreens = document.getElementById('project-modal-screens');

  function setBodyLock(locked) {
    document.body.style.overflow = locked ? 'hidden' : '';
  }

  function closeModal() {
    modal.hidden = true;
    setBodyLock(false);
  }

  function openModal(projectId) {
    const project = (portfolioAgentData.projectShowcase || {})[projectId];
    if (!project) return;

    modalKicker.textContent = project.kicker;
    modalTitle.textContent = project.title;
    modalTagline.textContent = project.tagline;
    modalOverview.textContent = project.overview;
    modalProblem.textContent = project.problem;

    modalLinks.innerHTML = '';
    [
      { href: project.links.github, label: 'GitHub' },
      { href: project.links.caseStudy, label: 'Case Study' },
    ].forEach((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.target = link.href.startsWith('http') ? '_blank' : '_self';
      if (anchor.target === '_blank') anchor.rel = 'noreferrer';
      anchor.textContent = link.label;
      modalLinks.appendChild(anchor);
    });

    modalTechnologies.innerHTML = '';
    (project.technologies || []).forEach((technology) => {
      const chip = document.createElement('span');
      chip.className = 'project-modal__chip';
      chip.textContent = technology;
      modalTechnologies.appendChild(chip);
    });

    renderProjectModalList(modalArchitecture, project.architecture || []);
    renderProjectModalList(modalFeatures, project.keyFeatures || []);
    renderProjectModalList(modalChallenges, project.challenges || []);
    renderProjectModalList(modalImpact, project.impact || []);

    modalScreens.innerHTML = '';
    (project.screens || []).forEach((screen) => {
      const screenCard = document.createElement('div');
      screenCard.className = 'project-modal__screen';
      screenCard.innerHTML = `<span>${screen.label}</span><strong>${screen.note}</strong>`;
      modalScreens.appendChild(screenCard);
    });

    modal.hidden = false;
    setBodyLock(true);
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', () => openModal(button.getAttribute('data-project-open')));
  });

  modalClose.addEventListener('click', closeModal);
  modal.querySelectorAll('[data-project-close]').forEach((node) => node.addEventListener('click', closeModal));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
}

function initializePortfolioAgent() {
  const chatLog = document.getElementById('agent-chat-log');
  const agentForm = document.getElementById('agent-form');
  const agentInput = document.getElementById('agent-input');
  const suggestionContainer = document.getElementById('agent-suggestions');
  const agentLauncher = document.getElementById('agent-launcher');
  const agentPanel = document.getElementById('agent-widget-panel');
  const agentClose = document.getElementById('agent-widget-close');
  let pendingFollowUpTopic = '';
  let resetTimer = null;
  let inactivityTimer = null;

  if (!chatLog || !agentForm || !agentInput || !suggestionContainer || !agentLauncher || !agentPanel || !agentClose) {
    return;
  }

  function clearTimer(timerId) {
    if (timerId) window.clearTimeout(timerId);
    return null;
  }

  function renderInitialAssistantState() {
    chatLog.innerHTML = '';
    pendingFollowUpTopic = '';
    renderMessage('assistant', `${portfolioAgentData.greeting}\n\n${portfolioAgentData.fallback.followUp}`);
  }

  function resetAgentConversation() {
    resetTimer = clearTimer(resetTimer);
    inactivityTimer = clearTimer(inactivityTimer);
    agentInput.value = '';
    renderInitialAssistantState();
  }

  function scheduleInactivityReset() {
    inactivityTimer = clearTimer(inactivityTimer);
    inactivityTimer = window.setTimeout(() => {
      if (agentPanel.hidden) resetAgentConversation();
    }, 90000);
  }

  function scheduleCloseReset() {
    resetTimer = clearTimer(resetTimer);
    resetTimer = window.setTimeout(() => {
      if (agentPanel.hidden) resetAgentConversation();
    }, 18000);
  }

  function setAgentPanelOpen(isOpen) {
    resetTimer = clearTimer(resetTimer);
    agentPanel.hidden = !isOpen;
    agentLauncher.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      inactivityTimer = clearTimer(inactivityTimer);
      window.setTimeout(() => agentInput.focus(), 40);
    } else {
      scheduleCloseReset();
    }
  }

  function linkifyAssistantText(message) {
    return message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>');
  }

  function renderMessage(role, message) {
    const messageNode = document.createElement('div');
    messageNode.className = `agent-message agent-message--${role}`;

    const roleNode = document.createElement('div');
    roleNode.className = 'agent-message__role';
    roleNode.textContent = role === 'assistant' ? portfolioAgentData.assistantName : 'You';

    const textNode = document.createElement('div');
    textNode.className = 'agent-message__text';
    if (role === 'assistant') {
      textNode.innerHTML = linkifyAssistantText(message);
    } else {
      textNode.textContent = message;
    }

    messageNode.append(roleNode, textNode);
    chatLog.appendChild(messageNode);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function askAgent(question) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      renderMessage('assistant', `${portfolioAgentData.emptyState}\n\n${portfolioAgentData.fallback.followUp}`);
      scheduleInactivityReset();
      return;
    }

    renderMessage('user', trimmedQuestion);
    agentInput.value = '';
    agentInput.disabled = true;

    const submitButton = agentForm.querySelector('.agent-form__submit');
    if (submitButton) submitButton.disabled = true;

    window.setTimeout(() => {
      const reply = buildAgentReply(trimmedQuestion, { pendingFollowUpTopic });
      const fullMessage = reply.followUp ? `${reply.answer}\n\n${reply.followUp}` : reply.answer;
      pendingFollowUpTopic = reply.nextFollowUpTopic || '';
      renderMessage('assistant', fullMessage);
      agentInput.disabled = false;
      if (submitButton) submitButton.disabled = false;
      agentInput.focus();
      scheduleInactivityReset();
    }, 240);
  }

  if (portfolioAgentData.promptPlaceholder) {
    agentInput.placeholder = portfolioAgentData.promptPlaceholder;
  }

  const suggestionButtons = suggestionContainer.querySelectorAll('.agent-suggestion');
  suggestionButtons.forEach((button, index) => {
    if (portfolioAgentData.suggestions && portfolioAgentData.suggestions[index]) {
      button.textContent = portfolioAgentData.suggestions[index];
    }
    button.addEventListener('click', () => {
      setAgentPanelOpen(true);
      askAgent(button.textContent);
    });
  });

  agentLauncher.addEventListener('click', () => {
    const isOpen = agentLauncher.getAttribute('aria-expanded') === 'true';
    setAgentPanelOpen(!isOpen);
  });

  agentClose.addEventListener('click', () => setAgentPanelOpen(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !agentPanel.hidden) setAgentPanelOpen(false);
  });

  renderInitialAssistantState();

  agentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    askAgent(agentInput.value);
  });

  chatLog.addEventListener('click', () => {
    inactivityTimer = clearTimer(inactivityTimer);
  });
}

function initializeContactForm() {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const submitButton = document.getElementById('form-submit');
  const contactForm = document.querySelector('.contact__form');
  if (!submitButton || !contactForm) return;

  submitButton.addEventListener('click', () => {
    const nameInput = document.querySelector('.contact__form-name');
    const emailInput = document.querySelector('.contact__form-email');
    const messageInput = document.querySelector('.contact__form-message');
    const nameError = document.querySelector('.form-error__name');
    const emailError = document.querySelector('.form-error__email');
    const messageError = document.querySelector('.form-error__msg');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let valid = true;

    if (!name) {
      valid = false;
      nameInput.classList.add('input-error');
      nameError.style.display = 'block';
    } else {
      nameInput.classList.remove('input-error');
      nameError.style.display = 'none';
    }

    if (!emailRegex.test(email)) {
      valid = false;
      emailInput.classList.add('input-error');
      emailError.style.display = 'block';
    } else {
      emailInput.classList.remove('input-error');
      emailError.style.display = 'none';
    }

    if (!message) {
      valid = false;
      messageInput.classList.add('input-error');
      messageError.style.display = 'block';
    } else {
      messageInput.classList.remove('input-error');
      messageError.style.display = 'none';
    }

    if (!valid) return;

    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';

    fetch(contactForm.getAttribute('action'), {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(contactForm),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Unable to send form');
        contactForm.reset();
        submitButton.textContent = 'Sent';
        window.setTimeout(() => {
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1800);
      })
      .catch(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeAnnotationStream();
  initializeNavigationObserver();
  initializeProjectModal();
  initializePortfolioAgent();
  initializeContactForm();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(initializeAnnotationStream, 120);
  });
});

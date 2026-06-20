const portfolioAgentData = window.portfolioAgentData || {};

function normalizeText(value) {
  return (value || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function tokenizeText(value) {
  return normalizeText(value).split(' ').filter((token) => token.length > 1);
}

function textHasKeyword(normalizedQuestion, questionTokens, keyword) {
  const normalizedKeyword = normalizeText(keyword);
  if (!normalizedKeyword) return false;
  return normalizedKeyword.includes(' ') ? normalizedQuestion.includes(normalizedKeyword) : questionTokens.includes(normalizedKeyword);
}

function scoreItem(normalizedQuestion, questionTokens, item) {
  let score = 0;
  (item.keywords || []).forEach((keyword) => {
    if (textHasKeyword(normalizedQuestion, questionTokens, keyword)) score += normalizeText(keyword).includes(' ') ? 7 : 5;
  });
  const searchable = normalizeText([
    item.title, item.summary, item.overview, item.problem,
    ...(item.highlights || []), ...(item.technologies || []), ...(item.architecture || []),
  ].filter(Boolean).join(' '));
  questionTokens.forEach((token) => { if (searchable.includes(token)) score += 1; });
  return score;
}

function formatTopic(item) {
  const parts = [item.summary || item.assistant?.summary];
  const highlights = item.highlights || item.assistant?.highlights;
  if (highlights?.length) parts.push(highlights.slice(0, 3).join(' '));
  return {
    answer: parts.filter(Boolean).join('\n\n'),
    followUp: item.followUp || item.assistant?.followUp || portfolioAgentData.fallback?.followUp || '',
  };
}

function buildProjectReply(project, questionTokens) {
  const detailMap = [
    { words: ['architecture', 'system', 'works', 'flow', 'design'], label: 'How it works:', data: project.architecture },
    { words: ['challenge', 'hard', 'difficult'], label: 'Engineering challenges:', data: project.challenges },
    { words: ['impact', 'value', 'recruiter', 'why'], label: 'Why it matters:', data: project.impact },
  ];
  const selected = detailMap.find((option) => questionTokens.some((token) => option.words.includes(token)));
  const parts = [project.assistant?.summary || project.overview];
  if (selected?.data?.length) parts.push(`${selected.label} ${selected.data.slice(0, 3).join(' ')}`);
  else if (questionTokens.some((token) => ['technology', 'technologies', 'tech', 'stack', 'tools'].includes(token))) {
    parts.push(`Technologies: ${(project.technologies || []).join(', ')}.`);
  } else if (project.assistant?.highlights?.length) parts.push(project.assistant.highlights.join(' '));
  return { answer: parts.join('\n\n'), followUp: project.assistant?.followUp || portfolioAgentData.fallback?.followUp || '' };
}

function buildAgentReply(question) {
  const normalizedQuestion = normalizeText(question);
  const questionTokens = tokenizeText(question);
  if (!normalizedQuestion) return { answer: portfolioAgentData.emptyState, followUp: portfolioAgentData.fallback?.followUp };

  const direct = (portfolioAgentData.directAnswers || []).find((rule) => {
    if (rule.maxTokens && questionTokens.length > rule.maxTokens) return false;
    return (rule.matchAny || []).some((keyword) => textHasKeyword(normalizedQuestion, questionTokens, keyword));
  });
  if (direct) return { answer: direct.answer, followUp: direct.followUp || portfolioAgentData.fallback?.followUp };

  let bestProject = null;
  let bestProjectScore = 0;
  Object.values(portfolioAgentData.projectShowcase || {}).forEach((project) => {
    const score = scoreItem(normalizedQuestion, questionTokens, project);
    if (score > bestProjectScore) { bestProject = project; bestProjectScore = score; }
  });
  if (bestProject && bestProjectScore >= 5) return buildProjectReply(bestProject, questionTokens);

  let bestTopic = null;
  let bestTopicScore = 0;
  (portfolioAgentData.topics || []).forEach((topic) => {
    const score = scoreItem(normalizedQuestion, questionTokens, topic);
    if (score > bestTopicScore) { bestTopic = topic; bestTopicScore = score; }
  });
  if (bestTopic && bestTopicScore >= 3) return formatTopic(bestTopic);
  return portfolioAgentData.fallback || { answer: 'Ask about Shelton’s experience, systems, or technical strengths.', followUp: '' };
}

function initializeNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.navigation-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('open', !open);
    });
    links.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
    }));
  }

  const sectionIds = ['hero', 'about', 'systems', 'experience', 'skills', 'ask-shelton', 'contact'];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.navigation-links a[href^="#"]').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-25% 0px -65%', threshold: 0 });
  sectionIds.forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
}

function initializeReveal() {
  const targets = document.querySelectorAll('.section-heading-wrap, .about-statement, .about-profile, .experience-feature, .experience-secondary, .system-card, .skills-grid article, .assistant-copy, .agent-console, .contact-card');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-visible'));
    return;
  }
  targets.forEach((target) => target.classList.add('reveal-on-scroll'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: .12, rootMargin: '0px 0px -7%' });
  targets.forEach((target) => observer.observe(target));
}

function renderList(container, items) {
  container.innerHTML = '';
  (items || []).forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    container.appendChild(li);
  });
}

function initializeProjectModal() {
  const modal = document.getElementById('project-modal');
  const close = document.getElementById('project-modal-close');
  const triggers = document.querySelectorAll('[data-project-open]');
  if (!modal || !close || !triggers.length) return;
  let returnFocus = null;

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    returnFocus?.focus();
  };

  const openModal = (id, trigger) => {
    const project = portfolioAgentData.projectShowcase?.[id];
    if (!project) return;
    returnFocus = trigger;
    document.getElementById('project-modal-kicker').textContent = project.kicker;
    document.getElementById('project-modal-title').textContent = project.title;
    document.getElementById('project-modal-tagline').textContent = project.tagline;
    document.getElementById('project-modal-overview').textContent = project.overview;
    document.getElementById('project-modal-problem').textContent = project.problem;

    const links = document.getElementById('project-modal-links');
    links.innerHTML = '';
    [{ label: 'GitHub ↗', href: project.links?.github }, { label: 'Case study →', href: project.links?.caseStudy }]
      .filter((item) => item.href)
      .forEach((item) => {
        const anchor = document.createElement('a');
        anchor.href = item.href;
        anchor.textContent = item.label;
        if (item.href.startsWith('http')) { anchor.target = '_blank'; anchor.rel = 'noreferrer'; }
        links.appendChild(anchor);
      });

    const chips = document.getElementById('project-modal-technologies');
    chips.innerHTML = '';
    (project.technologies || []).forEach((technology) => {
      const chip = document.createElement('span');
      chip.className = 'project-modal__chip';
      chip.textContent = technology;
      chips.appendChild(chip);
    });
    renderList(document.getElementById('project-modal-architecture'), project.architecture);
    renderList(document.getElementById('project-modal-features'), project.keyFeatures);
    renderList(document.getElementById('project-modal-challenges'), project.challenges);
    renderList(document.getElementById('project-modal-impact'), project.impact);
    modal.hidden = false;
    document.body.classList.add('modal-open');
    close.focus();
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', () => openModal(trigger.dataset.projectOpen, trigger)));
  close.addEventListener('click', closeModal);
  modal.querySelectorAll('[data-project-close]').forEach((node) => node.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'Tab') {
      const focusable = [...modal.querySelectorAll('button, a[href]')].filter((node) => !node.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
}

function initializePortfolioAgent() {
  const chatLog = document.getElementById('agent-chat-log');
  const form = document.getElementById('agent-form');
  const input = document.getElementById('agent-input');
  const suggestions = document.querySelectorAll('.agent-suggestion');
  if (!chatLog || !form || !input) return;

  const linkify = (message) => message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>');
  const renderMessage = (role, message) => {
    const node = document.createElement('div');
    node.className = `agent-message agent-message--${role}`;
    const roleNode = document.createElement('div');
    roleNode.className = 'agent-message__role';
    roleNode.textContent = role === 'assistant' ? 'Shelton AI' : 'You';
    const text = document.createElement('div');
    text.className = 'agent-message__text';
    if (role === 'assistant') text.innerHTML = linkify(message);
    else text.textContent = message;
    node.append(roleNode, text);
    chatLog.appendChild(node);
    chatLog.scrollTop = chatLog.scrollHeight;
  };

  const ask = (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;
    renderMessage('user', trimmed);
    input.value = '';
    input.disabled = true;
    form.querySelector('button').disabled = true;
    window.setTimeout(() => {
      const reply = buildAgentReply(trimmed);
      renderMessage('assistant', [reply.answer, reply.followUp].filter(Boolean).join('\n\n'));
      input.disabled = false;
      form.querySelector('button').disabled = false;
      input.focus();
    }, 220);
  };

  renderMessage('assistant', portfolioAgentData.greeting || 'Ask me about Shelton’s work and technical strengths.');
  suggestions.forEach((button) => button.addEventListener('click', () => ask(button.textContent)));
  form.addEventListener('submit', (event) => { event.preventDefault(); ask(input.value); });
}

function initializeContactForm() {
  const form = document.querySelector('.contact__form');
  const submit = document.getElementById('form-submit');
  if (!form || !submit) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = form.querySelector('.contact__form-name');
    const email = form.querySelector('.contact__form-email');
    const message = form.querySelector('.contact__form-message');
    const validity = {
      name: Boolean(name.value.trim()),
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()),
      message: Boolean(message.value.trim()),
    };
    [name, email, message].forEach((field, index) => {
      const invalid = !Object.values(validity)[index];
      field.classList.toggle('input-error', invalid);
      field.setAttribute('aria-invalid', String(invalid));
    });
    form.querySelector('.form-error__name').style.display = validity.name ? 'none' : 'block';
    form.querySelector('.form-error__email').style.display = validity.email ? 'none' : 'block';
    form.querySelector('.form-error__msg').style.display = validity.message ? 'none' : 'block';
    if (!Object.values(validity).every(Boolean)) return;

    const original = submit.innerHTML;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    try {
      const response = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      submit.textContent = 'Message sent';
      window.setTimeout(() => { submit.innerHTML = original; submit.disabled = false; }, 1800);
    } catch {
      submit.textContent = 'Could not send — email me instead';
      window.setTimeout(() => { submit.innerHTML = original; submit.disabled = false; }, 2500);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeReveal();
  initializeProjectModal();
  initializePortfolioAgent();
  initializeContactForm();
});

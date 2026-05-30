// ── STORAGE KEY ──
const STORAGE_KEY = 'tmp_progress';

// ── ALL LESSONS IN ORDER ──
const ALL_LESSONS = [
  { id:'1-1', path:'section-1/what-is-technical-analysis.html' },
  { id:'1-2', path:'section-1/why-ta-works-across-all-markets.html' },
  { id:'1-3', path:'section-1/how-to-use-this-course.html' },
  { id:'1-4', path:'section-1/tools-and-platforms.html' },
  { id:'2-1', path:'section-2/what-is-market-structure.html' },
  { id:'2-2', path:'section-2/identifying-highs-and-lows.html' },
  { id:'2-3', path:'section-2/bullish-vs-bearish-structure.html' },
  { id:'2-4', path:'section-2/break-of-structure.html' },
  { id:'2-5', path:'section-2/change-of-character.html' },
  { id:'2-6', path:'section-2/live-chart-examples.html' },
  { id:'3-1', path:'section-3/supply-zones.html' },
  { id:'3-2', path:'section-3/demand-zones.html' },
  { id:'3-3', path:'section-3/integrating-sd-with-market-structure.html' },
  { id:'3-4', path:'section-3/what-are-order-blocks.html' },
  { id:'3-5', path:'section-3/bullish-and-bearish-order-blocks.html' },
  { id:'3-6', path:'section-3/breaker-blocks.html' },
  { id:'4-1', path:'section-4/what-is-liquidity.html' },
  { id:'4-2', path:'section-4/buy-side-vs-sell-side-liquidity.html' },
  { id:'4-3', path:'section-4/equal-highs-lows-as-liquidity.html' },
  { id:'4-4', path:'section-4/stop-hunts-and-liquidity-grabs.html' },
  { id:'4-5', path:'section-4/how-institutions-use-liquidity.html' },
  { id:'5-1', path:'section-5/why-risk-management-comes-first.html' },
  { id:'5-2', path:'section-5/the-1-percent-rule-and-position-sizing.html' },
  { id:'5-3', path:'section-5/stop-loss-placement-strategies.html' },
  { id:'5-4', path:'section-5/risk-to-reward-ratios.html' },
  { id:'5-5', path:'section-5/trading-psychology.html' },
  { id:'5-6', path:'section-5/building-a-risk-checklist.html' },
  { id:'6-1', path:'section-6/multi-confluence-trading-setup.html' },
  { id:'6-2', path:'section-6/step-by-step-trade-planning.html' },
  { id:'6-3', path:'section-6/live-chart-walkthroughs.html' },
  { id:'6-4', path:'section-6/building-your-trading-plan.html' },
  { id:'6-5', path:'section-6/simplicity-as-an-edge.html' },
  { id:'6-6', path:'section-6/final-assessment.html' },
];

// ── HELPERS ──
function getProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

// ── PROGRESS BAR ──
function updateProgressBar() {
  const p = getProgress();
  const done = ALL_LESSONS.filter(l => p[l.id]).length;
  const pct = Math.round((done / ALL_LESSONS.length) * 100);
  const bar = document.getElementById('progressBar');
  const txt = document.getElementById('progressText');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.textContent = pct + '%';
}

// ── SIDEBAR ACTIVE + COMPLETED ──
function initSidebar() {
  const p = getProgress();
  const body = document.body;
  const currentId = body.dataset.lessonId;
  const links = document.querySelectorAll('.nav-lessons a[data-id]');
  let currentSection = null;
  links.forEach(a => {
    const id = a.dataset.id;
    if (p[id]) a.classList.add('completed');
    if (id === currentId) {
      a.classList.add('active');
      currentSection = a.closest('.nav-section');
    }
  });
  // Open current section; all others closed except current
  document.querySelectorAll('.nav-section').forEach(s => {
    if (s === currentSection) s.classList.add('open');
  });
}

// ── TOGGLE NAV SECTION ──
function toggleSection(id) {
  const sec = document.getElementById('nav-' + id);
  if (sec) sec.classList.toggle('open');
}

// ── LEVEL TABS ──
function switchLevel(level) {
  document.querySelectorAll('.level-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.level-content').forEach(c => c.classList.remove('active'));
  const tab = document.querySelector(`.level-tab[data-level="${level}"]`);
  const content = document.getElementById('level-' + level);
  if (tab) tab.classList.add('active');
  if (content) content.classList.add('active');
}

// ── MARK COMPLETE ──
function toggleComplete() {
  const body = document.body;
  const id = body.dataset.lessonId;
  if (!id) return;
  const p = getProgress();
  p[id] = !p[id];
  saveProgress(p);
  const btn = document.getElementById('completeBtn');
  if (btn) {
    btn.classList.toggle('done', !!p[id]);
    btn.textContent = p[id] ? '✓ Completed' : '✓ Mark Complete';
  }
  updateProgressBar();
  initSidebar();
  if (Object.keys(p).filter(k => p[k]).length === ALL_LESSONS.length) {
    showConfetti();
  }
}

function initCompleteBtn() {
  const id = document.body.dataset.lessonId;
  if (!id) return;
  const p = getProgress();
  const btn = document.getElementById('completeBtn');
  if (btn && p[id]) {
    btn.classList.add('done');
    btn.textContent = '✓ Completed';
  }
}

// ── SIDEBAR TOGGLE (mobile) ──
function initMobileSidebar() {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const closeBtn = document.getElementById('sidebarClose');
  function open() { sidebar.classList.add('open'); overlay.classList.add('active'); }
  function close() { sidebar.classList.remove('open'); overlay.classList.remove('active'); }
  if (hamburger) hamburger.addEventListener('click', open);
  if (overlay) overlay.addEventListener('click', close);
  if (closeBtn) closeBtn.addEventListener('click', close);
}

// ── SEARCH FILTER ──
function initSearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    document.querySelectorAll('.nav-lessons li').forEach(li => {
      const text = li.textContent.toLowerCase();
      li.classList.toggle('hidden', q !== '' && !text.includes(q));
    });
    if (q) {
      document.querySelectorAll('.nav-section').forEach(s => s.classList.add('open'));
    }
  });
}

// ── SCROLL TO TOP ──
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── FADE-IN ON SCROLL ──
function initFadeIn() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'none'; } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.lesson-card, .lesson-link-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    observer.observe(el);
  });
}

// ── CONFETTI ──
function showConfetti() {
  const overlay = document.getElementById('confettiOverlay');
  if (!overlay) return;
  overlay.classList.add('active');
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  const colors = ['#00c896','#ffc107','#e84545','#3b82f6','#a855f7','#fff'];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    p.classList.add('confetti-piece');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = Math.random() * 100 + 'vh';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDelay = Math.random() * 3 + 's';
    p.style.animationDuration = (2 + Math.random() * 2) + 's';
    p.style.width = (6 + Math.random() * 8) + 'px';
    p.style.height = (6 + Math.random() * 8) + 'px';
    container.appendChild(p);
  }
}
function closeConfetti() {
  const overlay = document.getElementById('confettiOverlay');
  if (overlay) overlay.classList.remove('active');
}

// ── QUIZ ──
const QUIZ_ANSWERS = { q1:'b', q2:'c', q3:'a', q4:'b', q5:'c', q6:'a', q7:'b', q8:'c', q9:'a', q10:'b' };
function submitQuiz() {
  let score = 0;
  Object.keys(QUIZ_ANSWERS).forEach(q => {
    const sel = document.querySelector(`input[name="${q}"]:checked`);
    const opts = document.querySelectorAll(`input[name="${q}"]`);
    opts.forEach(o => {
      const wrap = o.closest('.quiz-option');
      if (o.value === QUIZ_ANSWERS[q]) wrap.classList.add('correct');
      else if (o.checked) wrap.classList.add('wrong');
    });
    if (sel && sel.value === QUIZ_ANSWERS[q]) score++;
  });
  const result = document.getElementById('quizResult');
  if (result) {
    result.style.display = 'block';
    result.querySelector('.score').textContent = score + '/10';
    result.querySelector('p').textContent = score >= 8
      ? 'Excellent! You have a strong grasp of technical analysis.'
      : score >= 5
      ? 'Good effort! Review the sections where you lost points.'
      : 'Keep studying — revisit the course materials and try again.';
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initCompleteBtn();
  updateProgressBar();
  initMobileSidebar();
  initSearch();
  initScrollTop();
  initFadeIn();
});

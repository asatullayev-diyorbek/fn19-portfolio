/* ════════════════════════════════════════════════
   BRANDFOLIO — script.js
   Features:
   ✓ Navbar scroll behavior
   ✓ Smooth active nav highlighting
   ✓ Skill bar animation (IntersectionObserver)
   ✓ Portfolio filter
   ✓ Blog modal
   ✓ Contact form → Telegram Bot
   ✓ Back-to-top button
════════════════════════════════════════════════ */

/* ══════════════════════════════
   TELEGRAM CONFIGURATION
   Replace these with your real Bot Token & Chat ID.
   Get your bot token from @BotFather on Telegram.
   Get your chat ID from @userinfobot on Telegram.
══════════════════════════════ */
const TELEGRAM_BOT_TOKEN = '8718303068:AAGGCOk_B_Viqd597UNxh9y14boV_6l-q5o';
const TELEGRAM_CHAT_ID   = '5966764801';

/* ══════════════════════════════
   NAVBAR — scroll class & active link
══════════════════════════════ */
const nav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  // Add "scrolled" class for shadow + reduced padding
  nav.classList.toggle('scrolled', window.scrollY > 60);

  // Highlight active nav link based on section in view
  highlightActiveNav();

  // Back to top button visibility
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);
});

function highlightActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  let currentId   = '';

  sections.forEach(sec => {
    const top = sec.offsetTop - nav.offsetHeight - 20;
    if (window.scrollY >= top) currentId = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active-nav');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active-nav');
    }
  });
}

// Add active-nav style dynamically
const style = document.createElement('style');
style.textContent = `.active-nav { color: var(--purple) !important; }
.active-nav::after { transform: translateX(-50%) scaleX(1) !important; }`;
document.head.appendChild(style);

/* ══════════════════════════════
   SKILL BARS — animate on enter
══════════════════════════════ */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => fill.classList.add('animated'));
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

const skillSection = document.getElementById('skills');
if (skillSection) skillObserver.observe(skillSection);

/* ══════════════════════════════
   PORTFOLIO FILTER
══════════════════════════════ */
const filterBtns  = document.querySelectorAll('.filter-btn');
const portItems   = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Toggle active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      if (match) {
        item.classList.remove('hidden');
        item.style.display = '';
      } else {
        item.classList.add('hidden');
        // Hide after animation completes
        setTimeout(() => {
          if (item.classList.contains('hidden')) item.style.display = 'none';
        }, 300);
      }
    });
  });
});

/* ══════════════════════════════
   BLOG MODAL
══════════════════════════════ */
const blogData = {
  1: {
    tag:     'Design',
    title:   'The Art of Purposeful White Space in UI Design',
    date:    'March 12, 2025',
    read:    '5 min read',
    img:     'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&h=400&fit=crop',
    content: `
      <p>White space — often called negative space — is one of the most powerful tools in a designer's arsenal. It's not empty; it's breathing room that gives every other element on the page room to speak.</p>
      <h4>Why White Space Matters</h4>
      <p>Cognitive load is the enemy of good design. When a screen is cluttered, users burn mental energy simply parsing the layout before they can act. Strategic white space reduces that burden dramatically.</p>
      <p>Studies have shown that proper use of line-height, margins, and padding can increase comprehension by up to 20%. That's not a stylistic luxury — it's a functional necessity.</p>
      <h4>Micro vs. Macro Space</h4>
      <p><strong>Micro white space</strong> refers to the spacing between smaller elements: letters, lines of text, list items, and button padding. Getting this right is what separates amateur typography from professional work.</p>
      <p><strong>Macro white space</strong> is the bigger breathing room — between sections, around images, and in page margins. This creates rhythm and guides the eye through the content hierarchy.</p>
      <h4>Practical Takeaways</h4>
      <p>Start with more space than you think you need. It's much easier to pull elements closer together than to justify why they're crammed. A safe minimum: 8px spacing system (8, 16, 24, 32, 48, 64…).</p>
      <p>Remember: your content is the hero, not the grid. White space is the stage — let it do its job.</p>
    `
  },
  2: {
    tag:     'Development',
    title:   'Building Faster: Python Automation for Designers',
    date:    'February 28, 2025',
    read:    '7 min read',
    img:     'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&h=400&fit=crop',
    content: `
      <p>Designers who can code — even a little — have an enormous advantage. Python, in particular, is a gentle but powerful gateway into automation that can save hours of repetitive work every week.</p>
      <h4>What You Can Automate</h4>
      <p>Think about the tasks you do repeatedly: renaming and resizing exported assets, generating color palette swatches, converting SVG files to PNG at multiple resolutions, or scraping reference images for mood boards. Python handles all of this elegantly.</p>
      <h4>Getting Started: Pillow</h4>
      <p>The <code>Pillow</code> library (a fork of PIL) is the go-to for image manipulation. With just 10 lines of Python, you can batch-resize an entire folder of exports to three different resolutions — something that would take 20 minutes manually.</p>
      <h4>Automating Design Tokens</h4>
      <p>One of the most powerful uses is parsing your design tokens from a JSON file and auto-generating your CSS variables, SCSS maps, or even Tailwind config. This single script can eliminate an entire category of copy-paste errors between design and dev.</p>
      <p>You don't need to become a programmer. Even 2-3 scripts that handle your most repetitive tasks can compound into days of saved time per year.</p>
    `
  },
  3: {
    tag:     'Business',
    title:   'How to Price Your Freelance Design Work in 2025',
    date:    'January 15, 2025',
    read:    '4 min read',
    img:     'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&h=400&fit=crop',
    content: `
      <p>Pricing is one of the most anxiety-inducing parts of freelancing. Most designers start by underpricing, realize it too late, and then struggle to raise rates with existing clients. Here's a framework that helps from day one.</p>
      <h4>Hourly vs. Project-Based</h4>
      <p>Hourly pricing feels safe but often penalizes speed and expertise. Project-based pricing rewards efficiency and is much easier for clients to budget. For most design work, project-based with clearly defined deliverables is the better model.</p>
      <h4>Value-Based Pricing</h4>
      <p>The real unlock is pricing based on the value delivered — not the time spent. If a rebrand helps a client close 30% more enterprise deals, your $5,000 project created far more than $5,000 in value. Understanding the client's outcome is the key to charging appropriately.</p>
      <h4>The Number You're Afraid to Say</h4>
      <p>When you have a number in mind, double it. Then say it out loud to yourself until it feels natural. Most designers are chronically underpriced because they've never truly internalized their market value.</p>
      <p>Research what senior designers at agencies in your city earn annually. Divide by 1,000 billable hours. That's a reasonable starting point for your day rate.</p>
    `
  }
};

function openBlogModal(id) {
  const post   = blogData[id];
  if (!post) return;

  document.getElementById('blogModalBody').innerHTML = `
    <span class="modal-blog-tag">${post.tag}</span>
    <h2 class="modal-blog-title">${post.title}</h2>
    <div class="modal-blog-meta">
      <i class="fa-regular fa-calendar me-1"></i>${post.date}
      &nbsp;·&nbsp;
      <i class="fa-regular fa-clock me-1"></i>${post.read}
    </div>
    <img src="${post.img}" alt="${post.title}" class="modal-blog-cover" />
    <div class="modal-blog-body">${post.content}</div>
  `;

  const modal = new bootstrap.Modal(document.getElementById('blogModal'));
  modal.show();
}

/* ══════════════════════════════
   CONTACT FORM → TELEGRAM BOT
══════════════════════════════ */
async function sendToTelegram() {
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();
  const alert   = document.getElementById('formAlert');
  const btn     = document.getElementById('sendBtn');
  const btnText = document.getElementById('btnText');
  const loader  = document.getElementById('btnLoader');

  // ─── Basic validation ───
  if (!name || !email || !message) {
    showAlert(alert, 'error', '⚠️ Please fill in Name, Email, and Message.');
    return;
  }
  if (!isValidEmail(email)) {
    showAlert(alert, 'error', '⚠️ Please enter a valid email address.');
    return;
  }

  // ─── Loading state ───
  btn.disabled = true;
  btnText.classList.add('d-none');
  loader.classList.remove('d-none');

  // ─── Build Telegram Markdown message ───
  const text = [
    `📬 *New Portfolio Contact*`,
    ``,
    `👤 *Name:* ${escapeMd(name)}`,
    `📧 *Email:* ${escapeMd(email)}`,
    `📌 *Subject:* ${escapeMd(subject || '—')}`,
    ``,
    `💬 *Message:*`,
    `${escapeMd(message)}`,
    ``,
    `_Sent from Brandfolio contact form_`
  ].join('\n');

  // ─── Telegram sendMessage API call ───
  const apiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(apiUrl, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id:    TELEGRAM_CHAT_ID,
        text:       text,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();

    if (data.ok) {
      showAlert(alert, 'success', '✅ Message sent! I\'ll get back to you within 24 hours.');
      clearForm();
    } else {
      // Common reason: invalid token / chat_id
      throw new Error(data.description || 'Telegram API error');
    }
  } catch (err) {
    console.error('Telegram send error:', err);

    // ─── Friendly error for unconfigured placeholders ───
    if (TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
      showAlert(alert, 'error',
        '⚙️ Telegram not configured yet. Replace <code>TELEGRAM_BOT_TOKEN</code> and <code>TELEGRAM_CHAT_ID</code> in script.js.'
      );
    } else {
      showAlert(alert, 'error', `❌ Failed to send: ${err.message}. Please try again or email me directly.`);
    }
  } finally {
    btn.disabled = false;
    btnText.classList.remove('d-none');
    loader.classList.add('d-none');
  }
}

/* ─── Helpers ─── */
function showAlert(el, type, html) {
  el.innerHTML = html;
  el.className = `form-alert ${type}`;
  el.classList.remove('d-none');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  // Auto-hide success after 6 seconds
  if (type === 'success') {
    setTimeout(() => { el.classList.add('d-none'); }, 6000);
  }
}

function clearForm() {
  ['contactName','contactEmail','contactSubject','contactMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Escape special Markdown characters for Telegram's parse_mode=Markdown.
 * Telegram Markdown v1 only needs _ * ` [ to be escaped.
 */
function escapeMd(str) {
  return str.replace(/([_*`[])/g, '\\$1');
}

/* ══════════════════════════════
   GENERAL ANIMATIONS
   Fade-in elements as they scroll into view
══════════════════════════════ */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.skill-card, .portfolio-card, .blog-card, .contact-info-block, .contact-form-card, .about-img-frame'
).forEach((el, i) => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transitionDelay = `${(i % 4) * 60}ms`;
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

/* ══════════════════════════════
   SMOOTH SCROLL for nav anchors
══════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    // Close mobile menu if open
    const navCollapse = document.getElementById('navbarNav');
    const bsCollapse  = bootstrap.Collapse.getInstance(navCollapse);
    if (bsCollapse) bsCollapse.hide();

    const offset = nav.offsetHeight + 12;
    const top    = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
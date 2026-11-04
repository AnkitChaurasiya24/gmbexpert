/**
 * Google Business Management Services By Ankit
 * Core Application Script
 * Features:
 * - IntersectionObserver Scroll Reveal
 * - Animated Stats Counter
 * - Sticky Header Controller
 * - Accessible Mobile Drawer Navigation
 * - FAQ Accordion System
 * - High-converting WhatsApp Lead Form Serializer
 * - Interactive GBP Health Score Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mark JS as enabled for progressive CSS animation
  document.body.classList.add('js-enabled');

  initStickyHeader();
  initMobileNavigation();
  initScrollReveal();
  initAnimatedCounters();
  initFaqAccordion();
  initWhatsAppForms();
  initAuditCalculator();
});

/* --------------------------------------------------------------------------
   Sticky Header on Scroll
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.mobile-drawer a');

  if (!toggleBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   Scroll Reveal with IntersectionObserver
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Animated Number Counters
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-target');
  if (!counters.length) return;

  const animateCount = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';
    const isDecimal = target % 1 !== 0;
    const duration = 1200; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeProgress * target;

      if (isDecimal) {
        counter.textContent = prefix + currentVal.toFixed(1) + suffix;
      } else {
        counter.textContent = prefix + Math.floor(currentVal) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
      }
    };

    requestAnimationFrame(updateCount);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* --------------------------------------------------------------------------
   FAQ Accordions
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Optional: Close siblings for accordion behavior
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   WhatsApp Lead Generation Forms
   -------------------------------------------------------------------------- */
function initWhatsAppForms() {
  const forms = document.querySelectorAll('.whatsapp-lead-form');
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value.trim() || '';
      const bizName = form.querySelector('[name="business_name"]')?.value.trim() || '';
      const city = form.querySelector('[name="city"]')?.value.trim() || '';
      const service = form.querySelector('[name="service"]')?.value.trim() || 'General GBP Enquiry';
      const profileUrl = form.querySelector('[name="profile_url"]')?.value.trim() || '';
      const message = form.querySelector('[name="message"]')?.value.trim() || '';

      if (!name || !bizName) {
        alert('Please provide your name and business name to proceed.');
        return;
      }

      // Format WhatsApp message according to blueprint Section 12
      let waText = `Hi Ankit, I would like to request a Google Business Profile consultation.\n\n`;
      waText += `*Name:* ${name}\n`;
      waText += `*Business:* ${bizName}\n`;
      if (city) waText += `*City:* ${city}\n`;
      waText += `*Service Required:* ${service}\n`;
      if (profileUrl) waText += `*Profile/Website:* ${profileUrl}\n`;
      if (message) waText += `*Details:* ${message}\n`;

      const encodedText = encodeURIComponent(waText);
      const waUrl = `https://wa.me/917984573924?text=${encodedText}`;

      // Open WhatsApp
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Visual feedback on form
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `✓ Opening WhatsApp...`;
        submitBtn.style.backgroundColor = '#16A36A';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3500);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Interactive GBP Health Score Calculator
   -------------------------------------------------------------------------- */
function initAuditCalculator() {
  const calculator = document.getElementById('gbp-health-calculator');
  if (!calculator) return;

  const checkboxes = calculator.querySelectorAll('.calc-checkbox');
  const scoreDisplay = calculator.querySelector('.score-number');
  const scoreBar = calculator.querySelector('.score-fill');
  const verdictText = calculator.querySelector('.score-verdict');
  const auditBtn = calculator.querySelector('.btn-calculator-action');

  const calculateScore = () => {
    let score = 20; // Base score
    checkboxes.forEach(cb => {
      if (cb.checked) {
        score += parseInt(cb.getAttribute('data-points') || '0', 10);
      }
    });

    if (score > 100) score = 100;

    if (scoreDisplay) scoreDisplay.textContent = score + '%';
    if (scoreBar) scoreBar.style.width = score + '%';

    let verdict = 'Needs Urgent Attention';
    let color = '#EF4444';
    if (score >= 80) {
      verdict = 'Strong Local Visibility Potential';
      color = '#16A36A';
    } else if (score >= 50) {
      verdict = 'Moderate - Missing High-Value Enquiries';
      color = '#D97706';
    }

    if (verdictText) {
      verdictText.textContent = verdict;
      verdictText.style.color = color;
    }
  };

  checkboxes.forEach(cb => {
    cb.addEventListener('change', calculateScore);
  });

  if (auditBtn) {
    auditBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentScore = scoreDisplay ? scoreDisplay.textContent : 'Calculated';
      const message = `Hi Ankit, I tested my GBP Health Score on your website and got ${currentScore}. I would like a detailed profile audit to improve it!`;
      const waUrl = `https://wa.me/917984573924?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
}


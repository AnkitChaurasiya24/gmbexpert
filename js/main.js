/**
 * Google Business Management Services By Ankit
 * Single-Page Landing Page Core JavaScript
 * 
 * Features:
 * - Sticky Header with Backdrop Filter
 * - Accessible Mobile Navigation Drawer
 * - ScrollSpy Active Anchor Highlighting
 * - IntersectionObserver Scroll Reveal Animations
 * - Animated Number Counters
 * - Accessible FAQ Accordion
 * - High-Converting WhatsApp Enquiry Form with Client-Side Validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initScrollSpy();
  initScrollReveal();
  initAnimatedCounters();
  initFaqAccordion();
  initContactForm();
});

/* --------------------------------------------------------------------------
   Sticky Header on Scroll
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   ScrollSpy for Active Anchor Highlighting
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  if (!sections.length || !navLinks.length) return;

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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
    threshold: 0.1,
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
    const duration = 1200;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * target);

      counter.textContent = prefix + currentVal + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = prefix + target + suffix;
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
  }, { threshold: 0.3 });

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

      // Close other accordion items for clean UX
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
   Contact Form Validation & WhatsApp Serializer
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('consultation-enquiry-form');
  if (!form) return;

  const confirmBox = document.getElementById('form-confirmation');
  const backupLink = document.getElementById('backup-whatsapp-link');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Elements
    const nameEl = form.querySelector('#full-name');
    const bizEl = form.querySelector('#business-name');
    const phoneEl = form.querySelector('#phone-number');
    const emailEl = form.querySelector('#email-address');
    const locEl = form.querySelector('#business-location');
    const serviceEl = form.querySelector('#required-service');
    const msgEl = form.querySelector('#message');

    // Reset previous errors
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    // Validation rules
    const name = nameEl.value.trim();
    if (name.length < 2) {
      nameEl.classList.add('is-invalid');
      isValid = false;
    }

    const bizName = bizEl.value.trim();
    if (bizName.length < 2) {
      bizEl.classList.add('is-invalid');
      isValid = false;
    }

    const phone = phoneEl.value.trim().replace(/[\s-]/g, '');
    const phoneRegex = /^[+]?[0-9]{10,14}$/;
    if (!phoneRegex.test(phone)) {
      phoneEl.classList.add('is-invalid');
      isValid = false;
    }

    const email = emailEl.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailEl.classList.add('is-invalid');
      isValid = false;
    }

    const location = locEl.value.trim();
    if (location.length < 2) {
      locEl.classList.add('is-invalid');
      isValid = false;
    }

    const service = serviceEl.value;
    if (!service) {
      serviceEl.classList.add('is-invalid');
      isValid = false;
    }

    if (!isValid) {
      // Focus first invalid element
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const message = msgEl ? msgEl.value.trim() : '';

    // Construct formatted WhatsApp message
    let waText = `Hi Ankit, I would like to request a Google Business Profile consultation.\n\n`;
    waText += `*Full Name:* ${name}\n`;
    waText += `*Business Name:* ${bizName}\n`;
    waText += `*Phone:* ${phone}\n`;
    waText += `*Email:* ${email}\n`;
    waText += `*Business Location:* ${location}\n`;
    waText += `*Required Service:* ${service}\n`;
    if (message) {
      waText += `*Notes / Profile Details:* ${message}\n`;
    }

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/917984573924?text=${encodedText}`;

    // Show confirmation box
    if (confirmBox) {
      confirmBox.classList.add('active');
      if (backupLink) {
        backupLink.setAttribute('href', waUrl);
      }
    }

    // Visual button update
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `✓ Opening WhatsApp...`;
      submitBtn.style.backgroundColor = '#16A36A';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.backgroundColor = '';
      }, 4000);
    }

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}

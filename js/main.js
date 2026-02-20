/* ========================================
   SGT Tourism - Team Landing Pages JS
   ======================================== */

/**
 * Generate and download a vCard (.vcf) file
 */
function downloadVCard(data) {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.fullName}`,
    `ORG:SGT Tourism LLC`,
    `TITLE:${data.designation}`,
    `TEL;TYPE=WORK,VOICE:${data.phone}`,
    `EMAIL;TYPE=WORK:${data.email}`,
    `ADR;TYPE=WORK:;;Al Bustan Centre, Block 6, 3rd Floor, Al Nahda St;Dubai;;Al Qusais 1;UAE`,
    `URL:https://www.sgttravel.com`,
    data.photo ? `PHOTO;VALUE=URI:${data.photo}` : '',
    'END:VCARD'
  ].filter(Boolean).join('\r\n');

  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.firstName}_${data.lastName}_SGT.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Intersection Observer for scroll-triggered animations
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[class*="animate-"]').forEach((el) => {
    observer.observe(el);
  });
}

/**
 * Add subtle parallax to profile image on mouse move (desktop only)
 */
function initParallax() {
  if (window.matchMedia('(hover: hover)').matches) {
    const profileImg = document.querySelector('.profile-image-wrapper');
    if (!profileImg) return;

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      profileImg.style.transform = `translate(${x}px, ${y}px)`;
    });
  }
}

/**
 * Button ripple effect
 */
function initRipple() {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
      `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/* Ripple animation */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

/**
 * Initialize everything on DOM ready
 */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initParallax();
  initRipple();
});

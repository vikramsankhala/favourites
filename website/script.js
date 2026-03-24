// Home Band & Jam Room — Website Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Add subtle animation on scroll for cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.equipment-card, .theory-card, .gig-card, .video-card, .composition-card, .fusion-card, .lyrics-card, .join-card, .component-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // Favourites Playlist Logic
  const favVideoPlayer = document.getElementById('fav-video-player');
  const playlistItems = document.querySelectorAll('.playlist-item');
  
  if (favVideoPlayer && playlistItems.length > 0) {
    let currentVideoIndex = 0;

    const loadVideo = (index) => {
      // Remove active class from all
      playlistItems.forEach(item => item.classList.remove('active'));
      
      // Update active class
      playlistItems[index].classList.add('active');
      
      // Update video source
      const videoSrc = playlistItems[index].getAttribute('data-src');
      favVideoPlayer.querySelector('source').setAttribute('src', videoSrc);
      favVideoPlayer.load();
      favVideoPlayer.play().catch(e => console.log('Autoplay prevented:', e));
    };

    // Click event for playlist items
    playlistItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentVideoIndex = index;
        loadVideo(currentVideoIndex);
      });
    });

    // Auto-play next video when current ends
    favVideoPlayer.addEventListener('ended', () => {
      currentVideoIndex++;
      if (currentVideoIndex >= playlistItems.length) {
        currentVideoIndex = 0; // Loop back to start
      }
      loadVideo(currentVideoIndex);
    });
  }
});

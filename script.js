// ═══════════════════════════════════════════════════════════════════════════
//                    🎀 SOUR CREAM OLIVIA RODRIGO THEME 🎀
//                         Interactive JavaScript
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Initialize music intro first
    initMusicIntro();
    
    // Initialize all interactive features (will show after intro)
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initSparkleEffects();
    initFloatingStickers();
    initMouseSparkles();
    initParallaxButterflies();
    createAutoSparkles();
    initGalleryTabs();
    initSlideshows();
});

// ═══════════════════════════════════════════════════════════════════════════
// MUSIC INTRO SCREEN - Now Playing
// ═══════════════════════════════════════════════════════════════════════════
function initMusicIntro() {
    const musicIntro = document.getElementById('musicIntro');
    const playBtn = document.getElementById('playMusicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const introOverlay = document.getElementById('introOverlay');
    const vinylRecord = document.querySelector('.vinyl-record');
    const musicBars = document.querySelector('.music-bars');
    
    if (!musicIntro || !playBtn) return;
    
    // Pause vinyl initially
    if (vinylRecord) vinylRecord.classList.add('paused');
    if (musicBars) musicBars.classList.add('paused');
    
    // Play button click
    playBtn.addEventListener('click', () => {
        // Start playing music
        if (bgMusic) {
            bgMusic.volume = 0.5;
            bgMusic.play().then(() => {
                // Start vinyl spinning
                if (vinylRecord) vinylRecord.classList.remove('paused');
                if (musicBars) musicBars.classList.remove('paused');
                
                // Change button text
                playBtn.innerHTML = '<span class="play-icon">🎵</span><span class="play-text">Playing...</span>';
                
                // Wait a moment then transition to intro screen
                setTimeout(() => {
                    musicIntro.classList.add('hidden');
                    
                    // Show the intro overlay with a slight delay for smooth transition
                    setTimeout(() => {
                        if (introOverlay) {
                            introOverlay.classList.remove('hidden');
                            // Initialize intro screen
                            initIntroScreen();
                        }
                    }, 100);
                }, 1500);
            }).catch((error) => {
                console.log('Audio play failed:', error);
                // Still proceed to intro even if audio fails
                setTimeout(() => {
                    musicIntro.classList.add('hidden');
                    setTimeout(() => {
                        if (introOverlay) {
                            introOverlay.classList.remove('hidden');
                            initIntroScreen();
                        }
                    }, 100);
                }, 500);
            });
        }
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// INTRO SCREEN FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════════
function initIntroScreen() {
    const introOverlay = document.getElementById('introOverlay');
    const mainContent = document.getElementById('mainContent');
    const enterBtn = document.getElementById('enterBtn');
    const introParticles = document.getElementById('introParticles');
    
    // Create floating particles in intro
    createIntroParticles(introParticles);
    
    // Enter button click
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            hideIntro(introOverlay, mainContent);
        });
    }
    
    // Press any key to continue
    const keyHandler = (e) => {
        if (introOverlay && !introOverlay.classList.contains('hidden')) {
            hideIntro(introOverlay, mainContent);
            document.removeEventListener('keydown', keyHandler);
        }
    };
    document.addEventListener('keydown', keyHandler);
}

function createIntroParticles(container) {
    if (!container) return;
    
    const particles = ['✨', '💜', '⭐', '🦋', '💗', '🌸', '💫', '✦'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('span');
        particle.className = 'intro-particle';
        particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (5 + Math.random() * 5) + 's';
        particle.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
        container.appendChild(particle);
    }
}

function hideIntro(overlay, mainContent) {
    // Create exit burst effect
    createExitBurst(overlay);
    
    // Hide intro with animation
    setTimeout(() => {
        overlay.classList.add('hidden');
        
        // Show main content
        if (mainContent) {
            mainContent.classList.add('visible');
        }
        
        // Create welcome sparkles on main page
        setTimeout(() => {
            createWelcomeSparkles();
        }, 300);
    }, 200);
}

function createExitBurst(container) {
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const sparkles = ['✨', '💜', '⭐', '🦋', '💗'];
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('span');
        sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: ${1 + Math.random() * 2}rem;
            pointer-events: none;
            z-index: 100002;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        document.body.appendChild(sparkle);
        
        // Burst outward
        setTimeout(() => {
            const angle = (i / 20) * Math.PI * 2;
            const distance = 200 + Math.random() * 300;
            sparkle.style.left = centerX + Math.cos(angle) * distance + 'px';
            sparkle.style.top = centerY + Math.sin(angle) * distance + 'px';
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0) rotate(360deg)';
        }, 10);
        
        // Remove sparkle
        setTimeout(() => sparkle.remove(), 1000);
    }
}

function createWelcomeSparkles() {
    const sparkleContainer = document.getElementById('sparkles');
    if (!sparkleContainer) return;
    
    const sparkles = ['✨', '💜', '⭐', '🦋', '💗'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle-particle';
            sparkle.innerHTML = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            sparkle.style.fontSize = (12 + Math.random() * 16) + 'px';
            sparkleContainer.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 3000);
        }, i * 50);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// GALLERY TABS FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════════
function initGalleryTabs() {
    const tabs = document.querySelectorAll('.gallery-tab');
    const eventCards = document.querySelectorAll('.event-card');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const selectedDate = tab.dataset.date;
            
            // Filter event cards
            eventCards.forEach(card => {
                if (selectedDate === 'all' || card.dataset.date === selectedDate) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
            
            // Create sparkle burst on tab click
            createTabSparkles(tab);
        });
    });
}

function createTabSparkles(tab) {
    const rect = tab.getBoundingClientRect();
    const sparkleContainer = document.getElementById('sparkles');
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle-particle';
            sparkle.innerHTML = ['✨', '💜', '⭐', '🦋'][Math.floor(Math.random() * 4)];
            sparkle.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * 60) + 'px';
            sparkle.style.top = (rect.top + rect.height / 2 + (Math.random() - 0.5) * 40) + 'px';
            sparkle.style.fontSize = (12 + Math.random() * 10) + 'px';
            sparkleContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 50);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// SLIDESHOW FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════════
const slideshowStates = {};

function initSlideshows() {
    const slideshows = document.querySelectorAll('.slideshow-container');
    
    slideshows.forEach(slideshow => {
        const id = slideshow.id.replace('slideshow-', '');
        slideshowStates[id] = {
            currentSlide: 0,
            totalSlides: slideshow.querySelectorAll('.slide').length
        };
        
        // Auto-play slideshow
        setInterval(() => {
            if (document.visibilityState === 'visible') {
                changeSlide(id, 1);
            }
        }, 5000); // Change slide every 5 seconds
    });
}

function changeSlide(id, direction) {
    const state = slideshowStates[id];
    if (!state) return;
    
    const container = document.getElementById(`slideshow-${id}`);
    if (!container) return;
    
    const slides = container.querySelectorAll('.slide');
    const dots = container.querySelectorAll('.dot');
    
    // Remove active class from current slide
    slides[state.currentSlide].classList.remove('active');
    slides[state.currentSlide].classList.add(direction > 0 ? 'prev' : '');
    dots[state.currentSlide].classList.remove('active');
    
    // Calculate new slide index
    state.currentSlide += direction;
    if (state.currentSlide >= state.totalSlides) {
        state.currentSlide = 0;
    } else if (state.currentSlide < 0) {
        state.currentSlide = state.totalSlides - 1;
    }
    
    // Add active class to new slide
    setTimeout(() => {
        slides.forEach(slide => slide.classList.remove('prev'));
        slides[state.currentSlide].classList.add('active');
        dots[state.currentSlide].classList.add('active');
    }, 50);
    
    // Create sparkle effect on slide change
    createSlideSparkles(container);
}

function goToSlide(id, slideIndex) {
    const state = slideshowStates[id];
    if (!state) return;
    
    const container = document.getElementById(`slideshow-${id}`);
    if (!container) return;
    
    const slides = container.querySelectorAll('.slide');
    const dots = container.querySelectorAll('.dot');
    
    // Remove active from all
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set new slide
    state.currentSlide = slideIndex;
    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
    
    createSlideSparkles(container);
}

function createSlideSparkles(container) {
    const rect = container.getBoundingClientRect();
    const sparkleContainer = document.getElementById('sparkles');
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle-particle';
            sparkle.innerHTML = ['✨', '💫', '⭐'][Math.floor(Math.random() * 3)];
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + rect.height / 2) + 'px';
            sparkle.style.fontSize = (10 + Math.random() * 8) + 'px';
            sparkleContainer.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 40);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════════
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Music Toggle Button
    initMusicToggle();
}

// ═══════════════════════════════════════════════════════════════════════════
// MUSIC TOGGLE FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════════
function initMusicToggle() {
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const bgMusic = document.getElementById('bgMusic');
    
    if (!musicToggleBtn || !bgMusic) return;
    
    musicToggleBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            // Play music
            bgMusic.play().then(() => {
                musicToggleBtn.classList.remove('muted');
                musicToggleBtn.title = 'Pause Music';
            }).catch(err => {
                console.log('Could not play audio:', err);
            });
        } else {
            // Pause music
            bgMusic.pause();
            musicToggleBtn.classList.add('muted');
            musicToggleBtn.title = 'Play Music';
        }
    });
    
    // Update button state when audio ends or is paused externally
    bgMusic.addEventListener('pause', () => {
        musicToggleBtn.classList.add('muted');
    });
    
    bgMusic.addEventListener('play', () => {
        musicToggleBtn.classList.remove('muted');
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════════════════
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS (Fade-in on scroll)
// ═══════════════════════════════════════════════════════════════════════════
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation to children
                const children = entry.target.querySelectorAll('.polaroid, .timeline-item, .contact-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section, .diary-page, .affiliations-box').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .polaroid.animate-ready,
        .timeline-item.animate-ready,
        .contact-card.animate-ready {
            opacity: 0;
            transform: translateY(20px);
        }
    `;
    document.head.appendChild(style);
}

// ═══════════════════════════════════════════════════════════════════════════
// SPARKLE EFFECTS ON HOVER
// ═══════════════════════════════════════════════════════════════════════════
function initSparkleEffects() {
    const sparkleElements = document.querySelectorAll('.sticker-btn, .polaroid, .nav-link');
    
    sparkleElements.forEach(element => {
        element.addEventListener('mouseenter', createSparkles);
    });
}

function createSparkles(e) {
    const element = e.target;
    const rect = element.getBoundingClientRect();
    
    // Create multiple sparkles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle-effect';
            sparkle.innerHTML = ['✨', '⭐', '💫', '✦', '💜', '💗'][Math.floor(Math.random() * 6)];
            
            // Random position around the element
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            
            sparkle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                font-size: ${12 + Math.random() * 16}px;
                pointer-events: none;
                z-index: 9999;
                animation: sparkle-float 1.5s ease-out forwards;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }, i * 80);
    }
}

// Add sparkle animation CSS
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle-float {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: translateY(-80px) scale(0.3) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING STICKERS ANIMATION
// ═══════════════════════════════════════════════════════════════════════════
function initFloatingStickers() {
    const stickers = document.querySelectorAll('.floating-stickers .sticker');
    
    stickers.forEach((sticker, index) => {
        // Add random movement
        let baseX = parseFloat(sticker.style.left) || Math.random() * 100;
        let baseY = parseFloat(sticker.style.top) || Math.random() * 100;
        
        // Gentle random drift animation
        setInterval(() => {
            const driftX = Math.sin(Date.now() / 2000 + index) * 10;
            const driftY = Math.cos(Date.now() / 2500 + index) * 10;
            
            sticker.style.transform = `translate(${driftX}px, ${driftY}px)`;
        }, 50);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// MOUSE SPARKLE TRAIL - Enhanced
// ═══════════════════════════════════════════════════════════════════════════
function initMouseSparkles() {
    const sparkleContainer = document.getElementById('sparkles');
    let lastSparkle = 0;
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < 50) return; // Throttle
        lastSparkle = now;
        
        if (Math.random() > 0.5) {
            createMouseSparkle(e.clientX, e.clientY, sparkleContainer);
        }
    });
    
    document.addEventListener('click', (e) => {
        // Burst of sparkles on click
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() - 0.5) * 100;
                const offsetY = (Math.random() - 0.5) * 100;
                createMouseSparkle(e.clientX + offsetX, e.clientY + offsetY, sparkleContainer);
            }, i * 30);
        }
    });
}

function createMouseSparkle(x, y, container) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle-particle';
    sparkle.innerHTML = ['✨', '💜', '⭐', '💗', '🦋', '💫'][Math.floor(Math.random() * 6)];
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.fontSize = (10 + Math.random() * 15) + 'px';
    
    container.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

// ═══════════════════════════════════════════════════════════════════════════
// PARALLAX BUTTERFLIES ON SCROLL
// ═══════════════════════════════════════════════════════════════════════════
function initParallaxButterflies() {
    const butterflies = document.querySelectorAll('.butterfly');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        butterflies.forEach((butterfly, index) => {
            const speed = 0.1 + (index * 0.05);
            const yOffset = scrollY * speed;
            butterfly.style.marginTop = yOffset + 'px';
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTO-SPAWNING SPARKLES
// ═══════════════════════════════════════════════════════════════════════════
function createAutoSparkles() {
    const sparkleContainer = document.getElementById('sparkles');
    
    setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle-particle';
        sparkle.innerHTML = ['✨', '💜', '⭐'][Math.floor(Math.random() * 3)];
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.fontSize = (8 + Math.random() * 12) + 'px';
        sparkle.style.opacity = '0.6';
        
        sparkleContainer.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 2000);
    }, 800);
}

// ═══════════════════════════════════════════════════════════════════════════
// LETTER JITTER EFFECT ON HOVER
// ═══════════════════════════════════════════════════════════════════════════
document.querySelectorAll('.letter').forEach(letter => {
    letter.addEventListener('mouseenter', () => {
        letter.style.animation = 'jitter 0.2s ease infinite';
    });
    
    letter.addEventListener('mouseleave', () => {
        letter.style.animation = '';
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// POLAROID TILT EFFECT
// ═══════════════════════════════════════════════════════════════════════════
document.querySelectorAll('.polaroid').forEach(polaroid => {
    polaroid.addEventListener('mousemove', (e) => {
        const rect = polaroid.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        polaroid.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    polaroid.addEventListener('mouseleave', () => {
        polaroid.style.transform = '';
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL PROGRESS INDICATOR (Optional)
// ═══════════════════════════════════════════════════════════════════════════
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const style = document.createElement('style');
    style.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(230, 224, 248, 0.3);
            z-index: 10001;
        }
        
        .scroll-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #C9A9D4, #E8B4C0, #FFD6E0, #E6E0F8);
            background-size: 200% 100%;
            width: 0%;
            transition: width 0.1s ease;
            animation: gradientShift 3s ease infinite;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        document.querySelector('.scroll-progress-bar').style.width = `${scrollPercent}%`;
    });
}

createScrollProgress();

// ═══════════════════════════════════════════════════════════════════════════
// CURSOR TRAIL EFFECT (Enhanced with butterflies)
// ═══════════════════════════════════════════════════════════════════════════
let lastCursorTrail = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastCursorTrail < 150) return; // Throttle
    lastCursorTrail = now;
    
    if (Math.random() > 0.6) {
        const trail = document.createElement('span');
        trail.className = 'cursor-trail';
        trail.innerHTML = ['✨', '💜', '⭐', '🦋', '💗'][Math.floor(Math.random() * 5)];
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: ${10 + Math.random() * 10}px;
            pointer-events: none;
            z-index: 9998;
            opacity: 0.8;
            animation: trail-fade 1.2s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1200);
    }
});

const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trail-fade {
        0% {
            opacity: 0.8;
            transform: scale(1) translateY(0) rotate(0deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.3) translateY(-40px) rotate(180deg);
        }
    }
`;
document.head.appendChild(trailStyle);

// ═══════════════════════════════════════════════════════════════════════════
// RAINBOW TEXT EFFECT ON HOVER
// ═══════════════════════════════════════════════════════════════════════════
document.querySelectorAll('.cutout-title').forEach(title => {
    title.addEventListener('mouseenter', () => {
        const letters = title.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.transform = 'scale(1.2) rotate(' + (Math.random() * 10 - 5) + 'deg)';
                setTimeout(() => {
                    letter.style.transform = '';
                }, 300);
            }, index * 50);
        });
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// TERM TABS FUNCTIONALITY - Midterms & Finals
// ═══════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    initTermTabs();
    initEventModal();
});

function initTermTabs() {
    const tabs = document.querySelectorAll('.term-tab');
    const midtermsContainer = document.getElementById('midterms-events');
    const finalsContainer = document.getElementById('finals-events');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const term = tab.dataset.term;
            
            if (term === 'midterms') {
                midtermsContainer.classList.remove('hidden');
                finalsContainer.classList.add('hidden');
            } else {
                midtermsContainer.classList.add('hidden');
                finalsContainer.classList.remove('hidden');
            }
            
            // Animate cards
            const activeContainer = term === 'midterms' ? midtermsContainer : finalsContainer;
            activeContainer.querySelectorAll('.event-card').forEach((card, i) => {
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = `fadeInUp 0.5s ease ${i * 0.1}s forwards`;
            });
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// EVENT MODAL FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════════════
const eventsData = {
    // MIDTERMS EVENTS
    'buwan-wika': {
        title: 'Buwan ng Wika 📚',
        date: 'August 22, 2025',
        images: [
            'MIDTERMS EVENTS & ACTIVITIES_/Aug. 22, 2025 - BUWAN NG WIKA/1.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Aug. 22, 2025 - BUWAN NG WIKA/2.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Aug. 22, 2025 - BUWAN NG WIKA/3.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Aug. 22, 2025 - BUWAN NG WIKA/4.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Aug. 22, 2025 - BUWAN NG WIKA/5.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Aug. 22, 2025 - BUWAN NG WIKA/6.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Aug. 22, 2025 - BUWAN NG WIKA/7.jpg'
        ],
        reflection: `On August 22, 2025, our institution celebrated Buwan ng Wika with the theme "Paglinang sa Filipino at Katutubong Wika: Makasaysayan sa Pagkakaisa ng Bansa." I enjoyed watching the performances, especially the songs, poems, and dances presented by different organizations, and I felt proud that our organization, the Solidarity of Integrated Governance of Mathematicians Association (SIGMA), placed second overall. I noticed how each group used tools such as digital slides, background music, and microphones to make their presentations clearer and more engaging. As a student, this made me more aware that careful planning, proper structure, and the smart use of available tools can turn simple ideas into meaningful presentations that communicate culture, identity, and unity in a more effective way.`
    },
    'do-day': {
        title: 'DO Day - Research Surveying 🔬',
        date: 'September 3, 2025',
        images: [
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 03, 2025 - DO DAY-RESEARCH SURVEYING IN D.Q/1.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 03, 2025 - DO DAY-RESEARCH SURVEYING IN D.Q/2.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 03, 2025 - DO DAY-RESEARCH SURVEYING IN D.Q/3.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 03, 2025 - DO DAY-RESEARCH SURVEYING IN D.Q/4.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 03, 2025 - DO DAY-RESEARCH SURVEYING IN D.Q/5.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 03, 2025 - DO DAY-RESEARCH SURVEYING IN D.Q/6.jpg'
        ],
        reflection: `On September 3, 2025, while our institution observed Do-Day, my research group and I were assigned to D.Q. Liwag National High School to administer our mathematics-related survey, strictly scheduled within the students' Mathematics periods as required by the school. This arrangement prevented us from returning to Abaño Campus to join the clean-up, so before leaving, we prepared and left cleaning materials as our modest contribution to the activity. The experience made me reflect on how academic commitments and community initiatives can overlap, requiring careful judgment in how we allocate our time and effort.`
    },
    'ict-ai': {
        title: 'ICT & AI in Classroom 💻',
        date: 'September 10, 2025',
        images: [
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 10, 2025 - GROUP EXPERIENTIAL LEARNING TASK %231_ USE OF ICT AND AI IN THE CLASSROOM/1.jpeg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 10, 2025 - GROUP EXPERIENTIAL LEARNING TASK %231_ USE OF ICT AND AI IN THE CLASSROOM/2.jpeg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 10, 2025 - GROUP EXPERIENTIAL LEARNING TASK %231_ USE OF ICT AND AI IN THE CLASSROOM/3.jpeg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 10, 2025 - GROUP EXPERIENTIAL LEARNING TASK %231_ USE OF ICT AND AI IN THE CLASSROOM/4.jpg'
        ],
        reflection: `Our first experiential learning task on September 10, 2025 involved creating and distributing a Google Forms survey to gather data on teachers' use of ICT and AI in the classroom. I developed the survey form while my groupmates helped disseminate it to various teachers, allowing us to collect responses efficiently. The findings revealed that many educators, especially in rural areas, have limited familiarity with ICT tools, face challenges with insufficient technological resources, and some remain hesitant to use AI due to concerns about overdependence. This experience broadened my understanding of the existing digital gaps within the teaching community and the importance of providing proper support to ensure equitable access to technology. Communicating with my former high school teachers also reminded me how digital platforms strengthen professional connections and simplify collaboration, reinforcing the value of technology when used thoughtfully and responsibly.`
    },
    'intrams': {
        title: 'Intercollegiate Meet 2025 🏆',
        date: 'September 15-19, 2025',
        images: [
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 15 - 19, 2025 - INTERCOLLEGIATE MEET 2025/1.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 15 - 19, 2025 - INTERCOLLEGIATE MEET 2025/2.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 15 - 19, 2025 - INTERCOLLEGIATE MEET 2025/3.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 15 - 19, 2025 - INTERCOLLEGIATE MEET 2025/4.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 15 - 19, 2025 - INTERCOLLEGIATE MEET 2025/5.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 15 - 19, 2025 - INTERCOLLEGIATE MEET 2025/6.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 15 - 19, 2025 - INTERCOLLEGIATE MEET 2025/7.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 15 - 19, 2025 - INTERCOLLEGIATE MEET 2025/8.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Sept. 15 - 19, 2025 - INTERCOLLEGIATE MEET 2025/9.jpeg'
        ],
        reflection: `The Pasiklaban Intercollegiate Meet 2025, held from September 15 to 19 in Camarines Norte State College, was a vibrant celebration of unity, talent, and school spirit as all nine departments—COED, CANR, COENG, CAS, COTT, CBPA, CFAST, CCMS, and Etienza—gathered to compete in a week-long showcase of skills. The opening day was filled with energy as each department proudly presented its flag, students wore their departmental shirts, and athletes paraded in their colorful uniforms to represent their academic homes. For the next several days, the competitions highlighted the dedication and discipline of the participants, and I genuinely enjoyed watching the events with my classmates as we supported our respective teams. The final day brought great pride to our department when the College of Education (COED) was declared the overall champion, a moment that strengthened my sense of belonging to the department. Reflecting on this experience, I realized that observing teamwork, strategy, and performance in a real-world setting deepened my understanding of how learning extends beyond the classroom: effective teaching, much like successful competitions, requires the thoughtful integration of content, learner needs, motivation, and supportive environment.`
    },
    'ai-activity': {
        title: 'A.I Activity 🤖',
        date: 'October 1, 2025',
        images: [
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 01, 2025 - A.I ACTIVITY_/1.png',
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 01, 2025 - A.I ACTIVITY_/2.png',
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 01, 2025 - A.I ACTIVITY_/3.png'
        ],
        reflection: `The AI Activity on October 1, 2025 introduced us to a range of modern digital tools that demonstrate how artificial intelligence can support students in completing academic tasks more efficiently and creatively. Sir Jake presented different AI platforms useful for designing presentations, enhancing images, developing e-portfolios, and producing other digital materials, all of which reflect the growing relevance of technology in the 21st-century learning environment. We explored Gemini, a powerful multimodal AI system capable of processing text, images, audio, video, and code, and I was able to generate sample AI-created photos during the session as you can see on the photos. We also discussed platforms such as Weebly, Wix, Canva, and MagicSchool, which offer accessible ways to design educational content and classroom materials. This experience made me appreciate how essential technological literacy has become for today's learners, as these tools not only simplify complex tasks but also expand opportunities for creativity, problem-solving, and self-directed learning.`
    },
    'teachers-day': {
        title: "Teacher's Day 👩‍🏫",
        date: 'October 2, 2025',
        images: [
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 02, 2025 - TEACHER_S DAY/1.jpeg',
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 02, 2025 - TEACHER_S DAY/2.jpeg',
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 02, 2025 - TEACHER_S DAY/3.jpeg'
        ],
        reflection: `The Teacher's Day on October 2, 2025 was a simple yet meaningful celebration as our class surprised our adviser, Ma'am Analyn, to express our gratitude for her guidance and support. Sharing this moment with BSED Mathematics 3A reminded me of the positive impact that dedicated teachers have on our growth as students and future educators. The experience deepened my appreciation for the teaching profession and inspired me to carry the same passion, patience, and commitment in my own journey toward becoming a teacher.`
    },
    'summative-test': {
        title: 'Summative Test 📝',
        date: 'October 8, 2025',
        images: [
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 08, 2025 - SUMMATIVE TEST/1.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 08, 2025 - SUMMATIVE TEST/2.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 08, 2025 - SUMMATIVE TEST/3.jpg'
        ],
        reflection: `The Summative Test Examination held on October 8, 2025 served as a meaningful reminder of the value of consistent effort and responsible learning. Knowing that almost all pre-service teachers passed and that Ms. Faye B. Batoon earned the highest score inspired me to stay focused and disciplined in my studies. The careful validation of the test items also highlighted the importance of fairness and reliability in assessments, which is essential in the field of education. This experience encouraged me to evaluate my own progress, strengthen the areas I find challenging, and continue striving toward academic growth and professional excellence.`
    },
    'midterm-exam': {
        title: 'Midterm Exam 📖',
        date: 'October 10, 2025',
        images: [
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 10, 2025 - MIDTERM EXAM/1.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 10, 2025 - MIDTERM EXAM/2.jpg',
            'MIDTERMS EVENTS & ACTIVITIES_/Oct. 10, 2025 - MIDTERM EXAM/3.jpg'
        ],
        reflection: `The Midterm Test Examination on October 10, 2025 made me reflect on my own progress and the effort I invested in preparing for it. Seeing the achievements of my classmates, especially the highest score earned by Ms. Janel Irish V. Pasatiempo, encouraged me to acknowledge both my strengths and the areas where I still need improvement. It reminded me that learning is a continuous process that requires focus, discipline, and consistency. This experience motivated me to push myself harder and aim for a higher score in the next examination. I realized that with better study habits, deeper understanding of the lessons, and a stronger commitment to my academic responsibilities, I can achieve better results. Moving forward, I am determined to improve, stay motivated, and strive for excellence in every assessment.`
    },
    
    // FINALS EVENTS
    'un-celebration': {
        title: 'United Nation Celebration 🌍',
        date: 'October 24, 2025',
        images: [
            'FINALS EVENTS & ACTIVITIES_/Oct. 24, 2025 - United Nation Celebration_/1.jpg',
            'FINALS EVENTS & ACTIVITIES_/Oct. 24, 2025 - United Nation Celebration_/2.jpg',
            'FINALS EVENTS & ACTIVITIES_/Oct. 24, 2025 - United Nation Celebration_/3.jpg',
            'FINALS EVENTS & ACTIVITIES_/Oct. 24, 2025 - United Nation Celebration_/4.jpg',
            'FINALS EVENTS & ACTIVITIES_/Oct. 24, 2025 - United Nation Celebration_/5.jpg',
            'FINALS EVENTS & ACTIVITIES_/Oct. 24, 2025 - United Nation Celebration_/6.jpg',
            'FINALS EVENTS & ACTIVITIES_/Oct. 24, 2025 - United Nation Celebration_/7.jpg',
            'FINALS EVENTS & ACTIVITIES_/Oct. 24, 2025 - United Nation Celebration_/8.jpg'
        ],
        reflection: `Attending the United Nations Day celebration on October 24, 2025 with the theme "Voices of Tomorrow: Empowering Communities for Global Change" made me reflect deeply on my responsibilities as a future educator. Seeing students use technology—such as digital presentations, background music, videos, and microphones—to share different cultures and global issues showed me how powerful these tools can be in giving learners a voice and helping them understand the world beyond the classroom. As a future teacher, I realized that Technology for Teaching and Learning 1 is not just about learning how to use tools, but about using them with purpose: to promote respect for diversity, encourage critical thinking, and inspire students to participate in solving real-life problems in their communities and in the world. The event reminded me that when I design future lessons and activities, I should use technology not only to make learning attractive, but also to guide my students to become compassionate, informed, and empowered members of a global society.`
    },
    'mental-health': {
        title: 'Mental Health Awareness 🧠',
        date: 'October 30, 2025',
        images: [
            'FINALS EVENTS & ACTIVITIES_/Oct. 30, 2025 - Mental Health Awareness Webinar/1.jpg',
            'FINALS EVENTS & ACTIVITIES_/Oct. 30, 2025 - Mental Health Awareness Webinar/2.jpg'
        ],
        reflection: `By attending the "Everyday Actions, Stronger Minds" webinar with the theme "Little Things Matter: Everyday Actions for Mental Health", I realized that caring for mental health is not only about big decisions or formal counseling, but also about the small, consistent choices I make every day. I learned that simple actions like pausing to breathe, checking in on myself and others, setting healthy boundaries, and practicing gratitude can slowly build emotional strength and resilience. The insights shared by Ms. Marie Angelica C. Paz, RPsy, RGC (the resource speaker) helped me understand that it is okay to feel overwhelmed at times, as long as I respond with kindness instead of self-criticism. As a future educator, this reminded me that creating a supportive classroom does not always require grand programs—sometimes, listening, encouraging, and modeling healthy habits can already make a meaningful difference in my students' well-being.`
    },
    'dales-cone': {
        title: "Dale's Cone Presentation 📐",
        date: 'November 3, 2025',
        images: [
            'FINALS EVENTS & ACTIVITIES_/Nov. 03, 2025 - Dale_s Cone of Experience Presentation/1.jpg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 03, 2025 - Dale_s Cone of Experience Presentation/2.jpg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 03, 2025 - Dale_s Cone of Experience Presentation/3.jpg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 03, 2025 - Dale_s Cone of Experience Presentation/4.jpg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 03, 2025 - Dale_s Cone of Experience Presentation/5.jpeg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 03, 2025 - Dale_s Cone of Experience Presentation/6.jpeg'
        ],
        reflection: `The Dale's Cone of Experience presentation on November 3, 2025 was quite exhausting and rewarding, especially because only two of us worked on designing and constructing the cone, which truly tested our patience, creativity, and sense of responsibility. I initially felt stressed knowing that some groupmates could not help due to other academic tasks like research, but this was balanced when two of them volunteered to handle the presentation so they could still meaningfully contribute to the group. During the presentation, I appreciated how our group did not just describe Dale's Cone of Experience but also corrected common misconceptions—such as the belief that it is a fixed hierarchy, a precise measure of retention, or a model that promotes passive learning. Instead, they clarified that the cone is only a visual guide that reminds teachers to provide varied, meaningful learning experiences, not a strict formula to follow. This experience strengthened my realization that, as a future educator, I should not be satisfied with appealing visual models alone but must critically examine the true intent behind educational theories and apply them wisely in planning learning activities that are suitable, engaging, and responsive to my students' needs.`
    },
    'research-defense': {
        title: 'Research Title Defense 🔬',
        date: 'November 22, 2025',
        images: [
            'FINALS EVENTS & ACTIVITIES_/Nov. 22, 2025 - Research Title Defense/1.jpg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 22, 2025 - Research Title Defense/2.jpg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 22, 2025 - Research Title Defense/3.jpg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 22, 2025 - Research Title Defense/4.jpg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 22, 2025 - Research Title Defense/5.jpg',
            'FINALS EVENTS & ACTIVITIES_/Nov. 22, 2025 - Research Title Defense/6.jpg'
        ],
        reflection: `The Research Title Defense on November 22, 2025 marked the peak of a very demanding week, as we juggled multiple requirements while rushing to polish our research paper and finalize the concept of our Algebrazzle Quest Puzzle. With the help of technology—such as online collaboration platforms, shared documents, and digital presentation tools—our team was able to organize ideas more efficiently and transform our initial concept into a clearer, researchable study. During the defense, the panel's questions and recommendations pushed me to think more deeply about how our research could truly address the needs of 21st-century learners, who learn best through interactive, engaging, and learner-centered approaches. When our research title was finally accepted, I felt a strong sense of fulfillment, not only because our hard work was recognized, but also because I realized that this process is training me to become a reflective future educator who uses research and technology to design learning experiences that genuinely support students' growth.`
    },
    'advocacy-video': {
        title: 'Advocacy Video 🎬',
        date: 'November 30, 2025',
        videos: [
            'FINALS EVENTS & ACTIVITIES_/Dec. 5, 2025 - Advocacy Video (Environmental Concern)/1.mp4'
        ],
        reflection: `Filming our Environmental Concern Advocacy Video made me realize that environmental issues are deeply connected not only to ordinary citizens like us students, but also to the actions and accountability of those in government. Through the use of digital tools—such as video editing software, online platforms, and social media—we were able to transform our ideas into a powerful message that does not only highlight pollution and environmental degradation, but also calls attention to corruption and unfinished "ghost projects" that harm communities and misuse public resources. As a student, I understood that even small actions, like producing advocacy content, sharing information online, and encouraging others to be more critical and responsible, can contribute to raising awareness and promoting change. This experience strengthened my belief that 21st-century learners are not just passive recipients of information, but active creators of digital content who can use technology to speak up, influence others, and participate meaningfully in nation-building.`
    },
    'week-talk': {
        title: 'Week Talk 🎤',
        date: 'December 5, 2025',
        images: [
            'FINALS EVENTS & ACTIVITIES_/Dec. 5, 2025 - Week Talk (Deal or No Deal)/1.jpg',
            'FINALS EVENTS & ACTIVITIES_/Dec. 5, 2025 - Week Talk (Deal or No Deal)/2.jpg',
            'FINALS EVENTS & ACTIVITIES_/Dec. 5, 2025 - Week Talk (Deal or No Deal)/3.jpg',
            'FINALS EVENTS & ACTIVITIES_/Dec. 5, 2025 - Week Talk (Deal or No Deal)/4.jpg',
            'FINALS EVENTS & ACTIVITIES_/Dec. 5, 2025 - Week Talk (Deal or No Deal)/5.jpg',
            'FINALS EVENTS & ACTIVITIES_/Dec. 5, 2025 - Week Talk (Deal or No Deal)/6.jpg',
            'FINALS EVENTS & ACTIVITIES_/Dec. 5, 2025 - Week Talk (Deal or No Deal)/7.jpg'
        ],
        reflection: `The Week Talk (Deal or No Deal) activity was a real emotional rollercoaster for me, especially because I only had about two days to prepare while also trying to finish several pending school requirements. Before my turn, I felt confident that I could answer whatever question I drew, since I had reviewed the lessons and trusted that I had something meaningful to say. However, the moment I was called, nerves started to take over—I suddenly worried that I might experience a mental block as soon as I saw the question. I chose briefcase number 20 because it is connected to my birthday, and the question I picked was: "Remember, it is not the technology tool, but it is the RIGHT BLEND of the THREE KNOWLEDGE AREAS." I was able to answer, but I knew that Sir Jake was looking for a deeper explanation, especially in relation to TCK, PCK, and TPK, and my nervousness held me back from fully elaborating my ideas. This experience made me realize that knowing the content is not enough; I also need to manage my emotions, organize my thoughts clearly, and connect my answers more strongly to key concepts like the TPACK framework. As a future educator, I see this as a valuable lesson to be more prepared, to practice expressing my ideas confidently, and to treat every recitation not just as a requirement, but as training for the kind of presence and clarity I will need in my own classroom someday.`
    }
};

let currentModalSlide = 0;
let currentEventId = null;
let touchStartX = 0;
let touchEndX = 0;

function initEventModal() {
    const modal = document.getElementById('eventModal');
    const modalSlides = document.getElementById('modalSlides');
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeEventModal();
        }
        if (e.key === 'ArrowLeft' && modal.classList.contains('active')) {
            changeModalSlide(-1);
        }
        if (e.key === 'ArrowRight' && modal.classList.contains('active')) {
            changeModalSlide(1);
        }
    });
    
    // Swipe support for modal slideshow
    if (modalSlides) {
        modalSlides.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        modalSlides.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            changeModalSlide(1); // Swipe left = next
        } else {
            changeModalSlide(-1); // Swipe right = prev
        }
    }
}

function openEventModal(eventId) {
    const event = eventsData[eventId];
    if (!event) return;
    
    currentEventId = eventId;
    currentModalSlide = 0;
    
    const modal = document.getElementById('eventModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalSlides = document.getElementById('modalSlides');
    const modalDots = document.getElementById('modalDots');
    const modalReflection = document.getElementById('modalReflection');
    
    // Set title and date
    modalTitle.textContent = event.title;
    modalDate.textContent = event.date;
    
    // Build slides
    const media = event.images || event.videos || [];
    const isVideo = !!event.videos;
    
    modalSlides.innerHTML = media.map((src, index) => `
        <div class="modal-slide ${index === 0 ? 'active' : ''}">
            ${isVideo 
                ? `<video src="${src}" controls autoplay></video>`
                : `<img src="${src}" alt="${event.title} - Photo ${index + 1}">`
            }
        </div>
    `).join('');
    
    // Build dots
    modalDots.innerHTML = media.map((_, index) => `
        <span class="modal-dot ${index === 0 ? 'active' : ''}" onclick="goToModalSlide(${index})"></span>
    `).join('');
    
    // Set reflection
    modalReflection.innerHTML = `<p>${event.reflection}</p>`;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop any playing videos
    const videos = modal.querySelectorAll('video');
    videos.forEach(v => v.pause());
}

function changeModalSlide(direction) {
    const event = eventsData[currentEventId];
    if (!event) return;
    
    const media = event.images || event.videos || [];
    const totalSlides = media.length;
    
    currentModalSlide += direction;
    
    if (currentModalSlide >= totalSlides) currentModalSlide = 0;
    if (currentModalSlide < 0) currentModalSlide = totalSlides - 1;
    
    updateModalSlides();
}

function goToModalSlide(index) {
    currentModalSlide = index;
    updateModalSlides();
}

function updateModalSlides() {
    const slides = document.querySelectorAll('.modal-slide');
    const dots = document.querySelectorAll('.modal-dot');
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentModalSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentModalSlide);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// CONSOLE EASTER EGG
// ═══════════════════════════════════════════════════════════════════════════
console.log('%c✨ Sour Cream Olivia Rodrigo Theme ✨', 
    'background: linear-gradient(135deg, #E6E0F8, #FFD6E0); color: #5A4A6B; font-size: 20px; padding: 10px 20px; border-radius: 10px; font-family: cursive;');
console.log('%c💜 Made with love for Andrea V. Romanillos 💜', 
    'color: #C9A9D4; font-size: 14px; font-family: cursive;');


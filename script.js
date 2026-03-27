document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animated counter for stats
    const stats = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stats when visible
                if (entry.target.classList.contains('about-stats') && !statsAnimated) {
                    statsAnimated = true;
                    stats.forEach(stat => animateCounter(stat));
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Star rating functionality
    const stars = document.querySelectorAll('.star');
    const ratingMessage = document.getElementById('ratingMessage');
    let hasRated = false;

    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            if (hasRated) return;
            
            const rating = index + 1;
            hasRated = true;
            
            stars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('active');
                }
            });

            const messages = [
                '¡Gracias! Tu opinión me ayuda a mejorar.',
                '¡Te agradezco mucho!',
                '¡Me alegra que te haya gustado!',
                '¡Excelente! Gracias por tu apoyo.',
                '¡Perfecto! 5 estrellas - ¡Eres genial!'
            ];
            
            ratingMessage.textContent = messages[rating - 1];
            console.log('Rating given:', rating, 'stars');
        });

        star.addEventListener('mouseenter', () => {
            if (!hasRated) {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.style.color = '#fbbf24';
                    }
                });
            }
        });

        star.addEventListener('mouseleave', () => {
            if (!hasRated) {
                stars.forEach(s => {
                    s.style.color = '';
                });
            }
        });
    });

    // Add fade-in class to sections for scroll animation
    document.querySelectorAll('.about-text, .project-card, .contact-info, .contact-form').forEach(el => {
        el.classList.add('fade-in');
    });

    // Parallax effect for hero (subtle)
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.project-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });
});

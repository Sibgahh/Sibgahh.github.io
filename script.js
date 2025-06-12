// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Get saved theme or default to system preference
function getTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return prefersDarkScheme.matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getTheme();
    applyTheme(currentTheme);
});

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

// Auto-show theme hint on homepage only
function initThemeHint() {
    const themeHint = document.querySelector('.theme-hint');
    
    // Only show on homepage (index.html or root path)
    const isHomepage = window.location.pathname === '/' || 
                      window.location.pathname.endsWith('index.html') || 
                      window.location.pathname === '/index.html' ||
                      window.location.pathname === '';
    
    if (themeHint && isHomepage) {
        // Check if user is in light mode (hint only makes sense in light mode)
        const currentTheme = document.documentElement.getAttribute('data-theme') || getTheme();
        
        if (currentTheme !== 'dark') {
            // Show hint automatically after page load
            setTimeout(() => {
                // Double-check theme hasn't changed
                const latestTheme = document.documentElement.getAttribute('data-theme') || getTheme();
                if (latestTheme !== 'dark') {
                    themeHint.classList.add('auto-show');
                    
                    // Hide hint after 10 seconds
                    setTimeout(() => {
                        themeHint.classList.remove('auto-show');
                    }, 10000);
                }
            }, 1000); // Show after 1 second delay to ensure page is loaded
        }
        
        // Also remove auto-show if user manually changes to dark theme
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    const currentTheme = document.documentElement.getAttribute('data-theme');
                    if (currentTheme === 'dark' && themeHint.classList.contains('auto-show')) {
                        themeHint.classList.remove('auto-show');
                    }
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
}

// Initialize theme hint when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initThemeHint();
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        isMenuOpen = false;
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (isMenuOpen) {
                isMenuOpen = false;
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("K5kCrSVNMbGjCi-Re");
})();

// Form Submission with Validation
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Add input validation styles
formInputs.forEach(input => {
    input.addEventListener('input', function() {
        validateInput(this);
    });

    input.addEventListener('blur', function() {
        validateInput(this);
    });
});

function validateInput(input) {
    const value = input.value.trim();
    const formGroup = input.closest('.form-group');
    
    // Remove existing validation classes
    formGroup.classList.remove('valid', 'invalid');
    
    if (value === '') {
        formGroup.classList.add('invalid');
        return false;
    }
    
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('invalid');
            return false;
        }
    }
    
    formGroup.classList.add('valid');
    return true;
}

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all inputs
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        return;
    }
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalContent = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
        <svg class="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
        <span>Sending...</span>
    `;
    submitBtn.disabled = true;

    try {
        // Prepare email parameters to match your template
        const templateParams = {
            name: contactForm.querySelector('#name').value,
            email: contactForm.querySelector('#email').value,
            subject: contactForm.querySelector('#subject').value,
            message: contactForm.querySelector('#message').value
        };

        // Send email using EmailJS
        await emailjs.send('service_oj04keh', 'template_cqchphe', templateParams);
        
        // Show success message
        submitBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Message Sent!</span>
        `;
        submitBtn.classList.add('success');
        
        // Reset form
        contactForm.reset();
        formInputs.forEach(input => {
            input.closest('.form-group').classList.remove('valid', 'invalid');
        });
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.classList.remove('success');
            submitBtn.disabled = false;
        }, 3000);
        
    } catch (error) {
        console.error('Error sending email:', error);
        // Show error message
        submitBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Error! Try Again</span>
        `;
        submitBtn.classList.add('error');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.classList.remove('error');
            submitBtn.disabled = false;
        }, 3000);
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Project Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.classList.remove('hidden');
                    card.setAttribute('data-aos', 'fade-up');
                    AOS.refresh();
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
});

// Typing Animation with cycling roles
const baseText = "Hi 👋, I'm an Indonesian ";
const roles = [
    "Junior Front-End Developer.",
    "UI/UX Enthusiast.",
    "Junior Mobile Developer."
];
const typingText = document.querySelector('.typing-text');
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let pauseTime = 2000; // Pause between complete text cycles

function typeWriter() {
    const currentRole = roles[roleIndex];
    const baseLength = baseText.length;
    
    if (!isDeleting) {
        // Typing the role part
        if (charIndex < currentRole.length) {
            typingText.textContent = baseText + currentRole.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Finished typing, pause then start deleting
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseTime);
        }
    } else {
        // Deleting only the role part
        if (charIndex > 0) {
            typingText.textContent = baseText + currentRole.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeWriter, deletingSpeed);
        } else {
            // Finished deleting, move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeWriter, 500); // Short pause before starting next role
        }
    }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
    // Set the base text immediately
    typingText.textContent = baseText;
    // Start typing the first role
    setTimeout(typeWriter, 500);
}); 
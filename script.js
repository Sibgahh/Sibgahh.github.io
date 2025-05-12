// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

mobileMenuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
});

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
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Project Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const viewGalleryButtons = document.querySelectorAll('.view-gallery');
    const closeGalleryButtons = document.querySelectorAll('.close-gallery');
    const galleries = document.querySelectorAll('.project-gallery');

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

    // Gallery functionality
    viewGalleryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const gallery = document.getElementById(`${projectId}-gallery`);
            
            if (gallery) {
                gallery.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    closeGalleryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const gallery = button.closest('.project-gallery');
            if (gallery) {
                gallery.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });

    // Close gallery when clicking outside
    galleries.forEach(gallery => {
        gallery.addEventListener('click', (e) => {
            if (e.target === gallery) {
                gallery.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close gallery with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            galleries.forEach(gallery => {
                gallery.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
});

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryButtons = document.querySelectorAll('.view-project');
    const contentGallery = document.getElementById('content-gallery');
    const closeGallery = document.querySelector('.close-gallery');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Open gallery when clicking view project button
    galleryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            contentGallery.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close gallery when clicking close button
    closeGallery.addEventListener('click', function() {
        contentGallery.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close gallery when clicking outside
    contentGallery.addEventListener('click', function(e) {
        if (e.target === contentGallery) {
            contentGallery.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Add click event to gallery items for lightbox
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="close-lightbox">×</button>
                </div>
            `;
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            // Close lightbox
            const closeLightbox = lightbox.querySelector('.close-lightbox');
            closeLightbox.addEventListener('click', function() {
                lightbox.remove();
                document.body.style.overflow = 'auto';
            });

            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.remove();
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
});

// Typing Animation
const text = "Hi 👋, I'm an Indonesian Front-End Junior Developer.";
const typingText = document.querySelector('.typing-text');
let charIndex = 0;

function type() {
    if (charIndex < text.length) {
        typingText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    }
}

// Start typing animation when page loads
window.addEventListener('load', type); 
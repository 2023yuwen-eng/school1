document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effect for cursor
    const interactiveElements = document.querySelectorAll('a, button, .product-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.borderColor = 'var(--secondary)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--primary)';
        });
    });

    // Reveal on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 0';
            navbar.style.backgroundColor = 'rgba(5, 5, 5, 0.9)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.backgroundColor = 'transparent';
        }
    });

    // Shopping Cart Logic
    let cartCount = 0;
    const cartCountEl = document.querySelector('.cart-count');
    const addButtons = document.querySelectorAll('.btn-add-cart');

    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            cartCount++;
            cartCountEl.textContent = cartCount;
            
            // Neon pulse animation on cart
            cartCountEl.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.5)', background: 'var(--primary)' },
                { transform: 'scale(1)' }
            ], {
                duration: 300
            });

            // Feedback alert
            const productName = btn.getAttribute('data-name');
            showNotification(`${productName} 已加入購物車`);
        });
    });

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            background: var(--bg-card);
            border: 1px solid var(--primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            backdrop-filter: blur(10px);
            z-index: 2000;
            box-shadow: 0 0 15px rgba(0,242,255,0.3);
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], { duration: 300 }).onfinish = () => notification.remove();
        }, 3000);
    }

    // Smooth Scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form Submission (Simulated)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('訊息已成功送出！我們將盡快聯繫您。');
            contactForm.reset();
        });
    }
});

// Added slideIn animation via JS to keep CSS clean
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

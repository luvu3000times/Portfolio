// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursorFollower.style.width = '35px';
        cursorFollower.style.height = '35px';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
    });
    
    // Links and buttons hover effect
    const links = document.querySelectorAll('a, button, .portfolio-item, .achievement-item');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursor.style.width = '0px';
            cursor.style.height = '0px';
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.borderWidth = '2px';
            cursorFollower.style.backgroundColor = 'transparent';
        });
        
        link.addEventListener('mouseleave', function() {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderWidth = '1px';
            cursorFollower.style.backgroundColor = 'transparent';
        });
    });
    
    // Sticky Header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Typing Animation
    let typed;
    const options = {
        strings: ['Computer Science Student', 'Web Developer', 'Database Management Enthusiast'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    };
    
    if (document.querySelector('.typed')) {
        typed = new Typed('.typed', options);
    }
    
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
    
    // Portfolio Modal
    const portfolioLinks = document.querySelectorAll('.portfolio-link');
    const modal = document.querySelector('.portfolio-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalTitle = document.querySelector('.modal-title');
    const modalImg = document.querySelector('.modal-img img');
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get portfolio item details
            const portfolioItem = this.closest('.portfolio-item');
            const title = portfolioItem.querySelector('h3').textContent;
            const category = portfolioItem.querySelector('p').textContent;
            const imgSrc = portfolioItem.querySelector('img').getAttribute('src');
            
            // Set modal content
            modalTitle.textContent = title;
            modalImg.setAttribute('src', imgSrc);
            
            // Show modal
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    modalClose.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    // Create dots
    testimonialItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Set up slider
    let currentSlide = 0;
    const slideWidth = 100; // 100%
    
    function goToSlide(index) {
        testimonialTrack.style.transform = `translateX(-${slideWidth * index}%)`;
        
        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Click on dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto slide
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialItems.length;
        goToSlide(currentSlide);
    }, 5000);
    
    // Animate skill bars on scroll
    const skillSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        const sectionPos = skillSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (sectionPos < screenPos) {
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        }
    }
    
    window.addEventListener('scroll', animateSkills);
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (name && email && subject && message) {
           
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
    
    animateSkills();
});
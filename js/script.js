document.addEventListener("DOMContentLoaded", function () {
    // Handle Google Sign-In
    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        // Send this token to your server for authentication.
    }

    // Toggle Navigation Menu (Mobile)
    const menu = document.querySelector('.nav-menu');
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Burger Menu Toggle
    function toggleMenu() {
        const navMenu = document.querySelector(".nav-menu");
        if (navMenu) {
            navMenu.classList.toggle("active");
        }
    }    

    // Modal Handling
    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");
    const loginBtn = document.getElementById("login-btn");
    const closeLogin = document.getElementById("closeLogin");
    const closeSignup = document.getElementById("closeSignup");
    const showSignup = document.getElementById("showSignup");
    const showLogin = document.getElementById("showLogin");

    if (loginBtn && loginModal) {
        loginBtn.addEventListener("click", () => {
            loginModal.style.display = "block";
        });
    }

    if (closeLogin && loginModal) {
        closeLogin.addEventListener("click", () => {
            loginModal.style.display = "none";
        });
    }

    if (showSignup && signupModal) {
        showSignup.addEventListener("click", (event) => {
            event.preventDefault();
            if (loginModal) loginModal.style.display = "none";
            signupModal.style.display = "block";
        });
    }

    if (closeSignup && signupModal) {
        closeSignup.addEventListener("click", () => {
            signupModal.style.display = "none";
        });
    }

    if (showLogin && loginModal) {
        showLogin.addEventListener("click", (event) => {
            event.preventDefault();
            if (signupModal) signupModal.style.display = "none";
            loginModal.style.display = "block";
        });
    }

    // Close Modal When Clicking Outside
    window.addEventListener("click", (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
        if (event.target === signupModal) {
            signupModal.style.display = "none";
        }
    });

    // Slider Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });
    }

    function nextSlide() {
        if (slides.length > 0) {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
        showSlide(currentSlide);
    }

    // Search Button Functionality (Placeholder)
    const searchBtn = document.getElementById("search-btn");
    const searchInput = document.getElementById("search-input");

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => {
            const query = searchInput.value;
            alert(`Search functionality not implemented yet. You searched for: "${query}"`);
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const burger = document.querySelector(".burger-menu");
    const navMenu = document.querySelector(".nav-menu");

    if (burger && navMenu) {
        burger.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }
});

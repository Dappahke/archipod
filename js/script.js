let slideIndex = 0;
let slides = document.querySelectorAll(".slide");

function showSlides(auto = true) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";

    if (auto) {
        setTimeout(() => showSlides(true), 5000); // Auto-change slide every 5 seconds
    }
}

function prevSlide() {
    slideIndex -= 2;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlides(false);
}

function nextSlide() {
    showSlides(false);
}

// Call the function initially
showSlides();

// Menu Toggle
function toggleMenu() {
    let nav = document.querySelector(".nav-menu ul"); // Updated selector
    nav.classList.toggle("active");
}

// Get elements
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const closeButtons = document.querySelectorAll(".close");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

// Open Modals
if (loginBtn && signupBtn) {
    loginBtn.addEventListener("click", () => loginModal.style.display = "flex");
    signupBtn.addEventListener("click", () => signupModal.style.display = "flex");
}

// Close Modals
closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
    });
});

// Toggle Between Login & Signup
if (showSignup && showLogin) {
    showSignup.addEventListener("click", (e) => {
        e.preventDefault();
        loginModal.style.display = "none";
        signupModal.style.display = "flex";
    });

    showLogin.addEventListener("click", (e) => {
        e.preventDefault();
        signupModal.style.display = "none";
        loginModal.style.display = "flex";
    });
}

// Close modal when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === loginModal) loginModal.style.display = "none";
    if (e.target === signupModal) signupModal.style.display = "none";
});

// Search Functionality
document.getElementById("search-btn").addEventListener("click", function() {
    let query = document.getElementById("search-input").value.trim();
    if (query) {
        alert("Searching for: " + query); // Replace this with actual search functionality
    } else {
        alert("Please enter a search term.");
    }
});let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (totalSlides === 0) {
        console.error("No slides found!");
        return;
    }
    
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    } else {
        console.error("Slider element not found!");
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

showSlide(currentSlide);
document.addEventListener("DOMContentLoaded", function () {
    showSlides();
});

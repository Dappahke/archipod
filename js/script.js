document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded ✅");

    /* ─── 🟠 BURGER MENU TOGGLE ─────────────────────────────────── */
    const burger = document.querySelector(".burger");
    const navMenu = document.querySelector("nav ul");

    if (burger && navMenu) {
        burger.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
            if (!navMenu.contains(event.target) && !burger.contains(event.target)) {
                navMenu.classList.remove("active");
            }
        });
    }

    /* ─── 🔵 MODAL FUNCTIONALITY (Login/Signup) ────────────────── */
    function openModal(modal) {
        modal.style.display = "flex";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    const loginBtn = document.getElementById("login-btn");
    const loginModal = document.getElementById("loginModal");
    const closeLogin = document.getElementById("closeLogin");
    const signupModal = document.getElementById("signupModal");
    const showSignup = document.getElementById("showSignup");
    const closeSignup = document.getElementById("closeSignup");
    const showLogin = document.getElementById("showLogin");

    if (loginBtn && loginModal && closeLogin) {
        loginBtn.addEventListener("click", function () {
            openModal(loginModal);
        });

        closeLogin.addEventListener("click", function () {
            closeModal(loginModal);
        });

        window.addEventListener("click", function (event) {
            if (event.target === loginModal) {
                closeModal(loginModal);
            }
        });
    }

    if (showSignup && signupModal && closeSignup && showLogin) {
        showSignup.addEventListener("click", function (event) {
            event.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        });

        closeSignup.addEventListener("click", function () {
            closeModal(signupModal);
        });

        showLogin.addEventListener("click", function (event) {
            event.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        });

        window.addEventListener("click", function (event) {
            if (event.target === signupModal) {
                closeModal(signupModal);
            }
        });
    }

    /* ─── 🟢 SLIDER FUNCTIONALITY ───────────────────────────────── */
    let currentIndex = 0;
    const projects = document.querySelectorAll('.slider-item');
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % projects.length;
        updateSlider();
    }, 5000);

    function updateSlider() {
        projects.forEach((item, index) => {
            item.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }

    /* ─── ✨ WELCOME ANIMATION ON LINK CLICK ───────────────────── */
    const links = document.querySelectorAll("a");
    const body = document.body;

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior
            
            // Create the welcome text element
            const welcomeText = document.createElement("div");
            welcomeText.innerText = "Welcome to The ArchiPod";
            welcomeText.classList.add("welcome-text");
            body.appendChild(welcomeText);

            // Animate the text
            setTimeout(() => {
                welcomeText.classList.add("fade-out");
            }, 2000); // Delay before fade out

            // Remove the element after animation
            setTimeout(() => {
                welcomeText.remove();
                window.location.href = link.href; // Redirect after animation
            }, 3000);
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded ✅");

    // News Filter
    const filterButtons = document.querySelectorAll(".filter-btn");
    const newsCards = document.querySelectorAll(".news-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");

            newsCards.forEach((card) => {
                const cardCategory = card.getAttribute("data-category");
                card.style.display = (category === "all" || cardCategory === category) ? "flex" : "none";
            });
        });
    });

    // Merch Filter
    const merchFilterButtons = document.querySelectorAll(".merch-filter-btn");
    const merchItems = document.querySelectorAll(".merch-item");

    merchFilterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            merchFilterButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");

            merchItems.forEach((item) => {
                item.style.display = (category === "all" || item.classList.contains(category)) ? "flex" : "none";
            });
        });
    });

    // Mobile Menu Toggle
    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.querySelector(".nav-menu ul");

    if (menuIcon) {
        menuIcon.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    // Burger menu toggle
    const burger = document.querySelector(".burger");
    const navMenuBurger = document.querySelector(".nav-menu");

    if (burger && navMenuBurger) {
        burger.addEventListener("click", function () {
            navMenuBurger.classList.toggle("active");
        });
    }

    // Upvote Button - Avoid Duplicate Listeners
    document.querySelectorAll('.upvote-btn').forEach(button => {
        button.addEventListener('click', function () {
            let countSpan = this.querySelector('.upvote-count');
            let count = parseInt(countSpan.textContent) + 1;
            countSpan.textContent = count;
        });
    });

    // Like Button - Firebase Update
    document.querySelectorAll(".like-btn").forEach(button => {
        button.addEventListener("click", function () {
            let projectId = this.dataset.id;
            likeProject(projectId);
        });
    });

    // Category Filter
    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", function () {
            let selectedCategory = this.value;
            let projectCards = document.querySelectorAll(".project-card");

            projectCards.forEach(card => {
                card.style.display = (selectedCategory === "all" || card.dataset.category === selectedCategory) ? "block" : "none";
            });
        });
    }
});

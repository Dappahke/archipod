document.addEventListener("DOMContentLoaded", function () {
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

// M-Pesa Payment Function
function initiateMpesa(amount) {
    let phone = prompt("Enter your M-Pesa number:");
    if (phone) {
        fetch("mpesa.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `phone=${phone}&amount=${amount}`
        })
        .then(response => response.json())
        .then(data => {
            alert("M-Pesa STK Push Sent. Approve on your phone.");
            console.log(data);
        })
        .catch(error => console.error("Error:", error));
    }
}

// Initialize Map
var map = L.map('projects-map').setView([0.0236, 37.9062], 6); // Kenya Centered

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Sample Project Locations
var projects = [
    { name: "Minimalist Loft", coords: [-1.2921, 36.8219] }, // Nairobi
    { name: "Eco Villa", coords: [0.2832, 34.7523] } // Kisumu
];

projects.forEach(project => {
    L.marker(project.coords).addTo(map).bindPopup(`<b>${project.name}</b>`);
});

// Firebase Firestore - Handling Projects
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { deleteDoc, getDocs, setDoc, doc, collection, addDoc, serverTimestamp, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const auth = getAuth();
const storage = getStorage(app);

// Sign Up
document.getElementById("signup-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
    } catch (error) {
        alert(error.message);
    }
});

// Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
    } catch (error) {
        alert(error.message);
    }
});

// Logout
document.getElementById("logout-btn")?.addEventListener("click", async () => {
    await signOut(auth);
    alert("Logged out!");
});

// Handle Project Submission
document.getElementById("project-form")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    let projectName = document.getElementById("project-name").value;
    let projectDescription = document.getElementById("project-description").value;
    let projectLocation = document.getElementById("project-location").value;
    let projectFile = document.getElementById("project-image").files[0];

    if (!projectFile) {
        alert("Please upload an image or video.");
        return;
    }

    let storageRef = ref(storage, `projects/${projectFile.name}`);
    await uploadBytes(storageRef, projectFile);
    let fileURL = await getDownloadURL(storageRef);

    await setDoc(doc(db, "projects", projectName), {
        name: projectName,
        description: projectDescription,
        location: projectLocation,
        upvotes: 0,
        fileURL: fileURL,
        status: "pending"
    });

    alert("Project submitted!");
});

// Secure OpenAI API Call - Move to Backend!
document.getElementById("generate-description")?.addEventListener("click", async function () {
    alert("This feature is disabled for security reasons. Use a backend API.");
});
document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded ✅");

    // Live Search
    const searchBar = document.querySelector(".search-bar");
    const competitionCards = document.querySelectorAll(".competition-card");

    searchBar.addEventListener("input", function (e) {
        console.log("Searching for:", e.target.value);
        const query = e.target.value.toLowerCase();
        competitionCards.forEach(card => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = title.includes(query) ? "block" : "none";
        });
    });

    // Countdown Timer
    function updateCountdown() {
        const countdownElement = document.querySelector(".countdown");
        if (!countdownElement) {
            console.log("Countdown element not found");
            return;
        }

        const deadline = new Date(countdownElement.dataset.deadline).getTime();
        const now = new Date().getTime();
        const timeLeft = deadline - now;

        if (timeLeft < 0) {
            countdownElement.textContent = "Competition Closed!";
            console.log("Competition Deadline Passed");
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Load More Competitions
    const loadMoreButton = document.querySelector(".load-more");
    const hiddenCompetitions = document.querySelectorAll(".competition-card.hidden");

    loadMoreButton.addEventListener("click", function () {
        console.log("Load More Clicked");
        hiddenCompetitions.forEach(card => card.classList.remove("hidden"));
        loadMoreButton.style.display = "none"; // Hide the button
    });

    // Comment Submission
    const commentInput = document.querySelector("#comment-text");
    const postCommentButton = document.querySelector("#post-comment");
    const commentsContainer = document.querySelector("#comments-container");

    postCommentButton.addEventListener("click", function () {
        const commentText = commentInput.value.trim();
        if (commentText) {
            console.log("New Comment Posted:", commentText);
            const commentElement = document.createElement("p");
            commentElement.textContent = commentText;
            commentsContainer.appendChild(commentElement);
            commentInput.value = ""; // Clear the input field
        }
    });
});
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("show");
}

// Highlight active page
document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.href;
    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add("active");
        }
    });
});

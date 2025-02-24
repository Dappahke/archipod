document.addEventListener("DOMContentLoaded", function () {
    // News Filter
    const filterButtons = document.querySelectorAll(".filter-btn");
    const newsCards = document.querySelectorAll(".news-card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Remove "active" class from all buttons
            filterButtons.forEach((btn) => btn.classList.remove("active"));

            // Add "active" class to the clicked button
            this.classList.add("active");

            // Get the category from the clicked button
            const category = this.getAttribute("data-category");

            // Show/Hide news cards based on category
            newsCards.forEach((card) => {
                const cardCategory = card.getAttribute("data-category");

                if (category === "all" || cardCategory === category) {
                    card.style.display = "flex"; // Show matching category
                } else {
                    card.style.display = "none"; // Hide non-matching categories
                }
            });
        });
    });

    // Merch Filter
    const merchFilterButtons = document.querySelectorAll(".merch-filter-btn");
    const merchItems = document.querySelectorAll(".merch-item");

    merchFilterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            merchFilterButtons.forEach((btn) => btn.classList.remove("active"));

            // Add active class to the clicked button
            this.classList.add("active");

            // Get the category from the button
            const category = this.getAttribute("data-category");

            // Show/Hide merchandise items based on category
            merchItems.forEach((item) => {
                if (category === "all" || item.classList.contains(category)) {
                    item.style.display = "flex"; // Use flex for layout
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Mobile Menu Toggle
    const menuIcon = document.querySelector(".menu-icon");
    const navMenu = document.querySelector(".nav-menu ul");

    menuIcon.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });
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

document.addEventListener("DOMContentLoaded", function() {
    console.log("CulturaCare Website Loaded");

    // Form Handling for Contact Page
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Thank you for reaching out! We will get back to you soon.");
            contactForm.reset();
        });
    }

    // Booking Doctor Functionality
    const doctorButtons = document.querySelectorAll(".book-doctor");
    doctorButtons.forEach(button => {
        button.addEventListener("click", function() {
            alert("Doctor appointment booked successfully!");
        });
    });

    // Medicine Order Form Handling
    const orderForm = document.getElementById("order-form");
    if (orderForm) {
        orderForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Your medicine order has been placed successfully!");
            orderForm.reset();
        });
    }

    // Community Forum Post and Reply Handling
    function loadPosts() {
        let savedPosts = localStorage.getItem("communityPosts");
        if (savedPosts) {
            document.getElementById("post-container").innerHTML = savedPosts;

            // Reattach event listeners to dynamically created buttons
            document.querySelectorAll(".reply-btn").forEach(button => {
                button.addEventListener("click", function() {
                    replyToPost(this);
                });
            });
            document.querySelectorAll(".delete-btn").forEach(button => {
                button.addEventListener("click", function() {
                    deletePost(this);
                });
            });
        }
    }

    function savePosts() {
        let posts = document.getElementById("post-container").innerHTML;
        localStorage.setItem("communityPosts", posts);
    }

    window.createPost = function() {
        let postContent = document.getElementById("post-content").value;
        if (postContent.trim() === "") {
            alert("Please enter a discussion topic.");
            return;
        }
        let postContainer = document.getElementById("post-container");
        let newPost = document.createElement("li");
        newPost.classList.add("post");
        newPost.innerHTML = `
            <p>${postContent}</p>
            <button class="reply-btn" style="background: green; color: white; padding: 5px 10px; border: none; margin-right: 10px;">Reply</button>
            <button class="delete-btn" style="background: red; color: white; padding: 5px 10px; border: none;">Delete</button>
            <div class="replies"></div>
        `;
        
        // Attach event listeners
        newPost.querySelector(".reply-btn").addEventListener("click", function() {
            replyToPost(this);
        });
        newPost.querySelector(".delete-btn").addEventListener("click", function() {
            deletePost(this);
        });
        
        postContainer.prepend(newPost);
        savePosts();
        document.getElementById("post-content").value = "";
    };

    window.replyToPost = function(button) {
        let replyText = prompt("Enter your reply:");
        if (replyText) {
            let replyDiv = button.nextElementSibling;
            let newReply = document.createElement("p");
            newReply.classList.add("reply");
            newReply.textContent = replyText;
            replyDiv.appendChild(newReply);
            savePosts();
        }
    };

    window.deletePost = function(button) {
        if (confirm("Are you sure you want to delete this post?")) {
            button.parentElement.remove();
            savePosts();
        }
    };

    window.searchPosts = function() {
        let query = document.getElementById("search").value.toLowerCase();
        let posts = document.querySelectorAll(".post");
        posts.forEach(post => {
            post.style.display = post.textContent.toLowerCase().includes(query) ? "block" : "none";
        });
    };

    document.getElementById("search").addEventListener("input", searchPosts);
    document.getElementById("post-btn").addEventListener("click", createPost);
    loadPosts();


    // Login Form Handling
    const loginForm = document.getElementById("login-form");
    const loginMessage = document.getElementById("login-message");

    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            // Get input values
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            // Simulated user authentication
            if (email === "admin@example.com" && password === "password123") {
                loginMessage.textContent = "Login Successful! Redirecting...";
                loginMessage.classList.remove("hidden");
                loginMessage.style.background = "#28a745";

                setTimeout(() => {
                    window.location.href = "dashboard.html"; // Redirect to a dashboard page
                }, 2000);
            } else {
                loginMessage.textContent = "Invalid email or password. Please try again.";
                loginMessage.classList.remove("hidden");
                loginMessage.style.background = "#dc3545";
            }
        });
    }

 // Signup Form Handling
 const signupForm = document.getElementById("signup-form");
 const signupMessage = document.getElementById("signup-message");

 if (signupForm) {
     signupForm.addEventListener("submit", function(event) {
         event.preventDefault();

         // Get input values
         let name = document.getElementById("name").value;
         let email = document.getElementById("email").value;
         let password = document.getElementById("password").value;
         let confirmPassword = document.getElementById("confirm-password").value;

         // Validate password match
         if (password !== confirmPassword) {
             alert("Passwords do not match. Please try again.");
             return;
         }

         // Simulated account creation
         signupMessage.textContent = "Account created successfully! Redirecting to login...";
         signupMessage.classList.remove("hidden");
         signupMessage.style.background = "#28a745";

         setTimeout(() => {
             window.location.href = "login.html"; // Redirect to login page
         }, 2000);
     });
 }
});

document.addEventListener("DOMContentLoaded", function() {
    const dietForm = document.getElementById("diet-form");
    const dietResult = document.getElementById("diet-result");

    const dietPlans = {
        "weight-loss": {
            "vegetarian": "Breakfast: Oatmeal with nuts 🥣<br>Lunch: Grilled tofu salad 🥗<br>Dinner: Lentil soup 🍲",
            "non-vegetarian": "Breakfast: Scrambled eggs with toast 🍳<br>Lunch: Grilled chicken with quinoa 🥩<br>Dinner: Salmon and steamed vegetables 🐟",
            "vegan": "Breakfast: Green smoothie 🍹<br>Lunch: Chickpea stir-fry 🥘<br>Dinner: Vegetable curry with rice 🍛"
        },
        "muscle-gain": {
            "vegetarian": "Breakfast: Greek yogurt with granola 🥣<br>Lunch: Paneer and quinoa bowl 🥗<br>Dinner: Lentils and spinach 🍲",
            "non-vegetarian": "Breakfast: Omelette with avocado 🍳<br>Lunch: Grilled steak with brown rice 🥩<br>Dinner: Chicken breast with sweet potatoes 🍗",
            "vegan": "Breakfast: Peanut butter smoothie 🥜<br>Lunch: Quinoa and beans salad 🥙<br>Dinner: Lentil stew with tofu 🍲"
        },
        "balanced": {
            "vegetarian": "Breakfast: Fruit smoothie 🍓<br>Lunch: Mixed veggie salad 🥗<br>Dinner: Whole wheat pasta with tomato sauce 🍝",
            "non-vegetarian": "Breakfast: Scrambled eggs and toast 🍳<br>Lunch: Grilled fish with veggies 🐟<br>Dinner: Chicken soup and salad 🍲",
            "vegan": "Breakfast: Almond butter toast 🥜<br>Lunch: Buddha bowl with quinoa 🥗<br>Dinner: Vegetable stir-fry 🍛"
        }
    };

    dietForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let goal = document.getElementById("goal").value;
        let preference = document.getElementById("preference").value;
        let dietPlan = dietPlans[goal][preference];

        dietResult.innerHTML = `<h3>Your Customized Diet Plan:</h3><p>${dietPlan}</p>`;
        dietResult.classList.remove("hidden");
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const forgotPasswordForm = document.getElementById("forgot-password-form");
    const forgotPasswordMessage = document.getElementById("forgot-password-message");

    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", function(event) {
            event.preventDefault();

            // Get email input value
            let email = document.getElementById("email").value;

            // Simulated email validation and reset process
            if (email.trim() === "") {
                alert("Please enter a valid email address.");
                return;
            }

            // Display success message
            forgotPasswordMessage.textContent = "A password reset link has been sent to your email!";
            forgotPasswordMessage.classList.remove("hidden");
            forgotPasswordMessage.style.background = "#28a745";

            // Simulated email sending delay
            setTimeout(() => {
                window.location.href = "login.html"; // Redirect to login page
            }, 3000);
        });
    }
});

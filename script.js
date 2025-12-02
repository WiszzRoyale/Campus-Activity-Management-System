document.addEventListener('DOMContentLoaded', function() {
    // Sample activity data with image paths
    const activities = [
        {
            id: 1,
            name: "AI & Python Coding Bootcamp",
            time: "2025-08-01 09:00",
            location: "Computer Science Building, Programming Lab",
            category: "academic",
            description: "Hands-on bootcamp to improve coding skill and AI development",
            longDesc: "This bootcamp is designed for students of all major related with engineering and technology. This bootcamp will walk you through the fundamentals of Python programming, and introduce you to real-world AI applications.",
            image: "images/coding.jpg",
            upcoming: true
        },
        {
            id: 2,
            name: "Football Tournament",
            time: "2025-08-15 16:00",
            location: "Sports Field 1",
            category: "sports",
            description: "Annual campus football tournament with team competitions",
            longDesc: "The annual campus football tournament is open to all students. Form teams up to 15 players. Games follow official FIFA rules.",
            image: "images/football.jpg",
            upcoming: true
        },
        {
            id: 3,
            name: "Art Exhibition",
            time: "2025-08-27 18:00",
            location: "Campus Art Main Hall",
            category: "arts",
            description: "Showcase of student artwork from various disciplines",
            longDesc: "The annual student art exhibition features works from painting, sculpture, digital art, and photography programs.",
            image: "images/art-exhibition.jpg",
            upcoming: true
        },
        {
            id: 4,
            name: "Programming Competition",
            time: "2025-09-10 10:00",
            location: "Computer Science Building",
            category: "academic",
            description: "Test your coding skills against fellow students",
            longDesc: "Challenge participants to solve algorithmic problems. Languages allowed: Python, Java, C++. Prizes include programming books and smart watches.",
            image: "images/programming.jpg",
            upcoming: true
        },
        {
            id: 5,
            name: "Yoga & Meditation",
            time: "2025-09-18 07:30",
            location: "First Playground",
            category: "sports",
            description: "Start your day with a calming yoga session",
            longDesc: "Take a break from academic stress and rejuvenate your body and mind with our Campus Yoga & Meditation with our certified yoga instructor.",
            image: "images/yoga.jpg",
            upcoming: true
        },
        {
            id: 6,
            name: "Creative Writing Workshop",
            time: "2025-09-29 16:00",
            location: "Library Art Room",
            category: "arts",
            description: "Explore various writing techniques and get feedback",
            longDesc: "This workshop series covers fiction, poetry, and creative nonfiction writing. Led by published authors.",
            image: "images/writing.jpg",
            upcoming: true
        },
        {
            id: 7,
            name: "Science Edu-Fair",
            time: "2025-10-07 10:00",
            location: "Science Hall Building",
            category: "academic",
            description: "Showcase innovative student projects and research",
            longDesc: "Annual science fair featuring projects for young minds to showcase scientific innovations, participate in live experiments, and explore the real-world impact of science and technology.",
            image: "images/science-fair.jpg",
            upcoming: true
        },
        {
            id: 8,
            name: "Theater Performance",
            time: "2025-11-14 18:30",
            location: "Campus Theater",
            category: "arts",
            description: "Student-led performance of classic play",
            longDesc: "Drama club presents a modern interpretation of a classic play. Open to all students and faculty.",
            image: "images/theater.jpg",
            upcoming: true
        }
    ];

    // DOM Elements
    const navLinks = document.querySelectorAll('nav a');
    const pages = document.querySelectorAll('.page');
    const categoryCards = document.querySelectorAll('.category-card');
    const activityTable = document.getElementById('activity-table');
    const registrationForm = document.getElementById('registration-form');
    const activitySelect = document.getElementById('activity');
    const successMessage = document.getElementById('registration-success');
    const backToActivitiesBtn = document.getElementById('back-to-activities');
    const userInfo = {
        name: document.getElementById('user-name'),
        id: document.getElementById('user-id'),
        major: document.getElementById('user-major'),
        email: document.getElementById('user-email')
    };
    const activitiesList = document.getElementById('activities-list');
    const noActivitiesMsg = document.getElementById('no-activities');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const eventCardsContainer = document.querySelector('.event-cards');
    const categoryFilter = document.getElementById('category-filter');

    // State variables
    let visibleActivities = 5;
    let currentFilter = 'all';
    let registeredActivities = JSON.parse(localStorage.getItem('registeredActivities')) || [];
    let userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

    // Initialize the app
    function init() {
        setupNavigation();
        setupEventListeners();
        populateActivityDropdown();
        loadUserProfile();
        renderUpcomingEvents();
        renderActivityTable();
        renderRegisteredActivities();
        showPage('home');
    }

    // Set up navigation
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const page = this.getAttribute('data-page');
                showPage(page);
                navMenu.classList.remove('show');
            });
        });
        
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        backToActivitiesBtn.addEventListener('click', function() {
            showPage('activities');
            successMessage.style.display = 'none';
        });
    }

    // Set up event listeners
    function setupEventListeners() {
        // Category filter dropdown
        categoryFilter.addEventListener('change', function() {
            currentFilter = this.value;
            visibleActivities = 5;
            renderActivityTable();
        });
        
        // Load more button with jQuery AJAX simulation
        $('#load-more').on('click', function() {
            const $btn = $(this);
            $btn.text('Loading...').prop('disabled', true);
            
            // Simulate AJAX request with setTimeout
            setTimeout(function() {
                visibleActivities += 3;
                renderActivityTable();
                
                // Check if we've loaded all activities
                const filteredActivities = currentFilter === 'all' 
                    ? activities 
                    : activities.filter(a => a.category === currentFilter);
                    
                if (visibleActivities >= filteredActivities.length) {
                    $btn.hide();
                } else {
                    $btn.text('Load More Activities').prop('disabled', false);
                }
            }, 800); // Simulate network delay
        });
        
        // Form submission
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                saveRegistration();
                showSuccessMessage();
            }
        });
        
        // Real-time form validation
        const formInputs = registrationForm.querySelectorAll('input, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
    }

    // Show a specific page
    function showPage(pageId) {
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(pageId).classList.add('active');
        
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.parentElement.classList.add('active');
            }
        });
    }

    // Render upcoming events on home page
    function renderUpcomingEvents() {
        eventCardsContainer.innerHTML = '';
        
        // Get upcoming events (first 3 by date)
        const upcoming = activities
            .filter(a => a.upcoming)
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .slice(0, 3);
        
        // Create event cards
        upcoming.forEach(activity => {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.innerHTML = `
                <img src="${activity.image}" alt="${activity.name}">
                <div class="event-card-content">
                    <h3>${activity.name}</h3>
                    <p>${activity.description}</p>
                    <p><strong>When:</strong> ${formatDate(activity.time)}</p>
                    <p><strong>Where:</strong> ${activity.location}</p>
                    <a href="#" class="details-link" data-id="${activity.id}">View Details</a>
                </div>
            `;
            eventCardsContainer.appendChild(card);
        });
        
        // Add event listeners to detail links
        document.querySelectorAll('.details-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const activityId = this.getAttribute('data-id');
                showActivityDetails(activityId);
            });
        });
    }

    // Render activity table
    function renderActivityTable() {
        activityTable.innerHTML = '';
        
        // Filter activities
        let filteredActivities = activities;
        if (currentFilter !== 'all') {
            filteredActivities = activities.filter(a => a.category === currentFilter);
        }
        
        // Get activities to show
        const toShow = filteredActivities.slice(0, visibleActivities);
        
        // Create table rows
        toShow.forEach(activity => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${activity.name}</td>
                <td>${formatDate(activity.time)}</td>
                <td>${activity.location}</td>
                <td>${capitalize(activity.category)}</td>
                <td><a href="#" class="details-link" data-id="${activity.id}">Details</a></td>
            `;
            activityTable.appendChild(row);
        });
        
        // Add event listeners to detail links
        document.querySelectorAll('.details-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const activityId = this.getAttribute('data-id');
                showActivityDetails(activityId);
            });
        });
        
        // Hide load more button if all activities are shown
        const loadMoreBtn = $('#load-more');
        if (filteredActivities.length <= visibleActivities) {
            loadMoreBtn.hide();
        } else {
            loadMoreBtn.show().text('Load More Activities').prop('disabled', false);
        }
    }

    // Show activity details
    function showActivityDetails(activityId) {
        const activity = activities.find(a => a.id === parseInt(activityId));
        
        if (activity) {
            const detailsContainer = document.querySelector('#details .details-container');
            detailsContainer.innerHTML = `
                <div class="details-header">
                    <img src="${activity.image}" alt="${activity.name}">
                </div>
                <div class="details-content">
                    <h2>${activity.name}</h2>
                    <p>${activity.longDesc}</p>
                    
                    <div class="details-info">
                        <div class="info-item">
                            <strong>Date & Time</strong>
                            <span>${formatDate(activity.time)}</span>
                        </div>
                        <div class="info-item">
                            <strong>Location</strong>
                            <span>${activity.location}</span>
                        </div>
                        <div class="info-item">
                            <strong>Category</strong>
                            <span>${capitalize(activity.category)}</span>
                        </div>
                    </div>
                    
                    <button class="back-btn">Back to Activities</button>
                </div>
            `;
            
            detailsContainer.querySelector('.back-btn').addEventListener('click', function() {
                showPage('activities');
            });
            
            showPage('details');
        }
    }

    // Populate activity dropdown
    function populateActivityDropdown() {
        activitySelect.innerHTML = '<option value="">Choose an activity</option>';
        
        activities.forEach(activity => {
            const option = document.createElement('option');
            option.value = activity.id;
            option.textContent = activity.name;
            activitySelect.appendChild(option);
        });
    }

    // Validate form
    function validateForm() {
        let isValid = true;
        const formInputs = registrationForm.querySelectorAll('input, select');
        
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Validate individual field
    function validateField(field) {
        const error = field.parentElement.querySelector('.error-message');
        
        if (field.validity.valid) {
            error.textContent = '';
            return true;
        }
        
        if (field.id === 'name' && field.value.length < 4) {
            error.textContent = 'Input your full name (at least 4 charecters)';
        } else if (field.id === 'student-id' && !/^\d{8}$/.test(field.value)) {
            error.textContent = 'Student ID must be 8 digits';
        } else if (field.validity.valueMissing) {
            error.textContent = 'This field is required';
        } else if (field.type === 'email' && field.validity.typeMismatch) {
            error.textContent = 'Please enter a valid email address';
        }
        
        return false;
    }

    // Save registration
    function saveRegistration() {
        const name = document.getElementById('name').value;
        const studentId = document.getElementById('student-id').value;
        const major = document.getElementById('major').value;
        const email = document.getElementById('email').value;
        const activityId = document.getElementById('activity').value;
        
        // Save user profile
        userProfile = { name, studentId, major, email };
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        
        // Save registration
        if (!registeredActivities.includes(parseInt(activityId))) {
            registeredActivities.push(parseInt(activityId));
            localStorage.setItem('registeredActivities', JSON.stringify(registeredActivities));
        }
        
        // Update profile display
        loadUserProfile();
        renderRegisteredActivities();
    }

    // Show success message
    function showSuccessMessage() {
        registrationForm.reset();
        registrationForm.style.display = 'none';
        successMessage.style.display = 'block';
    }

    // Load user profile
    function loadUserProfile() {
        if (userProfile.name) {
            userInfo.name.textContent = userProfile.name;
            userInfo.id.textContent = userProfile.studentId;
            userInfo.major.textContent = userProfile.major;
            userInfo.email.textContent = userProfile.email;
        }
    }

    // Render registered activities
    function renderRegisteredActivities() {
        activitiesList.innerHTML = '';
        
        if (registeredActivities.length === 0) {
            noActivitiesMsg.style.display = 'block';
            return;
        }
        
        noActivitiesMsg.style.display = 'none';
        
        registeredActivities.forEach(activityId => {
            const activity = activities.find(a => a.id === activityId);
            if (activity) {
                const activityEl = document.createElement('div');
                activityEl.className = 'registered-activity';
                activityEl.innerHTML = `
                    <div>
                        <h3>${activity.name}</h3>
                        <p>${formatDate(activity.time)} | ${activity.location}</p>
                    </div>
                    <button class="cancel-btn" data-id="${activity.id}">Cancel</button>
                `;
                activitiesList.appendChild(activityEl);
            }
        });
        
        document.querySelectorAll('.cancel-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const activityId = parseInt(this.getAttribute('data-id'));
                cancelRegistration(activityId);
            });
        });
    }

    // Cancel registration
    function cancelRegistration(activityId) {
        registeredActivities = registeredActivities.filter(id => id !== activityId);
        localStorage.setItem('registeredActivities', JSON.stringify(registeredActivities));
        renderRegisteredActivities();
    }

    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Helper function to capitalize words
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Initialize the app
    init();
});
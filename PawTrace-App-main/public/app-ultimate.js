// Global state
let currentUser = null;
let animals = [];
let feedLogs = [];
let userStats = {
    totalAnimals: 0,
    totalFeeds: 0,
    currentStreak: 0
};

// App initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🐾 PawTrace Magical Forest initializing...');
    
    // Test server connection
    testServerConnection();
    
    // Add test button after 2 seconds
    setTimeout(() => {
        addTestButton();
    }, 2000);
    
    // Start forest sounds
    const forestSounds = document.getElementById('forestSounds');
    if (forestSounds) {
        forestSounds.volume = 0.3;
        forestSounds.play().catch(e => console.log('🎵 Forest sounds play failed:', e));
    }
    
    // Start background music
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.volume = 0.2;
        bgMusic.play().catch(e => console.log('🎵 Music play failed:', e));
    }
    
    // Show splash screen
    showSplashScreen();
    
    // Load saved data
    loadFromLocalStorage();
    
    // Setup event listeners
    setupEventListeners();
    
    // Add 3D floating elements
    add3DElements();
});

// Test server connection
function testServerConnection() {
    fetch('/')
        .then(response => {
            console.log('Server test response status:', response.status);
            return response.text();
        })
        .then(data => {
            console.log('Server test response:', data);
            showToast('🌐 Server connected successfully!', 'success');
        })
        .catch(error => {
            console.error('Server connection error:', error);
            showToast('⚠️ Server connection failed', 'error');
        });
}

// Test register endpoint
function testRegisterEndpoint() {
    const testData = {
        fullName: "Test User",
        phoneNumber: "+911234567890",
        password: "123456",
        confirmPassword: "123456"
    };
    
    fetch('/test-register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testData)
    })
    .then(response => {
        console.log('Test register response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Test register response:', data);
        showToast('🧪 Test register working!', 'success');
    })
    .catch(error => {
        console.error('Test register error:', error);
        showToast('⚠️ Test register failed', 'error');
    });
}

// Add test button
function addTestButton() {
    const testBtn = document.createElement('button');
    testBtn.innerHTML = '🧪 Test Server';
    testBtn.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 10000;
        background: linear-gradient(135deg, #0077be, #00b4d8);
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 14px;
        box-shadow: 0 5px 15px rgba(0, 119, 190, 0.3);
    `;
    testBtn.onclick = testRegisterEndpoint;
    document.body.appendChild(testBtn);
}

// Add 3D floating elements
function add3DElements() {
    // Add gentle rain drops
    const rainContainer = document.getElementById('rain');
    if (rainContainer) {
        for (let i = 0; i < 30; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.left = Math.random() * 100 + '%';
            raindrop.style.animationDelay = Math.random() * 2 + 's';
            raindrop.style.animationDuration = (Math.random() * 1 + 1) + 's';
            rainContainer.appendChild(raindrop);
        }
    }
    
    // Add floating sea animals
    const animalsContainer = document.getElementById('animals');
    if (animalsContainer) {
        const animals = ['🐳', '🐋', '🐟', '🦈', '🐳', '🦑', '🐋', '🐟', '🦈', '🐳'];
        for (let i = 0; i < 8; i++) {
            const animal = document.createElement('div');
            animal.className = 'animal';
            animal.textContent = animals[Math.floor(Math.random() * animals.length)];
            animal.style.left = Math.random() * 100 + '%';
            animal.style.animationDelay = Math.random() * 30 + 's';
            animal.style.animationDuration = (Math.random() * 10 + 20) + 's';
            animal.style.fontSize = (Math.random() * 20 + 30) + 'px';
            animalsContainer.appendChild(animal);
        }
    }
}

// Avatar Creator Functions
let currentAvatar = {
    base: '👤',
    accessories: []
};

function openAvatarCreator() {
    const modal = document.getElementById('avatarCreator');
    if (modal) {
        modal.classList.remove('hidden');
        updateAvatarDisplay();
    } else {
        console.error('Avatar creator modal not found!');
        showToast('Avatar creator not available yet 🎨');
    }
}

function closeAvatarCreator() {
    const modal = document.getElementById('avatarCreator');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function selectAvatarBase(base) {
    currentAvatar.base = base;
    updateAvatarDisplay();
}

function addAccessory(accessory) {
    if (!currentAvatar.accessories.includes(accessory)) {
        currentAvatar.accessories.push(accessory);
        updateAvatarDisplay();
    }
}

function removeAccessory(accessory) {
    const index = currentAvatar.accessories.indexOf(accessory);
    if (index > -1) {
        currentAvatar.accessories.splice(index, 1);
        updateAvatarDisplay();
    }
}

function updateAvatarDisplay() {
    const avatarBase = document.querySelector('.avatar-base');
    const avatarAccessories = document.getElementById('avatarAccessories');
    
    if (avatarBase) {
        avatarBase.textContent = currentAvatar.base;
    }
    
    if (avatarAccessories) {
        avatarAccessories.innerHTML = currentAvatar.accessories.map(acc => 
            `<span style="cursor: pointer; margin: 0 5px;" onclick="removeAccessory('${acc}')">${acc}</span>`
        ).join(' ');
    }
}

function resetAvatar() {
    currentAvatar = {
        base: '👤',
        accessories: []
    };
    updateAvatarDisplay();
}

function saveAvatar() {
    const avatarPreview = document.getElementById('avatarPreview');
    if (avatarPreview) {
        const avatarString = currentAvatar.base + ' ' + currentAvatar.accessories.join(' ');
        avatarPreview.innerHTML = `<span style="font-size: 40px;">${avatarString}</span>`;
        closeAvatarCreator();
        showToast('Avatar saved successfully! 🎨');
    } else {
        console.error('Avatar preview not found!');
        showToast('Error saving avatar 🎨');
    }
}

// Add 3D floating elements
function add3DElements() {
    // Add gentle rain drops
    const rainContainer = document.getElementById('rain');
    if (rainContainer) {
        for (let i = 0; i < 30; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.left = Math.random() * 100 + '%';
            raindrop.style.animationDelay = Math.random() * 2 + 's';
            raindrop.style.animationDuration = (Math.random() * 1 + 1) + 's';
            rainContainer.appendChild(raindrop);
        }
    }
    
    // Add floating sea animals
    const animalsContainer = document.getElementById('animals');
    if (animalsContainer) {
        const animals = ['🐋', '🐬', '🐟', '🦈', '🐙', '🦑', '🦐', '🐚', '🦀', '🐢'];
        for (let i = 0; i < 8; i++) {
            const animal = document.createElement('div');
            animal.className = 'animal';
            animal.textContent = animals[Math.floor(Math.random() * animals.length)];
            animal.style.left = Math.random() * 100 + '%';
            animal.style.animationDelay = Math.random() * 30 + 's';
            animal.style.animationDuration = (Math.random() * 10 + 20) + 's';
            animal.style.fontSize = (Math.random() * 20 + 30) + 'px';
            animalsContainer.appendChild(animal);
        }
    }
}

// Splash Screen
function showSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    
    // Hide splash after 4 seconds and show registration
    setTimeout(() => {
        splashScreen.style.display = 'none';
        
        // Check if user is logged in
        if (currentUser) {
            showMainApp();
        } else {
            showRegistration();
        }
    }, 4000);
}

// Navigation between screens
function showRegistration() {
    hideAllScreens();
    document.getElementById('registrationScreen').classList.remove('hidden');
    playSound('click');
}

function showLogin() {
    hideAllScreens();
    document.getElementById('loginScreen').classList.remove('hidden');
    playSound('click');
}

function showOTP() {
    hideAllScreens();
    document.getElementById('otpScreen').classList.remove('hidden');
    startOTPTimer();
    playSound('click');
}

function showMainApp() {
    hideAllScreens();
    document.getElementById('mainApp').style.display = 'block';
    updateUI();
    playSound('success');
}

function hideAllScreens() {
    document.getElementById('splashScreen').style.display = 'none';
    document.getElementById('registrationScreen').classList.add('hidden');
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('otpScreen').classList.add('hidden');
    document.getElementById('mainApp').style.display = 'none';
}

// Sound effects
function playSound(type) {
    const audio = new Audio();
    switch(type) {
        case 'click':
            audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+6+OZURE';
            break;
        case 'success':
            audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+6+OZURE';
            break;
        case 'error':
            audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+6+OZURE';
            break;
    }
    audio.volume = 0.3;
    audio.play().catch(e => console.log('Sound play failed:', e));
}

// Event Listeners
function setupEventListeners() {
    // Registration form
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistration();
    });

    // OTP form
    document.getElementById('otpForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleOTPVerification();
    });

    // Login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });

    // Profile form
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleProfileUpdate();
    });

    // Animal form
    document.getElementById('animalForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addAnimal();
    });

    // Feed form
    document.getElementById('feedForm').addEventListener('submit', function(e) {
        e.preventDefault();
        feedAnimal();
    });

    // Feedback form
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        e.preventDefault();
        handleFeedback();
    });

    // Password strength checker
    document.getElementById('password').addEventListener('input', checkPasswordStrength);

    // OTP inputs auto-focus
    document.querySelectorAll('.otp-input').forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === 1 && index < 5) {
                document.querySelectorAll('.otp-input')[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && this.value === '' && index > 0) {
                document.querySelectorAll('.otp-input')[index - 1].focus();
            }
        });
    });
}

// Registration Handler
function handleRegistration() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        nickname: document.getElementById('nickname').value,
        profession: document.getElementById('profession').value,
        phoneNumber: document.getElementById('countryCode').value + document.getElementById('phoneNumber').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value,
        favoriteAnimals: Array.from(document.querySelectorAll('.animal-chip input:checked')).map(cb => cb.value)
    };

    // Validation
    if (!formData.fullName || !formData.phoneNumber || !formData.password) {
        showToast('⚠️ Please fill in all required fields', 'error');
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        showToast('⚠️ Passwords do not match', 'error');
        return;
    }

    if (formData.password.length < 6) {
        showToast('⚠️ Password must be at least 6 characters', 'error');
        return;
    }

    // Show loading
    showToast('🔄 Creating your account...', 'info');

    // Send to MongoDB backend
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        console.log('Registration response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Registration response data:', data);
        if (data.message === "User registered successfully") {
            // Store user data and token
            currentUser = data.user;
            localStorage.setItem('pawtrace_token', data.token);
            localStorage.setItem('pawtrace_user', JSON.stringify(currentUser));
            
            // Clear form
            document.getElementById('registrationForm').reset();
            
            // Show main app
            showMainApp();
            showToast(`🎉 Welcome to PawTrace, ${currentUser.fullName}!`, 'success');
        } else {
            showToast(`⚠️ ${data.message}`, 'error');
        }
    })
    .catch(error => {
        console.error('Registration error:', error);
        showToast('⚠️ Registration failed. Please try again.', 'error');
    });
}

// OTP Verification
function handleOTPVerification() {
    const otpInputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    
    if (otp.length !== 6) {
        showToast('⚠️ Please enter complete OTP', 'error');
        return;
    }

    // Check against demo OTP
    const demoOTP = sessionStorage.getItem('demoOTP');
    
    if (otp === demoOTP) {
        const registrationData = JSON.parse(sessionStorage.getItem('registrationData'));
        
        // Create user
        currentUser = {
            id: Date.now(),
            fullName: registrationData.fullName,
            nickname: registrationData.nickname || registrationData.fullName,
            profession: registrationData.profession,
            phoneNumber: registrationData.phoneNumber,
            favoriteAnimals: registrationData.favoriteAnimals,
            registeredAt: new Date().toISOString()
        };

        // Save to localStorage
        saveToLocalStorage();
        
        // Clear session data
        sessionStorage.removeItem('registrationData');
        sessionStorage.removeItem('demoOTP');
        
        // Show main app
        showMainApp();
        showToast(`🎉 Welcome to PawTrace, ${currentUser.fullName}!`, 'success');
    } else {
        showToast(`⚠️ Invalid OTP. The correct OTP is: ${demoOTP}`, 'error');
    }
}

// Login Handler
function handleLogin() {
    const phoneNumber = document.getElementById('loginCountryCode').value + document.getElementById('loginPhoneNumber').value;
    const password = document.getElementById('loginPassword').value;

    if (!phoneNumber || !password) {
        showToast('⚠️ Please enter phone number and password', 'error');
        return;
    }

    // Show loading
    showToast('🔄 Signing in...', 'info');

    // Send to MongoDB backend
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber, password })
    })
    .then(response => {
        console.log('Login response status:', response.status);
        return response.json();
    })
    .then(data => {
        console.log('Login response data:', data);
        if (data.message === "Login successful") {
            // Store user data and token
            currentUser = data.user;
            localStorage.setItem('pawtrace_token', data.token);
            localStorage.setItem('pawtrace_user', JSON.stringify(currentUser));
            
            // load animals from server now that we have token
            loadAnimalsFromServer();
            
            // Clear form
            document.getElementById('loginForm').reset();
            
            // Show main app
            showMainApp();
            showToast(`🎉 Welcome back, ${currentUser.fullName}!`, 'success');
        } else {
            showToast(`⚠️ ${data.message}`, 'error');
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        showToast('⚠️ Login failed. Please try again.', 'error');
    });
}

// Profile Update Handler
function handleProfileUpdate() {
    if (!currentUser) return;

    currentUser.fullName = document.getElementById('profileFullName').value;
    currentUser.nickname = document.getElementById('profileNickname').value;
    currentUser.profession = document.getElementById('profileProfession').value;

    saveToLocalStorage();
    showToast('✅ Profile updated successfully!', 'success');
}

// OTP Timer
function startOTPTimer() {
    let seconds = 60;
    const timerElement = document.getElementById('otpTimer');
    
    const interval = setInterval(() => {
        seconds--;
        timerElement.textContent = seconds;
        
        if (seconds <= 0) {
            clearInterval(interval);
            timerElement.textContent = '0';
        }
    }, 1000);
}

// Resend OTP
function resendOTP() {
    showToast('📱 OTP resent to your mobile number!', 'success');
    startOTPTimer();
}

// Back to Registration
function backToRegistration() {
    showRegistration();
}

// Password Strength Checker
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('passwordStrengthBar');
    
    let strength = 0;
    
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    const colors = ['#ff4757', '#ff6348', '#ffa502', '#32ff7e', '#18dcff'];
    const widths = ['20%', '40%', '60%', '80%', '100%'];
    
    strengthBar.style.background = colors[strength - 1] || '#e0e0e0';
    strengthBar.style.width = widths[strength - 1] || '0%';
}

// Avatar Creator
function openAvatarCreator() {
    showToast('🎨 Avatar creator coming soon! Design your unique avatar!', 'success');
}

// Main App Functions
function showPage(pageName) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageName + 'Page').classList.add('active');
    
    // Update page-specific content
    if (pageName === 'animals') {
        displayAnimals();
    } else if (pageName === 'feeding') {
        updateFeedSelect();
        displayFeedLogs();
    } else if (pageName === 'streaks') {
        generateStreakCalendar();
    } else if (pageName === 'community') {
        displayCommunity();
    } else if (pageName === 'profile') {
        loadProfileData();
    }
    
    playSound('click');
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('show');
    playSound('click');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('pawtrace_token');
    localStorage.removeItem('pawtrace_user');
    hideAllScreens();
    showLogin();
    showToast('👋 Logged out successfully', 'success');
}

// Settings Functions
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic.paused) {
        bgMusic.play();
        showToast('🎵 Music enabled', 'success');
    } else {
        bgMusic.pause();
        showToast('🔇 Music disabled', 'success');
    }
}

function toggleNotifications() {
    showToast('🔔 Notifications enabled', 'success');
}

function toggleDarkMode() {
    showToast('🌙 Dark mode coming soon!', 'success');
}

// Add Animal
function addAnimal() {
    const name = document.getElementById('animalName').value;
    const type = document.getElementById('animalType').value;
    const location = document.getElementById('animalLocation').value;
    const food = document.getElementById('animalFood').value;
    const description = document.getElementById('animalDescription').value;
    const photoFile = document.getElementById('animalPhoto').files[0];
    
    if (!name || !type || !location) {
        showToast('⚠️ Please fill in required fields', 'error');
        return;
    }

    if (!currentUser || !localStorage.getItem('pawtrace_token')) {
        showToast('⚠️ You must be logged in to add an animal', 'error');
        return;
    }

    // prepare server request
    const formData = new FormData();
    formData.append('name', name);
    formData.append('type', type);
    formData.append('location', location);
    if (food) formData.append('favoriteFood', food);
    if (description) formData.append('description', description);
    if (photoFile) formData.append('photo', photoFile);

    showToast('🔄 Adding animal to server...', 'info');

    fetch('/animals', {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem('pawtrace_token')
        },
        body: formData
    })
    .then(async res => {
        const text = await res.text();
        let data;
        try {
            data = text ? JSON.parse(text) : {};
        } catch (parseErr) {
            console.error('Failed to parse JSON response:', text);
            // keep data undefined
        }

        if (!res.ok) {
            console.error('Server returned error status', res.status, data || text);
            throw new Error((data && data.message) ? data.message : text || res.statusText);
        }

        return data;
    })
    .then(data => {
        if (data && data.animal) {
            const serverAnimal = Object.assign({}, data.animal, { id: data.animal._id || data.animal.id });
            animals.push(serverAnimal);
            userStats.totalAnimals++;
            saveToLocalStorage();
            updateUI();
            showToast(`🐾 ${data.animal.name} added successfully!`, 'success');
            document.getElementById('animalForm').reset();
            document.querySelector('[onclick="showPage(\'animals\')"]').click();
        } else {
            console.error('Add animal failed response (no animal):', data);
            showToast('⚠️ Could not add animal.', 'error');
        }
    })
    .catch(err => {
        console.error('Add animal error:', err);
        showToast('⚠️ Error adding animal.', 'error');
    });
}

function saveAnimalAndShow(animal) {
    animals.push(animal);
    userStats.totalAnimals++;
    
    // Clear form
    document.getElementById('animalForm').reset();
    
    saveToLocalStorage();
    updateUI();
    showToast(`🐾 ${animal.name} is now your friend!`, 'success');
    
    // Switch to animals page to see new friend
    document.querySelector('[onclick="showPage(\'animals\')"]').click();
}

// Feed Animal
function feedAnimal() {
    const animalId = document.getElementById('feedAnimalSelect').value;
    const note = document.getElementById('feedNote').value;
    const photoFile = document.getElementById('feedPhoto').files[0];

    if (!animalId) {
        showToast('⚠️ Please select an animal', 'error');
        return;
    }

    const animal = animals.find(a => a.id == animalId);
    if (!animal) return;

    // If user is logged in, send feed to server so it's persisted
    const token = localStorage.getItem('pawtrace_token');
    if (!token) {
        showToast('⚠️ You must be logged in to record a feeding', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('animalId', animalId);
    if (note) formData.append('note', note);
    if (photoFile) formData.append('photo', photoFile);

    showToast('🔄 Recording feeding on server...', 'info');

    fetch('/feed', {
        method: 'POST',
        headers: {
            'Authorization': token
        },
        body: formData
    })
    .then(async res => {
        const text = await res.text();
        let data;
        try { data = text ? JSON.parse(text) : {}; } catch (e) { console.error('Failed to parse feed response', text); }
        if (!res.ok) {
            console.error('Feed API error', res.status, data || text);
            throw new Error((data && data.message) ? data.message : text || res.statusText);
        }
        return data;
    })
    .then(data => {
        if (data && data.feedLog) {
            // Use server's feedLog (stores photo path)
            saveFeedAndShow(data.feedLog, animal, true);
        } else {
            console.error('Unexpected feed response:', data);
            showToast('⚠️ Could not record feeding.', 'error');
        }
    })
    .catch(err => {
        console.error('Feed error:', err);
        showToast('⚠️ Error recording feeding.', 'error');
    });
}

function saveFeedAndShow(feedLog, animal, isServer = false) {
    // If this came from the server, normalize fields
    const log = Object.assign({}, feedLog);
    if (isServer) {
        // server returns _id and fedAt as Date - ensure consistent client fields
        log.id = log._id || log.id || Date.now();
        log.fedAt = log.fedAt || log.createdAt || new Date().toISOString();
        log.photo = log.photo || null; // this will be a URL like /uploads/...
    }

    feedLogs.unshift(log);

    // Update animal stats
    animal.totalFeeds = (animal.totalFeeds || 0) + 1;
    animal.lastFed = new Date().toISOString();

    // Update user stats
    userStats.totalFeeds++;
    updateCurrentStreak();

    // Clear form
    document.getElementById('feedForm').reset();

    saveToLocalStorage();
    updateUI();
    displayFeedLogs();
    showToast(`🍖 You fed ${animal.name}!`, 'success');
}

// UI Updates
function updateUI() {
    if (!currentUser) return;
    
    // Update user avatar
    const userAvatar = document.getElementById('userAvatar');
    if (userAvatar) {
        userAvatar.textContent = currentUser.fullName.charAt(0).toUpperCase();
    }
    
    // Update dashboard stats
    const totalAnimalsCount = document.getElementById('totalAnimalsCount');
    const totalFeedsCount = document.getElementById('totalFeedsCount');
    const currentStreakCount = document.getElementById('currentStreakCount');
    
    if (totalAnimalsCount) totalAnimalsCount.textContent = userStats.totalAnimals;
    if (totalFeedsCount) totalFeedsCount.textContent = userStats.totalFeeds;
    if (currentStreakCount) currentStreakCount.textContent = userStats.currentStreak;
    
    // Update recent activity
    displayRecentActivity();
}

function loadProfileData() {
    if (!currentUser) return;
    
    document.getElementById('profileFullName').value = currentUser.fullName || '';
    document.getElementById('profileNickname').value = currentUser.nickname || '';
    document.getElementById('profileProfession').value = currentUser.profession || '';
}
function displayAnimals() {
    const container = document.getElementById('animalsList');
    if (!container) return;

    if (!animals || animals.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.8); font-size: 18px;">🍃 No animals added yet.</p>';
        return;
    }

    container.innerHTML = animals.map(a => `
        <div style="background: rgba(255,255,255,0.06); border-radius: 16px; padding: 18px; margin-bottom: 14px; display:flex; gap:16px; align-items:center;">
            ${a.photo ? `<div style="width:64px; height:64px; border-radius:12px; overflow:hidden; background:#fff; display:flex;align-items:center;justify-content:center;border:1px solid rgba(0,0,0,0.06);"><img src="${a.photo}" style="width:100%; height:100%; object-fit:cover; display:block;"/></div>` : `<div style="width:64px; height:64px; border-radius:12px; overflow:hidden; background:linear-gradient(135deg,#ff9a9e,#fecfef); display:flex;align-items:center;justify-content:center;font-size:32px;">${a.emoji || getAnimalEmoji(a.type)}</div>`}
            <div style="flex:1;">
                <div style="color:white;font-weight:600;font-size:16px;margin-bottom:6px;">${a.name}</div>
                <div style="color:rgba(255,255,255,0.75);font-size:13px;">${a.type || 'Unknown'} • ${a.location || 'Unknown location'}</div>
            </div>
            <div style="color:rgba(255,255,255,0.75);font-size:13px;">Feeds: ${a.totalFeeds || 0}</div>
        </div>
    `).join('');
}

function displayCommunity() {
    const container = document.getElementById('communityUsers');
    if (!container) return;

    container.innerHTML = '<p style="color: rgba(255,255,255,0.7)">Loading community...</p>';

    fetch('/leaderboard')
        .then(res => res.json())
        .then(data => {
            const users = (data && data.topUsers) ? data.topUsers : [];

            if (!users.length) {
                container.innerHTML = '<p style="color: rgba(255,255,255,0.7)">No community members yet.</p>';
                return;
            }

            container.innerHTML = users.map(user => {
                const avatar = user.avatar || '👤';
                const name = user.fullName || user.name || 'Unknown';
                const animalsCount = user.totalAnimalsAdded || user.totalAnimals || 0;
                const feeds = user.totalFeeds || 0;
                const rep = user.reputation || 0;
                const level = rep >= 500 ? 'Platinum' : (rep >= 200 ? 'Gold' : (rep >= 50 ? 'Silver' : 'Bronze'));

                return `
        <div style="background: rgba(255,255,255,0.08); border-radius: 20px; padding: 20px; margin-bottom: 16px; display: flex; align-items: center; gap: 14px;">
            <div style="width:52px; height:52px; border-radius:50%; display:flex;align-items:center;justify-content:center;font-size:22px; background:linear-gradient(135deg,#667eea,#764ba2);">${avatar}</div>
            <div style="flex:1;">
                <div style="color:white;font-weight:600;font-size:15px;">${name}</div>
                <div style="color:rgba(255,255,255,0.8);font-size:13px;">🐾 ${animalsCount} animals • 🍖 ${feeds} feeds</div>
            </div>
            <div style="color:#feca57;font-weight:600;">⭐ ${level}</div>
        </div>
    `;
            }).join('');
        })
        .catch(err => {
            console.error('Failed to load leaderboard:', err);
            container.innerHTML = '<p style="color: rgba(255,255,255,0.7)">Unable to load community.</p>';
        });
}

function updateFeedSelect() {
    const select = document.getElementById('feedAnimalSelect');
    if (!select) return;
    
    select.innerHTML = '<option value="">Choose an animal...</option>' +
        animals.map(animal => `<option value="${animal.id}">${animal.emoji} ${animal.name}</option>`).join('');
}

function displayFeedLogs() {
    const container = document.getElementById('feedLogs');
    if (!container) return;
    
    if (feedLogs.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.8); font-size: 18px;">🍖 No feeding activity yet. Feed your first animal friend!</p>';
        return;
    }
    
    container.innerHTML = feedLogs.slice(0, 10).map(log => `
        <div style="background: rgba(255,255,255,0.08); border-radius: 20px; padding: 25px; margin-bottom: 20px; border: 2px solid rgba(255,255,255,0.1);">
            <div style="display: flex; align-items: center; gap: 20px;">
                ${log.photo ? `<img src="${log.photo}" style="width: 60px; height: 60px; border-radius: 15px; object-fit: cover; border: 2px solid rgba(255,255,255,0.3);">` : 
                `<div style="width: 60px; height: 60px; border-radius: 15px; background: linear-gradient(135deg, #ff6b6b, #feca57); display: flex; align-items: center; justify-content: center; font-size: 24px; border: 2px solid rgba(255,255,255,0.3);">${log.animalEmoji}</div>`}
                <div style="flex: 1;">
                    <div style="color: white; font-weight: 600; margin-bottom: 8px; font-size: 18px;">🍖 Fed ${log.animalName}</div>
                    <div style="color: rgba(255,255,255,0.8); font-size: 14px; margin-bottom: 8px;">${formatDate(log.fedAt)}</div>
                    ${log.note ? `<div style="color: rgba(255,255,255,0.7); font-style: italic; font-size: 14px;">${log.note}</div>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function displayRecentActivity() {
    const container = document.getElementById('recentActivity');

    
    const recentActivities = feedLogs.slice(0, 5);
    
    if (recentActivities.length === 0) {
        container.innerHTML = '<p style="color: rgba(255,255,255,0.8); font-size: 16px;">📊 No recent activity</p>';
        return;
    }
    
    container.innerHTML = recentActivities.map(log => `
        <div style="padding: 15px 0; border-bottom: 2px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 15px;">
            <div style="font-size: 24px;">${log.animalEmoji}</div>
            <div style="flex: 1;">
                <div style="color: rgba(255,255,255,0.9); font-weight: 600; font-size: 16px;">🍖 Fed ${log.animalName}</div>
                <div style="color: rgba(255,255,255,0.7); font-size: 14px;">${formatDate(log.fedAt)}</div>
            </div>
        </div>
    `).join('');
}

function generateStreakCalendar() {
    const container = document.getElementById('streakCalendar');
    if (!container) return;
    
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    // Generate calendar grid
    const calendarDays = [];
    let currentMonth = new Date(oneYearAgo);
    
    while (currentMonth <= today) {
        const wasFed = feedLogs.some(log => {
            const feedDate = new Date(log.fedAt);
            return feedDate.toDateString() === currentMonth.toDateString();
        });
        
        const isToday = currentMonth.toDateString() === today.toDateString();
        
        calendarDays.push({
            date: currentMonth,
            wasFed: wasFed,
            isToday: isToday
        });
        
        currentMonth.setDate(currentMonth.getDate() + 1);
    }
    
    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <h3 style="color: white; font-size: 32px;">🔥 ${userStats.currentStreak} day streak!</h3>
            <p style="color: rgba(255,255,255,0.8); font-size: 18px;">${userStats.totalFeeds} total feeds</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px;">
            ${calendarDays.map(day => 
                `<div style="aspect-ratio: 1; border-radius: 5px; background: ${day.wasFed ? 'linear-gradient(45deg, #00b894, #00cec9)' : 'rgba(255,255,255,0.1)'}; ${day.isToday ? 'border: 3px solid #feca57; box-shadow: 0 0 20px rgba(254,202,87,0.5);' : ''}; transition: all 0.3s ease; cursor: pointer;" 
                      title="${day.date.toLocaleDateString()}"
                      onmouseover="this.style.transform='scale(1.2)'" 
                      onmouseout="this.style.transform='scale(1)'"></div>`
            ).join('')}
        </div>
    `;
}

function displayCommunity() {
    const container = document.getElementById('communityUsers');
    if (!container) return;
    
    const communityUsers = [];
    
    container.innerHTML = communityUsers.map(user => `
        <div style="background: rgba(255,255,255,0.08); border-radius: 20px; padding: 25px; margin-bottom: 20px; border: 2px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 20px; transition: all 0.3s ease;" 
             onmouseover="this.style.transform='translateY(-5px)'" 
             onmouseout="this.style.transform='translateY(0)'">
            <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); display: flex; align-items: center; justify-content: center; font-size: 28px; border: 3px solid rgba(255,255,255,0.3);">${user.avatar}</div>
            <div style="flex: 1;">
                <div style="color: white; font-weight: 600; margin-bottom: 8px; font-size: 18px;">${user.name}</div>
                <div style="color: rgba(255,255,255,0.8); font-size: 14px; margin-bottom: 5px;">🐾 ${user.animals} animals • 🍖 ${user.feeds} feeds</div>
                <div style="color: #feca57; font-size: 14px; font-weight: 600;">⭐ ${user.level} Caregiver</div>
            </div>
        </div>
    `).join('');
}

function handleFeedback() {
    const feedback = document.getElementById('feedbackText').value;
    
    if (!feedback.trim()) {
        showToast('⚠️ Please enter your feedback', 'error');
        return;
    }
    
    // In real app, this would send to backend
    console.log('Feedback received:', feedback);
    
    // Clear form
    document.getElementById('feedbackForm').reset();
    
    showToast('💜 Thank you for your feedback! We\'ll improve PawTrace based on your suggestions.', 'success');
}

// Helper functions
function getAnimalEmoji(type) {
    const typeLower = type.toLowerCase();
    if (typeLower.includes('dog')) return '🐕';
    if (typeLower.includes('cat')) return '🐈';
    if (typeLower.includes('cow')) return '🐄';
    if (typeLower.includes('bird')) return '🐦';
    if (typeLower.includes('rabbit')) return '🐰';
    if (typeLower.includes('fox')) return '🦊';
    return '🐾';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
}

function updateCurrentStreak() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let checkDate = new Date(today);
    
    while (true) {
        const wasFed = feedLogs.some(log => {
            const feedDate = new Date(log.fedAt);
            feedDate.setHours(0, 0, 0, 0);
            return feedDate.getTime() === checkDate.getTime();
        });
        
        if (wasFed) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    userStats.currentStreak = streak;
}

function displayCommunity() {
    const container = document.getElementById('communityUsers');
    if (!container) return;

    container.innerHTML = '<p style="color: rgba(255,255,255,0.7)">Loading community...</p>';

    fetch('/leaderboard')
        .then(res => res.json())
        .then(data => {
            const users = (data && data.topUsers) ? data.topUsers : [];

            if (!users.length) {
                container.innerHTML = '<p style="color: rgba(255,255,255,0.7)">No community members yet.</p>';
                return;
            }

            container.innerHTML = users.map(user => {
                const avatar = user.avatar || '👤';
                const name = user.fullName || user.name || 'Unknown';
                const animalsCount = user.totalAnimalsAdded || user.totalAnimals || 0;
                const feeds = user.totalFeeds || 0;
                const rep = user.reputation || 0;
                const level = rep >= 500 ? 'Platinum' : (rep >= 200 ? 'Gold' : (rep >= 50 ? 'Silver' : 'Bronze'));

                return `\n        <div style="background: rgba(255,255,255,0.08); border-radius: 20px; padding: 20px; margin-bottom: 16px; display: flex; align-items: center; gap: 14px;">\n            <div style="width:52px; height:52px; border-radius:50%; display:flex;align-items:center;justify-content:center;font-size:22px; background:linear-gradient(135deg,#667eea,#764ba2);">${avatar}</div>\n            <div style="flex:1;">\n                <div style="color:white;font-weight:600;font-size:15px;">${name}</div>\n                <div style="color:rgba(255,255,255,0.8);font-size:13px;">🐾 ${animalsCount} animals • 🍖 ${feeds} feeds</div>\n            </div>\n            <div style="color:#feca57;font-weight:600;">⭐ ${level}</div>\n        </div>\n    `;
            }).join('');
        })
        .catch(err => {
            console.error('Failed to load leaderboard:', err);
            container.innerHTML = '<p style="color: rgba(255,255,255,0.7)">Unable to load community.</p>';
        });
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    // Set color based on type
    switch(type) {
        case 'success':
            toast.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
            break;
        case 'error':
            toast.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
            break;
        default:
            toast.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Local Storage
function saveToLocalStorage() {
    localStorage.setItem('pawtrace_user', JSON.stringify(currentUser));
    localStorage.setItem('pawtrace_animals', JSON.stringify(animals));
    localStorage.setItem('pawtrace_feedLogs', JSON.stringify(feedLogs));
    localStorage.setItem('pawtrace_stats', JSON.stringify(userStats));
    
    // Save user to users list for login (only if user exists and has password)
    if (currentUser && currentUser.password) {
        let users = JSON.parse(localStorage.getItem('pawtrace_users') || '[]');
        const existingUserIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (existingUserIndex >= 0) {
            users[existingUserIndex] = currentUser;
        } else {
            users.push(currentUser);
        }
        
        localStorage.setItem('pawtrace_users', JSON.stringify(users));
        console.log('💾 User saved to localStorage:', currentUser.phoneNumber);
    }
}

function loadFromLocalStorage() {
    const savedUser = localStorage.getItem('pawtrace_user');
    const savedToken = localStorage.getItem('pawtrace_token');
    
    if (savedUser && savedToken) {
        currentUser = JSON.parse(savedUser);
        console.log('📋 User loaded from MongoDB:', currentUser.phoneNumber);
        // fetch animals from server so we have up-to-date list
        loadAnimalsFromServer();
    }
}

// fetch animals from backend and populate state/UI
function loadAnimalsFromServer() {
    const token = localStorage.getItem('pawtrace_token');
    if (!token) return;

    fetch('/animals', {
        headers: { 'Authorization': token }
    })
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data)) {
            animals = data.map(a => Object.assign({}, a, { id: a._id || a.id }));
            saveToLocalStorage();
            updateUI();
        }
    })
    .catch(err => {
        console.error('Unable to load animals from server:', err);
    });
}

// Make functions globally available
window.showRegistration = showRegistration;
window.showLogin = showLogin;
window.showOTP = showOTP;
window.showMainApp = showMainApp;
window.showPage = showPage;
window.logout = logout;
window.addAnimal = addAnimal;
window.feedAnimal = feedAnimal;
window.selectFriend = selectFriend;
window.resendOTP = resendOTP;
window.backToRegistration = backToRegistration;
window.openAvatarCreator = openAvatarCreator;
window.toggleUserMenu = toggleUserMenu;
window.handleProfileUpdate = handleProfileUpdate;
window.handleFeedback = handleFeedback;
window.toggleMusic = toggleMusic;
window.toggleNotifications = toggleNotifications;
window.toggleDarkMode = toggleDarkMode;

console.log('🐾 PawTrace Ultimate app loaded successfully!');

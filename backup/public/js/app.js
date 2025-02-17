// Constants
const API_URL = 'http://localhost:3000/api';

// DOM Elements
const donateBtn = document.getElementById('donate-btn');
const findBtn = document.getElementById('find-btn');
const loginLink = document.getElementById('login');
const registerLink = document.getElementById('register');

// Event Listeners
donateBtn.addEventListener('click', () => {
    if (isAuthenticated()) {
        window.location.href = '/donate.html';
    } else {
        window.location.href = '/login.html';
    }
});

findBtn.addEventListener('click', () => {
    if (isAuthenticated()) {
        window.location.href = '/find.html';
    } else {
        window.location.href = '/login.html';
    }
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/login.html';
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/register.html';
});

// Auth Functions
function isAuthenticated() {
    return localStorage.getItem('token') !== null;
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}

// API Functions
async function makeRequest(endpoint, method = 'GET', body = null) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json'
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Update UI based on authentication status
    if (isAuthenticated()) {
        loginLink.textContent = 'Logout';
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
        registerLink.style.display = 'none';
    }
}); 
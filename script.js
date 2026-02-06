// ===== PRANSAKHI - MAIN APPLICATION LOGIC =====

// Application State
const AppState = {
    currentScreen: 'splash',
    previousScreen: null,
    isListening: false,
    recognition: null,
    synthesis: null,
    currentResult: null,
    reminders: [],
    history: []
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('PRANSAKHI initializing...');
    
    // Load saved data from localStorage
    loadLocalStorage();
    
    // Initialize Speech APIs
    initializeSpeechAPIs();
    
    // Set up event listeners
    setupEventListeners();
    
    // Show splash screen, then home
    setTimeout(() => {
        navigateTo('home');
    }, 2500);
    
    // Render initial data
    renderReminders();
    renderHistory();
}

// ===== LOCAL STORAGE MANAGEMENT =====
function loadLocalStorage() {
    try {
        const savedReminders = localStorage.getItem('pransakhi_reminders');
        const savedHistory = localStorage.getItem('pransakhi_history');
        
        if (savedReminders) {
            AppState.reminders = JSON.parse(savedReminders);
        }
        
        if (savedHistory) {
            AppState.history = JSON.parse(savedHistory);
        }
        
        console.log('Loaded data from localStorage');
    } catch (error) {
        console.error('Error loading localStorage:', error);
    }
}

function saveToLocalStorage() {
    try {
        localStorage.setItem('pransakhi_reminders', JSON.stringify(AppState.reminders));
        localStorage.setItem('pransakhi_history', JSON.stringify(AppState.history));
        console.log('Data saved to localStorage');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

// ===== SPEECH APIS =====
function initializeSpeechAPIs() {
    // Speech Recognition (for voice input)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        AppState.recognition = new SpeechRecognition();
        AppState.recognition.continuous = false;
        AppState.recognition.interimResults = true;
        AppState.recognition.lang = 'en-IN'; // Indian English
        
        AppState.recognition.onresult = handleSpeechResult;
        AppState.recognition.onerror = handleSpeechError;
        AppState.recognition.onend = handleSpeechEnd;
        
        console.log('Speech Recognition initialized');
    } else {
        console.warn('Speech Recognition not supported');
    }
    
    // Speech Synthesis (for voice output)
    if ('speechSynthesis' in window) {
        AppState.synthesis = window.speechSynthesis;
        console.log('Speech Synthesis initialized');
    } else {
        console.warn('Speech Synthesis not supported');
    }
}

function startListening() {
    if (AppState.recognition) {
        try {
            AppState.recognition.start();
            AppState.isListening = true;
            
            // Update UI
            const micBtn = document.getElementById('main-mic-btn');
            if (micBtn) micBtn.classList.add('listening');
            
            console.log('Started listening');
        } catch (error) {
            console.error('Error starting speech recognition:', error);
            showToast('Voice input not available. Please type your symptoms.');
        }
    } else {
        showToast('Voice input not supported. Please type your symptoms.');
    }
}

function stopListening() {
    if (AppState.recognition && AppState.isListening) {
        AppState.recognition.stop();
        AppState.isListening = false;
        
        const micBtn = document.getElementById('main-mic-btn');
        if (micBtn) micBtn.classList.remove('listening');
        
        console.log('Stopped listening');
    }
}

function handleSpeechResult(event) {
    const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
    
    const transcriptElement = document.getElementById('transcript-text');
    if (transcriptElement) {
        transcriptElement.textContent = transcript;
        transcriptElement.style.fontStyle = 'normal';
        transcriptElement.style.color = 'var(--text-primary)';
    }
    
    // Also update input field
    const symptomInput = document.getElementById('symptom-input');
    if (symptomInput) {
        symptomInput.value = transcript;
    }
    
    // If final result, analyze
    if (event.results[0].isFinal) {
        console.log('Final transcript:', transcript);
        setTimeout(() => {
            analyzeAndShowResult(transcript);
        }, 500);
    }
}

function handleSpeechError(event) {
    console.error('Speech recognition error:', event.error);
    AppState.isListening = false;
    
    if (event.error === 'no-speech') {
        showToast('No speech detected. Please try again or type your symptoms.');
    } else if (event.error === 'not-allowed') {
        showToast('Microphone access denied. Please enable it in browser settings.');
    } else {
        showToast('Voice input error. Please type your symptoms instead.');
    }
}

function handleSpeechEnd() {
    AppState.isListening = false;
    const micBtn = document.getElementById('main-mic-btn');
    if (micBtn) micBtn.classList.remove('listening');
}

function speak(text) {
    if (AppState.synthesis) {
        // Cancel any ongoing speech
        AppState.synthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-IN';
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1;
        utterance.volume = 1;
        
        AppState.synthesis.speak(utterance);
        console.log('Speaking:', text);
    } else {
        console.warn('Speech synthesis not available');
    }
}

// ===== NAVIGATION =====
function navigateTo(screenName, saveHistory = true) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        if (saveHistory) {
            AppState.previousScreen = AppState.currentScreen;
        }
        AppState.currentScreen = screenName;
        
        setTimeout(() => {
            targetScreen.classList.add('active');
        }, 50);
        
        console.log(`Navigated to: ${screenName}`);
    }
}

function goBack() {
    if (AppState.previousScreen) {
        navigateTo(AppState.previousScreen, false);
    } else {
        navigateTo('home', false);
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Main mic button
    const mainMicBtn = document.getElementById('main-mic-btn');
    if (mainMicBtn) {
        mainMicBtn.addEventListener('click', () => {
            navigateTo('listening');
            setTimeout(() => startListening(), 500);
        });
    }
    
    // Stop listening button
    const stopBtn = document.getElementById('stop-listening');
    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            stopListening();
            goBack();
        });
    }
    
    // Submit symptoms button
    const submitBtn = document.getElementById('submit-symptoms');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const input = document.getElementById('symptom-input');
            if (input && input.value.trim()) {
                stopListening();
                analyzeAndShowResult(input.value);
            } else {
                showToast('Please describe your symptoms');
            }
        });
    }
    
    // Enter key in symptom input
    const symptomInput = document.getElementById('symptom-input');
    if (symptomInput) {
        symptomInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && symptomInput.value.trim()) {
                stopListening();
                analyzeAndShowResult(symptomInput.value);
            }
        });
    }
    
    // Read advice button
    const readAdviceBtn = document.getElementById('read-advice');
    if (readAdviceBtn) {
        readAdviceBtn.addEventListener('click', () => {
            if (AppState.currentResult && AppState.currentResult.treatment) {
                speak(AppState.currentResult.treatment.speak);
            }
        });
    }
    
    // Add reminder button
    const addReminderBtn = document.getElementById('add-reminder');
    if (addReminderBtn) {
        addReminderBtn.addEventListener('click', addReminder);
    }
    
    // Emergency buttons
    const callAmbulanceBtn = document.getElementById('call-ambulance');
    if (callAmbulanceBtn) {
        callAmbulanceBtn.addEventListener('click', () => {
            speak('Calling emergency services. Dial 108 for ambulance.');
            showToast('Emergency: Call 108 for ambulance');
            // In real app, this would trigger actual call
            window.location.href = 'tel:108';
        });
    }
    
    const notifyFamilyBtn = document.getElementById('notify-family');
    if (notifyFamilyBtn) {
        notifyFamilyBtn.addEventListener('click', () => {
            speak('Sending alert to your family members.');
            showToast('Emergency alert sent to family');
            // Mock notification
            setTimeout(() => {
                showToast('✓ Family members notified');
            }, 1500);
        });
    }
    
    const emergencyInstructionsBtn = document.getElementById('emergency-instructions');
    if (emergencyInstructionsBtn) {
        emergencyInstructionsBtn.addEventListener('click', () => {
            const instructions = 'In case of emergency: Stay calm, call 108 for ambulance, lie down if feeling weak, keep phone nearby, and wait for help.';
            speak(instructions);
            showToast('Playing first aid instructions');
        });
    }
    
    // Navigation buttons (action cards and nav items)
    document.addEventListener('click', (e) => {
        const actionCard = e.target.closest('[data-screen]');
        if (actionCard) {
            const screenName = actionCard.getAttribute('data-screen');
            
            // Handle special case for symptoms
            if (screenName === 'symptoms') {
                navigateTo('listening');
                setTimeout(() => startListening(), 500);
            } else {
                navigateTo(screenName);
            }
            
            // Update nav active state
            if (actionCard.classList.contains('nav-item')) {
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.classList.remove('active');
                });
                actionCard.classList.add('active');
            }
        }
        
        // Back button
        const backBtn = e.target.closest('[data-back]');
        if (backBtn) {
            goBack();
        }
    });
}

// ===== SYMPTOM ANALYSIS =====
function analyzeAndShowResult(symptomText) {
    if (!symptomText || symptomText.trim() === '') {
        showToast('Please describe your symptoms');
        return;
    }
    
    console.log('Analyzing symptoms:', symptomText);
    
    // Show loading state
    showToast('Analyzing your symptoms...');
    
    // Simulate processing time
    setTimeout(() => {
        // Use the symptom database to analyze
        const result = analyzeSymptoms(symptomText);
        AppState.currentResult = result;
        
        // Save to history
        addToHistory(symptomText, result);
        
        // Display result
        displayResult(result);
        
        // Navigate to result screen
        navigateTo('result');
        
        // Auto-play voice advice after a brief delay
        setTimeout(() => {
            if (result.treatment && result.treatment.speak) {
                speak(result.treatment.speak);
            }
        }, 1000);
        
    }, 1500);
}

function displayResult(result) {
    const resultContainer = document.getElementById('result-content');
    if (!resultContainer) return;
    
    const riskClass = `risk-${result.risk}`;
    const riskText = result.risk === 'high' ? 'HIGH RISK' : 
                     result.risk === 'medium' ? 'MEDIUM RISK' : 'LOW RISK';
    
    let html = `
        <div class="risk-badge ${riskClass}">${riskText}</div>
        <h3>${result.treatment.title}</h3>
        <p>${result.treatment.advice}</p>
        
        <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">What to do:</h4>
        <ul>
            ${result.treatment.actions.map(action => `<li>${action}</li>`).join('')}
        </ul>
    `;
    
    // Add specific condition advice if available
    if (result.specificAdvice && result.specificAdvice.length > 0) {
        result.specificAdvice.forEach(advice => {
            html += `
                <h4 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Tips for ${advice.condition}:</h4>
                <ul>
                    ${advice.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            `;
        });
    }
    
    resultContainer.innerHTML = html;
}

// ===== HISTORY MANAGEMENT =====
function addToHistory(symptoms, result) {
    const historyItem = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        symptoms: symptoms,
        risk: result.risk,
        conditions: result.conditions.join(', ')
    };
    
    AppState.history.unshift(historyItem); // Add to beginning
    
    // Keep only last 20 items
    if (AppState.history.length > 20) {
        AppState.history = AppState.history.slice(0, 20);
    }
    
    saveToLocalStorage();
    renderHistory();
}

function renderHistory() {
    const historyContainer = document.getElementById('history-container');
    if (!historyContainer) return;
    
    if (AppState.history.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <p>No consultation history yet</p>
            </div>
        `;
        return;
    }
    
    const html = AppState.history.map(item => {
        const riskClass = `risk-${item.risk}`;
        return `
            <div class="history-item">
                <div class="history-date">${item.date}</div>
                <div class="risk-badge ${riskClass}" style="margin-bottom: 0.5rem;">${item.risk.toUpperCase()}</div>
                <h4>Symptoms: ${item.symptoms}</h4>
                <p>Detected: ${item.conditions}</p>
            </div>
        `;
    }).join('');
    
    historyContainer.innerHTML = html;
}

// ===== MEDICINE REMINDERS =====
function addReminder() {
    const nameInput = document.getElementById('medicine-name');
    const timeInput = document.getElementById('medicine-time');
    const dosageInput = document.getElementById('medicine-dosage');
    
    const name = nameInput.value.trim();
    const time = timeInput.value;
    const dosage = dosageInput.value.trim();
    
    if (!name || !time) {
        showToast('Please fill in medicine name and time');
        return;
    }
    
    const reminder = {
        id: Date.now(),
        name: name,
        time: time,
        dosage: dosage || '1 tablet',
        created: new Date().toLocaleDateString()
    };
    
    AppState.reminders.push(reminder);
    saveToLocalStorage();
    renderReminders();
    
    // Clear inputs
    nameInput.value = '';
    timeInput.value = '';
    dosageInput.value = '';
    
    // Show success
    showToast(`✓ Reminder set for ${name} at ${time}`);
    
    // Speak confirmation
    speak(`Reminder set for ${name} at ${time}. You will be notified.`);
}

function deleteReminder(id) {
    AppState.reminders = AppState.reminders.filter(r => r.id !== id);
    saveToLocalStorage();
    renderReminders();
    showToast('Reminder deleted');
}

function renderReminders() {
    const remindersContainer = document.getElementById('reminders-container');
    if (!remindersContainer) return;
    
    if (AppState.reminders.length === 0) {
        remindersContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💊</div>
                <p>No reminders set yet</p>
            </div>
        `;
        return;
    }
    
    const html = AppState.reminders.map(reminder => `
        <div class="reminder-item">
            <div class="reminder-info">
                <h4>${reminder.name}</h4>
                <p>${reminder.dosage}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div class="reminder-time">${reminder.time}</div>
                <button class="delete-reminder" onclick="deleteReminder(${reminder.id})">Delete</button>
            </div>
        </div>
    `).join('');
    
    remindersContainer.innerHTML = html;
}

// ===== NOTIFICATIONS =====
function showToast(message) {
    const toast = document.getElementById('notification-toast');
    const messageElement = toast.querySelector('.toast-message');
    
    if (messageElement) {
        messageElement.textContent = message;
    }
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====

// Make deleteReminder globally accessible
window.deleteReminder = deleteReminder;

// PWA Install prompt (optional)
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log('PWA install prompt available');
});

// Log app ready
console.log('PRANSAKHI app loaded successfully');

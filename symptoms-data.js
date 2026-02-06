// Mock symptom database with triage logic
const symptomsDatabase = {
    // Low risk symptoms
    lowRisk: {
        keywords: ['headache', 'mild fever', 'cold', 'cough', 'sore throat', 'runny nose', 'fatigue', 'tired', 'body ache', 'minor pain'],
        advice: {
            title: "Home Care Recommended",
            level: "low",
            recommendations: [
                "Get plenty of rest and sleep 7-8 hours",
                "Drink warm water and fluids regularly",
                "Take paracetamol for fever (500mg every 6 hours)",
                "Gargle with warm salt water for throat pain",
                "Avoid cold drinks and ice cream"
            ],
            warning: "If symptoms persist for more than 3 days or worsen, please visit a doctor.",
            duration: "Should improve in 2-3 days with rest"
        }
    },
    
    // Medium risk symptoms
    mediumRisk: {
        keywords: ['high fever', 'vomiting', 'diarrhea', 'severe headache', 'stomach pain', 'back pain', 'joint pain', 'rash', 'dizziness', 'weakness'],
        advice: {
            title: "Doctor Consultation Recommended",
            level: "medium",
            recommendations: [
                "Visit a doctor within 24 hours",
                "Keep track of your temperature and symptoms",
                "Stay hydrated - drink ORS or coconut water",
                "Avoid self-medication without doctor advice",
                "Rest and avoid strenuous activities"
            ],
            warning: "These symptoms need medical attention. Please consult a doctor soon.",
            duration: "Medical attention needed within 24 hours"
        }
    },
    
    // High risk symptoms
    highRisk: {
        keywords: ['chest pain', 'difficulty breathing', 'shortness of breath', 'severe bleeding', 'unconscious', 'seizure', 'severe injury', 'accident', 'heart attack', 'stroke', 'cannot breathe'],
        advice: {
            title: "Emergency - Seek Immediate Help",
            level: "high",
            recommendations: [
                "Call emergency number 108 immediately",
                "Do not wait - go to nearest hospital now",
                "Have someone stay with the patient",
                "Note down the time symptoms started",
                "Keep patient calm and comfortable"
            ],
            warning: "This is a medical emergency. Call 108 or go to emergency room immediately!",
            duration: "Immediate medical attention required"
        }
    },
    
    // Common conditions database
    conditions: {
        fever: {
            symptoms: ['fever', 'temperature', 'hot'],
            questions: ['How many days?', 'Temperature reading?', 'Any other symptoms?'],
            advice: 'Monitor temperature. If above 102°F or lasting more than 3 days, see doctor.'
        },
        digestive: {
            symptoms: ['stomach', 'vomiting', 'diarrhea', 'nausea', 'acidity'],
            questions: ['How long?', 'Any blood in stool/vomit?', 'Eating normally?'],
            advice: 'Stay hydrated with ORS. Avoid spicy food. If blood present, see doctor immediately.'
        },
        respiratory: {
            symptoms: ['cough', 'cold', 'breathing', 'throat', 'nose'],
            questions: ['Dry or wet cough?', 'Any fever?', 'Breathing difficulty?'],
            advice: 'Steam inhalation helps. Warm fluids. If breathing difficulty, seek immediate help.'
        }
    }
};

// Function to analyze symptoms and return advice
function analyzeSymptoms(symptomText) {
    const text = symptomText.toLowerCase();
    
    // Check for high risk first (most critical)
    for (let keyword of symptomsDatabase.highRisk.keywords) {
        if (text.includes(keyword)) {
            return symptomsDatabase.highRisk.advice;
        }
    }
    
    // Check for medium risk
    for (let keyword of symptomsDatabase.mediumRisk.keywords) {
        if (text.includes(keyword)) {
            return symptomsDatabase.mediumRisk.advice;
        }
    }
    
    // Default to low risk with general advice
    for (let keyword of symptomsDatabase.lowRisk.keywords) {
        if (text.includes(keyword)) {
            return symptomsDatabase.lowRisk.advice;
        }
    }
    
    // If no match, return general advice
    return {
        title: "General Health Advice",
        level: "low",
        recommendations: [
            "Monitor your symptoms for 24 hours",
            "Keep a record of how you're feeling",
            "Stay hydrated and get adequate rest",
            "If symptoms worsen, consult a doctor",
            "Maintain good hygiene and nutrition"
        ],
        warning: "For specific medical advice, please consult a healthcare professional.",
        duration: "Monitor and reassess in 24 hours"
    };
}

// Voice output messages for different scenarios
const voiceMessages = {
    greeting: "Hello! I am Pransakhi, your health companion. How can I help you today?",
    listening: "I'm listening. Please describe your symptoms.",
    analyzing: "Let me analyze your symptoms. Please wait.",
    lowRisk: "Based on your symptoms, this appears to be a minor condition. You can manage this at home with rest and care. Let me tell you what to do.",
    mediumRisk: "Your symptoms suggest you should see a doctor within 24 hours. Please don't ignore these signs.",
    highRisk: "This is a medical emergency! Please call 108 immediately or go to the nearest hospital. Do not delay!",
    reminderSet: "Your medicine reminder has been set successfully. I will remind you at the scheduled time.",
    emergency: "Emergency mode activated. Please stay calm. Help is on the way."
};

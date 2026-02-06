// Mock Symptom Database for Offline Triage
// This simulates AI-based symptom analysis

const SYMPTOM_DATABASE = {
    // Keywords mapped to conditions and risk levels
    keywords: {
        // High Risk - Emergency
        "chest pain": { risk: "high", condition: "Possible Heart Issue" },
        "heart attack": { risk: "high", condition: "Heart Emergency" },
        "stroke": { risk: "high", condition: "Stroke Symptoms" },
        "unconscious": { risk: "high", condition: "Loss of Consciousness" },
        "severe bleeding": { risk: "high", condition: "Severe Bleeding" },
        "can't breathe": { risk: "high", condition: "Breathing Emergency" },
        "difficulty breathing": { risk: "high", condition: "Respiratory Distress" },
        "choking": { risk: "high", condition: "Choking" },
        "seizure": { risk: "high", condition: "Seizure" },
        "severe headache": { risk: "high", condition: "Severe Headache" },
        "paralysis": { risk: "high", condition: "Paralysis" },
        
        // Medium Risk - Medical Attention Needed
        "fever": { risk: "medium", condition: "Fever" },
        "high fever": { risk: "medium", condition: "High Fever" },
        "vomiting": { risk: "medium", condition: "Vomiting" },
        "diarrhea": { risk: "medium", condition: "Diarrhea" },
        "stomach pain": { risk: "medium", condition: "Abdominal Pain" },
        "back pain": { risk: "medium", condition: "Back Pain" },
        "infection": { risk: "medium", condition: "Possible Infection" },
        "rash": { risk: "medium", condition: "Skin Rash" },
        "ear pain": { risk: "medium", condition: "Ear Pain" },
        "sore throat": { risk: "medium", condition: "Throat Infection" },
        "persistent cough": { risk: "medium", condition: "Persistent Cough" },
        "blood in urine": { risk: "medium", condition: "Hematuria" },
        "dizzy": { risk: "medium", condition: "Dizziness" },
        
        // Low Risk - Home Care
        "cold": { risk: "low", condition: "Common Cold" },
        "cough": { risk: "low", condition: "Cough" },
        "headache": { risk: "low", condition: "Headache" },
        "runny nose": { risk: "low", condition: "Cold Symptoms" },
        "minor cut": { risk: "low", condition: "Minor Injury" },
        "fatigue": { risk: "low", condition: "Fatigue" },
        "muscle pain": { risk: "low", condition: "Muscle Ache" },
        "joint pain": { risk: "low", condition: "Joint Pain" },
        "mild headache": { risk: "low", condition: "Mild Headache" },
        "sneezing": { risk: "low", condition: "Allergies/Cold" },
    },
    
    // Treatment advice based on risk level
    treatments: {
        high: {
            title: "⚠️ EMERGENCY - Immediate Action Required",
            advice: "This could be a medical emergency. Please seek immediate medical help.",
            actions: [
                "Call emergency services (108) immediately",
                "Do not drive yourself to hospital",
                "If possible, have someone stay with you",
                "Follow emergency first aid if trained",
                "Notify family members immediately"
            ],
            speak: "This appears to be a medical emergency. Please call 108 for an ambulance immediately. Do not delay seeking help."
        },
        medium: {
            title: "⚠️ Medical Attention Recommended",
            advice: "You should see a doctor soon. This condition may need professional treatment.",
            actions: [
                "Visit a doctor within 24 hours",
                "Monitor your symptoms closely",
                "Rest and stay hydrated",
                "Avoid strenuous activities",
                "Keep track of temperature if fever is present"
            ],
            speak: "You should see a doctor soon for proper diagnosis and treatment. Please visit a nearby clinic or hospital within 24 hours."
        },
        low: {
            title: "✓ Home Care Recommended",
            advice: "This condition can usually be managed at home with proper care.",
            actions: [
                "Get plenty of rest",
                "Drink lots of water and fluids",
                "Take over-the-counter medication if needed",
                "Monitor your symptoms for 2-3 days",
                "See a doctor if symptoms worsen or persist beyond 3 days"
            ],
            speak: "This condition can be managed at home with rest and care. Drink plenty of fluids, rest well, and monitor your symptoms. See a doctor if you don't feel better in 2 to 3 days."
        }
    },
    
    // Specific condition advice
    conditionAdvice: {
        "Common Cold": {
            tips: [
                "Rest for 7-10 days",
                "Drink warm liquids like tea or soup",
                "Gargle with warm salt water",
                "Use steam inhalation",
                "Take vitamin C supplements"
            ]
        },
        "Fever": {
            tips: [
                "Take paracetamol/acetaminophen as directed",
                "Apply cool compress on forehead",
                "Wear light clothing",
                "Monitor temperature every 4 hours",
                "See doctor if fever exceeds 102°F (39°C)"
            ]
        },
        "Headache": {
            tips: [
                "Rest in a quiet, dark room",
                "Apply cold or warm compress",
                "Drink plenty of water",
                "Take pain reliever if needed",
                "Avoid bright screens and loud noises"
            ]
        },
        "Cough": {
            tips: [
                "Drink warm water with honey",
                "Use cough syrup as directed",
                "Avoid cold drinks and ice cream",
                "Steam inhalation 2-3 times daily",
                "Avoid dusty or polluted areas"
            ]
        }
    }
};

// Function to analyze symptoms (used by main script)
function analyzeSymptoms(symptomText) {
    const text = symptomText.toLowerCase();
    let highestRisk = "low";
    let detectedConditions = [];
    
    // Check for keyword matches
    for (const [keyword, data] of Object.entries(SYMPTOM_DATABASE.keywords)) {
        if (text.includes(keyword)) {
            detectedConditions.push(data.condition);
            
            // Determine highest risk level
            if (data.risk === "high") {
                highestRisk = "high";
            } else if (data.risk === "medium" && highestRisk !== "high") {
                highestRisk = "medium";
            }
        }
    }
    
    // If no specific conditions detected, provide general advice
    if (detectedConditions.length === 0) {
        detectedConditions.push("General symptoms");
    }
    
    return {
        risk: highestRisk,
        conditions: detectedConditions,
        treatment: SYMPTOM_DATABASE.treatments[highestRisk],
        specificAdvice: getSpecificAdvice(detectedConditions)
    };
}

// Get specific advice for detected conditions
function getSpecificAdvice(conditions) {
    const advice = [];
    conditions.forEach(condition => {
        if (SYMPTOM_DATABASE.conditionAdvice[condition]) {
            advice.push({
                condition: condition,
                tips: SYMPTOM_DATABASE.conditionAdvice[condition].tips
            });
        }
    });
    return advice;
}

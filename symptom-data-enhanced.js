// Enhanced Symptom Database with MCQ Support and Synonym Tracking

const BODY_PARTS = {
    en: ['Head', 'Chest', 'Stomach', 'Throat', 'Body', 'Skin', 'Joints', 'Other'],
    hi: ['सिर', 'छाती', 'पेट', 'गला', 'पूरा शरीर', 'त्वचा', 'जोड़', 'अन्य'],
    mr: ['डोके', 'छाती', 'पोट', 'घसा', 'संपूर्ण शरीर', 'त्वचा', 'सांधे', 'इतर'],
    bn: ['মাথা', 'বুক', 'পেট', 'গলা', 'সম্পূর্ণ শরীর', 'ত্বক', 'জোড়', 'অন্যান্য'],
    pa: ['ਸਿਰ', 'ਛਾਤੀ', 'ਪੇਟ', 'ਗਲਾ', 'ਪੂਰਾ ਸਰੀਰ', 'ਚਮੜੀ', 'ਜੋੜ', 'ਹੋਰ'],
    ta: ['தலை', 'மார்பு', 'வயிறு', 'தொண்டை', 'முழு உடல்', 'தோல்', 'மூட்டுகள்', 'மற்றவை'],
    te: ['తల', 'ఛాతీ', 'కడుపు', 'గొంతు', 'పూర్తి శరీరం', 'చర్మం', 'కీళ్ళు', 'ఇతరత్రులు'],
    gu: ['માથું', 'છાતી', 'પેટ', 'ગળું', 'સંપૂર્ણ શરીર', 'ચામડી', 'સાંધા', 'અન્ય']
};

const SYMPTOMS_BY_PART = {
    head: {
        en: ['Headache', 'Dizziness', 'Eye pain', 'Ear pain', 'Toothache'],
        hi: ['सिरदर्द', 'चक्कर', 'आंख में दर्द', 'कान में दर्द', 'दांत दर्द'],
        synonyms: ['migraine', 'head pain', 'vertigo', 'spinning', 'dental pain']
    },
    chest: {
        en: ['Chest pain', 'Breathing difficulty', 'Cough', 'Heart palpitations'],
        hi: ['सीने में दर्द', 'सांस लेने में कठिनाई', 'खांसी', 'दिल की धड़कन'],
        synonyms: ['heart attack', 'cant breathe', 'shortness of breath', 'cardiac', 'asthma']
    },
    stomach: {
        en: ['Stomach pain', 'Nausea', 'Vomiting', 'Diarrhea', 'Loss of appetite'],
        hi: ['पेट दर्द', 'मतली', 'उल्टी', 'दस्त', 'भूख न लगना'],
        synonyms: ['abdominal pain', 'belly ache', 'indigestion', 'loose motions', 'food poisoning']
    },
    throat: {
        en: ['Sore throat', 'Difficulty swallowing', 'Voice change', 'Swollen glands'],
        hi: ['गले में खराश', 'निगलने में कठिनाई', 'आवाज बदलना', 'सूजी ग्रंथियां'],
        synonyms: ['throat pain', 'cant swallow', 'hoarse voice', 'tonsillitis']
    },
    body: {
        en: ['Fever', 'Weakness', 'Body ache', 'Fatigue', 'Chills'],
        hi: ['बुखार', 'कमजोरी', 'शरीर दर्द', 'थकान', 'ठंड लगना'],
        synonyms: ['temperature', 'muscle pain', 'tiredness', 'exhaustion', 'shivering']
    },
    skin: {
        en: ['Rash', 'Itching', 'Swelling', 'Redness', 'Wound'],
        hi: ['दाने', 'खुजली', 'सूजन', 'लाली', 'घाव'],
        synonyms: ['skin problem', 'allergy', 'inflammation', 'cut', 'burn']
    },
    joints: {
        en: ['Joint pain', 'Stiffness', 'Swelling', 'Limited movement'],
        hi: ['जोड़ों में दर्द', 'जकड़न', 'सूजन', 'सीमित गतिविधि'],
        synonyms: ['arthritis', 'knee pain', 'back pain', 'shoulder pain', 'ankle pain']
    }
};

// Critical illness synonyms for emergency detection
const CRITICAL_SYNONYMS = {
    'heart attack': ['chest pain', 'heart pain', 'cardiac arrest', 'chest tightness'],
    'stroke': ['paralysis', 'face drooping', 'arm weakness', 'speech difficulty', 'sudden numbness'],
    'breathing emergency': ['cant breathe', 'difficulty breathing', 'shortness of breath', 'gasping', 'choking'],
    'severe bleeding': ['heavy bleeding', 'blood loss', 'hemorrhage'],
    'seizure': ['convulsions', 'fits', 'shaking uncontrollably'],
    'unconscious': ['passed out', 'not responding', 'fainted', 'collapsed']
};

function detectCriticalCondition(symptomText) {
    const text = symptomText.toLowerCase();
    for (const [condition, synonyms] of Object.entries(CRITICAL_SYNONYMS)) {
        if (synonyms.some(syn => text.includes(syn))) {
            return {critical: true, condition: condition};
        }
    }
    return {critical: false};
}

function analyzeSymptomsMCQ(bodyPart, symptom, severity, duration) {
    let risk = 'low';
    const conditions = [symptom];
    
    // Severity-based risk
    if (severity === 'severe') risk = 'medium';
    if (severity === 'severe' && duration === 'week-plus') risk = 'medium';
    
    // Body part specific high-risk
    if (bodyPart === 'chest' && symptom.includes('pain')) risk = 'high';
    if (bodyPart === 'chest' && symptom.includes('breathing')) risk = 'high';
    if (bodyPart === 'head' && severity === 'severe') risk = 'medium';
    
    return {risk, conditions};
}

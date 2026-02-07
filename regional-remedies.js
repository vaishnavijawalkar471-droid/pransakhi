// Regional Home Remedies Database
// Based on traditional practices from different regions of India

const REGIONAL_REMEDIES = {
    // North India (Hindi, Punjabi regions)
    north: {
        fever: {
            en: [
                "Drink tulsi (holy basil) tea with honey",
                "Apply cold compress on forehead",
                "Consume ginger and black pepper kadha",
                "Drink warm turmeric milk before bed",
                "Rest in cool, dark room"
            ],
            hi: [
                "तुलसी की चाय में शहद मिलाकर पिएं",
                "माथे पर ठंडी पट्टी लगाएं",
                "अदरक और काली मिर्च का काढ़ा पिएं",
                "सोने से पहले गर्म हल्दी दूध पिएं",
                "ठंडे, अंधेरे कमरे में आराम करें"
            ],
            pa: [
                "ਸ਼ਹਿਦ ਨਾਲ ਤੁਲਸੀ ਦੀ ਚਾਹ ਪੀਓ",
                "ਮੱਥੇ ਤੇ ਠੰਡਾ ਪੈਡ ਲਗਾਓ",
                "ਅਦਰਕ ਅਤੇ ਕਾਲੀ ਮਿਰਚ ਦਾ ਕਾੜ੍ਹਾ ਪੀਓ",
                "ਸੌਣ ਤੋਂ ਪਹਿਲਾਂ ਗਰਮ ਹਲਦੀ ਦੁੱਧ ਪੀਓ",
                "ਠੰਡੇ, ਹਨੇਰੇ ਕਮਰੇ ਵਿੱਚ ਆਰਾਮ ਕਰੋ"
            ]
        },
        cough: {
            en: [
                "Mix honey with warm water and drink",
                "Gargle with warm salt water",
                "Inhale steam with ajwain (carom seeds)",
                "Drink warm milk with turmeric and honey",
                "Chew fresh ginger with rock salt"
            ],
            hi: [
                "गर्म पानी में शहद मिलाकर पिएं",
                "गर्म नमक के पानी से गरारे करें",
                "अजवाइन के साथ भाप लें",
                "हल्दी और शहद के साथ गर्म दूध पिएं",
                "सेंधा नमक के साथ ताजा अदरक चबाएं"
            ],
            pa: [
                "ਗਰਮ ਪਾਣੀ ਵਿੱਚ ਸ਼ਹਿਦ ਮਿਲਾ ਕੇ ਪੀਓ",
                "ਗਰਮ ਨਮਕੀਨ ਪਾਣੀ ਨਾਲ ਗਰਗਲ ਕਰੋ",
                "ਅਜਵਾਇਨ ਨਾਲ ਭਾਫ਼ ਲਓ",
                "ਹਲਦੀ ਅਤੇ ਸ਼ਹਿਦ ਨਾਲ ਗਰਮ ਦੁੱਧ ਪੀਓ",
                "ਸੈਂਧਾ ਨਮਕ ਨਾਲ ਤਾਜ਼ਾ ਅਦਰਕ ਚੱਬੋ"
            ]
        },
        stomach_pain: {
            en: [
                "Drink ajwain water with a pinch of salt",
                "Apply warm compress on stomach",
                "Drink jeera (cumin) water",
                "Eat light khichdi with yogurt",
                "Avoid spicy and oily food"
            ],
            hi: [
                "एक चुटकी नमक के साथ अजवाइन का पानी पिएं",
                "पेट पर गर्म सेंक करें",
                "जीरे का पानी पिएं",
                "दही के साथ हल्की खिचड़ी खाएं",
                "मसालेदार और तैलीय भोजन से बचें"
            ],
            pa: [
                "ਇੱਕ ਚੁਟਕੀ ਨਮਕ ਨਾਲ ਅਜਵਾਇਨ ਦਾ ਪਾਣੀ ਪੀਓ",
                "ਪੇਟ ਤੇ ਗਰਮ ਸੇਕ ਕਰੋ",
                "ਜੀਰੇ ਦਾ ਪਾਣੀ ਪੀਓ",
                "ਦਹੀਂ ਨਾਲ ਹਲਕੀ ਖਿਚੜੀ ਖਾਓ",
                "ਮਸਾਲੇਦਾਰ ਅਤੇ ਤੇਲਯੁਕਤ ਭੋਜਨ ਤੋਂ ਬਚੋ"
            ]
        }
    },
    
    // West India (Marathi, Gujarati regions)
    west: {
        fever: {
            en: [
                "Drink neem leaves tea",
                "Apply sandalwood paste on forehead",
                "Consume tulsi and ginger kadha",
                "Drink kokum sherbet",
                "Rest with light cotton clothes"
            ],
            mr: [
                "कडुनिंबाच्या पानांचा काढा प्या",
                "कपाळावर चंदनाची पेस्ट लावा",
                "तुळशी आणि आल्याचा काढा प्या",
                "कोकम शरबत प्या",
                "हलके सुती कपडे घालून विश्रांती घ्या"
            ],
            gu: [
                "લીંબડાના પાનનો કાઢો પીઓ",
                "કપાળ પર ચંદનની પેસ્ટ લગાવો",
                "તુલસી અને આદુનો કાઢો પીઓ",
                "કોકમ શરબત પીઓ",
                "હળવા સુતરાઉ કપડાં પહેરીને આરામ કરો"
            ]
        },
        cough: {
            en: [
                "Mix honey with tulsi leaves juice",
                "Gargle with warm turmeric water",
                "Drink warm betel leaf decoction",
                "Consume dry ginger powder with honey",
                "Inhale steam with eucalyptus oil"
            ],
            mr: [
                "तुळशीच्या पानांच्या रसात मध मिसळा",
                "कोमट हळदीच्या पाण्याने गर्‍हाणे करा",
                "कोमट पानाचा काढा प्या",
                "मधासोबत सुंठ खा",
                "निलगिरीच्या तेलासह भाफ घ्या"
            ],
            gu: [
                "તુલસીના પાનના રસમાં મધ ભેળવો",
                "ગરમ હળદરના પાણીથી ગાર્ગલ કરો",
                "ગરમ પાનનો કાઢો પીઓ",
                "મધ સાથે સૂંઠ ખાઓ",
                "યુકેલિપ્ટસ તેલ સાથે વરાળ લો"
            ]
        }
    },
    
    // East India (Bengali region)
    east: {
        fever: {
            en: [
                "Drink tulsi and ginger tea",
                "Apply neem paste on body",
                "Consume raw turmeric with honey",
                "Drink coconut water frequently",
                "Rest with light food like rice porridge"
            ],
            bn: [
                "তুলসী এবং আদা চা পান করুন",
                "শরীরে নিম পেস্ট প্রয়োগ করুন",
                "মধুর সাথে কাঁচা হলুদ খান",
                "ঘন ঘন ডাবের পানি পান করুন",
                "ভাতের জাউয়ের মতো হালকা খাবার নিয়ে বিশ্রাম নিন"
            ]
        },
        cough: {
            en: [
                "Mix honey with betel leaf juice",
                "Gargle with warm salt water",
                "Drink warm milk with turmeric",
                "Consume ginger and black pepper",
                "Inhale steam with camphor"
            ],
            bn: [
                "পানের রসের সাথে মধু মেশান",
                "উষ্ণ লবণ জল দিয়ে গার্গল করুন",
                "হলুদ দিয়ে উষ্ণ দুধ পান করুন",
                "আদা এবং কালো মরিচ খান",
                "কর্পূর সহ বাষ্প নিন"
            ]
        },
        stomach_pain: {
            en: [
                "Drink rice water with rock salt",
                "Consume buttermilk with cumin",
                "Eat steamed rice with dal",
                "Drink warm fennel water",
                "Apply warm mustard oil on stomach"
            ],
            bn: [
                "পাথরের লবণ সহ ভাতের জল পান করুন",
                "জিরা সহ ছাঁচ পান করুন",
                "ডাল সহ ভাপানো ভাত খান",
                "গরম মৌরি জল পান করুন",
                "পেটে গরম সরিষার তেল প্রয়োগ করুন"
            ]
        }
    },
    
    // South India (Tamil, Telugu regions)
    south: {
        fever: {
            en: [
                "Drink coriander water",
                "Apply sandalwood paste on forehead",
                "Consume tulsi kasayam (decoction)",
                "Drink tender coconut water",
                "Rest with cold compress"
            ],
            ta: [
                "கொத்தமல்லி நீர் குடிக்கவும்",
                "நெற்றியில் சந்தன பேஸ்ட் தடவவும்",
                "துளசி கஷாயம் சாப்பிடவும்",
                "இளநீர் குடிக்கவும்",
                "குளிர் ஒத்தடத்துடன் ஓய்வெடுக்கவும்"
            ],
            te: [
                "కొత్తిమీర నీరు తాగండి",
                "నుదుటిపై చందనం పేస్ట్ రాయండి",
                "తులసి కషాయం తాగండి",
                "యొక్క కొబ్బరి నీరు తాగండి",
                "చల్లని కుదుపుతో విశ్రాంతి తీసుకోండి"
            ]
        },
        cough: {
            en: [
                "Mix honey with tulsi leaves",
                "Drink warm turmeric milk",
                "Gargle with salt water",
                "Consume pepper rasam",
                "Inhale steam with eucalyptus"
            ],
            ta: [
                "துளசி இலைகளுடன் தேன் கலக்கவும்",
                "சூடான மஞ்சள் பால் குடிக்கவும்",
                "உப்பு நீரில் வாய் கொப்பளிக்கவும்",
                "மிளகு ரசம் சாப்பிடவும்",
                "யூகலிப்டஸுடன் நீராவி உட்கொள்ளவும்"
            ],
            te: [
                "తులసి ఆకులతో తేనెను కలపండి",
                "వేడి పసుపు పాలు త్రాగండి",
                "ఉప్పు నీటితో గార్గిల్ చేయండి",
                "మిరియాల రసం తాగండి",
                "యూకలిప్టస్‌తో ఆవిరి పీల్చండి"
            ]
        },
        stomach_pain: {
            en: [
                "Drink buttermilk with curry leaves",
                "Consume ginger and asafoetida",
                "Eat curd rice",
                "Drink warm cumin water",
                "Apply warm castor oil on stomach"
            ],
            ta: [
                "கறிவேப்பிலை மோர் குடிக்கவும்",
                "இஞ்சி மற்றும் பெருங்காயம் சாப்பிடவும்",
                "தயிர் சாதம் சாப்பிடவும்",
                "சூடான சீரக நீர் குடிக்கவும்",
                "வயிற்றில் சூடான ஆமணக்கு எண்ணெய் தடவவும்"
            ],
            te: [
                "కరివేపాకు మజ్జిగ త్రాగండి",
                "అల్లం మరియు ఇంగువను తినండి",
                "పెరుగు అన్నం తినండి",
                "వేడి జీలకర్ర నీరు త్రాగండి",
                "కడుపుపై వేడి ఆముదం రాయండి"
            ]
        }
    },
    
    // General remedies (fallback for all regions)
    general: {
        fever: {
            en: [
                "Drink plenty of water and fluids",
                "Take complete rest",
                "Apply cool compress",
                "Wear light, comfortable clothes",
                "Monitor temperature regularly"
            ]
        },
        cough: {
            en: [
                "Drink warm water frequently",
                "Avoid cold drinks",
                "Rest your voice",
                "Stay in warm environment",
                "Cover mouth when coughing"
            ]
        },
        stomach_pain: {
            en: [
                "Eat light, easily digestible food",
                "Avoid spicy and oily food",
                "Drink plenty of water",
                "Rest in comfortable position",
                "Apply warm compress if needed"
            ]
        },
        headache: {
            en: [
                "Rest in quiet, dark room",
                "Apply cold or warm compress",
                "Drink plenty of water",
                "Avoid loud noises and bright lights",
                "Take deep breaths and relax"
            ]
        }
    }
};

// Function to get remedies based on region and condition
function getRegionalRemedies(condition, region, language) {
    // Normalize condition name
    const conditionKey = condition.toLowerCase().replace(/ /g, '_');
    
    // Try to get region-specific remedies
    let remedies = REGIONAL_REMEDIES[region]?.[conditionKey];
    
    // Fall back to general remedies if not found
    if (!remedies) {
        remedies = REGIONAL_REMEDIES.general[conditionKey];
    }
    
    // Get language-specific remedies if available
    if (remedies && remedies[language]) {
        return remedies[language];
    } else if (remedies && remedies.en) {
        return remedies.en;
    }
    
    // Ultimate fallback
    return [
        "Rest and stay hydrated",
        "Monitor your symptoms",
        "See a doctor if symptoms worsen",
        "Follow basic hygiene",
        "Eat light, nutritious food"
    ];
}

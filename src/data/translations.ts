import { Language } from '../types/agri';

export const translations = {
  en: {
    appName: "AgriAI",
    tagline: "Know Your Soil. Grow Smarter.",
    languageName: "English",
    switchLanguage: "தமிழ்",
    sensorConnected: "ESP32 Sensor Connected",
    sensorDisconnected: "Sensor Disconnected",
    aiEstimateBadge: "AI-based Estimate",
    labVerificationNote: "AI Estimated – laboratory testing recommended for confirmation.",
    officialSourceNote: "Prototype eligibility result – verify rules on official government portal.",
    financialDisclaimer: "AI-based estimate. Actual market results may vary.",

    // Nav Tabs
    tabHome: "Home",
    tabScanner: "Soil Scan",
    tabCrops: "Crops",
    tabWeather: "Weather",
    tabAssistant: "AI Helper",
    tabMore: "More",

    // More Menu
    menuSensors: "IoT Sensors",
    menuFertilizer: "Fertilizer Guidance",
    menuSchemes: "Government Benefits",
    menuProfitRisk: "Profit & Risk",
    menuPassport: "Soil Passport",
    menuSimulator: "Crop Simulator",
    menuProfile: "Farmer Profile",

    // Onboarding
    welcomeFarmer: "Welcome to AgriAI",
    onboardingSubtitle: "Let's set up your farm profile in under 1 minute.",
    step1Title: "What is your name?",
    step2Title: "Where is your farm located?",
    step3Title: "How much land do you farm?",
    step4Title: "What is your main crop?",
    step5Title: "Water Source & Preferred Language",
    continueBtn: "Continue",
    startFarmingBtn: "Save & Go to Dashboard",
    selectOption: "Select an option",

    // Dashboard
    greetingMorning: "Good morning",
    locationLabel: "Tamil Nadu, India",
    scanSoilCTA: "📷 Scan My Soil Now",
    soilHealthScore: "Soil Health Score",
    soilMoisture: "Soil Moisture",
    temperature: "Temperature",
    rainForecast: "Rain Forecast",
    todaysAdvice: "Today's Farming Advice",
    schemesAlert: "3 Government Schemes Available for Your Farm",
    viewSchemesBtn: "View Benefits",
    optimal: "Optimal",
    good: "Good",

    // Soil Scanner
    scannerTitle: "3-Step Soil Analysis",
    step1CameraTitle: "Step 1: Take or Upload Soil Photo",
    cameraInstructionsTitle: "Photo Guidelines for Best AI Accuracy:",
    tip1: "Avoid direct dark shadows or glare",
    tip2: "Hold camera 10–15 cm close to dry soil",
    tip3: "Remove dry leaves, plastic & large stones",
    tip4: "Capture representative dry farm soil",
    openCamera: "Open Camera",
    uploadPhoto: "Upload Photo",
    photoCaptured: "Soil Photo Captured",
    retakePhoto: "Retake Photo",
    
    step2FarmContextTitle: "Step 2: Tell Us About Your Farm Context",
    previousCropLabel: "Previous Crop Harvested",
    currentCropLabel: "Planned / Current Crop",
    soilFeelLabel: "How does the soil feel today?",
    soilDry: "Dry",
    soilMedium: "Slightly Moist",
    soilWet: "Very Wet",

    step3SensorTitle: "Step 3: Live IoT Sensor Telemetry",
    sensorReadingsTitle: "Connected ESP32 Probe Data",
    analyzeSoilBtn: "Analyze Soil Now",
    scanningProgress: "Analyzing soil sample with AgriAI Vision model...",

    // Analysis Report
    reportTitle: "AI Soil Health Report",
    aiConfidenceLabel: "AI Confidence Score",
    npkBreakdownTitle: "Estimated Nutrient & Soil Breakdown",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    organicMatter: "Organic Matter",
    phValue: "pH Level",
    moistureVal: "Moisture Content",
    viewCropRecsBtn: "View Recommended Crops",
    viewFertilizerBtn: "Get Fertilizer Advice",

    // Crop Recommendations
    cropRecTitle: "Top Crop Recommendations",
    suitability: "Suitability",
    waterReq: "Water Req",
    duration: "Duration",
    estCost: "Est. Cost",
    estRevenue: "Est. Revenue",
    estProfit: "Est. Profit",
    risk: "Risk Level",
    compareCropsBtn: "Compare Crops in Simulator",

    // Crop Simulator
    simulatorTitle: "What-If Crop Simulator",
    simulatorSubtitle: "Compare profitability, water needs, and risk across multiple crops.",
    selectCropBtn: "Select Crop for Season",
    selectedCropNotice: "Selected as target crop for your 2.5 acre farm!",

    // Weather & Advisory
    weatherTitle: "Weather & Farm Advisory",
    rainProbTomorrow: "65% Rain Probability Tomorrow",
    pestRiskTitle: "Pest & Disease Risk Advisory",
    pestRiskLevel: "Medium Risk",
    pestReason: "High humidity and moderate temperature create favorable conditions for fungal blast in Paddy.",
    forecast7Days: "7-Day Farm Weather Forecast",

    // Sensor Dashboard
    sensorDashTitle: "ESP32 IoT Sensor Kit",
    connectBluetoothBtn: "Connect Sensor via Bluetooth",
    disconnectBtn: "Disconnect Device",
    moistureTrendTitle: "7-Day Soil Moisture Trend (%)",
    irrigationAdviceTitle: "AI Irrigation Recommendation",
    irrigationSufficient: "Current soil moisture (31%) is sufficient for Groundnut & Paddy.",
    nextIrrigationEst: "Next irrigation recommended in ~18 hours if no rainfall occurs.",

    // Fertilizer Recommendation
    fertilizerTitle: "AI Fertilizer Advisor",
    fertRecommendation: "Apply Nitrogen fertilizer according to local agricultural guidance.",
    fertNote: "Nitrogen appears low (AI Estimate). Supplement with organic compost or Urea in split doses.",

    // Schemes
    schemesTitle: "Government Benefits For You",
    eligibilityCheck: "AI Eligibility Recommendation Engine",
    requiredDocs: "Required Documents",
    officialPortal: "Official Source Portal",
    applyGuide: "How to Apply",

    // Profit & Risk
    profitRiskTitle: "Farm Profit & Risk Prediction",
    estInvestment: "Expected Investment",
    estRevenueLabel: "Estimated Revenue",
    estProfitLabel: "Estimated Net Profit",
    riskScoreLabel: "Risk Score",
    lowRisk: "Low Risk",
    riskFactorBreakdown: "Risk Factor Breakdown",

    // Soil Passport
    passportTitle: "Soil Health Passport",
    passportSubtitle: "Digital history tracking soil quality and crop yields over seasons.",
    healthTrend: "Soil Health Score Progression",
    historyLogs: "Seasonal Audit History",

    // Assistant
    assistantTitle: "AgriAI Voice & Chat Assistant",
    typeQuestionPlaceholder: "Ask in English or Tamil (e.g., Tomorrow rain varuma?)...",
    quickPromptsLabel: "Quick Prompts:",
    listening: "Listening to your voice input...",

    // Profile
    profileTitle: "Farmer Profile & Settings",
    editProfile: "Edit Farm Details",
    resetOnboarding: "Restart Onboarding Wizard",
    sensorDeviceLabel: "Connected Hardware",
  },

  ta: {
    appName: "அக்ரி AI",
    tagline: "உங்கள் மண்ணை அறிவோம். திறம்பட விவசாயம் செய்வோம்.",
    languageName: "தமிழ்",
    switchLanguage: "English",
    sensorConnected: "ESP32 சென்சார் இணைக்கப்பட்டுள்ளது",
    sensorDisconnected: "சென்சார் இணைக்கப்படவில்லை",
    aiEstimateBadge: "AI கணிப்பு விவரம்",
    labVerificationNote: "AI கணிப்பு - துல்லியமான முடிவுகளுக்கு மண் பரிசோதனை கூடம் பரிந்துரைக்கப்படுகிறது.",
    officialSourceNote: "மாதிரி தகுதி முடிவு - அதிகாரப்பூர்வ அரசு போர்ட்டலில் சரிபார்க்கவும்.",
    financialDisclaimer: "AI மதிப்பீடு. உண்மையான சந்தை முடிவுகள் மாறுபடலாம்.",

    // Nav Tabs
    tabHome: "முகப்பு",
    tabScanner: "மண் ஸ்கேன்",
    tabCrops: "பயிர்கள்",
    tabWeather: "வானிலை",
    tabAssistant: "AI உதவியாளர்",
    tabMore: "மேலும்",

    // More Menu
    menuSensors: "IoT சென்சார்",
    menuFertilizer: "உர வழிகாட்டி",
    menuSchemes: "அரசு திட்டங்கள்",
    menuProfitRisk: "லாபம் & அபாயம்",
    menuPassport: "மண் பாஸ்போர்ட்",
    menuSimulator: "பயிர் ஒப்பீடு",
    menuProfile: "விவசாயி சுயவிவரம்",

    // Onboarding
    welcomeFarmer: "அக்ரி AI-க்கு நல்வரவு",
    onboardingSubtitle: "1 நிமிடத்தில் உங்கள் பண்ணை தகவலை பதிவு செய்யுங்கள்.",
    step1Title: "உங்கள் பெயர் என்ன?",
    step2Title: "உங்கள் பண்ணை எந்த மாவட்டத்தில் உள்ளது?",
    step3Title: "உங்களுக்கு எவ்வளவு நிலம் உள்ளது?",
    step4Title: "உங்கள் முதன்மை பயிர் என்ன?",
    step5Title: "நீர் ஆதாரம் & விருப்ப மொழி",
    continueBtn: "தொடரவும்",
    startFarmingBtn: "பதிவு செய்து முகப்புக்கு செல்லவும்",
    selectOption: "ஒரு விருப்பத்தை தேர்வு செய்யவும்",

    // Dashboard
    greetingMorning: "காலை வணக்கம்",
    locationLabel: "தமிழ்நாடு, இந்தியா",
    scanSoilCTA: "📷 மண் ஸ்கேன் செய்ய கிளிக் செய்யவும்",
    soilHealthScore: "மண் வள மதிப்பெண்",
    soilMoisture: "மண் ஈரம்",
    temperature: "வெப்பநிலை",
    rainForecast: "மழை கணிப்பு",
    todaysAdvice: "இன்றைய விவசாய ஆலோசனை",
    schemesAlert: "உங்கள் பண்ணைக்கு 3 அரசு திட்டங்கள் கிடைக்கின்றன",
    viewSchemesBtn: "திட்டங்களை பார்க்க",
    optimal: "சீராக உள்ளது",
    good: "நல்ல நிலை",

    // Soil Scanner
    scannerTitle: "3-படி மண் பரிசோதனை",
    step1CameraTitle: "படி 1: மண்ணை புகைப்படம் எடுக்கவும்",
    cameraInstructionsTitle: "துல்லியமான முடிவுகளுக்கு:",
    tip1: "நிழல் அல்லது அதிக வெளிச்சம் இல்லாதவாறு பார்க்கவும்",
    tip2: "கேமராவை 10–15 செ.மீ தொலைவில் பிடிக்கவும்",
    tip3: "காய்ந்த இலைகள், கற்களை அகற்றவும்",
    tip4: "காய்ந்த பண்ணை மண்ணை எடுக்கவும்",
    openCamera: "கேமராவை திறக்க",
    uploadPhoto: "படம் பதிவேற்ற",
    photoCaptured: "மண் படம் எடுக்கப்பட்டது",
    retakePhoto: "மீண்டும் எடுக்க",

    step2FarmContextTitle: "படி 2: பண்ணை விவரங்கள்",
    previousCropLabel: "முந்தைய பயிர்",
    currentCropLabel: "திட்டமிட்ட / தற்போதைய பயிர்",
    soilFeelLabel: "மண் ஈரம் எவ்வாறு உணர்கிறது?",
    soilDry: "காய்ந்தது",
    soilMedium: "மிதமான ஈரம்",
    soilWet: "அதிக ஈரம்",

    step3SensorTitle: "படி 3: நேரலை IoT சென்சார் தரவு",
    sensorReadingsTitle: "இணைக்கப்பட்ட ESP32 சென்சார் தரவு",
    analyzeSoilBtn: "மண்ணை பகுப்பாய்வு செய்",
    scanningProgress: "அக்ரி AI விஷன் மூலம் மண் பகுப்பாய்வு செய்யப்படுகிறது...",

    // Analysis Report
    reportTitle: "AI மண் வள அறிக்கை",
    aiConfidenceLabel: "AI துல்லிய அளவு",
    npkBreakdownTitle: "கணிக்கப்பட்ட மண் சத்துக்கள்",
    nitrogen: "நைட்ரஜன் (N)",
    phosphorus: "பாஸ்பரஸ் (P)",
    potassium: "பொட்டாசியம் (K)",
    organicMatter: "சோcomp ஆர்கானிக் பொருள்",
    phValue: "pH அளவு",
    moistureVal: "ஈரப்பதம்",
    viewCropRecsBtn: "பரிந்துரைக்கப்பட்ட பயிர்கள்",
    viewFertilizerBtn: "உர வழிகாட்டி பார்க்க",

    // Crop Recommendations
    cropRecTitle: "சிறந்த பயிர் பரிந்துரைகள்",
    suitability: "பொருத்தம்",
    waterReq: "நீர் தேவை",
    duration: "கால அளவு",
    estCost: "செலவு",
    estRevenue: "வருமானம்",
    estProfit: "நிகர லாபம்",
    risk: "அபாய அளவு",
    compareCropsBtn: "பயிர்களை ஒப்பீடு செய்க",

    // Crop Simulator
    simulatorTitle: "பயிர் வருமான ஒப்பீடு",
    simulatorSubtitle: "பல்வேறு பயிர்களின் லாபம், நீர் தேவை மற்றும் அபாயத்தை ஒப்பீடு செய்யுங்கள்.",
    selectCropBtn: "இந்த பயிரை தேர்வு செய்",
    selectedCropNotice: "உங்கள் 2.5 ஏக்கர் பண்ணைக்கு தேர்வு செய்யப்பட்டது!",

    // Weather & Advisory
    weatherTitle: "வானிலை & விவசாய ஆலோசனை",
    rainProbTomorrow: "நாளை 65% மழை வாய்ப்பு",
    pestRiskTitle: "பூச்சி & நோய் தாக்குதல் எச்சரிக்கை",
    pestRiskLevel: "மிதமான அபாயம்",
    pestReason: "அதிக ஈரப்பதம் மற்றும் வெப்பநிலை காரணமாக நெற்பயிரில் பூஞ்சை தாக்குதல் வர வாய்ப்புள்ளது.",
    forecast7Days: "7 நாள் வானிலை அறிக்கை",

    // Sensor Dashboard
    sensorDashTitle: "ESP32 IoT சென்சார் கருவிகள்",
    connectBluetoothBtn: "ப்ளூடூத் மூலம் இணைக்க",
    disconnectBtn: "இணைப்பை துண்டிக்க",
    moistureTrendTitle: "7 நாள் மண் ஈரப்பதம் வரைபடம் (%)",
    irrigationAdviceTitle: "AI நீர் பாசன ஆலோசனை",
    irrigationSufficient: "தற்போதைய மண் ஈரப்பதம் (31%) மணிலா & நெல் பயிருக்கு போதுமானது.",
    nextIrrigationEst: "மழை இல்லையென்றால் அடுத்த பாசனம் ~18 மணிநேரத்தில் தேவைப்படும்.",

    // Fertilizer Recommendation
    fertilizerTitle: "AI உர வழிகாட்டி",
    fertRecommendation: "உள்ளூர் விவசாய வழிகாட்டுதலின் படி நைட்ரஜன் உரம் இடவும்.",
    fertNote: "நைட்ரஜன் குறைவாக உள்ளது (AI கணிப்பு). இயற்கை உரம் அல்லது யூரியாவை தவணைகளில் வழங்கவும்.",

    // Schemes
    schemesTitle: "உங்களுக்கான அரசு மானியங்கள்",
    eligibilityCheck: "AI தகுதி சரிபார்ப்பு எஞ்சின்",
    requiredDocs: "தேவையான ஆவணங்கள்",
    officialPortal: "அதிகாரப்பூர்வ இணையதளம்",
    applyGuide: "விண்ணப்பிக்கும் முறை",

    // Profit & Risk
    profitRiskTitle: "பண்ணை லாபம் & அபாய கணிப்பு",
    estInvestment: "எதிர்பார்க்கும் முதலீடு",
    estRevenueLabel: "எதிர்பார்க்கும் வருவாய்",
    estProfitLabel: "எதிர்பார்க்கும் நிகர லாபம்",
    riskScoreLabel: "அபாய மதிப்பெண்",
    lowRisk: "குறைந்த அபாயம்",
    riskFactorBreakdown: "அபாய காரணிகள் விவரம்",

    // Soil Passport
    passportTitle: "மண் வள பாஸ்போர்ட்",
    passportSubtitle: "உங்கள் மண்ணின் வரலாற்று தரவு மற்றும் வள முன்னேற்ற பதிவு.",
    healthTrend: "மண் வள மதிப்பெண் வளர்ச்சி",
    historyLogs: "பருவகால மண் தணிக்கை வரலாறு",

    // Assistant
    assistantTitle: "அக்ரி AI குரல் & சாட் உதவியாளர்",
    typeQuestionPlaceholder: "தமிழ் அல்லது ஆங்கிலத்தில் கேட்கவும் (எ.கா: நாளை மழை வருமா?)...",
    quickPromptsLabel: "வேகமான கேள்விகள்:",
    listening: "உங்கள் குரலை கேட்கிறது...",

    // Profile
    profileTitle: "விவசாயி சுயவிவரம் & அமைப்புகள்",
    editProfile: "பண்ணை விவரங்களை மாற்ற",
    resetOnboarding: "மீண்டும் பதிவு வழிகாட்டி",
    sensorDeviceLabel: "இணைக்கப்பட்ட கருவி",
  }
};

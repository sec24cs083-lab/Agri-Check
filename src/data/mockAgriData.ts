import {
  FarmerProfile, SensorData, SoilAnalysisReport, CropRecommendation,
  WeatherData, GovernmentScheme, SoilPassportRecord, ChatMessage,
  Farm, Prediction, FarmerFeedback, KnowledgeGraph, CLStatus,
  ModelVersion, HotspotPoint, FarmHistoryEntry
} from '../types/agri';

// ──────────────────────────────────────────────
// Farmer & Auth
// ──────────────────────────────────────────────
export const initialFarmerProfile: FarmerProfile = {
  name: "Ramesh",
  state: "Tamil Nadu",
  district: "Salem",
  farmSize: "2–5 acres",
  farmSizeAcres: 2.5,
  mainCrop: "Tomato",
  previousCrop: "Groundnut",
  waterSource: "Borewell & Canal",
  preferredLanguage: "en",
  isOnboarded: true,
  activeFarmId: 1,
};

export const demoUser = {
  id: 1,
  username: "farmer1",
  full_name: "Ramesh Kumar",
  email: "ramesh@agricheck.demo",
};

// ──────────────────────────────────────────────
// Demo Farms
// ──────────────────────────────────────────────
export const demoFarms: Farm[] = [
  {
    id: 1,
    user_id: 1,
    name: "My Tomato Farm",
    location: "Salem, Tamil Nadu",
    crop: "Tomato",
    area_acres: 2.5,
    latitude: 11.6643,
    longitude: 78.1460,
    created_at: "2026-08-01T08:00:00Z",
  },
  {
    id: 2,
    user_id: 1,
    name: "Paddy Field - Block B",
    location: "Namakkal, Tamil Nadu",
    crop: "Rice (Paddy)",
    area_acres: 4.0,
    latitude: 11.2189,
    longitude: 78.1674,
    created_at: "2026-07-15T08:00:00Z",
  },
];

// ──────────────────────────────────────────────
// Sensor Data
// ──────────────────────────────────────────────
export const initialSensorData: SensorData = {
  isConnected: false,
  isDemoMode: true,
  deviceName: "ESP32-AgriCheck-001",
  batteryLevel: 87,
  lastUpdated: "DEMO MODE",
  soilMoisture: 38,
  temperature: 30.2,
  humidity: 81.4,
  ph: 6.7,
  ec: 1.2,
  moistureHistory: [
    { day: "Thu", value: 24 },
    { day: "Fri", value: 32 },
    { day: "Sat", value: 44 },
    { day: "Sun", value: 40 },
    { day: "Mon", value: 38 },
    { day: "Tue", value: 36 },
    { day: "Today", value: 38 },
  ],
};

// ──────────────────────────────────────────────
// Demo Predictions
// ──────────────────────────────────────────────
export const demoCurrentPrediction: Prediction = {
  id: 101,
  farm_id: 1,
  crop: "Tomato",
  disease: "Early Blight",
  confidence: 0.91,
  confidence_level: "HIGH",
  risk_level: "HIGH",
  disease_risk: 87,
  pest_risk: 64,
  explanation: [
    { factor: "Leaf Visual Symptoms", detail: "Circular dark lesions with yellow halos observed — consistent with Alternaria solani (Early Blight).", icon: "🍃" },
    { factor: "High Humidity", detail: "Current humidity 81.4% exceeds the 75% threshold favorable for Early Blight spore germination.", icon: "💧" },
    { factor: "Temperature Condition", detail: "Temperature 30.2°C is within the 24–32°C optimal range for Early Blight development.", icon: "🌡️" },
    { factor: "Historical Cases", detail: "12 similar confirmed cases found in the knowledge base for Tomato + high humidity conditions.", icon: "📊" },
    { factor: "Weather Risk", detail: "65% rain probability tomorrow will further elevate fungal disease development risk.", icon: "🌧️" },
  ],
  management_guidance: [
    "Inspect all affected plants and monitor the spread over the next 24–48 hours.",
    "Ensure adequate plant spacing to improve air circulation and reduce humidity around leaves.",
    "Avoid overhead irrigation — use drip irrigation to keep foliage dry.",
    "Remove and dispose of heavily infected leaves away from the field.",
    "Consider applying a copper-based fungicide — consult your local agricultural extension officer for appropriate dosage.",
    "AI confidence is HIGH (91%). If symptoms persist or worsen, consult an agriculture expert.",
  ],
  is_demo: true,
  created_at: new Date().toISOString(),
};

// ──────────────────────────────────────────────
// Farm History
// ──────────────────────────────────────────────
export const demoFarmHistory: FarmHistoryEntry[] = [
  {
    id: 101,
    date: "01 Sep 2026",
    crop: "Tomato",
    disease: "Early Blight",
    confidence: 0.91,
    risk_level: "HIGH",
    feedback_type: "confirmed",
    soil_moisture: 38,
    temperature: 30.2,
    humidity: 81.4,
    is_demo: true,
  },
  {
    id: 98,
    date: "22 Aug 2026",
    crop: "Tomato",
    disease: "Late Blight",
    confidence: 0.76,
    risk_level: "HIGH",
    feedback_type: "confirmed",
    soil_moisture: 42,
    temperature: 28.5,
    humidity: 87,
    is_demo: true,
  },
  {
    id: 95,
    date: "10 Aug 2026",
    crop: "Tomato",
    disease: "Healthy",
    confidence: 0.94,
    risk_level: "LOW",
    feedback_type: "confirmed",
    soil_moisture: 31,
    temperature: 32,
    humidity: 71,
    is_demo: true,
  },
  {
    id: 91,
    date: "28 Jul 2026",
    crop: "Tomato",
    disease: "Early Blight",
    confidence: 0.68,
    risk_level: "MEDIUM",
    feedback_type: "unsure",
    soil_moisture: 36,
    temperature: 31,
    humidity: 79,
    is_demo: true,
  },
  {
    id: 87,
    date: "15 Jul 2026",
    crop: "Rice (Paddy)",
    disease: "Leaf Blast",
    confidence: 0.82,
    risk_level: "HIGH",
    feedback_type: "confirmed",
    soil_moisture: 65,
    temperature: 29,
    humidity: 88,
    is_demo: true,
  },
];

// ──────────────────────────────────────────────
// Feedback
// ──────────────────────────────────────────────
export const demoFeedbackHistory: FarmerFeedback[] = [
  { id: 1, prediction_id: 98, farm_id: 1, feedback_type: "confirmed", created_at: "2026-08-22T14:30:00Z" },
  { id: 2, prediction_id: 95, farm_id: 1, feedback_type: "confirmed", created_at: "2026-08-10T10:00:00Z" },
  { id: 3, prediction_id: 91, farm_id: 1, feedback_type: "unsure", created_at: "2026-07-28T16:00:00Z" },
];

// ──────────────────────────────────────────────
// Knowledge Graph
// ──────────────────────────────────────────────
export const demoKnowledgeGraph: KnowledgeGraph = {
  nodes: [
    { id: "farmer_1", label: "Ramesh", type: "farmer" },
    { id: "farm_1", label: "My Tomato Farm", type: "farm" },
    { id: "crop_tomato", label: "Tomato", type: "crop" },
    { id: "disease_eb", label: "Early Blight", type: "disease" },
    { id: "disease_lb", label: "Late Blight", type: "disease" },
    { id: "weather_hum", label: "High Humidity (>75%)", type: "weather" },
    { id: "pred_101", label: "Prediction #101", type: "prediction" },
    { id: "feedback_1", label: "Confirmed ✓", type: "feedback" },
    { id: "loc_salem", label: "Salem, TN", type: "location" },
  ],
  edges: [
    { source: "farmer_1", target: "farm_1", label: "owns" },
    { source: "farm_1", target: "crop_tomato", label: "grows" },
    { source: "farm_1", target: "pred_101", label: "has_prediction" },
    { source: "pred_101", target: "disease_eb", label: "detects" },
    { source: "feedback_1", target: "disease_eb", label: "confirms" },
    { source: "pred_101", target: "feedback_1", label: "receives" },
    { source: "disease_eb", target: "weather_hum", label: "associated_with" },
    { source: "disease_lb", target: "weather_hum", label: "associated_with" },
    { source: "farm_1", target: "loc_salem", label: "located_at" },
  ],
};

// ──────────────────────────────────────────────
// Continual Learning Status
// ──────────────────────────────────────────────
export const demoCLStatus: CLStatus = {
  buffer_size: 14,
  criteria_met: true,
  latest_version: "v1.2",
  drift_detected: false,
  confirmed_count: 12,
  incorrect_count: 2,
  last_updated: new Date().toISOString(),
};

export const demoModelVersions: ModelVersion[] = [
  {
    id: 1,
    version_string: "v1.0",
    accuracy: 0.842,
    precision: 0.831,
    recall: 0.827,
    f1_score: 0.829,
    training_samples: 850,
    notes: "Initial model trained on PlantVillage subset",
    created_at: "2026-07-01T08:00:00Z",
    is_active: false,
  },
  {
    id: 2,
    version_string: "v1.1",
    accuracy: 0.871,
    precision: 0.865,
    recall: 0.859,
    f1_score: 0.862,
    training_samples: 1020,
    notes: "Retrained with 170 new field-confirmed cases from farmer feedback",
    created_at: "2026-08-01T08:00:00Z",
    is_active: false,
  },
  {
    id: 3,
    version_string: "v1.2",
    accuracy: 0.893,
    precision: 0.887,
    recall: 0.881,
    f1_score: 0.884,
    training_samples: 1240,
    notes: "Active model — trained with replay buffer of confirmed cases",
    created_at: "2026-09-01T08:00:00Z",
    is_active: true,
  },
];

// ──────────────────────────────────────────────
// Disease Hotspot Map (Tamil Nadu locations)
// ──────────────────────────────────────────────
export const demoHotspots: HotspotPoint[] = [
  { id: 1, latitude: 11.6643, longitude: 78.1460, crop: "Tomato", disease: "Early Blight", severity: "HIGH", confirmed: true, date: "2026-09-01", is_demo: true, farm_name: "My Tomato Farm" },
  { id: 2, latitude: 11.2189, longitude: 78.1674, crop: "Tomato", disease: "Late Blight", severity: "HIGH", confirmed: true, date: "2026-08-22", is_demo: true, farm_name: "Namakkal Plot" },
  { id: 3, latitude: 10.7905, longitude: 78.7047, crop: "Rice", disease: "Leaf Blast", severity: "MEDIUM", confirmed: true, date: "2026-08-15", is_demo: true, farm_name: "Trichy Fields" },
  { id: 4, latitude: 13.0827, longitude: 80.2707, crop: "Tomato", disease: "Early Blight", severity: "MEDIUM", confirmed: false, date: "2026-08-20", is_demo: true, farm_name: "Chennai Greenhouse" },
  { id: 5, latitude: 9.9252, longitude: 78.1198, crop: "Groundnut", disease: "Leaf Spot", severity: "LOW", confirmed: true, date: "2026-08-10", is_demo: true, farm_name: "Madurai Plot" },
  { id: 6, latitude: 11.3410, longitude: 77.7172, crop: "Tomato", disease: "Early Blight", severity: "HIGH", confirmed: true, date: "2026-08-28", is_demo: true, farm_name: "Erode Farm" },
  { id: 7, latitude: 8.7139, longitude: 77.7567, crop: "Rice", disease: "Brown Spot", severity: "LOW", confirmed: true, date: "2026-08-05", is_demo: true, farm_name: "Tirunelveli Paddy" },
  { id: 8, latitude: 12.9716, longitude: 77.5946, crop: "Tomato", disease: "Late Blight", severity: "HIGH", confirmed: true, date: "2026-08-18", is_demo: true, farm_name: "Bangalore Outskirts" },
];

// ──────────────────────────────────────────────
// Weather
// ──────────────────────────────────────────────
export const weatherData: WeatherData = {
  temperature: 30,
  condition: "Partly Cloudy — Rain Expected",
  conditionTa: "பகுதி மேகமூட்டம் — மழை வாய்ப்பு",
  humidity: 81,
  windSpeed: 14,
  rainProbabilityTomorrow: 65,
  pestRisk: "High",
  is_demo: true,
  pestRiskReason: {
    en: "High humidity (81%) and 30°C temperature create optimal conditions for Early Blight and fungal diseases in Tomato.",
    ta: "81% ஈரப்பதம் மற்றும் 30°C வெப்பநிலை தக்காளியில் ஆர்லி ப்லைட் நோய் உருவாக சாதகமான சூழல்.",
  },
  forecast7Days: [
    { day: "Today", dayTa: "இன்று", tempHigh: 30, tempLow: 24, rainProb: 20, icon: "⛅" },
    { day: "Wed", dayTa: "புதன்", tempHigh: 28, tempLow: 23, rainProb: 65, icon: "🌧" },
    { day: "Thu", dayTa: "வியாழன்", tempHigh: 27, tempLow: 22, rainProb: 78, icon: "🌧" },
    { day: "Fri", dayTa: "வெள்ளி", tempHigh: 30, tempLow: 24, rainProb: 35, icon: "⛅" },
    { day: "Sat", dayTa: "சனி", tempHigh: 32, tempLow: 25, rainProb: 10, icon: "☀️" },
    { day: "Sun", dayTa: "ஞாயிறு", tempHigh: 33, tempLow: 25, rainProb: 15, icon: "☀️" },
    { day: "Mon", dayTa: "திங்கள்", tempHigh: 31, tempLow: 24, rainProb: 30, icon: "⛅" },
  ],
  aiAdvice: {
    en: [
      "⚠️ HIGH disease risk — monitor Tomato plants closely for Early Blight symptoms.",
      "🌧 65% rain tomorrow — hold irrigation today to prevent root damage.",
      "🔍 Inspect leaf undersides for fungal spots or pest eggs.",
      "🌱 If spraying, do it early morning before temperature rises.",
    ],
    ta: [
      "⚠️ அதிக நோய் ஆபத்து — தக்காளி இலைகளில் நோய் அறிகுறிகளை கவனிக்கவும்.",
      "🌧 நாளை 65% மழை வாய்ப்பு — இன்று பாசனம் தவிர்க்கவும்.",
      "🔍 இலை அடிப்பகுதியில் பூஞ்சை புள்ளிகள் அல்லது பூச்சி முட்டைகளை பரிசோதிக்கவும்.",
      "🌱 மருந்து தெளிக்க வேண்டுமானால் அதிகாலையில் செய்யவும்.",
    ],
  },
};

// ──────────────────────────────────────────────
// Soil Report (kept for compatibility)
// ──────────────────────────────────────────────
export const initialSoilReport: SoilAnalysisReport = {
  healthScore: 78,
  status: "Good",
  aiConfidence: 84,
  npkData: {
    nitrogen: { level: "Low", val: "145 kg/ha", isEstimate: true },
    phosphorus: { level: "Optimal", val: "22 kg/ha", isEstimate: true },
    potassium: { level: "Optimal", val: "190 kg/ha", isEstimate: true },
    organicMatter: { level: "Low", val: "0.52%", isEstimate: true },
    ph: { level: "Optimal", val: "6.7", isEstimate: false },
    moisture: { level: "Optimal", val: "38%", isEstimate: false },
  },
  summaryText: {
    en: "Soil pH is optimal (6.7). Moisture is elevated (38%) — favorable for disease development. Monitor Tomato plants closely.",
    ta: "மண் pH சீராக உள்ளது (6.7). ஈரப்பதம் அதிகம் (38%) — நோய் வளர சாதகமான சூழல். தக்காளி பயிர்களை கவனமாக கண்காணிக்கவும்.",
  },
};

// ──────────────────────────────────────────────
// Crop Recommendations (kept for compatibility)
// ──────────────────────────────────────────────
export const cropRecommendations: CropRecommendation[] = [
  {
    id: "crop-tomato",
    cropName: { en: "Hybrid Tomato (தக்காளி)", ta: "தக்காளி" },
    rank: 1,
    suitabilityScore: 82,
    waterRequirement: "Medium",
    growingDurationDays: 120,
    estimatedCostPerAcre: 35000,
    estimatedRevenuePerAcre: 90000,
    estimatedProfitPerAcre: 55000,
    riskRating: "Medium",
    season: "Rabi",
    icon: "🍅",
    description: {
      en: "High yield potential. Requires monitoring for Early Blight and Late Blight especially in humid conditions.",
      ta: "அதிக மகசூல் தரும் பயிர். ஈரப்பதமான காலநிலையில் நோய் கண்காணிப்பு அவசியம்.",
    },
  },
  {
    id: "crop-groundnut",
    cropName: { en: "Groundnut (மணிலா)", ta: "மணிலா / நிலக்கடலை" },
    rank: 2,
    suitabilityScore: 88,
    waterRequirement: "Low",
    growingDurationDays: 105,
    estimatedCostPerAcre: 22000,
    estimatedRevenuePerAcre: 70000,
    estimatedProfitPerAcre: 48000,
    riskRating: "Low",
    season: "Kharif / Rabi",
    icon: "🥜",
    description: {
      en: "Excellent nitrogen fixer. Lower disease risk profile compared to Tomato.",
      ta: "நைட்ரஜன் சேர்க்கும் பயிர். தக்காளியுடன் ஒப்பிடுகையில் நோய் ஆபத்து குறைவு.",
    },
  },
  {
    id: "crop-millet",
    cropName: { en: "Pearl Millet (கம்பு)", ta: "கம்பு" },
    rank: 3,
    suitabilityScore: 85,
    waterRequirement: "Very Low",
    growingDurationDays: 85,
    estimatedCostPerAcre: 16000,
    estimatedRevenuePerAcre: 52000,
    estimatedProfitPerAcre: 36000,
    riskRating: "Low",
    season: "Summer / Rainfed",
    icon: "🌾",
    description: {
      en: "Drought resilient. Very low disease susceptibility. Minimal pest management required.",
      ta: "வறட்சியை தாங்கும் பயிர். நோய் மற்றும் பூச்சி தாக்குதல் மிகவும் குறைவு.",
    },
  },
];

// ──────────────────────────────────────────────
// Government Schemes (kept from original)
// ──────────────────────────────────────────────
export const governmentSchemes: GovernmentScheme[] = [
  {
    id: "scheme-pmkisan",
    name: "PM-KISAN Samman Nidhi",
    nameTa: "பி.எம் கிசான் நிதி உதவித் திட்டம்",
    badge: "Potentially Eligible",
    badgeTa: "தகுதி வாய்ப்பு உள்ளது",
    eligibilityStatus: "Potentially Eligible",
    eligibilityStatusTa: "தகுதி பெறக்கூடியவர்",
    whyRelevant: { en: "2.5-acre farm in Salem district qualifies.", ta: "சேலம் மாவட்டத்தில் 2.5 ஏக்கர் நிலம் தகுதி அளிக்கிறது." },
    benefits: { en: "₹6,000/year in 3 installments.", ta: "ஆண்டிற்கு ₹6,000 மூன்று தவணைகளில்." },
    requiredDocuments: { en: ["Land Patta/Chitta", "Aadhaar", "Bank Passbook"], ta: ["பட்டா சிட்டா", "ஆதார்", "வங்கி புத்தகம்"] },
    officialSource: "https://pmkisan.gov.in",
    applicationSteps: { en: ["Visit e-Seva Center", "Provide Patta & Aadhaar", "Complete e-KYC"], ta: ["இ-சேவை மையம் செல்க", "பட்டா ஆதார் வழங்கவும்", "e-KYC பூர்த்தி செய்க"] },
  },
];

// ──────────────────────────────────────────────
// Soil Passport Records
// ──────────────────────────────────────────────
export const soilPassportRecords: SoilPassportRecord[] = [
  {
    id: "pass-2026-sep",
    date: "01 Sep 2026",
    monthYear: "2026 Sep",
    crop: "Tomato",
    healthScore: 78,
    ph: 6.7,
    moisture: 38,
    organicMatter: "0.52%",
    nitrogenStatus: "Low",
    notes: { en: "Elevated moisture — disease risk HIGH.", ta: "அதிக ஈரப்பதம் — நோய் ஆபத்து அதிகம்." },
  },
];

// ──────────────────────────────────────────────
// Chat Messages
// ──────────────────────────────────────────────
export const initialChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    sender: "assistant",
    text: "Vanakkam Ramesh! 👋 I am your AGRICHECK AI Assistant. Your Tomato Farm currently shows HIGH disease risk. Would you like to scan your crop leaves now?",
    timestamp: "08:30 AM",
  },
];

export const samplePrompts = [
  { en: "Scan my tomato leaves", ta: "தக்காளி இலை ஸ்கேன்" },
  { en: "What disease risk today?", ta: "இன்று நோய் ஆபத்து என்ன?" },
  { en: "Show farm history", ta: "பண்ணை வரலாறு காட்டு" },
  { en: "Weather forecast?", ta: "வானிலை முன்னறிவிப்பு?" },
];

export const predefinedAiResponses: Record<string, { en: string; ta: string }> = {
  disease: {
    en: "🍃 Based on current conditions (humidity 81%, temp 30°C), your Tomato farm has HIGH risk of Early Blight. I recommend scanning your crop leaves immediately.",
    ta: "🍃 தற்போதைய சூழல் (ஈரப்பதம் 81%, வெப்பம் 30°C) கொண்டு உங்கள் தக்காளி பண்ணையில் ஆர்லி ப்லைட் அதிக ஆபத்து உள்ளது.",
  },
  weather: {
    en: "🌧 Tomorrow 65% chance of rain in Salem. With current humidity at 81%, fungal disease risk is HIGH. Avoid irrigation today.",
    ta: "🌧 நாளை சேலத்தில் 65% மழை வாய்ப்பு. தற்போதைய ஈரப்பதம் 81% — பூஞ்சை நோய் ஆபத்து அதிகம்.",
  },
  history: {
    en: "📊 Your farm has 5 scans in the last 60 days. 3 confirmed Early Blight, 1 Late Blight, 1 Healthy. Disease trend is increasing — early intervention recommended.",
    ta: "📊 கடந்த 60 நாட்களில் 5 ஸ்கேன். 3 ஆர்லி ப்லைட், 1 லேட் ப்லைட், 1 ஆரோக்கியமான. நோய் போக்கு அதிகரிக்கிறது.",
  },
  default: {
    en: "I'm monitoring your 2.5-acre Tomato Farm in Salem. Current disease risk is HIGH. Use the Scan Crop button to analyze your plants.",
    ta: "சேலத்தில் உள்ள உங்கள் 2.5 ஏக்கர் தக்காளி பண்ணையை கண்காணிக்கிறேன். தற்போதைய நோய் ஆபத்து அதிகம்.",
  },
};

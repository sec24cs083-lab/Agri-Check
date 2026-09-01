export type Language = 'en' | 'ta';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type FeedbackType = 'confirmed' | 'incorrect' | 'unsure';
export type ConfidenceLevel = 'HIGH' | 'MODERATE' | 'LOW';

// ──────────────────────────────────────────────
// Auth / User
// ──────────────────────────────────────────────
export interface AuthUser {
  id: number;
  username: string;
  full_name: string;
  email: string;
  token?: string;
}

// ──────────────────────────────────────────────
// Farm
// ──────────────────────────────────────────────
export interface Farm {
  id: number;
  user_id: number;
  name: string;
  location: string;
  crop: string;
  area_acres: number;
  latitude: number;
  longitude: number;
  created_at: string;
}

// ──────────────────────────────────────────────
// Farmer Profile (existing – kept for compatibility)
// ──────────────────────────────────────────────
export interface FarmerProfile {
  name: string;
  state: string;
  district: string;
  farmSize: string;
  farmSizeAcres: number;
  mainCrop: string;
  previousCrop: string;
  waterSource: string;
  preferredLanguage: Language;
  isOnboarded: boolean;
  activeFarmId?: number;
}

// ──────────────────────────────────────────────
// Soil / Sensor
// ──────────────────────────────────────────────
export interface SoilScanData {
  photoUrl: string | null;
  capturedAt: string;
  perceivedMoisture: 'dry' | 'medium' | 'wet';
  soilColor: string;
}

export interface SensorData {
  isConnected: boolean;
  isDemoMode: boolean;
  deviceName: string;
  batteryLevel: number;
  lastUpdated: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  ph: number;
  ec: number;
  moistureHistory: { day: string; value: number }[];
}

// ──────────────────────────────────────────────
// AI Prediction / Disease Detection
// ──────────────────────────────────────────────
export interface Prediction {
  id: number;
  farm_id: number;
  crop: string;
  disease: string;
  confidence: number;           // 0–1
  confidence_level: ConfidenceLevel;
  risk_level: RiskLevel;
  disease_risk: number;         // 0–100
  pest_risk: number;            // 0–100
  explanation: ExplanationFactor[];
  management_guidance: string[];
  is_demo: boolean;
  created_at: string;
  image_url?: string;
}

export interface ExplanationFactor {
  factor: string;
  detail: string;
  icon: string;
}

// ──────────────────────────────────────────────
// Scan result (local, before backend call)
// ──────────────────────────────────────────────
export interface ScanResult {
  imageFile: File | null;
  imageUrl: string | null;
  crop: string;
  farmId: number;
}

// ──────────────────────────────────────────────
// Weather
// ──────────────────────────────────────────────
export interface WeatherData {
  temperature: number;
  condition: string;
  conditionTa: string;
  humidity: number;
  windSpeed: number;
  rainProbabilityTomorrow: number;
  pestRisk: 'Low' | 'Medium' | 'High';
  pestRiskReason: { en: string; ta: string };
  is_demo: boolean;
  forecast7Days: {
    day: string; dayTa: string;
    tempHigh: number; tempLow: number;
    rainProb: number; icon: string;
  }[];
  aiAdvice: { en: string[]; ta: string[] };
}

// ──────────────────────────────────────────────
// Farmer Feedback
// ──────────────────────────────────────────────
export interface FarmerFeedback {
  id: number;
  prediction_id: number;
  farm_id: number;
  feedback_type: FeedbackType;
  notes?: string;
  created_at: string;
}

// ──────────────────────────────────────────────
// Knowledge Graph
// ──────────────────────────────────────────────
export interface KGNode {
  id: string;
  label: string;
  type: 'farmer' | 'farm' | 'crop' | 'disease' | 'weather' | 'prediction' | 'feedback' | 'location';
  x?: number;
  y?: number;
}

export interface KGEdge {
  source: string;
  target: string;
  label: string;
}

export interface KnowledgeGraph {
  nodes: KGNode[];
  edges: KGEdge[];
}

// ──────────────────────────────────────────────
// Continual Learning
// ──────────────────────────────────────────────
export interface CLStatus {
  buffer_size: number;
  criteria_met: boolean;
  latest_version: string;
  drift_detected: boolean;
  confirmed_count: number;
  incorrect_count: number;
  last_updated: string;
}

export interface ModelVersion {
  id: number;
  version_string: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  training_samples: number;
  notes: string;
  created_at: string;
  is_active: boolean;
}

// ──────────────────────────────────────────────
// Disease Hotspot
// ──────────────────────────────────────────────
export interface HotspotPoint {
  id: number;
  latitude: number;
  longitude: number;
  crop: string;
  disease: string;
  severity: RiskLevel;
  confirmed: boolean;
  date: string;
  is_demo: boolean;
  farm_name?: string;
}

// ──────────────────────────────────────────────
// Farm History
// ──────────────────────────────────────────────
export interface FarmHistoryEntry {
  id: number;
  date: string;
  crop: string;
  disease: string;
  confidence: number;
  risk_level: RiskLevel;
  feedback_type?: FeedbackType;
  soil_moisture?: number;
  temperature?: number;
  humidity?: number;
  is_demo: boolean;
}

// ──────────────────────────────────────────────
// SIH Demo
// ──────────────────────────────────────────────
export type DemoStep =
  | 'idle'
  | 'select_farm'
  | 'load_sensor'
  | 'load_weather'
  | 'upload_leaf'
  | 'run_ai'
  | 'show_prediction'
  | 'show_risk'
  | 'show_explanation'
  | 'show_feedback'
  | 'confirmed'
  | 'update_kg'
  | 'similar_cases'
  | 'show_cl'
  | 'show_hotspot'
  | 'show_history'
  | 'complete';

// ──────────────────────────────────────────────
// Existing types (kept for compatibility)
// ──────────────────────────────────────────────
export interface SoilAnalysisReport {
  healthScore: number;
  status: 'Excellent' | 'Good' | 'Moderate' | 'Poor';
  aiConfidence: number;
  npkData: {
    nitrogen: { level: 'Low' | 'Optimal' | 'High'; val: string; isEstimate: boolean };
    phosphorus: { level: 'Low' | 'Optimal' | 'High'; val: string; isEstimate: boolean };
    potassium: { level: 'Low' | 'Optimal' | 'High'; val: string; isEstimate: boolean };
    organicMatter: { level: 'Low' | 'Optimal' | 'High'; val: string; isEstimate: boolean };
    ph: { level: string; val: string; isEstimate: boolean };
    moisture: { level: string; val: string; isEstimate: boolean };
  };
  summaryText: { en: string; ta: string };
}

export interface CropRecommendation {
  id: string;
  cropName: { en: string; ta: string };
  rank: number;
  suitabilityScore: number;
  waterRequirement: 'Very Low' | 'Low' | 'Medium' | 'High';
  growingDurationDays: number;
  estimatedCostPerAcre: number;
  estimatedRevenuePerAcre: number;
  estimatedProfitPerAcre: number;
  riskRating: 'Low' | 'Medium' | 'High';
  season: string;
  icon: string;
  description: { en: string; ta: string };
}

export interface GovernmentScheme {
  id: string;
  name: string; nameTa: string;
  badge: string; badgeTa: string;
  eligibilityStatus: 'Potentially Eligible' | 'Recommended' | 'Highly Recommended';
  eligibilityStatusTa: string;
  whyRelevant: { en: string; ta: string };
  benefits: { en: string; ta: string };
  requiredDocuments: { en: string[]; ta: string[] };
  officialSource: string;
  applicationSteps: { en: string[]; ta: string[] };
}

export interface SoilPassportRecord {
  id: string; date: string; monthYear: string;
  crop: string; healthScore: number; ph: number;
  moisture: number; organicMatter: string; nitrogenStatus: string;
  notes: { en: string; ta: string };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  audioAvailable?: boolean;
}

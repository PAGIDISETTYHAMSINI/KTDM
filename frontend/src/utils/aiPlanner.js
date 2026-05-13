import { TRIP_TEMPLATES, TOURIST_PLACES, RESTAURANTS } from '../data/kothagudemData';

// ── AI Itinerary Generator ──────────────────────────────────────────────────
export function generateItinerary(preferences) {
  const { type, duration, budget, interests = [] } = preferences;

  // Choose template base
  let template = TRIP_TEMPLATES.find(t =>
    t.type.toLowerCase().includes(type.toLowerCase())
  ) || TRIP_TEMPLATES[0];

  const days = parseInt(duration) || 1;
  const itinerary = [];

  const allPlaces = [...TOURIST_PLACES];
  const featuredPlaces = allPlaces.filter(p => p.featured);
  const restaurants = RESTAURANTS.slice(0, 4);

  for (let d = 1; d <= days; d++) {
    const place = featuredPlaces[(d - 1) % featuredPlaces.length];
    const nextPlace = featuredPlaces[d % featuredPlaces.length];
    const restaurant = restaurants[(d - 1) % restaurants.length];

    const dayPlan = {
      day: d,
      date: `Day ${d}`,
      theme: d === 1 ? "Arrival & City Explore" : d === days ? "Final Day & Departure" : "Deep Exploration",
      morning: {
        time: "6:30 AM",
        activity: `Visit ${place?.name || 'Kinnerasani Sanctuary'}`,
        notes: place?.travel_tips?.[0] || "Start early for best experience",
        duration: "3 hours",
        cost: place?.entry_fee || "₹50-100",
      },
      lunch: {
        time: "1:00 PM",
        restaurant: restaurant?.name || "Godavari Grand Restaurant",
        cuisine: restaurant?.cuisine?.[0] || "Andhra Meals",
        cost: restaurant?.price_range || "₹150-250",
      },
      afternoon: {
        time: "3:00 PM",
        activity: nextPlace?.name || "Bhadrachalam Temple",
        notes: "Explore at leisure",
        duration: "2-3 hours",
        cost: nextPlace?.entry_fee || "Free",
      },
      evening: {
        time: "6:30 PM",
        activity: "Godavari Riverside Walk / Sunset Point",
        notes: "Golden hour photography",
        cost: "Free",
      },
      night: {
        time: "9:00 PM",
        activity: "Dinner & Rest",
        notes: d < days ? "Prepare for next day" : "Departure preparation",
        cost: "₹200-400",
      },
    };

    itinerary.push(dayPlan);
  }

  const budgetMap = { Low: 1500, Medium: 3500, High: 7000 };
  const totalBudget = (budgetMap[budget] || 3500) * days;

  return {
    title: `${type} Trip to Bhadradri Kothagudem`,
    duration,
    type,
    total_budget: `₹${totalBudget.toLocaleString()}`,
    best_season: "October – February",
    itinerary,
    tips: [
      "Book hotels in advance during festival season",
      "Carry cash as UPI may not work in remote areas",
      "Download offline maps before visiting forests",
      "Carry insect repellent for forest areas",
      "Local auto/jeep available for short distances",
    ],
    emergency_contacts: ["Police: 100", "Ambulance: 108"],
    generated_at: new Date().toISOString(),
  };
}

// ── Smart Recommendations ───────────────────────────────────────────────────
export function getSmartRecommendations(userLocation, interests = []) {
  const allPlaces = [...TOURIST_PLACES];

  if (userLocation) {
    return allPlaces
      .sort((a, b) => {
        const distA = Math.sqrt(
          Math.pow(a.lat - userLocation.lat, 2) +
          Math.pow(a.lng - userLocation.lng, 2)
        );
        const distB = Math.sqrt(
          Math.pow(b.lat - userLocation.lat, 2) +
          Math.pow(b.lng - userLocation.lng, 2)
        );
        return distA - distB;
      })
      .slice(0, 6);
  }

  return allPlaces.filter(p => p.featured).slice(0, 6);
}

// ── Budget Calculator ───────────────────────────────────────────────────────
export function calculateBudget(days, travelers, type) {
  const basePerDay = { budget: 800, medium: 2000, premium: 5000 };
  const typeMultiplier = { Solo: 1, Couple: 1.8, Family: 2.5, Friends: 2.2 };

  const base = basePerDay[type.toLowerCase()] || 2000;
  const multiplier = typeMultiplier[travelers] || 1;
  const total = base * days * multiplier;

  return {
    accommodation: Math.round(total * 0.35),
    food: Math.round(total * 0.25),
    transport: Math.round(total * 0.20),
    entry_fees: Math.round(total * 0.10),
    misc: Math.round(total * 0.10),
    total: Math.round(total),
  };
}

// ── Chat AI Response ────────────────────────────────────────────────────────
const FAQ_RESPONSES = {
  bhadrachalam: "Bhadrachalam Temple is 82 km from Kothagudem. Best visited during Ram Navami. Open 4 AM–10 PM. Free entry.",
  bogatha: "Bogatha Waterfall (Niagara of Telangana) is 110 km away. Visit July–December. Entry: ₹20. Need jeep from Venkatapuram.",
  kinnerasani: "Kinnerasani Wildlife Sanctuary is just 15 km from Kothagudem. Best Nov–Feb. Entry: ₹100. Forest department runs jeep safaris.",
  hotel: "Top hotels: Kinnerasani Eco Resort (₹2500+), Hotel Singareni (₹800+), Temple Guest House Bhadrachalam (₹500+).",
  food: "Must-try: Bamboo Chicken at Tribal Kitchen, Andhra Meals at Godavari Grand, Street food at Kothagudem Market.",
  hospital: "24x7 hospitals: Govt. General Hospital (108), KIMS Hospital (08744-255555). Always call 108 for ambulance.",
  weather: "Best season: October–February. Monsoon (July–Sep) great for waterfalls. Avoid April–June (extreme heat 42°C+).",
  how: "I can help with trip planning, nearby places, restaurant suggestions, emergency contacts, and route guidance!",
};

export function getAIResponse(query) {
  const lowerQuery = query.toLowerCase();
  for (const [key, response] of Object.entries(FAQ_RESPONSES)) {
    if (lowerQuery.includes(key)) {
      return response;
    }
  }
  if (lowerQuery.includes('trip') || lowerQuery.includes('plan')) {
    return "Use our AI Trip Planner to generate a custom itinerary! Choose your duration, budget, and travel type. I'll create a day-by-day plan with places, food stops, and tips.";
  }
  if (lowerQuery.includes('help') || lowerQuery.includes('emergency')) {
    return "Emergency? Call 108 (Ambulance) or 100 (Police). Nearest 24hr hospital: Govt. General Hospital, Kothagudem — 08744-252222.";
  }
  return `I can help you explore Bhadradri Kothagudem! Try asking about Bogatha Waterfall, Bhadrachalam Temple, Kinnerasani Wildlife, local food, hotels, or emergency contacts. 🌿`;
}

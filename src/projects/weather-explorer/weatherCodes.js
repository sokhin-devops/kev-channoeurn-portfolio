import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
} from 'lucide-react'

/** WMO weather codes used by Open-Meteo → readable label + visual "mood". */
const WEATHER_CODES = {
  0: ['Clear sky', 'clear'],
  1: ['Mainly clear', 'clear'],
  2: ['Partly cloudy', 'partly'],
  3: ['Overcast', 'cloudy'],
  45: ['Fog', 'fog'],
  48: ['Freezing fog', 'fog'],
  51: ['Light drizzle', 'drizzle'],
  53: ['Drizzle', 'drizzle'],
  55: ['Heavy drizzle', 'drizzle'],
  56: ['Freezing drizzle', 'drizzle'],
  57: ['Heavy freezing drizzle', 'drizzle'],
  61: ['Light rain', 'rain'],
  63: ['Rain', 'rain'],
  65: ['Heavy rain', 'rain'],
  66: ['Freezing rain', 'rain'],
  67: ['Heavy freezing rain', 'rain'],
  71: ['Light snow', 'snow'],
  73: ['Snow', 'snow'],
  75: ['Heavy snow', 'snow'],
  77: ['Snow grains', 'snow'],
  80: ['Light showers', 'rain'],
  81: ['Rain showers', 'rain'],
  82: ['Heavy showers', 'rain'],
  85: ['Snow showers', 'snow'],
  86: ['Heavy snow showers', 'snow'],
  95: ['Thunderstorm', 'storm'],
  96: ['Thunderstorm with hail', 'storm'],
  99: ['Thunderstorm with heavy hail', 'storm'],
}

const ICONS = {
  clear: { day: Sun, night: Moon },
  partly: { day: CloudSun, night: CloudMoon },
  cloudy: { day: Cloud, night: Cloud },
  fog: { day: CloudFog, night: CloudFog },
  drizzle: { day: CloudDrizzle, night: CloudDrizzle },
  rain: { day: CloudRain, night: CloudRain },
  snow: { day: CloudSnow, night: CloudSnow },
  storm: { day: CloudLightning, night: CloudLightning },
}

export function getWeatherInfo(code, isDay = true) {
  const [label, group] = WEATHER_CODES[code] ?? ['Unknown conditions', 'cloudy']
  const icon = ICONS[group][isDay ? 'day' : 'night']
  // Drizzle uses the same background as rain.
  const mood = group === 'drizzle' ? 'rain' : group
  return { label, group, mood, icon }
}

/** A short, practical note based on the conditions. */
export function getTravelNote({ code, temperature }, rainChance) {
  const { group } = getWeatherInfo(code)

  if (group === 'storm') return 'Thunderstorms are expected. Plan indoor activities and check local alerts.'
  if (group === 'rain' || group === 'drizzle') return 'Rain is likely. Pack an umbrella or a light raincoat.'
  if (group === 'snow') return 'Snowy conditions. Dress warmly and allow extra travel time.'
  if (group === 'fog') return 'Low visibility. Take extra care if you are travelling by road.'
  if (rainChance !== null && rainChance >= 60) return 'Dry for now, but rain is likely later today. Keep an umbrella handy.'
  if (temperature >= 32) return 'Hot weather. Stay hydrated and avoid the midday sun.'
  if (temperature <= 5) return 'Cold weather. Bring a warm jacket and layers.'
  return 'Good conditions for sightseeing and walking around.'
}

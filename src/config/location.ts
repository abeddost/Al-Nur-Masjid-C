export const MOSQUE_ADDRESS = "Erich-Ollenhauer Straße 4, 65187 Wiesbaden, Germany";

const MAPS_QUERY = encodeURIComponent(MOSQUE_ADDRESS);

export const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=m&z=15&output=embed&iwloc=near`;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

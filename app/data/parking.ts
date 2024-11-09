export interface ParkingSpot {
  id: number;
  name: string;
  address: string;
  price: number;
  latitude: number;
  longitude: number;
  rating: number;
  reviews: number;
  amenities: string[];
}

export const parkingSpots: ParkingSpot[] = [
  {
    id: 1,
    name: "Downtown Parking",
    address: "123 Main St, San Jose, CA 95113",
    price: 5,
    latitude: 37.3382,
    longitude: -121.8863,
    rating: 4.5,
    reviews: 120,
    amenities: ["Security", "EV Charging", "Covered"],
  },
  {
    id: 2,
    name: "City Center Garage",
    address: "456 1st St, San Jose, CA 95110",
    price: 4,
    latitude: 37.3318,
    longitude: -121.8916,
    rating: 4.0,
    reviews: 85,
    amenities: ["Security", "Wheelchair Accessible", "Valet"],
  },
  {
    id: 3,
    name: "Residential Parking",
    address: "789 2nd St, San Jose, CA 95112",
    price: 3,
    latitude: 37.3366,
    longitude: -121.8797,
    rating: 3.5,
    reviews: 62,
    amenities: ["EV Charging", "Wheelchair Accessible"],
  },
  {
    id: 4,
    name: "Street Parking",
    address: "321 3rd St, San Jose, CA 95113",
    price: 6,
    latitude: 37.3299,
    longitude: -121.8839,
    rating: 4.2,
    reviews: 95,
    amenities: ["Security", "Covered", "Valet"],
  },
  {
    id: 5,
    name: "Residential Parking",
    address: "654 4th St, San Jose, CA 95112",
    price: 3.5,
    latitude: 37.3395,
    longitude: -121.8853,
    rating: 3.8,
    reviews: 73,
    amenities: ["Wheelchair Accessible", "Covered"],
  },
];

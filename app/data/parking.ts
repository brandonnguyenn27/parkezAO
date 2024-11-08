export interface ParkingSpot {
  id: number;
  latitude: number;
  longitude: number;
  price: number;
  name: string;
  address: string;
  rating: number;
}

export const parkingSpots: ParkingSpot[] = [
  {
    id: 1,
    latitude: 37.3352,
    longitude: -121.8811,
    price: 2,
    name: "Residential Parking",
    address: "123 S 4th St, San Jose, CA",
    rating: 4.8,
  },
  {
    id: 2,
    latitude: 37.3337,
    longitude: -121.8847,
    price: 3,
    name: "Street Parking",
    address: "456 E San Fernando St, San Jose, CA",
    rating: 4.7,
  },
  {
    id: 3,
    latitude: 37.3372,
    longitude: -121.8795,
    price: 2,
    name: "Residential Parking",
    address: "789 S 10th St, San Jose, CA",
    rating: 4.6,
  },
  {
    id: 4,
    latitude: 37.3365,
    longitude: -121.8818,
    price: 4,
    name: "Street Parking",
    address: "101 S San Carlos St, San Jose, CA",
    rating: 4.9,
  },
  {
    id: 5,
    latitude: 37.3382,
    longitude: -121.8833,
    price: 5,
    name: "Residential Parking",
    address: "202 S Market St, San Jose, CA",
    rating: 4.5,
  },
];

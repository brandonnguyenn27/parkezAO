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
  description: string;
  images: string[];
  reviewsList: Review[];
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
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
    description:
      "Convenient downtown parking with 24/7 security and EV charging stations.",
    images: [
      "https://example.com/downtown_parking_1.jpg",
      "https://example.com/downtown_parking_2.jpg",
      "https://example.com/downtown_parking_3.jpg",
    ],
    reviewsList: [
      {
        id: "1",
        user: "John D.",
        rating: 5,
        comment: "Great location and always clean!",
      },
      {
        id: "2",
        user: "Sarah M.",
        rating: 4,
        comment: "Good security, but can be busy during peak hours.",
      },
    ],
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
    description:
      "Centrally located garage with valet service and wheelchair accessibility.",
    images: [
      "https://example.com/city_center_garage_1.jpg",
      "https://example.com/city_center_garage_2.jpg",
    ],
    reviewsList: [
      {
        id: "1",
        user: "Mike R.",
        rating: 4,
        comment: "Valet service is quick and efficient.",
      },
      {
        id: "2",
        user: "Emily L.",
        rating: 4,
        comment: "Appreciate the wheelchair accessibility.",
      },
    ],
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
    description: "Affordable residential parking with EV charging stations.",
    images: [
      "https://example.com/residential_parking_1.jpg",
      "https://example.com/residential_parking_2.jpg",
    ],
    reviewsList: [
      {
        id: "1",
        user: "Alex K.",
        rating: 3,
        comment:
          "Good for overnight parking, but limited daytime availability.",
      },
      {
        id: "2",
        user: "Lisa W.",
        rating: 4,
        comment: "Convenient EV charging for residents.",
      },
    ],
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
    description: "Premium street parking with valet service and covered spots.",
    images: [
      "https://example.com/street_parking_1.jpg",
      "https://example.com/street_parking_2.jpg",
      "https://example.com/street_parking_3.jpg",
    ],
    reviewsList: [
      {
        id: "1",
        user: "David H.",
        rating: 5,
        comment:
          "Excellent valet service, always feel safe leaving my car here.",
      },
      {
        id: "2",
        user: "Rachel T.",
        rating: 4,
        comment: "Bit pricey, but worth it for the covered parking.",
      },
    ],
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
    description:
      "Budget-friendly residential parking with covered spots and easy accessibility.",
    images: [
      "https://example.com/residential_parking_2_1.jpg",
      "https://example.com/residential_parking_2_2.jpg",
    ],
    reviewsList: [
      {
        id: "1",
        user: "Chris M.",
        rating: 4,
        comment: "Great value for covered parking in a residential area.",
      },
      {
        id: "2",
        user: "Anna P.",
        rating: 3,
        comment:
          "Decent parking, but can be hard to find a spot during evenings.",
      },
    ],
  },
  {
    id: 6,
    name: "Union Square Garage",
    address: "333 Post St, San Francisco, CA 94108",
    price: 8,
    latitude: 37.7879,
    longitude: -122.4075,
    rating: 4.3,
    reviews: 150,
    amenities: ["Security", "EV Charging", "Valet", "24/7 Access"],
    description:
      "Prime parking location in the heart of San Francisco's shopping district.",
    images: [
      "./assets/images/driveways/80lpjnvpct7d1.jpeg",
      "https://example.com/union_square_garage_2.jpg",
      "https://example.com/union_square_garage_3.jpg",
    ],
    reviewsList: [
      {
        id: "1",
        user: "Jessica L.",
        rating: 5,
        comment:
          "Perfect location for shopping. The valet service is excellent!",
      },
      {
        id: "2",
        user: "Mark T.",
        rating: 4,
        comment: "Bit expensive, but you can't beat the convenience.",
      },
      {
        id: "3",
        user: "Sophia R.",
        rating: 4,
        comment: "Clean and secure. Appreciate the EV charging stations.",
      },
    ],
  },
];

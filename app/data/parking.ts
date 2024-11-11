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
  startTime: string; // New field
  endTime: string; // New field
  distance: number; // Mock distance field
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
    price: 2.5,
    latitude: 37.3382,
    longitude: -121.8863,
    rating: 4.5,
    reviews: 120,
    amenities: ["Security", "EV Charging", "Covered"],
    description:
      "Convenient downtown parking with 24/7 security and EV charging stations.",
    images: ["https://i.ibb.co/tBcM0B2/PNG-image.jpg"],
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
    startTime: "06:00",
    endTime: "22:00",
    distance: 0.2, // Mock distance field
  },
  {
    id: 2,
    name: "Nice Parking Spot",
    address: "456 1st St, San Jose, CA 95110",
    price: 1.25,
    latitude: 37.3318,
    longitude: -121.8916,
    rating: 4.0,
    reviews: 85,
    amenities: ["Security", "Wheelchair Accessible", "Valet"],
    description:
      "Centrally located garage with valet service and wheelchair accessibility.",
    images: ["https://i.ibb.co/kKJG2yV/PNG-image.jpg"],
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
    startTime: "07:00",
    endTime: "23:00",
    distance: 0.7, // Mock distance field
  },
  {
    id: 3,
    name: "Big Driveway Parking",
    address: "789 2nd St, San Jose, CA 95112",
    price: 3,
    latitude: 37.3333, // Updated latitude
    longitude: -121.8847, // Updated longitude
    rating: 3.5,
    reviews: 62,
    amenities: ["EV Charging", "Wheelchair Accessible"],
    description: "Affordable residential parking with EV charging stations.",
    images: ["https://i.ibb.co/bHH8jLy/PNG-image.jpg"],
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
    startTime: "18:00",
    endTime: "08:00",
    distance: 3.1, // Mock distance field
  },
  {
    id: 4,
    name: "Residential Parking",
    address: "321 3rd St, San Jose, CA 95113",
    price: 2,
    latitude: 37.3299,
    longitude: -121.8839,
    rating: 4.2,
    reviews: 95,
    amenities: ["Security", "Covered", "Valet"],
    description: "Premium street parking with valet service and covered spots.",
    images: ["https://i.ibb.co/yP1pRRJ/PNG-image.jpg"],
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
    startTime: "08:00",
    endTime: "20:00",
    distance: 0.4, // Mock distance field
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
      "https://i.ibb.co/DRZ7zRv/148e8d62-058c-41a9-bc55-0a2568e4d28d.jpg",
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
    startTime: "17:00",
    endTime: "09:00",
    distance: 1.2, // Mock distance field
  },
  {
    id: 6,
    name: "Residential Parking",
    address: "333 Post St, San Francisco, CA 94108",
    price: 5,
    latitude: 37.7879,
    longitude: -122.4075,
    rating: 4.3,
    reviews: 150,
    amenities: ["Security", "EV Charging", "Valet", "24/7 Access"],
    description:
      "Prime parking location in the heart of San Francisco's shopping district.",
    images: [
      "https://i.ibb.co/khN3k2L/80lpjnvpct7d1.jpg",
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
    startTime: "00:00",
    endTime: "23:59",
    distance: 50.2, // Mock distance field
  },
];

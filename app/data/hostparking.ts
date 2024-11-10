export interface HostParking {
  id: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  spotDimensions: string;
  hourlyRate: number;
  availableDates: string;
  amenities: string[];
  imageUrl: string;
  description: string;
}

export const hostParkingSpots: HostParking[] = [
  {
    id: 1,
    address: "123 Almaden Blvd",
    city: "San Jose",
    state: "CA",
    zipCode: "95110",
    spotDimensions: "10ft x 20ft",
    hourlyRate: 5,
    availableDates: "Mon-Fri, 9AM-5PM",
    amenities: ["EV Charging", "Security Camera"],
    imageUrl: "https://example.com/driveway1.jpg",
    description:
      "Spacious driveway in downtown San Jose, perfect for commuters. Easy access to public transportation and major tech companies.",
  },
  {
    id: 2,
    address: "456 Santana Row",
    city: "San Jose",
    state: "CA",
    zipCode: "95128",
    spotDimensions: "9ft x 18ft",
    hourlyRate: 4,
    availableDates: "Weekends, All Day",
    amenities: ["Wheelchair Accessible"],
    imageUrl: "https://example.com/driveway2.jpg",
    description:
      "Convenient parking spot in the heart of Santana Row. Ideal for weekend shoppers and diners looking for hassle-free parking.",
  },
  {
    id: 3,
    address: "789 The Alameda",
    city: "San Jose",
    state: "CA",
    zipCode: "95126",
    spotDimensions: "12ft x 22ft",
    hourlyRate: 7,
    availableDates: "24/7",
    amenities: ["EV Charging", "Security Camera", "Wheelchair Accessible"],
    imageUrl: "https://example.com/driveway3.jpg",
    description:
      "Large, secure parking spot available 24/7. Located near SAP Center, perfect for event parking or long-term stays.",
  },
];

import mongoose from "mongoose";
import dotenv from "dotenv";
import Experience from "../models/experience";

dotenv.config();

const experiences = [
  {
    title: "Speed Boat Ride",
    location: "Baga Beach, Goa",
    description:
      "Feel the thrill of gliding 100 meters over the Arabian Sea at Baga Beach with a professional driver ensuring a safe and unforgettable speedboat adventure.",
    price: 700,
    duration: "2-3 minutes",
    image:
      "https://media1.thrillophilia.com/filestore/1hbpgotz4lrf410zt60bex1viyeu_steptodown.com494464.jpg?w=600&dpr=1",
    availableDates: [
      {
        date: "2025-11-01",
        slots: [
          { time: "07:00 AM", available: 4, status: "available" },
          { time: "09:00 AM", available: 2, status: "available" },
          { time: "11:00 AM", available: 5, status: "available" },
          { time: "01:00 PM", available: 0, status: "sold out" }
        ]
      },
      {
        date: "2025-11-02",
        slots: [
          { time: "07:00 AM", available: 4, status: "available" },
          { time: "09:00 AM", available: 2, status: "available" },
          { time: "11:00 AM", available: 5, status: "available" },
          { time: "01:00 PM", available: 0, status: "sold out" }
        ]
      },
      {
        date: "2025-11-03",
        slots: [
          { time: "07:00 AM", available: 4, status: "available" },
          { time: "09:00 AM", available: 2, status: "available" },
          { time: "11:00 AM", available: 5, status: "available" },
          { time: "01:00 PM", available: 0, status: "sold out" }
        ]
      },
      {
        date: "2025-11-04",
        slots: [
          { time: "07:00 AM", available: 4, status: "available" },
          { time: "09:00 AM", available: 2, status: "available" },
          { time: "11:00 AM", available: 5, status: "available" },
          { time: "01:00 PM", available: 0, status: "sold out" }
        ]
      }
    ],
    about:
      "Thrilling boat ride over Arabian Sea waves, expert instructors, and life jackets provided. Minimum age 12 years."
  },
  {
    title: "Paragliding in Bir Billing",
    location: "Himachal Pradesh",
    description:
      "Soar above the Dhauladhar mountains in one of India’s best paragliding destinations. Perfect for thrill seekers and nature lovers alike.",
    price: 3000,
    duration: "20 minutes",
    image:
      "https://media1.thrillophilia.com/filestore/hxv6idn5pf8cw4bd6n27ao9uzqol_paragliding.jpg?w=600&dpr=1.3",
    availableDates: [
      {
        date: "2025-11-03",
        slots: [
          { time: "9:00 AM", available: 4, status: "available" },
          { time: "11:00 AM", available: 0, status: "sold out" },
          { time: "1:00 PM", available: 3, status: "available" },
          { time: "3:00 PM", available: 2, status: "available" }
        ]
      },
      {
        date: "2025-11-04",
        slots: [
          { time: "9:00 AM", available: 4, status: "available" },
          { time: "11:00 AM", available: 0, status: "sold out" },
          { time: "1:00 PM", available: 3, status: "available" },
          { time: "3:00 PM", available: 2, status: "available" }
        ]
      },
      {
        date: "2025-11-05",
        slots: [
          { time: "9:00 AM", available: 4, status: "available" },
          { time: "11:00 AM", available: 0, status: "sold out" },
          { time: "1:00 PM", available: 3, status: "available" },
          { time: "3:00 PM", available: 2, status: "available" }
        ]
      },
      {
        date: "2025-11-06",
        slots: [
          { time: "9:00 AM", available: 4, status: "available" },
          { time: "11:00 AM", available: 0, status: "sold out" },
          { time: "1:00 PM", available: 3, status: "available" },
          { time: "3:00 PM", available: 2, status: "available" }
        ]
      }
    ],
    about:
      "Certified pilots, breathtaking views of the Himalayas, and top-tier safety equipment. Minimum age 14."
  },
  {
    title: "Fortuner Desert Safari",
    location: "Sam Sand Dunes, Jaisalmer",
    description:
      "Experience the magical golden dunes of Rajasthan on a thrilling camel safari followed by traditional folk performances and dinner.",
    price: 4800,
    duration: "2 hours",
    image:
      "https://media1.thrillophilia.com/filestore/z6mkvdwo2wmpof7o31ds27jn4soo_Fortuner%20Desert%20Safari%202.jpg?w=auto&h=600",
    availableDates: [
      {
        date: "2025-11-10",
        slots: [
          { time: "4:00 PM", available: 3, status: "available" },
          { time: "6:00 PM", available: 0, status: "sold out" }
        ]
      },
      {
        date: "2025-11-11",
        slots: [
          { time: "4:00 PM", available: 3, status: "available" },
          { time: "6:00 PM", available: 0, status: "sold out" }
        ]
      },
      {
        date: "2025-11-12",
        slots: [
          { time: "4:00 PM", available: 3, status: "available" },
          { time: "6:00 PM", available: 0, status: "sold out" }
        ]
      },
      {
        date: "2025-11-13",
        slots: [
          { time: "4:00 PM", available: 3, status: "available" },
          { time: "6:00 PM", available: 0, status: "sold out" }
        ]
      }
    ],
    about: "Scenic desert routes, expert drivers, and safety briefing. Minimum age 5 years."
  },
  {
    title: "Scuba Diving",
    location: "Andaman & Nicobar Islands",
    description:
      "Dive into the crystal-clear waters of the Andaman Sea and explore vibrant coral reefs teeming with marine life under expert supervision.",
    price: 3500,
    duration: "30 minutes",
    image:
      "https://media1.thrillophilia.com/filestore/mnovqt1u76rezs3bmmzvkd40in0v_vp0kx4xh1e80i98p91gtctzavrt3_shutterstock_2303138149.jpg?w=auto&h=600",
    availableDates: [
      {
        date: "2025-11-03",
        slots: [
          { time: "8:00 AM", available: 5, status: "available" },
          { time: "10:00 AM", available: 1, status: "available" },
          { time: "12:00 PM", available: 0, status: "sold out" },
          { time: "2:00 PM", available: 3, status: "available" }
        ]
      },
      {
        date: "2025-11-04",
        slots: [
          { time: "8:00 AM", available: 5, status: "available" },
          { time: "10:00 AM", available: 1, status: "available" },
          { time: "12:00 PM", available: 0, status: "sold out" },
          { time: "2:00 PM", available: 3, status: "available" }
        ]
      },
      {
        date: "2025-11-05",
        slots: [
          { time: "8:00 AM", available: 5, status: "available" },
          { time: "10:00 AM", available: 1, status: "available" },
          { time: "12:00 PM", available: 0, status: "sold out" },
          { time: "2:00 PM", available: 3, status: "available" }
        ]
      },
      {
        date: "2025-11-06",
        slots: [
          { time: "8:00 AM", available: 5, status: "available" },
          { time: "10:00 AM", available: 1, status: "available" },
          { time: "12:00 PM", available: 0, status: "sold out" },
          { time: "2:00 PM", available: 3, status: "available" }
        ]
      }
    ],
    about:
      "Professional PADI-certified instructors, safety gear, and undersea photography included. Minimum age 10."
  },
  {
    title: "Hot Air Balloon",
    location: "Jaipur, Rajasthan",
    description:
      "Experience breathtaking aerial views of Jaipur’s forts, palaces, and desert landscapes as you float peacefully in a hot air balloon.",
    price: 14000,
    duration: "1 hour",
    image:
      "https://media1.thrillophilia.com/filestore/0bkkq4qwhn7fbnqej15i74w9flth_awsert.jpg?w=600&dpr=1.3",
    availableDates: [
      {
        date: "2025-11-08",
        slots: [
          { time: "6:00 AM", available: 4, status: "available" },
          { time: "7:00 AM", available: 2, status: "available" },
          { time: "8:00 AM", available: 0, status: "sold out" }
        ]
      },
      {
        date: "2025-11-09",
        slots: [
          { time: "6:00 AM", available: 4, status: "available" },
          { time: "7:00 AM", available: 2, status: "available" },
          { time: "8:00 AM", available: 0, status: "sold out" }
        ]
      },
      {
        date: "2025-11-10",
        slots: [
          { time: "6:00 AM", available: 4, status: "available" },
          { time: "7:00 AM", available: 2, status: "available" },
          { time: "8:00 AM", available: 0, status: "sold out" }
        ]
      },
      {
        date: "2025-11-11",
        slots: [
          { time: "6:00 AM", available: 4, status: "available" },
          { time: "7:00 AM", available: 2, status: "available" },
          { time: "8:00 AM", available: 0, status: "sold out" }
        ]
      }
    ],
    about:
      "Panoramic sunrise views, certified pilots, and light refreshments. Minimum age 5."
  },
  {
    title: "River Rafting",
    location: "Rishikesh, Uttarakhand",
    description:
      "Challenge the rapids of the Ganges River with thrilling grade III and IV waves, surrounded by stunning Himalayan scenery.",
    price: 375,
    duration: "2 hours",
    image:
      "https://media1.thrillophilia.com/filestore/l1stgsdtm1wlcgkfhkg49pers7qj_WDEFRGTYH.png?w=auto&h=600",
    availableDates: [
      {
        date: "2025-11-05",
        slots: [
          { time: "9:00 AM", available: 2, status: "available" },
          { time: "11:00 AM", available: 4, status: "available" },
          { time: "2:00 PM", available: 0, status: "sold out" },
          { time: "4:00 PM", available: 3, status: "available" }
        ]
      }
    ],
    about: "Certified rafting guides, helmets, and life jackets provided. Minimum age 12."
  },
  {
    title: "Camping and Trekking",
    location: "Kasol, Himachal Pradesh",
    description:
      "Reconnect with nature through scenic forest trails, riverside camping, bonfires, and stargazing in the beautiful Parvati Valley.",
    price: 2500,
    duration: "2 days 1 night",
    image:
      "https://media1.thrillophilia.com/filestore/8jgfji0wgcr65g383i6sqf3pbjr0_2023-06-28.jpg",
    availableDates: [
      {
        date: "2025-11-04",
        slots: [
          { time: "9:00 AM Check-in", available: 5, status: "available" },
          { time: "11:00 AM Trek Start", available: 3, status: "available" }
        ]
      }
    ],
    about:
      "Trained trek leaders, hygienic camping tents, and bonfire experience. Minimum age 10."
  },
  {
  title: "Mumbai To Alibaug Ferry Tickets",
  location: "Mumbai, Maharashtra",
  description: "Book your Mumbai to Alibaug ferry tickets and enjoy a 50-minute comfortable, scenic, and time-saving trip from Mumbai to the coastal paradise of Alibaug.",
  price: 365,
  duration: "50 minutes",
  image: "https://media1.thrillophilia.com/filestore/usiarph3zj2pg5678v8sh1nlg2n3_shutterstock_1891065868.jpg?w=auto&h=600",
  availableDates: [
    {
      date: "2025-11-10",
      slots: [
        { time: "08:00 AM", available: 10, status: "available" },
        { time: "10:00 AM", available: 7, status: "available" },
        { time: "12:00 PM", available: 0, status: "sold out" },
        { time: "2:00 PM", available: 5, status: "available" },
        { time: "4:00 PM", available: 8, status: "available" }
      ]
    }
  ],
  about: "The Mumbai to Alibaug ferry offers a quick and efficient journey between the Gateway of India and Mandwa Jetty. Enjoy comfortable seating, smooth 50–60 minute rides, and easy transfers to Alibaug’s beaches and forts. Frequent departures from morning to evening ensure a flexible and scenic travel experience."
}

];


const MONGO_URL = process.env.MONGO_URL as string;

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB ✅");

    await Experience.deleteMany({});
    await Experience.insertMany(experiences);
    console.log("Seed data inserted 🌱");

    // Do not close connection if server is already using it
    // Leave it open if you want to inspect DB manually, or close if standalone
    await mongoose.disconnect();
    console.log("Connection closed ✅");
  } catch (error) {
    console.error("Error seeding data ❌", error);
  }
}

seedDB();

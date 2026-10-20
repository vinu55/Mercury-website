import { Anchor, Factory, Flame, PackageSearch, Sun } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Company Information                                                        */
/* -------------------------------------------------------------------------- */

export const COMPANY = {
  name: "Mercury Energy Solutions Private Limited",
  shortName: "Mercury Energy Solutions",

  email: "enquiries@mercuryenergysolutions.com",
  phone: "+91 74836 51445",
  phoneHref: "tel:+916366414655",
  whatsapp: "https://wa.me/917483651445",
  linkedin: "https://www.linkedin.com/company/mercury-energy-solutions/home/",

  office: "#141, Yashada Windsong, Pune, Maharashtra - 412101, India",

  registered: "1st Floor, Ghanshyam Complex, Gulbarga, Karnataka - 585103, India",

  director: "Bhimreddy Biradar",
} as const;

/* -------------------------------------------------------------------------- */
/* Services                                                                   */
/* -------------------------------------------------------------------------- */

export const SERVICES = [
  {
    title: "Marine Boiler Solutions",
    short: "Marine",
    href: "/services/marine-boiler",
    icon: Anchor,
    description:
      "Inspection, repair, automation, and life-extension support for marine boiler systems.",
  },
  {
    title: "Land Boiler Solutions",
    short: "Land",
    href: "/services/land-boiler",
    icon: Factory,
    description:
      "Engineering, conversion, retrofits, and performance improvement for industrial boilers.",
  },
  {
    title: "Bioenergy Solutions",
    short: "Biomass",
    href: "/services/biomass-fuel",
    icon: Flame,
    description: "Fuel conversion support and dependable biomass and bagasse supply.",
  },
  {
    title: "Solar Energy Solutions",
    short: "Solar",
    href: "/services/solar-energy",
    icon: Sun,
    description: "Commercial and industrial solar systems from feasibility through maintenance.",
  },
  {
    title: "Spare Parts",
    short: "Spares",
    href: "/services/spare-parts",
    icon: PackageSearch,
    description: "Sourcing for boiler, burner, pump, valve, and control components.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* Marine Boiler Services                                                     */
/* -------------------------------------------------------------------------- */

export const MARINE_SERVICES = [
  "Insulation Repair and Re-application",
  "Commissioning Support",
  "Refractory Re-installation & Repair",
  "Chemical Cleaning and Descaling",
  "Surface Preparation and Re-painting",
  "Onboard Boiler Inspection, Operation, Troubleshooting and Maintenance",
  "Boiler Repairs, Design Upgrades & Retrofit Solutions",
  "Burner Automation, BMS & Ignition System Services",
  "Electrical & Instrumentation Services",
  "Performance Optimization & Efficiency Study",
  "Non-destructive Examination (NDE) & Borescope Inspection",
  "Life Extension and Fitness-for-Service (FFS) Assessment – API 579-1 / ASME FFS",
  "Boiler Tube Assessment, Plugging & Renewal Services",
] as const;

/* -------------------------------------------------------------------------- */
/* Land Boiler Services                                                       */
/* -------------------------------------------------------------------------- */

export const LAND_SERVICES = [
  "Design and Engineering",
  "Fuel Conversion, Retrofits and Firing System Upgrades",
  "Upgrades and Conversion Services",
  "Annual Maintenance Contracts (AMC)",
  "Boiler Retrofitting and Upgrades",
  "Performance Improvement Studies",
  "Performance Optimization",
] as const;

/* -------------------------------------------------------------------------- */
/* Spare Parts                                                                */
/* -------------------------------------------------------------------------- */

export const SPARES = [
  {
    name: "Boilers, Burners, Pumps & Water Control",
    brands: [
      "Aalborg",
      "Weishaupt",
      "Allweiler",
      "Igema",
      "Wärtsilä",
      "Kangrim",
      "Saacke",
      "Grundfos",
      "Mobrey",
      "Mitsubishi Heavy Industries",
      "KBSA",
      "Dickow",
      "Gestra",
      "Hyundai Heavy Industries",
      "Osaka",
      "Volcano",
      "KBS",
      "Spirax",
      "Greens",
      "Sunflame",
      "Kral",
      "Wika",
      "Oilon",
      "Suntec",
      "Clayton",
      "Danfoss",
      "Riello",
    ],
  },
  {
    name: "Tank Management Systems",
    brands: [
      "Rosemount",
      "Kongsberg Gruppen",
      "Saab TankRadar",
      "Consilium AB",
      "Emerson Electric",
      "Endress+Hauser",
      "VEGA Grieshaber KG",
    ],
  },
  {
    name: "Smoke Density",
    brands: ["Mobrey", "Green Instruments", "Skil", "Sick", "Fuji Electric"],
  },
  {
    name: "Valves",
    brands: [
      "Water Level",
      "Blower",
      "ARID",
      "Klinger",
      "Barker & Bille",
      "Leser",
      "EGOS",
      "Samson",
      "Bonetti",
      "NAFP",
      "Parker",
      "Tyco Valves",
      "Level",
      "Meson",
      "Econosto",
      "Masoneilan",
      "Vahinger",
    ],
  },
  {
    name: "Electrical Equipment",
    brands: [
      "Emerson",
      "Finder",
      "Salzer",
      "Endress+Hauser",
      "Carlo Gavazzi",
      "Siemens",
      "SESP",
      "Electronic Johnson",
      "Erab",
      "Honeywell",
      "Dungs",
      "Landis & Gyr",
      "ABB",
      "Sauter",
      "Gestra",
      "Linak",
      "Vacon",
      "Danfoss",
      "Telemecanique",
    ],
  },
  {
    name: "Other Equipment",
    brands: [
      "Haselhofer",
      "Monarch",
      "Altec",
      "Camozzi",
      "Omron",
      "Rosemount",
      "SKF",
      "Belpa",
      "Danimant",
      "Clyde Bergmann",
      "Aqua Metro",
      "FAG",
      "Opsis",
      "Jumo",
      "Delf",
      "Stelnen",
      "Norgren",
      "Air Torque",
    ],
  },
  {
    name: "Engine & Burner Components",
    brands: [
      "Oilon Pressure Switches",
      "Throttle Valves",
      "Pressure Sensors",
      "Diffuser Discs",
      "Pressure Gauges",
      "Fire Eyes",
      "Flame Amplifiers",
      "Relays",
      "Solenoid Valves",
      "Oil Meters",
      "Temperature Sensors",
      "Burner Electrodes",
      "Burner Controller Units",
      "Burner Transformers",
      "Control & Manual Valves",
      "Motors",
      "Pumps",
      "Burner Oil Pumps",
      "Water Gauge Glass",
      "Programmable Logic Controllers",
    ],
  },
] as const;

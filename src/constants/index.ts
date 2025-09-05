import { STATE } from "../types";

export const GYM_EQUIPMENTS = [
  {
    label: "Barbell",
    value: "barbell",
    image: "",
  },
  {
    label: "Dumbbell",
    value: "dumbbell",
    image: "",
  },
  {
    label: "Squat Rack",
    value: "squat-rack",
    image: "",
  },
  {
    label: "Bench",
    value: "bench",
    image: "",
  },
  {
    label: "Pull-Up Bar",
    value: "pull-up-bar",
    image: "",
  },
  {
    label: "Lat Pull-Down Machine",
    value: "lat-pull-down-machine",
    image: "",
  },
  {
    label: "Cabel Row Machine",
    value: "cabel-row-machine",
    image: "",
  },
  {
    label: "Shoulder Press Machine",
    value: "shoulder-press-machine",
    image: "",
  },
  {
    label: "Assisted Pull-Up Machine",
    value: "assisted-pull-up-machine",
    image: "",
  },
  {
    label: "Treadmill",
    value: "treadmill",
    image: "",
  },
  {
    label: "Elliptical Machine",
    value: "elliptical-machine",
    image: "",
  },
  {
    label: "Stationary Bike",
    value: "stationary-bike",
    image: "",
  },
  {
    label: "Inclined Bench Machine",
    value: "inclined-bench-machine",
    image: "",
  },
  {
    label: "Crosstrainer",
    value: "crosstrainer",
    image: "",
  },
  {
    label: "Leg Press Machine",
    value: "leg-press-machine",
    image: "",
  },
  {
    label: "Leg Extension Machine",
    value: "leg-extension-machine",
    image: "",
  },
  {
    label: "Leg Curl Machine",
    value: "leg-curl-machine",
    image: "",
  },
  {
    label: "Deadlift Rack",
    value: "deadlift-rack",
    image: "",
  },
  {
    label: "Chest Press Machine",
    value: "chest-press-machine",
    image: "",
  },
  {
    label: "Bench Press Machine",
    value: "bench-press-machine",
    image: "",
  },
  {
    label: "Incline Bench Press Machine",
    value: "incline-bench-press-machine",
    image: "",
  },
  {
    label: "Decline Bench Press Machine",
    value: "decline-bench-press-machine",
    image: "",
  },

  {
    label: "Calves Raise Machine",
    value: "calves-raise-machine",
    image: "",
  },
  {
    label: "Smith Machine",
    value: "smith-machine",
    image: "",
  },
  {
    label: "Jumping Rope",
    value: "jumping-rope",
    image: "",
  },
  {
    label: "Resistance Bands",
    value: "resistance-band",
    image: "",
  },
  {
    label: "T-Bar Row Machine",
    value: "t-bar-row-machine",
    image: "",
  },
  {
    label: "Pec Deck Machine",
    value: "pec-deck-machine",
    image: "",
  },
  {
    label: "Cable Cross Over Machine",
    value: "cable-cross-over-machine",
    image: "",
  },
  {
    label: "Abs Machine",
    value: "abs-machine",
    image: "",
  },
  {
    label: "Lateral Raise Machine",
    value: "lateral-raise-machine",
    image: "",
  },
];
export const STATES_MAP: { value: STATE; label: string }[] = [
  {
    value: "andaman-and-nicobar-islands",
    label: "Andaman and Nicobar Islands",
  },
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
  { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chandigarh", label: "Chandigarh" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  {
    value: "dadra-and-nagar-haveli-and-daman-and-diu",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  { value: "delhi", label: "Delhi" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal-pradesh", label: "Himachal Pradesh" },
  { value: "jammu-and-kashmir", label: "Jammu and Kashmir" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "ladakh", label: "Ladakh" },
  { value: "lakshadweep", label: "Lakshadweep" },
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "puducherry", label: "Puducherry" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west-bengal", label: "West Bengal" },
];

export const EMAIL_REGEX_STRICT = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

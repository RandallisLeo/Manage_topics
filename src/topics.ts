export type ToggleValue = "less" | "default" | "more";

export type Topic = {
  title: string;
  iconSrc?: string;
  iconAlt?: string;
  icon?: string;
};

export const TOPICS: Topic[] = [
  { title: "AI-generated content", iconSrc: "icons/AI-generated content.png" },
  { title: "Creative Arts", iconSrc: "icons/Creative Arts.png" },
  { title: "Current Affairs", iconSrc: "icons/Current Affairs.png" },
  { title: "Dance", iconSrc: "icons/Dance.png" },
  { title: "Fashion & Beauty", iconSrc: "icons/Fashion & Beauty.png" },
  { title: "Food & Drinks", iconSrc: "icons/Food & Drinks.png" },
  { title: "Health & Fitness", iconSrc: "icons/Health & Fitness.png" },
  { title: "Humor", iconSrc: "icons/Humor.png" },
  { title: "Lifestyle", iconSrc: "icons/Lifestyle.png" },
  { title: "Nature", iconSrc: "icons/Nature.png" },
  { title: "Pets", iconSrc: "icons/Pets.png" },
  { title: "Sports", iconSrc: "icons/Sports.png" },
  { title: "Travel", iconSrc: "icons/Travel.png" }
];

import { PHOTOS } from "./photos.js";

export const PROGRAMMES = "Programmes";
export const ABOUT = "About Us";

export const NAV_PAGES = [
  {
    label: "Iwan Youth",
    group: PROGRAMMES,
    tone: "bg-youth",
    soft: "bg-youth-soft",
    text: "text-youth",
    edge: "border-youth/25",
    mark: "youth",
    tile: PHOTOS.youthCursorWorkshop,
    path: "/iwan-youth",
    intro:
      "Programmes built with and for young people — mentoring, leadership and the chance to lead relief work of their own.",
  },
  {
    label: "Iwan Kids",
    group: PROGRAMMES,
    tone: "bg-kids",
    soft: "bg-kids-soft",
    text: "text-kids",
    edge: "border-kids/25",
    mark: "kids",
    tile: PHOTOS.kidsGlassPainting,
    path: "/iwan-kids",
    intro:
      "Learning and play for the community's youngest members — cooking, first aid, gardening, martial arts and whatever is on next.",
  },
  {
    label: "Iwan Women",
    group: PROGRAMMES,
    tone: "bg-women",
    soft: "bg-women-soft",
    text: "text-women",
    edge: "border-women/25",
    mark: "women",
    tile: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=900&auto=format&fit=crop",
    path: "/iwan-women",
    intro:
      "Skills, livelihoods and a network that holds — built with women, not designed for them.",
  },
  {
    label: "Iwan Men",
    group: PROGRAMMES,
    tone: "bg-men",
    soft: "bg-men-soft",
    text: "text-men",
    edge: "border-men/25",
    mark: "men",
    tile: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=900&auto=format&fit=crop",
    path: "/iwan-men",
    intro:
      "Volunteering, mentorship and the community work that gets done when men turn up for it.",
  },
  {
    label: "Blogs",
    path: "/blogs",
    intro: "Write-ups, reflections and summaries from the sessions and workshops we run.",
  },
  {
    label: "Events",
    path: "/events",
    intro: "Classes, gatherings and volunteer days — everything happening next.",
  },
  {
    label: "Podcast",
    path: "/podcast",
    intro: "Shared stories, insights and conversations from the people who turn up.",
  },
  {
    label: "About Us",
    group: ABOUT,
    path: "/about-us",
    intro:
      "How Iwan started in Bangalore in 2020, who runs it, and what it is trying to be.",
  },
  {
    label: "Careers & Volunteering",
    group: ABOUT,
    path: "/careers-and-volunteering",
    intro:
      "Open roles and volunteering opportunities — ways to give your time and skills to Iwan's programmes.",
  },
];

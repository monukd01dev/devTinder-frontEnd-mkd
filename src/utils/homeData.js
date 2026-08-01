import { Zap, ShieldCheck, Cpu, MessageSquare } from "lucide-react";

export const HOME_FEATURES = [
    {
        id: 1,
        title: "Smart Feed & Swiping",
        description: "Explore developer profiles, review tech stacks, and send connection requests instantly with a seamless swipe interface.",
        icon: Zap,
        color: "text-primary",
        badge: null
    },
    {
        id: 2,
        title: "Bulletproof JWT Security",
        description: "Secured with HttpOnly cookies, encrypted password hashing, strict Zod input validation, and protected route middleware.",
        icon: ShieldCheck,
        color: "text-success",
        badge: "Secure Auth"
    },
    {
        id: 3,
        title: "Dynamic Tech Stack Profiles",
        description: "Customize your developer persona with interactive tag inputs, live profile previews, and complete account control settings.",
        icon: Cpu,
        color: "text-info",
        badge: null
    },
    {
        id: 4,
        title: "Real-time Collaboration",
        description: "Instant messaging and peer-to-peer workspace connectivity designed specifically for pairing up on code repositories.",
        icon: MessageSquare,
        color: "text-warning",
        badge: "Coming Soon"
    }
];

// Dummy users for the 3D Hero Cards
export const HERO_DUMMY_USERS = [
    {
        _id: "1",
        firstName: "Ashish",
        lastName: "Rai",
        age: 23,
        photoUrl: "https://res.cloudinary.com/zbcopdpd/image/upload/v1785385356/side_face_ai_mkd_kvb6gt.jpg",
        about: "Full-Stack Developer focusing on MERN stack and clean backend architectures.",
        skills: ["React", "Node.js", "Express", "MongoDB"]
    },
    {
        _id: "2",
        firstName: "Lalit",
        lastName: "Gupta",
        age: 22,
        photoUrl: "https://res.cloudinary.com/zbcopdpd/image/upload/v1785386031/thar_orange_ai_muscular_mkd_d6gqnk.jpg",
        about: "Systems enthusiast building high-performance APIs and microservices.",
        skills: ["Python", "Java", "Docker", "MySQL"]
    }
];
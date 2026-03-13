import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const cardData = [
    {
        id: 1,
        title: "Choose your hospital",
        description: "Browse trusted hospitals and labs near you, compare options clearly, and pick the place that fits your needs best.",
        color: "rgba(241, 134, 101, 0.78)",
        image: "/how_it_works_panel.png",
        gradient: "linear-gradient(180deg, rgba(236, 233, 242, 0.98) 0%, rgba(247, 244, 240, 0.96) 36%, rgba(251, 243, 238, 0.95) 100%)",
        glow: "radial-gradient(circle at 50% 72%, rgba(255, 151, 123, 0.34) 0%, rgba(255, 151, 123, 0) 24%), radial-gradient(circle at 80% 84%, rgba(246, 118, 182, 0.32) 0%, rgba(246, 118, 182, 0) 26%), radial-gradient(circle at 32% 8%, rgba(184, 162, 236, 0.28) 0%, rgba(184, 162, 236, 0) 22%)"
    },
    {
        id: 2,
        title: "Select a time slot",
        description: "See available appointment times instantly and choose a slot that works for your schedule without repeated calls or waiting.",
        color: "rgba(226, 118, 164, 0.78)",
        image: "/booking_step_panel.png",
        gradient: "linear-gradient(180deg, rgba(238, 234, 244, 0.98) 0%, rgba(248, 244, 241, 0.96) 34%, rgba(252, 243, 238, 0.95) 100%)",
        glow: "radial-gradient(circle at 54% 70%, rgba(255, 145, 120, 0.33) 0%, rgba(255, 145, 120, 0) 24%), radial-gradient(circle at 86% 76%, rgba(244, 116, 187, 0.36) 0%, rgba(244, 116, 187, 0) 28%), radial-gradient(circle at 40% 12%, rgba(177, 160, 232, 0.24) 0%, rgba(177, 160, 232, 0) 21%)"
    },
    {
        id: 3,
        title: "Skip the queue",
        description: "Arrive at your booked time, avoid long lines at reception, and get access to care faster with a smoother experience.",
        color: "rgba(233, 107, 175, 0.8)",
        image: "/waiting-line.png.jpg",
        gradient: "linear-gradient(180deg, rgba(237, 233, 246, 0.98) 0%, rgba(248, 244, 242, 0.96) 35%, rgba(252, 244, 240, 0.95) 100%)",
        glow: "radial-gradient(circle at 48% 68%, rgba(255, 137, 109, 0.36) 0%, rgba(255, 137, 109, 0) 24%), radial-gradient(circle at 82% 82%, rgba(241, 96, 177, 0.38) 0%, rgba(241, 96, 177, 0) 30%), radial-gradient(circle at 36% 6%, rgba(181, 160, 235, 0.3) 0%, rgba(181, 160, 235, 0) 21%)"
    },
    {
        id: 4,
        title: "Save more on tests",
        description: "Unlock discounted pricing on medical tests and lab services while keeping the booking process simple and transparent.",
        color: "rgba(244, 129, 124, 0.78)",
        image: "/time_saving_step_panel.png",
        gradient: "linear-gradient(180deg, rgba(236, 233, 242, 0.98) 0%, rgba(248, 244, 240, 0.96) 36%, rgba(252, 243, 239, 0.95) 100%)",
        glow: "radial-gradient(circle at 46% 72%, rgba(255, 143, 116, 0.34) 0%, rgba(255, 143, 116, 0) 24%), radial-gradient(circle at 88% 80%, rgba(243, 118, 183, 0.34) 0%, rgba(243, 118, 183, 0) 28%), radial-gradient(circle at 30% 10%, rgba(186, 165, 237, 0.26) 0%, rgba(186, 165, 237, 0) 20%)"
    }
];

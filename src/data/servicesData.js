import {
    Refrigerator,
    Flame,
    Utensils,
    Waves,
    Wind
} from 'lucide-react';

export const servicesData = {
    "refrigerator-repair": {
        id: "refrigerator-repair",
        title: "Refrigerator Repair",
        icon: Refrigerator,
        image: "/Refrigerater reapair.webp",
        features: ["Same Day Service", "OEM Parts Included", "1-Year Warranty"],
        problems: ["Not cooling", "Leaking water", "Excessive noise", "Ice maker not working", "Constant running"],
        description: "Our master technicians specialize in high-end refrigeration systems, ensuring your perishables stay fresh and your kitchen remains efficient. We diagnose and resolve complex issues ranging from compressor failures and sealed system leaks to digital control board malfunctions. Whether you have a built-in luxury unit or a standard freestanding model, we restore precise temperature control and ice production."
    },
    "cooktop-repair": {
        id: "cooktop-repair",
        title: "Cooktop Repair",
        icon: Flame,
        image: "/Cooktop Repair.jpg",
        features: ["Certified Techs", "Gas & Electric", "Quick Diagnosis"],
        problems: ["Burner not igniting", "Heating element failure", "Control knob issues", "Glass cooktop cracks", "Inconsistent heating"],
        description: "Precision repairs for both gas and electric cooktops. We restore your cooking surface to factory performance with genuine parts. Our experts handle ignition problems, heating element failures, and glass top replacements with care. We ensure your cooktop operates safely and evenly, allowing you to cook with confidence."
    },
    "oven-stove-repair": {
        id: "oven-stove-repair",
        title: "Oven & Stove Repair",
        icon: Utensils,
        image: "/Oven & Stove Repair.avif",
        features: ["Precision Calibration", "Advanced Diagnostics", "Eco-Friendly Parts"],
        problems: ["Oven not heating", "Uneven baking", "Door hinge problems", "Self-clean cycle failure", "Temperature sensor issues"],
        description: "From calibration to complex electronic repairs, we ensure your oven or stove provides reliable results for every meal. We address temperature inconsistencies, broken heating elements, and door mechanism failures. Our technicians are trained on the latest convection and induction technologies to keep your kitchen running smoothly."
    },
    "washer-repair": {
        id: "washer-repair",
        title: "Washer Repair",
        icon: Waves,
        image: "/Washer Repair.jpg",
        features: ["Leak Prevention", "Electronic Repair", "Noise Reduction"],
        problems: ["Not draining", "Vibrating excessively", "Will not spin", "Water leakage", "Error codes appearing"],
        description: "Protect your home from leaks and restore your laundry routine with our fast, expert washing machine diagnostic and repair services. We fix spin cycle issues, drainage failures, and loud operation noises. Using advanced diagnostic tools, we identify the root cause to prevent future breakdowns and extend the life of your appliance."
    },
    "dryer-repair": {
        id: "dryer-repair",
        title: "Dryer Repair",
        icon: Wind,
        image: "/Dryer Repair.webp",
        features: ["Safety Inspection", "Fast Restoration", "Vent Cleaning"],
        problems: ["Not drying clothes", "Overheating", "Drum not turning", "Strange noises", "Long dry times"],
        description: "Prevent fire hazards and improve efficiency. Our technicians expertly handle heating elements, belts, and advanced electronic controls. We resolve issues with clothes not drying, overheating, or drum rotation failures. Regular maintenance and timely repairs ensure your dryer runs safely and energy-efficiently."
    }
};

export const servicesList = Object.values(servicesData);

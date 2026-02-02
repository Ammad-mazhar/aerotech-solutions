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
        image: "/Refrigerator repair.jpg",
        features: ["Same Day Service", "OEM Parts Included", "1-Year Warranty"],
        problems: ["Not cooling", "Leaking water", "Excessive noise", "Ice maker not working", "Constant running"],
        description: "Our master technicians specialize in high-end refrigeration systems, ensuring your perishables stay fresh and your kitchen remains efficient. We diagnose and resolve complex issues ranging from compressor failures and sealed system leaks to digital control board malfunctions. Whether you have a built-in luxury unit or a standard freestanding model, we restore precise temperature control and ice."
    },
    "cooktop-repair": {
        id: "cooktop-repair",
        title: "Cooktop Repair",
        icon: Flame,
        image: "/Cooktop Repair.jpg",
        features: ["Certified Techs", "Gas & Electric", "Quick Diagnosis"],
        problems: ["Burner not igniting", "Heating element failure", "Control knob issues", "Glass cooktop cracks", "Inconsistent heating"],
        description: "Accurate repairs for gas and electric cooktops. We will restore your cooking surface to its original working condition using authentic parts. Our technicians will carefully address issues with the ignition system, heating elements, and glass surfaces. We will make sure that your cooktop is working properly and evenly, so you can cook with confidence.."
    },
    "oven-stove-repair": {
        id: "oven-stove-repair",
        title: "Oven & Stove Repair",
        icon: Utensils,
        image: "/Oven & Stove Repair.avif",
        features: ["Precision Calibration", "Advanced Diagnostics", "Eco-Friendly Parts"],
        problems: ["Oven not heating", "Uneven baking", "Door hinge problems", "Self-clean cycle failure", "Temperature sensor issues"],
        description: "Whether it is calibration or complex electronic repairs, we can ensure that your oven or stove is giving you the best possible results for every meal. We work on temperature problems, faulty heating elements, and door mechanism issues. Our professionals are updated on the latest convection and induction technology to keep your kitchen up and running."
    },
    "washer-repair": {
        id: "washer-repair",
        title: "Washer Repair",
        icon: Waves,
        image: "/Washer Repair.jpg",
        features: ["Leak Prevention", "Electronic Repair", "Noise Reduction"],
        problems: ["Not draining", "Vibrating excessively", "Will not spin", "Water leakage", "Error codes appearing"],
        description: "Shield your home against leaks and revive your laundry routine with our quick and professional washing machine diagnosis and repair. We can repair problems with the spin cycle, drainage, and loud operation sounds. With our advanced diagnostic equipment, we will diagnose the problem to ensure that it doesn’t happen again in the future."
    },
    "dryer-repair": {
        id: "dryer-repair",
        title: "Dryer Repair",
        icon: Wind,
        image: "/Dryer Repair.webp",
        features: ["Safety Inspection", "Fast Restoration", "Vent Cleaning"],
        problems: ["Not drying clothes", "Overheating", "Drum not turning", "Strange noises", "Long dry times"],
        description: "Prevent fire risks and enhance efficiency. Our technicians are skilled at working with heating elements, belts, and sophisticated electronic controls. We fix problems related to clothes not drying, overheating, or drum rotation problems. Regular maintenance and prompt repairs will ensure your dryer operates in a safe and efficient manner."
    }
};

export const servicesList = Object.values(servicesData);

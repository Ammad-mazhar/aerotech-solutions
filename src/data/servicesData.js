import {
    Refrigerator,
    Flame,
    Utensils,
    Waves,
    Wind,
    Trash2,
    Thermometer,
    Microwave,
    Droplets
} from 'lucide-react';

export const servicesData = {
    // ... existing services ...
    "furnace-repair": {
        id: "furnace-repair",
        title: "Furnace Repair",
        icon: Flame,
        image: "/Furance Repair.webp",
        alt: "Certified HVAC Solutions - Furnace Repair",
        features: ["Heating Efficiency", "Ignition Repair", "Thermostat Calibration"],
        problems: ["Furnace not blowing", "Pilot light out", "Strange noises", "No heat", "Short cycling"],
        description: "Stay warm and comfortable with our expert furnace repair services. We provide Certified HVAC Solutions and Thermal Calibration to ensure your home stays warm during the cold months. Whether it's ignition failure, airflow problems, or thermostat issues, our Factory-certified Technicians ensure your heating system runs safely and efficiently.",
        whyChooseUs: "Your comfort and safety are paramount. We handle gas and electric furnaces with strict safety protocols, ensuring reliable heating when you need it most."
    },
    "water-heater-repair": {
        id: "water-heater-repair",
        title: "Water Heater Repair",
        icon: Droplets,
        image: "/water heater.jpg",
        alt: "Nationwide Appliance Repair - Water Heater Repair",
        features: ["Leak Detection", "Element Replacement", "Tank Flushing"],
        problems: ["No hot water", "Leaking tank", "Strange noises", "Water too hot/cold", "Discolored water"],
        description: "Ensure you always have hot water with our Nationwide Appliance Repair services. We diagnose and fix issues with tank and tankless water heaters. Whether it's sediment buildup, heating element failure, or leaks, our technicians restore your hot water supply quickly.",
        whyChooseUs: "We understand the inconvenience of cold showers. Our team offers rapid diagnostics and repairs for all major water heater brands, ensuring you have reliable hot water."
    },
    "microwave-repair": {
        id: "microwave-repair",
        title: "Microwave Repair",
        icon: Microwave,
        image: "/Microwave image.jpg",
        alt: "Premium Kitchen Appliance Service - Microwave Repair",
        features: ["Magnetron Testing", "Door Interlock Fix", "Control Panel Repair"],
        problems: ["Not heating", "Sparks inside", "Turntable not turning", "Touchpad not working", "Door stuck"],
        description: "Restore convenience to your kitchen with our Premium Kitchen Appliance Service. We safely diagnose high-voltage components and electronic controls to fix heating issues, arcing, and turntable malfunctions. Whether it's a built-in drawer model or a countertop unit, we ensure safe and reliable operation.",
        whyChooseUs: "Microwave repairs require specialized handling of high-voltage systems. Our technicians are trained to safely test and repair these units, extending the life of your appliance and saving you the cost of replacement."
    },
    "refrigerator-repair": {
        id: "refrigerator-repair",
        title: "Refrigerator Repair",
        icon: Refrigerator,
        image: "/Refrigerator repair.jpg",
        alt: "Premium Kitchen Appliance Service - Refrigerator Repair",

        features: ["Same Day Service", "OEM Parts Included", "1-Year Warranty"],
        problems: ["Not cooling", "Leaking water", "Excessive noise", "Ice maker not working", "Constant running"],
        description: "Our master technicians specialize in high-end refrigeration systems, offering Premium Kitchen Appliance Service. We perform Electrical Diagnostics to resolve complex issues ranging from compressor failures and sealed system leaks to digital control board malfunctions.",
        whyChooseUs: "Choosing Aerotech means engaging certified experts who understand the nuances of modern refrigeration. We prioritize your food safety and convenience with same-day appointments and a well-stocked inventory of OEM parts to fix your fridge on the first visit."
    },
    "cooktop-repair": {
        id: "cooktop-repair",
        title: "Cooktop Repair",
        icon: Flame,
        image: "/Cooktop Repair.jpg",
        alt: "Premium Kitchen Appliance Service - Cooktop Repair",
        features: ["Certified Techs", "Gas & Electric", "Quick Diagnosis"],
        problems: ["Burner not igniting", "Heating element failure", "Control knob issues", "Glass cooktop cracks", "Inconsistent heating"],
        description: "Accurate repairs for gas and electric cooktops. Experience Premium Kitchen Appliance Service to restore your cooking surface to its original working condition using authentic parts. Our technicians will carefully address issues with the ignition system, heating elements, and glass surfaces.",
        whyChooseUs: "We combine safety with culinary precision. Our technicians are trained to handle gas lines safe and calibrate electric elements perfectly, ensuring your cooktop performs like new."
    },
    "oven-stove-repair": {
        id: "oven-stove-repair",
        title: "Oven & Stove Repair",
        icon: Utensils,
        image: "/Oven & Stove Repair.avif",
        alt: "Premium Kitchen Appliance Service - Oven & Stove Repair",
        features: ["Precision Calibration", "Advanced Diagnostics", "Eco-Friendly Parts"],
        problems: ["Oven not heating", "Uneven baking", "Door hinge problems", "Self-clean cycle failure", "Temperature sensor issues"],
        description: "Whether it is Thermal Calibration or complex Electrical Diagnostics, count on our Premium Kitchen Appliance Service to ensure that your oven or stove is giving you the best possible results for every meal. We work on temperature problems, faulty heating elements, and door mechanism issues.",
        whyChooseUs: "Don't let a cold oven ruin dinner. Our team offers rapid diagnostics and repairs for all major stove and oven brands, backed by a satisfaction guarantee and parts warranty."
    },
    "washer-repair": {
        id: "washer-repair",
        title: "Washer Repair",
        icon: Waves,
        image: "/Washer Repair.jpg",
        alt: "24/7 Residential Appliance Repair USA - Washer Repair",
        features: ["Leak Prevention", "Electronic Repair", "Noise Reduction"],
        problems: ["Not draining", "Vibrating excessively", "Will not spin", "Water leakage", "Error codes appearing"],
        description: "Shield your home against leaks and revive your laundry routine with our 24/7 Residential Appliance Repair USA services. We perform a Multi-point Inspection to repair problems with the spin cycle, drainage, and loud operation sounds. With our advanced diagnostic equipment, we will diagnose the problem to ensure that it doesn’t happen again in the future.",
        whyChooseUs: "We value your time and clothes. Our professionals quickly identify the root cause of washing issues to prevent water damage and get your laundry schedule back on track."
    },
    "dryer-repair": {
        id: "dryer-repair",
        title: "Dryer Repair",
        icon: Wind,
        image: "/Dryer Repair.webp",
        alt: "Emergency Appliance Restoration - Dryer Repair",
        features: ["Safety Inspection", "Fast Restoration", "Vent Cleaning"],
        problems: ["Not drying clothes", "Overheating", "Drum not turning", "Strange noises", "Long dry times"],
        description: "Prevent fire risks and enhance efficiency with our Emergency Appliance Restoration services. Our technicians are skilled at working with heating elements, belts, and sophisticated electronic controls. We fix problems related to clothes not drying, overheating, or drum rotation problems.",
        whyChooseUs: "Safety is our number one priority. We not only fix your dryer but also inspect vents and airflow to prevent fire hazards and improve energy efficiency."
    },
    "garbage-disposal": {
        id: "garbage-disposal",
        title: "Garbage Disposal",
        icon: Trash2,
        image: "/Garbage-Disposal 2.jpg",
        alt: "Nationwide Appliance Repair - Garbage Disposal",
        features: ["Quick Installation", "Jam Removal", "Noise Elimination"],
        problems: ["Unit not turning on", "Jammed disposal", "Leaking from bottom", "Humming but not grinding", "Bad odors"],
        description: "Maintain your kitchen’s efficiency with our Nationwide Appliance Repair services. We deal with clogged disposers, motor problems, and leaking seals with accuracy. Our professionals can also help you upgrade your existing disposal to a more powerful and noise-reduced one.",
        whyChooseUs: "A jammed disposal is a kitchen nightmare. We offer swift, clean, and effective solutions to clear jams or install upgraded units that can handle your kitchen waste with ease."
    },
    "hvac-repair": {
        id: "hvac-repair",
        title: "HVAC Repair",
        icon: Thermometer,
        image: "/HVAC.jpg",
        alt: "Certified HVAC Solutions - HVAC Repair",
        features: ["24/7 Emergency Service", "Energy Efficiency", "Complete Diagnostics"],
        problems: ["No heating or cooling", "Uneven temperatures", "Strange noises", "High energy bills", "Thermostat issues"],
        description: "Enjoy the comfort of all seasons with our Certified HVAC Solutions. Whether it is a furnace, air conditioner, heat pump, or ducts, our Factory-certified Technicians will identify and repair all heating and cooling problems using advanced Thermal Calibration. We also provide 24/7 Residential Appliance Repair USA services to keep your house at the ideal temperature.",
        whyChooseUs: "Your comfort is our business. With 24/7 availability and comprehensive system checks, we ensure your home remains a sanctuary regardless of the weather outside."
    }
};

export const servicesList = Object.values(servicesData);

export const brands = [
    "Amana", "Avanti", "Beko", "Blomberg", "Cafe", "Danby", "Electrolux", "Equator",
    "Fisher & Paykel", "Frigidaire", "GE", "GE Appliances", "Haier", "Hisense", "Hotpoint",
    "Insignia", "Kenmore", "KitchenAid", "LG", "Magic Chef", "Maytag", "Midea", "Panda",
    "Samsung", "Smeg", "SMEG", "Summit", "Whirlpool", "ZLINE", "Liebherr"
];

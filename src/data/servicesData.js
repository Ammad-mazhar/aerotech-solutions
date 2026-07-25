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
    "refrigerator-repair": {
        id: "refrigerator-repair",
        title: "Refrigerator",
        icon: Refrigerator,
image: "/refrigerator-repair.webp",
        imageWidth: 1067,
        imageHeight: 1600,
        alt: "Premium Kitchen Appliance Service - Refrigerator Repair",

        features: ["Same Day Service", "Common Parts Carried", "1-Year Warranty"],
        problems: ["Not cooling", "Leaking water", "Excessive noise", "Ice maker not working", "Constant running"],
        description: "Our experienced technicians specialize in high-end refrigeration systems, offering Premium Kitchen Appliance Service. We perform Electrical Diagnostics to resolve complex issues ranging from compressor failures and sealed system leaks to digital control board malfunctions.",
        whyChooseUs: "Choosing Aerotech means engaging trained, experienced experts who understand the nuances of modern refrigeration. We prioritize your food safety and convenience with same-day appointments, carrying common replacement parts and sourcing model-specific parts after diagnosis."
    },
    "oven-stove-cooktop-repair": {
        id: "oven-stove-cooktop-repair",
        title: "Oven, Stove & Cooktop",
        icon: Utensils,
        image: "/oven-stove-cooktop-repair.webp",
        imageWidth: 740,
        imageHeight: 493,
        alt: "Premium Kitchen Appliance Service - Oven, Stove & Cooktop Repair",
        features: ["Precision Calibration", "Advanced Diagnostics", "Gas & Electric", "Burner Repair"],
        problems: ["Oven not heating", "Burner not igniting", "Uneven baking", "Glass cooktop cracks", "Temperature sensor issues"],
        description: "Whether it is Thermal Calibration, complex Electrical Diagnostics, or burner restoration, count on our Premium Kitchen Appliance Service to ensure your cooking appliances give you the best possible results. We handle gas and electric units, fixing temperature issues, faulty heating elements, and ignition systems.",
        whyChooseUs: "Don't let a faulty appliance ruin dinner. Our team offers rapid diagnostics and repairs for all major stove, oven, and cooktop brands, backed by a satisfaction guarantee and parts warranty."
    },
    "dryer-repair": {
        id: "dryer-repair",
        title: "Dryer",
        icon: Wind,
        image: "/dryer-repair.webp",
        imageWidth: 960,
        imageHeight: 640,
        alt: "Emergency Appliance Restoration - Dryer Repair",
        features: ["Safety Inspection", "Fast Restoration", "Vent Cleaning"],
        problems: ["Not drying clothes", "Overheating", "Drum not turning", "Strange noises", "Long dry times"],
        description: "Prevent fire risks and enhance efficiency with our Emergency Appliance Restoration services. Our technicians are skilled at working with heating elements, belts, and sophisticated electronic controls. We fix problems related to clothes not drying, overheating, or drum rotation problems.",
        whyChooseUs: "Safety is our number one priority. We not only fix your dryer but also inspect vents and airflow to prevent fire hazards and improve energy efficiency."
    },
    "washer-repair": {
        id: "washer-repair",
        title: "Washer",
        icon: Waves,
        image: "/washer-repair.webp",
        imageWidth: 540,
        imageHeight: 360,
        alt: "Residential Appliance Repair - Washer Repair",
        features: ["Leak Prevention", "Electronic Repair", "Noise Reduction"],
        problems: ["Not draining", "Vibrating excessively", "Will not spin", "Water leakage", "Error codes appearing"],
        description: "Shield your home against leaks and revive your laundry routine with residential and commercial washer repair across approved Illinois service ZIP codes. We perform a Multi-point Inspection to repair problems with the spin cycle, drainage, and loud operation sounds. With our advanced diagnostic equipment, we will diagnose the problem to ensure that it doesn’t happen again in the future.",
        whyChooseUs: "We value your time and clothes. Our professionals quickly identify the root cause of washing issues to prevent water damage and get your laundry schedule back on track."
    },
    "microwave-repair": {
        id: "microwave-repair",
        title: "Microwave",
        icon: Microwave,
image: "/microwave-repair.webp",
        imageWidth: 540,
        imageHeight: 360,
        alt: "Premium Kitchen Appliance Service - Microwave Repair",
        features: ["Magnetron Testing", "Door Interlock Fix", "Control Panel Repair"],
        problems: ["Not heating", "Sparks inside", "Turntable not turning", "Touchpad not working", "Door stuck"],
        description: "Restore convenience to your kitchen with our Premium Kitchen Appliance Service. We safely diagnose high-voltage components and electronic controls to fix heating issues, arcing, and turntable malfunctions. Whether it's a built-in drawer model or a countertop unit, we ensure safe and reliable operation.",
        whyChooseUs: "Microwave repairs require specialized handling of high-voltage systems. Our technicians are trained to safely test and repair these units, extending the life of your appliance and saving you the cost of replacement."
    },
    "dishwasher-repair": {
        id: "dishwasher-repair",
        title: "Dishwasher",
        icon: Waves,
image: "/dishwasher-repair.webp",
        imageWidth: 640,
        imageHeight: 427,
        alt: "Premium Kitchen Appliance Service - Dishwasher Repair",
        features: ["Leak Detection", "Pump Repair", "Electronic Diagnostics"],
        problems: ["Not draining", "Not cleaning properly", "Leaking water", "Strange noises", "Door latch issues"],
        description: "Experience effortless cleanup with our professional dishwasher repair services. We diagnose and fix all major issues, from drainage problems to electronic failures. Our technicians ensure your dishwasher runs quietly and efficiently, restoring the convenience your kitchen deserves.",
        whyChooseUs: "A broken dishwasher creates chaos in the kitchen. We provide fast, reliable repairs using quality parts to get your kitchen back in order."
    },
    "hvac-furnace-repair": {
        id: "hvac-furnace-repair",
        title: "HVAC & Furnace",
        icon: Thermometer,
        image: "/hvac-furnace-repair.webp",
        imageWidth: 1600,
        imageHeight: 1066,
        alt: "HVAC Solutions - HVAC & Furnace Repair",
        features: ["Heating & Cooling", "Furnace Ignition", "Energy Efficiency", "Complete Diagnostics"],
        problems: ["No heating or cooling", "Furnace not blowing", "Uneven temperatures", "Pilot light out", "Thermostat issues"],
        description: "Enjoy year-round comfort with our HVAC & Furnace Solutions. Whether it's a furnace, air conditioner, or heat pump, our trained, experienced technicians identify and repair all heating and cooling problems using advanced Thermal Calibration. We ensure your home stays at the ideal temperature regardless of the weather.",
        whyChooseUs: "Your comfort is our business. With comprehensive system checks, we ensure your HVAC and heating systems perform at peak efficiency."
    },
    "garbage-disposal": {
        id: "garbage-disposal",
        title: "Garbage Disposal",
        icon: Trash2,
        image: "/garbage-disposal-repair.webp",
        imageWidth: 1000,
        imageHeight: 667,
        alt: "Chicagoland Appliance Repair - Garbage Disposal",
        features: ["Quick Installation", "Jam Removal", "Noise Elimination"],
        problems: ["Unit not turning on", "Jammed disposal", "Leaking from bottom", "Humming but not grinding", "Bad odors"],
        description: "Maintain your kitchen’s efficiency with professional garbage disposal repair and installation across approved Chicagoland-area ZIP codes. We deal with clogged disposers, motor problems, and leaking seals with accuracy. Our professionals can also help you upgrade your existing disposal to a more powerful and noise-reduced one.",
        whyChooseUs: "A jammed disposal is a kitchen nightmare. We offer swift, clean, and effective solutions to clear jams or install upgraded units that can handle your kitchen waste with ease."
    },
    "water-heater-repair": {
        id: "water-heater-repair",
        title: "Water Heater",
        icon: Droplets,
image: "/water-heater-repair.webp",
        imageWidth: 1600,
        imageHeight: 1067,
        alt: "Chicagoland Appliance Repair - Water Heater Repair",
        features: ["Leak Detection", "Element Replacement", "Tank Flushing"],
        problems: ["No hot water", "Leaking tank", "Strange noises", "Water too hot/cold", "Discolored water"],
        description: "Keep your hot water running with professional repair for gas, electric, tank and tankless water heaters. Whether it's sediment buildup, heating element failure, or leaks, our technicians restore your hot water supply quickly.",
        whyChooseUs: "We understand the inconvenience of cold showers. Our team offers rapid diagnostics and repairs for all major water heater brands, ensuring you have reliable hot water."
    }
};

export const servicesList = Object.values(servicesData);

export const brands = [
    "Amana", "Avanti", "Beko", "Blomberg", "Cafe", "Danby", "Electrolux", "Equator",
    "Fisher & Paykel", "Frigidaire", "GE", "GE Appliances", "Haier", "Hisense", "Hotpoint",
    "Insignia", "Kenmore", "KitchenAid", "LG", "Magic Chef", "Maytag", "Midea", "Panda",
    "Samsung", "Smeg", "SMEG", "Summit", "Whirlpool", "ZLINE", "Liebherr"
];

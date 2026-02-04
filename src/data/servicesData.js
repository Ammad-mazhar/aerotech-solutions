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
    "furnace-water-heater": {
        id: "furnace-water-heater",
        title: "Furnace & Water Heater",
        icon: Droplets,
        image: "/Furance Repair.webp",
        features: ["Heating Efficiency", "Leak Detection", "Ductwork Inspection"],
        problems: ["No hot water", "Furnace not blowing", "Pilot light out", "Leaking tank", "Strange noises"],
        description: "Stay warm and comfortable with our comprehensive furnace and water heater repair services. We diagnose and fix issues with heating systems, boilers, and hot water tanks. Whether it's sediment buildup, ignition failure, or thermostat issues, our certified technicians ensure your home's core systems runs safely and efficiently.",
        whyChooseUs: "Your comfort and safety are paramount. We handle gas and electric systems with strict safety protocols, ensuring reliable heating and hot water when you need it most."
    },
    "microwave-repair": {
        id: "microwave-repair",
        title: "Microwave Repair",
        icon: Microwave,
        image: "/Microwave image.jpg",
        features: ["Magnetron Testing", "Door Interlock Fix", "Control Panel Repair"],
        problems: ["Not heating", "Sparks inside", "Turntable not turning", "Touchpad not working", "Door stuck"],
        description: "Restore convenience to your kitchen with our expert microwave repair services. We safely diagnose high-voltage components and electronic controls to fix heating issues, arcing, and turntable malfunctions. Whether it's a built-in drawer model or a countertop unit, we ensure safe and reliable operation.",
        whyChooseUs: "Microwave repairs require specialized handling of high-voltage systems. Our technicians are trained to safely test and repair these units, extending the life of your appliance and saving you the cost of replacement."
    },
    "refrigerator-repair": {
        id: "refrigerator-repair",
        title: "Refrigerator Repair",
        icon: Refrigerator,
        image: "/Refrigerator repair.jpg",

        features: ["Same Day Service", "OEM Parts Included", "1-Year Warranty"],
        problems: ["Not cooling", "Leaking water", "Excessive noise", "Ice maker not working", "Constant running"],
        description: "Our master technicians specialize in high-end refrigeration systems, ensuring your perishables stay fresh and your kitchen remains efficient. We diagnose and resolve complex issues ranging from compressor failures and sealed system leaks to digital control board malfunctions. Whether you have a built-in luxury unit or a standard freestanding model, we restore precise temperature control and ice.",
        whyChooseUs: "Choosing Aerotech means engaging certified experts who understand the nuances of modern refrigeration. We prioritize your food safety and convenience with same-day appointments and a well-stocked inventory of OEM parts to fix your fridge on the first visit."
    },
    "cooktop-repair": {
        id: "cooktop-repair",
        title: "Cooktop Repair",
        icon: Flame,
        image: "/Cooktop Repair.jpg",
        features: ["Certified Techs", "Gas & Electric", "Quick Diagnosis"],
        problems: ["Burner not igniting", "Heating element failure", "Control knob issues", "Glass cooktop cracks", "Inconsistent heating"],
        description: "Accurate repairs for gas and electric cooktops. We will restore your cooking surface to its original working condition using authentic parts. Our technicians will carefully address issues with the ignition system, heating elements, and glass surfaces. We will make sure that your cooktop is working properly and evenly, so you can cook with confidence..",
        whyChooseUs: "We combine safety with culinary precision. Our technicians are trained to handle gas lines safe and calibrate electric elements perfectly, ensuring your cooktop performs like new."
    },
    "oven-stove-repair": {
        id: "oven-stove-repair",
        title: "Oven & Stove Repair",
        icon: Utensils,
        image: "/Oven & Stove Repair.avif",
        features: ["Precision Calibration", "Advanced Diagnostics", "Eco-Friendly Parts"],
        problems: ["Oven not heating", "Uneven baking", "Door hinge problems", "Self-clean cycle failure", "Temperature sensor issues"],
        description: "Whether it is calibration or complex electronic repairs, we can ensure that your oven or stove is giving you the best possible results for every meal. We work on temperature problems, faulty heating elements, and door mechanism issues. Our professionals are updated on the latest convection and induction technology to keep your kitchen up and running.",
        whyChooseUs: "Don't let a cold oven ruin dinner. Our team offers rapid diagnostics and repairs for all major stove and oven brands, backed by a satisfaction guarantee and parts warranty."
    },
    "washer-repair": {
        id: "washer-repair",
        title: "Washer Repair",
        icon: Waves,
        image: "/Washer Repair.jpg",
        features: ["Leak Prevention", "Electronic Repair", "Noise Reduction"],
        problems: ["Not draining", "Vibrating excessively", "Will not spin", "Water leakage", "Error codes appearing"],
        description: "Shield your home against leaks and revive your laundry routine with our quick and professional washing machine diagnosis and repair. We can repair problems with the spin cycle, drainage, and loud operation sounds. With our advanced diagnostic equipment, we will diagnose the problem to ensure that it doesn’t happen again in the future.",
        whyChooseUs: "We value your time and clothes. Our professionals quickly identify the root cause of washing issues to prevent water damage and get your laundry schedule back on track."
    },
    "dryer-repair": {
        id: "dryer-repair",
        title: "Dryer Repair",
        icon: Wind,
        image: "/Dryer Repair.webp",
        features: ["Safety Inspection", "Fast Restoration", "Vent Cleaning"],
        problems: ["Not drying clothes", "Overheating", "Drum not turning", "Strange noises", "Long dry times"],
        description: "Prevent fire risks and enhance efficiency. Our technicians are skilled at working with heating elements, belts, and sophisticated electronic controls. We fix problems related to clothes not drying, overheating, or drum rotation problems. Regular maintenance and prompt repairs will ensure your dryer operates in a safe and efficient manner.",
        whyChooseUs: "Safety is our number one priority. We not only fix your dryer but also inspect vents and airflow to prevent fire hazards and improve energy efficiency."
    },
    "garbage-disposal": {
        id: "garbage-disposal",
        title: "Garbage Disposal",
        icon: Trash2,
        image: "/Garbage-Disposal 2.jpg",
        features: ["Quick Installation", "Jam Removal", "Noise Elimination"],
        problems: ["Unit not turning on", "Jammed disposal", "Leaking from bottom", "Humming but not grinding", "Bad odors"],
        description: "Maintain your kitchen’s efficiency with our professional garbage disposal repair and installation. We deal with clogged disposers, motor problems, and leaking seals with accuracy. Our professionals can also help you upgrade your existing disposal to a more powerful and noise-reduced one.",
        whyChooseUs: "A jammed disposal is a kitchen nightmare. We offer swift, clean, and effective solutions to clear jams or install upgraded units that can handle your kitchen waste with ease."
    },
    "hvac-repair": {
        id: "hvac-repair",
        title: "HVAC Repair",
        icon: Thermometer,
        image: "/HVAC.jpg",
        features: ["24/7 Emergency Service", "Energy Efficiency", "Complete Diagnostics"],
        problems: ["No heating or cooling", "Uneven temperatures", "Strange noises", "High energy bills", "Thermostat issues"],
        description: "Enjoy the comfort of all seasons with our extensive HVAC repair solutions. Whether it is a furnace, air conditioner, heat pump, or ducts, our certified professionals will identify and repair all heating and cooling problems. Our experts will also configure your system for optimal efficiency to keep your house at the ideal temperature while cutting down on energy bills.",
        whyChooseUs: "Your comfort is our business. With 24/7 availability and comprehensive system checks, we ensure your home remains a sanctuary regardless of the weather outside."
    }
};

export const servicesList = Object.values(servicesData);

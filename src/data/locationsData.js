// Hand-authored content for individual city location pages (Location SEO
// Batch 2A — pilot cities only). Deliberately separate from
// src/data/serviceAreaZipCodes.js: that file is a mechanical, 379-row
// transcription of the approved ZIP dataset, while this file is a small,
// hand-curated table of which cities get a dedicated page and what to say
// on it. Approved ZIP codes and counties for each city are NEVER duplicated
// here — src/components/LocationDetail.jsx derives them at render time via
// getApprovedZipsForCity()/getApprovedCountiesForCity() from
// serviceAreaZipCodes.js, so there is exactly one source of truth for what's
// actually approved.
//
// `published: true` is the single gate that controls three separate things
// at once (see server/prerenderApp.mjs, server/generateSitemap.mjs, and the
// "Featured Service Areas" links in ServiceAreasPage.jsx): a location with
// published: false would still type-check and could be authored ahead of
// time, but would not get a prerendered route, a sitemap entry, or a hub
// link — so adding a new city later never means those three places can
// silently drift out of sync with each other.
//
// keywordResearch metrics (volume/kd/cpc) below are recorded for reference
// only — they are never rendered on the page. Only the plain keyword phrase
// itself is used in visible copy, and only where it reads naturally.

export const locationsData = {
  'bolingbrook-il': {
    slug: 'bolingbrook-il',
    city: 'Bolingbrook',
    state: 'IL',
    published: true,
    priorityTier: 1,

    primaryKeyword: 'appliance repair bolingbrook il',
    keywordResearch: { primary: { volume: 50, kd: 0 } },
    secondaryKeywords: [
      { keyword: 'refrigerator repair bolingbrook il', volume: 50, kd: 0 },
      { keyword: 'dishwasher repair bolingbrook il', volume: 50, kd: 21 },
      { keyword: 'dryer repair bolingbrook il', volume: 40, kd: 5 },
      { keyword: 'microwave repair bolingbrook il', volume: 20, kd: null },
      { keyword: 'hvac repair contractor bolingbrook il', volume: 10, kd: 12 }
    ],

    metaTitle: 'Appliance Repair in Bolingbrook, IL | Aerotech Solution',
    metaDescription: 'Aerotech Solution is based in Bolingbrook, IL and repairs refrigerators, dishwashers, dryers and more in the approved 60440 and 60490 ZIP codes.',
    h1: 'Appliance Repair in Bolingbrook, IL',

    introduction: [
      "Aerotech Solution is headquartered in Bolingbrook, and appliance repair in Bolingbrook, IL is where we do the majority of our day-to-day service calls. We repair major kitchen and laundry appliances along with HVAC and furnace systems for homes in our approved Bolingbrook ZIP codes.",
      "Service availability is based on ZIP code rather than city name alone, so the coverage details below reflect exactly which parts of Bolingbrook are in our standard service area today."
    ],

    // Top-emphasis services for this city, each with one secondary keyword
    // used naturally, once, in its own short paragraph — not stacked
    // together in a single block of text.
    serviceHighlights: [
      {
        slug: 'refrigerator-repair',
        keywordPhrase: 'refrigerator repair in Bolingbrook, IL',
        blurb: "Refrigerator repair in Bolingbrook, IL is one of the calls we handle most often, covering cooling problems, leaks, and ice maker issues on major residential brands."
      },
      {
        slug: 'dishwasher-repair',
        keywordPhrase: 'dishwasher repair in Bolingbrook, IL',
        blurb: "For dishwasher repair in Bolingbrook, IL, our technicians diagnose drainage, cleaning, and leak issues and explain what's actually wrong before any work begins."
      },
      {
        slug: 'dryer-repair',
        keywordPhrase: 'dryer repair in Bolingbrook, IL',
        blurb: "Dryer repair in Bolingbrook, IL includes airflow and vent checks alongside the repair itself, since restricted airflow is a common cause of slow-drying cycles."
      },
      {
        slug: 'microwave-repair',
        keywordPhrase: 'microwave repair in Bolingbrook, IL',
        blurb: "We also provide microwave repair in Bolingbrook, IL for built-in and countertop units, including heating failures and control panel issues."
      }
    ],

    // Every service is genuinely offered across the approved coverage area
    // (see the areaServed audit note in ServiceDetail.jsx); this ordering
    // just puts Bolingbrook's strongest-demand services first for display.
    availableServiceSlugs: [
      'refrigerator-repair',
      'dishwasher-repair',
      'dryer-repair',
      'microwave-repair',
      'hvac-furnace-repair',
      'oven-stove-cooktop-repair',
      'washer-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['refrigerator-repair', 'dryer-repair', 'dishwasher-repair'],
    nearbyCitySlugs: ['naperville-il'],

    faqs: [
      {
        q: 'Which Bolingbrook ZIP codes does Aerotech Solution cover?',
        a: "Our approved Bolingbrook service area currently covers the 60440 and 60490 ZIP codes. If you're not sure whether your address is included, use the ZIP checker on our Service Areas page before booking."
      },
      {
        q: 'What appliances do you repair in Bolingbrook?',
        a: "We repair refrigerators, dishwashers, dryers, washers, ovens, stoves, cooktops, microwaves, garbage disposals, water heaters, and HVAC and furnace systems for homes in our approved Bolingbrook ZIP codes."
      },
      {
        q: 'Do you repair furnaces in Bolingbrook?',
        a: "Yes. HVAC and furnace repair is available in Bolingbrook through our HVAC & Furnace service, alongside our kitchen and laundry appliance repairs."
      },
      {
        q: 'How do I schedule an appointment in Bolingbrook?',
        a: "Book online through our Book Service page, or contact us directly and we'll confirm availability for your ZIP code."
      },
      {
        q: 'Do you repair commercial appliances in Bolingbrook?',
        a: "Our primary focus is residential appliance repair. Some services, including refrigerator repair, also cover light commercial equipment — let us know your setup when you reach out and we can advise."
      },
      {
        q: 'What should I have ready before booking a repair?',
        a: "Your appliance's brand, model number, and a short description of the issue help us prepare for the visit, though our technician can also confirm details on site."
      }
    ],

    verifiedLocalProof: null
  },

  'naperville-il': {
    slug: 'naperville-il',
    city: 'Naperville',
    state: 'IL',
    published: true,
    priorityTier: 1,

    primaryKeyword: 'appliance repair naperville il',
    keywordResearch: { primary: { volume: 170, kd: 18, cpc: 7.86 } },
    secondaryKeywords: [
      { keyword: 'furnace repair naperville il', volume: 210, kd: 10 },
      { keyword: 'hvac repair naperville il', volume: 90, kd: 18 },
      { keyword: 'dishwasher repair naperville il', volume: 70, kd: 20 },
      { keyword: 'oven repair naperville il', volume: 40, kd: 11 },
      { keyword: 'refrigerator repair naperville il', volume: 30, kd: 16 },
      { keyword: 'washer repair naperville il', volume: 30, kd: 17 },
      { keyword: 'dryer repair naperville il', volume: 30, kd: 19 },
      { keyword: 'commercial refrigeration repair naperville il', volume: 30, kd: 0 }
    ],

    metaTitle: 'Appliance Repair in Naperville, IL | Aerotech Solution',
    metaDescription: 'Furnace, HVAC, dishwasher, oven and refrigerator repair in Naperville, IL. Aerotech Solution covers approved ZIP codes across the city. Book online.',
    h1: 'Appliance Repair in Naperville, IL',

    introduction: [
      "Aerotech Solution provides appliance repair in Naperville, IL across a defined set of approved ZIP codes, with furnace and HVAC service among the most requested repairs we handle in the area alongside kitchen and laundry appliances.",
      "Coverage is ZIP-code based rather than city-wide, so the approved ZIP list below shows exactly which parts of Naperville are in our standard service area today."
    ],

    serviceHighlights: [
      {
        slug: 'hvac-furnace-repair',
        keywordPhrase: 'furnace repair in Naperville, IL',
        blurb: "Furnace repair in Naperville, IL is one of our most-requested services in the area, alongside broader HVAC repair for heating and cooling systems."
      },
      {
        slug: 'dishwasher-repair',
        keywordPhrase: 'dishwasher repair in Naperville, IL',
        blurb: "For dishwasher repair in Naperville, IL, we diagnose drainage, cleaning, and leak problems and walk you through what's actually causing the issue."
      },
      {
        slug: 'oven-stove-cooktop-repair',
        keywordPhrase: 'oven repair in Naperville, IL',
        blurb: "Oven repair in Naperville, IL covers gas and electric ranges, wall ovens, and cooktops, including heating elements, igniters, and control boards."
      },
      {
        slug: 'refrigerator-repair',
        keywordPhrase: 'refrigerator repair in Naperville, IL',
        blurb: "Refrigerator repair in Naperville, IL includes both residential units and commercial refrigeration equipment like walk-in and reach-in coolers."
      }
    ],

    availableServiceSlugs: [
      'hvac-furnace-repair',
      'dishwasher-repair',
      'oven-stove-cooktop-repair',
      'refrigerator-repair',
      'washer-repair',
      'dryer-repair',
      'microwave-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['hvac-furnace-repair', 'dishwasher-repair', 'refrigerator-repair'],
    nearbyCitySlugs: ['bolingbrook-il', 'aurora-il'],

    faqs: [
      {
        q: 'Which Naperville ZIP codes does Aerotech Solution cover?',
        a: "Our approved Naperville service area currently covers the 60540, 60563, 60564, 60565, 60566, and 60567 ZIP codes. Use the ZIP checker on our Service Areas page to confirm your specific address."
      },
      {
        q: 'Do you repair furnaces and HVAC systems in Naperville?',
        a: "Yes. Furnace and HVAC repair is one of the services we handle most often in Naperville, covering heating, cooling, and ignition issues."
      },
      {
        q: 'What kitchen appliances do you repair in Naperville?',
        a: "We repair dishwashers, ovens, stoves, cooktops, and refrigerators in Naperville, along with washers, dryers, microwaves, garbage disposals, and water heaters."
      },
      {
        q: 'Do you handle commercial refrigeration in Naperville?',
        a: "Yes. Alongside residential refrigerator repair, we service commercial refrigeration equipment including walk-in coolers, reach-in coolers, and prep-table refrigerators."
      },
      {
        q: 'How does scheduling work for Naperville appointments?',
        a: "Book online through our Book Service page or contact us directly, and we'll confirm availability for your specific ZIP code."
      },
      {
        q: 'Do you repair washers and dryers in Naperville?',
        a: "Yes, washer and dryer repair are both available in our approved Naperville ZIP codes, covering drainage, spin, drying, and electronic control issues."
      }
    ],

    verifiedLocalProof: null
  },

  'aurora-il': {
    slug: 'aurora-il',
    city: 'Aurora',
    state: 'IL',
    published: true,
    priorityTier: 1,

    primaryKeyword: 'appliance repair aurora il',
    keywordResearch: { primary: { volume: 140, kd: 4, cpc: 5.37 } },
    secondaryKeywords: [
      { keyword: 'furnace repair aurora il', volume: 260, kd: 11 },
      { keyword: 'hvac repair aurora il', volume: 140, kd: 24 },
      { keyword: 'refrigerator repair aurora il', volume: 50, kd: 13 },
      { keyword: 'dryer repair aurora il', volume: 30, kd: 14 },
      { keyword: 'microwave repair aurora il', volume: 10, kd: 1 },
      { keyword: 'commercial refrigeration repair aurora il', volume: 30, kd: 0 }
    ],

    metaTitle: 'Appliance Repair in Aurora, IL | Aerotech Solution',
    metaDescription: 'Furnace, HVAC, refrigerator, dryer and microwave repair in Aurora, IL. Aerotech Solution covers approved ZIP codes across the city. Book online today.',
    h1: 'Appliance Repair in Aurora, IL',

    introduction: [
      "Aerotech Solution provides appliance repair in Aurora, IL across a defined set of approved ZIP codes, with furnace and HVAC repair among the most searched-for services in the area alongside refrigerator, dryer, and microwave repair.",
      "Coverage is based on ZIP code, not the city as a whole, so the approved list below reflects exactly which parts of Aurora are in our standard service area today."
    ],

    serviceHighlights: [
      {
        slug: 'hvac-furnace-repair',
        keywordPhrase: 'furnace repair in Aurora, IL',
        blurb: "Furnace repair in Aurora, IL is one of the most common calls we get in the area, along with broader HVAC repair for heating and cooling systems."
      },
      {
        slug: 'refrigerator-repair',
        keywordPhrase: 'refrigerator repair in Aurora, IL',
        blurb: "Refrigerator repair in Aurora, IL covers both residential units and commercial refrigeration equipment such as walk-in coolers and display cases."
      },
      {
        slug: 'dryer-repair',
        keywordPhrase: 'dryer repair in Aurora, IL',
        blurb: "Dryer repair in Aurora, IL includes a vent and airflow check with every visit, since restricted airflow is a leading cause of slow drying and overheating."
      },
      {
        slug: 'microwave-repair',
        keywordPhrase: 'microwave repair in Aurora, IL',
        blurb: "We also handle microwave repair in Aurora, IL for built-in and countertop units, including heating failures and door interlock issues."
      }
    ],

    availableServiceSlugs: [
      'hvac-furnace-repair',
      'refrigerator-repair',
      'dryer-repair',
      'microwave-repair',
      'dishwasher-repair',
      'oven-stove-cooktop-repair',
      'washer-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['hvac-furnace-repair', 'refrigerator-repair', 'dryer-repair'],
    nearbyCitySlugs: ['naperville-il'],

    faqs: [
      {
        q: 'Which Aurora ZIP codes does Aerotech Solution cover?',
        a: "Our approved Aurora service area currently covers the 60502, 60503, 60504, 60505, 60506, 60507, 60568, 60569, 60572, and 60598 ZIP codes. This list does not include North Aurora, which is tracked separately. Use the ZIP checker on our Service Areas page to confirm your address."
      },
      {
        q: 'Do you repair furnaces and HVAC systems in Aurora?',
        a: "Yes. Furnace and HVAC repair is one of our most common service calls in Aurora, covering heating, cooling, and ignition problems."
      },
      {
        q: 'Do you repair commercial refrigeration in Aurora?',
        a: "Yes. Alongside residential refrigerator repair, we service commercial refrigeration equipment including walk-in coolers, reach-in coolers, and beverage coolers."
      },
      {
        q: 'What other appliances do you repair in Aurora?',
        a: "Beyond HVAC and refrigeration, we repair dryers, microwaves, washers, dishwashers, ovens, stoves, cooktops, garbage disposals, and water heaters in our approved Aurora ZIP codes."
      },
      {
        q: 'How do I schedule an appointment in Aurora?',
        a: "Book online through our Book Service page or contact us directly, and we'll confirm availability for your specific ZIP code."
      },
      {
        q: 'Do you serve residential and commercial customers in Aurora?',
        a: "Our primary focus is residential appliance repair. Refrigerator repair also covers light commercial equipment — let us know your setup when you reach out and we can advise."
      }
    ],

    verifiedLocalProof: null
  },

  'chicago-il': {
    slug: 'chicago-il',
    city: 'Chicago',
    state: 'IL',
    published: true,
    priorityTier: 2,

    primaryKeyword: 'chicago il appliance repair',
    keywordResearch: { primary: { volume: 260, kd: 24, cpc: 6.72 } },
    secondaryKeywords: [
      { keyword: 'appliance repair chicago il', volume: 260, kd: 38, cpc: 6.72 },
      { keyword: 'appliance repair service chicago il', volume: 90, kd: 36 },
      { keyword: 'appliance repair in chicago il', volume: 30, kd: 34 },
      { keyword: 'home appliance repair in chicago il', volume: 20, kd: 22 },
      { keyword: 'refrigerator repair chicago il', volume: 170, kd: 35, cpc: 7.43 },
      { keyword: 'washer repair chicago il', volume: 110, kd: 26, cpc: 6.60 },
      { keyword: 'dryer repair chicago il', volume: 70, kd: 29 },
      { keyword: 'oven repair chicago il', volume: 50, kd: 34, cpc: 7.23 },
      { keyword: 'microwave repair chicago il', volume: 30, kd: 3, cpc: 2.40 },
      { keyword: 'hvac repair chicago il', volume: 170, kd: 50, cpc: 30.00 },
      { keyword: 'furnace repair in chicago il', volume: 480, kd: 34, cpc: 25.14 },
      { keyword: 'furnace repair chicago il', volume: 210, kd: 41, cpc: 25.12 }
    ],

    metaTitle: 'Appliance Repair in Chicago, IL | Aerotech Solution',
    metaDescription: 'Furnace, HVAC, refrigerator, washer and dryer repair in Chicago, IL. Aerotech Solution covers approved ZIP codes across the city. Book online today.',
    h1: 'Appliance Repair in Chicago, IL',

    introduction: [
      "Aerotech Solution provides appliance repair in Chicago, IL across a defined set of approved ZIP codes, with furnace and HVAC repair among our most requested services in the city alongside refrigerator, washer, dryer, oven and microwave repair.",
      "Coverage is based on approved ZIP code, not the city as a whole. Chicago is a large service area, and the approved list below reflects exactly which ZIP codes are in our standard coverage today.",
      "Our technicians carry commonly used replacement parts. Model-specific or additional required parts can be sourced after diagnosis."
    ],

    serviceHighlights: [
      {
        slug: 'hvac-furnace-repair',
        keywordPhrase: 'furnace repair in Chicago, IL',
        blurb: "Furnace repair in Chicago, IL is one of the most searched-for services in the city, and our technicians handle both furnace and broader HVAC repair for heating and cooling systems."
      },
      {
        slug: 'refrigerator-repair',
        keywordPhrase: 'refrigerator repair in Chicago, IL',
        blurb: "Refrigerator repair in Chicago, IL covers cooling failures, leaks, and ice maker issues on major residential brands."
      },
      {
        slug: 'washer-repair',
        keywordPhrase: 'washer repair in Chicago, IL',
        blurb: "Washer repair in Chicago, IL addresses drainage, spin cycle, and leak problems, with a full diagnosis before any repair begins."
      },
      {
        slug: 'dryer-repair',
        keywordPhrase: 'dryer repair in Chicago, IL',
        blurb: "Dryer repair in Chicago, IL includes a vent and airflow check with every visit, since restricted airflow is a common cause of slow drying."
      },
      {
        slug: 'oven-stove-cooktop-repair',
        keywordPhrase: 'oven repair in Chicago, IL',
        blurb: "Oven repair in Chicago, IL covers gas and electric ranges, wall ovens, and cooktops, including heating elements and control boards."
      },
      {
        slug: 'microwave-repair',
        keywordPhrase: 'microwave repair in Chicago, IL',
        blurb: "We also provide microwave repair in Chicago, IL for built-in and countertop units, including heating failures and door interlock issues."
      }
    ],

    availableServiceSlugs: [
      'hvac-furnace-repair',
      'refrigerator-repair',
      'washer-repair',
      'dryer-repair',
      'oven-stove-cooktop-repair',
      'microwave-repair',
      'dishwasher-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['hvac-furnace-repair', 'refrigerator-repair', 'dryer-repair'],
    nearbyCitySlugs: ['orland-park-il', 'downers-grove-il'],

    faqs: [
      {
        q: 'Which Chicago ZIP codes does Aerotech Solution cover?',
        a: "Our approved Chicago service area covers 84 specific ZIP codes across the city — not every Chicago ZIP code is included. Check the ZIP list on this page, or use the checker on our Service Areas page, to confirm your address before booking."
      },
      {
        q: 'Do you repair furnaces and HVAC systems in Chicago?',
        a: "Yes. Furnace and HVAC repair are among our most requested services in Chicago, covering heating, cooling, and ignition issues for homes in our approved ZIP codes."
      },
      {
        q: 'What kitchen and laundry appliances do you repair in Chicago?',
        a: "We repair refrigerators, washers, dryers, ovens, stoves, cooktops, microwaves, and dishwashers in our approved Chicago ZIP codes, along with garbage disposals and water heaters."
      },
      {
        q: 'Does Aerotech Solution serve every neighborhood in Chicago?',
        a: "No. Service availability is limited to the approved ZIP codes listed on this page, not every neighborhood or ZIP code in the city. Check the list above or use our ZIP checker to confirm your address."
      },
      {
        q: 'What are your service hours in Chicago?',
        a: "We're available Monday–Saturday, 9:00 AM–5:00 PM Central Time, and closed Sunday."
      },
      {
        q: 'How do I schedule an appointment in Chicago?',
        a: "Book online through our Book Service page, or contact us directly and we'll confirm availability for your specific ZIP code."
      }
    ],

    verifiedLocalProof: null
  },

  'joliet-il': {
    slug: 'joliet-il',
    city: 'Joliet',
    state: 'IL',
    published: true,
    priorityTier: 2,

    primaryKeyword: 'appliance repair joliet il',
    keywordResearch: { primary: { volume: 140, kd: 17, cpc: 3.82 } },
    secondaryKeywords: [
      { keyword: 'refrigerator repair joliet il', volume: 30, kd: 21, cpc: 4.16 },
      { keyword: 'dryer repair joliet il', volume: 90, kd: 16, cpc: 3.82 },
      { keyword: 'oven repair joliet il', volume: 40, kd: 21 },
      { keyword: 'hvac repair joliet il', volume: 40, kd: 8 },
      { keyword: 'furnace repair joliet il', volume: 110, kd: 7 }
    ],

    metaTitle: 'Appliance Repair in Joliet, IL | Aerotech Solution',
    metaDescription: 'Furnace, dryer, HVAC, oven and refrigerator repair in Joliet, IL. Aerotech Solution covers approved ZIP codes across the city. Book online today.',
    h1: 'Appliance Repair in Joliet, IL',

    introduction: [
      "Aerotech Solution provides appliance repair in Joliet, IL across a defined set of approved ZIP codes, with furnace and dryer repair among the most requested services in the area alongside HVAC, oven and refrigerator repair.",
      "Coverage is based on ZIP code, not the city as a whole, so the approved list below reflects exactly which parts of Joliet are in our standard service area today.",
      "Our technicians carry commonly used replacement parts. Model-specific or additional required parts can be sourced after diagnosis."
    ],

    serviceHighlights: [
      {
        slug: 'hvac-furnace-repair',
        keywordPhrase: 'furnace repair in Joliet, IL',
        blurb: "Furnace repair in Joliet, IL is one of our most-requested services in the area, alongside broader HVAC repair for heating and cooling systems."
      },
      {
        slug: 'dryer-repair',
        keywordPhrase: 'dryer repair in Joliet, IL',
        blurb: "Dryer repair in Joliet, IL includes a vent and airflow check with every visit, since restricted airflow is a common cause of slow-drying cycles."
      },
      {
        slug: 'oven-stove-cooktop-repair',
        keywordPhrase: 'oven repair in Joliet, IL',
        blurb: "Oven repair in Joliet, IL covers gas and electric ranges, wall ovens, and cooktops, including heating elements and control boards."
      },
      {
        slug: 'refrigerator-repair',
        keywordPhrase: 'refrigerator repair in Joliet, IL',
        blurb: "Refrigerator repair in Joliet, IL covers cooling problems, leaks, and ice maker issues on major residential brands."
      }
    ],

    availableServiceSlugs: [
      'hvac-furnace-repair',
      'dryer-repair',
      'oven-stove-cooktop-repair',
      'refrigerator-repair',
      'washer-repair',
      'microwave-repair',
      'dishwasher-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['hvac-furnace-repair', 'dryer-repair', 'refrigerator-repair'],
    nearbyCitySlugs: ['plainfield-il', 'romeoville-il', 'bolingbrook-il'],

    faqs: [
      {
        q: 'Which Joliet ZIP codes does Aerotech Solution cover?',
        a: "Our approved Joliet service area currently covers the 60431, 60432, 60433, 60434, 60435, and 60436 ZIP codes. Use the ZIP checker on our Service Areas page to confirm your specific address."
      },
      {
        q: 'Do you repair furnaces in Joliet?',
        a: "Yes. Furnace repair is one of the services we handle most often in Joliet, alongside broader HVAC repair for heating and cooling systems."
      },
      {
        q: 'Do you repair dryers in Joliet?',
        a: "Yes. Dryer repair in Joliet includes a vent and airflow check with every visit, since restricted airflow is a common cause of slow-drying cycles."
      },
      {
        q: 'What other appliances do you repair in Joliet?',
        a: "Beyond furnace, HVAC, and dryer repair, we service ovens, refrigerators, washers, microwaves, dishwashers, garbage disposals, and water heaters in our approved Joliet ZIP codes."
      },
      {
        q: 'What are your service hours in Joliet?',
        a: "We're available Monday–Saturday, 9:00 AM–5:00 PM Central Time, and closed Sunday."
      },
      {
        q: 'How do I schedule an appointment in Joliet?',
        a: "Book online through our Book Service page, or contact us directly and we'll confirm availability for your specific ZIP code."
      }
    ],

    verifiedLocalProof: null
  },

  'plainfield-il': {
    slug: 'plainfield-il',
    city: 'Plainfield',
    state: 'IL',
    published: true,
    priorityTier: 2,

    primaryKeyword: 'appliance repair plainfield il',
    keywordResearch: { primary: { volume: 90, kd: 11, cpc: 5.63 } },
    secondaryKeywords: [
      { keyword: 'refrigerator repair plainfield il', volume: 30, kd: 5, cpc: 6.95 },
      { keyword: 'hvac repair plainfield il', volume: 30, kd: null },
      { keyword: 'furnace repair plainfield il', volume: 260, kd: 20 }
    ],

    metaTitle: 'Appliance Repair in Plainfield, IL | Aerotech Solution',
    metaDescription: 'Furnace, HVAC and refrigerator repair in Plainfield, IL. Aerotech Solution covers approved ZIP codes across the city. Book your service online today.',
    h1: 'Appliance Repair in Plainfield, IL',

    introduction: [
      "Aerotech Solution provides appliance repair in Plainfield, IL across a defined set of approved ZIP codes, with furnace repair among the most searched-for services in the area alongside HVAC and refrigerator repair.",
      "Coverage is based on ZIP code, not the city as a whole, so the approved list below reflects exactly which parts of Plainfield are in our standard service area today.",
      "Our technicians carry commonly used replacement parts. Model-specific or additional required parts can be sourced after diagnosis.",
      "Beyond furnace, HVAC, and refrigerator repair, we also service dryers, washers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters within our approved Plainfield ZIP codes."
    ],

    serviceHighlights: [
      {
        slug: 'hvac-furnace-repair',
        keywordPhrase: 'furnace repair in Plainfield, IL',
        blurb: "Furnace repair in Plainfield, IL is one of the most searched-for services in the area, alongside broader HVAC repair for heating and cooling systems."
      },
      {
        slug: 'refrigerator-repair',
        keywordPhrase: 'refrigerator repair in Plainfield, IL',
        blurb: "Refrigerator repair in Plainfield, IL covers cooling problems, leaks, and ice maker issues on major residential brands."
      }
    ],

    availableServiceSlugs: [
      'hvac-furnace-repair',
      'refrigerator-repair',
      'dryer-repair',
      'washer-repair',
      'oven-stove-cooktop-repair',
      'microwave-repair',
      'dishwasher-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['hvac-furnace-repair', 'refrigerator-repair'],
    nearbyCitySlugs: ['joliet-il', 'naperville-il', 'romeoville-il'],

    faqs: [
      {
        q: 'Which Plainfield ZIP codes does Aerotech Solution cover?',
        a: "Our approved Plainfield service area currently covers the 60544, 60585, and 60586 ZIP codes. Use the ZIP checker on our Service Areas page to confirm your specific address."
      },
      {
        q: 'Do you repair furnaces and HVAC systems in Plainfield?',
        a: "Yes. Furnace and HVAC repair are among the services most requested in Plainfield, covering heating, cooling, and ignition issues."
      },
      {
        q: 'Do you repair refrigerators in Plainfield?',
        a: "Yes. Refrigerator repair in Plainfield covers cooling problems, leaks, and ice maker issues on major residential brands."
      },
      {
        q: 'What other appliances do you repair in Plainfield?',
        a: "Beyond furnace, HVAC, and refrigerator repair, we service dryers, washers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters in our approved Plainfield ZIP codes."
      },
      {
        q: 'What are your service hours in Plainfield?',
        a: "We're available Monday–Saturday, 9:00 AM–5:00 PM Central Time, and closed Sunday."
      },
      {
        q: 'How do I schedule an appointment in Plainfield?',
        a: "Book online through our Book Service page, or contact us directly and we'll confirm availability for your specific ZIP code."
      }
    ],

    verifiedLocalProof: null
  },

  'orland-park-il': {
    slug: 'orland-park-il',
    city: 'Orland Park',
    state: 'IL',
    published: true,
    priorityTier: 2,

    primaryKeyword: 'appliance repair orland park il',
    keywordResearch: { primary: { volume: 30, kd: 9, cpc: 4.70 } },
    secondaryKeywords: [
      { keyword: 'hvac repair orland park il', volume: 30, kd: 4 },
      { keyword: 'furnace repair orland park il', volume: 90, kd: 0 }
    ],

    metaTitle: 'Appliance Repair in Orland Park, IL | Aerotech Solution',
    metaDescription: 'Furnace and HVAC repair in Orland Park, IL, plus full appliance service. Aerotech Solution covers approved ZIP codes across the city. Book online.',
    h1: 'Appliance Repair in Orland Park, IL',

    introduction: [
      "Aerotech Solution provides appliance repair in Orland Park, IL across a defined set of approved ZIP codes, with furnace and HVAC repair among the most requested services in the area.",
      "Coverage is based on ZIP code, not the city as a whole, so the approved list below reflects exactly which parts of Orland Park are in our standard service area today.",
      "Our technicians carry commonly used replacement parts. Model-specific or additional required parts can be sourced after diagnosis.",
      "Beyond furnace and HVAC repair, we also service refrigerators, washers, dryers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters within our approved Orland Park ZIP codes."
    ],

    serviceHighlights: [
      {
        slug: 'hvac-furnace-repair',
        keywordPhrase: 'furnace repair in Orland Park, IL',
        blurb: "Furnace repair in Orland Park, IL is one of our most-requested services in the area, alongside broader HVAC repair for heating and cooling systems."
      }
    ],

    availableServiceSlugs: [
      'hvac-furnace-repair',
      'refrigerator-repair',
      'dryer-repair',
      'washer-repair',
      'oven-stove-cooktop-repair',
      'microwave-repair',
      'dishwasher-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['hvac-furnace-repair', 'refrigerator-repair'],
    nearbyCitySlugs: ['chicago-il', 'bolingbrook-il'],

    faqs: [
      {
        q: 'Which Orland Park ZIP codes does Aerotech Solution cover?',
        a: "Our approved Orland Park service area currently covers the 60462 and 60467 ZIP codes. Use the ZIP checker on our Service Areas page to confirm your specific address."
      },
      {
        q: 'Do you repair furnaces and HVAC systems in Orland Park?',
        a: "Yes. Furnace and HVAC repair are among the services most requested in Orland Park, covering heating, cooling, and ignition issues."
      },
      {
        q: 'What other appliances do you repair in Orland Park?',
        a: "Beyond furnace and HVAC repair, we service refrigerators, washers, dryers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters in our approved Orland Park ZIP codes."
      },
      {
        q: 'Does Aerotech Solution serve every part of Orland Park?',
        a: "No. Service availability is limited to the approved ZIP codes listed on this page, not every ZIP code in Orland Park. Use our ZIP checker to confirm your address."
      },
      {
        q: 'What are your service hours in Orland Park?',
        a: "We're available Monday–Saturday, 9:00 AM–5:00 PM Central Time, and closed Sunday."
      },
      {
        q: 'How do I schedule an appointment in Orland Park?',
        a: "Book online through our Book Service page, or contact us directly and we'll confirm availability for your specific ZIP code."
      }
    ],

    verifiedLocalProof: null
  },

  'downers-grove-il': {
    slug: 'downers-grove-il',
    city: 'Downers Grove',
    state: 'IL',
    published: true,
    priorityTier: 2,

    primaryKeyword: 'appliance repair downers grove il',
    keywordResearch: { primary: { volume: 20, kd: 9, cpc: 6.54 } },
    secondaryKeywords: [
      { keyword: 'appliance repair in downers grove il', volume: 20, kd: 12, cpc: 6.54 },
      { keyword: 'hvac repair downers grove il', volume: 40, kd: 16 },
      { keyword: 'furnace repair downers grove il', volume: 320, kd: 19, cpc: 34.92 }
    ],

    metaTitle: 'Appliance Repair in Downers Grove, IL | Aerotech Solution',
    metaDescription: 'Furnace and HVAC repair in Downers Grove, IL, plus full appliance service. Aerotech Solution covers approved ZIP codes across the city. Book online.',
    h1: 'Appliance Repair in Downers Grove, IL',

    introduction: [
      "Aerotech Solution provides appliance repair in Downers Grove, IL across a defined set of approved ZIP codes, with furnace and HVAC repair among the most searched-for services in the area.",
      "Coverage is based on ZIP code, not the city as a whole, so the approved list below reflects exactly which parts of Downers Grove are in our standard service area today.",
      "Our technicians carry commonly used replacement parts. Model-specific or additional required parts can be sourced after diagnosis.",
      "Beyond furnace and HVAC repair, we also service refrigerators, washers, dryers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters within our approved Downers Grove ZIP codes."
    ],

    serviceHighlights: [
      {
        slug: 'hvac-furnace-repair',
        keywordPhrase: 'furnace repair in Downers Grove, IL',
        blurb: "Furnace repair in Downers Grove, IL is one of the most searched-for services in the area, alongside broader HVAC repair for heating and cooling systems."
      }
    ],

    availableServiceSlugs: [
      'hvac-furnace-repair',
      'refrigerator-repair',
      'dryer-repair',
      'washer-repair',
      'oven-stove-cooktop-repair',
      'microwave-repair',
      'dishwasher-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['hvac-furnace-repair', 'refrigerator-repair'],
    nearbyCitySlugs: ['naperville-il', 'woodridge-il'],

    faqs: [
      {
        q: 'Which Downers Grove ZIP codes does Aerotech Solution cover?',
        a: "Our approved Downers Grove service area currently covers the 60515 and 60516 ZIP codes. Use the ZIP checker on our Service Areas page to confirm your specific address."
      },
      {
        q: 'Do you repair furnaces and HVAC systems in Downers Grove?',
        a: "Yes. Furnace and HVAC repair are among the services most searched for in Downers Grove, covering heating, cooling, and ignition issues."
      },
      {
        q: 'What other appliances do you repair in Downers Grove?',
        a: "Beyond furnace and HVAC repair, we service refrigerators, washers, dryers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters in our approved Downers Grove ZIP codes."
      },
      {
        q: 'Does Aerotech Solution serve every part of Downers Grove?',
        a: "No. Service availability is limited to the approved ZIP codes listed on this page, not every ZIP code in Downers Grove. Use our ZIP checker to confirm your address."
      },
      {
        q: 'What are your service hours in Downers Grove?',
        a: "We're available Monday–Saturday, 9:00 AM–5:00 PM Central Time, and closed Sunday."
      },
      {
        q: 'How do I schedule an appointment in Downers Grove?',
        a: "Book online through our Book Service page, or contact us directly and we'll confirm availability for your specific ZIP code."
      }
    ],

    verifiedLocalProof: null
  },

  'romeoville-il': {
    slug: 'romeoville-il',
    city: 'Romeoville',
    state: 'IL',
    published: true,
    priorityTier: 2,

    primaryKeyword: 'appliance repair romeoville il',
    keywordResearch: { primary: { volume: 20, kd: 0, cpc: 4.63 } },
    secondaryKeywords: [
      { keyword: 'furnace repair romeoville il', volume: 40, kd: 2 }
    ],

    metaTitle: 'Appliance Repair in Romeoville, IL | Aerotech Solution',
    metaDescription: 'Furnace and HVAC repair in Romeoville, IL, plus full appliance service. Aerotech Solution covers approved ZIP codes across the city. Book online.',
    h1: 'Appliance Repair in Romeoville, IL',

    introduction: [
      "Aerotech Solution provides appliance repair in Romeoville, IL across a defined set of approved ZIP codes, with furnace and HVAC repair among the services most requested in the area.",
      "Coverage is based on ZIP code, not the city as a whole, so the approved list below reflects exactly which parts of Romeoville are in our standard service area today.",
      "Our technicians carry commonly used replacement parts. Model-specific or additional required parts can be sourced after diagnosis.",
      "Beyond furnace and HVAC repair, we also service refrigerators, washers, dryers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters within our approved Romeoville ZIP code."
    ],

    serviceHighlights: [
      {
        slug: 'hvac-furnace-repair',
        keywordPhrase: 'furnace repair in Romeoville, IL',
        blurb: "Furnace repair in Romeoville, IL is among the services most requested in the area, alongside broader HVAC repair for heating and cooling systems."
      }
    ],

    availableServiceSlugs: [
      'hvac-furnace-repair',
      'refrigerator-repair',
      'dryer-repair',
      'washer-repair',
      'oven-stove-cooktop-repair',
      'microwave-repair',
      'dishwasher-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['hvac-furnace-repair', 'refrigerator-repair'],
    nearbyCitySlugs: ['bolingbrook-il', 'joliet-il', 'plainfield-il'],

    faqs: [
      {
        q: 'Which Romeoville ZIP codes does Aerotech Solution cover?',
        a: "Our approved Romeoville service area currently covers the 60446 ZIP code. Use the ZIP checker on our Service Areas page to confirm your specific address."
      },
      {
        q: 'Do you repair furnaces and HVAC systems in Romeoville?',
        a: "Yes. Furnace and HVAC repair are among the services most requested in Romeoville, covering heating, cooling, and ignition issues."
      },
      {
        q: 'What other appliances do you repair in Romeoville?',
        a: "Beyond furnace and HVAC repair, we service refrigerators, washers, dryers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters in our approved Romeoville ZIP code."
      },
      {
        q: 'Does Aerotech Solution serve all of Romeoville?',
        a: "No. Service availability is limited to the approved ZIP code listed on this page, not every address in Romeoville. Use our ZIP checker to confirm your address."
      },
      {
        q: 'What are your service hours in Romeoville?',
        a: "We're available Monday–Saturday, 9:00 AM–5:00 PM Central Time, and closed Sunday."
      },
      {
        q: 'How do I schedule an appointment in Romeoville?',
        a: "Book online through our Book Service page, or contact us directly and we'll confirm availability for your ZIP code."
      }
    ],

    verifiedLocalProof: null
  },

  'woodridge-il': {
    slug: 'woodridge-il',
    city: 'Woodridge',
    state: 'IL',
    published: true,
    priorityTier: 2,

    primaryKeyword: 'appliance repair woodridge il',
    keywordResearch: { primary: { volume: 20, kd: 11 } },
    secondaryKeywords: [
      { keyword: 'furnace repair woodridge il', volume: 260, kd: 4 }
    ],

    metaTitle: 'Appliance Repair in Woodridge, IL | Aerotech Solution',
    metaDescription: 'Furnace repair in Woodridge, IL, plus full appliance service. Aerotech Solution covers approved ZIP codes across the city. Book online today.',
    h1: 'Appliance Repair in Woodridge, IL',

    introduction: [
      "Aerotech Solution provides appliance repair in Woodridge, IL across a defined set of approved ZIP codes, with furnace repair among the services most requested in the area.",
      "Coverage is based on ZIP code, not the city as a whole, so the approved list below reflects exactly which parts of Woodridge are in our standard service area today.",
      "Our technicians carry commonly used replacement parts. Model-specific or additional required parts can be sourced after diagnosis.",
      "Beyond furnace repair, we also service HVAC systems, refrigerators, washers, dryers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters within our approved Woodridge ZIP code."
    ],

    serviceHighlights: [
      {
        slug: 'hvac-furnace-repair',
        keywordPhrase: 'furnace repair in Woodridge, IL',
        blurb: "Furnace repair in Woodridge, IL is one of the services most requested in the area, and our technicians also handle broader HVAC repair for heating and cooling systems."
      }
    ],

    availableServiceSlugs: [
      'hvac-furnace-repair',
      'refrigerator-repair',
      'dryer-repair',
      'washer-repair',
      'oven-stove-cooktop-repair',
      'microwave-repair',
      'dishwasher-repair',
      'garbage-disposal',
      'water-heater-repair'
    ],

    relatedBlogSlugs: ['hvac-furnace-repair', 'refrigerator-repair'],
    nearbyCitySlugs: ['downers-grove-il', 'naperville-il', 'bolingbrook-il'],

    faqs: [
      {
        q: 'Which Woodridge ZIP codes does Aerotech Solution cover?',
        a: "Our approved Woodridge service area currently covers the 60517 ZIP code. Use the ZIP checker on our Service Areas page to confirm your specific address."
      },
      {
        q: 'Do you repair furnaces in Woodridge?',
        a: "Yes. Furnace repair is one of the services most requested in Woodridge, alongside broader HVAC repair for heating and cooling systems."
      },
      {
        q: 'What other appliances do you repair in Woodridge?',
        a: "Beyond furnace and HVAC repair, we service refrigerators, washers, dryers, ovens, stoves, cooktops, microwaves, dishwashers, garbage disposals, and water heaters in our approved Woodridge ZIP code."
      },
      {
        q: 'Does Aerotech Solution serve all of Woodridge?',
        a: "No. Service availability is limited to the approved ZIP code listed on this page, not every address in Woodridge. Use our ZIP checker to confirm your address."
      },
      {
        q: 'What are your service hours in Woodridge?',
        a: "We're available Monday–Saturday, 9:00 AM–5:00 PM Central Time, and closed Sunday."
      },
      {
        q: 'How do I schedule an appointment in Woodridge?',
        a: "Book online through our Book Service page, or contact us directly and we'll confirm availability for your ZIP code."
      }
    ],

    verifiedLocalProof: null
  }
};

/** All location slugs that should render as real routes, sitemap entries, and hub links. */
export const publishedLocationSlugs = Object.keys(locationsData).filter(
  (slug) => locationsData[slug].published
);

/** Returns a location's data only if it exists AND is published; otherwise null. */
export function getPublishedLocation(slug) {
  const location = locationsData[slug];
  return location && location.published ? location : null;
}

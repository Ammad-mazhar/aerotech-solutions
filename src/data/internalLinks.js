// Shared internal-linking data, keyed by the service/blog id (servicesData.js
// and blogsData.js already use identical ids for matching pages, e.g.
// "refrigerator-repair" exists as both a service and a blog post — so no
// separate service-to-blog mapping table is needed for that 1:1 pairing).
//
// This file only holds the data that ISN'T already derivable from existing
// data structures:
//   - serviceAnchorText: descriptive, customer-focused anchor text used when a
//     blog post links to its matching service page.
//   - relatedBlogLinks: a small, hand-picked set of genuinely related blog
//     topics (not every post linked to every other post), each with natural
//     surrounding sentence text so the link reads as normal prose rather than
//     a bare list of URLs.

export const serviceAnchorText = {
    "refrigerator-repair": "professional refrigerator repair service",
    "washer-repair": "schedule washer repair",
    "dryer-repair": "expert dryer repair technicians",
    "dishwasher-repair": "professional dishwasher repair",
    "microwave-repair": "microwave repair service",
    "oven-stove-cooktop-repair": "oven, stove and cooktop repair",
    "garbage-disposal": "garbage disposal repair service",
    "water-heater-repair": "professional water heater repair",
    "hvac-furnace-repair": "emergency HVAC and furnace repair"
};

// Each entry: the blog post this appears on -> one or two related posts,
// with `before`/`after` text so the link can be dropped into a sentence:
// {before}<Link>{anchor}</Link>{after}
export const relatedBlogLinks = {
    "washer-repair": [
        {
            id: "dryer-repair",
            before: "Washers and dryers tend to get serviced around the same time — if your dryer is also taking longer than it used to, our guide on ",
            anchor: "spotting dryer problems before they become a fire hazard",
            after: " covers the warning signs worth paying attention to."
        }
    ],
    "dryer-repair": [
        {
            id: "washer-repair",
            before: "Dealing with laundry room issues on both machines? Our breakdown of ",
            anchor: "why washers stop draining or spinning",
            after: " covers the most common causes on that side of things."
        }
    ],
    "dishwasher-repair": [
        {
            id: "garbage-disposal",
            before: "Many dishwashers drain through a garbage disposal, so a clogged disposal can look exactly like a dishwasher problem. Our guide to ",
            anchor: "garbage disposals that hum but won't grind",
            after: " explains how to tell the two apart."
        },
        {
            id: "refrigerator-repair",
            before: "Kitchen appliances often act up around the same time in busy households — if your fridge is also showing warning signs, see our guide on ",
            anchor: "when refrigerator issues are safe to wait on",
            after: " and when they're not."
        }
    ],
    "garbage-disposal": [
        {
            id: "dishwasher-repair",
            before: "Since garbage disposals and dishwashers frequently share the same drain line, a disposal clog can show up as a dishwasher that won't drain. Our guide on ",
            anchor: "decoding common dishwasher problems",
            after: " covers that connection in more detail."
        }
    ],
    "oven-stove-cooktop-repair": [
        {
            id: "microwave-repair",
            before: "If your microwave is having heating trouble at the same time, our guide on ",
            anchor: "what's safe to check on a microwave and what isn't",
            after: " is worth a read before touching anything yourself."
        }
    ],
    "microwave-repair": [
        {
            id: "oven-stove-cooktop-repair",
            before: "For problems with your range instead, our roundup of ",
            anchor: "five signs your oven, stove, or cooktop needs repair",
            after: " covers the most common warning signs by appliance type."
        }
    ],
    "refrigerator-repair": [
        {
            id: "dishwasher-repair",
            before: "If your dishwasher is acting up around the same time, our guide on ",
            anchor: "cloudy dishes and standing water problems",
            after: " walks through the most common causes."
        }
    ],
    "hvac-furnace-repair": [
        {
            id: "water-heater-repair",
            before: "Furnace and water heater problems have a habit of showing up in the same cold snap. Our ",
            anchor: "homeowner's guide to water heater troubleshooting",
            after: " covers the most common causes of no hot water."
        }
    ],
    "water-heater-repair": [
        {
            id: "hvac-furnace-repair",
            before: "If your furnace is struggling at the same time, our guide on ",
            anchor: "furnace ignition problems and uneven heating",
            after: " breaks down what's usually behind it."
        }
    ]
};

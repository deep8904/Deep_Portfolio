export type Photo = {
  id: string;
  slug: string;
  title: string;
  src: string;
  category: string;
  location: string | null;
  date: string | null;
  description: string | null;
  alt: string;
  width: number;
  height: number;
  featured: boolean;
  sortOrder: number;
  /** Traceability only — never rendered in the UI. */
  originalFilename: string;
};

/**
 * The full curated library: every distinct photograph the owner supplied,
 * across every category, including images that show identifiable people.
 * Publishing these reflects the owner's explicit decision to include them —
 * see docs/photography-manifest.md for the earlier privacy-hold history and
 * the taxonomy notes (Food and a few recategorized single-image cases).
 *
 * Sequenced by category rotation (not grouped), so "All" reads as one
 * considered sequence rather than clusters.
 */
const RAW_PHOTOS: Omit<Photo, "sortOrder">[] = [
  {
    id: "rooftop-angles", slug: "rooftop-angles", title: "Rooftop Angles", src: "/photography/rooftop-angles.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "July 2025", description: null,
    alt: "Geometric rooftop corner against a colorful sunset sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_5428.jpg",
  },
  {
    id: "track-day", slug: "track-day", title: "Track Day", src: "/photography/track-day.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "December 2024", description: null,
    alt: "Car drifting on a track with spectators watching in the background.",
    width: 1712, height: 1284, featured: false, originalFilename: "APC_0137.jpg",
  },
  {
    id: "faint-stars", slug: "faint-stars", title: "Faint Stars", src: "/photography/faint-stars.jpg",
    category: "Places", location: "Garfield County, Utah", date: "March 2025", description: null,
    alt: "Faint stars visible in a dark night sky over a silhouetted horizon.",
    width: 2400, height: 1800, featured: false, originalFilename: "IMG_2343.jpg",
  },
  {
    id: "framed-by-branches", slug: "framed-by-branches", title: "Framed by Branches", src: "/photography/framed-by-branches.jpg",
    category: "Nature", location: "Fort Worth, Texas", date: "May 2025", description: null,
    alt: "Garden pavilion roof framed by overhanging tree branches.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4020.jpg",
  },
  {
    id: "walking-alone", slug: "walking-alone", title: "Walking Alone", src: "/photography/walking-alone.jpg",
    category: "Street", location: "Mesa, Arizona", date: "April 2024", description: null,
    alt: "Person walking away down a wide sidewalk beside an empty street.",
    width: 1350, height: 2400, featured: false, originalFilename: "APC_0017.jpg",
  },
  {
    id: "green-glow", slug: "green-glow", title: "Green Glow", src: "/photography/green-glow.jpg",
    category: "Details", location: "Tempe, Arizona", date: "May 2025", description: null,
    alt: "A single light glowing green among dark tree branches at night.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4491.jpg",
  },
  {
    id: "form-and-function", slug: "form-and-function", title: "Form and Function", src: "/photography/form-and-function.jpg",
    category: "Events", location: "Mesa, Arizona", date: "January 2024", description: null,
    alt: "Presenters speaking to an audience at a workshop event.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0665_jpg.jpg",
  },
  {
    id: "late-night-bowl", slug: "late-night-bowl", title: "Late Night Bowl", src: "/photography/late-night-bowl.jpg",
    category: "Food", location: "Glendale, Arizona", date: "January 2026", description: null,
    alt: "Close-up of a soup bowl with a folded napkin and chopsticks.",
    width: 1920, height: 2400, featured: false, originalFilename: "IMG_7227.jpg",
  },
  {
    id: "green-tower", slug: "green-tower", title: "Green Tower", src: "/photography/green-tower.jpg",
    category: "Architecture", location: "Pinal County, Arizona", date: "November 2025", description: null,
    alt: "Ornate green-roofed tower building against a blue sky.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_6931.jpg",
  },
  {
    id: "classic-blue", slug: "classic-blue", title: "Classic Blue", src: "/photography/classic-blue.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "December 2024", description: null,
    alt: "Vintage blue Porsche 911 parked at a car meet.",
    width: 2400, height: 1800, featured: false, originalFilename: "IMG_0535.jpg",
  },
  {
    id: "dockside", slug: "dockside", title: "Dockside", src: "/photography/dockside.jpg",
    category: "Places", location: "Maricopa County, Arizona", date: "November 2025", description: null,
    alt: "Person sitting on a wooden dock beside still water.",
    width: 1920, height: 2400, featured: false, originalFilename: "IMG_4840.jpg",
  },
  {
    id: "green-current", slug: "green-current", title: "Green Current", src: "/photography/green-current.jpg",
    category: "Nature", location: "Peoria, Arizona", date: "January 2025", description: null,
    alt: "Abstract close-up of glowing green water texture.",
    width: 1800, height: 2400, featured: false, originalFilename: "APC_0160.jpg",
  },
  {
    id: "crossing", slug: "crossing", title: "Crossing", src: "/photography/crossing.jpg",
    category: "Street", location: "Tempe, Arizona", date: "April 2024", description: null,
    alt: "Small group of people crossing a street near a campus building.",
    width: 2400, height: 1350, featured: false, originalFilename: "APC_0035.jpg",
  },
  {
    id: "behind-the-lights", slug: "behind-the-lights", title: "Behind the Lights", src: "/photography/behind-the-lights.jpg",
    category: "Details", location: "Mesa, Arizona", date: "July 2025", description: null,
    alt: "Two people setting up photography lighting equipment in a studio.",
    width: 2400, height: 1800, featured: false, originalFilename: "IMG_5394.jpg",
  },
  {
    id: "workshop-table", slug: "workshop-table", title: "Workshop Table", src: "/photography/workshop-table.jpg",
    category: "Events", location: "Mesa, Arizona", date: "January 2024", description: null,
    alt: "Group of people gathered around a table at a workshop.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0694.jpg",
  },
  {
    id: "small-plates", slug: "small-plates", title: "Small Plates", src: "/photography/small-plates.jpg",
    category: "Food", location: "Glendale, Arizona", date: "January 2026", description: null,
    alt: "Dumplings and spring rolls arranged on small dark plates.",
    width: 1920, height: 2400, featured: false, originalFilename: "IMG_7250.jpg",
  },
  {
    id: "clock-tower", slug: "clock-tower", title: "Clock Tower", src: "/photography/clock-tower.jpg",
    category: "Architecture", location: "Phoenix, Arizona", date: "December 2024", description: null,
    alt: "Bell tower of a brick building against a dramatic cloudy sky.",
    width: 1920, height: 2400, featured: false, originalFilename: "IMG_0675.jpg",
  },
  {
    id: "chrome-detail", slug: "chrome-detail", title: "Chrome Detail", src: "/photography/chrome-detail.jpg",
    category: "Automotive", location: "Fort Worth, Texas", date: "May 2025", description: null,
    alt: "Close-up of a vintage car's chrome bumper and trim.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4090.jpg",
  },
  {
    id: "plane-over-the-city", slug: "plane-over-the-city", title: "Plane Over the City", src: "/photography/plane-over-the-city.jpg",
    category: "Places", location: "Tempe, Arizona", date: "September 2025", description: null,
    alt: "Airplane flying over a city building against a blue sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_5942.jpg",
  },
  {
    id: "stone-garden", slug: "stone-garden", title: "Stone Garden", src: "/photography/stone-garden.jpg",
    category: "Nature", location: "Phoenix, Arizona", date: "December 2024", description: null,
    alt: "Japanese garden pond at dusk with a stone lantern and rippling reflections.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_0433.jpg",
  },
  {
    id: "warm-lamp", slug: "warm-lamp", title: "Warm Lamp", src: "/photography/warm-lamp.jpg",
    category: "Street", location: "Mesa, Arizona", date: "January 2024", description: null,
    alt: "Person seated at a desk lit by a warm lamp, seen from behind.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_0745.jpg",
  },
  {
    id: "stadium-lights", slug: "stadium-lights", title: "Stadium Lights", src: "/photography/stadium-lights.jpg",
    category: "Details", location: "Tempe, Arizona", date: "September 2024", description: null,
    alt: "Stadium floodlight glowing against a black night sky.",
    width: 2400, height: 1440, featured: false, originalFilename: "IMG_8186.jpg",
  },
  {
    id: "wall-of-faces", slug: "wall-of-faces", title: "Wall of Faces", src: "/photography/wall-of-faces.jpg",
    category: "Events", location: "Mesa, Arizona", date: "January 2024", description: null,
    alt: "Illuminated art installation of layered face imagery on a wall.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0705_jpg.jpg",
  },
  {
    id: "shared-table", slug: "shared-table", title: "Shared Table", src: "/photography/shared-table.jpg",
    category: "Food", location: "Glendale, Arizona", date: "January 2026", description: null,
    alt: "Noodle and rice dishes on a restaurant table.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_7256.jpg",
  },
  {
    id: "line-of-light", slug: "line-of-light", title: "Line of Light", src: "/photography/line-of-light.jpg",
    category: "Architecture", location: "Phoenix, Arizona", date: "December 2024", description: null,
    alt: "Narrow gap between two building facades filled with bright light.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0681.jpg",
  },
  {
    id: "green-under-trees", slug: "green-under-trees", title: "Green Under Trees", src: "/photography/green-under-trees.jpg",
    category: "Automotive", location: "Tempe, Arizona", date: "June 2025", description: null,
    alt: "Green sports car parked under a tree beside a road.",
    width: 2400, height: 1350, featured: false, originalFilename: "IMG_4585.jpg",
  },
  {
    id: "superstition", slug: "superstition", title: "Superstition", src: "/photography/superstition.jpg",
    category: "Places", location: "Pinal County, Arizona", date: "November 2025", description: null,
    alt: "Rugged desert mountain peaks beneath heavy clouds.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_6930.jpg",
  },
  {
    id: "pink-bloom", slug: "pink-bloom", title: "Pink Bloom", src: "/photography/pink-bloom.jpg",
    category: "Nature", location: "Fort Worth, Texas", date: "May 2025", description: null,
    alt: "Close-up of a pink rose surrounded by dark green leaves.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3975.jpg",
  },
  {
    id: "commute", slug: "commute", title: "Commute", src: "/photography/commute.jpg",
    category: "Street", location: "Tempe, Arizona", date: "January 2025", description: null,
    alt: "Person riding public transit with a bicycle, seen from behind.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_1571.jpg",
  },
  {
    id: "8-02-pm", slug: "8-02-pm", title: "8:02 PM", src: "/photography/8-02-pm.jpg",
    category: "Details", location: "Tempe, Arizona", date: "February 2025", description: null,
    alt: "Illuminated transit sign displaying a route number and the time at night.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_1648.jpg",
  },
  {
    id: "at-the-podium", slug: "at-the-podium", title: "At the Podium", src: "/photography/at-the-podium.jpg",
    category: "Events", location: "Mesa, Arizona", date: "January 2024", description: null,
    alt: "Person presenting from a laptop beside a large display screen.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0763_jpg.jpg",
  },
  {
    id: "palms-and-stone", slug: "palms-and-stone", title: "Palms and Stone", src: "/photography/palms-and-stone.jpg",
    category: "Architecture", location: "Mesa, Arizona", date: "December 2024", description: null,
    alt: "Black-and-white view of a building facade with tall palm trees.",
    width: 2400, height: 1800, featured: false, originalFilename: "IMG_0713.jpg",
  },
  {
    id: "green-in-the-lot", slug: "green-in-the-lot", title: "Green in the Lot", src: "/photography/green-in-the-lot.jpg",
    category: "Automotive", location: "Tempe, Arizona", date: "June 2025", description: null,
    alt: "Green sports car parked beside a palm tree in a parking lot.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4589.jpg",
  },
  {
    id: "sunset-commute", slug: "sunset-commute", title: "Sunset Commute", src: "/photography/sunset-commute.jpg",
    category: "Places", location: "Mesa, Arizona", date: "March 2025", description: null,
    alt: "Cars driving down a street toward a colorful sunset.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3121.jpg",
  },
  {
    id: "garden-pavilion", slug: "garden-pavilion", title: "Garden Pavilion", src: "/photography/garden-pavilion.jpg",
    category: "Nature", location: "Fort Worth, Texas", date: "May 2025", description: null,
    alt: "Traditional wooden pavilion surrounded by manicured garden trees.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4015.jpg",
  },
  {
    id: "piano-in-the-dark", slug: "piano-in-the-dark", title: "Piano in the Dark", src: "/photography/piano-in-the-dark.jpg",
    category: "Street", location: "Mesa, Arizona", date: "January 2025", description: null,
    alt: "Person playing piano, lit by a single warm spotlight in a dark room.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_1586.jpg",
  },
  {
    id: "setting-the-time", slug: "setting-the-time", title: "Setting the Time", src: "/photography/setting-the-time.jpg",
    category: "Details", location: null, date: "January 2026", description: null,
    alt: "Close-up of a hand checking a smartwatch.",
    width: 2400, height: 1600, featured: false, originalFilename: "DSC05551.jpg",
  },
  {
    id: "stage-light", slug: "stage-light", title: "Stage Light", src: "/photography/stage-light.jpg",
    category: "Events", location: "Mesa, Arizona", date: "January 2024", description: null,
    alt: "Performer under purple stage lighting with electronic equipment.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0770.jpg",
  },
  {
    id: "mission-light", slug: "mission-light", title: "Mission Light", src: "/photography/mission-light.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "January 2025", description: null,
    alt: "Mission-style church facade lit warmly at dusk with a stained glass window.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_1528.jpg",
  },
  {
    id: "wheel-study", slug: "wheel-study", title: "Wheel Study", src: "/photography/wheel-study.jpg",
    category: "Automotive", location: "Tempe, Arizona", date: "June 2025", description: null,
    alt: "Close-up of a car wheel and brake caliper.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4595.jpg",
  },
  {
    id: "dusk-drive", slug: "dusk-drive", title: "Dusk Drive", src: "/photography/dusk-drive.jpg",
    category: "Places", location: "Tempe, Arizona", date: "February 2024", description: null,
    alt: "Street at dusk with car taillights and a colorful sunset sky.",
    width: 2400, height: 1714, featured: false, originalFilename: "IMG_3573.jpg",
  },
  {
    id: "garden-roofline", slug: "garden-roofline", title: "Garden Roofline", src: "/photography/garden-roofline.jpg",
    category: "Nature", location: "Fort Worth, Texas", date: "May 2025", description: null,
    alt: "Wooden garden structure roofline framed by tree branches.",
    width: 2400, height: 1800, featured: false, originalFilename: "IMG_4022.jpg",
  },
  {
    id: "crossing-guard", slug: "crossing-guard", title: "Crossing Guard", src: "/photography/crossing-guard.jpg",
    category: "Street", location: "Tempe, Arizona", date: "March 2025", description: null,
    alt: "Person in a safety vest standing in a street intersection at dusk.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3131.jpg",
  },
  {
    id: "string-lights", slug: "string-lights", title: "String Lights", src: "/photography/string-lights.jpg",
    category: "Details", location: "Mesa, Arizona", date: "December 2024", description: null,
    alt: "Portrait of a person standing in front of blurred string lights.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0731.jpg",
  },
  {
    id: "the-presentation", slug: "the-presentation", title: "The Presentation", src: "/photography/the-presentation.jpg",
    category: "Events", location: "Mesa, Arizona", date: "January 2024", description: null,
    alt: "Person presenting to a small audience beside display screens.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0799.jpg",
  },
  {
    id: "courtyard-fountain", slug: "courtyard-fountain", title: "Courtyard Fountain", src: "/photography/courtyard-fountain.jpg",
    category: "Architecture", location: "Sedona, Arizona", date: "March 2025", description: null,
    alt: "Tiered stone fountain in a Spanish-style courtyard.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_2924.jpg",
  },
  {
    id: "green-on-the-street", slug: "green-on-the-street", title: "Green on the Street", src: "/photography/green-on-the-street.jpg",
    category: "Automotive", location: "Tempe, Arizona", date: "June 2025", description: null,
    alt: "Green sports car parked on a city street.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4599.jpg",
  },
  {
    id: "old-town-carriage", slug: "old-town-carriage", title: "Old Town Carriage", src: "/photography/old-town-carriage.jpg",
    category: "Places", location: "Fort Worth, Texas", date: "May 2025", description: null,
    alt: "Horse-drawn carriage moving down a brick street lined with shops.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_4073.jpg",
  },
  {
    id: "among-the-trees", slug: "among-the-trees", title: "Among the Trees", src: "/photography/among-the-trees.jpg",
    category: "Nature", location: "Fort Worth, Texas", date: "May 2025", description: null,
    alt: "Multi-tiered pagoda tower rising through surrounding green trees.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4028.jpg",
  },
  {
    id: "on-duty", slug: "on-duty", title: "On Duty", src: "/photography/on-duty.jpg",
    category: "Street", location: "Tempe, Arizona", date: "April 2025", description: null,
    alt: "Police officer on a motorcycle stopped at a street corner.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3504.jpg",
  },
  {
    id: "string-lights-black-and-white", slug: "string-lights-black-and-white", title: "String Lights, Black and White", src: "/photography/string-lights-black-and-white.jpg",
    category: "Details", location: null, date: "December 2024", description: null,
    alt: "Black-and-white portrait of a person in front of blurred string lights.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0737.jpg",
  },
  {
    id: "on-stage", slug: "on-stage", title: "On Stage", src: "/photography/on-stage.jpg",
    category: "Events", location: "Phoenix, Arizona", date: "July 2024", description: null,
    alt: "Two people in orange robes seated on a stage during a ceremony.",
    width: 2400, height: 1714, featured: false, originalFilename: "IMG_7466.jpg",
  },
  {
    id: "balcony-corner", slug: "balcony-corner", title: "Balcony Corner", src: "/photography/balcony-corner.jpg",
    category: "Architecture", location: "Sedona, Arizona", date: "March 2025", description: null,
    alt: "Adobe-style building corner with wrought iron balcony railings.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_2929.jpg",
  },
  {
    id: "fintail", slug: "fintail", title: "Fintail", src: "/photography/fintail.jpg",
    category: "Automotive", location: "San Francisco, California", date: "July 2025", description: null,
    alt: "Vintage car's rear fin and taillight, parked at a car show.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_5171.jpg",
  },
  {
    id: "framed-palms", slug: "framed-palms", title: "Framed Palms", src: "/photography/framed-palms.jpg",
    category: "Places", location: "Tempe, Arizona", date: "August 2025", description: null,
    alt: "View through an archway of palm trees and a parked car.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_5472.jpg",
  },
  {
    id: "autumn-buck", slug: "autumn-buck", title: "Autumn Buck", src: "/photography/autumn-buck.jpg",
    category: "Nature", location: "Durango, Colorado", date: "October 2024", description: null,
    alt: "Mule deer with antlers standing among autumn-colored trees.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_9405.jpg",
  },
  {
    id: "platform", slug: "platform", title: "Platform", src: "/photography/platform.jpg",
    category: "Street", location: "Tempe, Arizona", date: "February 2024", description: null,
    alt: "Person waiting alone on a train platform at night.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_3688.jpg",
  },
  {
    id: "resting", slug: "resting", title: "Resting", src: "/photography/resting.jpg",
    category: "Details", location: "Maricopa County, Arizona", date: "March 2024", description: null,
    alt: "Person resting with eyes closed in a vehicle seat.",
    width: 1714, height: 2400, featured: false, originalFilename: "IMG_5885.jpg",
  },
  {
    id: "bell-and-dome", slug: "bell-and-dome", title: "Bell and Dome", src: "/photography/bell-and-dome.jpg",
    category: "Architecture", location: "Sedona, Arizona", date: "March 2025", description: null,
    alt: "Mission bell tower dome against a soft cloudy sky, with a cross on top.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_2933.jpg",
  },
  {
    id: "open-hood", slug: "open-hood", title: "Open Hood", src: "/photography/open-hood.jpg",
    category: "Automotive", location: "San Francisco, California", date: "July 2025", description: null,
    alt: "Vintage red car with its hood open, parked at a car show.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_5172.jpg",
  },
  {
    id: "power-lines", slug: "power-lines", title: "Power Lines", src: "/photography/power-lines.jpg",
    category: "Places", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Classic car parked beside a road lined with power lines.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_6319.jpg",
  },
  {
    id: "ripple", slug: "ripple", title: "Ripple", src: "/photography/ripple.jpg",
    category: "Nature", location: "Peoria, Arizona", date: "January 2025", description: null,
    alt: "Mallard duck swimming on rippling blue water, viewed from above.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_0826.jpg",
  },
  {
    id: "climb", slug: "climb", title: "Climb", src: "/photography/climb.jpg",
    category: "Street", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Silhouette of a person climbing equipment against a sunset sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_6083.jpg",
  },
  {
    id: "color-powder", slug: "color-powder", title: "Color Powder", src: "/photography/color-powder.jpg",
    category: "Details", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Rear view of a person's head and shoulders covered in colorful powder.",
    width: 1714, height: 2400, featured: false, originalFilename: "IMG_6122.jpg",
  },
  {
    id: "switchback", slug: "switchback", title: "Switchback", src: "/photography/switchback.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "February 2024", description: null,
    alt: "Exterior metal staircase zigzagging up a brick building beside a tree.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3664.jpg",
  },
  {
    id: "garage-row", slug: "garage-row", title: "Garage Row", src: "/photography/garage-row.jpg",
    category: "Automotive", location: "Tempe, Arizona", date: "March 2024", description: null,
    alt: "Dark sedan parked inside a parking garage.",
    width: 1711, height: 2400, featured: false, originalFilename: "IMG_5501.jpg",
  },
  {
    id: "desert-hauler", slug: "desert-hauler", title: "Desert Hauler", src: "/photography/desert-hauler.jpg",
    category: "Places", location: "Pinal County, Arizona", date: "November 2025", description: null,
    alt: "Vintage red pickup truck parked on a desert roadside under a cloudy sky.",
    width: 1800, height: 2400, featured: true, originalFilename: "IMG_6939.jpg",
  },
  {
    id: "alone-on-the-water", slug: "alone-on-the-water", title: "Alone on the Water", src: "/photography/alone-on-the-water.jpg",
    category: "Nature", location: "Gilbert, Arizona", date: "March 2025", description: null,
    alt: "Small dark waterbird swimming alone on a calm blue lake.",
    width: 1232, height: 2190, featured: false, originalFilename: "IMG_3156.jpg",
  },
  {
    id: "group-black-and-white", slug: "group-black-and-white", title: "Group, Black and White", src: "/photography/group-black-and-white.jpg",
    category: "Street", location: "Tempe, Arizona", date: "May 2025", description: null,
    alt: "Black-and-white group photo of six people posing together outdoors.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_8427.jpg",
  },
  {
    id: "overexposed", slug: "overexposed", title: "Overexposed", src: "/photography/overexposed.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "May 2025", description: null,
    alt: "Modern building facade with slatted windows under a bright sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4456.jpg",
  },
  {
    id: "night-lineup", slug: "night-lineup", title: "Night Lineup", src: "/photography/night-lineup.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "March 2024", description: null,
    alt: "Sports cars parked in a row, photographed at night.",
    width: 2400, height: 2400, featured: false, originalFilename: "IMG_5539.jpg",
  },
  {
    id: "into-the-desert", slug: "into-the-desert", title: "Into the Desert", src: "/photography/into-the-desert.jpg",
    category: "Places", location: null, date: "October 2024", description: null,
    alt: "Off-road SUV parked on a desert road with red rock formations in the distance.",
    width: 2400, height: 1800, featured: false, originalFilename: "IMG_8339.jpg",
  },
  {
    id: "watching-the-water", slug: "watching-the-water", title: "Watching the Water", src: "/photography/watching-the-water.jpg",
    category: "Nature", location: "Gilbert, Arizona", date: "March 2025", description: null,
    alt: "White egret standing on a railing overlooking rippling blue water.",
    width: 1350, height: 2400, featured: true, originalFilename: "IMG_7314.jpg",
  },
  {
    id: "brick-and-glass", slug: "brick-and-glass", title: "Brick and Glass", src: "/photography/brick-and-glass.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "March 2024", description: null,
    alt: "Brutalist brick building corner with narrow windows against a blue sky.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_5944.jpg",
  },
  {
    id: "blue-classic", slug: "blue-classic", title: "Blue Classic", src: "/photography/blue-classic.jpg",
    category: "Automotive", location: "Phoenix, Arizona", date: "March 2024", description: null,
    alt: "Classic dark blue Porsche parked along a street under power lines.",
    width: 1440, height: 2268, featured: false, originalFilename: "IMG_5554.jpg",
  },
  {
    id: "palm-silhouettes", slug: "palm-silhouettes", title: "Palm Silhouettes", src: "/photography/palm-silhouettes.jpg",
    category: "Places", location: "Mesa, Arizona", date: "April 2024", description: null,
    alt: "Silhouettes of palm trees against an orange sunset sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "APC_0009.jpg",
  },
  {
    id: "fire-escape", slug: "fire-escape", title: "Fire Escape", src: "/photography/fire-escape.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "March 2024", description: null,
    alt: "Brick tower with an exterior metal staircase and a streetlight in front.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_5962.jpg",
  },
  {
    id: "red-another-angle", slug: "red-another-angle", title: "Red, Another Angle", src: "/photography/red-another-angle.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Red sports car parked in a lot, viewed from a different angle.",
    width: 1714, height: 2400, featured: false, originalFilename: "IMG_5603.jpg",
  },
  {
    id: "sunrise", slug: "sunrise", title: "Sunrise", src: "/photography/sunrise.jpg",
    category: "Places", location: "Yavapai County, Arizona", date: "January 2025", description: null,
    alt: "Sun flaring over a dark mountain silhouette.",
    width: 2400, height: 1800, featured: true, originalFilename: "IMG_1337.jpg",
  },
  {
    id: "mail", slug: "mail", title: "Mail", src: "/photography/mail.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "March 2024", description: null,
    alt: "Illuminated storefront entrance at night with a MAIL sign above the door.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_6335.jpg",
  },
  {
    id: "red-in-the-lot", slug: "red-in-the-lot", title: "Red in the Lot", src: "/photography/red-in-the-lot.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Red sports car parked in a lot with mountains in the background.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_5608.jpg",
  },
  {
    id: "moon-through-clouds", slug: "moon-through-clouds", title: "Moon Through Clouds", src: "/photography/moon-through-clouds.jpg",
    category: "Places", location: "Tempe, Arizona", date: "April 2026", description: null,
    alt: "Full moon glowing behind dark clouds at night.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_1587.jpg",
  },
  {
    id: "steeple", slug: "steeple", title: "Steeple", src: "/photography/steeple.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "October 2025", description: null,
    alt: "Church steeple with a cross beside a modern glass building at dusk.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_6394.jpg",
  },
  {
    id: "red-at-sunset", slug: "red-at-sunset", title: "Red at Sunset", src: "/photography/red-at-sunset.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Red sports car parked at sunset with light flare.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_5610.jpg",
  },
  {
    id: "city-sunset", slug: "city-sunset", title: "City Sunset", src: "/photography/city-sunset.jpg",
    category: "Places", location: "Tempe, Arizona", date: "February 2025", description: null,
    alt: "Sun setting low over a distant city skyline.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_1851.jpg",
  },
  {
    id: "spires-at-night", slug: "spires-at-night", title: "Spires at Night", src: "/photography/spires-at-night.jpg",
    category: "Architecture", location: "Chino Hills, California", date: "October 2025", description: null,
    alt: "Ornately carved temple spires illuminated at night.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_6551.jpg",
  },
  {
    id: "parking-lot-light", slug: "parking-lot-light", title: "Parking Lot Light", src: "/photography/parking-lot-light.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Red car in a parking lot beneath a tall light fixture at sunset.",
    width: 2400, height: 2400, featured: false, originalFilename: "IMG_5613.jpg",
  },
  {
    id: "deep-sky", slug: "deep-sky", title: "Deep Sky", src: "/photography/deep-sky.jpg",
    category: "Places", location: "Page, Arizona", date: "February 2025", description: null,
    alt: "Long-exposure night sky image showing dense stars and a faint streak.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_2039.jpg",
  },
  {
    id: "wide-temple-view", slug: "wide-temple-view", title: "Wide Temple View", src: "/photography/wide-temple-view.jpg",
    category: "Architecture", location: "Chino Hills, California", date: "October 2025", description: null,
    alt: "Wide view of an illuminated temple complex at night.",
    width: 2400, height: 853, featured: false, originalFilename: "IMG_6565.jpg",
  },
  {
    id: "teal-wheel", slug: "teal-wheel", title: "Teal Wheel", src: "/photography/teal-wheel.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Close-up of a bright teal sports car's wheel and brake caliper.",
    width: 2400, height: 2400, featured: true, originalFilename: "IMG_5876.jpg",
  },
  {
    id: "storm-rolling-in", slug: "storm-rolling-in", title: "Storm Rolling In", src: "/photography/storm-rolling-in.jpg",
    category: "Places", location: "Tempe, Arizona", date: "March 2025", description: null,
    alt: "Dramatic storm clouds over a residential neighborhood.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_2529.jpg",
  },
  {
    id: "gilded", slug: "gilded", title: "Gilded", src: "/photography/gilded.jpg",
    category: "Architecture", location: null, date: "January 2026", description: null,
    alt: "Ornate gold-leaf altarpiece inside a historic mission church.",
    width: 1350, height: 2400, featured: true, originalFilename: "IMG_7158.jpg",
  },
  {
    id: "teal-taillight", slug: "teal-taillight", title: "Teal Taillight", src: "/photography/teal-taillight.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Close-up of a bright teal sports car's taillight.",
    width: 2400, height: 1714, featured: false, originalFilename: "IMG_5877.jpg",
  },
  {
    id: "contrail-sky", slug: "contrail-sky", title: "Contrail Sky", src: "/photography/contrail-sky.jpg",
    category: "Places", location: "Mesa, Arizona", date: "March 2025", description: null,
    alt: "Dramatic dark clouds with a jet contrail above a streetlight.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3066.jpg",
  },
  {
    id: "parking-structure", slug: "parking-structure", title: "Parking Structure", src: "/photography/parking-structure.jpg",
    category: "Architecture", location: "Scottsdale, Arizona", date: "June 2024", description: null,
    alt: "Entrance to a multi-level parking garage with signage.",
    width: 2400, height: 1800, featured: false, originalFilename: "IMG_7248.jpg",
  },
  {
    id: "yellow-thing", slug: "yellow-thing", title: "Yellow Thing", src: "/photography/yellow-thing.jpg",
    category: "Automotive", location: "Tempe, Arizona", date: "March 2024", description: null,
    alt: "Small yellow vintage utility vehicle parked on a street corner.",
    width: 1600, height: 2400, featured: false, originalFilename: "IMG_5976.jpg",
  },
  {
    id: "plane-and-clouds", slug: "plane-and-clouds", title: "Plane and Clouds", src: "/photography/plane-and-clouds.jpg",
    category: "Places", location: "Tempe, Arizona", date: "April 2025", description: null,
    alt: "Small airplane flying past scattered clouds in a blue sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3214.jpg",
  },
  {
    id: "steeple-and-palms", slug: "steeple-and-palms", title: "Steeple and Palms", src: "/photography/steeple-and-palms.jpg",
    category: "Architecture", location: "Tempe, Arizona", date: "May 2025", description: null,
    alt: "Church steeple beside tall palm trees against a partly cloudy sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_4487.jpg",
  },
  {
    id: "mustang-in-shadow", slug: "mustang-in-shadow", title: "Mustang in Shadow", src: "/photography/mustang-in-shadow.jpg",
    category: "Automotive", location: "Tempe, Arizona", date: "March 2024", description: null,
    alt: "Vintage black Mustang parked inside a shaded garage.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_6033.jpg",
  },
  {
    id: "storm-light", slug: "storm-light", title: "Storm Light", src: "/photography/storm-light.jpg",
    category: "Places", location: null, date: "March 2024", description: null,
    alt: "Streetlight against a dramatic dark storm cloud at dusk.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3338.jpg",
  },
  {
    id: "muscle-in-the-garage", slug: "muscle-in-the-garage", title: "Muscle in the Garage", src: "/photography/muscle-in-the-garage.jpg",
    category: "Automotive", location: "Tempe, Arizona", date: "March 2024", description: null,
    alt: "Vintage muscle car parked inside a parking garage.",
    width: 2400, height: 1350, featured: false, originalFilename: "IMG_6037.jpg",
  },
  {
    id: "orange-wisps", slug: "orange-wisps", title: "Orange Wisps", src: "/photography/orange-wisps.jpg",
    category: "Places", location: "Phoenix, Arizona", date: "April 2025", description: null,
    alt: "Wispy orange clouds streaking across a sunset sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3445.jpg",
  },
  {
    id: "california-sky", slug: "california-sky", title: "California Sky", src: "/photography/california-sky.jpg",
    category: "Automotive", location: "Corona, California", date: "October 2025", description: null,
    alt: "Car parked beneath a wide sky with distant mountains.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_6538.jpg",
  },
  {
    id: "above-the-clouds", slug: "above-the-clouds", title: "Above the Clouds", src: "/photography/above-the-clouds.jpg",
    category: "Places", location: null, date: "May 2025", description: null,
    alt: "View of an airplane wing above a layer of clouds.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_3655.jpg",
  },
  {
    id: "chrome-grille", slug: "chrome-grille", title: "Chrome Grille", src: "/photography/chrome-grille.jpg",
    category: "Automotive", location: "Mesa, Arizona", date: "May 2024", description: null,
    alt: "Close-up of a vintage car's chrome grille and headlights.",
    width: 2400, height: 1714, featured: false, originalFilename: "IMG_6987.jpg",
  },
  {
    id: "purple-dusk", slug: "purple-dusk", title: "Purple Dusk", src: "/photography/purple-dusk.jpg",
    category: "Places", location: "Tempe, Arizona", date: "February 2024", description: null,
    alt: "Campus buildings and palm trees under a purple dusk sky.",
    width: 2400, height: 1350, featured: false, originalFilename: "IMG_3674.jpg",
  },
  {
    id: "white-in-motion", slug: "white-in-motion", title: "White in Motion", src: "/photography/white-in-motion.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "May 2024", description: null,
    alt: "White sports car parked near a brick building.",
    width: 2400, height: 1715, featured: false, originalFilename: "IMG_7035.jpg",
  },
  {
    id: "overcast-corner", slug: "overcast-corner", title: "Overcast Corner", src: "/photography/overcast-corner.jpg",
    category: "Places", location: "Mesa, Arizona", date: "March 2024", description: null,
    alt: "Overcast sky above a low commercial building on a street corner.",
    width: 2400, height: 1350, featured: false, originalFilename: "IMG_5812.jpg",
  },
  {
    id: "storefront-row", slug: "storefront-row", title: "Storefront Row", src: "/photography/storefront-row.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "August 2024", description: null,
    alt: "Cars parked along a row of storefronts.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_7647.jpg",
  },
  {
    id: "solo-flight", slug: "solo-flight", title: "Solo Flight", src: "/photography/solo-flight.jpg",
    category: "Places", location: "Tempe, Arizona", date: "February 2025", description: null,
    alt: "Airplane silhouette climbing through a clear blue sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_6731.jpg",
  },
  {
    id: "magenta-on-the-street", slug: "magenta-on-the-street", title: "Magenta on the Street", src: "/photography/magenta-on-the-street.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "August 2024", description: null,
    alt: "Magenta sports car parked on a city street.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_7656.jpg",
  },
  {
    id: "waterfront-glow", slug: "waterfront-glow", title: "Waterfront Glow", src: "/photography/waterfront-glow.jpg",
    category: "Places", location: null, date: "February 2025", description: null,
    alt: "Sunset reflecting on water beside a city skyline.",
    width: 1800, height: 2400, featured: true, originalFilename: "IMG_7029.jpg",
  },
  {
    id: "shop-row", slug: "shop-row", title: "Shop Row", src: "/photography/shop-row.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "August 2024", description: null,
    alt: "Cars parked in front of a row of shops.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_7669.jpg",
  },
  {
    id: "bench-by-the-water", slug: "bench-by-the-water", title: "Bench by the Water", src: "/photography/bench-by-the-water.jpg",
    category: "Places", location: "San Miguel County, Colorado", date: "October 2024", description: null,
    alt: "Two people sitting on a bench by a lake at dusk, seen in silhouette.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_8954.jpg",
  },
  {
    id: "red-by-the-shop", slug: "red-by-the-shop", title: "Red by the Shop", src: "/photography/red-by-the-shop.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "August 2024", description: null,
    alt: "Red sports car parked near a storefront.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_7764.jpg",
  },
  {
    id: "orange-moon", slug: "orange-moon", title: "Orange Moon", src: "/photography/orange-moon.jpg",
    category: "Places", location: "Peoria, Arizona", date: "January 2025", description: null,
    alt: "Orange moon appearing to rest on a streetlight against a blue sky.",
    width: 1350, height: 2400, featured: false, originalFilename: "IMG_0773.jpg",
  },
  {
    id: "night-row", slug: "night-row", title: "Night Row", src: "/photography/night-row.jpg",
    category: "Automotive", location: "Scottsdale, Arizona", date: "August 2024", description: null,
    alt: "Row of parked sports cars photographed at night.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_7771.jpg",
  },
  {
    id: "dusk-walk", slug: "dusk-walk", title: "Dusk Walk", src: "/photography/dusk-walk.jpg",
    category: "Places", location: "Tempe, Arizona", date: "February 2024", description: null,
    alt: "Campus street at dusk lined with palm trees and lit buildings.",
    width: 2400, height: 1350, featured: false, originalFilename: "IMG_3674.jpg",
  },
  {
    id: "blue-hour-building", slug: "blue-hour-building", title: "Blue Hour Building", src: "/photography/blue-hour-building.jpg",
    category: "Places", location: "Tempe, Arizona", date: "February 2024", description: null,
    alt: "Modern building illuminated at dusk under a deep blue sky.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_3678.jpg",
  },
  {
    id: "canyon-edge", slug: "canyon-edge", title: "Canyon Edge", src: "/photography/canyon-edge.jpg",
    category: "Places", location: "Coconino County, Arizona", date: "March 2024", description: null,
    alt: "Person walking along the rim of a red rock canyon.",
    width: 1800, height: 2400, featured: false, originalFilename: "IMG_5418.jpg",
  },];

export const PHOTOS: Photo[] = RAW_PHOTOS.map((p, i) => ({ ...p, sortOrder: i }));

const CATEGORY_ORDER = ["Architecture", "Places", "Nature", "Details", "Automotive", "Street", "Events", "Food"];

/** Filters are generated only from categories that actually have published photos. */
export const PHOTO_CATEGORIES = CATEGORY_ORDER.filter((cat) => PHOTOS.some((p) => p.category === cat));

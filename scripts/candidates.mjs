// Candidate puzzle chains. Each puzzle: start, target, and one or more candidate
// editorial chains (intermediate hops only — start/target excluded).
// The verifier checks every consecutive edge against the live Wikipedia link graph
// and keeps the first chain whose edges ALL verify.
export const CANDIDATES = [
  {
    start: 'Shrek', target: 'Napoleon',
    startEmoji: '🟢', targetEmoji: '🎩',
    tagline: 'From swamp to empire.',
    chains: [
      ['Ogre', 'France'],
      ['Fairy tale', 'France'],
      ['Ogre', 'French language', 'France'],
      ['Fairy tale', 'Brothers Grimm', 'Germany', 'France'],
    ],
  },
  {
    start: 'Volcano', target: 'Frankenstein',
    startEmoji: '🌋', targetEmoji: '🧟',
    tagline: 'An eruption wrote a monster.',
    chains: [
      ['Mount Tambora', 'Year Without a Summer'],
      ['1815 eruption of Mount Tambora', 'Year Without a Summer'],
      ['Mount Tambora', 'Year Without a Summer', 'Mary Shelley'],
    ],
  },
  {
    start: 'Selfie', target: 'Mona Lisa',
    startEmoji: '🤳', targetEmoji: '🖼️',
    tagline: 'The original self-portrait energy.',
    chains: [
      ['Self-portrait', 'Leonardo da Vinci'],
      ['Photography', 'Painting', 'Leonardo da Vinci'],
    ],
  },
  {
    start: 'Banana', target: 'Isaac Newton',
    startEmoji: '🍌', targetEmoji: '🍎',
    tagline: 'Wrong fruit. Right physicist.',
    chains: [
      ['Fruit', 'Apple'],
      ['Fruit', 'Apple', 'Gravity'],
    ],
  },
  {
    start: 'Zombie', target: 'Quantum mechanics',
    startEmoji: '🧟', targetEmoji: '⚛️',
    tagline: 'Braaains… theoretical ones.',
    chains: [
      ['Philosophical zombie', 'Consciousness'],
      ['Philosophical zombie', 'Consciousness', 'Physics'],
      ['Haitian Vodou', 'Religion', 'Physics'],
    ],
  },
  {
    start: 'Bluetooth', target: 'Vikings',
    startEmoji: '📶', targetEmoji: '⚔️',
    tagline: 'Your earbuds are named after a king.',
    chains: [
      ['Harald Bluetooth'],
      ['Harald Bluetooth', 'Denmark'],
    ],
  },
  {
    start: 'Emoji', target: 'Ancient Egypt',
    startEmoji: '😀', targetEmoji: '🐫',
    tagline: 'Hieroglyphs never died. They got a keyboard.',
    chains: [
      ['Pictogram', 'Egyptian hieroglyphs'],
      ['Japan', 'Writing system', 'Egyptian hieroglyphs'],
    ],
  },
  {
    start: 'Yoga', target: 'The Beatles',
    startEmoji: '🧘', targetEmoji: '🎸',
    tagline: 'Namaste, Abbey Road.',
    chains: [
      ['Meditation', 'Transcendental Meditation'],
      ['India', 'Maharishi Mahesh Yogi'],
      ['Meditation', 'Maharishi Mahesh Yogi'],
    ],
  },
  {
    start: 'Sushi', target: 'Silicon Valley',
    startEmoji: '🍣', targetEmoji: '💻',
    tagline: 'Raw fish to raw capital.',
    chains: [
      ['California roll', 'California'],
      ['Japan', 'United States', 'California'],
    ],
  },
  {
    start: 'Wi-Fi', target: 'Hedy Lamarr',
    startEmoji: '📡', targetEmoji: '🌟',
    tagline: "Your router's godmother was a 1940s movie star.",
    chains: [
      ['Frequency-hopping spread spectrum'],
    ],
  },
  {
    start: 'Croissant', target: 'Ottoman Empire',
    startEmoji: '🥐', targetEmoji: '🏰',
    tagline: 'Breakfast, forged in a siege.',
    chains: [
      ['Vienna'],
      ['Vienna', 'Battle of Vienna'],
      ['Austria', 'Vienna', 'Battle of Vienna'],
      ['Kifli', 'Vienna', 'Battle of Vienna'],
    ],
  },
  {
    start: 'Dracula', target: 'Photosynthesis',
    startEmoji: '🧛', targetEmoji: '🌱',
    tagline: 'One of these thrives in sunlight.',
    chains: [
      ['Vampire', 'Sunlight'],
      ['Vampire', 'Sun', 'Sunlight'],
      ['Bram Stoker', 'Ireland', 'Agriculture', 'Plant'],
    ],
  },
  {
    start: 'Saxophone', target: 'Belgium',
    startEmoji: '🎷', targetEmoji: '🧇',
    tagline: 'Jazz owes Brussels an apology letter.',
    chains: [
      ['Adolphe Sax'],
      ['Adolphe Sax', 'Brussels'],
    ],
  },
  {
    start: 'Denim', target: 'California gold rush',
    startEmoji: '👖', targetEmoji: '⛏️',
    tagline: 'Your jeans were work equipment.',
    chains: [
      ['Jeans', 'Levi Strauss'],
      ['Levi Strauss'],
      ['Jeans', 'Levi Strauss & Co.', 'Levi Strauss'],
    ],
  },
  {
    start: 'Mermaid', target: 'Hans Christian Andersen',
    startEmoji: '🧜‍♀️', targetEmoji: '✍️',
    tagline: 'The tail has an author.',
    chains: [
      ['The Little Mermaid'],
      ['The Little Mermaid (statue)', 'Copenhagen'],
      ['The Little Mermaid', 'Copenhagen'],
    ],
  },
  {
    start: 'Avocado', target: 'Super Bowl',
    startEmoji: '🥑', targetEmoji: '🏈',
    tagline: 'Guacamole season is a national holiday.',
    chains: [
      ['Guacamole'],
      ['Guacamole', 'American football'],
      ['Mexico', 'United States', 'American football'],
    ],
  },
  {
    start: 'Harry Potter', target: 'Alchemy',
    startEmoji: '⚡', targetEmoji: '⚗️',
    tagline: 'The first book was the giveaway.',
    chains: [
      ["Harry Potter and the Philosopher's Stone"],
    ],
  },
  {
    start: 'Poker', target: 'American frontier',
    startEmoji: '🃏', targetEmoji: '🤠',
    tagline: 'Know when to hold em.',
    chains: [
      ['Gambling in the United States', 'United States'],
      ['American Revolutionary War', 'United States'],
    ],
  },
  {
    start: 'Godzilla', target: 'Nuclear weapon',
    startEmoji: '🦖', targetEmoji: '☢️',
    tagline: 'The metaphor was never subtle.',
    chains: [
      ['Atomic bombings of Hiroshima and Nagasaki'],
    ],
  },
  {
    start: 'TikTok', target: 'Confucius',
    startEmoji: '📱', targetEmoji: '📜',
    tagline: 'For You Page, meet the OG influencer.',
    chains: [
      ['Mainland China', 'China', 'Confucianism'],
      ['ByteDance', 'Beijing', 'China', 'Confucianism'],
    ],
  },
  {
    start: 'Rubber duck', target: 'World War II',
    startEmoji: '🐤', targetEmoji: '🪖',
    tagline: 'Squeaky clean history.',
    chains: [
      ['Goodyear Tire and Rubber Company'],
      ['Vulcanized rubber', 'Natural rubber'],
      ['Firestone Tire and Rubber Company'],
    ],
  },
  {
    start: 'Karaoke', target: 'Genghis Khan',
    startEmoji: '🎤', targetEmoji: '🏹',
    tagline: 'Conquer the mic. Then Asia.',
    chains: [
      ['Japan', 'Mongolia'],
      ['Japan', 'Mongol invasions of Japan', 'Kublai Khan'],
      ['Japan', 'China', 'Mongolia'],
    ],
  },
  {
    start: 'Pizza', target: 'Albert Einstein',
    startEmoji: '🍕', targetEmoji: '🧠',
    tagline: 'Genius has a thin crust.',
    chains: [
      ['Italy', 'Galileo Galilei'],
      ['Italy', 'Enrico Fermi'],
      ['Naples', 'Italy', 'Galileo Galilei'],
    ],
  },
  {
    start: 'Chess', target: 'Cold War',
    startEmoji: '♟️', targetEmoji: '🧊',
    tagline: 'The board was never just a board.',
    chains: [
      ['Soviet Union'],
      ['India', 'British Empire', 'Soviet Union'],
    ],
  },
  {
    start: 'Coffee', target: 'Age of Enlightenment',
    startEmoji: '☕', targetEmoji: '💡',
    tagline: 'Caffeine invented philosophy. Basically.',
    chains: [
      ['Coffeehouse'],
      ['Coffeehouse', 'Salon (gathering)'],
    ],
  },
  {
    start: 'Bigfoot', target: 'Charles Darwin',
    startEmoji: '🦶', targetEmoji: '🧬',
    tagline: 'One of them has evidence.',
    chains: [
      ['Ape', 'Evolution'],
      ['Primate', 'Evolution'],
      ['Ape', 'Human evolution', 'Evolution'],
    ],
  },
  {
    start: 'Mount Everest', target: 'New Zealand',
    startEmoji: '🏔️', targetEmoji: '🥝',
    tagline: 'The summit has a Kiwi accent.',
    chains: [
      ['Edmund Hillary'],
      ['Edmund Hillary', 'Auckland'],
    ],
  },
  {
    start: 'Fortune cookie', target: 'Golden Gate Bridge',
    startEmoji: '🥠', targetEmoji: '🌉',
    tagline: 'Your fortune: a bridge.',
    chains: [
      ['San Francisco'],
      ['California', 'San Francisco'],
    ],
  },
  {
    start: 'Espresso', target: 'Ferrari',
    startEmoji: '☕', targetEmoji: '🏎️',
    tagline: 'Two Italian ways to raise your heart rate.',
    chains: [
      ['Italy'],
      ['Milan', 'Italy'],
    ],
  },
  {
    start: 'Netflix', target: 'Great Depression',
    startEmoji: '📺', targetEmoji: '📉',
    tagline: 'From binge to breadlines.',
    chains: [
      ['United States', 'Great Depression in the United States'],
    ],
  },
  {
    start: 'Hot dog', target: 'Ancient Rome',
    startEmoji: '🌭', targetEmoji: '🏛️',
    tagline: 'Glizzy, but make it imperial.',
    chains: [
      ['Sausage'],
      ['Sausage', 'Roman Empire'],
    ],
  },
  {
    start: 'Flamingo', target: 'Chemistry',
    startEmoji: '🦩', targetEmoji: '🧪',
    tagline: 'Pink is a chemical reaction.',
    chains: [
      ['Carotenoid', 'Phytochemistry'],
      ['Beta-Carotene', 'Carotenoid', 'Phytochemistry'],
    ],
  },
  {
    start: 'Ketchup', target: 'Traditional Chinese medicine',
    startEmoji: '🍅', targetEmoji: '🌿',
    tagline: 'The condiment immigrated.',
    chains: [
      ['China'],
      ['Fish sauce', 'China'],
      ['Tomato', 'China'],
    ],
  },
  {
    start: 'Cheese', target: 'Moon',
    startEmoji: '🧀', targetEmoji: '🌕',
    tagline: 'Settle it once and for all.',
    chains: [
      ['Milk', 'Cattle', 'Earth'],
      ['Milk', 'Vitamin D', 'Sunlight', 'Sun'],
      ['Salt', 'Seawater', 'Tide'],
      ['Milk', 'Lactose', 'Earth'],
    ],
  },
  {
    start: 'Velociraptor', target: 'Beyoncé',
    startEmoji: '🦖', targetEmoji: '👑',
    tagline: 'Prehistoric to iconic.',
    chains: [
      ['Jurassic Park (film)', 'John Williams', 'Grammy Award'],
      ['Jurassic Park (film)', 'Academy Awards', 'Grammy Award'],
    ],
  },
  {
    start: 'Olympic Games', target: 'Breakdancing',
    startEmoji: '🥇', targetEmoji: '🕺',
    tagline: 'Yes, it counted.',
    chains: [
      ['2024 Summer Olympics'],
      ['Paris', '2024 Summer Olympics'],
    ],
  },
  {
    start: 'Champagne', target: 'James Bond',
    startEmoji: '🍾', targetEmoji: '🔫',
    tagline: 'Shaken, not spilled.',
    chains: [
      ['Bollinger'],
      ['France', 'United Kingdom', 'Ian Fleming'],
    ],
  },

  // --- generated + adversarially reviewed batch (Claude-only), 97 candidates ---
  {
    "start": "Rickrolling",
    "target": "Kurt Cobain",
    "startEmoji": "😏",
    "targetEmoji": "🎸",
    "tagline": "This prank song mosh-pits its way straight into Nirvana.",
    "chains": [
      [
        "Rick Astley",
        "Foo Fighters"
      ],
      [
        "Rick Astley",
        "Dave Grohl"
      ],
      [
        "Rick Astley",
        "Glastonbury Festival",
        "Foo Fighters"
      ]
    ]
  },
  {
    "start": "Nyan Cat",
    "target": "Beeple",
    "startEmoji": "🌈",
    "targetEmoji": "🖼️",
    "tagline": "Same NFT gold rush: a pixel cat and a $69M artist.",
    "chains": [
      [
        "Non-fungible token"
      ],
      [
        "Non-fungible token",
        "Christie's"
      ],
      [
        "Ethereum",
        "Non-fungible token"
      ]
    ]
  },
  {
    "start": "Damn Daniel",
    "target": "Blink-182",
    "startEmoji": "👟",
    "targetEmoji": "🥁",
    "tagline": "Those white Vans somehow mosh into pop-punk history.",
    "chains": [
      [
        "Vans",
        "Vans Warped Tour"
      ],
      [
        "Vans Warped Tour"
      ],
      [
        "Vans",
        "Warped Tour"
      ]
    ]
  },
  {
    "start": "Gangnam Style",
    "target": "Integer overflow",
    "startEmoji": "🕺",
    "targetEmoji": "💻",
    "tagline": "This K-pop dance literally broke YouTube's view counter.",
    "chains": [
      [
        "YouTube"
      ],
      [
        "YouTube",
        "32-bit computing"
      ],
      [
        "32-bit computing"
      ]
    ]
  },
  {
    "start": "Chuck Norris facts",
    "target": "Mike Huckabee",
    "startEmoji": "🥋",
    "targetEmoji": "🗳️",
    "tagline": "The internet's toughest meme endorsed a presidential run.",
    "chains": [
      [
        "Chuck Norris"
      ],
      [
        "Chuck Norris",
        "2008 Republican Party presidential primaries"
      ],
      [
        "Chuck Norris",
        "Mike Huckabee 2008 presidential campaign"
      ]
    ]
  },
  {
    "start": "Bed Intruder Song",
    "target": "Cher",
    "startEmoji": "🛏️",
    "targetEmoji": "🎤",
    "tagline": "A viral meme and Cher share the same studio trick.",
    "chains": [
      [
        "Auto-Tune"
      ],
      [
        "The Gregory Brothers",
        "Auto-Tune"
      ],
      [
        "Antoine Dodson",
        "Auto-Tune"
      ]
    ]
  },
  {
    "start": "Super Soaker",
    "target": "Galileo (spacecraft)",
    "startEmoji": "💦",
    "targetEmoji": "🛰️",
    "tagline": "The squirt-gun inventor once helped explore Jupiter.",
    "chains": [
      [
        "Lonnie Johnson (inventor)"
      ],
      [
        "Lonnie Johnson"
      ],
      [
        "Lonnie Johnson (inventor)",
        "NASA"
      ]
    ]
  },
  {
    "start": "Smoke detector",
    "target": "Americium",
    "startEmoji": "🚨",
    "targetEmoji": "☢️",
    "tagline": "Your ceiling alarm is secretly radioactive.",
    "chains": [
      [
        "Ionization smoke detector"
      ],
      [
        "Alpha particle"
      ],
      [
        "Ionization smoke detector",
        "Radioactive decay"
      ]
    ]
  },
  {
    "start": "Teflon",
    "target": "Manhattan Project",
    "startEmoji": "🍳",
    "targetEmoji": "💣",
    "tagline": "Your nonstick pan helped enrich uranium in secret.",
    "chains": [
      [
        "Gaseous diffusion"
      ],
      [
        "Uranium hexafluoride"
      ],
      [
        "Uranium enrichment"
      ]
    ]
  },
  {
    "start": "Slinky",
    "target": "Weightlessness",
    "startEmoji": "🌀",
    "targetEmoji": "🧑‍🚀",
    "tagline": "Astronauts flew a Slinky to space, but it wouldn't slink.",
    "chains": [
      [
        "STS-51-D"
      ],
      [
        "Space Shuttle Discovery"
      ],
      [
        "Space Shuttle Discovery",
        "STS-51-D"
      ]
    ]
  },
  {
    "start": "Aluminium foil",
    "target": "Washington Monument",
    "startEmoji": "🧻",
    "targetEmoji": "🏛️",
    "tagline": "This kitchen foil was once pricier than gold.",
    "chains": [
      [
        "Aluminium"
      ],
      [
        "Aluminium",
        "Hall–Héroult process"
      ],
      [
        "Aluminium",
        "Alcoa"
      ]
    ]
  },
  {
    "start": "Monopoly (game)",
    "target": "MI9",
    "startEmoji": "🎩",
    "targetEmoji": "🕵️",
    "tagline": "This family board game smuggled real escape maps to POWs.",
    "chains": [
      [
        "Christopher Clayton Hutton"
      ],
      [
        "Waddingtons"
      ],
      [
        "Waddingtons",
        "Christopher Clayton Hutton"
      ]
    ]
  },
  {
    "start": "M&M's",
    "target": "Spanish Civil War",
    "startEmoji": "🍬",
    "targetEmoji": "🇪🇸",
    "tagline": "Soldiers' melt-proof wartime chocolate hack became the M&M's shell.",
    "chains": [
      [
        "Forrest Mars"
      ],
      [
        "Forrest Mars Sr."
      ],
      [
        "Mars, Incorporated",
        "Forrest Mars"
      ]
    ]
  },
  {
    "start": "Coca-Cola",
    "target": "Nazi Germany",
    "startEmoji": "🥤",
    "targetEmoji": "🪖",
    "tagline": "Its sister soda was invented to dodge a trade embargo.",
    "chains": [
      [
        "Fanta"
      ],
      [
        "Fanta",
        "Max Keith"
      ],
      [
        "The Coca-Cola Company",
        "Fanta"
      ]
    ]
  },
  {
    "start": "Balloon",
    "target": "Siege of Paris (1870–1871)",
    "startEmoji": "🎈",
    "targetEmoji": "🗼",
    "tagline": "Besieged Parisians floated over enemy lines in these.",
    "chains": [
      [
        "Balloon mail"
      ],
      [
        "Hot air balloon",
        "Balloon mail"
      ],
      [
        "Gas balloon",
        "Balloon mail"
      ]
    ]
  },
  {
    "start": "Yellow ribbon",
    "target": "Iran hostage crisis",
    "startEmoji": "🎗️",
    "targetEmoji": "🇮🇷",
    "tagline": "A pop song turned into a hostage-crisis symbol overnight.",
    "chains": [
      [
        "Tie a Yellow Ribbon Round the Ole Oak Tree"
      ],
      [
        "Penne Laingen"
      ],
      [
        "Bruce Laingen"
      ]
    ]
  },
  {
    "start": "Ouija board",
    "target": "American Civil War",
    "startEmoji": "🔮",
    "targetEmoji": "⚔️",
    "tagline": "A war's staggering death toll fueled this spooky toy's rise.",
    "chains": [
      [
        "Spiritualism (movement)"
      ],
      [
        "Spiritualism"
      ],
      [
        "Fox sisters",
        "Spiritualism (movement)"
      ]
    ]
  },
  {
    "start": "Poinsettia",
    "target": "Nullification Crisis",
    "startEmoji": "🌺",
    "targetEmoji": "🏛️",
    "tagline": "This Christmas flower's namesake helped crush a states'-rights revolt.",
    "chains": [
      [
        "Joel Roberts Poinsett"
      ],
      [
        "Joel Roberts Poinsett",
        "Secretary of War"
      ],
      [
        "Joel Roberts Poinsett",
        "Nullifier Party"
      ]
    ]
  },
  {
    "start": "Panama hat",
    "target": "Spanish–American War",
    "startEmoji": "🎩",
    "targetEmoji": "⚓",
    "tagline": "This hat's fame rode in on a war hero's reputation.",
    "chains": [
      [
        "Theodore Roosevelt"
      ],
      [
        "Theodore Roosevelt",
        "Rough Riders"
      ],
      [
        "Panama Canal",
        "Theodore Roosevelt"
      ]
    ]
  },
  {
    "start": "McDonald's",
    "target": "Kosovo War",
    "startEmoji": "🍟",
    "targetEmoji": "🕊️",
    "tagline": "The burger-peace theory survived every war except this one.",
    "chains": [
      [
        "Golden Arches Theory of Conflict Prevention"
      ],
      [
        "Thomas Friedman",
        "Golden Arches Theory of Conflict Prevention"
      ],
      [
        "Golden Arches Theory of Conflict Prevention",
        "NATO bombing of Yugoslavia"
      ]
    ]
  },
  {
    "start": "Twinkie",
    "target": "Harvey Milk",
    "startEmoji": "🧁",
    "targetEmoji": "🏳️‍🌈",
    "tagline": "The snack cake that became a legal defense for murder.",
    "chains": [
      [
        "Twinkie defense",
        "Dan White"
      ],
      [
        "Dan White"
      ],
      [
        "Twinkie defense",
        "Assassination of George Moscone and Harvey Milk"
      ]
    ]
  },
  {
    "start": "Chewing gum",
    "target": "Antonio López de Santa Anna",
    "startEmoji": "🍬",
    "targetEmoji": "🎖️",
    "tagline": "The general who lost Texas helped invent your gum.",
    "chains": [
      [
        "Chicle"
      ],
      [
        "Chicle",
        "Thomas Adams (inventor)"
      ],
      [
        "Chicle",
        "Thomas Adams (businessman)"
      ]
    ]
  },
  {
    "start": "Instant noodles",
    "target": "International Space Station",
    "startEmoji": "🍜",
    "targetEmoji": "🛰️",
    "tagline": "Instant noodles re-engineered so they won't float away in space.",
    "chains": [
      [
        "Momofuku Ando",
        "Soichi Noguchi"
      ],
      [
        "Nissin Foods",
        "Soichi Noguchi"
      ],
      [
        "Momofuku Ando",
        "STS-114"
      ]
    ]
  },
  {
    "start": "Nutmeg",
    "target": "New York City",
    "startEmoji": "🌰",
    "targetEmoji": "🗽",
    "tagline": "The spice the Dutch traded straight-up for Manhattan island.",
    "chains": [
      [
        "Run (island)",
        "Treaty of Breda (1667)"
      ],
      [
        "Banda Islands",
        "Treaty of Breda (1667)"
      ],
      [
        "Run (island)",
        "New Amsterdam"
      ]
    ]
  },
  {
    "start": "Spam (food)",
    "target": "Nikita Khrushchev",
    "startEmoji": "🥫",
    "targetEmoji": "👞",
    "tagline": "The canned meat Khrushchev credited with winning World War II.",
    "chains": [
      [
        "Lend-Lease"
      ],
      [
        "World War II",
        "Lend-Lease"
      ],
      [
        "World War II",
        "Soviet Union"
      ]
    ]
  },
  {
    "start": "Root beer",
    "target": "MDMA",
    "startEmoji": "🛢️",
    "targetEmoji": "💊",
    "tagline": "Same root: one flavors soda, one makes ecstasy.",
    "chains": [
      [
        "Sassafras",
        "Safrole"
      ],
      [
        "Safrole"
      ],
      [
        "Sassafras albidum",
        "Safrole"
      ]
    ]
  },
  {
    "start": "Pineapple",
    "target": "Sanford B. Dole",
    "startEmoji": "🍍",
    "targetEmoji": "👑",
    "tagline": "The fruit company whose founder's cousin toppled a kingdom.",
    "chains": [
      [
        "James Dole"
      ],
      [
        "Dole Food Company",
        "James Dole"
      ],
      [
        "Hawaiian Pineapple Company",
        "James Dole"
      ]
    ]
  },
  {
    "start": "Wendy's",
    "target": "Peter Pan",
    "startEmoji": "🍔",
    "targetEmoji": "🧚",
    "tagline": "A Scottish playwright invented the name behind your cheeseburger.",
    "chains": [
      [
        "Wendy (given name)"
      ],
      [
        "Wendy Thomas",
        "Wendy (given name)"
      ],
      [
        "J. M. Barrie"
      ]
    ]
  },
  {
    "start": "Winnie the Pooh",
    "target": "World War I",
    "startEmoji": "🐻",
    "targetEmoji": "🎖️",
    "tagline": "The real Pooh Bear shipped out with the Canadian army.",
    "chains": [
      [
        "Winnie (bear)",
        "Harry Colebourn"
      ],
      [
        "Winnie (bear)"
      ],
      [
        "A. A. Milne"
      ]
    ]
  },
  {
    "start": "The Wizard of Oz",
    "target": "Free Silver",
    "startEmoji": "🌪️",
    "targetEmoji": "💵",
    "tagline": "Dorothy's silver slippers were secretly 1890s currency propaganda.",
    "chains": [
      [
        "The Wonderful Wizard of Oz"
      ],
      [
        "The Wonderful Wizard of Oz",
        "Populist Party"
      ],
      [
        "L. Frank Baum"
      ]
    ]
  },
  {
    "start": "Chupa Chups",
    "target": "Salvador Dalí",
    "startEmoji": "🍭",
    "targetEmoji": "🎨",
    "tagline": "A surrealist master doodled this lollipop's logo on a napkin.",
    "chains": [
      [],
      [
        "Surrealism"
      ],
      [
        "Logo"
      ]
    ]
  },
  {
    "start": "Peter Rabbit",
    "target": "Mycology",
    "startEmoji": "🐰",
    "targetEmoji": "🍄",
    "tagline": "Peter Rabbit's creator moonlighted as a serious mycologist.",
    "chains": [
      [
        "Beatrix Potter"
      ],
      [
        "Beatrix Potter",
        "Fungus"
      ]
    ]
  },
  {
    "start": "Statue of Liberty",
    "target": "Suez Canal",
    "startEmoji": "🗽",
    "targetEmoji": "🚢",
    "tagline": "Lady Liberty's first draft: a lighthouse for Egypt's canal.",
    "chains": [
      [
        "Frédéric Auguste Bartholdi"
      ],
      [
        "Frédéric Auguste Bartholdi",
        "Egypt"
      ],
      [
        "Frédéric Auguste Bartholdi",
        "Ismail Pasha"
      ]
    ]
  },
  {
    "start": "Dungeons & Dragons",
    "target": "The Hobbit",
    "startEmoji": "🎲",
    "targetEmoji": "📖",
    "tagline": "A copyright fight over hobbits reshaped fantasy gaming forever.",
    "chains": [
      [
        "Halfling"
      ],
      [
        "Halfling",
        "Tolkien Estate"
      ],
      [
        "Race (Dungeons & Dragons)",
        "Halfling"
      ]
    ]
  },
  {
    "start": "Sitar",
    "target": "Live Aid",
    "startEmoji": "🎻",
    "targetEmoji": "🌍",
    "tagline": "Meet the instrument that invented the celebrity benefit concert.",
    "chains": [
      [
        "Ravi Shankar",
        "The Concert for Bangladesh"
      ],
      [
        "Ravi Shankar",
        "The Concert for Bangladesh (album)"
      ],
      [
        "Ravi Shankar",
        "George Harrison",
        "The Concert for Bangladesh"
      ]
    ]
  },
  {
    "start": "Vocoder",
    "target": "Winston Churchill",
    "startEmoji": "🎙️",
    "targetEmoji": "🎩",
    "tagline": "This voice-warping effect once kept Churchill's transatlantic calls secret.",
    "chains": [
      [
        "SIGSALY"
      ],
      [
        "Bell Labs",
        "SIGSALY"
      ],
      [
        "Homer Dudley",
        "SIGSALY"
      ]
    ]
  },
  {
    "start": "Theremin",
    "target": "The Thing (listening device)",
    "startEmoji": "👻",
    "targetEmoji": "🕵️",
    "tagline": "The eerie instrument's inventor also bugged the US embassy.",
    "chains": [
      [
        "Leon Theremin"
      ],
      [
        "Leon Theremin",
        "Soviet Union"
      ]
    ]
  },
  {
    "start": "Metronome",
    "target": "Amazon Mechanical Turk",
    "startEmoji": "⏱️",
    "targetEmoji": "🤖",
    "tagline": "Your metronome's patent-holder also toured a fake chess robot.",
    "chains": [
      [
        "Johann Nepomuk Maelzel",
        "Mechanical Turk"
      ],
      [
        "Johann Nepomuk Maelzel",
        "The Turk"
      ],
      [
        "Johann Nepomuk Maelzel"
      ]
    ]
  },
  {
    "start": "Hip hop",
    "target": "Robert Moses",
    "startEmoji": "🎤",
    "targetEmoji": "🛣️",
    "tagline": "One planner's Bronx highway accidentally birthed a genre.",
    "chains": [
      [
        "Cross Bronx Expressway"
      ],
      [
        "The Bronx",
        "Cross Bronx Expressway"
      ],
      [
        "South Bronx",
        "Cross Bronx Expressway"
      ]
    ]
  },
  {
    "start": "Ukulele",
    "target": "Cristiano Ronaldo",
    "startEmoji": "🌺",
    "targetEmoji": "⚽",
    "tagline": "The 'Hawaiian' ukulele's true birthplace also raised a soccer legend.",
    "chains": [
      [
        "Madeira",
        "Funchal"
      ],
      [
        "Machete (musical instrument)",
        "Madeira",
        "Funchal"
      ],
      [
        "Madeira"
      ]
    ]
  },
  {
    "start": "Glass harmonica",
    "target": "Animal magnetism",
    "startEmoji": "🥂",
    "targetEmoji": "🌀",
    "tagline": "Ben Franklin's eerie glass instrument became hypnosis's official soundtrack.",
    "chains": [
      [
        "Franz Mesmer"
      ],
      [
        "Benjamin Franklin",
        "Franz Mesmer"
      ]
    ]
  },
  {
    "start": "Air guitar",
    "target": "Finland",
    "startEmoji": "🤘",
    "targetEmoji": "🇫🇮",
    "tagline": "Air guitar has a real world championship — held in Finland.",
    "chains": [
      [
        "Air Guitar World Championships"
      ],
      [
        "Air Guitar World Championships",
        "Oulu"
      ]
    ]
  },
  {
    "start": "Electric guitar",
    "target": "Bing Crosby",
    "startEmoji": "🎸",
    "targetEmoji": "🎙️",
    "tagline": "A crooner's cash funded rock's favorite studio trick.",
    "chains": [
      [
        "Les Paul"
      ],
      [
        "Les Paul",
        "Ampex"
      ]
    ]
  },
  {
    "start": "Disco",
    "target": "Chicago White Sox",
    "startEmoji": "🕺",
    "targetEmoji": "⚾",
    "tagline": "Blowing up disco records got a baseball game forfeited.",
    "chains": [
      [
        "Disco Demolition Night"
      ],
      [
        "Disco Demolition Night",
        "Comiskey Park"
      ]
    ]
  },
  {
    "start": "Curling",
    "target": "Ailsa Craig",
    "startEmoji": "🥌",
    "targetEmoji": "🏝️",
    "tagline": "One tiny Scottish island supplies almost every curling stone.",
    "chains": [
      [
        "Curling stone"
      ],
      [
        "Granite"
      ],
      [
        "Curling stone",
        "Granite"
      ]
    ]
  },
  {
    "start": "Rock Paper Scissors",
    "target": "Christie's",
    "startEmoji": "✂️",
    "targetEmoji": "🔨",
    "tagline": "A schoolyard game once decided a $20 million art auction.",
    "chains": [
      [
        "Takashi Hashiyama"
      ],
      [
        "Maspro Denkoh"
      ]
    ]
  },
  {
    "start": "Jenga",
    "target": "Kenya",
    "startEmoji": "🧱",
    "targetEmoji": "🇰🇪",
    "tagline": "Test tagline.",
    "chains": [
      [
        "Leslie Scott"
      ],
      [
        "Swahili language"
      ],
      [
        "Leslie Scott",
        "Swahili language"
      ]
    ]
  },
  {
    "start": "Darts",
    "target": "Anne Boleyn",
    "startEmoji": "🎯",
    "targetEmoji": "👑",
    "tagline": "A pub game with a surprisingly deadly royal backstory.",
    "chains": [
      [
        "Henry VIII"
      ],
      [
        "Patrick Chaplin",
        "Henry VIII"
      ]
    ]
  },
  {
    "start": "Risk (game)",
    "target": "The Red Balloon",
    "startEmoji": "🌍",
    "targetEmoji": "🎈",
    "tagline": "World domination was dreamed up by a balloon filmmaker.",
    "chains": [
      [
        "Albert Lamorisse"
      ],
      [
        "Albert Lamorisse",
        "Palme d'Or"
      ]
    ]
  },
  {
    "start": "Speedrunning",
    "target": "Doctors Without Borders",
    "startEmoji": "⏱️",
    "targetEmoji": "🩺",
    "tagline": "Speedrun marathons once funded real-life doctors.",
    "chains": [
      [
        "Games Done Quick"
      ],
      [
        "Games Done Quick",
        "Summer Games Done Quick"
      ]
    ]
  },
  {
    "start": "Sumo",
    "target": "Mongolia",
    "startEmoji": "🤼",
    "targetEmoji": "🇲🇳",
    "tagline": "Mongolia quietly conquered Japan's most sacred sport.",
    "chains": [
      [
        "Hakuhō Shō"
      ],
      [
        "Asashōryū"
      ],
      [
        "Yokozuna",
        "Hakuhō Shō"
      ]
    ]
  },
  {
    "start": "Marathon",
    "target": "Windsor Castle",
    "startEmoji": "🏃",
    "targetEmoji": "🏰",
    "tagline": "26.2 miles exist because of a royal nursery window.",
    "chains": [
      [
        "1908 Summer Olympics"
      ],
      [
        "1908 Summer Olympics",
        "Edward VII"
      ]
    ]
  },
  {
    "start": "Nike, Inc.",
    "target": "Styx",
    "startEmoji": "👟",
    "targetEmoji": "🌊",
    "tagline": "Just Do It is named after a death river's daughter.",
    "chains": [
      [
        "Nike (mythology)"
      ],
      [
        "Nike (mythology)",
        "Zeus"
      ]
    ]
  },
  {
    "start": "Santa Claus",
    "target": "Sleipnir",
    "startEmoji": "🎅",
    "targetEmoji": "🐎",
    "tagline": "Santa's reindeer may descend from Odin's eight-legged horse.",
    "chains": [
      [
        "Odin"
      ],
      [
        "Wild Hunt"
      ]
    ]
  },
  {
    "start": "Friday the 13th",
    "target": "Baldr",
    "startEmoji": "😨",
    "targetEmoji": "☀️",
    "tagline": "Friday the 13th's curse started at a Norse dinner party.",
    "chains": [
      [
        "Loki"
      ],
      [
        "Norse mythology"
      ]
    ]
  },
  {
    "start": "Dice",
    "target": "Mahabharata",
    "startEmoji": "🎲",
    "targetEmoji": "📜",
    "tagline": "A single dice game gambled away an epic's entire kingdom.",
    "chains": [
      [
        "Board game",
        "Pachisi"
      ],
      [
        "Board game",
        "Chaupar"
      ]
    ]
  },
  {
    "start": "Statue of Liberty",
    "target": "Panama Canal",
    "startEmoji": "🗽",
    "targetEmoji": "🚢",
    "tagline": "Her framework's engineer got tangled in a canal fraud scandal.",
    "chains": [
      [
        "Gustave Eiffel"
      ],
      [
        "Gustave Eiffel",
        "Panama scandals"
      ]
    ]
  },
  {
    "start": "Machu Picchu",
    "target": "Yale University",
    "startEmoji": "🏔️",
    "targetEmoji": "🎓",
    "tagline": "The 'lost city' sparked an Ivy League ownership battle.",
    "chains": [
      [
        "Hiram Bingham III"
      ],
      [
        "Hiram Bingham III",
        "Yale Peruvian Expedition"
      ]
    ]
  },
  {
    "start": "Leaning Tower of Pisa",
    "target": "Jupiter",
    "startEmoji": "🗼",
    "targetEmoji": "🪐",
    "tagline": "A leaning tower with a direct line to Jupiter.",
    "chains": [
      [
        "Galileo Galilei"
      ],
      [
        "Galileo Galilei",
        "Galilean moons"
      ],
      [
        "Galileo Galilei",
        "Galileo (spacecraft)"
      ]
    ]
  },
  {
    "start": "Bermuda Triangle",
    "target": "Close Encounters of the Third Kind",
    "startEmoji": "🔺",
    "targetEmoji": "🛸",
    "tagline": "A doomed Navy squadron flew straight into a Spielberg film.",
    "chains": [
      [
        "Flight 19"
      ],
      [
        "Flight 19",
        "Steven Spielberg"
      ]
    ]
  },
  {
    "start": "Great Wall of China",
    "target": "Shenzhou 5",
    "startEmoji": "🧱",
    "targetEmoji": "🛰️",
    "tagline": "One astronaut's word busted the wall's 'visible from space' myth.",
    "chains": [
      [
        "Yang Liwei"
      ],
      [
        "Yang Liwei",
        "China National Space Administration"
      ]
    ]
  },
  {
    "start": "Antarctica",
    "target": "Mars",
    "startEmoji": "🐧",
    "targetEmoji": "🔴",
    "tagline": "Earth's best junkyard for rocks from another planet.",
    "chains": [
      [
        "Allan Hills 84001"
      ],
      [
        "ANSMET",
        "Allan Hills 84001"
      ],
      [
        "Meteorite hunting",
        "Allan Hills 84001"
      ]
    ]
  },
  {
    "start": "Healthy Choice",
    "target": "American Airlines",
    "startEmoji": "🍮",
    "targetEmoji": "✈️",
    "tagline": "He bought pudding cups and earned lifetime free flights.",
    "chains": [
      [
        "David Phillips (entrepreneur)",
        "AAdvantage"
      ],
      [
        "David Phillips (pudding)",
        "AAdvantage"
      ]
    ]
  },
  {
    "start": "QR code",
    "target": "Toyota",
    "startEmoji": "📱",
    "targetEmoji": "🚗",
    "tagline": "Invented to track car parts, not restaurant menus.",
    "chains": [
      [
        "Denso Wave"
      ],
      [
        "Denso"
      ],
      [
        "Denso Wave",
        "Denso"
      ]
    ]
  },
  {
    "start": "Super Glue",
    "target": "Vietnam War",
    "startEmoji": "🧴",
    "targetEmoji": "🪖",
    "tagline": "The stuff that glues your fingers once sealed soldiers' wounds.",
    "chains": [
      [
        "Cyanoacrylate"
      ],
      [
        "Adhesive"
      ],
      [
        "Cyanoacrylate",
        "Combat medic"
      ]
    ]
  },
  {
    "start": "Barcode",
    "target": "Samuel Morse",
    "startEmoji": "📊",
    "targetEmoji": "📡",
    "tagline": "A barcode is just Morse code stretched into stripes.",
    "chains": [
      [
        "Morse code"
      ],
      [
        "Morse code",
        "Telegraphy"
      ]
    ]
  },
  {
    "start": "Rubik's Cube",
    "target": "Cryptography",
    "startEmoji": "🧩",
    "targetEmoji": "🔐",
    "tagline": "Group theory scrambles your cube and guards your texts.",
    "chains": [
      [
        "Group theory"
      ],
      [
        "Group theory",
        "Number theory"
      ],
      [
        "Permutation group"
      ]
    ]
  },
  {
    "start": "Bubble Wrap",
    "target": "IBM",
    "startEmoji": "🫧",
    "targetEmoji": "💻",
    "tagline": "It was invented as wallpaper before wrapping IBM's 1401 computers.",
    "chains": [
      [
        "Sealed Air"
      ],
      [
        "IBM 1401"
      ],
      [
        "Sealed Air",
        "IBM 1401"
      ]
    ]
  },
  {
    "start": "Vending machine",
    "target": "Aeolipile",
    "startEmoji": "🥤",
    "targetEmoji": "⚙️",
    "tagline": "Ancient Greece invented vending machines — and the first steam engine.",
    "chains": [
      [
        "Hero of Alexandria"
      ],
      [
        "Hero of Alexandria",
        "Ancient Greek technology"
      ]
    ]
  },
  {
    "start": "Nintendo",
    "target": "Yakuza",
    "startEmoji": "🎮",
    "targetEmoji": "🀄",
    "tagline": "Before video games, Nintendo printed cards for Japan's gamblers.",
    "chains": [
      [
        "Hanafuda"
      ],
      [
        "Hanafuda",
        "Japanese playing cards"
      ],
      [
        "Karuta"
      ]
    ]
  },
  {
    "start": "Robot",
    "target": "Serfdom",
    "startEmoji": "🤖",
    "targetEmoji": "⛓️",
    "tagline": "\"Robot\" literally means serf labor in Czech.",
    "chains": [
      [
        "R.U.R."
      ],
      [
        "R.U.R.",
        "Forced labour"
      ],
      [
        "Karel Čapek",
        "R.U.R."
      ]
    ]
  },
  {
    "start": "Sandwich",
    "target": "Hawaii",
    "startEmoji": "🥪",
    "targetEmoji": "🌺",
    "tagline": "Your sandwich and Hawaii share the same namesake.",
    "chains": [
      [
        "John Montagu, 4th Earl of Sandwich"
      ],
      [
        "John Montagu, 4th Earl of Sandwich",
        "James Cook"
      ],
      [
        "Earl of Sandwich"
      ]
    ]
  },
  {
    "start": "Cardigan (sweater)",
    "target": "Crimean War",
    "startEmoji": "🧥",
    "targetEmoji": "⚔️",
    "tagline": "A cozy sweater is named after a doomed cavalry charge.",
    "chains": [
      [
        "James Brudenell, 7th Earl of Cardigan"
      ],
      [
        "James Brudenell, 7th Earl of Cardigan",
        "Charge of the Light Brigade"
      ],
      [
        "James Brudenell, 7th Earl of Cardigan",
        "Battle of Balaclava"
      ]
    ]
  },
  {
    "start": "Silhouette",
    "target": "Seven Years' War",
    "startEmoji": "🌑",
    "targetEmoji": "💣",
    "tagline": "A shadow outline is named after a stingy war treasurer.",
    "chains": [
      [
        "Étienne de Silhouette"
      ],
      [
        "Étienne de Silhouette",
        "Louis XV"
      ]
    ]
  },
  {
    "start": "Leotard",
    "target": "Flying trapeze",
    "startEmoji": "🤸",
    "targetEmoji": "🎪",
    "tagline": "The skintight bodysuit is named after the first trapeze daredevil.",
    "chains": [
      [
        "Jules Léotard"
      ],
      [
        "Jules Léotard",
        "Cirque Napoléon"
      ]
    ]
  },
  {
    "start": "Sideburns",
    "target": "American Civil War",
    "startEmoji": "🧔",
    "targetEmoji": "🎖️",
    "tagline": "Sideburns are a Civil War general's name, split and swapped.",
    "chains": [
      [
        "Ambrose Burnside"
      ],
      [
        "Ambrose Burnside",
        "Union Army"
      ]
    ]
  },
  {
    "start": "Cappuccino",
    "target": "Capuchin monkey",
    "startEmoji": "☕",
    "targetEmoji": "🐒",
    "tagline": "Your cappuccino and a jungle monkey share the same haircut.",
    "chains": [
      [
        "Order of Friars Minor Capuchin"
      ],
      [
        "Capuchin"
      ],
      [
        "Order of Friars Minor Capuchin",
        "New World monkey"
      ]
    ]
  },
  {
    "start": "Jacuzzi",
    "target": "Monoplane",
    "startEmoji": "🛁",
    "targetEmoji": "✈️",
    "tagline": "Before hot tubs, the Jacuzzis were building airplanes.",
    "chains": [
      [
        "Rachele Jacuzzi"
      ],
      [],
      [
        "Jacuzzi family"
      ]
    ]
  },
  {
    "start": "Tardigrade",
    "target": "Israel",
    "startEmoji": "🧫",
    "targetEmoji": "🇮🇱",
    "tagline": "This indestructible creature got stranded on the Moon by this country.",
    "chains": [
      [
        "Beresheet"
      ],
      [
        "Tardigrades on the Moon",
        "Beresheet"
      ],
      [
        "Beresheet",
        "SpaceIL"
      ]
    ]
  },
  {
    "start": "Narwhal",
    "target": "Scotland",
    "startEmoji": "🐋",
    "targetEmoji": "🦄",
    "tagline": "This tusked whale accidentally invented Scotland's national animal.",
    "chains": [
      [
        "Unicorn"
      ],
      [
        "Unicorn",
        "Royal coat of arms of Scotland"
      ]
    ]
  },
  {
    "start": "Axolotl",
    "target": "Venus",
    "startEmoji": "🩷",
    "targetEmoji": "🪐",
    "tagline": "This forever young salamander is secretly named for the god who rules Venus.",
    "chains": [
      [
        "Xolotl",
        "Quetzalcōātl"
      ],
      [
        "Xolotl",
        "Quetzalcoatl"
      ]
    ]
  },
  {
    "start": "Octopus",
    "target": "Spain",
    "startEmoji": "🐙",
    "targetEmoji": "🇪🇸",
    "tagline": "An eight-armed oracle called this country's World Cup win.",
    "chains": [
      [
        "Paul the Octopus",
        "Spain national football team"
      ],
      [
        "Paul the Octopus",
        "2010 FIFA World Cup",
        "Spain national football team"
      ]
    ]
  },
  {
    "start": "Jellyfish",
    "target": "GloFish",
    "startEmoji": "🪼",
    "targetEmoji": "🐠",
    "tagline": "A jellyfish's glow gene lit up pet-store fish tanks.",
    "chains": [
      [
        "Green fluorescent protein"
      ],
      [
        "Aequorea victoria",
        "Green fluorescent protein"
      ],
      [
        "Bioluminescence",
        "Green fluorescent protein"
      ]
    ]
  },
  {
    "start": "Rat",
    "target": "Steve Jobs",
    "startEmoji": "🐀",
    "targetEmoji": "📱",
    "tagline": "This kitchen rat's studio boss also gave us the iPhone.",
    "chains": [
      [
        "Ratatouille (film)",
        "Pixar"
      ],
      [
        "Ratatouille (film)",
        "Pixar Animation Studios"
      ]
    ]
  },
  {
    "start": "Elephant",
    "target": "Table tennis",
    "startEmoji": "🐘",
    "targetEmoji": "🏓",
    "tagline": "Ivory shortage from this giant animal accidentally invented ping-pong balls.",
    "chains": [
      [
        "Ivory",
        "Billiard ball",
        "John Wesley Hyatt",
        "Celluloid"
      ],
      [
        "Elephant ivory",
        "Billiard ball",
        "John Wesley Hyatt",
        "Celluloid"
      ]
    ]
  },
  {
    "start": "Necktie",
    "target": "Thirty Years' War",
    "startEmoji": "👔",
    "targetEmoji": "⚔️",
    "tagline": "Business neckwear was forged in Europe's bloodiest 17th-century war.",
    "chains": [
      [
        "Croats (military unit)"
      ],
      [
        "Cravat (early)"
      ],
      [
        "Croatia"
      ]
    ]
  },
  {
    "start": "Barbie",
    "target": "Bild",
    "startEmoji": "🩷",
    "targetEmoji": "📰",
    "tagline": "America's favorite doll began life as a German tabloid gag.",
    "chains": [
      [],
      [
        "Lilli (comic strip)"
      ],
      [
        "Bild Lilli doll"
      ]
    ]
  },
  {
    "start": "Sunglasses",
    "target": "Greenland",
    "startEmoji": "😎",
    "targetEmoji": "🇬🇱",
    "tagline": "Your shades trace back to Arctic snow goggles, not Hollywood.",
    "chains": [
      [
        "Inuit"
      ],
      [
        "Snow goggles",
        "Inuit"
      ],
      [
        "Inuit clothing",
        "Inuit"
      ]
    ]
  },
  {
    "start": "Bubble Wrap",
    "target": "Ford Model T",
    "startEmoji": "🫧",
    "targetEmoji": "🚗",
    "tagline": "Bubble wrap's big break came packaging 'the Model T of computers.'",
    "chains": [
      [
        "IBM 1401"
      ],
      [
        "IBM",
        "IBM 1401"
      ]
    ]
  },
  {
    "start": "Traffic light",
    "target": "Palace of Westminster",
    "startEmoji": "🚦",
    "targetEmoji": "🏛️",
    "tagline": "The first traffic light exploded right outside Parliament.",
    "chains": [
      [],
      [
        "London"
      ],
      [
        "Railway signal"
      ]
    ]
  },
  {
    "start": "Roomba",
    "target": "PackBot",
    "startEmoji": "🤖",
    "targetEmoji": "💣",
    "tagline": "The same company that vacuums your floor also defuses bombs.",
    "chains": [
      [],
      [
        "iRobot"
      ]
    ]
  },
  {
    "start": "QR code",
    "target": "Denso",
    "startEmoji": "🔳",
    "targetEmoji": "🔧",
    "tagline": "Your restaurant menu's QR code was built to track car parts.",
    "chains": [
      [],
      [
        "Masahiro Hara"
      ]
    ]
  },
  {
    "start": "McDonald's",
    "target": "Walt Disney",
    "startEmoji": "🍔",
    "targetEmoji": "🏰",
    "tagline": "Big Macs and Mickey Mouse share a WWI ambulance ride.",
    "chains": [
      [
        "Ray Kroc"
      ],
      [
        "Disneyland"
      ]
    ]
  },
  {
    "start": "Adidas",
    "target": "1954 FIFA World Cup final",
    "startEmoji": "⚽",
    "targetEmoji": "🏆",
    "tagline": "Screw-in cleats from a shoe brand won a World Cup final.",
    "chains": [
      [
        "Adolf Dassler"
      ],
      [
        "Adolf Dassler",
        "Sepp Herberger"
      ]
    ]
  },
  {
    "start": "Tiffany & Co.",
    "target": "American robin",
    "startEmoji": "💍",
    "targetEmoji": "🥚",
    "tagline": "A luxury jeweler trademarked the color of a bird's egg.",
    "chains": [
      [
        "Tiffany Blue",
        "Robin egg blue"
      ],
      [
        "Tiffany Blue"
      ]
    ]
  },
  {
    "start": "Toblerone",
    "target": "Bear",
    "startEmoji": "🍫",
    "targetEmoji": "🐻",
    "tagline": "That mountain logo is hiding a bear in plain sight.",
    "chains": [
      [
        "Bern",
        "Bärengraben"
      ],
      [
        "Bern",
        "Bear pit"
      ]
    ]
  },
  {
    "start": "Barcode",
    "target": "Morse code",
    "startEmoji": "🏷️",
    "targetEmoji": "📡",
    "tagline": "Barcodes are Morse code wearing a grocery disguise.",
    "chains": [
      [
        "Norman Joseph Woodland"
      ],
      [
        "Universal Product Code",
        "Norman Joseph Woodland"
      ]
    ]
  },
];

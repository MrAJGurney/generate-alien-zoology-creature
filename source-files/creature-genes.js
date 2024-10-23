export const CREATURE_GENES = [
    {
        id: 1,
        name: "Solid",
        description: "A burly bloke with heavy bones! ",
        effect: "The creature has +10 HP.",
        profile: {
            HP: 10
        }
    },
    {
        id: 2,
        name: "Pachyderm",
        description: "A thick skin protects the creature’s body from potential attackers.",
        effect: "The creature has -2 to its DEF value (e.g. DEF6+ becomes DEF4+).",
        profile: {
            DEF: -2
        }
    },
    {
        id: 3,
        name: "Parent animal",
        description: "The creature has offspring that it wants to protect.",
        effect: "Takes the ‘Parental instincts’ Action Card into its deck. It always remains in the deck and cannot be removed during domesticating.",
        actionCard: {
            id: 22,
            name: "Parental instincts",
            canBeRemoved: false
        }
    },
    {
        id: 4,
        name: "Fragile",
        description: "With its flimsy and brittle appearance, the creature gives the impression that it would fall apart at the slightest gust of wind.",
        effect: "The creature has -5HP.",
        profile: {
            HP: -5
        }
    },
    {
        id: 5,
        name: "Beautiful",
        description: "The Expedition Team members freeze in front of the beauty of the creature. It is not easy for them to harm something so beautiful.",
        effect: "All close combat attacks that target the creature receive +1 A value (e.g. A 5+ -> A 6+). All shooting attacks that target the creature receive +1 SHO (e.g. SHO 5+ -> SHO 6+)."
    },
    {
        id: 6,
        name: "Ugly",
        description: "The creature shocks with its abysmally ugly appearance. With its disgusting looks, the creature deters potential attackers.",
        effect: "The creature has -2 NERVE (e.g. NERVE 6+ -> NERVE 4+).",
        profile: {
            NERVE: -2
        }
    },
    {
        id: 7,
        name: "Warning colours",
        description: "The creature wears extremely bright warning colours and patterns that warn of its danger. ",
        effect: "The creature not only attacks all figures it touches or moves over, but also automatically attacks all figures in close combat within 2” of its base."
    },
    {
        id: 8,
        name: "Fluorescent",
        description: "Some parts of the creature's body glow in bright colours. The creature uses it to charm others of its species  during the mating season.",
        effect: "The creature can always be seen at nighttime and twilight without  the line of sight restrictions of these times of day."
    },
    {
        id: 9,
        name: "Fangs and claws",
        description: "With sharp and pointy fangs and claws, the creature can not only cut through the thickest metal, but they also give it a militaristic appearance.",
        effect: "The creature has -2 to its A value (e.g. A 6+ -> A 4+).",
        profile: {
            A: -2
        }
    },
    {
        id: 10,
        name: "Cyclopean",
        description: "This mythical creature is the stuff of legends. It is as huge as a mountain and strides carefree and calmly through the landscape. ",
        effect: "Use a base size of 10-16 cm in diameter.The creature also has +5 HP. The creature can move through terrain (if that’s allowed) without movement restrictions. No terrain piece blocks line of sight from or towards the creature.",
        profile: {
            HP: 5
        }
    },
    {
        id: 11,
        name: "Small",
        description: "A tiny specimen that can quickly run away in case of danger. ",
        effect: "Use a base size with a maximum diameter of 5 cm.The creature has -2 to its ESC value (e.g. ESC 8+ -> ESC 6+). The creature also has -3 HP.",
        profile: {
            ESC: -2,
            HP: -3
        }
    },
    {
        id: 12,
        name: "Hypersensitive senses",
        description: "The creature has hypersensitive senses that allow it to perceive its surroundings particularly attentively.",
        effect: "The creature's 😡 target is always the figure with the highest 😡 value, even if it cannot draw a line of sight to it."
    },
    {
        id: 13,
        name: "Fast",
        description: "Fast as lightning! ",
        effect: "The creature gets +1 to its MOV value.",
        profile: {
            MOV: 1
        }
    },
    {
        id: 14,
        name: "Slow",
        description: "Slow and steady wins the race.",
        effect: "The creature gets -1 to its MOV value.",
        profile: {
            MOV: -1
        }
    },
    {
        id: 15,
        name: "Wings",
        description: "With its powerful wings, the creature flies to the greatest heights. ",
        effect: "The creature adds the ‘Fly’ Action Card to its deck. This cannot be removed later when domesticating.",
        actionCard: {
            id: 10,
            name: "Fly",
            canBeRemoved: false
        }
    },
    {
        id: 16,
        name: "Steadfast",
        description: "The creature displays an incredible stubbornness.",
        effect: "If the creature has more than 1 HP and an attack knocks it out, the creature survives with 1 HP."
    },
    {
        id: 17,
        name: "Agile",
        description: "The creature is extremely agile and more difficult to hit in close combat.",
        effect: "When the creature is a target in close combat, all attackers’ close combat attacks on the creature receive +1 to the attacker's A-value\n(e.g. attacker A 5+ -> A 6+)."
    },
    {
        id: 18,
        name: "Glutton",
        description: "The creature has a healthy appetite!",
        effect: "The creature always starts the game with 4 💩 instead of the normal 3. Whenever the creature makes a random move, it moves towards the nearest 🍖 token (also without line of sight) instead and eats it on base contact. If there is no 🍖 and no 😡 target, it performs a random movement (scatter die)."
    },
    {
        id: 19,
        name: "Intelligent",
        description: "The creature displays an outstandingly intelligent behaviour that differs from the multitude of extraterrestrial fauna. The creature's behaviour appears to be unpredictable…",
        effect: "The creature is played by a second player. The wild creature doesn’t follow the movement rules for alien creatures. It is instead always controlled by the second player. The wild creature does not play its Action Cards randomly from a face-down pile, as is normally the case. The second player takes the creature's Action Cards and chooses an order at the beginning of each round and places them face down in a stack. If there is no second human player, you can also play the creature in this way yourself."
    },
    {
        id: 20,
        name: "Light-sensitive organs",
        description: "With its light-emitting organs, the creature bathes in sun- or moonlight to recharge its batteries.",
        effect: "The creature receives the ‘Photosynthesis’ Action Card. This card can never be removed when domesticating.",
        actionCard: {
            id: 6,
            name: "Photosynthesis",
            canBeRemoved: false
        }
    },
    {
        id: 21,
        name: "Coprophagy",
        description: "The creature has the bad habit of eating its own faeces.",
        effect: "Whenever the creature makes a random move, it moves toward the nearest visible 💩 instead and eats it on base contact (also without line of sight). Remove the 💩. If the next visible 💩 is carried by an Assistant, this is the target of the creature's movement. A close combat attack is made when in base contact."
    },
    {
        id: 22,
        name: "Aggressive",
        description: "You'd better not get too close to this creature or it will completely freak out!",
        effect: "If the creature rolls a natural 10 on an A-test (and the DEF-test of the target fails), the creature makes 2 HP damage instead of one."
    },
    {
        id: 23,
        name: "Strong",
        description: "The creature has an extraordinary power that crushes all armour.",
        effect: "Whenever the creature attacks a target (close combat or ranged), that target gets +1 DEF (e.g. DEF 5+ -> DEF 6+)."
    },
    {
        id: 24,
        name: "Lightweight",
        description: "Light as a feather!",
        effect: "The creature has -3 HP.",
        profile: {
            HP: -3
        }
    },
    {
        id: 25,
        name: "Hard Scales",
        description: "A coat of hard scales covers the creature's body.",
        effect: "The creature never takes more than 3 HP damage from a single attack."
    },
    {
        id: 26,
        name: "Prey animal",
        description: "The creature tastes particularly good and is therefore hunted by other creatures. The creature has adapted to this and runs away quickly when in danger.",
        effect: "The creature receives -1 to its ESC value (e.g. ESC 8+ -> ESC 7+). The creature receives +2 to its NERVE value (e.g. NERVE 6+ -> NERVE 8+). Takes the ‘Timidity’ Action Card into its deck. This can be discarded later during domestication.",
        profile: {
            ESC: -1,
            NERVE: 2
        },
        actionCard: {
            id: 27,
            name: "Timidity",
            canBeRemoved: true
        }
    },
    {
        id: 27,
        name: "Feathers",
        description: "The creature protects itself from cold and heat with a plumage.",
        effect: "The creature has -1 DEF (e.g. DEF 6+ -> DEF 5+).",
        profile: {
            DEF: -1
        }
    },
    {
        id: 28,
        name: "Insectoid",
        description: "The creature's physique has insectoid features. In order to better defend itself, the insectoid creature has learnt a technique that allows it to better hit targets at a distance.",
        effect: "The creature has -2 SHO (e.g. SHO 6+ -> SHO 4+).",
        profile: {
            SHO: -2
        }
    },
    {
        id: 29,
        name: "Extraterrestrial optics",
        description: "The creature has an unusual number of eyes (e.g. zero, one, three or more).",
        effect: "The creature can look up to 5” into forests/high grasslands instead of the normal 3”. However, it can never see completely through forests/high grasslands."
    },
    {
        id: 30,
        name: "Wanderer",
        description: "The creature covers incredible distances on its wanderings with stoic endurance.",
        effect: "If the creature moves over the edge of the gaming board, it does not remain there as usual, but appears on the opposite side.\nDraw a line from the creature across the centre of the gaming board to the other side of the gaming board to determine the point at which the creature reappears. It continues its movement there in the same direction like it moved before."
    },
    {
        id: 31,
        name: "Hexapode",
        description: "Coordinating the many limbs seems to be easy for the creature. It reaches great speeds.",
        effect: "The creature has +2 MOV.",
        profile: {
            MOV: 2
        }
    },
    {
        id: 32,
        name: "Invertebrates",
        description: "The creature has no spine. Its body is slimy and flabby and resembles a slug as found on planet earth. ",
        effect: "The creature has -2 MOV.",
        profile: {
            MOV: -2
        }
    },
    {
        id: 33,
        name: "Predator",
        description: "As a predator, the creature is designed to be as fast and strong as possible in order to take down its prey. Maybe the Expedition Team is the prey now?",
        effect: "The creature has -1 A. The creature has +1 MOV.",
        profile: {
            A: -1,
            MOV: 1
        }
    },
    {
        id: 34,
        name: "Swarm behaviour",
        description: "The creature is a swarm animal and is rarely found alone in the wild.",
        effect: "The creature has -2 NERVE (e.g. NERVE 6+ -> NERVE 4+). Instead of one single creature on a base, use multiple smaller creatures attached to the base. For all purposes gamewise the multiple creatures still count as one creature.",
        profile: {
            NERVE: -2
        }
    },
    {
        id: 35,
        name: "Camouflage",
        description: "The creature has adapted its colour to its surroundings and camouflages itself.",
        effect: "The creature is less vulnerable to  shooting attacks. If the creature is shot at, the shooter has +1 SHO (e.g. SHO5+ -> SHO 6+)."
    },
    {
        id: 36,
        name: "Stinky",
        description: "An indescribably foul-smelling odour emanates from the creature. The odour deters predators from getting too close to the creature.",
        effect: "The creature cannot be attacked in close combat by any figure except the Assistant and other creatures."
    },
    {
        id: 37,
        name: "Hungry",
        description: "The creature has a very voracious appetite.",
        effect: "Every🍖 always has 5 😡 instead of only 2 normally."
    },
    {
        id: 38,
        name: "Longneck",
        description: "With its fabulously long neck, the creature can look far into the distance.",
        effect: "The creature’s line of sight isn’t blocked by any terrain type."
    },
    {
        id: 39,
        name: "Chill",
        description: "The creature observes the action in a relaxed manner without appearing aggressive.",
        effect: "The creature never attacks in close combat. If its base touches a base of any figure while moving, close combats are not carried out."
    },
    {
        id: 40,
        name: "Aquatic Features 🌊",
        description: "The creature originates from the ocean and shows aquatic characteristics.",
        effect: "Whenever the creature subtracts HP from a creature which has the ‘Heat Resistance 🔥’ gene, the amount of HP subtracted is doubled (HP damage x2). The creature has +2 HP (e.g. 10 HP -> 12 HP).",
        profile: {
            HP: 2
        }
    },
    {
        id: 41,
        name: "Heat Resistance 🔥",
        description: "The creature lives in particularly hot habitats and its physique has adapted to these conditions.",
        effect: "Whenever the creature subtracts HP from a creature which has the ‘Plant organism 🌳’ gene, the amount of HP subtracted is doubled (HP damage x2). The creature has -1 A (e.g. A6+ -> A5+).",
        profile: {
            A: -1
        }
    },
    {
        id: 42,
        name: "Plant organism🌳",
        description: "It is not clear at first glance whether it is a creature or a plant species. This is due to the creature's plant-like appearance, which is dotted with tendrils, flowers, leaves and roots.",
        effect: "Whenever the creature subtracts HP from a creature which has the ‘Aquatic Features 🌊’ gene, the amount of HP subtracted is doubled (HP damage x2). The creature has -1 DEF (e.g. DEF 6+ -> DEF 5+).",
        profile: {
            DEF: -1
        }
    },
    {
        id: 43,
        name: "Ethereal👻",
        description: "The creature is translucent  and shimmers in the sunlight. It seems to have come to this world from the depths of the galaxy.",
        effect: "For every single HP the creature loses, roll a D10 afterwards. On a result of 8+, this damage is ignored and the attack passes through the creature."
    },
    {
        id: 44,
        name: "Top dog",
        description: "As the top dog, the creature defends its territory against all non-native species.",
        effect: "The creature always does the double amount of damage (HP damage x2) towards creatures who have an ‘Aquatic Features 🌊’ gene, ‘Plant organism 🌳’ gene or ‘Heat Resistance 🔥’ gene. Note: Cumulative with other factors of (HP damage x2), e.g. if a creature has both ‘Heat Resistance 🔥’ and ‘Top dog’ genes, it deals x4 HP damage against creatures with the ‘Plant organism🌳’ gene (as well as double HP damage against creatures with ‘Aquatic Features 🌊’ gene and ‘Heat Resistance 🔥’ gene)."
    },
    {
        id: 45,
        name: "Frightened temperament",
        description: "The creature has developed a fearful nature in order to survive.",
        effect: "The creature always moves in a direct line away from the 😡 target instead of towards it."
    },
    {
        id: 46,
        name: "Rooted",
        description: "With strong roots anchored in the ground, this stocky creature moves as if in slow motion. ",
        effect: "The creature always has a MOV value of 1 (regardless of any modifiers from other genes). The creature has DEF -2 (e.g. DEF 6+ -> DEF 4+).",
        profile: {
            MOV: 'SET_TO_ONE',
            DEF: -2
        }
    },
    {
        id: 47,
        name: "Nocturnal🌑",
        description: "The creature uses the cover of darkness to go hunting. It has adapted its senses to the conditions of the night.",
        effect: "The creature can see an unlimited distance at nighttime and twilight, unless a terrain piece obstructs the line of sight. The creature never sleeps at night. Instead, the creature sleeps during the day. During daytime hunts, the creature does not move and remains in place until it receives the first HP damage. It then wakes up and acts normally."
    },
    {
        id: 48,
        name: "Tentacles",
        description: "With slippery tentacles, the creature grabs anything that moves and pulls the target towards it.",
        effect: "Whenever the creature has an 😡 target, it does not move, but moves the 😡 target towards itself. The MOV value of the 😡 target is used for this, not that of the creature."
    },
    {
        id: 49,
        name: "Floating state",
        description: "The creature is a floating organism that manoeuvres eerily through the air.",
        effect: "The creature is never affected by movement restrictions due to terrain pieces and can always move through them normally (if movement through them is possible)"
    },
    {
        id: 50,
        name: "Rare✨",
        description: "The creature is particularly rare✨ and a wonderful specimen in the collection! Its coloration is strikingly different from the usual one of this species. What a discovery!",
        effect: "(optical, no effect)"
    }
]
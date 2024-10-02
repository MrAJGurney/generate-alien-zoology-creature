// No. 14, Stone Throw, has an emoji that seems to cause issues. Using "⛰️" instead

export const CREATURE_ACTION_CARDS = [
    {
        "id": 1,
        "name": "Stupidity",
        "effect": "The creature does nothing and just looks stupid."
    },
    {
        "id": 2,
        "name": "Scared",
        "effect": "The creature moves with full movement range away from the 😡 target. If there is no 😡 target, it performs a random movement.\nIf a figure is touched while moving, close combat is performed."
    },
    {
        "id": 3,
        "name": "Restlessness",
        "effect": "The creature performs a random movement (scatter die).\nIf a figure is touched while moving, close combat is performed."
    },
    {
        "id": 4,
        "name": "Swirl up sand",
        "effect": "Creature performs SHO attack (18”) on largest 😡 value in this radius (random target if no 😡 in 18”).\nIf hit (SHO-test of creature), the target receives +1 to its SHO value for the rest of the hunt (no HP damage is dealt).\nIf the same target is hit several times during the hunt, the effect is cumulative.",
        "prerequisite": "18” range"
    },
    {
        "id": 5,
        "name": "Attack!",
        "effect": "The creature moves to the next visible figure (no matter how far away the figure is) and attacks it in close combat."
    },
    {
        "id": 6,
        "name": "Photosynthesis",
        "effect": "The creature gets +1 ⚡."
    },
    {
        "id": 7,
        "name": "Glare",
        "effect": "The creature shoots a beam of blinding light.\nThe figure that activates next may not move or make a close combat attack."
    },
    {
        "id": 8,
        "name": "Eating grass",
        "effect": "The creature gets +1 ⚡."
    },
    {
        "id": 9,
        "name": "A baby hatches 🥚",
        "effect": "Determine a random 🥚 (incl. the ones held by Scientists). Replace the 🥚 with the model of the baby creature.\nIt always moves after every creature’s turn, always moves randomly, plays no Action Cards and can’t be caught.\nMax. 1 baby at the same time.",
        "prerequisite": "Required: Baby creature (base 25mm)",
        "special": {
            "table": [
                ["MOV", "4"],
                ["A", "6+"],
                ["SHO", "x"],
                ["HP", "1"],
                ["DEF", "7+"],
                ["NERVE", "7+"],
                ["ESC", "9+"]
            ]
        }
    },
    {
        "id": 10,
        "name": "Fly",
        "effect": "The creature takes to the skies.\nRemove the creature's model from the gaming board. The creature now flies above the gaming board and has a line of sight to everything (but can’t be seen).\nAt the beginning of its next movement, it attacks the 😡 target from the air. Place the creature in base contact with the 😡 target.\nUse a scatter die to determine which side of the member the creature appears on."
    },
    {
        "id": 11,
        "name": "Rampage",
        "effect": "The creature moves 15” straight in a random direction.\nAll figures in the way of its base are attacked in close combat."
    },
    {
        "id": 12,
        "name": "Mind Control",
        "effect": "The creature has to pass a NERVE-test.\nIf it does, the figure that is activated next will move towards its closest figure (possibly an Expedition Team colleague!) and will attack it in close combat if possible.\nThe Action Card of this moved figure doesn’t have any effect."
    },
    {
        "id": 13,
        "name": "Bewilderment",
        "effect": "The creature uses mind tricks to confuse its prey.\nSwap the figure furthest away from the creature with the figure closest to it."
    },
    {
        "id": 14,
        "name": "Stone throw ⛰️",
        "effect": "The creature throws a stone at the figure with the highest 😡 value within a 12” radius (random in case of a tie).\nIt performs a shooting attack (SHO-test).\nIf successful, the target must pass a DEF-test.\nIf this fails, the target receives -1 HP.",
        "prerequisite": "12” range"
    },
    {
        "id": 15,
        "name": "Frightening scream",
        "effect": "The creature emits a terrifying scream towards the 😡 target.\nThe 😡 target must do a NERVE-test.\nIf the test fails, the target runs away from the creature with full MOV value and in a straight line."
    },
    {
        "id": 16,
        "name": "Flatulence",
        "effect": "After a loud rattling noise is heard, the air is enveloped in a heavy haze. Nobody wants to get too close to the creature now.\nFrom now until the end of this round, close combat against the creature may only be carried out by the Assistant."
    },
    {
        "id": 17,
        "name": "Oink Oink! 🐽",
        "effect": "Oink! (nothing happens)"
    },
    {
        "id": 18,
        "name": "Claw attack",
        "effect": "All figures within a 3” radius of the creature are attacked in close combat.\nA-test of the creature, if successful: DEF-test of the target with DEF +1 (e.g. DEF 5+ -> DEF 6+).\nIf the DEF-test fails: target -1 HP."
    },
    {
        "id": 19,
        "name": "Ouch!",
        "effect": "Crack! The creature had an unfortunate fall during its movement and has -4 MOV until the end of the round."
    },
    {
        "id": 20,
        "name": "Spit",
        "effect": "The creature spits in the face of the Expedition Team member with the highest 😡 value within a 12” radius.\nSHO-test creature.\nIf successful, the target cannot move the next time."
    },
    {
        "id": 21,
        "name": "Concealment",
        "effect": "The creature disappears without a trace. Remove it from the gaming board. The creature does not move or play an Action Card until it is found.\nThe expedition members must search for it. Each member of the Expedition Team can look for the creature in forests/high grasslands or oases by rolling a D10 when touching the terrain (in movement). At 6+, the creature appears in base contact. If the Expedition Team’s Action Card hasn’t been played yet, it has no effect anymore.\nThe creature immediately performs a close combat, after which it draws an Action Card. Then it’s the Expedition Team’s turn again."
    },
    {
        "id": 22,
        "name": "Parental instincts",
        "effect": "Every Scientist carrying an 🥚 immediately receives +2 😡 ."
    },
    {
        "id": 23,
        "name": "Wind 💨",
        "effect": "The creature blows out a strong gust of wind.\nEvery marker on the gaming board (including carried markers) moves D10” in a random direction (scatter die). Carried markers are dropped and also move randomly.\nThe markers cannot leave the gaming board and stop the movement if there is an obstacle in the way that you cannot move through."
    },
    {
        "id": 24,
        "name": "Sweet look 👁️",
        "effect": "The creature looks at the closest figure in line of sight with big googly eyes.\nThe target receives +2 A for its next turn (e.g. A6+ -> A 8+)."
    },
    {
        "id": 25,
        "name": "Digging tunnels",
        "effect": "The creature buries itself in the ground. Remove the creature's model from the gaming board.\nOn the creature's next turn, it appears in base contact with a randomly chosen member of the Expedition Team (use dice) and attacks it in close combat.\nThe creature then draws an Action Card as usual."
    },
    {
        "id": 26,
        "name": "Soothing herb 🌿",
        "effect": "The creature eats a calming herb and is totally relaxed.\nReduce each 😡 value of the Expedition Team members by 1.\nThere can’t be a negative value of 😡."
    },
    {
        "id": 27,
        "name": "Timidity",
        "effect": "The creature is terrified and tries to flee.\nESC-test of the creature.\nIf successful, the creature has fled and the hunt is over.\nAll carried and remaining 🥚 and 💩 markers now belong to the Expedition Team."
    },
    {
        "id": 28,
        "name": "Shockwave",
        "effect": "A shockwave emanates from the creature and spreads across the landscape.\nAll figures in line of sight move D10” away from the creature."
    },
    {
        "id": 29,
        "name": "Seizure of weakness",
        "effect": "Tension and stress cause the creature to weaken.\nIt loses 1 ⚡."
    },
    {
        "id": 30,
        "name": "Parasite infestation 💩",
        "effect": "The creature's severe abdominal pain turns out to be a parasite infestation.\nEach 💩 (including those carried by Assistants) performs a close combat attack with A 7+ against all figures within a 1” radius.\nIf an Assistant carries several 💩, a corresponding number of close combat attacks are carried out against him."
    },
    {
        "id": 31,
        "name": "Mirage",
        "effect": "The creature creates a mirage of itself, which briefly confuses the Expedition Team. The creature has to pass a NERVE-test.\nIf it does, it cannot be shot at until the end of the round (pistols, rifle)."
    },
    {
        "id": 32,
        "name": "Mating season",
        "effect": "The creature is in its mating season and announces with great fanfare that it is the strongest creature far and wide.\nThe creature receives -1A until the end of the round (e.g. A6+ -> A5+)."
    },
    {
        "id": 33,
        "name": "Faster than lightning",
        "effect": "The creature attacks so incredibly fast that it is barely visible.\nIt remains stationary, but performs a close combat attack against the furthest figure, even if it has no line of sight to it."
    },
    {
        "id": 34,
        "name": "Antler attack",
        "effect": "The creature takes a running start and charges towards the next figure.\nThe creature moves to the nearest figure (regardless of its MOV value) and performs a close combat attack with A-1. If successful, the target has DEF+1 (e.g. DEF5+ -> DEF 6+).\nIn any case, the target is thrown away from the creature in a straight line the same number of inches it took the creature to charge."
    },
    {
        "id": 35,
        "name": "Supersonic noise",
        "effect": "The creature emits a sound so loud that everyone who hears it has to cover their ears and scream.\nEvery Expedition Team member who still has a turn this round must take a NERVE-test at the start.\nIf they fail, their movement is random at full range this turn."
    },
    {
        "id": 36,
        "name": "Life force theft 🌳",
        "effect": "The creature reaches for the 😡 target with tendrils. If there is none, it attacks the closest figure in sight. The tendrils suck the target's life force.\nThe target must pass a DEF-test, otherwise it suffers -1 HP and the creature gains +1 HP up to its profile value.\nIf the creature has the Plant Organism 🌳 gene, the respective target receives -2 HP and the creature +2 HP instead.",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 37,
        "name": "Heal",
        "effect": "The creature heals 2 HP up to the maximum HP defined in its profile.",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 38,
        "name": "Dropping an 🥚",
        "effect": "The creature lays an 🥚.\nPlace the 🥚 at a distance of 1” around the creature. The direction is determined with a scatter die (starting from the centre of the creature).",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 39,
        "name": "Dropping the kids off at the pool 💩",
        "effect": "The creature goes about its business with relish and vigour.\nPlace a 💩 at a distance of 1” around the creature.\nThe direction is determined with a scatter die (starting from the centre of the creature).",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 40,
        "name": "Giant wave 🌊",
        "effect": "The ground beneath the creature opens up and a huge wave erupts, spreading out in all directions.\nAll figures in line of sight of the creature must pass a DEF-test each with +2. If this fails, the respective target receives -1 HP.\nIf the creature has the ‘Aquatic Features 🌊’ gene, the respective target receives -2 HP instead.",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 41,
        "name": "Explosion 🔥",
        "effect": "The creature discharges in a fireball.\nAll figures within 6” of the creature’s base are hit by the fire and must pass a DEF-test with +2. If this fails, the target gets -1 HP.\nIf the creature has the ‘Heat Resistance🔥’ gene, the respective target receives -2 HP instead.",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 42,
        "name": "Waldmeister 🌳",
        "effect": "The creature controls the forests. All figures who are inside a forest/high grassland are hit by the flora and must pass a DEF-test with +2.\nIf this fails, the respective target receives -1 HP.\nIf the creature has the ‘Plant Organism 🌳’ gene, the respective target receives -2 HP instead.",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 43,
        "name": "Energy rush ⚡",
        "effect": "The creature pumps itself up energetically.\nIt receives +3⚡.\n(Since this card costs 1⚡, the creature gains +2⚡ at the end of the turn).",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 44,
        "name": "Restless legs syndrome",
        "effect": "The legs tingle and the creature can't stop wriggling.\nIt gets +3 MOV for the rest of the round.",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 45,
        "name": "Moon song 🌊",
        "effect": "The creature sings a beautiful song. The Expedition Team is enchanted and stumbles forwards as if by magic.\nEach figure moves D10” in the direction of the creature (even without line of sight. No close combat is performed on base contact).\nIf the creature has the ‘Aquatic Features 🌊’ gene, it heals 1 HP for every figure that moved 7” or more by the moon song.",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 46,
        "name": "Fiery breath 🔥",
        "effect": "The figure exhales  with fiery breath. Roll a scatter die to determine the direction of the fiery breath (based on the creature, no SHO-test necessary).\nThe creature breathes 10” in this direction, this is the target point. 3” radius around the target point, all figures must make a successful DEF-test with +1 DEF (e.g. DEF5+ -> DEF6+). If unsuccessful, -1 HP for the target.\nIf the creature has the ‘Heat Resistance🔥’ gene, the radius is 5”.",
        "prerequisite": "Requires 1 ⚡"
    },
    {
        "id": 47,
        "name": "Devour 👄",
        "effect": "Creature jumps into contact with the closest marker or figure in sight (regardless of its MOV value) and attacks it.\nA-Test of the creature. If successful: Marker is gone (without any marker effects). If the target was a figure, DEF-test of figure. If the DEF-test fails, the figure is automatically gone and removed.",
        "prerequisite": "Requires 2 ⚡"
    },
    {
        "id": 48,
        "name": "Heaven-shattering roar",
        "effect": "The creature looks at the 😡 target and roars aggressively at it at a deafening volume.\nThe 😡 target must pass an ESC-test with ESC+5 (e.g. ESC 3+ -> ESC 8+) or flees the hunt. If the 😡 target flees, all the 💩 and 🥚it is carrying are safe.",
        "prerequisite": "Requires 2 ⚡"
    },
    {
        "id": 49,
        "name": "Shaking Earth",
        "effect": "Everything starts to jerk.\nEvery Expedition Team Member has to pass a DEF-test.\nIf a member fails, it suffers -1 HP.",
        "prerequisite": "Requires 2 ⚡"
    },
    {
        "id": 50,
        "name": "Apparition of God 🎆",
        "effect": "Glistening light streams from the creature as if it were being seized by something greater.\nAll figures on the gaming board each heal 2 HP up to the maximum HP defined in their profile.",
        "prerequisite": "Requires 3 ⚡"
    }
]
const rawText = `
Alien Zoology (open beta)
Author: Florian F. Manthey / @titus_painting 
full free rules: https://www.wargamevault.com/product/482988/Alien-Zoology-english-Open-Beta?term=alien+zoology


Alien Creature Genes table

01. Solid
Description: A burly bloke with heavy bones! 
Effect: The creature has +10 HP.


02. Pachyderm
Description: A thick skin protects the creature’s body from potential attackers.
Effect: The creature has -2 to its DEF value (e.g. DEF6+ becomes DEF4+).

03. Parent animal
Description: The creature has offspring that it wants to protect.
Effect: Takes the ‘Parental instincts’ Action Card into its deck. It always remains in the deck and cannot be removed during domesticating.

04. Fragile
Description: With its flimsy and brittle appearance, the creature gives the impression that it would fall apart at the slightest gust of wind.
Effect: The creature has -5HP.

05. Beautiful
Description: The Expedition Team members freeze in front of the beauty of the creature. It is not easy for them to harm something so beautiful.
Effect: All close combat attacks that target the creature receive +1 A value (e.g. A 5+ -> A 6+). All shooting attacks that target the creature receive +1 SHO (e.g. SHO 5+ -> SHO 6+).

06. Ugly
Description: The creature shocks with its abysmally ugly appearance. With its disgusting looks, the creature deters potential attackers.
Effect: The creature has -2 NERVE (e.g. NERVE 6+ -> NERVE 4+).


07. Warning colours
Description: The creature wears extremely bright warning colours and patterns that warn of its danger. 
Effect: The creature not only attacks all figures it touches or moves over, but also automatically attacks all figures in close combat within 2” of its base.

08. Fluorescent
Description: Some parts of the creature's body glow in bright colours. The creature uses it to charm others of its species  during the mating season.
Effect: The creature can always be seen at nighttime and twilight without  the line of sight restrictions of these times of day.

09. Fangs and claws
Description: With sharp and pointy fangs and claws, the creature can not only cut through the thickest metal, but they also give it a militaristic appearance.
Effect: The creature has -2 to its A value (e.g. A 6+ -> A 4+).

10. Cyclopean
Description: This mythical creature is the stuff of legends. It is as huge as a mountain and strides carefree and calmly through the landscape. 
Effect: Use a base size of 10-16 cm in diameter.The creature also has +5 HP. The creature can move through terrain (if that’s allowed) without movement restrictions. No terrain piece blocks line of sight from or towards the creature.

11. Small
Description: A tiny specimen that can quickly run away in case of danger. 
Effect: Use a base size with a maximum diameter of 5 cm.The creature has -2 to its ESC value (e.g. ESC 8+ -> ESC 6+). The creature also has -3 HP.

12. Hypersensitive senses
Description: The creature has hypersensitive senses that allow it to perceive its surroundings particularly attentively.
Effect: The creature's 😡 target is always the figure with the highest 😡 value, even if it cannot draw a line of sight to it.

13. Fast
Description: Fast as lightning! 
Effect: The creature gets +1 to its MOV value.

14. Slow
Description: Slow and steady wins the race.
Effect: The creature gets -1 to its MOV value.

15. Wings
Description: With its powerful wings, the creature flies to the greatest heights. 
Effect: The creature adds the ‘Fly’ Action Card to its deck. This cannot be removed later when domesticating.

16. Steadfast
Description: The creature displays an incredible stubbornness.
Effect: If the creature has more than 1 HP and an attack knocks it out, the creature survives with 1 HP.

17. Agile
Description: The creature is extremely agile and more difficult to hit in close combat.
Effect: When the creature is a target in close combat, all attackers’ close combat attacks on the creature receive +1 to the attacker's A-value 
(e.g. attacker A 5+ -> A 6+).

18. Glutton
Description: The creature has a healthy appetite!
Effect: The creature always starts the game with 4 💩 instead of the normal 3. Whenever the creature makes a random move, it moves towards the nearest 🍖 token (also without line of sight) instead and eats it on base contact. If there is no 🍖 and no 😡 target, it performs a random movement (scatter die).

19. Intelligent
Description: The creature displays an outstandingly intelligent behaviour that differs from the multitude of extraterrestrial fauna. The creature's behaviour appears to be unpredictable…
Effect: The creature is played by a second player. The wild creature doesn’t follow the movement rules for alien creatures. It is instead always controlled by the second player. The wild creature does not play its Action Cards randomly from a face-down pile, as is normally the case. The second player takes the creature's Action Cards and chooses an order at the beginning of each round and places them face down in a stack. If there is no second human player, you can also play the creature in this way yourself.

20. Light-sensitive organs
Description: With its light-emitting organs, the creature bathes in sun- or moonlight to recharge its batteries.
Effect: The creature receives the ‘Photosynthesis’ Action Card. This card can never be removed when domesticating.

21. Coprophagy
Description: The creature has the bad habit of eating its own faeces.
Effect: Whenever the creature makes a random move, it moves toward the nearest visible 💩 instead and eats it on base contact (also without line of sight). Remove the 💩. If the next visible 💩 is carried by an Assistant, this is the target of the creature's movement. A close combat attack is made when in base contact.

22. Aggressive
Description: You'd better not get too close to this creature or it will completely freak out!
Effect: If the creature rolls a natural 10 on an A-test (and the DEF-test of the target fails), the creature makes 2 HP damage instead of one.

23. Strong
Description: The creature has an extraordinary power that crushes all armour.
Effect: Whenever the creature attacks a target (close combat or ranged), that target gets +1 DEF (e.g. DEF 5+ -> DEF 6+).

24. Lightweight
Description: Light as a feather!
Effect: The creature has -3 HP.

25. Hard Scales
Description: A coat of hard scales covers the creature's body.
Effect: The creature never takes more than 3 HP damage from a single attack.

26. Prey animal
Description: The creature tastes particularly good and is therefore hunted by other creatures. The creature has adapted to this and runs away quickly when in danger.
Effect: The creature receives -1 to its ESC value (e.g. ESC 8+ -> ESC 7+). The creature receives +2 to its NERVE value (e.g. NERVE 6+ -> NERVE 8+). Takes the ‘Timidity’ Action Card into its deck. This can be discarded later during domestication.

27. Feathers
Description: The creature protects itself from cold and heat with a plumage.
Effect: The creature has -1 DEF (e.g. DEF 6+ -> DEF 5+).

28. Insectoid
Description: The creature's physique has insectoid features. In order to better defend itself, the insectoid creature has learnt a technique that allows it to better hit targets at a distance.
Effect: The creature has -2 SHO (e.g. SHO 6+ -> SHO 4+).

29. Extraterrestrial optics
Description: The creature has an unusual number of eyes (e.g. zero, one, three or more).
Effect: The creature can look up to 5” into forests/high grasslands instead of the normal 3”. However, it can never see completely through forests/high grasslands.

30. Wanderer
Description: The creature covers incredible distances on its wanderings with stoic endurance.
Effect: If the creature moves over the edge of the gaming board, it does not remain there as usual, but appears on the opposite side. 
Draw a line from the creature across the centre of the gaming board to the other side of the gaming board to determine the point at which the creature reappears. It continues its movement there in the same direction like it moved before.

31. Hexapode
Description: Coordinating the many limbs seems to be easy for the creature. It reaches great speeds.
Effect: The creature has +2 MOV.

32. Invertebrates
Description: The creature has no spine. Its body is slimy and flabby and resembles a slug as found on planet earth. 
Effect: The creature has -2 MOV.

33. Predator
Description: As a predator, the creature is designed to be as fast and strong as possible in order to take down its prey. Maybe the Expedition Team is the prey now?
Effect: The creature has -1 A. The creature has +1 MOV.

34. Swarm behaviour
Description: The creature is a swarm animal and is rarely found alone in the wild.
Effect: The creature has -2 NERVE (e.g. NERVE 6+ -> NERVE 4+). Instead of one single creature on a base, use multiple smaller creatures attached to the base. For all purposes gamewise the multiple creatures still count as one creature. 

35. Camouflage
Description: The creature has adapted its colour to its surroundings and camouflages itself.
Effect: The creature is less vulnerable to  shooting attacks. If the creature is shot at, the shooter has +1 SHO (e.g. SHO5+ -> SHO 6+).

36. Stinky
Description: An indescribably foul-smelling odour emanates from the creature. The odour deters predators from getting too close to the creature.
Effect: The creature cannot be attacked in close combat by any figure except the Assistant and other creatures.

37. Hungry
Description: The creature has a very voracious appetite.
Effect: Every🍖 always has 5 😡 instead of only 2 normally.

38. Longneck
Description: With its fabulously long neck, the creature can look far into the distance.
Effect: The creature’s line of sight isn’t blocked by any terrain type.

39. Chill
Description: The creature observes the action in a relaxed manner without appearing aggressive.
Effect: The creature never attacks in close combat. If its base touches a base of any figure while moving, close combats are not carried out.

40. Aquatic Features 🌊
Description: The creature originates from the ocean and shows aquatic characteristics.
Effect: Whenever the creature subtracts HP from a creature which has the ‘Heat Resistance 🔥’ gene, the amount of HP subtracted is doubled (HP damage x2). The creature has +2 HP (e.g. 10 HP -> 12 HP).

41. Heat Resistance 🔥
Description: The creature lives in particularly hot habitats and its physique has adapted to these conditions.
Effect: Whenever the creature subtracts HP from a creature which has the ‘Plant organism 🌳’ gene, the amount of HP subtracted is doubled (HP damage x2). The creature has -1 A (e.g. A6+ -> A5+).

42. Plant organism🌳
Description: It is not clear at first glance whether it is a creature or a plant species. This is due to the creature's plant-like appearance, which is dotted with tendrils, flowers, leaves and roots.
Effect: Whenever the creature subtracts HP from a creature which has the ‘Aquatic Features 🌊’ gene, the amount of HP subtracted is doubled (HP damage x2). The creature has -1 DEF (e.g. DEF 6+ -> DEF 5+).

43. Ethereal👻
Description: The creature is translucent  and shimmers in the sunlight. It seems to have come to this world from the depths of the galaxy.
Effect: For every single HP the creature loses, roll a D10 afterwards. On a result of 8+, this damage is ignored and the attack passes through the creature.

44. Top dog
Description: As the top dog, the creature defends its territory against all non-native species.
Effect: The creature always does the double amount of damage (HP damage x2) towards creatures who have an ‘Aquatic Features 🌊’ gene, ‘Plant organism 🌳’ gene or ‘Heat Resistance 🔥’ gene. Note: Cumulative with other factors of (HP damage x2), e.g. if a creature has both ‘Heat Resistance 🔥’ and ‘Top dog’ genes, it deals x4 HP damage against creatures with the ‘Plant organism🌳’ gene (as well as double HP damage against creatures with ‘Aquatic Features 🌊’ gene and ‘Heat Resistance 🔥’ gene).

45. Frightened temperament
Description: The creature has developed a fearful nature in order to survive.
Effect: The creature always moves in a direct line away from the 😡 target instead of towards it.

46. Rooted
Description: With strong roots anchored in the ground, this stocky creature moves as if in slow motion. 
Effect: The creature always has a MOV value of 1 (regardless of any modifiers from other genes). The creature has DEF -2 (e.g. DEF 6+ -> DEF 4+).

47. Nocturnal🌑
Description: The creature uses the cover of darkness to go hunting. It has adapted its senses to the conditions of the night.
Effect: The creature can see an unlimited distance at nighttime and twilight, unless a terrain piece obstructs the line of sight. The creature never sleeps at night. Instead, the creature sleeps during the day. During daytime hunts, the creature does not move and remains in place until it receives the first HP damage. It then wakes up and acts normally.

48. Tentacles
Description: With slippery tentacles, the creature grabs anything that moves and pulls the target towards it.
Effect: Whenever the creature has an 😡 target, it does not move, but moves the 😡 target towards itself. The MOV value of the 😡 target is used for this, not that of the creature.

49. Floating state
Description: The creature is a floating organism that manoeuvres eerily through the air.
Effect: The creature is never affected by movement restrictions due to terrain pieces and can always move through them normally (if movement through them is possible)

50. Rare✨
Description: The creature is particularly rare✨ and a wonderful specimen in the collection! Its coloration is strikingly different from the usual one of this species. What a discovery!
Effect: (optical, no effect)



Alien Creatures Action Cards

1. Stupidity
Effect: The creature does nothing and just looks stupid.

2. Scared
Effect: The creature moves with full movement range away from the 😡 target. If there is no 😡 target, it performs a random movement. If a figure is touched while moving, close combat is performed.

3. Restlessness
Effect: The creature performs a random movement (scatter die). If a figure is touched while moving, close combat is performed.

4. Swirl up sand
Effect: Creature performs SHO attack (18”) on largest 😡 value in this radius (random target if no 😡 in 18”). 
If hit (SHO-test of creature), the target receives +1 to its SHO value for the rest of the hunt (no HP damage is dealt).
If the same target is hit several times during the hunt, the effect is cumulative.

5. Attack!
Effect: The creature moves to the next visible figure (no matter how far away the figure is) and attacks it in close combat.

6. Photosynthesis
Effect: The creature gets +1 ⚡.

7. Glare
Effect: The creature shoots a beam of blinding light. The figure that activates next may not move or make a close combat attack.

8. Eating grass
Effect: The creature gets +1 ⚡.

9. A baby hatches🥚
Effect: Required: Baby creature (base 25mm)
Determine a random 🥚 (incl. the ones held by Scientists). Replace the 🥚 with the model of the baby creature. It always moves after every creature’s turn, always moves randomly, plays no Action Cards and can’t be caught. Max. 1 baby at the same time.
If there is already a baby on the gaming board, this Action Card has no effect.
MOV 4
A 6+
SHO x
HP 1
DEF 7+
NERVE 7+
ESC 9+

10. Fly
Effect: The creature takes to the skies. 
Remove the creature's model from the gaming board. The creature now flies above the gaming board and has a line of sight to everything (but can’t be seen). At the beginning of its next movement, it attacks the 😡 target from the air. Place the creature in base contact with the 😡 target. Use a scatter die to determine which side of the member the creature appears on. 

11. Rampage
Effect: The creature moves 15” straight in a random direction. All figures in the way of its base are attacked in close combat.

12. Mind Control
Effect: The creature has to pass a NERVE-test.
If it does, the figure that is activated next will move towards its closest figure (possibly an Expedition Team colleague!) and will attack it in close combat if possible. The Action Card of this moved figure doesn’t have any effect.

13. Bewilderment
Effect: The creature uses mind tricks to confuse its prey. Swap the figure furthest away from the creature with the figure closest to it.

14. Stone throw 🪨
Effect: The creature throws a stone at the figure with the highest 😡 value within a 12” radius (random in case of a tie). It performs a shooting attack (SHO-test). If successful, the target must pass a DEF-test. If this fails, the target receives -1 HP.

15. Frightening scream
Effect: The creature emits a terrifying scream towards the 😡 target. The 😡 target must do a NERVE-test. If the test fails, the target runs away from the creature with full MOV value and in a straight line.

16. Flatulence
Effect: After a loud rattling noise is heard, the air is enveloped in a heavy haze. Nobody wants to get too close to the creature now. From now until the end of this round, close combat against the creature may only be carried out by the Assistant.

17. Oink Oink! 🐽
Effect: Oink! (nothing happens)

18. Claw attack
Effect: All figures within a 3” radius of the creature are attacked in close combat. 
A-test of the creature, if successful: DEF-test of the target with DEF +1 (e.g. DEF 5+ -> DEF 6+). 
If the DEF-test fails: target -1 HP.

19. Ouch!
Effect: Crack! The creature had an unfortunate fall during its movement and has -4 MOV until the end of the round.

20. Spit
Effect: The creature spits in the face of the Expedition Team member with the highest 😡 value within a 12” radius. SHO-test creature. If successful, the target cannot move the next time.

21. Concealment
Effect: The creature disappears without a trace. Remove it from the gaming board. The creature does not move or play an Action Card until it is found. 
The expedition members must search for it. Each member of the Expedition Team can look for the creature in forests/high grasslands or oases by rolling a D10 when touching the terrain (in movement). At 6+, the creature appears in base contact. If the Expedition Team’s Action Card hasn’t been played yet, it has no effect anymore. The creature immediately performs a close combat, after which it draws an Action Card. Then it’s the Expedition Team’s turn again.

22. Parental instincts
Effect: Every Scientist carrying an 🥚 immediately receives +2 😡 .

23. Wind 💨
Effect: The creature blows out a strong gust of wind. 
Every marker on the gaming board (including carried markers) moves D10” in a random direction (scatter die). Carried markers are dropped and also move randomly. 
The markers cannot leave the gaming board and stop the movement if there is an obstacle in the way that you cannot move through.

24. Sweet look 👁️
Effect: The creature looks at the closest figure in line of sight with big googly eyes. 
The target receives +2 A for its next turn (e.g. A6+ -> A 8+).

25. Digging tunnels
Effect: The creature buries itself in the ground. Remove the creature's model from the gaming board.
On the creature's next turn, it appears in base contact with a randomly chosen member of the Expedition Team (use dice) and attacks it in close combat. The creature then draws an Action Card as usual.

26. Soothing herb 🌿
Effect: The creature eats a calming herb and is totally relaxed. 
Reduce each 😡 value of the Expedition Team members by 1. There can’t be a negative value of 😡.

27. Timidity
Effect: The creature is terrified and tries to flee. 
ESC-test of the creature. If successful, the creature has fled and the hunt is over. All carried and remaining 🥚 and 💩 markers now belong to the Expedition Team. 

28. Shockwave
Effect: A shockwave emanates from the creature and spreads across the landscape.
All figures in line of sight move D10” away from the creature.

29. Seizure of weakness
Effect: Tension and stress cause the creature to weaken.
It loses 1 ⚡.

30. Parasite infestation 💩
Effect: The creature's severe abdominal pain turns out to be a parasite infestation.
Each 💩 (including those carried by Assistants) performs a close combat attack with A 7+ against all figures within a 1” radius. 
If an Assistant carries several 💩, a corresponding number of close combat attacks are carried out against him.

31. Mirage
Effect: The creature creates a mirage of itself, which briefly confuses the Expedition Team. The creature has to pass a NERVE-test. 
If it does, it cannot be shot at until the end of the round (pistols, rifle).

32. Mating season
Effect: The creature is in its mating season and announces with great fanfare that it is the strongest creature far and wide.
The creature receives -1A until the end of the round (e.g. A6+ -> A5+).

33. Faster than lightning
Effect: The creature attacks so incredibly fast that it is barely visible. 
It remains stationary, but performs a close combat attack against the furthest figure, even if it has no line of sight to it.

34. Antler attack
Effect: The creature takes a running start and charges towards the next figure.
The creature moves to the nearest figure (regardless of its MOV value) and performs a close combat attack with A-1. If successful, the target has DEF+1 (e.g. DEF5+ -> DEF 6+).
In any case, the target is thrown away from the creature in a straight line the same number of inches it took the creature to charge.

35. Supersonic noise
Effect: The creature emits a sound so loud that everyone who hears it has to cover their ears and scream.
Every Expedition Team member who still has a turn this round must take a NERVE-test at the start. If they fail, their movement is random at full range this turn.

36. Life force theft🌳 
Effect: Requires 1 ⚡
The creature reaches for the 😡 target with tendrils. If there is none, it attacks the closest figure in sight. The tendrils suck the target's life force.
The target must pass a DEF-test, otherwise it suffers -1 HP and the creature gains +1 HP up to its profile value.
If the creature has the Plant Organism 🌳 gene, the respective target receives -2 HP and the creature +2 HP instead.

37. Heal
Effect: Requires 1 ⚡
The creature heals 2 HP up to the maximum HP defined in its profile.

38. Dropping an🥚
Effect: Requires 1 ⚡
The creature lays an 🥚. Place the 🥚 at a distance of 1” around the creature. The direction is determined with a scatter die (starting from the centre of the creature).

39. Dropping the kids off at the pool 💩
Effect: Requires 1 ⚡
The creature goes about its business with relish and vigour. Place a 💩 at a distance of 1” around the creature. The direction is determined with a scatter die (starting from the centre of the creature).

40. Giant wave 🌊
Effect: Requires 1 ⚡
The ground beneath the creature opens up and a huge wave erupts, spreading out in all directions. All figures in line of sight of the creature must pass a DEF-test each with +2. If this fails, the respective target receives -1 HP.
If the creature has the ‘Aquatic Features 🌊’ gene, the respective target receives -2 HP instead.

41. Explosion🔥
Effect: Requires 1 ⚡
The creature discharges in a fireball. All figures within 6” of the creature’s base are hit by the fire and must pass a DEF-test with +2.  If this fails, the target gets -1 HP.
If the creature has the ‘Heat Resistance🔥’ gene, the respective target receives -2 HP instead.

42. Waldmeister 🌳 
Effect: Requires 1 ⚡
The creature controls the forests. All figures who are inside a forest/high grassland are hit by the flora and must pass a DEF-test with +2. If this fails, the respective target receives -1 HP.
If the creature has the ‘Plant Organism 🌳’ gene, the respective target receives -2 HP instead.

43. Energy rush⚡
Effect: Requires 1⚡
The creature pumps itself up energetically. 
It receives +3⚡.
(Since this card costs 1⚡, the creature gains +2⚡ at the end of the turn).

44. Restless legs syndrome
Effect: Requires 1 ⚡
The legs tingle and the creature can't stop wriggling.
It gets +3 MOV for the rest of the round.

45. Moon song 🌊
Effect: Requires 1 ⚡
The creature sings a beautiful song. The Expedition Team is enchanted and stumbles forwards as if by magic.
Each figure moves D10” in the direction of the creature (even without line of sight. No close combat is performed on base contact).
If the creature has the ‘Aquatic Features 🌊’ gene, it heals 1 HP for every figure that moved 7” or more by the moon song.

46. Fiery breath🔥
Effect: Requires 1⚡
The figure exhales  with fiery breath. 
Roll a scatter die to determine the direction of the fiery breath (based on the creature, no SHO-test necessary). The creature breathes 10” in this direction, this is the target point. 3” radius around the target point, all figures must make a successful DEF-test with +1 DEF (e.g. DEF5+ -> DEF6+). If unsuccessful, -1 HP for the target.
If the creature has the ‘Heat Resistance🔥’ gene, the radius is 5”.

47. Devour 👄
Effect: Requires 2⚡
Creature jumps into contact with the closest marker or figure in sight (regardless of its MOV value) and attacks it.
A-Test of the creature. If successful: Marker is gone (without any marker effects). If the target was a figure, DEF-test of figure. If the DEF-test fails, the figure is automatically gone and removed.

48. Heaven-shattering roar
Effect: Requires 2⚡
The creature looks at the 😡 target and roars aggressively at it at a deafening volume. The 😡 target must pass an ESC-test with ESC+5 (e.g. ESC 3+ -> ESC 8+) or flees the hunt. If the 😡 target flees, all the 💩 and 🥚it is carrying are safe.

49. Shaking Earth
Effect: Requires 2 ⚡
Everything starts to jerk.
Every Expedition Team Member has to pass a DEF-test.
If a member fails, it suffers -1 HP.

50. Apparition of God 🎆
Effect: Requires 3⚡
Glistening light streams from the creature as if it were being seized by something greater. All figures on the gaming board each heal 2 HP up to the maximum HP defined in their profile.
`;

const getRandomWholeNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const rollD10 = () => getRandomWholeNumber(1,10);

const rollD50 = () => {
  const tensDigit = [
    0, 0,
    10, 10,
    20, 20,
    30, 30,
    40, 40,
  ][rollD10() - 1];
  const onesDigit = rollD10();
  return tensDigit + onesDigit;
}

const [genesText, actionsText]  = rawText.split(/Alien Creature Genes table|Alien Creatures Action Cards+/).slice(1);

const genesDictionary = genesText
                          .trim()
                          .split(`\n\n`)
                          .map(geneText => {
                            const trimmedLines = geneText.trim().split('\n');
                            trimmedLines[2] = trimmedLines.slice(2).map(line => line.trim()).join('\n');
                            const [id, name] = trimmedLines[0].trim().split('. ');

                            return {
                              id: parseInt(id),
                              name,
                              description: trimmedLines[1].slice("Description: ".length),
                              effect: trimmedLines[2].slice("Effect: ".length)
                            };
                          });

const actionsDictionary = actionsText
                            .trim()
                            .split(`\n\n`)
                            .map(actionText => {
                              const trimmedLines = actionText.trim().split('\n');
                              trimmedLines[1] = trimmedLines.slice(1).map(line => line.trim()).join('\n');
                              const [id, name] = trimmedLines[0].trim().split('. ');

                              return {
                                id: parseInt(id),
                                name,
                                effect: trimmedLines[1].slice("Effect: ".length)
                              };
                            });


const generateCreature = () => {
  const genes = Array(4)
                .fill(null)
                .map(( _a, _b, diceRolls) => {
                  let diceRoll;
                  do {
                    diceRoll = rollD50();
                  } while (diceRolls.includes(diceRoll));
                  return diceRoll;
                })
                .toSorted((a,b) => a - b)
                .map(geneId => genesDictionary.find(({id}) => geneId === id));

  const actions = Array(5)
                    .fill(null)
                    .map(( _a, _b, diceRolls) => {
                      let diceRoll;
                      do {
                        diceRoll = rollD50();
                      } while (diceRolls.includes(diceRoll));
                      return diceRoll;
                    })
                    .toSorted((a,b) => a - b)
                    .map(actionId => actionsDictionary.find(({id}) => actionId === id));

  genes.forEach(({id: actionId}) => {
    if (actionId == 3 && !actions.find(({id}) => id == 22)) {
      actions.push(actionsDictionary.find(({id}) => id == 22));
    }
    if (actionId == 15 && !actions.find(({id}) => id == 10)) {
      actions.push(actionsDictionary.find(({id}) => id == 10));
    }
    if (actionId == 20 && !actions.find(({id}) => id == 6)) {
      actions.push(actionsDictionary.find(({id}) => id == 6));
    }
    if (actionId == 26 && !actions.find(({id}) => id == 27)) {
      actions.push(actionsDictionary.find(({id}) => id == 27));
    }

    actions.sort(({id: a}, {id: b}) => a - b);
  });

  return {
    genes,
    actions
  };
}

const replaceGenesRows = ({id, name, description, effect}) => {
  const table = document.getElementById("genes-table");
  const rowCount = table.rows.length;

  rowCount.map((_, i) => i).sort((a,b) => b - a).forEach(i => table.deleteRow(i));

  const row = table.insertRow(-1);
  row.insertCell(0).appendChild(document.createTextNode(id));
  row.insertCell(1).appendChild(document.createTextNode(name));
  row.insertCell(2).appendChild(document.createTextNode(description));
  row.insertCell(3).appendChild(document.createTextNode(effect));
}

const replaceActionCardsRows = ({id, name, effect}) => {
  const table = document.getElementById("action-cards-table");
  const rowCount = table.rows.length;

  rowCount.map((_, i) => i).sort((a,b) => b - a).forEach(i => table.deleteRow(i));

  const row = table.insertRow(-1);
  row.insertCell(0).appendChild(document.createTextNode(id));
  row.insertCell(1).appendChild(document.createTextNode(name));
  row.insertCell(2).appendChild(document.createTextNode(effect));
}

const main = () => {
  const generateNewCreatureButton = document.getElementById('generate-new-creature-button');
  generateNewCreatureButton.addEventListener('click', () => {
    const {genes, actions } = generateCreature();

    replaceGenesRows(genes);
    replaceActionCardsRows(actions);
  });
}

window.addEventListener('load', main);

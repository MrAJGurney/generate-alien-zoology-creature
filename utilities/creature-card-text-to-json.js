
// Note: These methods were used to generate the JSON dictionaries in source-files\creature-genes.js and source-files\creature-actions.js

const [genesText, actionsText]  = CREATURE_GENES_AND_ACTIONS.split(/Alien Creature Genes table|Alien Creatures Action Cards+/).slice(1);

const CREATURE_GENES = genesText
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

const CREATURE_ACTIONS = actionsText
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
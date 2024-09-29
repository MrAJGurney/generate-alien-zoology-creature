import { CREATURE_GENES_AND_ACTIONS } from './creature-genes-and-actions.js';

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

const [genesText, actionsText]  = CREATURE_GENES_AND_ACTIONS.split(/Alien Creature Genes table|Alien Creatures Action Cards+/).slice(1);

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
                .reduce((diceRolls) => {
                  let dieRoll;
                  do {
                    dieRoll = rollD50();
                  } while (diceRolls.includes(dieRoll));
                  diceRolls.push(dieRoll)
                  return diceRolls;
                }, [])
                .toSorted((a,b) => a - b)
                .map(geneId => genesDictionary.find(({id}) => geneId === id));

  const actions = Array(5)
                    .fill(null)
                    .reduce((diceRolls) => {
                      let dieRoll;
                      do {
                        dieRoll = rollD50();
                      } while (diceRolls.includes(dieRoll));
                      diceRolls.push(dieRoll)
                      return diceRolls;
                    }, [])
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

const addGenesRow = (table, {id, name, description, effect}) => {
  const row = table.insertRow();
  row.insertCell(0).appendChild(document.createTextNode(id));
  row.insertCell(1).appendChild(document.createTextNode(name));
  row.insertCell(2).appendChild(document.createTextNode(description));
  row.insertCell(3).appendChild(document.createTextNode(effect));
}

const replaceGenesRows = (genes) => {
  const table = document.querySelector("#genes-table tbody");
  genes.forEach(gene => addGenesRow(table, gene));
}

const addActionCardsRow = (table, {id, name, effect}) => {
  const row = table.insertRow();
  row.insertCell(0).appendChild(document.createTextNode(id));
  row.insertCell(1).appendChild(document.createTextNode(name));
  row.insertCell(2).appendChild(document.createTextNode(effect));
}

const replaceActionCardsRows = (actions) => {
  const table = document.querySelector("#action-cards-table tbody");
  actions.forEach(action => addActionCardsRow(table, action));
}

const main = () => {
  const generateNewCreatureButton = document.getElementById('generate-new-creature-button');
  generateNewCreatureButton.addEventListener('click', () => {
    const {genes, actions } = generateCreature();

    document.querySelectorAll("tbody tr").forEach(row => row.remove());

    replaceGenesRows(genes);
    replaceActionCardsRows(actions);
  });

  generateCreature();
}

window.addEventListener('load', main);

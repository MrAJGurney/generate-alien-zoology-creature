import { CREATURE_GENES } from '../source-files/creature-genes.js'
import { CREATURE_ACTION_CARDS } from '../source-files/creature-action-cards.js'
import { rollD50 } from '../utilities/roll-dice.js'

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
                .map(geneId => CREATURE_GENES.find(({id}) => geneId === id));

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
                    .map(actionId => CREATURE_ACTION_CARDS.find(({id}) => actionId === id));

  genes.forEach(({id: actionId}) => {
    if (actionId == 3 && !actions.find(({id}) => id == 22)) {
      actions.push(CREATURE_ACTION_CARDS.find(({id}) => id == 22));
    }
    if (actionId == 15 && !actions.find(({id}) => id == 10)) {
      actions.push(CREATURE_ACTION_CARDS.find(({id}) => id == 10));
    }
    if (actionId == 20 && !actions.find(({id}) => id == 6)) {
      actions.push(CREATURE_ACTION_CARDS.find(({id}) => id == 6));
    }
    if (actionId == 26 && !actions.find(({id}) => id == 27)) {
      actions.push(CREATURE_ACTION_CARDS.find(({id}) => id == 27));
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

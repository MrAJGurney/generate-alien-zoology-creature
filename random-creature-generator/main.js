import { CREATURE_GENES } from '../source-files/creature-genes.js'
import { CREATURE_ACTION_CARDS } from '../source-files/creature-action-cards.js'
import { loadIdsFromUrl, saveIdsToUrl } from '../utilities/url-data-store.js'
import { rollD50 } from '../utilities/roll-dice.js'

const PARAMS = {
  GENE_IDS: 'geneIds',
  ACTION_IDS: 'actionIds'
}

const generateCreatureFromUrl = () => {
  const storedData = loadIdsFromUrl();

  if (!storedData || !storedData[PARAMS.GENE_IDS] || !storedData[PARAMS.ACTION_IDS]) {
    return {genes: [], actions: []};
  }

  const { geneIds, actionIds } = storedData;
  const genes = geneIds
                  .toSorted((a,b) => a - b)
                  .map(geneId => CREATURE_GENES.find(({id}) => geneId === id));

  const actions = actionIds
                    .toSorted((a,b) => a - b)
                    .map(actionId => CREATURE_ACTION_CARDS.find(({id}) => actionId === id));

  return {
    genes,
    actions
  };
}

const storeRandomCreatureInUrl = () => {
  const geneIds = Array(4)
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

  const geneActionCardIds = geneIds
                            .filter(({actionCard}) => actionCard)
                            .map(({actionCard: {id}}) => id);

  const actionIds = Array(5)
                    .fill(null)
                    .reduce((actionCardIds) => {
                      let newId;
                      do {
                        newId = rollD50();
                      } while (actionCardIds.includes(newId));
                      actionCardIds.push(newId)
                      return actionCardIds;
                    }, geneActionCardIds)
                    .toSorted((a,b) => a - b);

  saveIdsToUrl({
    [PARAMS.GENE_IDS]: geneIds,
    [PARAMS.ACTION_IDS]: actionIds
  });
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

const populateTableFromUrl = () => {
  const { genes, actions } = generateCreatureFromUrl();

  document.querySelectorAll("tbody tr").forEach(row => row.remove());

  replaceGenesRows(genes.toSorted((a,b) => a.id - b.id));
  replaceActionCardsRows(actions.toSorted((a,b) => a.id - b.id));
}

const main = () => {
  populateTableFromUrl();

  const generateNewCreatureButton = document.getElementById('generate-new-creature-button');

  generateNewCreatureButton.addEventListener('click', () => {
    storeRandomCreatureInUrl();
    populateTableFromUrl();
  });

  window.addEventListener('popstate', () => {
    populateTableFromUrl(); 
  });
}

window.addEventListener('load', main);

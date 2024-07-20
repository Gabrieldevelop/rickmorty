import introView from './view.js';
import * as model from './model.js';
import { getFirstID, getSecondID } from './utils/helpers.js';

// console.log(getFirstID());

console.log('Controller working');

const controlIntroCharacters = function () {
  // Render intro characters
  introView.renderIntrocharacters(model.state.introCharacters);
};

const init = async function () {
  await model.loadIntroCharacters(getFirstID(), getSecondID());
  controlIntroCharacters();
};

init();

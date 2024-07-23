import introView from './view.js';
import * as model from './model.js';
import { getFirstID, getSecondID } from './utils/helpers.js';

const controlIntroCharacters = function () {
  // Render intro characters
  introView.renderIntrocharacters(model.state.introCharacters);
};

const controlResultsCharacters = async function () {
  introView.renderCharacters(model.state.results);
};

const handleFormSubmit = async function (e) {
  e.preventDefault();
  const name = document.querySelector('.search_input').value;
  const status = document.querySelector('.input_status').value;
  const gender = document.querySelector('.specie_input').value;

  await model.filterCharacters(
    name.toLowerCase(),
    status.toLowerCase(),
    gender.toLowerCase()
  );

  controlResultsCharacters();
};

const init = async function () {
  await model.loadIntroCharacters(getFirstID(), getSecondID());
  controlIntroCharacters();

  introView._form.addEventListener('submit', handleFormSubmit);

  // Aside functionality
  introView.asideTogle();
};

init();

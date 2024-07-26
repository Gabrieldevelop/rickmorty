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

const controlAddBookmark = function (id) {
  const character = model.state.results.find((char) => char.id === +id);

  model.addBookmark(character);
  introView.renderBookmarks(model.state.bookmarks);
};

const controlRemoveBookmark = function (id) {
  model.removeBookmark(+id);
  introView.renderBookmarks(model.state.bookmarks);
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

  // Show Bookmarks
  introView.showBookmarks();

  // Add bookmark functionality
  introView.addHandlerAddBookmark(controlAddBookmark);

  // Remove bookmark functionality
  introView.addHandlerRemoveBookmark(controlRemoveBookmark);

  // When page loads, load characters from localStorage
  // introView.onLoadCharacters(controlLoadBookmarkedCharacters);
  model.loadBookmarkedCharacters();
  introView.renderBookmarks(model.state.bookmarks);
};

init();

import { getJSON } from './utils/helpers.js';
import { API_URL } from './utils/config.js';

export const state = {
  introCharacters: [],
  results: [],
  bookmarks: [],
};

export const loadIntroCharacters = async function (character1, character2) {
  try {
    const data = await Promise.all([
      getJSON(`${API_URL}/character/${character1}`),
      getJSON(`${API_URL}/character/${character2}`),
    ]);

    if (!data) throw new Error('BADDLYY QUERY');

    // Because data is an array
    state.introCharacters.push(data[0]);
    state.introCharacters.push(data[1]);
  } catch (error) {
    console.log(`${error.message}`);
    throw error;
  }
};

export const filterCharacters = async function (name, status, specie) {
  try {
    const characters = await getJSON(
      `${API_URL}/character/?name=${name}&status=${status}&species=${specie}`
    );

    if (!characters) throw new Error('Nothing found, try with another data');

    // Filling results property that will contain results from API
    state.results = characters ? (state.results = characters.results) : null;
  } catch (error) {
    throw error;
  }
};

export const addBookmark = function (character) {
  if (state.bookmarks.some((bookmark) => bookmark.id === character.id)) return;

  state.bookmarks.push(character);

  // Update localStorage
  persistCharacters();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex((bookmark) => bookmark.id === id);

  if (index !== -1) state.bookmarks.splice(index, 1);

  // Update localStorage
  persistCharacters();
};

const persistCharacters = function () {
  localStorage.setItem('ch', JSON.stringify(state.bookmarks));
};

export const loadBookmarkedCharacters = function () {
  if (localStorage.getItem('ch')) {
    const characters = localStorage.getItem('ch');
    state.bookmarks = JSON.parse(characters);
  }
};

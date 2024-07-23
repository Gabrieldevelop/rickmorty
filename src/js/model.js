import { getJSON } from './utils/helpers.js';
import { API_URL } from './utils/config.js';

export const state = {
  introCharacters: [],
};

export const loadIntroCharacters = async function (character1, character2) {
  try {
    const data = await Promise.all([
      getJSON(`${API_URL}/character/${character1}`),
      getJSON(`${API_URL}/character/${character2}`),
    ]);

    // Because data is an array
    state.introCharacters.push(data[0]);
    state.introCharacters.push(data[1]);

    console.log(state.introCharacters);
  } catch (error) {
    console.log(`Something bad happened ${error.message}`);
  }
};

export const filterCharacters = async function (name, status, specie) {
  try {
    const characters = await getJSON(
      `${API_URL}/character/?name=${name}&status=${status}&species=${specie}`
    );

    // Create results property that contains results from API
    state.results = characters ? (state.results = characters.results) : null;

    // console.log(characters);
    console.log(state.results, 'HOLA');
  } catch (error) {
    console.log(error.message);
  }
};

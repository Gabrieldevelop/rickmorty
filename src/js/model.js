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

/* https://rickandmortyapi.com/api/character/?name=rick&status=alive
 */

/* https://myexample.com/api?name=value1&status=value2&species=value3&type=value4&gender=value5
 */

/* name, statys, species */

export const searchCharacter = async function (name, status, gender) {
  try {
    const character = await getJSON(
      `${API_URL}/character/?name=${name}&status=${status}&gender=${gender}`
    );
    console.log(character);
  } catch (error) {
    console.log(error.message);
  }
};

// searchCharacter();

/* 
Style all the inputs fields
Do some test of the api
Style the new cards and make them responsive 
*/

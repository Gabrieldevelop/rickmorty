class Intro {
  _cardsContainer = document.querySelector('.cardsContainer');
  _form = document.querySelector('.myForm');
  _resultsCharacter = document.querySelector('.results__characters-container');

  renderIntrocharacters(data) {
    let markup = data.map(this.generateIntroMarkup).join(' ');
    this._cardsContainer.insertAdjacentHTML('afterbegin', markup);
  }

  generateIntroMarkup(character) {
    return `
        <article class="character__card">
            <div class="character__image">
              <img src="${character.image}" alt="image" />
            </div>
            <div class="character__content">
              <div class="section section1">
                <h3 class="character__title">${character.name}</h3>
                <span class="status">${character.status}</span>
              </div>
              <div class="section section2">
                <span class="character__subtitle">Last known location</span>
                <p class="character__info">${character.origin.name}</p>
              </div>
              <div class="section section3">
                <span class="character__subtitle">First seen in </span>
                <p class="character__info">${character.location.name}</p>
              </div>
            </div>
        </article>`;
  }

  renderCharacters(data) {
    this.cleanUI();
    let markup = data.map(this.generateMarkupCharacters).join(' ');
    this._resultsCharacter.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkupCharacters(character) {
    return `
            <div class="card">
              <div class="image">
                <img src="${character.image}" alt="Image of ${character.name}"/>
              </div>
              <div class="content">
                <div class="section character__name">
                  <h3 class="character__title">${character.name}</h3>
                </div>
                <div class="section character__status">
                  <h3 class="status">
                    Status <span class="status__sign ${
                      character.status === 'Alive'
                        ? 'status__sign--green'
                        : character.status === 'Dead'
                        ? 'status__sign--red'
                        : character.status === 'Unknown'
                        ? ''
                        : ''
                    }" title="Character status"></span>
                  </h3>
                </div>
                <div class="section character__gender">
                  <h3 class="character__subtitle">
                    Character Gender - <span class="detail">${
                      character.gender
                    }</span>
                  </h3>
                </div>
                <div class="section character__origin">
                  <h3 class="character__subtitle">
                    Last Known Location - <span class="detail">${
                      character.location.name
                    }</span>
                  </h3>
                </div>
                <div class="section character__specie">
                  <h3 class="character__subtitle">
                    Specie - <span class="detail">${character.species}</span>
                  </h3>
                </div>
              </div>
            </div>
    `;
  }

  cleanUI() {
    this._resultsCharacter.textContent = '';
  }
}

export default new Intro();

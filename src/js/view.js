class Intro {
  _cardsContainer = document.querySelector('.cardsContainer');

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
}

export default new Intro();

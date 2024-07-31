class Intro {
  _cardsContainer = document.querySelector('.cardsContainer');
  _form = document.querySelector('.myForm');
  _resultsCharacter = document.querySelector('.results__characters-container');
  _aside = document.querySelector('aside');
  _main = document.querySelector('main');
  _menuIcon = document.querySelector('.menu__icon');
  _bookmarkIcon = document.querySelector('.bookmark__icon');
  _bookmarks = document.querySelector('.bookmarks');
  _bookmarksContainer = document.querySelector('.bookmarks__container');
  _bookmarksMessage = document.querySelector('.bookmark__message');

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
    if (!data || data.length === 0) return this.renderErrorMessage();
    this.cleanUI();
    this.transferUser();
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
                  <img  src="/bookmark-icon.75a54d7f.svg" 
                        alt="Bookmar a character"/ 
                        title="Bookmark"
                        class="save__character--icon save-character"
                        data-id="${character.id}">
                </div>
                <div class="section character__status">
                  <h3 class="status">
                    Status <span class="status__sign ${
                      character.status === 'Alive'
                        ? 'status__sign--green'
                        : character.status === 'Dead'
                        ? 'status__sign--red'
                        : ''
                    }" title="Character status">
                    ${character.status === 'unknown' ? '| Unknown' : ''}
                    </span>
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
    const statusContainer = this._aside.querySelector(
      '.message__status--container'
    );
    // Because we need to re-clean the statusContainer's content
    statusContainer.textContent = '';
    statusContainer.style.display = 'none';
  }

  asideTogle() {
    this._menuIcon.addEventListener('click', () => {
      this._aside.classList.toggle('active');
      this._main.classList.toggle('spand');

      if (this._bookmarks.classList.contains('showed')) {
        this._bookmarks.classList.remove('showed');
      }
    });
  }

  showBookmarks() {
    this._bookmarkIcon.addEventListener('click', () => {
      this._bookmarks.classList.toggle('showed');
    });
  }

  renderBookmarks(bookmarks) {
    this._bookmarksContainer.innerHTML = '';
    if (bookmarks.length === 0) this._bookmarksMessage.classList.add('show');
    else this._bookmarksMessage.classList.remove('show');

    const markup = bookmarks.map(this.generateMarkupBookmarks).join('');
    this._bookmarksContainer.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkupBookmarks(character) {
    return `
     <li>
        <img
          src="${character.image}"
          width="100px"
          max-height="400px"
          alt="Image of character${character.name}"
        />
        <div class="character__section--container">
          <div class="section character__name">
            <h3 class="character__title">${character.name}</h3>
            <img
              src="/bookmark-icon.75a54d7f.svg"
              alt="Bookmar a character"
              title="unbookmark"
              class="save__character--icon"
              data-id="${character.id}"
            />
          </div>
          <div class="section character__info">
            <h3 class="status">
                    Status <span class="status__sign ${
                      character.status === 'Alive'
                        ? 'status__sign--green'
                        : character.status === 'Dead'
                        ? 'status__sign--red'
                        : ''
                    }" title="Character status">
                    ${character.status === 'unknown' ? '| Unknown' : ''}
                    </span>
                  </h3>
            <h3 class="character__subtitle">
              Last know location
              <br />
              <span class="detail">${character.location.name}</span>
            </h3>
          </div>
        </div>
      </li>
    `;
  }

  addHandlerAddBookmark(handler) {
    this._resultsCharacter.addEventListener('click', function (e) {
      // Targetting the btn
      const btn = e.target.closest('.save__character--icon');
      if (!btn) return;
      const characterID = btn.dataset.id;
      handler(characterID);
    });
  }

  addHandlerRemoveBookmark(handler) {
    this._bookmarksContainer.addEventListener('click', function (e) {
      // Targetting the btn
      const btn = e.target.closest('.save__character--icon');
      if (!btn) return;
      const characterID = btn.dataset.id;
      handler(characterID);
    });
  }

  transferUser() {
    if (this._aside.classList.contains('active')) {
      this._aside.classList.remove('active');
      this._main.classList.remove('spand');
    }

    this._resultsCharacter.scrollIntoView({
      behavior: 'smooth',
    });
  }

  renderLoadingMessage() {
    const statusContainer = this._aside.querySelector(
      '.message__status--container'
    );
    const markup = `<div class="message__status" role="alert"><p>Loading 🔃</p></div>`;
    statusContainer.style.display = 'block';
    statusContainer.innerHTML = markup;
  }

  renderErrorMessage(message) {
    const statusContainer = this._aside.querySelector(
      '.message__status--container'
    );

    const markup = `
    <div class="message__status" role="alert">
        <p>${message}</p>
    </div>`;

    statusContainer.style.display = 'block';
    // innerHTML will overwrite the statusContainer's content
    statusContainer.innerHTML = markup;
  }
}

export default new Intro();

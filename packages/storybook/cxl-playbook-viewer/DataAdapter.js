class DataAdapter {
  /**
   * @param {Object} apiData
   */
  constructor(apiData) {
    this.mockBio = '';
    this.apiData = apiData.data ? apiData.data : apiData;
  }

  /**
   *
   * @param { Array | undefined } obj
   * @return {number|number}
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  _getLength(obj) {
    if (!(obj instanceof Array)) {
      // eslint-disable-next-line no-console
      console.log(obj);
      throw new Error('object is not an array!');
    }
    return obj.length || 0;
  }

  /**
   *
   * @return {{userHasVoted: boolean, rating: number}}
   */
  getRatingData() {
    return {
      rating: this.getRating(),
      userHasVoted: this.getHasUserVoted()
    };
  }

  /**
   *
   * @return {number}
   */
  getRating() {
    if (!this.apiData.userVote) {
      return 0;
    }
    return parseFloat(this.apiData.userVote);
  }

  /**
   *
   * @return {boolean}
   */
  getHasUserVoted() {
    return Boolean(this.apiData.hasUserVoted);
  }

  /**
   *
   * @return {number}
   */
  getPlaybookTimestamp() {
    if (!this.apiData.datePosted || this.apiData.datePosted.length < 1) {
      // eslint-disable-next-line no-console
      console.warn('apiData.datePosted (Playbook date) is empty from API');
      return 0;
    }
    // eslint-disable-next-line radix
    return parseInt(this.apiData.datePosted) * 1000; // seconds(PHP) to miliseconds(JavaScript)
  }

  /**
   *
   * @return {string}
   */
  getPlaybookTitle() {
    if (!this.apiData.title || this.apiData.title.length < 1) {
      // eslint-disable-next-line no-console
      console.warn('apiData.title (Playbook title) is empty from API');
      return '';
    }
    return String(this.apiData.title);
  }

  /**
   *
   * @return {number}
   */
  getUserId() {
    // eslint-disable-next-line radix
    return parseInt(this.apiData.userId) || 0;
  }

  /**
   *
   * @return {{anchors: {active, href, content}[]}|{anchors: []}}
   */
  getBreadcrumbsData() {
    const breadCrumbs = this.apiData.breadcrumbs || [];
    const cnt = this._getLength(breadCrumbs);
    if (cnt < 1) {
      // eslint-disable-next-line no-console
      console.warn('apiData.breadcrumbs is empty from API');
      return {
        anchors: []
      };
    }
    const anchors = breadCrumbs.map((val, index) => {
      return {
        href: val.taxonomyName || '#',
        content: val.displayName || '[EMPTY_NAME]',
        active: !(index + 1 < cnt)
      };
    });
    return {
      anchors
    };
  }

  /**
   * @return {{items: []}|{items:{id: string, URL: string, Name: string}}}
   */
  getRelatedBlogs() {
    const relatedBlogs = this.apiData.relatedBlogs || [];
    return relatedBlogs;
  }

  /**
   * @return {{items: []}|{items:{id: string, Name: string}}}
   */
  getTools() {
    const tools = this.apiData.tools || [];
    return tools;
  }

  /**
   * @return {{items: []}|{items:{id: string, URL: string, Name: string}}}
   */
  getLessons() {
    const lessons = this.apiData.lessons || [];
    return lessons;
  }

  /**
   *
   * @return {{items: []}|{items: {itemContent: *, time: string, title: string}[]}}
   */
  getAccordionData() {
    const steps = this.apiData.steps || [];
    const cnt = this._getLength(steps);
    if (cnt < 1) {
      // eslint-disable-next-line no-console
      console.warn('apiData.steps (Playbook steps) is empty from API');
      return {
        items: []
      };
    }
    // eslint-disable-next-line no-unused-vars
    let items = steps.map((val, index) => {
      return {
        title: `${val.idx}. ${val.title}`,
        time: '[time_placeholder]',
        content: val.content || '[empty_content]'
      };
    });
    if (items.length < 1) {
      // eslint-disable-next-line no-console
      console.warn('items (Playbook steps) is empty');
      items = [];
    }
    return {
      items
    };
  }

  /**
   *
   * @param {*} personsCollection
   * @return {{items: []}|{items: {profileUrl: (string), avatarUrl: string, bio: string, id: number, email: string, username: string}[]}}
   * @private
   */
  _getPersonsCollection(personsCollection) {
    return personsCollection.map(this._getPersonAll);
  }

  /**
   *
   * @param dataObj
   * @return {{profileUrl: (string), avatarUrl: string, bio: string, id: number, email: string, username: string}}
   * @private
   */
  // eslint-disable-next-line class-methods-use-this
  _getPersonAll(dataObj) {
    const person = dataObj;
    if (!dataObj) {
      // eslint-disable-next-line no-console
      console.warn('person object is empty', dataObj);
      return null;
    }
    if (!person || person.displayName.length < 1) {
      // eslint-disable-next-line no-console
      console.warn('displayName is empty from API', dataObj);
      person.displayName = '';
    }
    if (!person.profilePicture || person.profilePicture.length < 1) {
      // eslint-disable-next-line no-console
      console.warn('profilePicture is empty from API', dataObj);
      person.profilePicture = '';
    }
    if (!person.bio || person.bio.length < 1) {
      // eslint-disable-next-line no-console
      console.warn('bio is empty from API', dataObj);
      person.bio = '';
    }
    return {
      id: person.id || 0,
      bio: person.bio || '',
      email: person.email || '',
      username: person.displayName || '',
      avatarUrl: person.profilePicture || '',
      profileUrl: person.profileUrl || '#'
    };
  }

  /**
   *
   * @return {{profileUrl: (string), avatarUrl: string, bio: string, id: number, email: string, username: string, timestamp: (number|*), likes: number}}
   */
  getAuthor() {
    const author = this._getPersonAll(this.apiData.author);
    return {
      ...author,
      bio: author.bio || this.mockBio
    };
  }

  /**
   *
   * @return null|{{profileUrl: (string), avatarUrl: string, bio: string, id: number, email: string, username: string}}
   */
  getEditor() {
    return this._getPersonAll(this.apiData.editor);
  }

  /**
   *
   * @return null|{{profileUrl: (string), avatarUrl: string, bio: string, id: number, email: string, username: string}}
   */
  getExpert() {
    const expert = this.apiData.expert[0] || null;
    return this._getPersonAll(expert);
  }

  /**
   * @return [] | array of {{profileUrl: (string), avatarUrl: string, bio: string, id: number, email: string, username: string}}
   */
  getExperts() {
    const experts = this.apiData.expert || [];
    return this._getPersonsCollection(experts);
  }

  /**
   * @return bool
   */
  getShouldHideAuthor() {
    return this.apiData.hideAuthor;
  }

  /**
   *
   * @return {string}
   */
  getEditorName() {
    const person = this.getEditor();
    if (person && person.username) {
      return person.username;
    }
    // eslint-disable-next-line no-console
    console.warn('apiData.editor.displayName is empty from API');
    return '';
  }

  /**
   *
   * @return {string}
   * @remove
   */
  getExpertName() {
    const person = this.getExpert();
    if (person && person.username) {
      return person.username;
    }
    // eslint-disable-next-line no-console
    console.warn('apiData.expert[x].displayName is empty from API');
    return '';
  }

  /**
   * @return {string}
   */
  getExpertsNames() {
    const persons = this.getExperts();
    if (!persons || !persons.length) return '';
    const names = [];
    for (let i = 0; i < persons.length; i += 1) {
      names.push(persons[i].username);
    }
    return names.join(', ');
  }

  /**
   *
   * @return {{description: ({description}|*|string)}}
   */
  getUseCase() {
    const str = this.apiData.useCase || '';
    if (!str || str.length < 1) {
      // eslint-disable-next-line no-console
      console.warn('apiData.useCase is empty from API');
    }
    return {
      description: str
    };
  }
}

export default DataAdapter;

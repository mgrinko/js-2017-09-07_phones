'use strict';

const HIDDEN_CLASS = 'js-hidden';

class Component {
  constructor(element) {
    this._element = element;
  }

  hide() {
    this._element.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._element.classList.remove(HIDDEN_CLASS);
  }
}
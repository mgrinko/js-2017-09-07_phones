'use strict';

const HIDDEN_CLASS = 'js-hidden';

export default class Component {
  constructor(element) {
    this._element = element;
  }

  hide() {
    this._element.classList.add(HIDDEN_CLASS);
  }

  show() {
    this._element.classList.remove(HIDDEN_CLASS);
  }

  on(eventName, callback, selector) {
    this._element.addEventListener(eventName, (event) => {
      if (selector && !event.target.closest(selector)) {
        return;
      }

      callback(event);
    });
  }

  _trigger(eventName, data) {
    let customEvent = new CustomEvent(eventName, {
      detail: data,
      bubbles: false,
    });

    this._element.dispatchEvent(customEvent);
  }
}
'use strict';

class PhoneCatalogue {
  constructor(options) {
    this._element = options.element;
    this._template = document.getElementById('template-phone-catalogue').innerHTML;

    this._render();
  }

  _render() {
    this._element.innerHTML = this._template;
  }
}
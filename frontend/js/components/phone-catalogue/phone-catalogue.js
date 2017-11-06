'use strict';

import style from './phone-catalogue.css';
import compiledTemplate from './phone-catalogue.hbs';
import Component from '../component.js';

export default class PhoneCatalogue extends Component {
  constructor(options) {
    super(options.element);

    this.on('click', this._onPhoneLinkClick.bind(this), '[data-element="phoneLink"]');
  }

  showPhones(phones) {
    this._render(phones);
    this.show();
  }

  _onPhoneLinkClick(event) {
    let phoneElement = event.target.closest('[data-element="phone"]');

    this._trigger('phoneSelected', phoneElement.dataset.phoneId);
  }

  _render(phones) {
    this._element.innerHTML = compiledTemplate({
      phones: phones
    });
  }
}

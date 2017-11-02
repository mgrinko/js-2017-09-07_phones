'use strict';

import Component from '../component.js'


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

    let customEvent = new CustomEvent('phoneSelected', {
      detail: phoneElement.dataset.phoneId,
      bubbles: false,
    });

    this._element.dispatchEvent(customEvent);
  }

  _render(phones) {
    let rawTemplate = document.getElementById('template-phone-catalogue').innerHTML;
    let compiledTemplate = _.template(rawTemplate);

    this._element.innerHTML = compiledTemplate({
      phones: phones
    });
  }
}

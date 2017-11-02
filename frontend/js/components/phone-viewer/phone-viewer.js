'use strict';

import compiledTemplate from './phone-viewer.hbs';
import Component from '../component.js'


export default class PhoneViewer extends Component {
  constructor(options) {
    super(options.element);

    this.on('click', this._onBackClick.bind(this), '[data-element="backButton"]')
  }

  showPhone(phone) {
    this._render(phone);
    this.show();
  }

  _onBackClick() {
    this._element.dispatchEvent(new CustomEvent('back'));
  }

  _render(phoneDetails) {
    this._element.innerHTML = compiledTemplate({
      phone: phoneDetails,
    });
  }
}
'use strict';

import compiledTemplate from './phone-viewer.hbs';
import Component from '../component.js';


export default class PhoneViewer extends Component {
  constructor(options) {
    super(options.element);

    this.on('click', this._onBackClick.bind(this), '[data-element="backButton"]');
    this.on('click', this._onAddClick.bind(this), '[data-element="addButton"]');
  }

  showPhone(phone) {
    this._phone = phone;
    this._render();
    this.show();
  }

  _onBackClick() {
    this._trigger('back');
  }

  _onAddClick() {
    this._trigger('add', this._phone);
  }

  _render() {
    this._element.innerHTML = compiledTemplate({
      phone: this._phone,
    });
  }
}
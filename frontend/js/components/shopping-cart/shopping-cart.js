'use strict';

import compiledTemplate from './shopping-cart.hbs';
import Component from '../component.js';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super(element);

    this._items = [];

    this._render();
  }

  addItem(item) {
    this._items.push(item);
    this._render();
  }

  _render() {
    this._element.innerHTML = compiledTemplate({
      items: this._items,
    });
  }
}
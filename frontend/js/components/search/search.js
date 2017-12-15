'use strict';

import template from './search.html';
import Component from '../component.js';

export default class Search extends Component {
  constructor({ element }) {
    super(element);

    this._render();

    this._field = this._element.querySelector('[data-element="searchField"]');


    this.on('input', this._onChange.bind(this), '[data-element="searchField"]');
  }

  addItem(item) {
    this._items.push(item);
    this._render();
  }

  _onChange() {
    this._trigger('search', this._field.value);
  }

  _render() {
    this._element.innerHTML = template;
  }
}
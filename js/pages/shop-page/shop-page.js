'use strict';

class ShopPage {
  constructor(options) {
    this._element = options.element;
    this._template = document.getElementById('template-shop-page').innerHTML;

    this._render();

    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phoneViewer"]'),
    });

    this._catalogue = new PhoneCatalogue({
      element: this._element.querySelector('[data-component="phoneCatalogue"]'),
    });

    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;

      this._viewer.showPhone(phoneId);
      this._viewer.show();
      this._catalogue.hide();
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalogue.show();
    });
  }

  _render() {
    this._element.innerHTML = this._template;
  }
}
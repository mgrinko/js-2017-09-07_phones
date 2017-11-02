'use strict';

import PhoneViewer from '../../components/phone-viewer/phone-viewer.js'
import PhoneCatalogue from '../../components/phone-catalogue/phone-catalogue.js'
import PhoneService from '../../services/phone-service.js'


export default class ShopPage {
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

    PhoneService.getAll()
      .then((phones) => {
        this._catalogue.showPhones(phones)
      });


    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;

      PhoneService.get(phoneId)
        .then((phone) => {
          this._showPhoneDetails(phone)
        });
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalogue.show();
    });
  }

  _render() {
    this._element.innerHTML = this._template;
  }

  _showPhoneDetails(phone) {
    this._viewer.showPhone(phone);
    this._catalogue.hide();
  }
}
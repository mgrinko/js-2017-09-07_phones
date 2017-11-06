'use strict';

import 'babel-polyfill';

import template from './shop-page.html';

import PhoneViewer from '../../components/phone-viewer/phone-viewer.js';
import PhoneCatalogue from '../../components/phone-catalogue/phone-catalogue.js';
import PhoneService from '../../services/phone-service.js';
import ShoppingCart from '../../components/shopping-cart/shopping-cart.js';
import Search from '../../components/search/search.js';

export default class ShopPage {
  constructor({ element }) {
    this._element = element;

    this._render();


    console.log(window.location.hash);




    this._catalogue = new PhoneCatalogue({
      element: this._element.querySelector('[data-component="phoneCatalogue"]'),
    });


    let phoneId = window.location.hash.slice(10);

    if (phoneId) {
      PhoneService.get(phoneId)
        .then((phone) => {
          this._showPhoneDetails(phone);
        });
    } else {
      PhoneService.getAll()
        .then((phones) => {
          this._catalogue.showPhones(phones)
        });
    }



    this._catalogue.on('phoneSelected', async (event) => {
      let phoneId = event.detail;

      let phone = await PhoneService.get(phoneId);

      this._showPhoneDetails(phone);
    });


    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phoneViewer"]'),
    });

    this._viewer.on('back', () => {
      this._viewer.hide();
      this._catalogue.show();

      window.history.back();

      PhoneService.getAll()
        .then((phones) => {
          this._catalogue.showPhones(phones)
        });
    });

    this._viewer.on('add', (event) => {
      let phone = event.detail;

      this._cart.addItem(phone.name);
    });



    this._cart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shoppingCart"]'),
    });


    this._search = new Search({
      element: this._element.querySelector('[data-component="search"]'),
    });

    this._search.on('search', async (event) => {
      let query = event.detail;

      let phones = await PhoneService.getAll({ query });

      // ToDo: remove when implemented on server
      phones = this._filterPhonesOnClient(phones, query);

      this._catalogue.showPhones(phones)
    });

  }

  _render() {
    this._element.innerHTML = template;
  }

  _showPhoneDetails(phone) {
    this._viewer.showPhone(phone);
    this._catalogue.hide();
  }

  _filterPhonesOnClient(phones, query) {
    let normalizedQuery = query.toLowerCase();

    return phones
      .filter((phone) => phone.name.toLowerCase().includes(normalizedQuery));
  }
}
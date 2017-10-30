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

    let phonesPromise = PhoneService.getAll();

    let documentClickPromise = new Promise((resolve, reject) => {
      document.addEventListener('click', () => {
        resolve();
      });
    });


    Promise.all([
      documentClickPromise,
      phonesPromise,
    ])
      .then(([ ,phones]) => {
        this._catalogue.showPhones(phones)
      });


    this._catalogue.on('phoneSelected', (event) => {
      let phoneId = event.detail;

      PhoneService.get(phoneId)
        .then((phone) => {
          this._showPhoneDetails(phones)
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
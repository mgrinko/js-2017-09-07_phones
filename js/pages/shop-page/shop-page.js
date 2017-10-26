'use strict';

let details = {
  "description": "Nexus S is the next generation of Nexus devices, co-developed by Google and Samsung. The latest Android platform (Gingerbread), paired with a 1 GHz Hummingbird processor and 16GB of memory, makes Nexus S one of the fastest phones on the market. It comes pre-installed with the best of Google apps and enabled with new and popular features like true multi-tasking, Wi-Fi hotspot, Internet Calling, NFC support, and full web browsing. With this device, users will also be the first to receive software upgrades and new Google mobile apps as soon as they become available. For more details, visit http://www.google.com/nexus.",
  "id": "nexus-s",
  "images": [
    "img/phones/nexus-s.0.jpg",
    "img/phones/nexus-s.1.jpg",
    "img/phones/nexus-s.2.jpg",
    "img/phones/nexus-s.3.jpg"
  ],
  "name": "Nexus S",
};

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
      let phone = this._getPhoneDetails(phoneId);

      this._viewer.showPhone(phone);
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

  _getPhoneDetails() {
    return details;
  }
}
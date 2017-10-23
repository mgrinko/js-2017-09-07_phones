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


class PhoneViewer extends Component {
  constructor(options) {
    super(options.element);

    this.on('click', this._onBackClick.bind(this), '[data-element="backButton"]')
  }

  showPhone(phoneId) {
    let phoneDetails = this._getPhoneDetails(phoneId);

    this._render(phoneDetails);
  }

  _onBackClick() {
    this._element.dispatchEvent(new CustomEvent('back'));
  }

  _render(phoneDetails) {
    let rawTemplate = document.getElementById('template-phone-viewer').innerHTML;
    let compiledTemplate = _.template(rawTemplate);

    this._element.innerHTML = compiledTemplate({
      phone: phoneDetails,
    });
  }

  _getPhoneDetails(phoneId) {
    // ToDo: replace with server call
    return details;
  }
}
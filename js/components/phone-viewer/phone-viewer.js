'use strict';




class PhoneViewer extends Component {
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
    let rawTemplate = document.getElementById('template-phone-viewer').innerHTML;
    let compiledTemplate = _.template(rawTemplate);

    this._element.innerHTML = compiledTemplate({
      phone: phoneDetails,
    });
  }
}
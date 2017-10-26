class PhoneService {
  static getAll(callback) {
    HttpService.sendRequest('phones/phones.json', {
      successCallback: callback
    });
  }

  static get(phoneId, callback) {
    HttpService.sendRequest(`phones/${ phoneId }.json`, {
      successCallback: callback
    });
  }
}
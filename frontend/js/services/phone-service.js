'use strict';

import HttpService from './http-service.js';


export default class PhoneService {
  static getAll() {
    return HttpService.sendRequest('phones/phones.json');
  }

  static get(phoneId) {
    return HttpService.sendRequest(`phones/${ phoneId }.json`);
  }
}
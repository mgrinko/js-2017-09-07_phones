const API_BASE_URL = 'http://localhost:3000/server/data/';
// const API_BASE_URL = 'https://mgrinko.github.io/js-2017-09-07_phones/server/data/';

export default class HttpService {
  static sendRequest(url, { method = 'GET' } = {}) {

    return fetch(API_BASE_URL + url, { method })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);

        return Promise.reject(error);
      });

  }
}

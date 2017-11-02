const API_BASE_URL = 'http://localhost:8080/server/data/';

class HttpService {
  static sendRequest(url, { method = 'GET' } = {}) {

    return fetch(API_BASE_URL + url, { method })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);

        return Promise.reject(error);
      });

  }
}

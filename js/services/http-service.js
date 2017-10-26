const API_BASE_URL = 'http://localhost:8080/server/data/';

class HttpService {
  static sendRequest(url, { method = 'GET', successCallback = () => {} } = {}) {
    let xhr = new XMLHttpRequest();

    xhr.open(method, API_BASE_URL + url, true);

    xhr.onload = () => {
      if (xhr.status !== 200) {
        console.error( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
      } else {
        let data = JSON.parse(xhr.responseText);

        successCallback(data);
      }
    };

    xhr.send();
  }
}

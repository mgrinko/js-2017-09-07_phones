const API_BASE_URL = 'http://localhost:8080/server/data/';

class HttpService {
  static sendRequest(url, { method = 'GET' } = {}) {


      return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();

        xhr.open(method, API_BASE_URL + url, true);

        xhr.onload = () => {
          if (xhr.status !== 200) {
            reject( xhr.status + ': ' + xhr.statusText );
          } else {
            let data = JSON.parse(xhr.responseText);

            resolve(data);
          }
        };

        xhr.onerror = () => {
          reject( xhr.status + ': ' + xhr.statusText );
        };

        xhr.send();
      });


  }
}

/**
 * Handles HTTP Requests to our API
 */
class HttpLib {
  /**
   * 
   * @param {string} method HTTP Request method we want here (GET, POST, PUT, DELETE)
   * @param {string} url api endpoint url
   * @param {object} data we want to pass (when add, update or delete) 
   */
   async request(method, url, data) {
    method = method.toUpperCase();

    if (method === 'GET') {
        return this._getRequest(url);
    } else if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      return this._postPutDeleteRequests(method, url, data);
    } else {
      throw "HttpLib unknown method passed into request";
    }
  }

  async _getRequest(url) {
    const rawResponse = await fetch(url);
    const content = await rawResponse.json();
    return content;
  }

  async _postPutDeleteRequests(method, url, data) {
    const rawResponse = await fetch(url, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const content = await rawResponse.json();
    return content;
  }
 }

export const httplib = new HttpLib(); 
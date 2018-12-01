/**
 * Handles HTTP Requests
 */
class Api {

  /**
   * Fetch/Get data
   * 
   * @param {string} url endpoint url
   */
  async get(url) {
    const rawResponse = await fetch(url);
    const content = await rawResponse.json();
    return content;
  }

  // HTTP POST
  async post(url, data) {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const content = await rawResponse.json();
    return content;
  }

   // HTTP PUT
   async put(url, data) {
    const rawResponse = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const content = await rawResponse.json();
    return content;
  }

  // HTTP DELETE
  async delete(url, data) {
    const rawResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const content = await rawResponse.json();
    return content;
  }
 }

export const api = new Api(); 
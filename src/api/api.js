export { Api };
const axios = require('axios').default;

class Api {
  static token;

  static get baseUrl() {
    return 'http://127.0.0.1:8080/api';
  }


  static get timeout() {
    return 60 * 1000;
  }

  static async fetch(url, secure, init = {}, controller) {
    if (secure && Api.token) {
      if (!init.headers)
        init.headers = {};

      init.headers['Authorization'] = `bearer ${Api.token}`;
    }

    controller = controller || new AbortController();
    const timer = setTimeout(() => controller.abort(), Api.timeout);
    init.signal = controller.signal

    try {
      const response = await fetch(url, init);
      const text = await response.text();
      const result = text ? (JSON).parse(text) : {};
      if (result.code)
        throw result;

      return result;
    } catch (error) {
      if (!error.code) {
       console.log("ERRRRRRRRRRRRRRRR");
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  static async get(url) {
    return await axios.get(url).catch(error => {
        if (!error.code) {
            error = { "code": 99, "description": error.message.toLowerCase() };
        }
        throw error;
    });
  }



  static async post(url, data) {
    return await axios.post(url, JSON.stringify(data));

  }

  static async put(url, data) {
    return await axios.put(url, JSON.stringify(data));
  }

  static async delete(url) {
    return await axios.delete(url);
  }
}

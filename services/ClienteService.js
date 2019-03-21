const rp = require('request-promise');

const API_KEY = 'maro_bem@hotmail.com';

class ClienteService {
  static getClienteByEmail(email) {
    if (!email) {
      throw new Error('Email deve ser informado!');
    }

//    const options = {
//      uri: `http://isbndb.com/api/v2/json/${API_KEY}/book/${isbn}`,
//      json: true,
//    };
//
//    return rp.get(options).then((response) => {
//      if (response.error) {
//        return {};
//      }
//
//      const {
//        title, author_data, publisher_name, language,
//      } = response.data[0];
//
//      return {
//        title,
//        authors: author_data.map(author => author.name).join(';'),
//        publisher: publisher_name,
//        language,
//      };
    });
  }
}

module.exports = ClienteService;
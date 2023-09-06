const url = "api/cards/";
class CardService {
  static getByName(name) {
    return new Promise((resolve, reject) => {
      try {
        fetch(`${url}/${name}`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            resolve(res);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static getTags(set, number) {
    return new Promise((resolve, reject) => {
      try {
        fetch(`${url}/${set}/${number}`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            resolve(res);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static getByTags(tags) {
    const tagsString = tags.toString().replace(/,/g, " ");
    return new Promise((resolve, reject) => {
      try {
        fetch(`${url}/tags/${tagsString}`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            resolve(res);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static getRandom(colors) {
    return new Promise((resolve, reject) => {
      try {
        fetch(`${url}/random/${colors}`)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            resolve(res);
          });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default CardService;

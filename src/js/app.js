import json from './parser.js';
import read from './reader.js';

export class GameSaving {
  constructor(data) {
    this.id = data.id;
    this.created = data.created;
    this.userInfo = {
      id: data.userInfo.id,
      name: data.userInfo.name,
      level: data.userInfo.level,
      points: data.userInfo.points
    };
  }
}

export default class GameSavingLoader {
  static load() {
    let result = read()
      .then(buffer => json(buffer))
      .then(jsonString => {
        const parseData = JSON.parse(jsonString);
        return new GameSaving({
          id: parseData.id,
          created: parseData.created,
          userInfo: {
            id: parseData.userInfo.id,
            name: parseData.userInfo.name,
            level: parseData.userInfo.level,
            points: parseData.userInfo.points
          }
        });
      })
      .catch(err => {
        throw new Error('ошибка: ' + err);
      });
    return result;
  }
}

// GameSavingLoader.load()
//   .then((saving) => {
//     // Успешная загрузка: working with GameSaving object
//     console.log('ID сохранения:', saving.id);
//     console.log('Имя пользователя:', saving.userInfo.name);
//     console.log('Уровень:', saving.userInfo.level);
//   })
//   .catch((error) => {
//     // Обработка ошибки
//     console.log('Ошибка:', error.message);
//   });

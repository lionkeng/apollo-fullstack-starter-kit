import knex from './connector'

export default class Photo {
  getPhoto(photoName) {
    return knex('photo').first();
  }
}

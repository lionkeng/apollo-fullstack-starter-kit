export function seed(knex, Promise) { // eslint-disable-line import/prefer-default-export
  return Promise.all([
    knex('photo').del(),
  ])
  .then(() => {
    return Promise.all(
      knex('photo').insert({ name: "Vacation Home", location: "The Alps",
        fname: "scenic1" }),
    );
  });
}


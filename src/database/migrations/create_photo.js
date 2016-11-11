export function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('photo', (table) => {
      table.increments();
      table.timestamps();
      table.string('name');
      table.string('location');
      table.string('fname');
    }),
  ]);
}

export function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('photo'),
  ]);
}

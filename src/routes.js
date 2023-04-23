/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const { addBookHandler, getAllBooksHandler, getBookByIdHandler } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => 'Homepage',
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => 'Halaman tidak ditemukan',
  },
];

module.exports = routes;

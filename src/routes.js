/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
const { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler } = require('./handler');

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
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: () => editBookByIdHandler,
  },
  {
    method: '*',
    path: '/{any*}',
    handler: (request, h) => 'Halaman tidak ditemukan',
  },
];

module.exports = routes;

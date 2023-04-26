/* eslint-disable linebreak-style */
/* eslint-disable radix */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage) ? 'true' : 'false';
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };
  books.push(newBook);

  let messages;
  let isSuccess;
  if (name.length === 0) {
    messages = 'Gagal menambahkan buku. Mohon isi nama buku';
  } else if (parseInt(`${readPage}`) > parseInt(`${pageCount}`)) {
    messages = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
  } else {
    isSuccess = 'true';
    messages = 'Buku berhasil ditambahkan';
  }

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: messages,
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  if (!isSuccess) {
    const response = h.response({
      status: 'fail',
      message: messages,
    });
    response.code(400);
    return response;
  }

  response.code(500);
  return response;
};

const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books,
  },
});

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler };

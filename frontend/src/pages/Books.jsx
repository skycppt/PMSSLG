import { useEffect, useState } from "react";

import { getAllBooks } from "../services/bookService";

import BookTable from "../components/books/BookTable";
import BookSearch from "../components/books/BookSearch";
import BookModal from "../components/books/BookModal";
import DeleteBookModal from "../components/books/DeleteBookModal";
import StockModal from "../components/books/StockModal";


function Books() {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteBookId, setDeleteBookId] = useState(null);
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {

      const response = await getAllBooks();

      setBooks(response);

    } catch (error) {
      console.log(error);
    }
  };

  const [stockModalOpen, setStockModalOpen] = useState(false);
  const filteredBooks = books.filter((book) => {

  const keyword = search.toLowerCase();


  return (
    book.title.toLowerCase().includes(keyword) ||
    book.author.toLowerCase().includes(keyword) ||
    book.publisher.toLowerCase().includes(keyword) ||
    book.language.toLowerCase().includes(keyword) ||
    book.genre.toLowerCase().includes(keyword)
  );

});
  const handleEdit = (book) => {
  setSelectedBook(book);
  setShowModal(true);
};
const handleDelete = (id) => {
  setDeleteBookId(id);
};

  return (
    <div>

      <div className="flex justify-between items-center mb-8">
        <div>
        <h1 className="text-3xl font-bold">
          Books
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your publication inventory
        </p>
      </div>

        <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            + Add Book
        </button>

        <button
            onClick={() => setStockModalOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
        >
            📦 Add Stock
        </button>

      </div>

      <BookSearch
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <BookTable books={filteredBooks} onEdit={handleEdit} onDelete={handleDelete}/>
      {showModal && (
        <BookModal
          onClose={() => {
            setShowModal(false);
            setSelectedBook(null);
          }}
          onBookAdded={fetchBooks}
          book={selectedBook}
        />
      )}

      {stockModalOpen && (
          <StockModal
            onClose={() => setStockModalOpen(false)}
            onStockAdded={fetchBooks}
          />
        )}
      {deleteBookId && (
        <DeleteBookModal
          bookId={deleteBookId}
          onDeleted={fetchBooks}
          onClose={() => setDeleteBookId(null)}
        />
        )}

    </div>
  );
}


export default Books;
function BookSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search by title, author, publisher, language or genre..."
      value={value}
      onChange={onChange}
      className="w-full mb-6 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default BookSearch;
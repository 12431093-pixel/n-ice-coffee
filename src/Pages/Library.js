import React, { useState } from 'react';
import { libraryBooks } from '../Data/MenuData';

const Library = () => {
  const [books] = useState(libraryBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [requestForm, setRequestForm] = useState({ name: '', email: '', bookTitle: '' });

  const handleOpenForm = (book) => {
    setSelectedBook(book);
    setRequestForm({ ...requestForm, bookTitle: book.title });
  };

  const handleCloseForm = () => {
    setSelectedBook(null);
    setRequestForm({ name: '', email: '', bookTitle: '' });
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    alert(`Thank you ${requestForm.name}! Your request for "${requestForm.bookTitle}" has been logged. The book will be made available in a few days.`);
    handleCloseForm();
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark display-6">📚 In-House Library Tracker</h2>
        <p className="text-muted">Explore over 50 shelf classics. If a title is marked as borrowed, submit a return inquiry form.</p>
      </div>

      <div className="card shadow-sm border-0 bg-white p-4" style={{ maxHeight: '600px', overflowY: 'scroll' }}>
        <table className="table table-hover align-middle">
          <thead className="table-dark sticky-top">
            <tr>
              <th>Book Title</th>
              <th>Author Name</th>
              <th>Current Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="fw-bold text-dark">{book.title}</td>
                <td className="text-secondary">{book.author}</td>
                <td>
                  <span className={`badge px-3 py-2 ${book.status === 'Available' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {book.status}
                  </span>
                </td>
                <td className="text-center">
                  {book.status === 'Available' ? (
                    <button className="btn btn-outline-success btn-sm disabled w-100" style={{ maxWidth: '160px' }}>Ready to Read</button>
                  ) : (
                    <button className="btn btn-dark btn-sm shadow-sm w-100" style={{ maxWidth: '160px' }} onClick={() => handleOpenForm(book)}>
                      Request Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBook && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
          <div className="card p-4 shadow-lg border-0 bg-white" style={{ width: '100%', maxWidth: '450px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <h5 className="fw-bold text-dark m-0">📋 Return Request Form</h5>
              <button type="button" className="btn-close" onClick={handleCloseForm}></button>
            </div>
            <form onSubmit={handleSubmitRequest}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Book Title</label>
                <input type="text" className="form-control bg-light" value={requestForm.bookTitle} readOnly />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Your Name</label>
                <input type="text" className="form-control" required value={requestForm.name} onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">Email Address</label>
                <input type="email" className="form-control" required value={requestForm.email} onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })} />
              </div>
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-light w-50" onClick={handleCloseForm}>Cancel</button>
                <button type="submit" className="btn btn-warning w-50 fw-bold text-dark shadow-sm">Request Book</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;

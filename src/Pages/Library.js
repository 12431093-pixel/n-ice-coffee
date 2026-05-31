import React, { useState } from 'react';
import { libraryBooks } from '../Data/MenuData';

const Library = () => {
  const [books] = useState(libraryBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [formType, setFormType] = useState(''); // 'borrow', 'return', or 'custom'
  const [requestForm, setRequestForm] = useState({ name: '', email: '', bookTitle: '' });

  // Filter books dynamically based on name input
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Opens form to borrow a book sitting on the shelf
  const handleOpenBorrowForm = (book) => {
    setSelectedBook(book);
    setFormType('borrow');
    setRequestForm({ name: '', email: '', bookTitle: book.title });
  };

  // Opens form for an existing book that is currently checked out
  const handleOpenBorrowedForm = (book) => {
    setSelectedBook(book);
    setFormType('return');
    setRequestForm({ name: '', email: '', bookTitle: book.title });
  };

  // Opens form for a completely missing book
  const handleOpenCustomForm = () => {
    setSelectedBook(true);
    setFormType('custom');
    setRequestForm({ name: '', email: '', bookTitle: searchTerm });
  };

  const handleCloseForm = () => {
    setSelectedBook(null);
    setFormType('');
    setRequestForm({ name: '', email: '', bookTitle: '' });
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (formType === 'borrow') {
      alert(`Success! "${requestForm.bookTitle}" is registered to ${requestForm.name}. Please remember it must be returned within a maximum of 3 weeks!`);
    } else if (formType === 'return') {
      alert(`Thank you ${requestForm.name}! Your return alert request for "${requestForm.bookTitle}" has been logged. We will email you when it's back on shelves.`);
    } else {
      alert(`Thank you ${requestForm.name}! Your custom acquisition request for "${requestForm.bookTitle}" has been logged. The book will be made available in a few days.`);
    }
    handleCloseForm();
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark display-6">📚 In-House Library Tracker</h2>
        <p className="text-muted">Explore our catalog, search for titles, or register a loan checkout.</p>
      </div>

      {/* Controlled Search Bar Component */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-dark text-white">🔍</span>
            <input 
              type="text" 
              className="form-control form-control-lg" 
              placeholder="Search books by title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Scenario A: Search Results are Present */}
      {filteredBooks.length > 0 ? (
        <div className="card shadow-sm border-0 bg-white" style={{ maxHeight: '500px', overflowY: 'auto' }}>
          <table className="table table-hover align-middle mb-0">
            <thead className="sticky-top" style={{ top: 0, zIndex: 10 }}>
              <tr>
                <th className="text-white ps-4 py-3" style={{ backgroundColor: '#212529', borderBottom: '2px solid #ffc107' }}>Book Title</th>
                <th className="text-white py-3" style={{ backgroundColor: '#212529', borderBottom: '2px solid #ffc107' }}>Author Name</th>
                <th className="text-white py-3" style={{ backgroundColor: '#212529', borderBottom: '2px solid #ffc107' }}>Current Status</th>
                <th className="text-white pe-4 py-3 text-center" style={{ backgroundColor: '#212529', borderBottom: '2px solid #ffc107' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td className="fw-bold text-dark ps-4 py-3">{book.title}</td>
                  <td className="text-secondary py-3">{book.author}</td>
                  <td className="py-3">
                    <span className={`badge px-3 py-2 ${book.status === 'Available' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {book.status}
                    </span>
                  </td>
                  <td className="text-center pe-4 py-3">
                    {book.status === 'Available' ? (
                      <button className="btn btn-success btn-sm shadow-sm w-100" style={{ maxWidth: '160px' }} onClick={() => handleOpenBorrowForm(book)}>
                        Borrow Book
                      </button>
                    ) : (
                      <button className="btn btn-outline-dark btn-sm w-100" style={{ maxWidth: '160px' }} onClick={() => handleOpenBorrowedForm(book)}>
                        Request Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Scenario B: Book Not Found falling back to procurement interface */
        <div className="text-center p-5 bg-white rounded shadow-sm border">
          <div className="fs-1 mb-2">📖❌</div>
          <h4 className="fw-bold text-muted mb-3">"{searchTerm}" is not found on our shop's shelves</h4>
          <p className="text-secondary mb-4 mx-auto" style={{maxWidth: '500px'}}>
            We can source it for you! Click the button below to submit a custom reading acquisition form, and our baristas will stock it within a few days.
          </p>
          <button className="btn btn-warning btn-lg fw-bold text-dark shadow-sm" onClick={handleOpenCustomForm}>
            Require This Book
          </button>
        </div>
      )}

      {/* Dynamic Pop-up Modal Form Overlay Layer */}
      {selectedBook && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
          <div className="card p-4 shadow-lg border-0 bg-white" style={{ width: '100%', maxWidth: '450px' }}>
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
              <h5 className="fw-bold text-dark m-0">
                {formType === 'borrow' && "📋 Book Borrow Checkout"}
                {formType === 'return' && "📋 Return Alert Request"}
                {formType === 'custom' && "📋 Custom Book Sourcing Request"}
              </h5>
              <button type="button" className="btn-close" onClick={handleCloseForm}></button>
            </div>
            
            <form onSubmit={handleSubmitRequest}>
              {/* Notice conditions for Loan Duration Terms inside the card */}
              {formType === 'borrow' && (
                <div className="alert alert-info py-2 px-3 small fw-bold mb-3">
                  ⚠️ Notice: The maximum loan period for this item is exactly 3 weeks.
                </div>
              )}

              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Book Name</label>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  required
                  value={requestForm.bookTitle} 
                  onChange={(e) => setRequestForm({ ...requestForm, bookTitle: e.target.value })}
                  readOnly={formType !== 'custom'}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Your Full Name</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={requestForm.name} 
                  onChange={(e) => setRequestForm({ ...requestForm, name: e.target.value })} 
                />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">Email Address</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required 
                  value={requestForm.email} 
                  onChange={(e) => setRequestForm({ ...requestForm, email: e.target.value })} 
                />
              </div>
              <div className="d-flex gap-2">
                <button type="button" className="btn btn-light w-50" onClick={handleCloseForm}>Cancel</button>
                <button type="submit" className="btn btn-warning w-50 fw-bold text-dark shadow-sm">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;

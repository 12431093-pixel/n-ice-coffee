import React, { useState } from 'react';
import { libraryBooks } from '../Data/MenuData';

const Library = () => {
  const [books] = useState(libraryBooks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isCustomRequest, setIsCustomRequest] = useState(false);
  const [requestForm, setRequestForm] = useState({ name: '', email: '', bookTitle: '' });

  // Filter books dynamically based on name input
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Opens form for an existing book that is borrowed
  const handleOpenBorrowedForm = (book) => {
    setSelectedBook(book);
    setIsCustomRequest(false);
    setRequestForm({ name: '', email: '', bookTitle: book.title });
  };

  // Opens form for a completely new missing book
  const handleOpenCustomForm = () => {
    setIsCustomRequest(true);
    setSelectedBook(true); // Triggers the modal visibility overlay
    setRequestForm({ name: '', email: '', bookTitle: searchTerm });
  };

  const handleCloseForm = () => {
    setSelectedBook(null);
    setIsCustomRequest(false);
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
        <p className="text-muted">Explore our catalog or search for a specific title below.</p>
      </div>

      {/* Controlled Text Search Input Filter Element */}
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
        <div className="card shadow-sm border-0 bg-white p-4" style={{ maxHeight: '500px', overflowY: 'scroll' }}>
          <table className="table table-hover align-middle mb-0">
            {/* PERMANENT FIX: Hardcoded Solid Hex Color values ensure zero transparency overlaps on render loops */}
            <thead className="sticky-top" style={{ top: 0, zIndex: 10 }}>
              <tr>
                <th className="text-white py-3" style={{ backgroundColor: '#212529', borderBottom: '2px solid #ffc107' }}>Book Title</th>
                <th className="text-white py-3" style={{ backgroundColor: '#212529', borderBottom: '2px solid #ffc107' }}>Author Name</th>
                <th className="text-white py-3" style={{ backgroundColor: '#212529', borderBottom: '2px solid #ffc107' }}>Current Status</th>
                <th className="text-white py-3 text-center" style={{ backgroundColor: '#212529', borderBottom: '2px solid #ffc107' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
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
                      <button className="btn btn-dark btn-sm shadow-sm w-100" style={{ maxWidth: '160px' }} onClick={() => handleOpenBorrowedForm(book)}>
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
        /* Scenario B: Dynamic Condition Met - Book Not Found Action Trigger Interface */
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
                {isCustomRequest ? "📋 Custom Book Sourcing Form" : "📋 Return Request Form"}
              </h5>
              <button type="button" className="btn-close" onClick={handleCloseForm}></button>
            </div>
            
            <form onSubmit={handleSubmitRequest}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Book Name</label>
                <input 
                  type="text" 
                  className="form-control bg-light" 
                  required
                  value={requestForm.bookTitle} 
                  onChange={(e) => setRequestForm({ ...requestForm, bookTitle: e.target.value })}
                  readOnly={!isCustomRequest}
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

import React, { useState } from 'react';

const Contact = () => {
  const [booking, setBooking] = useState({ name: '', date: '', guests: '1' });
  const [bookRequest, setBookRequest] = useState({ title: '', author: '' });
  const [receiptMessage, setReceiptMessage] = useState('');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setReceiptMessage(`Reservation confirmed for ${booking.name}! We have reserved a workspace for ${booking.guests} guest(s) on ${booking.date.replace('T', ' ')}.`);
    setBooking({ name: '', date: '', guests: '1' });
  };

  const handleBookRequestSubmit = (e) => {
    e.preventDefault();
    setReceiptMessage(`Library request logged! Our team will acquire "${bookRequest.title}" by ${bookRequest.author || 'Unknown Author'} and secure it on our shelves.`);
    setBookRequest({ title: '', author: '' });
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark display-6">Connect with Our Sanctuary Hub</h2>
        <p className="text-muted">Reserve high-focus workspaces or request unlisted books to be added to our library shelves.</p>
      </div>

      {receiptMessage && (
        <div className="alert alert-success text-center shadow-sm fw-bold p-3 mb-5 border-2 rounded">
          {receiptMessage}
        </div>
      )}

      <div className="row g-5">
        <div className="col-md-6">
          <div className="card p-4 border-0 shadow-sm bg-white h-100">
            <h4 className="fw-bold text-dark mb-3 border-bottom pb-2">🪑 Table & Reading Desk Booking</h4>
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Full Name</label>
                <input type="text" className="form-control form-control-lg" required value={booking.name} onChange={(e) => setBooking({ ...booking, name: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">Target Date & Time Selection</label>
                <input type="datetime-local" className="form-control form-control-lg" required value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">Desk Scale / Workspace Size</label>
                <select className="form-select form-select-lg" value={booking.guests} onChange={(e) => setBooking({ ...booking, guests: e.target.value })}>
                  <option value="1">1 Person (Individual Focus Nook)</option>
                  <option value="2">2 Persons (Shared Study Desk)</option>
                  <option value="4">4 Persons (Collaborative Group Table)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-dark btn-lg w-100 fw-bold shadow-sm">Lock Workspace Reservation</button>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-4 border-0 shadow-sm bg-dark text-white h-100">
            <h4 className="fw-bold text-warning mb-3 border-bottom pb-2">📋 Missing Shelf Library Request</h4>
            <form onSubmit={handleBookRequestSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-warning">Book Title Required</label>
                <input type="text" className="form-control form-control-lg bg-light text-dark" required value={bookRequest.title} onChange={(e) => setBookRequest({ ...bookRequest, title: e.target.value })} />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-warning">Author Name (Optional)</label>
                <input type="text" className="form-control form-control-lg bg-light text-dark" value={bookRequest.author} onChange={(e) => setBookRequest({ ...bookRequest, author: e.target.value })} />
              </div>
              <p className="text-muted small mb-4">
                * Our librarians trace verified registries to ensure your reading materials are sourced prior to your arrival.
              </p>
              <button type="submit" className="btn btn-warning btn-lg w-100 fw-bold text-dark shadow-sm">Submit Library Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

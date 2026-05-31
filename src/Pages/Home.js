import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container my-5">
      {/* 1. WELCOME HERO SECTION - Text fixed to remove duplicate challenge mentions */}
      <div className="p-5 mb-5 bg-dark text-white rounded-3 shadow text-center position-relative overflow-hidden">
        <div className="py-4">
          <h1 className="display-4 fw-bold text-warning mb-3">Sip, Study & Read at N-Ice-Coffee</h1>
          <p className="fs-5 mx-auto text-light" style={{ maxWidth: '700px' }}>
            Welcome to Lebanon's premier workspace sanctuary. Enjoy premium specialty coffee blends, settle down with a hot drink, and find your quiet space inside our library reading room.
          </p>
          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/menu" className="btn btn-warning btn-lg px-4 fw-bold shadow-sm">Explore Our Menu</Link>
            <Link to="/library" className="btn btn-outline-light btn-lg px-4">Browse Shelf Books</Link>
          </div>
        </div>
      </div>

      {/* 2. BALANCED GRID CONTENT SECTION */}
      <div className="row g-4 align-items-stretch mb-5">
        {/* Card A: The Literary Reading Sanctuary */}
        <div className="col-md-6">
          <div className="card h-100 p-4 border-0 shadow-sm bg-white d-flex flex-column justify-content-between">
            <div>
              <h3 className="fw-bold text-dark mb-3">📚 The Sanctuary Reading Room</h3>
              <p className="text-muted">
                Step away from the crowd. Our dedicated in-house library features over 50 classic and modern literature titles. Find your high-focus corner to study, draft research, or unwind with an engaging story.
              </p>
            </div>
            <img 
              src="/library.jpg" 
              className="img-fluid rounded shadow-sm mt-3" 
              alt="Reading Space Library" 
              style={{ height: '220px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Card B: The Speed Drink Challenge */}
        <div className="col-md-6">
          <div className="card h-100 p-4 border-0 shadow-sm text-white bg-dark d-flex flex-column justify-content-between">
            <div>
              <h3 className="fw-bold text-danger mb-3">⏱️ The Epic 30s Speed Challenge</h3>
              <p className="text-light opacity-75">
                Think you have what it takes? Order a blistering hot espresso, join the arena, and finish it before the countdown timer hits zero! Successful speed runs unlock a flat 15% markdown code valid across all menu orders for 3 consecutive months.
              </p>
            </div>
            <div className="bg-secondary bg-opacity-25 p-3 rounded border border-secondary my-3 text-center">
              <span className="fs-3 fw-bold text-warning font-monospace">00:30 SECONDS</span>
            </div>
            <div className="mt-auto">
              <Link to="/challenge" className="btn btn-outline-warning w-100 fw-bold py-2">Open Challenge Arena</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DEDICATED STUDENT PRIVILEGE SECTION */}
      <div className="p-4 mb-4 bg-light rounded-3 border border-warning shadow-sm">
        <div className="container-fluid py-2">
          <div className="row align-items-center">
            <div className="col-lg-9">
              <h3 className="fw-bold text-dark mb-1">🎓 Special Academic Privilege Active</h3>
              <p className="text-secondary mb-3 mb-lg-0">
                Are you currently enrolled at university? Toggle our student identification system during workspace registration or library book checkout to automatically unlock a flat 20% discount on study desk fees and extend your book borrowing limit from 3 weeks to 6 weeks!
              </p>
            </div>
            <div className="col-lg-3 text-lg-end">
              <Link to="/contact" className="btn btn-dark btn-lg fw-bold px-4 shadow-sm w-100">Book Study Desk</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

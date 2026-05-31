import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container my-5">
      <div className="p-5 mb-5 bg-dark text-white rounded-3 shadow text-center">
        <h1 className="display-4 fw-bold text-warning mb-3">Chill, Read, and Sip at N-Ice-Coffee</h1>
        <p className="fs-5 mx-auto text-light" style={{ maxWidth: '700px' }}>
          Discover Lebanon's premier workspace fusion. Enjoy handcrafted premium specialty blends while accessing an integrated literary sanctuary.
        </p>
        <div className="mt-4">
          <Link to="/menu" className="btn btn-warning btn-lg px-4 me-md-2 fw-bold">Explore Our Menu</Link>
          <Link to="/challenge" className="btn btn-outline-light btn-lg px-4">Take the Challenge</Link>
        </div>
      </div>

      <div className="row g-4 align-items-stretch">
        <div className="col-md-6">
          <div className="card h-100 p-4 border-0 shadow-sm bg-white">
            <h3 className="fw-bold text-dark mb-3">📚 The Sanctuary Reading Room</h3>
            <p className="text-muted">
              Step away from the noise. Our quiet reading nook holds hundreds of curated titles across fiction, tech, philosophy, and historical classics. Find your safe space to study or relax.
            </p>
            <img src="https://unsplash.com" className="img-fluid rounded mt-auto pt-3" alt="Reading Space Library" />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 p-4 border-0 shadow-sm text-white bg-dark">
            <h3 className="fw-bold text-warning mb-3">⏱️ The Epic 30s Speed Drink Challenge</h3>
            <p className="text-light">
              Think you have what it takes? Finish our blistering hot fresh artisan coffee in under 30 seconds. Succeed and instantly score a 15% discount code valid across all menu orders for 3 consecutive months.
            </p>
            <div className="mt-auto pt-4">
              <Link to="/challenge" className="btn btn-outline-warning w-100 fw-bold">Open Challenge Arena</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import { coffeeMenu } from '../Data/MenuData';

const Menu = () => {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark display-6">Our Handcrafted Cafe Menu</h2>
        <p className="text-muted">Freshly roasted, sustainably sourced beans, extracted perfectly to match your reading rhythm.</p>
      </div>

      <div className="row g-4">
        {coffeeMenu.map((item) => (
          <div className="col-sm-12 col-md-6 col-lg-4" key={item.id}>
            <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white">
              <div className="position-relative">
                <img src={item.image} className="w-100" alt={item.name} style={{ height: '240px', objectFit: 'cover' }} />
                <span className={`position-absolute top-0 end-0 m-3 badge px-3 py-2 ${item.category === 'Hot' ? 'bg-danger' : 'bg-primary'}`}>
                  {item.category}
                </span>
              </div>
              <div className="card-body d-flex flex-column justify-content-between p-4">
                <div>
                  <h5 className="card-title fw-bold text-dark mb-2">{item.name}</h5>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                  <span className="text-muted small">Price per serving</span>
                  <span className="text-success fw-bold fs-4">{item.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

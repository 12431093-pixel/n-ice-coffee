import React, { useState } from 'react';
import { coffeeMenu } from '../Data/MenuData';

const Menu = () => {
  const [quantities, setQuantities] = useState({});

  const handleIncrement = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const handleDecrement = (itemId) => {
    if ((quantities[itemId] || 0) > 0) {
      setQuantities((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1
      }));
    }
  };

  const handlePlaceOrder = (item) => {
    const qty = quantities[item.id] || 0;
    if (qty === 0) return;

    alert(`🛒 Order Confirmed!\n\nItem: ${item.name}\nQuantity: ${qty} serving(s)\n\nOur baristas are preparing your items!`);
    
    setQuantities((prev) => ({
      ...prev,
      [item.id]: 0
    }));
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark display-6">Our Handcrafted Cafe Menu</h2>
        <p className="text-muted">Freshly roasted, premium blends and artisan pastries matching your reading rhythm.</p>
      </div>

      <div className="row g-4">
        {coffeeMenu && coffeeMenu.map((item) => {
          const currentQty = quantities[item.id] || 0;
          
          return (
            <div className="col-sm-12 col-md-6 col-lg-4" key={item.id}>
              <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white d-flex flex-column justify-content-between">
                <div>
                  <div className="position-relative d-flex align-items-center justify-content-center p-3 bg-light" style={{ height: '220px' }}>
                    <img 
                      src={item.image} 
                      className="img-fluid" 
                      alt={item.name} 
                      style={{ maxHeight: '180px', objectFit: 'contain' }} 
                    />
                    <span className={`position-absolute top-0 end-0 m-3 badge px-3 py-2 ${item.category === 'Hot' ? 'bg-danger' : 'bg-primary'}`}>
                      {item.category}
                    </span>
                  </div>
                  <div className="card-body p-4">
                    <h5 className="card-title fw-bold text-dark mb-0">{item.name}</h5>
                  </div>
                </div>
                
                <div className="card-footer bg-white border-0 px-4 pb-4 pt-0">
                  <div className="d-flex justify-content-between align-items-center mb-3 pt-2 border-top">
                    <span className="text-muted small">Price per serving</span>
                    <span className="text-success fw-bold fs-4">{item.price}</span>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mb-3 p-2 bg-light rounded border">
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-secondary fw-bold px-3" 
                      onClick={() => handleDecrement(item.id)}
                      disabled={currentQty <= 0}
                    >
                      −
                    </button>
                    <span className="mx-4 fw-bold fs-5 text-dark" style={{ minWidth: '20px', textAlign: 'center' }}>
                      {currentQty}
                    </span>
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-secondary fw-bold px-3" 
                      onClick={() => handleIncrement(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <button 
                    className={`btn w-100 fw-bold py-2 shadow-sm ${currentQty > 0 ? 'btn-warning text-dark' : 'btn-secondary text-white disabled'}`} 
                    onClick={() => handlePlaceOrder(item)}
                    disabled={currentQty <= 0}
                  >
                    {currentQty > 0 ? `Order Now (${currentQty})` : 'Select Quantity'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;

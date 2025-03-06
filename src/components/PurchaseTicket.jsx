import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PurchaseTicket.css';

const PurchaseTicket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  const [formData, setFormData] = useState({
    quantity: 1,
    name: '',
    email: '',
    phone: '',
  });

  if (!event) {
    return (
      <div className="purchase-error">
        <h2>Error: Event not found</h2>
        <button onClick={() => navigate('/events')}>Return to Events</button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    // and ticket reservation with your backend
    console.log('Processing purchase:', {
      event,
      ...formData,
      totalPrice: event.price * formData.quantity
    });

    // For now, we'll just show a success message
    alert('Purchase successful! Check your email for tickets.');
    navigate('/events');
  };

  return (
    <div className="purchase-page">
      <div className="purchase-container">
        <div className="event-summary">
          <img src={event.image} alt={event.title} />
          <h2>{event.title}</h2>
          <p className="event-details">
            {event.date} at {event.time}<br />
            {event.location}
          </p>
          <p className="ticket-price">${event.price.toFixed(2)} per ticket</p>
        </div>

        <form onSubmit={handleSubmit} className="purchase-form">
          <h3>Purchase Details</h3>
          
          <div className="form-group">
            <label htmlFor="quantity">Number of Tickets</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={event.availableTickets}
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="order-summary">
            <h4>Order Summary</h4>
            <div className="summary-row">
              <span>Tickets ({formData.quantity})</span>
              <span>${(event.price * formData.quantity).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(event.price * formData.quantity).toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="purchase-btn">
            Complete Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseTicket;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faMapMarkerAlt,
  faTicketAlt,
  faClock,
  faMinus,
  faPlus,
  faArrowLeft,
  faCreditCard,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import './PurchaseTicket.css';

const PurchaseTicket = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // Mock event data - in a real app, this would come from an API or props
  const event = {
    id: eventId,
    title: "Tech Conference 2025",
    date: "2025-05-15",
    time: "09:00 AM",
    location: "Convention Center, Silicon Valley",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    availableTickets: 50,
    description: "Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops."
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const subtotal = event.price * quantity;
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + serviceFee;

  const handleGoBack = () => {
    navigate('/events');
  };

  const handleCheckout = () => {
    // Handle payment processing here
    alert('Payment processing would happen here!');
  };

  return (
    <div className="purchase-page">
      <button className="back-button" onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span>Back to Events</span>
      </button>

      <div className="purchase-container">
        <div className="event-details">
          <img src={event.image} alt={event.title} className="event-image" />
          <div className="event-info">
            <h1>{event.title}</h1>
            <div className="info-grid">
              <div className="info-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="info-item">
                <FontAwesomeIcon icon={faClock} />
                <span>{event.time}</span>
              </div>
              <div className="info-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>{event.location}</span>
              </div>
              <div className="info-item">
                <FontAwesomeIcon icon={faTicketAlt} />
                <span>{event.availableTickets} tickets available</span>
              </div>
            </div>
            <p className="event-description">{event.description}</p>
          </div>
        </div>

        <div className="purchase-summary">
          <h2>Order Summary</h2>
          <div className="quantity-selector">
            <span>Number of Tickets</span>
            <div className="quantity-controls">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="quantity-btn"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
                className="quantity-btn"
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
          </div>

          <div className="price-breakdown">
            <div className="price-row">
              <span>Ticket Price</span>
              <span>${event.price.toFixed(2)} × {quantity}</span>
            </div>
            <div className="price-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="price-row">
              <span>Service Fee</span>
              <span>${serviceFee.toFixed(2)}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="secure-checkout">
            <FontAwesomeIcon icon={faLock} className="secure-icon" />
            <span>Secure Checkout</span>
          </div>

          <button className="checkout-btn" onClick={handleCheckout}>
            <FontAwesomeIcon icon={faCreditCard} />
            <span>Proceed to Payment</span>
          </button>

          <p className="max-tickets-note">
            <FontAwesomeIcon icon={faTicketAlt} />
            <span>Maximum 10 tickets per order</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicket;

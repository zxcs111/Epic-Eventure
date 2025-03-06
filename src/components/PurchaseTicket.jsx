import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faTicketAlt, 
  faClock, 
  faArrowLeft, 
  faUser, 
  faEnvelope, 
  faPhone, 
  faCommentAlt 
} from '@fortawesome/free-solid-svg-icons';
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
    specialRequirements: ''
  });

  const [step, setStep] = useState(1);

  if (!event) {
    return (
      <div className="purchase-error">
        <h2>Error: Event not found</h2>
        <button onClick={() => navigate('/events')} className="return-btn">
          <FontAwesomeIcon icon={faArrowLeft} /> Return to Events
        </button>
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
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
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
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      window.scrollTo(0, 0);
    } else {
      navigate('/events');
    }
  };

  return (
    <div className="purchase-page">
      <div className="purchase-header">
        <Link to="/events" className="back-to-events">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Events
        </Link>
        <nav className="purchase-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/#about" className="nav-link">About</Link>
          <Link to="/#contact" className="nav-link">Contact</Link>
        </nav>
      </div>

      <div className="purchase-title">
        <h1>Purchase Tickets</h1>
        <p>Complete your booking for this amazing event</p>
      </div>

      <div className="purchase-container">
        <div className="event-summary">
          <div className="event-image-container">
            <img src={event.image} alt={event.title} />
            <div className="event-badge">{event.category}</div>
          </div>
          <h2>{event.title}</h2>
          
          <div className="event-details">
            <div className="detail-item">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <div>
                <span className="detail-label">Date</span>
                <span className="detail-value">{event.date}</span>
              </div>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faClock} />
              <div>
                <span className="detail-label">Time</span>
                <span className="detail-value">{event.time}</span>
              </div>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <div>
                <span className="detail-label">Location</span>
                <span className="detail-value">{event.location}</span>
              </div>
            </div>
            <div className="detail-item">
              <FontAwesomeIcon icon={faTicketAlt} />
              <div>
                <span className="detail-label">Available</span>
                <span className="detail-value">{event.availableTickets} tickets</span>
              </div>
            </div>
          </div>

          <div className="event-description">
            <h3>About This Event</h3>
            <p>{event.description}</p>
          </div>

          {event.features && (
            <div className="event-features">
              <h3>Event Features</h3>
              <div className="features-list">
                {event.features.map((feature, index) => (
                  <div key={index} className="feature-item">{feature}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="purchase-form-container">
          <div className="form-header">
            <h2>{step === 1 ? 'Ticket Selection' : 'Contact Information'}</h2>
            <div className="step-indicator">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
              <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="purchase-form">
            {step === 1 ? (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="quantity">Number of Tickets</label>
                  <div className="quantity-input">
                    <button 
                      type="button" 
                      onClick={() => handleInputChange({ target: { name: 'quantity', value: Math.max(1, formData.quantity - 1) } })}
                      className="quantity-btn"
                      disabled={formData.quantity <= 1}
                    >−</button>
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
                    <button 
                      type="button"
                      onClick={() => handleInputChange({ target: { name: 'quantity', value: Math.min(event.availableTickets, formData.quantity + 1) } })}
                      className="quantity-btn"
                      disabled={formData.quantity >= event.availableTickets}
                    >+</button>
                  </div>
                </div>

                <div className="ticket-summary">
                  <div className="summary-row">
                    <span>Price per ticket</span>
                    <span>${event.price.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Quantity</span>
                    <span>× {formData.quantity}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>${(event.price * formData.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-step">
                <div className="form-group">
                  <label htmlFor="name">
                    <FontAwesomeIcon icon={faUser} /> Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} /> Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <FontAwesomeIcon icon={faPhone} /> Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialRequirements">
                    <FontAwesomeIcon icon={faCommentAlt} /> Special Requirements (Optional)
                  </label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or requests?"
                    rows="4"
                  ></textarea>
                </div>

                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>{event.title}</span>
                    <span>{formData.quantity} × ${event.price.toFixed(2)}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount</span>
                    <span>${(event.price * formData.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                onClick={handleBack} 
                className="back-button"
              >
                {step === 1 ? 'Cancel' : 'Back'}
              </button>
              <button 
                type="submit" 
                className="next-button"
              >
                {step === 1 ? 'Continue to Contact Info' : 'Complete Purchase'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTicket;

import React, { useState, useEffect } from 'react';
import './App.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FaHistory, FaUser } from 'react-icons/fa';

const images = [
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b', // Concert
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', // Festival
  'https://images.unsplash.com/photo-1517649763962-0c623066013b', // Sports
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', // Workshop
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac', // Community
];

const events = [
  {
    id: 1,
    title: 'Summer Music Festival',
    description: 'Join us for an unforgettable night of music and fun under the stars.',
    date: 'July 15, 2024',
    time: '7:00 PM',
    location: 'Central Park, New York',
    price: '$50',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    type: 'Music',
    speaker: 'John Doe', // Add speaker
  },
  {
    id: 2,
    title: 'Tech Conference 2024',
    description: 'Explore the latest trends in technology and innovation.',
    date: 'August 20, 2024',
    time: '9:00 AM',
    location: 'San Francisco Convention Center',
    price: '$100',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
    type: 'Tech',
    speaker: 'Jane Smith', // Add speaker
  },
  {
    id: 3,
    title: 'Marathon Run',
    description: 'Run for a cause and push your limits in this city-wide marathon.',
    date: 'September 10, 2024',
    time: '6:00 AM',
    location: 'Downtown Chicago',
    price: '$30',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    type: 'Sport',
    speaker: 'Michael Johnson', // Add speaker
  },
];

const purchaseHistory = [
  {
    id: 1,
    eventTitle: 'Summer Music Festival',
    date: 'July 15, 2024',
    time: '7:00 PM',
    location: 'Central Park, New York',
    price: '$50',
    description: 'Join us for an unforgettable night of music and fun under the stars.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
  },
  {
    id: 2,
    eventTitle: 'Tech Conference 2024',
    date: 'August 20, 2024',
    time: '9:00 AM',
    location: 'San Francisco Convention Center',
    price: '$100',
    description: 'Explore the latest trends in technology and innovation.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  },
  {
    id: 3,
    eventTitle: 'Marathon Run',
    date: 'September 10, 2024',
    time: '6:00 AM',
    location: 'Downtown Chicago',
    price: '$30',
    description: 'Run for a cause and push your limits in this city-wide marathon.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b',
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPurchaseHistoryOpen, setIsPurchaseHistoryOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePurchaseHistory = () => {
    setIsPurchaseHistoryOpen(!isPurchaseHistoryOpen);
  };

  const handlePurchaseDetailsClick = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const closePurchaseDetails = () => {
    setSelectedPurchase(null);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeEventDetails = () => {
    setSelectedEvent(null);
    setTicketQuantity(1);
  };

  const handleTicketQuantityChange = (e) => {
    setTicketQuantity(parseInt(e.target.value, 10));
  };

  const handlePurchase = () => {
    alert(`You have successfully purchased ${ticketQuantity} ticket(s) for ${selectedEvent.title}.`);
    closeEventDetails();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="App">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-brand">EvenTure</div>
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
          <a href="#">Events</a>
          <a href="#purchase-history" onClick={(e) => { e.preventDefault(); togglePurchaseHistory(); }}><FaHistory /></a>
          <a href="#login"><FaUser /></a>
        </div>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>

      {/* Purchase History Slider */}
      <div className={`purchase-history-slider ${isPurchaseHistoryOpen ? 'open' : ''}`}>
        <button className="close-slider" onClick={togglePurchaseHistory}>×</button>
        <h2>Purchase History</h2>
        <div className="purchase-list">
          {purchaseHistory.map((purchase) => (
            <div className="purchase-item" key={purchase.id} onClick={() => handlePurchaseDetailsClick(purchase)}>
              <img src={purchase.image} alt={purchase.eventTitle} />
              <div className="purchase-details">
                <h3>{purchase.eventTitle}</h3>
                <p>{purchase.date}</p>
                <p>{purchase.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchase Details Pop-up */}
      {selectedPurchase && (
        <div className="purchase-details-popup">
          <div className="popup-content">
            <button className="close-popup" onClick={closePurchaseDetails}>×</button>
            <div className="popup-header">
              <img src={selectedPurchase.image} alt={selectedPurchase.eventTitle} className="popup-image" />
              <h3>{selectedPurchase.eventTitle}</h3>
              <p className="event-date">{selectedPurchase.date} • {selectedPurchase.time}</p>
            </div>
            <div className="popup-details">
              <div className="detail-item">
                <span className="detail-icon">📍</span>
                <span>{selectedPurchase.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">📄</span>
                <span>{selectedPurchase.description}</span>
              </div>
              <div className="detail-item">
                <span className="detail-icon">🎟️</span>
                <span><strong>Tickets Bought:</strong> {selectedPurchase.tickets}</span>
              </div>
            </div>
            <div className="popup-footer">
              <button className="btn btn-primary">Download Tickets</button>
            </div>
          </div>
        </div>
      )}

      {/* Event Details Pop-up */}
      {selectedEvent && (
      <div className="event-details-popup">
        <div className="popup-content">
          <button className="close-popup" onClick={closeEventDetails}>×</button>
          <div className="popup-header">
            <img src={selectedEvent.image} alt={selectedEvent.title} className="popup-image" />
            <h3>{selectedEvent.title}</h3>
            <p className="event-date">{selectedEvent.date} • {selectedEvent.time}</p>
          </div>
          <div className="popup-details">
            <div className="detail-item">
              <span className="detail-icon">🎤</span>
              <span><strong>Speaker:</strong> {selectedEvent.speaker}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <span><strong>Venue:</strong> {selectedEvent.location}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span><strong>Date:</strong> {selectedEvent.date}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">⏰</span>
              <span><strong>Time:</strong> {selectedEvent.time}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🎟️</span>
              <span><strong>Ticket Price:</strong> {selectedEvent.price}</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📄</span>
              <span><strong>Description:</strong> {selectedEvent.description}</span>
            </div>
          </div>
          <div className="popup-footer">
            <button className="btn-primary" onClick={handlePurchase}>Purchase Tickets</button>
          </div>
        </div>
      </div>
    )}

      {/* Home Section */}
      <section id="home">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Event ${index + 1}`} />
              <div className="carousel-text">
                <h1>Welcome to EvenTure</h1>
                <p>Your ultimate event management solution</p>
                <div className="button-container">
                  <button className="btn view-events" onClick={() => scrollToSection('events')}>View Events</button>
                  <button className="btn get-started">Get Started</button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5" alt="About Us" />
          </div>
          <div className="about-content">
            <h2>About Us</h2>
            <p>
              EvenTure is your go-to platform for discovering and managing events. Whether you're looking to attend a concert, join a workshop, or participate in a marathon, we've got you covered. Our mission is to make event planning and participation seamless and enjoyable.
            </p>
            <p>
              We believe in creating memorable experiences for everyone. From small community gatherings to large-scale festivals, EvenTure connects you with events that matter. Join us and be part of a vibrant community that celebrates life and shared experiences.
            </p>
            <button className="btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎉</div>
            <h3>Wide Range of Events</h3>
            <p>From concerts to workshops, we offer a diverse selection of events to suit every interest.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Event Management</h3>
            <p>Our platform makes it simple to organize, promote, and manage your events efficiently.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>Memorable Experiences</h3>
            <p>We focus on creating unforgettable moments for both attendees and organizers.</p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="events-section">
  <h2>Featured Events</h2>
  <div className="events-grid">
    {events.map((event) => (
      <div className="event-card" key={event.id} onClick={() => handleEventClick(event)}>
        <img src={event.image} alt={event.title} />
        <div className="event-type">{event.type}</div> {/* Event type badge */}
        <div className="event-card-content">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <div className="event-details">
            <span className="date">{event.date}</span>
            <span className="time">{event.time}</span>
            <span className="location">{event.location}</span>
          </div>
          <div className="event-price">{event.price}</div> {/* Ticket Price */}
          <button className="btn">
            <span className="icon">🔍</span> {/* Icon added */}
            View Details
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Inquiries Section */}
      <section id="contact" className="inquiries-section">
        <div className="inquiries-container">
          <h2>Have Questions? Get in Touch!</h2>
          <p>
            We're here to help! Whether you have questions about our events, need assistance, or want to collaborate, feel free to reach out.
          </p>
          <form className="inquiries-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
          <div className="contact-details">
            <p>Or contact us directly:</p>
            <p>Email: <a href="mailto:info@eventure.com">info@eventure.com</a></p>
            <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
            <a href="#events" onClick={(e) => { e.preventDefault(); scrollToSection('events'); }}>Events</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
          <div className="social-media">
            <a href="https://facebook.com" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
          <p>&copy; Developed by Johnlloyd Justiniane. 2025 EvenTure. All rights reserved. </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
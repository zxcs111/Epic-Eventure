import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import EventPage from './components/EventPage'; 
import PurchaseTicket from './components/PurchaseTicket';
import PurchaseHistory from './components/PurchaseHistory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faInfoCircle, 
  faEnvelope, 
  faCalendarAlt, 
  faTicketAlt, 
  faUsers, 
  faGlobe, 
  faHandshake,
  faSearch,
  faArrowRight,
  faPhone,
  faMapMarkerAlt,
  faHistory
} from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  let lastScrollY = 0;
  const [isPurchaseHistoryOpen, setIsPurchaseHistoryOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Handle navbar visibility
      if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY = currentScrollY;

      // Handle navbar background
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="App">
        <header className={`event-page-header ${visible ? '' : 'hidden'} ${scrolled ? 'scrolled' : ''}`}>
          <div className="logo">
            <h1>Epic Eventure</h1>
          </div>
          <nav className="event-nav">
            <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
            <Link to="/events" className="nav-link">
              <FontAwesomeIcon icon={faCalendarAlt} /> Events
            </Link>
            <Link to="/#about" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}>
              <FontAwesomeIcon icon={faInfoCircle} /> About
            </Link>
            <Link to="/#contact" className="nav-link" onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}>
              <FontAwesomeIcon icon={faEnvelope} /> Contact
            </Link>
            <button 
              className="nav-link history-btn"
              onClick={() => setIsPurchaseHistoryOpen(true)}
              title="Purchase History"
            >
              <FontAwesomeIcon icon={faHistory} />
            </button>
          </nav>
        </header>

        <Routes>
          {/* Home route (App.jsx content) */}
          <Route
            path="/"
            element={
              <>
                <LandingImage />
                <AboutSection />
                <FeaturedEvents />
                <ContactSection />
                <Footer />
              </>
            }
          />
          {/* Events route (EventPage.jsx) */}
          <Route path="/events" element={<EventPage />} />
          <Route path="/purchase/:eventId" element={<PurchaseTicket />} />
        </Routes>
      </div>
      <PurchaseHistory 
        isOpen={isPurchaseHistoryOpen} 
        onClose={() => setIsPurchaseHistoryOpen(false)} 
      />
    </Router>
  );
};

// LandingImage Component
const LandingImage = () => {
  const navigate = useNavigate();
  
  return (
    <section className="landing-image" id="landing">
      <div className="landing-overlay">
        <div className="landing-text">
          <h2>Discover Extraordinary Events</h2>
          <p>Join thousands of others in experiencing unforgettable moments</p>
          <div className="landing-buttons">
            <button 
              className="cta-button primary"
              onClick={() => navigate('/events')}
            >
              Explore Events <FontAwesomeIcon icon={faArrowRight} />
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => navigate('/events')}
            >
              <FontAwesomeIcon icon={faTicketAlt} /> Buy Tickets
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// AboutSection Component
const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="section-header">
        <h2>About Epic Eventure</h2>
        <p className="section-subtitle">Your gateway to extraordinary experiences</p>
      </div>
      <div className="about-content">
        <p className="about-description">
          Welcome to Epic Eventure, your go-to platform for discovering and attending the most exciting events in your area. 
          Whether you're looking for concerts, workshops, or community gatherings, we've got you covered. 
          Join us and be part of unforgettable experiences!
        </p>
        <div className="about-features">
          <div className="feature">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <h3>Why Choose Us?</h3>
            <p>
              We curate the best events to ensure you have access to unique and memorable experiences. 
              From local meetups to international festivals, we bring the world to your doorstep.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faGlobe} />
            </div>
            <h3>Our Mission</h3>
            <p>
              Our mission is to connect people through shared experiences. We believe in the power of events 
              to inspire, educate, and bring communities together.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faHandshake} />
            </div>
            <h3>Join the Community</h3>
            <p>
              Become part of a growing community of event enthusiasts. Share your experiences, 
              discover new interests, and make lifelong connections.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// FeaturedEvents Component
const FeaturedEvents = () => {
  const navigate = useNavigate();
  
  return (
    <section className="featured-events">
      <h2>Featured Events</h2>
      <div className="featured-grid">
        <div className="featured-card">
          <img 
            src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800" 
            alt="Music Festival 2025" 
            className="featured-image"
          />
          <div className="featured-content">
            <h3 className="featured-title">Music Festival 2025</h3>
            <div className="featured-details">
              <div className="featured-detail">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>July 15, 2025</span>
              </div>
              <div className="featured-detail">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>Central Park, New York</span>
              </div>
            </div>
            <p className="featured-description">
              Experience the biggest music festival of the year featuring top artists from around the globe. Don't miss out on this unforgettable weekend!
            </p>
            <div className="featured-actions">
              <button className="featured-view-btn">
                <span>View Details</span>
                <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>

        <div className="featured-card">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800" 
            alt="Tech Conference 2025" 
            className="featured-image"
          />
          <div className="featured-content">
            <h3 className="featured-title">Tech Conference 2025</h3>
            <div className="featured-details">
              <div className="featured-detail">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>August 20, 2025</span>
              </div>
              <div className="featured-detail">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>San Francisco, CA</span>
              </div>
            </div>
            <p className="featured-description">
              Join industry leaders and innovators at the premier tech conference of the year. Explore the future of technology and network with experts.
            </p>
            <div className="featured-actions">
              <button className="featured-view-btn">
                <span>View Details</span>
                <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>

        <div className="featured-card">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" 
            alt="Art Exhibition" 
            className="featured-image"
          />
          <div className="featured-content">
            <h3 className="featured-title">Art Exhibition</h3>
            <div className="featured-details">
              <div className="featured-detail">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span>September 10, 2025</span>
              </div>
              <div className="featured-detail">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span>London, UK</span>
              </div>
            </div>
            <p className="featured-description">
              Immerse yourself in a world of creativity at our annual art exhibition. Discover stunning works from emerging and established artists.
            </p>
            <div className="featured-actions">
              <button className="featured-view-btn">
                <span>View Details</span>
                <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ContactSection Component
const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <h2>Contact Us</h2>
        <p className="section-subtitle">We'd love to hear from you</p>
      </div>
      <div className="contact-container">
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>Have questions or need assistance? Our team is here to help you with any inquiries about events or our platform.</p>
          <div className="contact-details">
            <p><FontAwesomeIcon icon={faEnvelope} /> info@epiceventure.com</p>
            <p><FontAwesomeIcon icon={faPhone} /> +1 (555) 123-4567</p>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Event Street, New York, NY 10001</p>
          </div>
        </div>
        <div className="contact-form">
          <form>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Epic Eventure</h2>
          <p>Your gateway to extraordinary experiences</p>
        </div>
        <div className="footer-links">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/#about">About Us</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/events">Music</Link></li>
              <li><Link to="/events">Technology</Link></li>
              <li><Link to="/events">Arts</Link></li>
              <li><Link to="/events">Sports</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">Facebook</a>
              <a href="#" className="social-icon">Twitter</a>
              <a href="#" className="social-icon">Instagram</a>
              <a href="#" className="social-icon">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Epic Eventure. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default App;
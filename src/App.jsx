import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import EventPage from './components/EventPage'; 
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
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';


const App = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <div className="App">
        <header className={`event-page-header ${visible ? '' : 'hidden'}`}>
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
        </Routes>
      </div>
    </Router>
  );
};

// LandingImage Component
const LandingImage = () => {
  const navigate = useNavigate();
  
  return (
    <section className="landing-image" id="landing">
      <img
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        alt="Epic Eventure Landing"
      />
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
  
  const featuredEvents = [
    {
      title: "Music Festival 2025",
      date: "July 15, 2025",
      location: "Central Park, New York",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
      description: "Experience the biggest music festival of the year featuring top artists from around the globe. Don't miss out on this unforgettable weekend!"
    },
    {
      title: "Tech Conference 2025",
      date: "August 20, 2025",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      description: "Join industry leaders and innovators at the premier tech conference of the year. Explore the future of technology and network with experts."
    },
    {
      title: "Art Exhibition",
      date: "September 10, 2025",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
      description: "Immerse yourself in a world of creativity at our annual art exhibition. Discover stunning works from emerging and established artists."
    }
  ];

  return (
    <section className="featured-events" id="featured">
      <div className="section-header">
        <h2>Featured Events</h2>
        <p className="section-subtitle">Handpicked experiences you don't want to miss</p>
      </div>
      <div className="event-list">
        {featuredEvents.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
      <div className="view-all-container">
        <button 
          className="view-all-button"
          onClick={() => navigate('/events')}
        >
          <FontAwesomeIcon icon={faCalendarAlt} className="button-icon" />
          View All Events
          <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
        </button>
      </div>
    </section>
  );
};

// EventCard Component
const EventCard = ({ title, date, location, image, description }) => {
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate(`/events`);
  };

  return (
    <div className="event-card" onClick={handleEventClick}>
      <div className="event-image-container">
        <img src={image} alt={title} className="event-image" />
        <div className="image-overlay"></div>
      </div>
      <div className="event-details">
        <h3>{title}</h3>
        <div className="event-info">
          <div className="event-info-item">
            <FontAwesomeIcon icon={faCalendarAlt} className="event-icon" />
            <span>{date}</span>
          </div>
          <div className="event-info-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="event-icon" />
            <span>{location}</span>
          </div>
        </div>
        <p className="event-description">{description}</p>
        <button className="event-button">
          <FontAwesomeIcon icon={faTicketAlt} className="button-icon" />
          View Details
          <FontAwesomeIcon icon={faArrowRight} className="arrow-icon" />
        </button>
      </div>
    </div>
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
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faUsers, 
  faLightbulb, 
  faHandshake,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
  faMapMarkedAlt,
  faArrowRight,
  faTicket,
  faMusic,
  faTheaterMasks,
  faRunning
} from '@fortawesome/free-solid-svg-icons';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const carouselImages = [
    'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b', // Concert
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', // Festival
    'https://images.unsplash.com/photo-1517649763962-0c623066013b', // Sports
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', // Workshop
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac', // Community
  ];

  return (
    <div className="event-page">
      <header className={`event-page-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <h1>Epic Eventure</h1>
        </div>
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>
        <nav className={`event-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a>
          <a href="#events" className="nav-link" onClick={closeMobileMenu}>Events</a>
          <a href="#about" className="nav-link" onClick={closeMobileMenu}>About Us</a>
          <a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a>
        </nav>
      </header>

      <section className="hero-section" id="home">
        <Slider {...carouselSettings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Carousel ${index + 1}`} className="carousel-image" />
              <div className="hero-content">
                <h1>Discover Amazing Events</h1>
                <p>Join thousands of people in unforgettable experiences across the globe</p>
                <div className="hero-buttons">
                  <a href="#events" className="hero-btn primary">
                    Explore Events <FontAwesomeIcon icon={faArrowRight} />
                  </a>
                  <a href="#about" className="hero-btn secondary">
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      <section className="about-section" id="about">
        <div className="about-header">
          <h2>About Epic Eventure</h2>
          <p className="about-subtitle">Your gateway to extraordinary experiences</p>
        </div>
        <p className="about-description">
          Welcome to Epic Eventure, your go-to platform for discovering and attending the most exciting events in your area. Whether you're looking for concerts, workshops, or community gatherings, we've got you covered. Join us and be part of unforgettable experiences!
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <FontAwesomeIcon icon={faUsers} className="feature-icon" />
            <h3>Why Choose Us?</h3>
            <p>We curate the best events to ensure you have access to unique and memorable experiences. From local meetups to international festivals, we bring the world to your doorstep.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faLightbulb} className="feature-icon" />
            <h3>Our Mission</h3>
            <p>Our mission is to connect people through shared experiences. We believe in the power of events to inspire, educate, and bring communities together.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faHandshake} className="feature-icon" />
            <h3>Join the Community</h3>
            <p>Become part of a growing community of event enthusiasts. Share your experiences, discover new interests, and make lifelong connections.</p>
          </div>
        </div>
      </section>

      <section className="featured-events" id="events">
        <div className="featured-events-header">
          <h2>Featured Events</h2>
          <p>Discover our handpicked selection of must-attend events</p>
        </div>
        <div className="events-grid">
          <div className="event-card">
            <img src="/images/music-festival.jpg" alt="Summer Music Festival" className="event-image" />
            <div className="event-details">
              <span className="event-category">
                <FontAwesomeIcon icon={faMusic} /> Music
              </span>
              <h3 className="event-title">Summer Music Festival 2025</h3>
              <div className="event-meta">
                <span><FontAwesomeIcon icon={faCalendarAlt} /> July 15-17, 2025</span>
                <span><FontAwesomeIcon icon={faMapMarkerAlt} /> Central Park, NY</span>
                <span><FontAwesomeIcon icon={faTicket} /> From $99</span>
              </div>
              <a href="/events/summer-music-festival" className="view-details">
                View Details <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>

          <div className="event-card">
            <img src="/images/theater-show.jpg" alt="Broadway Theater Show" className="event-image" />
            <div className="event-details">
              <span className="event-category">
                <FontAwesomeIcon icon={faTheaterMasks} /> Theater
              </span>
              <h3 className="event-title">Broadway Spectacular</h3>
              <div className="event-meta">
                <span><FontAwesomeIcon icon={faCalendarAlt} /> August 5, 2025</span>
                <span><FontAwesomeIcon icon={faMapMarkerAlt} /> Broadway Theater</span>
                <span><FontAwesomeIcon icon={faTicket} /> From $149</span>
              </div>
              <a href="/events/broadway-spectacular" className="view-details">
                View Details <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>

          <div className="event-card">
            <img src="/images/marathon.jpg" alt="City Marathon" className="event-image" />
            <div className="event-details">
              <span className="event-category">
                <FontAwesomeIcon icon={faRunning} /> Sports
              </span>
              <h3 className="event-title">City Marathon 2025</h3>
              <div className="event-meta">
                <span><FontAwesomeIcon icon={faCalendarAlt} /> September 20, 2025</span>
                <span><FontAwesomeIcon icon={faMapMarkerAlt} /> Downtown Circuit</span>
                <span><FontAwesomeIcon icon={faTicket} /> From $75</span>
              </div>
              <a href="/events/city-marathon" className="view-details">
                View Details <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-header">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>Have questions or need assistance? Our team is here to help you with any inquiries about events or our platform.</p>
              <div className="contact-details">
                <p><FontAwesomeIcon icon={faEnvelope} /> info@epiceventure.com</p>
                <p><FontAwesomeIcon icon={faPhone} /> +1 (555) 123-4567</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Event Street, New York, NY 10001</p>
              </div>
            </div>
            <form className="contact-form">
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
                <textarea id="message" placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className="send-message">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Epic Eventure</h3>
            <p>Your gateway to extraordinary experiences</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Categories</h4>
            <ul>
              <li><a href="#music">Music</a></li>
              <li><a href="#technology">Technology</a></li>
              <li><a href="#arts">Arts</a></li>
              <li><a href="#sports">Sports</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Epic Eventure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
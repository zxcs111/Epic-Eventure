import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import EventPage from './components/EventPage'; // Import the EventPage component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faInfoCircle, 
  faEnvelope, 
  faCalendarAlt, 
  faTicketAlt, 
  faUsers, 
  faGlobe, 
  faHandshake 
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
        <header className={`header ${visible ? '' : 'hidden'}`}>
          <div className="header-content">
            <h1>Epic Eventure</h1>
            <nav>
              <ul>
                <li onClick={() => scrollToSection('landing')}>Home</li>
                <li>
                  <Link to="/events" className="nav-link">Events</Link> {/* Add class */}
                </li>
                <li onClick={() => scrollToSection('about')}>About</li>
                <li onClick={() => scrollToSection('contact')}>Contact</li>
              </ul>
            </nav>
          </div>
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
  return (
    <section className="landing-image" id="landing">
      <img
        src="landingimage.jpg" // Replace with your image URL
        alt="Eventure Awaits Landing"
      />
      <div className="landing-overlay">
        <div className="landing-text">
          <h2>Discover Exciting Events</h2>
          <p>Join thousands of others in experiencing unforgettable moments.</p>
          <div className="landing-buttons">
            <button className="cta-button">Get Started</button>
            <button className="cta-button secondary">Buy Tickets</button>
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
      <div className="about-content">
        <h2>About Eventure Awaits</h2>
        <p>
          Welcome to Eventure Awaits, your go-to platform for discovering and attending the most exciting events in your area. 
          Whether you're looking for concerts, workshops, or community gatherings, we've got you covered. 
          Join us and be part of unforgettable experiences!
        </p>
        <div className="about-features">
          <div className="feature">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faUsers} size="2x" />
            </div>
            <h3>Why Choose Us?</h3>
            <p>
              We curate the best events to ensure you have access to unique and memorable experiences. 
              From local meetups to international festivals, we bring the world to your doorstep.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faGlobe} size="2x" />
            </div>
            <h3>Our Mission</h3>
            <p>
              Our mission is to connect people through shared experiences. We believe in the power of events 
              to inspire, educate, and bring communities together.
            </p>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <FontAwesomeIcon icon={faHandshake} size="2x" />
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
  return (
    <section className="featured-events">
      <h2>Featured Events</h2>
      <div className="event-list">
        <EventCard 
          title="Music Festival 2023"
          date="10/15/2023"
          location="Central Park, New York"
          image="music-festival.jpg" // Replace with your image URL
          description="Experience the biggest music festival of the year featuring top artists from around the globe. Don't miss out on this unforgettable weekend!"
        />
        <EventCard 
          title="Tech Conference 2023"
          date="11/20/2023"
          location="San Francisco, CA"
          image="tech-conference.jpg" // Replace with your image URL
          description="Join industry leaders and innovators at the premier tech conference of the year. Explore the future of technology and network with experts."
        />
        <EventCard 
          title="Art Exhibition"
          date="12/05/2023"
          location="London, UK"
          image="art-exhibition.jpg" // Replace with your image URL
          description="Immerse yourself in a world of creativity at our annual art exhibition. Discover stunning works from emerging and established artists."
        />
      </div>
    </section>
  );
};

// EventCard Component
const EventCard = ({ title, date, location, image, description, eventId }) => {
  const navigate = useNavigate();

  const handleEventClick = () => {
    navigate(`/events`); // Navigate to the Events page
  };

  return (
    <div className="event-card" onClick={handleEventClick}>
      <div className="event-image-container">
        <img src={image} alt={title} className="event-image" />
        <div className="image-overlay"></div>
      </div>
      <div className="event-details">
        <h3>{title}</h3>
        <p className="event-date-location">
          <FontAwesomeIcon icon={faCalendarAlt} /> {date} <br />
          <FontAwesomeIcon icon={faGlobe} /> {location}
        </p>
        <p className="event-description">{description}</p>
        <button className="ticket-button">
          <FontAwesomeIcon icon={faTicketAlt} /> Buy Tickets
        </button>
      </div>
    </div>
  );
};

// ContactSection Component
const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-content">
        <h2>Contact Us</h2>
        <p>Have questions or need assistance? Reach out to us!</p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Eventure Awaits. All rights reserved.</p>
        <div className="social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    </footer>
  );
};

export default App;
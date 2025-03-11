import React, { useState, useEffect } from 'react';
import './App.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaHistory, FaUser } from 'react-icons/fa';

const images = [
  'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b', // Concert
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', // Festival
  'https://images.unsplash.com/photo-1517649763962-0c623066013b', // Sports
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f', // Workshop
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac', // Community
];

const featuredEvents = [
  {
    id: 1,
    title: 'Summer Music Festival',
    description: 'Join us for an unforgettable night of music and fun under the stars.',
    date: 'July 15, 2024',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
  },
  {
    id: 2,
    title: 'Tech Conference 2024',
    description: 'Explore the latest trends in technology and innovation.',
    date: 'August 20, 2024',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
  },
  {
    id: 3,
    title: 'Marathon Run',
    description: 'Run for a cause and push your limits in this city-wide marathon.',
    date: 'September 10, 2024',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b',
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  return (
    <div className="App">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-brand">EvenTure</div>
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#events">Events</a>
          <a href="#purchase-history"><FaHistory /></a>
          <a href="#login"><FaUser /></a>
        </div>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </nav>

      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Event ${index + 1}`} />
            <div className="carousel-text">
              <h1>Welcome to EvenTure</h1>
              <p>Your ultimate event management solution</p>
              <div className="button-container">
                <button className="btn view-events">View Events</button>
                <button className="btn get-started">Get Started</button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Featured Events Section */}
      <section className="featured-events">
        <h2>Featured Events</h2>
        <div className="events-grid">
          {featuredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <img src={event.image} alt={event.title} />
              <div className="event-card-content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-date">{event.date}</div>
                <button className="btn">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
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

    </div>
  );
}

export default App;
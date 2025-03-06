import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import './EventPage.css';

const EventPage = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock event data - in a real app, this would come from an API
  const events = [
    {
      id: 1,
      title: "Summer Music Festival",
      date: "2025-07-15",
      time: "16:00",
      location: "Central Park",
      price: 75.00,
      category: "Music",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
      description: "Join us for the biggest music festival of the summer featuring top artists and bands. Experience live performances across multiple stages, delicious food vendors, and unforgettable memories.",
      availableTickets: 250,
      features: ["Multiple Stages", "Food Vendors", "VIP Areas", "Meet & Greet"],
      lineup: ["Artist 1", "Artist 2", "Artist 3"]
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      date: "2025-08-20",
      time: "09:00",
      location: "Convention Center",
      price: 199.99,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      description: "Explore the latest innovations in technology with industry experts and thought leaders. Network with professionals and gain insights into emerging trends.",
      availableTickets: 500,
      features: ["Workshops", "Networking Sessions", "Product Demos", "Panel Discussions"],
      speakers: ["Speaker 1", "Speaker 2", "Speaker 3"]
    },
    {
      id: 3,
      title: "Food & Wine Festival",
      date: "2025-09-10",
      time: "12:00",
      location: "Riverside Gardens",
      price: 85.00,
      category: "Food",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3",
      description: "Experience culinary delights and wine tasting from renowned chefs and wineries. Enjoy cooking demonstrations, wine pairing sessions, and gourmet food sampling.",
      availableTickets: 300,
      features: ["Wine Tasting", "Cooking Demos", "Food Sampling", "Chef Meet & Greet"],
      vendors: ["Restaurant 1", "Winery 1", "Restaurant 2"]
    }
  ];

  const categories = ["all", "Music", "Technology", "Food", "Sports", "Arts"];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleBuyTicket = (event) => {
    navigate(`/purchase-ticket/${event.id}`, { state: { event } });
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="event-page">
      <nav className="event-nav">
        <Link to="/" className="nav-link" onClick={() => scrollToSection('home')}>Home</Link>
        <Link to="/" className="nav-link" onClick={() => scrollToSection('about')}>About</Link>
        <Link to="/" className="nav-link" onClick={() => scrollToSection('contact')}>Contact</Link>
      </nav>

      <header className="event-header">
        <h1>Upcoming Events</h1>
        <p>Discover and book amazing events happening near you</p>
        
        <div className="search-filter-container">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="category-filter">
            <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-image">
              <img src={event.image} alt={event.title} />
              <div className="event-category">{event.category}</div>
            </div>
            <div className="event-info">
              <h3>{event.title}</h3>
              <p className="event-date">{event.date} at {event.time}</p>
              <p className="event-location">{event.location}</p>
              <p className="event-price">${event.price.toFixed(2)}</p>
              <div className="event-actions">
                <button onClick={() => handleEventClick(event)} className="details-btn">
                  View Details
                </button>
                <button onClick={() => handleBuyTicket(event)} className="buy-btn">
                  Buy Tickets
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
            <div className="modal-category">{selectedEvent.category}</div>
            <h2>{selectedEvent.title}</h2>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <span className="info-label">Date & Time</span>
                <span>{selectedEvent.date} at {selectedEvent.time}</span>
              </div>
              <div className="modal-info-item">
                <span className="info-label">Location</span>
                <span>{selectedEvent.location}</span>
              </div>
              <div className="modal-info-item">
                <span className="info-label">Price</span>
                <span>${selectedEvent.price.toFixed(2)}</span>
              </div>
              <div className="modal-info-item">
                <span className="info-label">Available Tickets</span>
                <span>{selectedEvent.availableTickets}</span>
              </div>
            </div>
            <div className="modal-description">
              <h3>About This Event</h3>
              <p>{selectedEvent.description}</p>
            </div>
            <div className="modal-features">
              <h3>Event Features</h3>
              <div className="features-grid">
                {selectedEvent.features.map((feature, index) => (
                  <div key={index} className="feature-item">{feature}</div>
                ))}
              </div>
            </div>
            <button 
              onClick={() => handleBuyTicket(selectedEvent)}
              className="modal-buy-btn"
            >
              Purchase Tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
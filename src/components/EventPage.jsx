import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faTicketAlt, 
  faClock,
  faCheck,
  faInfoCircle,
  faShoppingCart,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import './EventPage.css';

const events = [
  {
    id: 1,
    title: "Summer Music Festival",
    category: "Music",
    date: "2025-07-15",
    time: "16:00",
    location: "Central Park",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    description: "Experience an unforgettable summer evening filled with live music performances from top artists.",
    features: ["Live Performances", "Food Vendors", "VIP Areas", "Merchandise"],
    availableTickets: 500
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    category: "Technology",
    date: "2025-08-20",
    time: "09:00",
    location: "Convention Center",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    description: "Join industry leaders and innovators at the premier tech conference of the year.",
    features: ["Keynote Speakers", "Workshops", "Networking", "Product Demos"],
    availableTickets: 300
  },
  {
    id: 3,
    title: "Food & Wine Festival",
    category: "Food",
    date: "2025-09-10",
    time: "12:00",
    location: "Riverside Gardens",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800",
    description: "Savor exquisite cuisine and fine wines from renowned chefs and wineries.",
    features: ["Wine Tasting", "Cooking Demos", "Gourmet Food", "Live Entertainment"],
    availableTickets: 400
  },
  {
    id: 4,
    title: "International Film Festival",
    category: "Arts",
    date: "2025-10-05",
    time: "18:30",
    location: "Grand Theater",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
    description: "Discover groundbreaking films from talented filmmakers around the world.",
    features: ["Film Screenings", "Director Q&As", "Industry Panels", "Awards Ceremony"],
    availableTickets: 250
  },
  {
    id: 5,
    title: "Marathon City Run",
    category: "Sports",
    date: "2025-11-12",
    time: "07:00",
    location: "City Center",
    price: 50.00,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
    description: "Challenge yourself in this scenic city marathon with runners from around the globe.",
    features: ["Professional Timing", "Hydration Stations", "Medical Support", "Finisher Medal"],
    availableTickets: 1000
  },
  {
    id: 6,
    title: "Business Leadership Summit",
    category: "Technology",
    date: "2025-12-03",
    time: "10:00",
    location: "Business Center",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    description: "Connect with business leaders and learn cutting-edge strategies for success.",
    features: ["Expert Speakers", "Networking Events", "Strategy Sessions", "Business Lunch"],
    availableTickets: 200
  }
];

const EventPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const categories = ['all', 'Music', 'Technology', 'Food', 'Arts', 'Sports'];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleBuyTickets = (event) => {
    navigate(`/purchase/${event.id}`);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="event-page">
      <header className="event-header">
        <h1>Discover Amazing Events</h1>
        <p>Find and book the perfect event for any occasion</p>
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
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {filteredEvents.length === 0 ? (
        <div className="no-events">
          <h3>No events found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div className="event-category">{event.category}</div>
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <div className="event-date-time">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>{formatDate(event.date)}</span>
                  <FontAwesomeIcon icon={faClock} />
                  <span>{event.time}</span>
                </div>
                <div className="event-location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>{event.location}</span>
                </div>
                <div className="event-price">
                  <FontAwesomeIcon icon={faTicketAlt} />
                  <span>${event.price.toFixed(2)}</span>
                </div>
                <div className="event-actions">
                  <button onClick={() => handleEventClick(event)} className="details-btn">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span>Details</span>
                    <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
                  </button>
                  <button onClick={() => handleBuyTickets(event)} className="buy-btn">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <div className="modal-header">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
              <div className="modal-category">{selectedEvent.category}</div>
            </div>
            <div className="modal-body">
              <h2>{selectedEvent.title}</h2>
              <div className="modal-info-grid">
                <div className="modal-info-item">
                  <FontAwesomeIcon icon={faCalendarAlt} className="modal-icon" />
                  <div>
                    <span className="info-label">Date</span>
                    <span className="info-value">{formatDate(selectedEvent.date)}</span>
                  </div>
                </div>
                <div className="modal-info-item">
                  <FontAwesomeIcon icon={faClock} className="modal-icon" />
                  <div>
                    <span className="info-label">Time</span>
                    <span className="info-value">{selectedEvent.time}</span>
                  </div>
                </div>
                <div className="modal-info-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="modal-icon" />
                  <div>
                    <span className="info-label">Location</span>
                    <span className="info-value">{selectedEvent.location}</span>
                  </div>
                </div>
                <div className="modal-info-item">
                  <FontAwesomeIcon icon={faTicketAlt} className="modal-icon" />
                  <div>
                    <span className="info-label">Price</span>
                    <span className="info-value">${selectedEvent.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="modal-section">
                <h3>About This Event</h3>
                <p>{selectedEvent.description}</p>
              </div>
              <div className="modal-section">
                <h3>Event Features</h3>
                <div className="features-grid">
                  {selectedEvent.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <div className="modal-tickets-available">
                  <FontAwesomeIcon icon={faTicketAlt} />
                  <span>{selectedEvent.availableTickets} tickets available</span>
                </div>
                <button 
                  onClick={() => handleBuyTickets(selectedEvent)}
                  className="modal-buy-btn"
                >
                  <FontAwesomeIcon icon={faShoppingCart} />
                  <span>Purchase Tickets</span>
                  <FontAwesomeIcon icon={faChevronRight} className="arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faCalendarAlt, 
  faMapMarkerAlt, 
  faTicketAlt, 
  faClock, 
  faArrowLeft 
} from '@fortawesome/free-solid-svg-icons';
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
    },
    {
      id: 4,
      title: "International Film Festival",
      date: "2025-10-05",
      time: "18:30",
      location: "Grand Theater",
      price: 120.00,
      category: "Arts",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
      description: "Discover groundbreaking films from around the world at our annual film festival. Meet directors, actors, and fellow film enthusiasts in an immersive cinematic experience.",
      availableTickets: 200,
      features: ["Film Screenings", "Director Q&As", "Awards Ceremony", "Networking Events"],
      specialGuests: ["Director A", "Actor B", "Producer C"]
    },
    {
      id: 5,
      title: "Marathon City Run",
      date: "2025-11-12",
      time: "07:00",
      location: "City Center",
      price: 50.00,
      category: "Sports",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635",
      description: "Challenge yourself in our annual city marathon. Run through iconic landmarks and beautiful scenery while competing with participants from around the world.",
      availableTickets: 1000,
      features: ["Professional Timing", "Hydration Stations", "Finisher Medals", "Post-Race Party"],
      distances: ["5K", "10K", "Half Marathon", "Full Marathon"]
    },
    {
      id: 6,
      title: "Business Leadership Summit",
      date: "2025-12-03",
      time: "10:00",
      location: "Business Center",
      price: 299.99,
      category: "Technology",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
      description: "Join top business leaders and entrepreneurs for a day of inspiration, learning, and networking. Gain valuable insights to take your career or business to the next level.",
      availableTickets: 150,
      features: ["Keynote Speeches", "Panel Discussions", "Networking Lunch", "Workshop Sessions"],
      speakers: ["CEO X", "Entrepreneur Y", "Author Z"]
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

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                <div className="event-meta">
                  <div className="event-meta-item">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                    <span>{event.date}</span>
                  </div>
                  <div className="event-meta-item">
                    <FontAwesomeIcon icon={faClock} />
                    <span>{event.time}</span>
                  </div>
                </div>
                <div className="event-meta">
                  <div className="event-meta-item">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <span>{event.location}</span>
                  </div>
                  <div className="event-meta-item">
                    <FontAwesomeIcon icon={faTicketAlt} />
                    <span>${event.price.toFixed(2)}</span>
                  </div>
                </div>
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
      )}

      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
            <div className="modal-category">{selectedEvent.category}</div>
            <h2>{selectedEvent.title}</h2>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <FontAwesomeIcon icon={faCalendarAlt} className="modal-icon" />
                <div>
                  <span className="info-label">Date</span>
                  <span className="info-value">{selectedEvent.date}</span>
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
                  <div key={index} className="feature-item">{feature}</div>
                ))}
              </div>
            </div>
            <div className="modal-tickets-available">
              <span>{selectedEvent.availableTickets} tickets available</span>
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
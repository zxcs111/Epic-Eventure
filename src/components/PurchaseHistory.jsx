import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHistory,
  faTimes,
  faCalendarAlt,
  faMapMarkerAlt,
  faTicketAlt,
  faClock,
  faChevronRight,
  faReceipt
} from '@fortawesome/free-solid-svg-icons';
import './PurchaseHistory.css';

const PurchaseHistory = ({ isOpen, onClose }) => {
  // Mock purchase history data
  const purchaseHistory = [
    {
      id: 1,
      eventTitle: "Tech Conference 2025",
      date: "2025-05-15",
      time: "09:00 AM",
      location: "Convention Center, Silicon Valley",
      ticketQuantity: 2,
      totalAmount: 599.98,
      purchaseDate: "2025-03-01",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      status: "Upcoming"
    },
    {
      id: 2,
      eventTitle: "Music Festival 2025",
      date: "2025-06-20",
      time: "04:00 PM",
      location: "Central Park, New York",
      ticketQuantity: 3,
      totalAmount: 450.00,
      purchaseDate: "2025-02-28",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
      status: "Upcoming"
    },
    {
      id: 3,
      eventTitle: "Food & Wine Festival",
      date: "2025-04-10",
      time: "11:00 AM",
      location: "Downtown Food Court",
      ticketQuantity: 1,
      totalAmount: 75.00,
      purchaseDate: "2025-03-05",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
      status: "Upcoming"
    }
  ];

  const [selectedPurchase, setSelectedPurchase] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleViewDetails = (purchase) => {
    setSelectedPurchase(purchase);
  };

  const closeDetails = () => {
    setSelectedPurchase(null);
  };

  return (
    <div className={`purchase-history-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="purchase-history-panel" onClick={e => e.stopPropagation()}>
        <div className="panel-header">
          <div className="header-title">
            <FontAwesomeIcon icon={faHistory} />
            <h2>Purchase History</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {!selectedPurchase ? (
          <div className="purchase-list">
            {purchaseHistory.map(purchase => (
              <div key={purchase.id} className="purchase-item" onClick={() => handleViewDetails(purchase)}>
                <img src={purchase.image} alt={purchase.eventTitle} className="purchase-image" />
                <div className="purchase-info">
                  <h3>{purchase.eventTitle}</h3>
                  <div className="purchase-details">
                    <span className="date">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      {formatDate(purchase.date)}
                    </span>
                    <span className="tickets">
                      <FontAwesomeIcon icon={faTicketAlt} />
                      {purchase.ticketQuantity} {purchase.ticketQuantity === 1 ? 'ticket' : 'tickets'}
                    </span>
                  </div>
                  <div className="purchase-footer">
                    <span className="status">{purchase.status}</span>
                    <span className="amount">${purchase.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="chevron-icon" />
              </div>
            ))}
          </div>
        ) : (
          <div className="purchase-details-view">
            <button className="back-to-list" onClick={closeDetails}>
              <FontAwesomeIcon icon={faChevronRight} className="back-icon" />
              Back to List
            </button>
            
            <div className="purchase-details-content">
              <img src={selectedPurchase.image} alt={selectedPurchase.eventTitle} className="details-image" />
              
              <div className="details-header">
                <h2>{selectedPurchase.eventTitle}</h2>
                <span className="status-badge">{selectedPurchase.status}</span>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <div>
                    <span className="label">Date</span>
                    <span className="value">{formatDate(selectedPurchase.date)}</span>
                  </div>
                </div>
                
                <div className="detail-item">
                  <FontAwesomeIcon icon={faClock} />
                  <div>
                    <span className="label">Time</span>
                    <span className="value">{selectedPurchase.time}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <div>
                    <span className="label">Location</span>
                    <span className="value">{selectedPurchase.location}</span>
                  </div>
                </div>

                <div className="detail-item">
                  <FontAwesomeIcon icon={faTicketAlt} />
                  <div>
                    <span className="label">Tickets</span>
                    <span className="value">{selectedPurchase.ticketQuantity} {selectedPurchase.ticketQuantity === 1 ? 'ticket' : 'tickets'}</span>
                  </div>
                </div>
              </div>

              <div className="purchase-receipt">
                <div className="receipt-header">
                  <FontAwesomeIcon icon={faReceipt} />
                  <h3>Purchase Details</h3>
                </div>
                <div className="receipt-info">
                  <div className="receipt-row">
                    <span>Purchase Date</span>
                    <span>{formatDate(selectedPurchase.purchaseDate)}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Total Amount</span>
                    <span className="total-amount">${selectedPurchase.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;

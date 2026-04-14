import { useEffect } from 'react'
import './PropertyModal.css'

export default function PropertyModal({ property, onClose, allProperties }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!property) return null

  const relatedProperties = allProperties.filter(p => 
    p.id !== property.id && 
    (p.type === property.type || p.beds === property.beds)
  ).slice(0, 3)

  const propertyDescriptions = {
    1: 'Beautiful detached house with spacious gardens and modern amenities. Perfect for families looking for comfort and privacy.',
    2: 'Luxury modern villa featuring a stunning pool, premium finishes, and breathtaking views. An ideal investment property.',
    3: 'Contemporary apartment with smart home features in a vibrant neighborhood. Close to transport and shopping centers.',
    4: 'Charming semi-detached home with character and space. Recently renovated with quality upgrades throughout.',
    5: 'Grand luxury property with 6 bedrooms, premium amenities, and expansive grounds. Perfect for discerning buyers.',
    6: 'Compact studio flat ideal for professionals and first-time renters. Modern design with excellent connectivity.'
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-grid">
          {/* Main Image */}
          <div className="modal-image-section">
            <div className="modal-main-image">
              <img src={property.image} alt={property.title} />
              <span className={`modal-badge ${property.type === 'rent' ? 'rent' : ''}`}>
                {property.badge}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="modal-details-section">
            <div className="modal-header">
              <h2>{property.title}</h2>
              <div className="modal-price">{property.price}</div>
            </div>

            <div className="modal-location">📍 {property.location}</div>

            <div className="modal-features">
              <div className="feature-item">
                <span className="feature-icon">🛏</span>
                <div>
                  <div className="feature-label">Bedrooms</div>
                  <div className="feature-value">{property.beds}</div>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚿</span>
                <div>
                  <div className="feature-label">Bathrooms</div>
                  <div className="feature-value">{property.baths}</div>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✨</span>
                <div>
                  <div className="feature-label">Feature</div>
                  <div className="feature-value">{property.feature}</div>
                </div>
              </div>
            </div>

            <div className="modal-description">
              <h3>About This Property</h3>
              <p>{propertyDescriptions[property.id]}</p>
            </div>

            <button className="modal-btn" onClick={onClose}>
              Contact Agent ✉️
            </button>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="modal-related">
            <h3>Related Properties</h3>
            <div className="related-grid">
              {relatedProperties.map(related => (
                <div key={related.id} className="related-card">
                  <img src={related.image} alt={related.title} />
                  <div className="related-info">
                    <div className="related-price">{related.price}</div>
                    <div className="related-title">{related.title}</div>
                    <div className="related-location">📍 {related.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

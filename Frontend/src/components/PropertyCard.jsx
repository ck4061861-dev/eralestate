import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export default function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()
  const API_URL = (import.meta.env.VITE_API_URL || import.meta.env.API_URL || '').replace(/\/+$/, '')

  const getEmoji = (feature) => {
    switch (feature) {
      case 'Garage': return '🚗'
      case 'Pool': return '🏊'
      case 'Parking': return '🅿️'
      case 'Garden': return '🌳'
      case 'Large Plot': return '🌿'
      default: return '🏡'
    }
  }

  const toggleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const handleCardClick = () => navigate(`/property/${property._id || property.id}`)


  const normalizeImage = (img) => {
    if (!img) return '';
    if (typeof img === 'string') {
      const value = img.trim();
      if (value.startsWith('data:') || value.startsWith('http://') || value.startsWith('https://')) {
        return value;
      }
      if (/^[A-Za-z0-9+/=]+$/.test(value) && value.length > 120) {
        return `data:image/jpeg;base64,${value}`;
      }
      return '';
    }
    const data = img.data || '';
    return normalizeImage(data);
  };

  const getFirstImageFromList = (images) => {
    if (!Array.isArray(images)) return '';
    for (const entry of images) {
      if (!entry) continue;
      if (typeof entry === 'string') {
        const normalized = normalizeImage(entry);
        if (normalized) return normalized;
      } else {
        if (entry.fileId) {
          return API_URL ? `${API_URL}/api/properties/images/${entry.fileId}` : `/api/properties/images/${entry.fileId}`;
        }
        if (entry.externalUrl) {
          return normalizeImage(entry.externalUrl);
        }
        if (entry.url) {
          if (entry.url.startsWith('/')) {
            return entry.url;
          }
          return normalizeImage(entry.url);
        }
        if (entry.data || entry.coverImage) {
          const normalized = normalizeImage(entry.data || entry.coverImage);
          if (normalized) return normalized;
        }
      }
    }
    return '';
  };

  const gridFsImage = property.coverImageId ? (API_URL ? `${API_URL}/api/properties/images/${property.coverImageId}` : `/api/properties/images/${property.coverImageId}`) : "";
  const primaryImage =
    gridFsImage ||
    normalizeImage(property.coverImage) ||
    getFirstImageFromList(property.images) ||
    normalizeImage(property.image) ;


  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
      onClick={handleCardClick}
    >
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img 
          loading="lazy"
          decoding="async"
          src={primaryImage} 
          alt={property.title} 
          className="h-full w-full object-cover object-center" 
        />
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${property.type === 'rent' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'}`}>
          {property.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}
        </span>
        <button
          onClick={toggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-1.5 text-lg shadow-lg transition hover:scale-110"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="space-y-2 p-4">
        <div className="text-xl font-extrabold text-slate-900">£{Number(property.price).toLocaleString()}</div>
        <div className="text-lg font-semibold text-slate-800">{property.title}</div>
        <div className="text-sm text-slate-500">📍 {property.location}</div>
        <div className="flex flex-wrap gap-2 text-sm text-slate-700">
          <span>🛏 {property.bedrooms || property.beds} Beds</span>
          <span>🛁 {property.bathrooms || property.baths} Baths</span>
          <span>{getEmoji(property.feature)} {property.feature}</span>
        </div>
      </div>
    </div>
  )
}

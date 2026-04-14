import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const staticListingTypeOptions = ['Buy or Rent', 'For Sale', 'To Rent']
const staticPropertyTypeOptions = ['Select Type', 'Apartment', 'Villa', 'House', 'Commercial', 'Plot']
const maxPriceOptions = ['No Limit', '£200,000', '£400,000', '£600,000', '£1,000,000+']

const defaultSearch = {
  location: '',
  propertyType: 'Select Type',
  listingType: staticListingTypeOptions[0],
  maxPrice: maxPriceOptions[0],
}

const formatTypeLabel = (type) => {
  if (!type) return ''
  return type
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function SearchBar() {
  const API_URL = (import.meta.env.VITE_API_URL || import.meta.env.API_URL || '').replace(/\/+$/, '')
  const navigate = useNavigate()
  const [searchValues, setSearchValues] = useState(defaultSearch)
  const [propertyTypeOptions, setPropertyTypeOptions] = useState(staticPropertyTypeOptions)

  const handleChange = (event) => {
    const { name, value } = event.target
    setSearchValues((prev) => ({ ...prev, [name]: value }))
  }

  const parseMaxPrice = (value) => {
    if (!value || value === 'No Limit') return null
    const digits = value.replace(/[^0-9]/g, '')
    return digits ? Number(digits) : null
  }

  const mapListingTypeToQuery = (listingType) => {
    if (listingType === 'For Sale') return 'sale'
    if (listingType === 'To Rent') return 'rent'
    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()

    if (searchValues.location.trim()) {
      params.set('location', searchValues.location.trim())
    }

    if (searchValues.propertyType && searchValues.propertyType !== 'Select Type') {
      params.set('propertyType', searchValues.propertyType)
    }

    const listingQuery = mapListingTypeToQuery(searchValues.listingType)
    if (listingQuery) {
      params.set('type', listingQuery)
    }

    const maxPrice = parseMaxPrice(searchValues.maxPrice)
    if (maxPrice !== null) {
      params.set('maxPrice', String(maxPrice))
    }

    const queryString = params.toString()
    navigate(`/properties${queryString ? `?${queryString}` : ''}`)
  }

  return (
    <div className="mx-auto mt-3.5 w-full max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 p-3 sm:p-4 md:p-6">
      <form className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Location</label>
          <input
            name="location"
            value={searchValues.location}
            onChange={handleChange}
            type="text"
            placeholder="City, area or postcode..."
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Property Type *</label>
          <select
            name="propertyType"
            value={searchValues.propertyType}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
          >
            {propertyTypeOptions.map((option) => (
              <option key={option} value={option}>
                {formatTypeLabel(option)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Listing Type</label>
          <select
            name="listingType"
            value={searchValues.listingType}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
          >
            {staticListingTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">Max Price</label>
          <select
            name="maxPrice"
            value={searchValues.maxPrice}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
          >
            {maxPriceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4 sm:col-span-2 col-span-1 flex justify-center items-end">
          <button
            type="submit"
            className="h-10 sm:h-11 md:h-12 w-full max-w-xs rounded-lg bg-cyan-500 px-4 sm:px-5 font-bold text-sm sm:text-base text-white hover:bg-cyan-600 active:bg-cyan-700 transition-colors duration-200 cursor-pointer"
          >
            🔍 Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar;
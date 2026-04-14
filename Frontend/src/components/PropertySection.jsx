import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropertyCard from './PropertyCard'

export default function PropertySection({ compact = false, ctaText = 'View All Properties', typeFilter = '' }) {
  const location = useLocation()
  const API_URL = (import.meta.env.VITE_API_URL || import.meta.env.API_URL || '').replace(/\/+$/, '')
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const queryParams = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    const params = {}
    const typeQuery = searchParams.get('type') || typeFilter
    const propertyTypeQuery = searchParams.get('propertyType')
    const locationQuery = searchParams.get('location')
    const maxPriceQuery = searchParams.get('maxPrice')

    if (typeQuery) params.type = typeQuery
    if (propertyTypeQuery) params.propertyType = propertyTypeQuery
    if (locationQuery) params.location = locationQuery
    if (maxPriceQuery) params.maxPrice = maxPriceQuery

    return params
  }, [location.search, typeFilter])

  useEffect(() => {
    let mounted = true
    const fetchProperties = async () => {
      if (!mounted) return
      try {
        const query = new URLSearchParams(queryParams).toString()
        const apiUrl = API_URL ? `${API_URL}/api/properties${query ? `?${query}` : ''}` : `/api/properties${query ? `?${query}` : ''}`
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error(`Unable to fetch properties from ${apiUrl}`)
        const data = await res.json()
        if (!mounted) return
        setProperties(data.properties || [])
        setError('')
      } catch (err) {
        if (!mounted) return
        setError('Could not load properties.')
        setProperties([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProperties()
    const intervalId = setInterval(fetchProperties, 1000)

    return () => {
      mounted = false
      clearInterval(intervalId)
    }
  }, [API_URL, queryParams])

  return (
    <section id='properties' className='pt-24 pb-20'>
      {!compact && (
        <div className='mx-auto mb-10 max-w-3xl text-center'>
          <span className='block text-sm font-semibold uppercase tracking-widest text-cyan-500'>Latest Listings</span>
          <h2 className='mt-3 text-3xl font-bold text-slate-900'>Featured Properties</h2>
          <p className='mx-auto mt-4 text-slate-600'>Hand-picked homes from our latest listings across London and the surrounding areas.</p>
        </div>
      )}

      {loading ? (
        <div className='text-center py-16'>
          <div className='text-slate-500 text-lg'>Loading properties...</div>
        </div>
      ) : error ? (
        <div className='text-center py-16'>
          <div className='text-red-500 text-lg'>{error}</div>
        </div>
      ) : properties.length === 0 ? (
        <div className='text-center py-16'>
          <div className='text-slate-500 text-lg'>No properties found. Try adjusting your filters!</div>
        </div>
      ) : (
        <div className='mx-5 grid max-w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {properties
            .filter((prop) => !typeFilter || (prop.type && prop.type.toLowerCase() === typeFilter.toLowerCase()))
            .map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
        </div>
      )}

      {!compact && (
        <div className='mt-10 text-center'>
          <Link className='inline-flex rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500' to='/properties'>
            {ctaText}
          </Link>
        </div>
      )}
    </section>
  )
}

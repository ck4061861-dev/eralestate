export default function ResponsiveContainer({ children, className = '' }) {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 mx-auto w-full ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  )
}

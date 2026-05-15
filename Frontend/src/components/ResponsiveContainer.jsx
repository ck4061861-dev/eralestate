export default function ResponsiveContainer({ children, className = '', centered = true }) {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={centered ? "max-w-7xl mx-auto" : "w-full"}>
        {children}
      </div>
    </div>
  )
}

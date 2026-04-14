import HomePage from '../components/HomePage'
import SearchBar from '../components/SearchBar'
import PropertySection from '../components/PropertySection'
import ServicesSection from '../components/ServicesSection'
import WhyChooseUs from '../components/WhyChooseUs'
import CtaBanner from '../components/CtaBanner'

export default function Home() {
  return (
    <>
      <HomePage />
      <SearchBar />
      <PropertySection />
      <ServicesSection />
      <WhyChooseUs />
      <CtaBanner />
    </>
  )
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '../components/ResponsiveContainer';
import { useNavPagesContent } from '../contexts/NavPagesContext';
import { 
  ArrowLeft, 
  Search, 
  Phone,
  ChevronRight
} from 'lucide-react';

export default function BuyersGuide() {
  const navigate = useNavigate();
  const { getPageBySlug } = useNavPagesContent();
  const pageData = getPageBySlug('buyers-guide');
  const content = pageData?.content || {};

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ══ HERO SECTION ══ */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-slate-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop&q=80"
          alt="Beautiful modern home"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-slate-950/75 to-slate-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-[-150px] left-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

        <ResponsiveContainer className="relative z-10 flex h-full flex-col items-start justify-center">
          <button
            onClick={() => navigate('/')}
            className="absolute left-6 top-8 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-xl mb-6">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-300 font-semibold">
                {content.heroLabel || 'UK Property Guide'}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              {content.heroTitle || 'Step by Step Guide to Buying your property'}
            </h1>
          </div>
        </ResponsiveContainer>
      </section>

      {/* ══ WHITE CONTENT SECTIONS ══ */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

        {/* Why Choose Paramount */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            {content.sectionTitle || 'Why choose Paramount to Buy a Property?'}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">We are a long established independent Sales and Lettings agency since 1982 with offices across the UK.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">A trusted community agency with a proven track record of successful selling and buying within the borough.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">Awarded Best Sales and Lettings Branch 2023 for all branches and recognised by Best Estate Agent Guide 2022 - 2020, meaning we are in the top 3% of estate agents in the UK.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">We offer personable and unrivalled customer service, which is reinforced by many returning customers and client testimonials.</span>
            </li>
          </ul>
          <p className="text-gray-700 text-sm sm:text-base mt-6 leading-relaxed">
            {content.introText || 'Buying a property is exciting but it may also seem a little daunting, so we aim to make the process as easy as possible with our quick step by step guide to buying a property with Paramount:'}
          </p>
        </div>

        {/* Step 1 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            1. What Type of Buyer are you?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>First Time Buyer</strong> – This means you have never owned property, land or have never had a title-deed in your name before (anywhere in the world).</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>Buy-to-Let Investor</strong> – This is a buyer who is purchasing a property to let it out (they may or may not be a homeowner).</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>Let-to-Buy</strong> – This is a homeowner who is placing their current residential property on rent in order to purchase a new residential property.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>Sell-to-Buy</strong> – This is a homeowner selling their current residential property in order to purchase a new one.</span>
            </li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            2. Organising Finances and Establishing a Budget
          </h2>
          <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
            It is highly advisable that the necessary financial arrangements are made prior to starting your property search (e.g. Mortgage in Principle). This will ultimately influence your choice of property and allow you to establish an exact budget, thus putting you in a securer position when placing offers. Paramount have an experienced in-house Financial Advisor/ Mortgage Broker who can assist with this.
          </p>
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            You would need to consider the following:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">Moving costs</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">Legal fees</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">Stamp duty (STLT) See our Stamp Duty Calculator</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">Survey fees</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">Mortgage / application/ valuation fees. See our Mortgage Calculator</span>
            </li>
          </ul>
        </div>

        {/* Step 3 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            3. Finding your Ideal Property and Viewings
          </h2>
          <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
            Searching for a property can be time-consuming and exhausting. Whether or not you have a clear vision in mind you can register with one of our branches in order to discuss your requirements and allow us to take the stress off your shoulders. We will assign one of our experienced team members to personally assist with your search from start to finish.
          </p>
          <p className="text-gray-700 text-sm sm:text-base mb-4">
            The following are general requirements that you would need to consider:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>Area</strong> – what location would be most suitable for you? (commutable to work or schools)</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>Type of property</strong> – House, Bungalow, Maisonette or Flat etc.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>How many Bedrooms</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>Maximum Budget</strong> – The amount you're willing to spend up until if you found your ideal property.</span>
            </li>
          </ul>
        </div>

        {/* Step 4 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            4. Choosing your Solicitor
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            It is imperative that you appoint a proactive and reputable solicitor as this can severely impact the progression and successful purchase of your property. Paramount can assist you with recommendations.
          </p>
        </div>

        {/* Step 5 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            5. Placing Offers
          </h2>
          <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
            Any offer made on your selected property will be immediately communicated by us to the vendor both verbally and in writing. The vendor would most likely consider the following when deciding whether to accept an offer:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>Chain:</strong> Are you dependent on the sale of a property in order to fund this onward purchase?</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>Timeframe:</strong> What are your target dates? A vendor will consider these depending on their circumstances.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base"><strong>Proof of Funds:</strong> Prior to accepting any offers Paramount would need to see proof of finances. How is this purchase being funded? Are you obtaining a mortgage or are you a cash buyer? If purchasing with a mortgage it is highly advisable to have a written agreement in principle.</span>
            </li>
          </ul>
        </div>

        {/* Step 6 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            6. Acceptance of Your Offer
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Good News! You can now instruct your appointed solicitor and Paramount will issue the Memorandum of Sale, which will confirm the agreed purchase price and it will be sent to all parties involved.
          </p>
        </div>

        {/* Step 7 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            7. Conveyancing outlined
          </h2>
          <p className="text-gray-700 text-sm sm:text-base mb-4 leading-relaxed">
            Let's break this down, this is the process whereby your solicitor will be carrying out due diligence on the property you are about to purchase.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">You will be required to put money on account with your solicitor, which will allow your solicitor to open the case file for you.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">From this, your solicitor will then instruct searches from the local council.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">Your solicitor will refer to the draft contracts received from the vendor's solicitor and raise any enquiries on your behalf. Draft contracts will in brief, include title deeds, property information form, fittings and contents form, along with any other relevant documentation.</span>
            </li>
            <li className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm sm:text-base">If you are purchasing a leasehold property, your solicitor will refer to the management pack which will be sent over by the vendor's solicitor.</span>
            </li>
          </ul>
        </div>

        {/* Step 8 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            8. Survey and Mortgage Offer
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            If purchasing with a mortgage, along with beginning the conveyancing process you will also need to submit the full mortgage application and arrange for a survey, which would typically be organised by your financial advisor/ broker. The survey will typically inform you of any possible defects and advise on the property's value. Once the survey has been received, the formal mortgage offer will be released to you and your solicitor. At this point Paramount will mark the property as SSTC (Sold Subject to Contract).
          </p>
        </div>

        {/* Step 9 */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            9. Exchange of Contracts
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            You're almost there … Once your solicitor is satisfied with all responses to raised enquiries, and all financial arrangements are in place, both parties will sign contracts, at this point you are required to pay the agreed deposit amount into your solicitors account (typically 10% of the purchase price). Then both parties will come to a mutual agreement on a completion date.
          </p>
        </div>

        {/* Step 10 */}
        <div className="mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            10. Completion Day
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Completion is when your solicitor will transfer the final monies to the vendor's solicitor. Once we have confirmation, the keys will then be released to you on the same day.
          </p>
          <p className="text-gray-700 text-sm sm:text-base mt-4 font-semibold">
            Congratulations, you are now the new homeowner! It's time to start planning your housewarming party.
          </p>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Buying Reviews
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-red-600 pl-4 sm:pl-6">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
                <strong>Aamir and Shafia</strong> — First dealings with Paramount. We have experience of dealing with quite a few but I have to say this agency was the best. Everything from seeing the property to hand over of the keys was nothing but simplistic and hassle free. Jazz was supportive and kept in touch. Not once did we feel uneasy, pressured or anxious. Very polite staff and a very lovely experience when purchasing our property. Thank you to Jazz and Gurveer for their support throughout. An excellent professional agency.
              </p>
            </div>
            <div className="border-l-4 border-red-600 pl-4 sm:pl-6">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
                <strong>Surinda</strong> — Great, prompt, honest unlike most other estate agents, good at chasing lawyers. Will use again. Great service. Good communication always on time.
              </p>
            </div>
            <div className="border-l-4 border-red-600 pl-4 sm:pl-6">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
                <strong>Raj</strong> — Thank you to the Paramount team for the fantastic service. Professional and great communication throughout the purchase process. Highly recommended to all.
              </p>
            </div>
            <div className="border-l-4 border-red-600 pl-4 sm:pl-6">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
                <strong>Swarjit</strong> — The purchase of our new home was both challenging and exciting time for us. Paramount Estates Agents helped in making this process a very pleasant experience for us! So, I would like to take this opportunity to thank them especially Gurveer and Jazz for their expertise and professionalism. The service we received was faultless and prompt. We recommend Paramount Estate Agents to anyone who is looking to purchase a property.
              </p>
            </div>
            <div className="border-l-4 border-red-600 pl-4 sm:pl-6">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
                <strong>Glenn</strong> — Outstanding level of service; displayed professionalism and efficiency at all stages ensuring a smooth process from initial marketing through to completion. Great job, thank you!
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 text-center border border-gray-100">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Ready to find your dream home?
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto text-base sm:text-lg">
            Whether you are a first-time buyer or looking to move up the ladder, our extensive UK listings have something for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/buy')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-black transition-all text-sm"
            >
              <Search className="w-4 h-4" />
              Browse Properties
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 text-gray-900 rounded-full font-semibold hover:bg-white transition-all text-sm bg-white"
            >
              <Phone className="w-4 h-4" />
              Book a Valuation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
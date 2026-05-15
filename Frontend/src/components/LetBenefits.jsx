import React from 'react';
import { Link } from 'react-router-dom';

const LANDLORD_BENEFITS = [
  "We are a long established independent Lettings and Sales agency since 1989 with offices in Romford, Dagenham and surrounding East London areas.",
  "A trusted community agency with a proven track record of successful lettings and property management across Essex and East London.",
  "Operating as FPS Ltd (trading as Paramount Estates), we bring over 35 years of combined expertise to every client relationship.",
  "Awarded consistent 5-star ratings by our clients, meaning we are recognised among the top-performing estate agents in the RM postcodes.",
  "A large and happy landlord portfolio who entrust Paramount Estates to manage their properties year after year — see Landlord Reviews and our Awards page.",
  "We successfully let out properties within the shortest time frame, minimising void periods for our landlords.",
  "We operate on a no let, no fee basis — you only pay when we deliver results.",
  "We provide wide coverage across all major property portals — enabling the best exposure for your property.",
  "Diligent Tenant Referencing is carried out to ensure only the best suited tenants are placed in your property.",
  "Our dedicated team includes Nayyerah Razi (MD), Bilal Iqbal, Andrea Stanculeanu, Sarang Ali, Faraz Ali, Syed Ahsan Ali, Syed Bukhari and Razi Rathore."
];

function PinkBullet({ text, index }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="mt-2 shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-rose-600">
          <path d="M2 1L12 7L2 13V1Z" fill="currentColor" />
        </svg>
      </div>
      <p className="text-slate-800 text-lg leading-relaxed">
        {text.split(/(Landlord Reviews|Awards)/).map((part, i) => {
          if (part === "Landlord Reviews") {
            return <Link key={i} to="/rent/landlord-reviews" className="text-rose-600 font-semibold hover:text-rose-700 underline decoration-rose-300 underline-offset-4 transition-colors">{part}</Link>;
          }
          if (part === "Awards") {
            return <Link key={i} to="/awards" className="text-rose-600 font-semibold hover:text-rose-700 underline decoration-rose-300 underline-offset-4 transition-colors">{part}</Link>;
          }
          return part;
        })}
      </p>
    </div>
  );
}

export default function LetBenefits() {
  return (
    <div className="space-y-24">
      <div>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Why choose Paramount Estates to Let or Sell your Property?
          </h2>
          <div className="w-20 h-1.5 bg-slate-200 mx-auto mt-6 rounded-full" />
        </div>

        <div className="space-y-7">
          {LANDLORD_BENEFITS.map((point, idx) => (
            <PinkBullet key={idx} text={point} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
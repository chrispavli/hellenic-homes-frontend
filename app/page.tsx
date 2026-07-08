import HeroSlide from './components/HeroSlide';

export default function Home() {
  return (
    <div>
      <HeroSlide />

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center">
            <div className="mb-4 text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L21.75 12M4.5 9.75v10.125A.375.375 0 004.875 20.25h4.875v-4.875a.375.375 0 01.375-.375h3a.375.375 0 01.375.375v4.875h4.875a.375.375 0 00.375-.375V9.75M8.25 20.25h7.5" />
              </svg>
            </div>
            <h3 className="font-semibold text-stone-800 mb-2">Sales & Rentals</h3>
            <p className="text-stone-500 text-sm">Long-term rentals and properties for sale across Greece and Cyprus.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4 text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-stone-800 mb-2">Prime Locations</h3>
            <p className="text-stone-500 text-sm">Handpicked properties in the most sought-after destinations across Greece and Cyprus.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4 text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="font-semibold text-stone-800 mb-2">Easy to Browse</h3>
            <p className="text-stone-500 text-sm">Filter, sort and compare properties to find your perfect match.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client'




export const AffiliateButtons = () => {
  return (
    <div className="fixed right-4 bottom-56 z-40 flex flex-col gap-3">
      {/* Surfshark Button */}
      <a
        href="https://get.surfshark.net/aff_c?offer_id=926&aff_id=44006"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden"
        aria-label="Fast VPN bundle for unlimited devices"
      >
        <img 
          src="/surfshark.png" 
          alt="SurfShark" 
          className="w-full h-full object-cover"
        />
      </a>
      {/* VidIQ Button */}
      <a
        href="https://vidiq.com/goviral"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden"
        aria-label="VidIQ - YouTube Growth Tool"
      >
        <img 
          src="/vidiq.png" 
          alt="VidIQ" 
          className="w-full h-full object-cover"
        />
      </a>

      {/* Fliki Button */}
      <a
        href="https://fliki.ai/?via=cartotv"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden"
        aria-label="Fliki - AI Video Creator"
      >
        <img 
          src="/fliki.png" 
          alt="Fliki" 
          className="w-full h-full object-cover"
        />
      </a>
    </div>
  );
};

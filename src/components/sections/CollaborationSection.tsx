import React from 'react';
import collaborationImg from '../../assets/images/collaboration.png';

const CollaborationSection: React.FC = () => {
  return (
    <section className="collaboration-section relative w-full bg-[#F7F7F2] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#131209] tracking-tight leading-tight">
            Where Innovation Meets Collaboration
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C5B55] max-w-2xl mx-auto font-manrope">
            Bringing technology, creativity, and community together to empower the next generation of developers.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center items-center">
          <img
            src={collaborationImg}
            alt="Teklozy x Coding Club Collaboration"
            className="max-w-full h-auto object-contain"
            style={{ maxWidth: '1000px' }}
            loading="lazy"
          />
        </div>
      </div>
      
      {/* Decorative background element similar to achievements */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-tk-primary/5 blur-[120px]" />
      </div>
    </section>
  );
};

export default CollaborationSection;

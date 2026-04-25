import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const InventoryPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.animate-item', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-honey-50 p-8">
      <h1 className="text-4xl font-minecraft text-comb-900 mb-4 animate-item">📦 INVENTORY</h1>
      <p className="text-comb-800 animate-item">Inventory management page - Coming soon...</p>
    </div>
  );
};

export default InventoryPage;

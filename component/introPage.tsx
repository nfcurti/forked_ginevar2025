import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import 'tailwindcss/tailwind.css';

const GinevarLabs: React.FC = () => {
  const [currentWord, setCurrentWord] = useState('artists');
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup Three.js
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create Stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.01,
    });

    const starCount = 5000;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Mouse interaction
    const onMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      stars.rotation.x = y * 0.2;
      stars.rotation.y = x * 0.2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const words = [
      'artists',
      'builders',
      'creatives',
      'photographers',
      'innovators',
      'curators',
    ];
    let currentIndex = 0;
  
    const changeWord = () => {
      // Optional: keep the direction logic if you want alternating animations
      setDirection(currentIndex % 2 === 0 ? 'down' : 'up');
      
      // Always update currentWord
      setCurrentWord(words[currentIndex]);
      currentIndex = (currentIndex + 1) % words.length;
    };
  
    const intervalId = setInterval(changeWord, 1500);
    return () => clearInterval(intervalId);
  }, []);
  

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={containerRef} className="absolute  left-0 w-full h-full z-0" />
        <img
          src="/top.svg"
          alt="galaxies background"
          className="absolute left-0 top-0 w-full object-contain pointer-events-none  z-10"
        />
        <img
          src="/under.svg"
          alt="galaxies background"
          className="absolute left-0 bottom-0 w-full object-contain pointer-events-none  z-10"
        />

      <div className="block bg-[#1C1C1C] absolute top-4 left-[40vw] md:left-[49vw] py-4 px-8 flex flex-row gap-8 hover:cursor-pointer z-50 rounded-md">
        <img
          src="/ginevarlogo.png"
          alt="Ginevar logo"
          className="transform  w-[5vw] md:w-[1vw] h-auto z-20"
        />
        <img
          src="/Frame.svg"
          alt="Ginevar logo"
          className="hidden transform w-[1vw] h-auto z-20"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4 sm:px-6 md:px-8">
        <motion.div className="block bg-black/60 md:bg-black" layout>
          <h1 className="text-5xl md:text-7xl font-medium font-inter flex gap-2">
            GINEVAR LABS{' '}
            <div className='hidden md:block'><span className="text-[40px] font-light align-super">&copy;</span></div>
          </h1>
        </motion.div>

        <motion.div className="block bg-black/60 md:bg-black" layout>
  <motion.p
    layout
    transition={{ layout: { duration: 0.4 } }}
    className="text-md md:text-xl mt-4 font-quicksand text-[#FFFFFF70]"
  >
    A common place full of {' '}
    <AnimatePresence mode="wait">
  {/* Outer motion.span: handles layout reflow only */}
  <motion.span
    layout
    transition={{ layout: { duration: 0.4 } }} // container reflow speed
    className="inline-block overflow-hidden border-[#FFFFFF20] border-[1px] rounded-[15px] p-2 bg-transparent -mb-4 mx-2"
    style={{ display: 'inline-block' }}
  >
    {/* Inner motion.span: handles the delayed fade-in of text */}
    <motion.span
      key={currentWord}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.4, // Wait for the container’s layout animation
      }}
      style={{ color: 'white', display: 'inline-block' }}
    >
      {currentWord}
    </motion.span>
  </motion.span>
</AnimatePresence>


    {' '}that gather and build for the world
  </motion.p>
</motion.div>

      </div>

      <footer className="absolute bottom-8 right-8 flex flex-col sm:flex-row space-y-4 sm:space-x-4 text-white z-20 font-quicksand">
        <span />
        <a
          href="https://it.linkedin.com/company/ginevar"
          className="hover:text-gray-400 bg-white p-[12px] rounded-md hover:bg-[#FFFFFF80] transition duration-150 ease-out hover:ease-in"
        >
          <img
            src="/linkedin.svg"
            alt="Ginevar logo"
            className="transform w-[5vw] md:w-[1vw] h-auto z-20"
          />
        </a>
        <a
          href="https://github.com/Ginevar-Labs"
          className="hover:text-gray-400 bg-white p-[12px] rounded-md hover:bg-[#FFFFFF80] transition duration-150 ease-out hover:ease-in"
        >
          <img
            src="/github.svg"
            alt="Ginevar logo"
            className="transform w-[5vw] md:w-[1vw] h-auto z-20"
          />
        </a>
        <a
          href="https://clutch.co/profile/ginevar-labs?_gl=1*1jtgfpu*_gcl_au*MzM4MTU1NDg3LjE3MzQxMDQwODkuMTA0NjIwNzQ5MC4xNzM2MTg0MTc3LjE3MzYxODQxNzc.*FPAU*MTI0OTI0Mjg0Ny4xNzM0MTA0MDg3*_ga*MTYyMjQ5NzQ1Mi4xNzM0MTA0MDg5*_ga_D0WFGX8X3V*MTczNjE4NDE3NC42LjEuMTczNjE4NDE4MC41NC4wLjQyMTY2MzA3NA..*_fplc*dCUyQndsRmFNTklLVWEzMGVaelBWTjlJR2VGRG5CVklVayUyRkw5Q2pnUzNiQ0trUENQTTlKN0NKQjNLcEdGT0pabTMyM0pWSUd3OVdNS1pEd3VKcVppSUM0cFNGVUlqZjkwdVVzaVZON0ZnJTJGTjZxMiUyRmI0cElhWXo4M2lVMGNpTnclM0QlM0Q.#highlights"
          className="hover:text-gray-400 bg-white p-[12px] rounded-md hover:bg-[#FFFFFF80] transition duration-150 ease-out hover:ease-in"
        >
          <img
            src="/clutch.svg"
            alt="Ginevar logo"
            className="transform w-[5vw] md:w-[1vw] h-auto z-20"
          />
        </a>
      </footer>

      <div className="absolute bottom-8 left-8 text-white text-xs md:text-sm opacity-40 font-quicksand">
        © 2025 Ginevar Labs | All rights reserved
      </div>
    </div>
  );
};

export default GinevarLabs;
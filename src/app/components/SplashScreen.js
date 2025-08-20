'use client';
import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import '../styles/SplashScreen.css';

function RocketModel() {
  const { scene } = useGLTF('/rocket.glb');
  const rocketRef = useRef();

  useFrame((state) => {
    if (rocketRef.current) {
      // Launch animation - move rocket upward over time
      const time = state.clock.getElapsedTime();
      if (time < 3) {
        // First 3 seconds: launch sequence
        rocketRef.current.position.y = -1 + (time * 2); // Move from -1 to 5
        rocketRef.current.scale.setScalar(0.1 - (time * 0.02)); // Slightly shrink as it goes up
      }
    }
  });

  return <primitive ref={rocketRef} object={scene} scale={0.1} position={[0, -1, 0]} />;
}

export default function SplashScreen({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-container">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="splash-canvas"
        >
          <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
            {/* Lights */}
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={1.2} />
            <pointLight position={[0, -2, 0]} intensity={0.8} color="#ff6600" />

            {/* Rocket with built-in animation */}
            <RocketModel />

            {/* Optional Controls (for testing) */}
            {/* <OrbitControls /> */}
          </Canvas>
        </motion.div>

        {/* Blue underline similar to namaste */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="underline"
        />
      </AnimatePresence>
    </div>
  );
}

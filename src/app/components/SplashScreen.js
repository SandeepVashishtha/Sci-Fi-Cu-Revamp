'use client';
import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Points, PointMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import '../styles/SplashScreen.css';

// Smoke Trail Component
function SmokeTrail({ rocketPosition }) {
  const smokeRef = useRef();
  const smokeCount = 100;

  const positions = useMemo(() => {
    const positions = new Float32Array(smokeCount * 3);
    for (let i = 0; i < smokeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.8;
      positions[i * 3 + 1] = Math.random() * -4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    return positions;
  }, []);

  useFrame(() => {
    if (smokeRef.current && rocketPosition) {
      const positions = smokeRef.current.geometry.attributes.position.array;
      
      for (let i = 0; i < smokeCount; i++) {
        positions[i * 3 + 1] -= 0.05; // slower than flames
        positions[i * 3] += (Math.random() - 0.5) * 0.02;
        positions[i * 3 + 2] += (Math.random() - 0.5) * 0.02;
        
        if (positions[i * 3 + 1] < rocketPosition.y - 5) {
          positions[i * 3] = (Math.random() - 0.5) * 0.5;
          positions[i * 3 + 1] = rocketPosition.y - 1;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        }
      }
      
      smokeRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={smokeRef} positions={positions}>
      <PointMaterial
        size={0.08}
        color="#666666"
        transparent
        opacity={0.4}
        sizeAttenuation={true}
      />
    </Points>
  );
}

function RocketModel() {
  const { scene } = useGLTF('/rocket.glb');
  const rocketRef = useRef();
  const rocketPosition = useRef({ y: -1 });

  useFrame((state) => {
    if (rocketRef.current) {
      const time = state.clock.getElapsedTime();
      if (time < 3) {
        const newY = -1 + (time * 2);
        rocketRef.current.position.y = newY;
        rocketRef.current.scale.setScalar(0.1 - (time * 0.02));
        rocketPosition.current.y = newY;
      }
    }
  });

  return (
    <group>
      <primitive ref={rocketRef} object={scene} scale={0.1} position={[0, -1, 0]} />
      <SmokeTrail rocketPosition={rocketPosition.current} />
    </group>
  );
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
            {/* Subtle Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={1} />
            
            {/* Gentle engine glow */}
            <pointLight 
              position={[0, -2, 0]} 
              intensity={0.8} 
              color="#cccccc" 
              distance={6}
              decay={1}
            />
            
            {/* Rocket with smoke effect */}
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

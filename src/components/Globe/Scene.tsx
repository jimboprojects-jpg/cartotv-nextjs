'use client'
import { Suspense, useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { Earth } from './Earth';
import { CountryMarker } from './CountryMarker';
import { countries, Country } from '@/data/countries';

interface GlobeContentProps {
  selectedCountry: Country | null;
  onSelectCountry: (country: Country | null) => void;
  isPaused: boolean;
}

const GlobeContent = ({ selectedCountry, onSelectCountry, isPaused }: GlobeContentProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && !selectedCountry && !isPaused) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <Earth />
      {countries.map((country) => (
        <CountryMarker
          key={country.name}
          country={country}
          onSelect={onSelectCountry}
          isSelected={selectedCountry?.name === country.name}
        />
      ))}
    </group>
  );
};

const LoadingFallback = () => (
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshBasicMaterial color="#0a1a2e" wireframe />
  </mesh>
);

export interface SceneHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  pauseRotation: () => void;
}

interface SceneProps {
  selectedCountry: Country | null;
  onSelectCountry: (country: Country | null) => void;
}

const ControlsWrapper = forwardRef<any, { selectedCountry: Country | null }>(
  ({ selectedCountry }, ref) => {
    const controlsRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      zoomIn: () => {
        if (controlsRef.current) {
          const currentDistance = controlsRef.current.getDistance();
          controlsRef.current.object.position.multiplyScalar(
            Math.max(currentDistance * 0.8, 1.5) / currentDistance
          );
          controlsRef.current.update();
        }
      },
      zoomOut: () => {
        if (controlsRef.current) {
          const currentDistance = controlsRef.current.getDistance();
          controlsRef.current.object.position.multiplyScalar(
            Math.min(currentDistance * 1.2, 4) / currentDistance
          );
          controlsRef.current.update();
        }
      },
      reset: () => {
        if (controlsRef.current) {
          controlsRef.current.reset();
        }
      },
    }));

    return (
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={1.5}
        maxDistance={4}
        rotateSpeed={0.5}
        zoomSpeed={0.5}
        autoRotate={!selectedCountry}
        autoRotateSpeed={0.5}
      />
    );
  }
);

ControlsWrapper.displayName = 'ControlsWrapper';

export const Scene = forwardRef<SceneHandle, SceneProps>(
  ({ selectedCountry, onSelectCountry }, ref) => {
    const controlsRef = useRef<any>(null);
    const [isPaused, setIsPaused] = useState(false);
    const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const pauseRotation = () => {
      setIsPaused(true);
      // Clear any existing timeout
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      // Resume rotation after 5 seconds of inactivity
      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 5000);
    };

    useImperativeHandle(ref, () => ({
      zoomIn: () => controlsRef.current?.zoomIn(),
      zoomOut: () => controlsRef.current?.zoomOut(),
      reset: () => controlsRef.current?.reset(),
      pauseRotation,
    }));

    return (
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onPointerDown={pauseRotation}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4fc3f7" />
          
          {/* Stars background */}
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1}
          />

          {/* Main globe content */}
          <GlobeContent 
            selectedCountry={selectedCountry} 
            onSelectCountry={onSelectCountry}
            isPaused={isPaused}
          />

          {/* Controls */}
          <ControlsWrapper ref={controlsRef} selectedCountry={selectedCountry} />
          
          <Preload all />
        </Suspense>
      </Canvas>
    );
  }
);

Scene.displayName = 'Scene';

'use client'
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Country, getMarkerColor, getMarkerSize } from '@/data/countries';

interface CountryMarkerProps {
  country: Country;
  onSelect: (country: Country | null) => void;
  isSelected: boolean;
}

// Convert lat/lng to 3D position on sphere
const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
};

export const CountryMarker = ({ country, onSelect, isSelected }: CountryMarkerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const position = latLngToVector3(country.lat, country.lng, 1.02);
  const color = getMarkerColor(country.color);
  const baseSize = getMarkerSize();
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered || isSelected ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.2 + 1;
      glowRef.current.scale.setScalar(pulse * (hovered ? 1.8 : 1.4));
    }
  });

  return (
    <group position={position}>
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[baseSize * 2, 16, 16]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2}
        />
      </mesh>
      
      {/* Main marker */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(isSelected ? null : country);
        }}
      >
        <sphereGeometry args={[baseSize, 32, 32]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={hovered || isSelected ? 1 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Country name label on hover */}
      {hovered && !isSelected && (
        <Html
          position={[0, baseSize + 0.03, 0]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div className="glass-panel px-2 py-1 animate-fade-in whitespace-nowrap">
            <p className="text-xs font-medium text-foreground">{country.name}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

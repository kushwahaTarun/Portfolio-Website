"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

function DistortBlob() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.14;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
      <Sphere ref={meshRef} args={[1.4, 32, 32]}>
        <MeshDistortMaterial
          color="#ffb547"
          attach="material"
          distort={0.4}
          speed={1.1}
          roughness={0.25}
          metalness={0.7}
        />
      </Sphere>
    </Float>
  );
}

function SmallOrb({
  position,
  color,
  size = 0.3,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
}) {
  return (
    <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh position={position}>
        <sphereGeometry args={[size, 20, 20]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.4}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0, 5.4], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={inView ? "always" : "never"}
        performance={{ min: 0.5 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.1} />
          <pointLight position={[-4, -2, -3]} intensity={0.7} color="#7dd3fc" />
          <pointLight position={[3, -3, 2]} intensity={0.5} color="#c084fc" />

          <DistortBlob />

          <SmallOrb position={[2.6, 1.4, -1]} color="#7dd3fc" size={0.28} />
          <SmallOrb position={[-2.4, -1.2, -0.5]} color="#c084fc" size={0.2} />
          <SmallOrb position={[-2.2, 1.6, 1]} color="#fb7185" size={0.16} />
          <SmallOrb position={[2.2, -1.6, 0.5]} color="#34d399" size={0.14} />
        </Suspense>
      </Canvas>
    </div>
  );
}

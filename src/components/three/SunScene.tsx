import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

// Silence Three.js Clock deprecation warning
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && (args[0].includes("THREE.Clock") || args[0].includes("deprecated"))) {
      return;
    }
    originalWarn(...args);
  };
}

const SUN_PATH = "/models/sun.glb";

function Sun() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/sun.glb");
  const [hovered, setHovered] = useState(false);

  // Normalize and auto-center the Sun mesh to (0, 0, 0)
  const model = useMemo(() => {
    const clone = SkeletonUtils.clone(scene);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 0) {
      const scale = 2.4 / maxDim;
      clone.scale.setScalar(scale);
      clone.position.copy(center).multiplyScalar(-scale);
    }
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    const current = group.current;
    if (!current) return;
    const frameDelta = Math.min(delta, 0.05);
    current.rotation.y -= frameDelta * (hovered ? 0.45 : 0.16);
    current.rotation.x = THREE.MathUtils.lerp(
      current.rotation.x,
      hovered ? state.pointer.y * 0.2 : 0,
      0.1
    );
  });

  return (
    <group
      ref={group}
      onPointerEnter={() => {
        setHovered(true);
        document.body.style.cursor = "grab";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      <primitive object={model} />
    </group>
  );
}

export default function SunScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onPointerMissed={() => {
        document.body.style.cursor = "";
      }}
    >
      {/* Increased ambient & warm directional lights to ensure visibility */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 5, 5]} intensity={2.5} color="#fff4e6" />
      <pointLight position={[-4, -3, -2]} intensity={2.0} color="#f58220" />

      <Sun />
    </Canvas>
  );
}

useGLTF.preload(SUN_PATH);
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

const SUN_PATH = "/models/sun.glb";
const DRACO_PATH = "/draco/";

function Sun() {
  const group = useRef<THREE.Group>(null);
  // Pass the local draco path as the second argument
  const { scene } = useGLTF(SUN_PATH, DRACO_PATH);
  const [hovered, setHovered] = useState(false);

  // Normalize and auto-center the geometry to (0, 0, 0)
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
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={2.2} />
      <directionalLight position={[5, 5, 5]} intensity={2.8} />
      <pointLight position={[-4, -3, -2]} intensity={2.5} color="#f58220" />
      <Sun />
    </Canvas>
  );
}

// Preload using the local draco path
useGLTF.preload(SUN_PATH, DRACO_PATH);
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

function Sun() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/sun.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const [hovered, setHovered] = useState(false);

  const canvasWidth = useThree((state) => state.size.width);

  const responsiveScale = THREE.MathUtils.clamp(
    canvasWidth * 0.00025,
    0.035,
    0.26,
  );

  useEffect(() => {
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        material.side = THREE.FrontSide;

        // Reset base tint and remove any forced emissive multipliers
        if (material.color) {
          material.color.setRGB(1.0, 1.0, 1.0);
        }
        if (material.emissive) {
          material.emissive.setRGB(0.0, 0.0, 0.0);
          material.emissiveIntensity = 0.0;
        }

        // Fix: Explicit sRGB prevents the flat, desaturated washout seen on Vercel
        if (material.map) {
          material.map.colorSpace = THREE.SRGBColorSpace;
          material.map.needsUpdate = true;
        }
        if (material.emissiveMap) {
          material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
          material.emissiveMap.needsUpdate = true;
        }

        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          material.roughness = 0.85;
          material.metalness = 0.0;
          
          // Moderate environment influence preserves depth and texture details
          material.envMapIntensity = 0.4; 
        }

        material.needsUpdate = true;
      });
    });
  }, [clone]);

  useFrame((state, delta) => {
    const current = group.current;
    if (!current) return;

    const frameDelta = Math.min(delta, 0.05);
    const easing = 1 - Math.exp(-3 * frameDelta);

    current.rotation.y -= frameDelta * (hovered ? 0.55 : 0.18);

    current.rotation.x = THREE.MathUtils.lerp(
      current.rotation.x,
      hovered ? state.pointer.y * 0.16 : 0,
      easing,
    );

    current.rotation.z = THREE.MathUtils.lerp(
      current.rotation.z,
      hovered ? -state.pointer.x * 0.16 : 0,
      easing,
    );
  });

  return (
    <group
      ref={group}
      scale={responsiveScale}
      position={[0, 0, 0]}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "grab";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      <primitive object={clone} />
    </group>
  );
}

export default function SunScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        // Dialing in exposure to preserve original golden brightness without overexposure
        toneMappingExposure: 0.9, 
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onPointerMissed={() => {
        document.body.style.cursor = "";
      }}
    >
      {/* Warm natural ambient fill keeps shadows rich without stripping color */}
      <ambientLight intensity={0.45} color="#ffd8a8" />

      {/* Main fiery key light hits from the side to spotlight the texture detail */}
      <directionalLight
        position={[4, 5, 5]}
        intensity={1.3}
        color="#ff9d33"
      />

      {/* Edge accentuation from below */}
      <pointLight
        position={[-4, -1, 3]}
        intensity={0.65}
        color="#ff5500"
      />

      <Environment resolution={256}>
        <Lightformer
          intensity={0.8}
          color="#ffd480"
          position={[0, 5, 0]}
          scale={[10, 10, 1]}
        />
        {/* Soft fill accent matching the original warm vibe */}
        <Lightformer
          intensity={0.4}
          color="#ff7a33"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[20, 2, 1]}
        />
      </Environment>

      <Sun />
    </Canvas>
  );
}

useGLTF.preload("/models/sun.glb");
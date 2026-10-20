import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
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

        if (material.map) material.map.colorSpace = THREE.SRGBColorSpace;
        if (material.emissiveMap) material.emissiveMap.colorSpace = THREE.SRGBColorSpace;

        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          // 1. Overdrive base red channel to 8x intensity (R: 8.0, G: 0.0, B: 0.0)
          material.color.setRGB(8.0, 0.0, 0.0);

          // 2. Overdrive emissive glow with pure crimson
          material.emissive.setRGB(4.0, 0.0, 0.0);
          material.emissiveIntensity = 2.5;

          // 3. Kill all reflections so no ambient white or grey dilutes the red
          material.roughness = 1.0;
          material.metalness = 0.0;
          material.envMapIntensity = 0.0;
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
        // NoToneMapping prevents Three.js from converting intense reds into yellow/white
        toneMapping: THREE.NoToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onPointerMissed={() => {
        document.body.style.cursor = "";
      }}
    >
      {/* Deep dark maroon base ambient */}
      <ambientLight intensity={0.5} color="#400000" />

      {/* Pure maximum scarlet key light on the right hemisphere */}
      <directionalLight
        position={[6, 1, 4]}
        intensity={5.0}
        color="#ff0000"
      />

      {/* Side spot creating the intense red half */}
      <pointLight
        position={[4, -1, 3]}
        intensity={8.0}
        distance={15}
        color="#ff0000"
      />

      <Sun />
    </Canvas>
  );
}

useGLTF.preload("/models/sun.glb");
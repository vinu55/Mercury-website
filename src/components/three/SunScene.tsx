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

        // Reset base tint and emission back to pure default (model's original texture colors)
        material.color = new THREE.Color("#ffffff");
        material.emissive = new THREE.Color("#000000");
        material.emissiveIntensity = 0;

        // Ensure textures are rendered in correct sRGB color space
        if (material.map) material.map.colorSpace = THREE.SRGBColorSpace;
        if (material.emissiveMap) material.emissiveMap.colorSpace = THREE.SRGBColorSpace;

        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          material.roughness = 0.85;
          // Keep envMap subtle so it doesn't leave a milky/faded film over the texture
          material.envMapIntensity = 0.35;
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
        // Kept at 0.85 to avoid overexposing the warm highlights into pale yellow
        toneMappingExposure: 0.85,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onPointerMissed={() => {
        document.body.style.cursor = "";
      }}
    >
      {/* Warm, balanced ambient fill */}
      <ambientLight intensity={0.4} color="#ffe0b2" />

      {/* Main warm sun key light */}
      <directionalLight
        position={[4, 5, 5]}
        intensity={1.2}
        color="#ffab40"
      />

      {/* Warm orange depth fill */}
      <pointLight
        position={[-4, -1, 3]}
        intensity={0.6}
        color="#ff6e40"
      />

      {/* Natural soft environment lightformers without cold blues */}
      <Environment resolution={256}>
        <Lightformer
          intensity={0.8}
          color="#ffd180"
          position={[0, 5, 0]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          intensity={0.4}
          color="#ff9e80"
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
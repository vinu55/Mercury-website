import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

function Sun() {
  const group = useRef<THREE.Group>(null);
  
  // Load model safely
  const { scene } = useGLTF("/models/sun.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const [hovered, setHovered] = useState(false);

  const { gl, size } = useThree();

  const responsiveScale = THREE.MathUtils.clamp(
    size.width * 0.0003,
    0.045,
    0.3,
  );

  useEffect(() => {
    // Enable max anisotropy so textures don't blur out at oblique angles on laptops/phones
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        if (!material) return;
        material.side = THREE.DoubleSide;

        // Force sRGB color space & enhance texture filtering for clarity
        const configureTexture = (tex: THREE.Texture | null) => {
          if (!tex) return;
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.generateMipmaps = true;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.anisotropy = maxAnisotropy;
          tex.needsUpdate = true;
        };

        configureTexture(material.map);
        configureTexture(material.emissiveMap);

        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          // Allow full surface detail without aggressive blur/roughness clamping
          material.roughness = Math.min(material.roughness, 0.35);
          material.envMapIntensity = 1.0; // Boost reflections

          if (material.emissiveIntensity !== undefined) {
            material.emissiveIntensity = Math.max(material.emissiveIntensity, 1.4);
          }
        }

        material.needsUpdate = true;
      });
    });
  }, [clone, gl]);

  useFrame((state, delta) => {
    const current = group.current;
    if (!current) return;

    const frameDelta = Math.min(delta, 0.05);
    const easing = 1 - Math.exp(-4 * frameDelta);

    current.rotation.y -= frameDelta * (hovered ? 0.45 : 0.15);

    current.rotation.x = THREE.MathUtils.lerp(
      current.rotation.x,
      hovered ? state.pointer.y * 0.2 : 0,
      easing,
    );

    current.rotation.z = THREE.MathUtils.lerp(
      current.rotation.z,
      hovered ? -state.pointer.x * 0.2 : 0,
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
      dpr={[1, 2]} // High-DPI support for crisp rendering on retina/mobile screens
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2, // Increased brightness/exposure for vibrant solar textures
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      onPointerMissed={() => {
        document.body.style.cursor = "";
      }}
    >
      <ambientLight intensity={0.4} color="#fff2e6" />

      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#ffa500"
      />

      {/* Rim light for a realistic solar corona atmospheric glow */}
      <pointLight
        position={[0, 0, -2]}
        intensity={2.5}
        color="#ff3300"
        distance={10}
      />

      <Environment resolution={512}>
        <Lightformer
          intensity={1.5}
          color="#ffaa44"
          position={[0, 5, 2]}
          scale={[12, 12, 1]}
        />
        <Lightformer
          intensity={0.8}
          color="#ff2200"
          position={[-6, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[20, 4, 1]}
        />
      </Environment>

      <Sun />
    </Canvas>
  );
}

useGLTF.preload("/models/sun.glb");
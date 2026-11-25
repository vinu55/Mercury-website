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

        const configureTexture = (tex: THREE.Texture | null) => {
          if (!tex) return;
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = maxAnisotropy;
          tex.needsUpdate = true;
        };

        if ("map" in material) {
          configureTexture(material.map);
        }
        if ("emissiveMap" in material) {
          configureTexture(material.emissiveMap);
        }

        // Fallback solar glow if embedded GLB texture fails to decode
        if (
          material instanceof THREE.MeshStandardMaterial &&
          (!material.map || !material.map.image)
        ) {
          material.color = new THREE.Color("#f58220");
          material.emissive = new THREE.Color("#ff4500");
          material.emissiveIntensity = 0.85;
          material.roughness = 0.4;
          material.needsUpdate = true;
        }
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

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

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
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
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

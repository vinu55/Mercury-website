import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

function Sun() {
  const group = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const [hovered, setHovered] = useState(false);

  const { scene } = useGLTF("/models/sun.glb");

  // Auto-center and normalize scale so the Sun is always visible on localhost & live
  const normalizedSun = useMemo(() => {
    const clone = SkeletonUtils.clone(scene);
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;

    clone.position.sub(center);
    clone.scale.setScalar(3.4 / maxDim);

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
        if ("map" in material && material.map) {
          material.map.anisotropy = maxAnisotropy;
        }
        if ("emissiveMap" in material && material.emissiveMap) {
          material.emissiveMap.anisotropy = maxAnisotropy;
        }
      });
    });

    return clone;
  }, [scene, gl]);

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
      <primitive object={normalizedSun} />
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

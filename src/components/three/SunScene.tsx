import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

// Filter out vendor-level THREE.Clock deprecation warnings
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) {
      return;
    }
    originalWarn(...args);
  };
}

const SUN_PATH = "/models/sun.glb";
const DRACO_PATH = "/draco/";

function Sun() {
  const group = useRef<THREE.Group>(null);
  
  // 1. Pass local draco path
  const { scene } = useGLTF(SUN_PATH, DRACO_PATH);
  const [hovered, setHovered] = useState(false);

  // 2. Clone and center the bounding box to (0,0,0)
  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 0) {
      // Normalize model to a standard dimension of ~2.4 units
      const scaleMultiplier = 2.4 / maxDim;
      cloned.scale.setScalar(scaleMultiplier);
      cloned.position.copy(center).multiplyScalar(-scaleMultiplier);
    }
    return cloned;
  }, [scene]);

  const canvasWidth = useThree((state) => state.size.width);

  // 3. Normalized responsive scale
  const responsiveScale = useMemo(() => {
    if (canvasWidth < 640) return 0.85;
    if (canvasWidth < 1024) return 1.05;
    return 1.25;
  }, [canvasWidth]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  useEffect(() => {
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        if (!material) return;
        material.side = THREE.FrontSide;

        if (material.map && material.map.image) {
          material.map.colorSpace = THREE.SRGBColorSpace;
          material.map.needsUpdate = true;
        }
        if (material.emissiveMap && material.emissiveMap.image) {
          material.emissiveMap.colorSpace = THREE.SRGBColorSpace;
          material.emissiveMap.needsUpdate = true;
        }

        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          material.roughness = Math.max(material.roughness, 0.4);
          material.envMapIntensity = 0.8;

          if (material.emissiveIntensity !== undefined) {
            material.emissiveIntensity = Math.max(material.emissiveIntensity || 1, 1.2);
          }
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

    current.rotation.y -= frameDelta * (hovered ? 0.45 : 0.16);

    current.rotation.x = THREE.MathUtils.lerp(
      current.rotation.x,
      hovered ? state.pointer.y * 0.16 : 0,
      easing
    );

    current.rotation.z = THREE.MathUtils.lerp(
      current.rotation.z,
      hovered ? -state.pointer.x * 0.16 : 0,
      easing
    );
  });

  return (
    <group
      ref={group}
      scale={responsiveScale}
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
    <div className="relative h-full w-full" key="sun-canvas-container">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onPointerMissed={() => {
          document.body.style.cursor = "";
        }}
      >
        <ambientLight intensity={1.8} color="#ffeedd" />
        <directionalLight position={[4, 5, 5]} intensity={2.5} color="#ff9944" />
        <pointLight position={[-4, -1, 3]} intensity={2.0} color="#ff4411" />

        <Environment resolution={256}>
          <Lightformer intensity={1.5} color="#ff8833" position={[0, 5, 0]} scale={[10, 10, 1]} />
          <Lightformer intensity={1.0} color="#ff4400" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 2, 1]} />
        </Environment>

        <Sun />
      </Canvas>
    </div>
  );
}

useGLTF.preload(SUN_PATH, DRACO_PATH);
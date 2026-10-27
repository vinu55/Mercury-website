import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

const SUN_MODEL_PATH = "/models/sun.glb";
const SUN_TEXTURE_PATH = "/models/mercurylogo.png"; // or your sun texture image in public/models/

// ... Keep your CanvasErrorBoundary and FallbackSun as they are ...

function SunModel() {
  const { scene } = useGLTF(SUN_MODEL_PATH);
  
  // Load texture as a clean direct HTTP asset (NO BLOBS)
  const texture = useTexture(SUN_TEXTURE_PATH);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(scene);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 0) {
      const scaleMultiplier = 2.4 / maxDim;
      cloned.scale.setScalar(scaleMultiplier);
      cloned.position.copy(center).multiplyScalar(-scaleMultiplier);
    }
    return cloned;
  }, [scene]);

  const canvasWidth = useThree((state) => state.size.width);

  const responsiveScale = useMemo(() => {
    if (canvasWidth < 640) return 0.85;
    if (canvasWidth < 1024) return 1.05;
    return 1.25;
  }, [canvasWidth]);

  useEffect(() => {
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Force a stable standard material without broken embedded GLTF textures
        child.material = new THREE.MeshStandardMaterial({
          map: texture,
          emissiveMap: texture,
          emissive: new THREE.Color("#ff5500"),
          emissiveIntensity: 1.5,
          roughness: 0.4,
          metalness: 0.1,
          side: THREE.FrontSide,
        });
      }
    });
  }, [clone, texture]);

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
      onPointerEnter={(e) => {
        e.stopPropagation();
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
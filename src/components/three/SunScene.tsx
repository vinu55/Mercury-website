import { useEffect, useMemo, useRef, useState, Suspense, Component, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

// Cache buster forces clients to re-fetch the new valid model
const SUN_PATH = "/models/sun.glb?v=4";

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Sun model failed to load, falling back to procedural sun:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback sun mesh if the GLB file is missing or corrupted
function FallbackSun() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#ff7700"
        emissive="#ff4400"
        emissiveIntensity={2}
        roughness={0.3}
      />
    </mesh>
  );
}

function SunModel() {
  const { scene } = useGLTF(SUN_PATH);
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

      materials.forEach((mat) => {
        if (!mat) return;
        mat.side = THREE.FrontSide;

        if (mat.map && mat.map instanceof THREE.Texture) {
          mat.map.colorSpace = THREE.SRGBColorSpace;
          mat.map.needsUpdate = true;
        }
        if (mat.emissiveMap && mat.emissiveMap instanceof THREE.Texture) {
          mat.emissiveMap.colorSpace = THREE.SRGBColorSpace;
          mat.emissiveMap.needsUpdate = true;
        }

        if (
          mat instanceof THREE.MeshStandardMaterial ||
          mat instanceof THREE.MeshPhysicalMaterial
        ) {
          mat.roughness = Math.max(mat.roughness, 0.4);
          mat.envMapIntensity = 0.8;

          if (mat.emissiveIntensity !== undefined) {
            mat.emissiveIntensity = Math.max(mat.emissiveIntensity || 1, 1.2);
          }
        }

        mat.needsUpdate = true;
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
          <Lightformer
            intensity={1.5}
            color="#ff8833"
            position={[0, 5, 0]}
            scale={[10, 10, 1]}
          />
          <Lightformer
            intensity={1.0}
            color="#ff4400"
            position={[-5, 1, -1]}
            rotation-y={Math.PI / 2}
            scale={[20, 2, 1]}
          />
        </Environment>

        <CanvasErrorBoundary fallback={<FallbackSun />}>
          <Suspense fallback={<FallbackSun />}>
            <SunModel />
          </Suspense>
        </CanvasErrorBoundary>
      </Canvas>
    </div>
  );
}

try {
  useGLTF.preload(SUN_PATH);
} catch {
  // Suppress uncaught module-level preloading failure
}
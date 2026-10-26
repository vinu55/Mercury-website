import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

const GLOBE_PATH = "/models/earth_globe-optimized.glb";
const GLOBE_RADIUS = 0.675;

const GLOBE_ROTATION_X = 180;
const GLOBE_ROTATION_Y = 250;
const GLOBE_ROTATION_Z = -45;

type PartnerLocation = {
  name: string;
  flag: string;
  lat: number;
  lon: number;
  color: string;
  code: string;
};

const initialLocations: PartnerLocation[] = [
  { name: "India", flag: "🇮🇳", lat: -28.05, lon: -138.76, color: "#FF7A00", code: "IND" },
  { name: "Vietnam", flag: "🇻🇳", lat: -34.42, lon: -177.49, color: "#FFD000", code: "VNM" },
  { name: "Indonesia", flag: "🇮🇩", lat: -21.96, lon: 170.08, color: "#FFD000", code: "IDN" },
  { name: "China", flag: "🇨🇳", lat: -50.92, lon: -149.77, color: "#FFD000", code: "CHN" },
  { name: "Malaysia", flag: "🇲🇾", lat: -23.97, lon: -173.1, color: "#FFD000", code: "MYS" },
  { name: "Singapore", flag: "🇸🇬", lat: -21.54, lon: -175.81, color: "#FFD000", code: "SGP" },
  { name: "Germany", flag: "🇩🇪", lat: -33.43, lon: -68.35, color: "#FFD000", code: "DEU" },
  { name: "Finland", flag: "🇫🇮", lat: -47.13, lon: -68.69, color: "#FFD000", code: "FIN" },
];

function latLonToVector(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

type GlobeModelProps = {
  selected: string | null;
  labelCountry: string | null;
  onSelectCountry: (name: string) => void;
  groupRef: React.RefObject<THREE.Group | null>;
  focusRequest: number;
};

function GlobeModel({
  selected,
  labelCountry,
  onSelectCountry,
  groupRef,
  focusRequest,
}: GlobeModelProps) {
  const { scene } = useGLTF(GLOBE_PATH);
  const targetQuaternion = useRef(new THREE.Quaternion());
  const focusProgress = useRef(1);
  const pauseRemaining = useRef(0);
  const lastFocusRequest = useRef(focusRequest);

  const baseQuaternion = useMemo(
    () =>
      new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          THREE.MathUtils.degToRad(GLOBE_ROTATION_X),
          THREE.MathUtils.degToRad(GLOBE_ROTATION_Y),
          THREE.MathUtils.degToRad(GLOBE_ROTATION_Z),
          "XYZ",
        ),
      ),
    [],
  );

  const model = useMemo(() => {
    const clone = SkeletonUtils.clone(scene);

    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z);

    if (maxDimension > 0) {
      const scale = (GLOBE_RADIUS * 2) / maxDimension;
      clone.scale.setScalar(scale);
      clone.position.copy(center).multiplyScalar(-scale);
    }

    return clone;
  }, [scene]);

  useEffect(() => {
    model.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        material.side = THREE.FrontSide;
        material.needsUpdate = true;

        if (
          material instanceof THREE.MeshStandardMaterial ||
          material instanceof THREE.MeshPhysicalMaterial
        ) {
          material.roughness = Math.min(material.roughness, 0.85);
          material.envMapIntensity = 0.8;
        }
      });
    });
  }, [model]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (lastFocusRequest.current !== focusRequest) {
      lastFocusRequest.current = focusRequest;

      const location = initialLocations.find(
        (item) => item.name === selected,
      );

      if (location) {
        const markerPosition = latLonToVector(
          location.lat,
          location.lon,
          GLOBE_RADIUS * 1.025,
        ).normalize();

        const markerWorldDirection = markerPosition
          .clone()
          .applyQuaternion(baseQuaternion)
          .normalize();

        const targetRotation = new THREE.Quaternion().setFromUnitVectors(
          markerWorldDirection,
          new THREE.Vector3(0, 0, 1),
        );

        targetQuaternion.current
          .copy(targetRotation)
          .multiply(baseQuaternion);

        focusProgress.current = 0;
        pauseRemaining.current = 1.5;
      }
    }

    const frameDelta = Math.min(delta, 0.05);

    if (focusProgress.current < 1) {
      focusProgress.current = Math.min(
        1,
        focusProgress.current + frameDelta / 0.7,
      );

      const eased =
        focusProgress.current *
        focusProgress.current *
        (3 - 2 * focusProgress.current);

      group.quaternion.slerp(targetQuaternion.current, eased);
      return;
    }

    if (pauseRemaining.current > 0) {
      pauseRemaining.current = Math.max(
        0,
        pauseRemaining.current - frameDelta,
      );
      return;
    }

    group.rotation.y += frameDelta * 0.025;
  });

  return (
    <group ref={groupRef} quaternion={baseQuaternion}>
      <primitive object={model} />

      {initialLocations.map((location) => {
        const position = latLonToVector(
          location.lat,
          location.lon,
          GLOBE_RADIUS * 1.025,
        );

        const isSelected = selected === location.name;
        const showLabel = labelCountry === location.name;

        return (
          <group
            key={location.name}
            position={position}
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 0, 1),
              position.clone().normalize(),
            )}
          >
            {isSelected && (
              <>
                <mesh>
                  <circleGeometry args={[0.07, 32]} />
                  <meshBasicMaterial
                    color={location.color}
                    transparent
                    opacity={0.24}
                    depthWrite={false}
                    depthTest={false}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                <mesh>
                  <circleGeometry args={[0.043, 32]} />
                  <meshBasicMaterial
                    color={location.color}
                    transparent
                    opacity={0.65}
                    depthWrite={false}
                    depthTest={false}
                    side={THREE.DoubleSide}
                  />
                </mesh>
              </>
            )}

            <mesh
              onClick={(event) => {
                event.stopPropagation();
                onSelectCountry(location.name);
              }}
            >
              <circleGeometry
                args={[isSelected ? 0.029 : 0.022, 32]}
              />
              <meshBasicMaterial
                color={location.color}
                toneMapped={false}
                depthTest={false}
                side={THREE.DoubleSide}
              />
            </mesh>

            {showLabel && (
              <Html
                center
                distanceFactor={2.4}
                position={[0, 0.09, 0]}
                zIndexRange={[30, 0]}
                style={{ pointerEvents: "none" }}
              >
                <div
                  className="whitespace-nowrap rounded-md border px-2.5 py-1 text-xs font-semibold text-white shadow-lg"
                  style={{
                    backgroundColor: "#061A34",
                    borderColor: `${location.color}99`,
                    boxShadow: `0 0 16px ${location.color}70`,
                  }}
                >
                  {location.flag} {location.name}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function LoadingGlobe() {
  const { progress, errors } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 whitespace-nowrap">
        <div className="size-9 animate-spin rounded-full border-2 border-slate-300 border-t-[#F58220]" />

        <p className="text-xs font-medium text-[#061A34]">
          {errors.length > 0
            ? "Unable to load Earth"
            : `Loading Earth… ${Math.round(progress)}%`}
        </p>
      </div>
    </Html>
  );
}

type EarthSceneProps = {
  focusCountries?: string[];
};

export default function EarthScene({
  focusCountries = [],
}: EarthSceneProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [labelCountry, setLabelCountry] = useState<string | null>(null);
  const [focusRequest, setFocusRequest] = useState(0);
  const groupRef = useRef<THREE.Group>(null);
  const previousFocus = useRef("");

  function selectCountry(name: string) {
    setSelected(name);
    setLabelCountry(name);
    setFocusRequest((current) => current + 1);
  }

  useEffect(() => {
    if (!labelCountry) return;

    const timer = window.setTimeout(() => {
      setLabelCountry(null);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [labelCountry]);

  useEffect(() => {
    const code = focusCountries[0] ?? "";

    if (!code || code === previousFocus.current) return;

    previousFocus.current = code;

    const country = initialLocations.find(
      (location) => location.code === code,
    );

    if (country) {
      selectCountry(country.name);
    }
  }, [focusCountries]);

  return (
    <section className="mx-auto w-full">
      <div className="relative mx-auto h-[360px] w-full max-w-[1200px] overflow-hidden touch-none sm:h-[440px] md:h-[520px] lg:h-[600px]">
        <Canvas
          camera={{ position: [0, 0, 2.7], fov: 42 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={1.7} />
          <directionalLight position={[4, 3, 5]} intensity={2.4} />
          <pointLight
            position={[-3, -2, -3]}
            color="#294F8F"
            intensity={3}
          />

          <Suspense fallback={<LoadingGlobe />}>
            <GlobeModel
              selected={selected}
              labelCountry={labelCountry}
              onSelectCountry={selectCountry}
              groupRef={groupRef}
              focusRequest={focusRequest}
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableRotate
            enableZoom
            minDistance={1.8}
            maxDistance={4.8}
            rotateSpeed={0.55}
            zoomSpeed={0.7}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>
      </div>
    </section>
  );
}

useGLTF.preload(GLOBE_PATH);
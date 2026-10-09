import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
function Sun(){const group=useRef<THREE.Group>(null);const {scene}=useGLTF("/models/sun.glb");const clone=useMemo(()=>SkeletonUtils.clone(scene),[scene]);useEffect(()=>{clone.traverse(o=>{if((o as THREE.Mesh).isMesh){o.castShadow=true}})},[clone]);useFrame((state,delta)=>{if(!group.current)return;const dt=Math.min(delta,.05);group.current.rotation.y+=dt*.18;group.current.rotation.x=THREE.MathUtils.lerp(group.current.rotation.x,state.pointer.y*.08,1-Math.exp(-3*dt));group.current.rotation.z=THREE.MathUtils.lerp(group.current.rotation.z,-state.pointer.x*.08,1-Math.exp(-3*dt))});return <group ref={group} scale={.18}><primitive object={clone}/></group>}
export default function SunScene(){return <Canvas dpr={[1,1.5]} camera={{position:[0,0,6],fov:40}} gl={{antialias:true,alpha:true}}><ambientLight intensity={1.2}/><directionalLight position={[4,5,5]} intensity={3} color="#ffb35a"/><Environment><Lightformer intensity={2} position={[0,5,0]} scale={[10,10,1]}/><Lightformer intensity={1} color="#4e8fc8" position={[-5,1,-1]} rotation-y={Math.PI/2} scale={[20,2,1]}/></Environment><Suspense fallback={null}><Sun/></Suspense></Canvas>}
useGLTF.preload("/models/sun.glb");

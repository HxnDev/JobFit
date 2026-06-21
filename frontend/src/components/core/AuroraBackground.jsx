import { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, Icosahedron } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

/* --------------------------------------------------------------- shaders */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 3.0;
    float t = uTime * 0.05;

    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(p + 2.0 * q + vec2(1.7, 9.2) + 0.15 * t + uMouse * 0.5),
      fbm(p + 2.0 * q + vec2(8.3, 2.8) - 0.12 * t)
    );
    float f = fbm(p + 2.5 * r);

    vec3 deep    = vec3(0.024, 0.027, 0.055);
    vec3 violet  = vec3(0.48, 0.42, 1.0);
    vec3 indigo  = vec3(0.20, 0.18, 0.62);
    vec3 emerald = vec3(0.12, 0.88, 0.66);

    vec3 col = mix(deep, indigo, smoothstep(0.15, 0.8, f));
    col = mix(col, violet, smoothstep(0.45, 1.0, f * (0.6 + r.x)));
    col = mix(col, emerald, smoothstep(0.62, 1.15, f * r.y * 1.8));

    // filament highlights to feed the bloom
    float fil = smoothstep(0.78, 0.92, f) * 0.6;
    col += fil * vec3(0.5, 0.45, 0.9);

    float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
    col *= mix(0.4, 1.05, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function AuroraPlane() {
  const ref = useRef();
  const { viewport } = useThree();
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2(0, 0) } }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMouse.value.lerp(state.pointer, 0.04);
    if (ref.current) ref.current.scale.set(viewport.width * 1.05, viewport.height * 1.05, 1);
  });

  return (
    <mesh ref={ref} position={[0, 0, -2]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthWrite={false}
      />
    </mesh>
  );
}

function Core({ detail = 6 }) {
  const group = useRef();
  const shell = useRef();

  useFrame((state, delta) => {
    if (group.current) {
      // gentle parallax toward the pointer
      group.current.rotation.y += (state.pointer.x * 0.4 - group.current.rotation.y) * 0.04;
      group.current.rotation.x += (-state.pointer.y * 0.3 - group.current.rotation.x) * 0.04;
    }
    if (shell.current) {
      shell.current.rotation.x -= delta * 0.08;
      shell.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={group} position={[0, 0, 1.4]}>
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.1}>
        <Icosahedron args={[1.05, detail]}>
          <MeshDistortMaterial
            color="#5B4FE0"
            emissive="#7B6CFF"
            emissiveIntensity={0.7}
            roughness={0.12}
            metalness={0.5}
            distort={0.4}
            speed={1.8}
          />
        </Icosahedron>

        <Icosahedron ref={shell} args={[1.55, 1]}>
          <meshBasicMaterial color="#5FFBD0" wireframe transparent opacity={0.12} />
        </Icosahedron>
      </Float>

      <Sparkles count={40} scale={6} size={2.4} speed={0.4} color="#9D8CFF" opacity={0.7} />
      <Sparkles count={25} scale={7} size={1.6} speed={0.3} color="#5FFBD0" opacity={0.6} />
    </group>
  );
}

/**
 * Fixed full-bleed WebGL backdrop: a domain-warped aurora shader plane plus a
 * floating, distorting "intelligence core" lit for bloom. Tiered by device
 * and fully skipped under prefers-reduced-motion (the CSS gradient remains).
 */
const AuroraBackground = () => {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (reduced) return null;

  return (
    <div className="jf-bg-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1.3 : 1.8]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[4, 3, 5]} intensity={2.2} color="#9D8CFF" />
          <pointLight position={[-5, -2, 2]} intensity={1.6} color="#1FE0A8" />
          <AuroraPlane />
          <Core detail={isMobile ? 4 : 6} />
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.18} intensity={0.85} mipmapBlur radius={0.8} />
            <Vignette eskil={false} offset={0.25} darkness={0.85} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AuroraBackground;

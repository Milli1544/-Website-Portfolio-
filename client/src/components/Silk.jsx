/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  forwardRef,
  useRef,
  useMemo,
  useLayoutEffect,
  useEffect,
  useState,
} from "react";
import { Color } from "three";

const hexToNormalizedRGB = (hex) => {
  hex = hex.replace("#", "");
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

const SilkPlane = forwardRef(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [ref, viewport]);

  useFrame((_, delta) => {
    if (ref.current?.material?.uniforms?.uTime) {
      ref.current.material.uniforms.uTime.value += delta * 0.2; // Further reduced speed
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
});

SilkPlane.displayName = "SilkPlane";

const Silk = ({
  speed = 5,
  scale = 1,
  color = "#7B7481",
  noiseIntensity = 1.5,
  rotation = 0,
}) => {
  const meshRef = useRef();
  const canvasRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    [speed, scale, noiseIntensity, color, rotation]
  );

  useEffect(() => {
    // Check if device is capable of handling 3D content
    const checkDeviceCapability = () => {
      const isLowEndDevice =
        navigator.hardwareConcurrency <= 4 ||
        navigator.deviceMemory <= 4 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      // Only load on high-end devices and after a longer delay
      if (!isLowEndDevice) {
        setTimeout(() => setShouldLoad(true), 2000); // Increased delay to 2s
      }
    };

    checkDeviceCapability();
  }, []);

  useEffect(() => {
    if (shouldLoad) {
      // Additional delay before showing
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [shouldLoad]);

  useEffect(() => {
    // Reset animation time on mount
    if (meshRef.current?.material?.uniforms?.uTime) {
      meshRef.current.material.uniforms.uTime.value = 0;
    }

    // Cleanup function
    return () => {
      if (meshRef.current?.material?.uniforms?.uTime) {
        meshRef.current.material.uniforms.uTime.value = 0;
      }
      if (canvasRef.current) {
        canvasRef.current.dispose?.();
      }
    };
  }, []);

  if (!shouldLoad || !isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <Canvas
        ref={canvasRef}
        dpr={[1, 1]} // Further reduced DPR
        frameloop="demand"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        camera={{ position: [0, 0, 1], fov: 45 }}
        gl={{
          antialias: false,
          alpha: true,
          stencil: false,
          depth: false,
          powerPreference: "default",
        }}
        performance={{ min: 0.3 }} // Lower performance threshold
      >
        <SilkPlane ref={meshRef} uniforms={uniforms} />
      </Canvas>
    </div>
  );
};

export default Silk;

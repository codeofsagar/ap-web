"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";

import {
  backgroundVertexShader,
  backgroundFragmentShader,
  sphereVertexShader,
  sphereFragmentShader,
} from "./shaders";

interface BackgroundParams {
  scale: number;
  timeSpeed: number;
  ax: number;
  ay: number;
  az: number;
  aw: number;
  bx: number;
  by: number;
  color1: string;
  color2: string;
  color3: string;
  color4: string;
}

interface SphereControls {
  position: { x: number; y: number; z: number };
  size: number;
  segments: number;
  materialScale: number;
  timeSpeed: number;
  brightness: number;
}

const HeroGradient: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const contextRef = useRef<WebGLRenderingContext | null>(null);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetPosition = useRef<{ x: number; y: number; z: number }>({
    x: 2,
    y: 2,
    z: 2,
  });
  const isVisibleRef = useRef<boolean>(true);
  
  // Brightness slightly increased to make the Gold pop against the black
  const [brightnessValue] = useState<number>(1.4);

  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16) / 255,
          parseInt(result[2], 16) / 255,
          parseInt(result[3], 16) / 255,
        ]
      : [1, 1, 1];
  };

  const backgroundParams: BackgroundParams = useMemo(
    () => ({
      scale: 0.5,
      timeSpeed: 0.05,
      ax: 5,
      ay: 2.5,
      az: 5,
      aw: 7.5,
      bx: 1,
      by: -1,
      // Black & Gold Palette
      color1: "#050505", // Deepest Black
      color2: "#8b6e42", // Gold
      color3: "#B9935B", // Dark Bronze
      color4: "#1a1a1a", // Charcoal
    }),
    []
  );

  const sphereControls: SphereControls = useMemo(
    () => ({
      position: {
        x: 3,
        y: 2,
        z: 2,
      },
      size: 5,
      segments: 128,
      materialScale: 2.0,
      timeSpeed: 0.05,
      brightness: brightnessValue,
    }),
    [brightnessValue]
  );

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Three.js Sphere Setup
  useEffect(() => {
    let animationFrameId: number;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: threeCanvasRef.current!,
      alpha: true,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.SphereGeometry(2.75, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        timeSpeed: { value: 0.05 },
        scale: { value: 0.5 },
        brightness: { value: sphereControls.brightness },
        color1: { value: new THREE.Color(backgroundParams.color1) },
        color2: { value: new THREE.Color(backgroundParams.color2) },
        color3: { value: new THREE.Color(backgroundParams.color3) },
        color4: { value: new THREE.Color(backgroundParams.color4) },
        ax: { value: 5 },
        ay: { value: 2.5 },
        az: { value: 5 },
        aw: { value: 7.5 },
        bx: { value: 1 },
        by: { value: -1 },
      },
      vertexShader: sphereVertexShader,
      fragmentShader: sphereFragmentShader,
    });

    const sphere = new THREE.Mesh(geometry, material);
    sphereRef.current = sphere;

    sphere.position.set(
      sphereControls.position.x,
      sphereControls.position.y,
      sphereControls.position.z
    );
    scene.add(sphere);

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      mousePosition.current = {
        x: (clientX / window.innerWidth) * 2 - 1,
        y: -(clientY / window.innerHeight) * 2 + 1,
      };

      targetPosition.current = {
        x: 2 + mousePosition.current.x * 0.5,
        y: 2 + mousePosition.current.y * 0.5,
        z: 2,
      };
    };

    let lastFrame = performance.now();
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animateSphere = (currentTime: number) => {
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(animateSphere);
        return;
      }

      const deltaTime = currentTime - lastFrame;
      if (deltaTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animateSphere);
        return;
      }

      lastFrame = currentTime - (deltaTime % frameInterval);
      const time = Date.now() - startTimeRef.current;

      if (sphere) {
        sphere.position.x +=
          (targetPosition.current.x - sphere.position.x) * 0.05;
        sphere.position.y +=
          (targetPosition.current.y - sphere.position.y) * 0.05;
        sphere.position.z +=
          (targetPosition.current.z - sphere.position.z) * 0.05;
      }

      if (sphere.material instanceof THREE.ShaderMaterial) {
        sphere.material.uniforms.time.value = time;
        sphere.material.uniforms.timeSpeed.value = sphereControls.timeSpeed;
        sphere.material.uniforms.brightness.value = sphereControls.brightness;

        sphere.material.uniforms.ax.value = backgroundParams.ax;
        sphere.material.uniforms.ay.value = backgroundParams.ay;
        sphere.material.uniforms.az.value = backgroundParams.az;
        sphere.material.uniforms.aw.value = backgroundParams.aw;
        sphere.material.uniforms.bx.value = backgroundParams.bx;
        sphere.material.uniforms.by.value = backgroundParams.by;

        sphere.material.uniforms.color1.value.setStyle(backgroundParams.color1);
        sphere.material.uniforms.color2.value.setStyle(backgroundParams.color2);
        sphere.material.uniforms.color3.value.setStyle(backgroundParams.color3);
        sphere.material.uniforms.color4.value.setStyle(backgroundParams.color4);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animateSphere);
    };

    const handleResize = () => {
      if (camera && renderer) {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animateSphere(performance.now());

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);

      if (geometry) geometry.dispose();
      if (material) {
        material.dispose();
        Object.keys(material.uniforms).forEach((key) => {
          const uniformValue = material.uniforms[key].value;
          if (uniformValue instanceof THREE.Texture) {
            uniformValue.dispose();
          }
        });
      }
      if (renderer) renderer.dispose();
      if (scene) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
             if (object.geometry) object.geometry.dispose();
             if (object.material) {
               if (Array.isArray(object.material)) {
                 object.material.forEach((mat) => mat.dispose());
               } else {
                 object.material.dispose();
               }
             }
          }
        });
      }
    };
  }, [backgroundParams, sphereControls]);

  // WebGL Background Setup
  useEffect(() => {
    let rafId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      powerPreference: "high-performance",
      antialias: false,
    });
    contextRef.current = gl;

    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    programRef.current = program;

    const vShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vShader) return;
    gl.shaderSource(vShader, backgroundVertexShader);
    gl.compileShader(vShader);

    const fShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fShader) return;
    gl.shaderSource(fShader, backgroundFragmentShader);
    gl.compileShader(fShader);

    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positions = new Float32Array([
      -1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, -1,
    ]);
    const uvs = new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]);

    const positionBuffer = gl.createBuffer();
    const uvBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
    const uvLocation = gl.getAttribLocation(program, "uv");
    gl.enableVertexAttribArray(uvLocation);
    gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms: Record<string, WebGLUniformLocation | null> = {
      time: gl.getUniformLocation(program, "time"),
      timeSpeed: gl.getUniformLocation(program, "timeSpeed"),
      resolution: gl.getUniformLocation(program, "resolution"),
      scale: gl.getUniformLocation(program, "scale"),
      color1: gl.getUniformLocation(program, "color1"),
      color2: gl.getUniformLocation(program, "color2"),
      color3: gl.getUniformLocation(program, "color3"),
      color4: gl.getUniformLocation(program, "color4"),
      ax: gl.getUniformLocation(program, "ax"),
      ay: gl.getUniformLocation(program, "ay"),
      az: gl.getUniformLocation(program, "az"),
      aw: gl.getUniformLocation(program, "aw"),
      bx: gl.getUniformLocation(program, "bx"),
      by: gl.getUniformLocation(program, "by"),
    };

    Object.entries(backgroundParams).forEach(([key, value]) => {
      const loc = uniforms[key];
      if (key.startsWith("color") && typeof value === "string") {
        gl.uniform3fv(loc, hexToRgb(value));
      } else if (typeof value === "number") {
        gl.uniform1f(loc, value);
      }
    });

    const resize = () => {
      if (canvas && gl) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", resize);
    resize();

    let lastBackgroundFrame = performance.now();
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime: number) => {
      if (!isVisibleRef.current) {
        rafId = requestAnimationFrame(render);
        return;
      }

      const deltaTime = currentTime - lastBackgroundFrame;
      if (deltaTime < frameInterval) {
        rafId = requestAnimationFrame(render);
        return;
      }

      lastBackgroundFrame = currentTime - (deltaTime % frameInterval);

      if (gl && program) {
        const timeNow = Date.now() - startTimeRef.current;
        gl.uniform1f(uniforms.time, timeNow);
        gl.uniform1f(uniforms.timeSpeed, backgroundParams.timeSpeed);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        rafId = requestAnimationFrame(render);
      }
    };

    render(performance.now());

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);

      if (gl) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteBuffer(uvBuffer);
        gl.deleteShader(vShader);
        gl.deleteShader(fShader);
        gl.deleteProgram(program);
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
      }
    };
  }, [backgroundParams]);

  return (
    // FIX: Added bg-black to the container and absolute positioning to both canvases
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", backgroundColor: "#050505" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", // This fixes the alignment issue
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "block",
          willChange: "transform" 
        }}
      />
      <canvas
        ref={threeCanvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default React.memo(HeroGradient);
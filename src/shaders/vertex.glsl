  uniform float uTime;
  uniform float uScrollProgress;
  uniform float uVelocity;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;

    vec3 pos = position;

    float wave1 = sin(pos.x * 3.5 + uTime * 1.75 + uScrollProgress * 4.0) * 0.12;
    float wave2 = sin(pos.y * 2.2 - uTime * 1.15 + uScrollProgress * 3.0) * 0.10;
    float wave3 = sin((pos.x + pos.y) * 1.8 + uTime * 3.1) * 0.08;

    float elevation = wave1 + wave2 + wave3;
    elevation -= uVelocity * 0.09;

    pos.z = abs(pos.z - elevation) * -0.2;
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }

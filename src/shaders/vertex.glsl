  uniform float uTime;
  uniform float uScrollProgress;
  uniform float uVelocity;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;

    vec3 pos = position;

    float wave1 = sin(pos.x * 3.5 * sin(uTime * 0.01) + uTime * 0.075 + uScrollProgress * 4.0) * 0.10;
    float wave2 = sin(pos.y * 2.2 - cos(uTime * 0.03) + uTime * 0.015 + uScrollProgress * 2.0) * 0.12;
    float wave3 = sin((pos.x + pos.y) * 1.8 + uTime * 1.1) * 0.09;

    float elevation = wave1 + wave2 + wave3;
    elevation -= uVelocity * 0.09;

    // pos.z = abs(pos.z - elevation) * -0.2;
    pos.z = smoothstep(pos.z - elevation, 0.01, 0.05);
    vElevation = elevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }

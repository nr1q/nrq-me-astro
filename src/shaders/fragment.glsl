  uniform float uTime;
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // vec3 colorA = vec3(0.039, 0.039, 0.039); // #0a0a0a
    vec3 colorA = clamp(vec3((sin(uTime * 1.5) * 0.5 + 0.5)), 0.0, 0.6);
    // vec3 colorB = vec3(0.075, 0.075, 0.075); // #131313
    vec3 colorB = clamp(vec3((sin(uTime * -0.5 + 3.141594 * 0.5) * 0.5 + 0.5)), 0.0, 0.7);
    // vec3 colorC = vec3(0.122, 0.122, 0.122); // #1f1f1f
    vec3 colorC = clamp(vec3((sin(uTime * 1.5 + 3.141594) * 0.5 + 0.5)), 0.0, 0.4);

    float gradient = vUv.y + vElevation * 0.5 + uScrollProgress * 0.15;
    vec3 color = mix(colorA, colorB, smoothstep(0.0, 0.6, gradient));
    color = mix(color, colorC, smoothstep(0.5, 1.0, gradient + sin(uTime * 0.05) * 0.05));

    // Subtle vignette
    float vignette = 1.0 - length((vUv - 0.5) * 1.15);
    vignette = smoothstep(0.0, 0.85, vignette);
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }

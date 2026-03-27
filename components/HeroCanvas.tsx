'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    if (window.innerWidth < 768) return   // CSS atmosphere suffices on mobile

    // ── Renderer ───────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Scene / Camera ─────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 10

    // ── World-space mouse coords helper ────────────────────────
    // Converts screen mouse to world units at the z = 0 plane.
    const mouse = { wx: 0, wy: 0 }
    const onMouseMove = (e: MouseEvent) => {
      const ndcX =  (e.clientX / window.innerWidth)  * 2 - 1
      const ndcY = -(e.clientY / window.innerHeight) * 2 + 1
      const halfH = camera.position.z * Math.tan((camera.fov * Math.PI / 180) * 0.5)
      mouse.wx = ndcX * halfH * camera.aspect
      mouse.wy = ndcY * halfH
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ══════════════════════════════════════════════════════════
    // Interactive particle field
    //
    // Each particle is a tiny glowing ember that drifts slowly
    // on its own and is repelled by the mouse cursor.  The
    // repulsion naturally clears a halo wherever the user looks,
    // keeping contrast high around the headline without hiding
    // any content (the canvas is always behind the HTML layer).
    // ══════════════════════════════════════════════════════════
    const COUNT = window.innerWidth < 1024 ? 1000 : 2000

    // CPU-side simulation arrays (flat Float32Arrays for speed)
    const px  = new Float32Array(COUNT)   // position x
    const py  = new Float32Array(COUNT)   // position y
    const pz  = new Float32Array(COUNT)   // position z (depth variation)
    const pvx = new Float32Array(COUNT)   // velocity x (interaction)
    const pvy = new Float32Array(COUNT)   // velocity y (interaction)
    const bvx = new Float32Array(COUNT)   // base drift x (always-on)
    const bvy = new Float32Array(COUNT)   // base drift y (always-on)

    // Visible world bounds at z = 0
    const halfH = camera.position.z * Math.tan((camera.fov * Math.PI / 180) * 0.5)
    const halfW = halfH * camera.aspect
    // Spawn particles slightly beyond edges so wrapping is seamless
    const spawnW = halfW * 1.35
    const spawnH = halfH * 1.35

    // Indian warm colour palette
    const palette = [
      new THREE.Color(0xF0C040),   // gold
      new THREE.Color(0xFF9500),   // saffron
      new THREE.Color(0xFF9500),   // saffron (weighted heavier)
      new THREE.Color(0x0FA3A3),   // peacock teal
      new THREE.Color(0xC9452A),   // crimson
      new THREE.Color(0xFFE080),   // pale gold
    ]

    // GPU-side buffers
    const positions  = new Float32Array(COUNT * 3)
    const pColors    = new Float32Array(COUNT * 3)
    const pSizes     = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      px[i]  = (Math.random() - 0.5) * spawnW * 2
      py[i]  = (Math.random() - 0.5) * spawnH * 2
      pz[i]  = (Math.random() - 0.5) * 6 - 2    // range [-5, 1] — behind text

      // Slow, independent random drift
      const speed = 0.002 + Math.random() * 0.006
      const angle = Math.random() * Math.PI * 2
      bvx[i] = Math.cos(angle) * speed
      bvy[i] = Math.sin(angle) * speed

      pvx[i] = 0
      pvy[i] = 0

      positions[i * 3]     = px[i]
      positions[i * 3 + 1] = py[i]
      positions[i * 3 + 2] = pz[i]

      const c = palette[Math.floor(Math.random() * palette.length)]
      pColors[i * 3]     = c.r
      pColors[i * 3 + 1] = c.g
      pColors[i * 3 + 2] = c.b

      // Particles closer to camera are slightly larger
      pSizes[i] = 0.025 + Math.random() * 0.04 + Math.max(0, (pz[i] + 5) / 5) * 0.02
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position',  new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage))
    geo.setAttribute('color',     new THREE.BufferAttribute(pColors, 3))
    geo.setAttribute('size',      new THREE.BufferAttribute(pSizes, 1))

    // Custom shader material: per-particle size + vertex colour + soft circle
    const mat = new THREE.ShaderMaterial({
      uniforms:       { opacity: { value: 0.6 } },
      vertexShader:   `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (320.0 / -mvPos.z);
          gl_Position  = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        uniform float opacity;
        varying vec3 vColor;
        void main() {
          // Soft circular billboard
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = opacity * (1.0 - smoothstep(0.25, 0.5, d));
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent:    true,
      vertexColors:   true,
      depthWrite:     false,
      blending:       THREE.AdditiveBlending,   // particles add together for a glow feel
    })

    scene.add(new THREE.Points(geo, mat))

    // ── Off-screen animation pause ─────────────────────────────
    let animId: number
    let paused = false
    const onScroll = () => {
      const rect = mount.getBoundingClientRect()
      if (rect.bottom < 0 && !paused) {
        paused = true
        cancelAnimationFrame(animId)
      } else if (rect.bottom >= 0 && paused) {
        paused = false
        animate()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ── Simulation constants ───────────────────────────────────
    const REPULSE_RADIUS = 2.2    // world units
    const REPULSE_FORCE  = 0.055  // acceleration per frame
    const DRAG           = 0.92   // velocity multiplier each frame

    // ── Animation loop ─────────────────────────────────────────
    const posAttr = geo.attributes.position as THREE.BufferAttribute

    const animate = () => {
      animId = requestAnimationFrame(animate)

      const mx = mouse.wx
      const my = mouse.wy

      for (let i = 0; i < COUNT; i++) {
        // Mouse repulsion
        const dx   = px[i] - mx
        const dy   = py[i] - my
        const dist2 = dx * dx + dy * dy
        const dist  = Math.sqrt(dist2)

        if (dist < REPULSE_RADIUS && dist > 0.01) {
          const strength = ((REPULSE_RADIUS - dist) / REPULSE_RADIUS) ** 1.4
          pvx[i] += (dx / dist) * strength * REPULSE_FORCE
          pvy[i] += (dy / dist) * strength * REPULSE_FORCE
        }

        // Velocity drag
        pvx[i] *= DRAG
        pvy[i] *= DRAG

        // Integrate position
        px[i] += pvx[i] + bvx[i]
        py[i] += pvy[i] + bvy[i]

        // Seamless wrap at edges
        if (px[i] >  spawnW) px[i] = -spawnW
        if (px[i] < -spawnW) px[i] =  spawnW
        if (py[i] >  spawnH) py[i] = -spawnH
        if (py[i] < -spawnH) py[i] =  spawnH

        // Write to GPU buffer
        posAttr.setXYZ(i, px[i], py[i], pz[i])
      }
      posAttr.needsUpdate = true

      renderer.render(scene, camera)
    }
    animate()

    // ── Resize ─────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // ── Cleanup ────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll',    onScroll)
      window.removeEventListener('resize',    onResize)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}

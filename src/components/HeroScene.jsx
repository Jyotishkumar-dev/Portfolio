import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { prefersReducedMotion } from '../lib/scroll.js'

// A wireframe core inside a shell of points and one thin ring. It sits behind the portrait,
// follows the pointer a little, and turns slowly as the page scrolls.
export default function HeroScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return undefined

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return undefined // No WebGL: the page still reads fine without the scene.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.z = 7

    const group = new THREE.Group()
    scene.add(group)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.7, 1),
      new THREE.MeshBasicMaterial({ color: 0x7c93ff, wireframe: true, transparent: true, opacity: 0.38 }),
    )
    group.add(core)

    // Points spread evenly over a sphere (Fibonacci lattice), each nudged off the surface.
    const count = 1500
    const positions = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      const radius = 2.55 + (Math.random() - 0.5) * 0.35
      positions[i * 3] = Math.cos(theta) * r * radius
      positions[i * 3 + 1] = y * radius
      positions[i * 3 + 2] = Math.sin(theta) * r * radius
    }
    const pointGeo = new THREE.BufferGeometry()
    pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const points = new THREE.Points(
      pointGeo,
      new THREE.PointsMaterial({ color: 0xffb347, size: 0.032, transparent: true, opacity: 0.85, sizeAttenuation: true }),
    )
    group.add(points)

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.15, 0.008, 8, 220),
      new THREE.MeshBasicMaterial({ color: 0xffb347, transparent: true, opacity: 0.55 }),
    )
    ring.rotation.x = Math.PI / 2.6
    group.add(ring)

    const pointer = { x: 0, y: 0 }
    const onPointer = (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host
      if (!w || !h) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      // Wide screens: centre the scene behind the portrait on the right.
      // Narrow screens: the portrait sits at the bottom of the hero, so the scene goes there, clear of the headline.
      const halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
      const halfWidth = halfHeight * camera.aspect
      const wide = w >= 1024
      group.position.x = wide ? halfWidth * 0.5 : 0
      group.position.y = wide ? 0 : (0.5 - 0.76) * 2 * halfHeight
      group.scale.setScalar(wide ? 0.92 : Math.min(0.92, halfWidth / 2.3))
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    const reduced = prefersReducedMotion()
    let frame = 0
    let visible = true
    const clock = new THREE.Clock()

    const render = () => {
      const t = clock.getElapsedTime()
      const scroll = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.5)
      group.rotation.y += (t * 0.12 + scroll * 1.6 + pointer.x * 0.35 - group.rotation.y) * 0.05
      group.rotation.x += (pointer.y * 0.2 - group.rotation.x) * 0.05
      core.rotation.x = t * 0.15
      ring.rotation.z = t * 0.1
      renderer.render(scene, camera)
    }
    const loop = () => {
      if (visible) render()
      frame = requestAnimationFrame(loop)
    }

    let io
    if (reduced) {
      render()
    } else {
      window.addEventListener('pointermove', onPointer, { passive: true })
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
      })
      io.observe(host)
      frame = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointer)
      io?.disconnect()
      ro.disconnect()
      core.geometry.dispose()
      core.material.dispose()
      pointGeo.dispose()
      points.material.dispose()
      ring.geometry.dispose()
      ring.material.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}

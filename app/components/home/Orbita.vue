<template>
  <div ref="rootRef" class="w-full aspect-square md:aspect-4/3 lg:aspect-5/4 relative">
    <canvas ref="canvasRef" class="w-full h-full block" />

    <div class="absolute inset-0 grid place-items-center pointer-events-none">
      <div class="flex flex-col items-center gap-0.5">
        <span class="text-gris text-[10px] tracking-[0.2em] uppercase">Tu</span>
        <span class="text-hueso text-base lg:text-lg font-semibold">negocio</span>
      </div>
    </div>

    <span class="sr-only">{{ disciplinas.map((d) => d.nombre).join(', ') }}</span>
  </div>
</template>

<script setup>
const disciplinas = [
  'Creatividad',
  'Tecnología',
  'Producción',
  'Estrategia',
  'Datos',
  'Contenido'
].map((nombre, i, todas) => ({
  nombre,
  fase: (i / todas.length) * Math.PI * 2
}))

const rootRef = ref(null)
const canvasRef = ref(null)

let raf = null
let ro = null
let io = null

onMounted(() => {
  if (typeof window === 'undefined') return

  const canvas = canvasRef.value
  const gl = canvas.getContext('2d')
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let w = 0
  let h = 0
  let t = 0
  let visible = true

  const FILAS = 14
  const COLS = 26
  const vertices = []

  for (let i = 0; i <= FILAS; i++) {
    const phi = (i / FILAS) * Math.PI
    for (let j = 0; j < COLS; j++) {
      const theta = (j / COLS) * Math.PI * 2
      vertices.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta)
      })
    }
  }

  function medir() {
    const rect = rootRef.value.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = rect.width
    h = rect.height
    canvas.width = w * dpr
    canvas.height = h * dpr
    gl.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  function proyectar(p, ry, rx, radio) {
    const cy = Math.cos(ry)
    const sy = Math.sin(ry)
    const x1 = p.x * cy - p.z * sy
    const z1 = p.x * sy + p.z * cy

    const cx = Math.cos(rx)
    const sx = Math.sin(rx)
    const y2 = p.y * cx - z1 * sx
    const z2 = p.y * sx + z1 * cx

    const persp = 2.6 / (2.6 + z2)
    return { x: w / 2 + x1 * radio * persp, y: h / 2 + y2 * radio * persp, z: z2, persp }
  }

  function frame(ahora) {
    if (!reduce) t = ahora * 0.00022

    gl.clearRect(0, 0, w, h)

    const escala = Math.min(w, h)
    const radio = escala * 0.17
    const fuente = Math.max(10, Math.min(13, escala * 0.032))
    const rx = Math.sin(t * 0.7) * 0.28 + 0.24
    const respira = 1 + Math.sin(t * 3.4) * 0.015

    const halo = gl.createRadialGradient(w / 2, h / 2, radio * 0.4, w / 2, h / 2, radio * 2.4)
    halo.addColorStop(0, 'rgba(252,183,22,0.13)')
    halo.addColorStop(0.5, 'rgba(252,183,22,0.03)')
    halo.addColorStop(1, 'rgba(252,183,22,0)')
    gl.fillStyle = halo
    gl.fillRect(0, 0, w, h)

    const pts = vertices.map((p) => proyectar(p, t, rx, radio * respira))

    gl.lineWidth = 0.7
    for (let i = 0; i <= FILAS; i++) {
      for (let j = 0; j < COLS; j++) {
        const a = pts[i * COLS + j]
        const b = pts[i * COLS + ((j + 1) % COLS)]
        gl.strokeStyle = `rgba(252,183,22,${0.05 + ((2 - (a.z + b.z)) / 4) * 0.28})`
        gl.beginPath()
        gl.moveTo(a.x, a.y)
        gl.lineTo(b.x, b.y)
        gl.stroke()

        if (i < FILAS) {
          const c = pts[(i + 1) * COLS + j]
          gl.strokeStyle = `rgba(252,183,22,${0.03 + ((2 - (a.z + c.z)) / 4) * 0.16})`
          gl.beginPath()
          gl.moveTo(a.x, a.y)
          gl.lineTo(c.x, c.y)
          gl.stroke()
        }
      }
    }

    gl.font = `500 ${fuente}px Inter, system-ui, sans-serif`
    gl.textBaseline = 'middle'

    const anchoMax = Math.max(...disciplinas.map((d) => gl.measureText(d.nombre).width))
    const rx2 = Math.min(escala * 0.5, w / 2 - anchoMax - 14)
    const ry2 = Math.min(escala * 0.46, h / 2 - fuente - 6)
    const aplanado = 0.65

    gl.save()
    gl.beginPath()
    gl.ellipse(w / 2, h / 2, rx2, ry2 * aplanado, 0, 0, Math.PI * 2)
    gl.strokeStyle = 'rgba(252,183,22,0.3)'
    gl.lineWidth = 1
    gl.setLineDash([3, 6])
    gl.stroke()
    gl.restore()

    disciplinas
      .map((d) => {
        const ang = t * 0.35 + d.fase
        return {
          nombre: d.nombre,
          x: w / 2 + Math.cos(ang) * rx2,
          y: h / 2 + Math.sin(ang) * ry2 * aplanado,
          ca: Math.cos(ang),
          z: Math.sin(ang)
        }
      })
      .sort((a, b) => a.z - b.z)
      .forEach((s) => {
        const frente = (s.z + 1) / 2
        const alpha = 0.35 + frente * 0.65

        gl.beginPath()
        gl.moveTo(w / 2, h / 2)
        gl.lineTo(s.x, s.y)
        gl.strokeStyle = `rgba(252,183,22,${alpha * 0.45})`
        gl.lineWidth = 1
        gl.stroke()

        const r = 2.2 + frente * 1.4
        const brillo = gl.createRadialGradient(s.x, s.y, 0, s.x, s.y, 13)
        brillo.addColorStop(0, `rgba(252,183,22,${alpha * 0.5})`)
        brillo.addColorStop(1, 'rgba(252,183,22,0)')
        gl.fillStyle = brillo
        gl.beginPath()
        gl.arc(s.x, s.y, 13, 0, Math.PI * 2)
        gl.fill()

        gl.beginPath()
        gl.arc(s.x, s.y, r, 0, Math.PI * 2)
        gl.fillStyle = `rgba(252,183,22,${alpha})`
        gl.fill()

        const ancho = gl.measureText(s.nombre).width
        gl.fillStyle = '#EAEAEA'
        gl.fillText(s.nombre, s.ca < 0 ? s.x - ancho - 10 : s.x + 10, s.y)
      })

    raf = visible ? requestAnimationFrame(frame) : null
  }

  medir()
  ro = new ResizeObserver(medir)
  ro.observe(rootRef.value)

  io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting
    if (visible && !raf) raf = requestAnimationFrame(frame)
  })
  io.observe(rootRef.value)

  raf = requestAnimationFrame(frame)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  ro?.disconnect()
  io?.disconnect()
})
</script>

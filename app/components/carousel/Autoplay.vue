<template>
  <div class="relative w-full" ref="carouselWrapper">
    <div ref="container" class="scrollbar-hide overflow-x-auto snap-x snap-mandatory cursor-grab select-none"
      :class="isDragging ? 'cursor-grabbing' : ''" @scroll="onScroll" @mousedown="startDrag" @mousemove="drag"
      @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag" @touchend="endDrag">
      <div class="carousel-wrapper flex items-stretch" :style="wrapperStyles">
        <slot />
      </div>
    </div>

    <slot name="dots" :total="totalSlides" :current="currentSlide" :go-to="goToSlide" :playing="isVisible" />
  </div>
</template>

<script setup>
const props = defineProps({
  gap: { type: [Number, Object], default: 16 },
  slidesPerView: { type: Object, default: () => ({ base: 1 }) },
  interval: { type: Number, default: 5000 }
})

const container = ref(null)
const carouselWrapper = ref(null)
const isDragging = ref(false)
const isVisible = ref(false)
const containerWidth = ref(0)
const currentBreakpoint = ref('base')
const currentSlide = ref(0)
const totalSlides = ref(0)

let startX = 0, startY = 0, scrollStart = 0
let isDragHorizontal = false, hasScrollStarted = false
let resizeObserver = null, intersectionObserver = null
let autoplayTimer = null, scrollTimeout = null, resizeTimeout = null

const BREAKPOINTS = { xxl: 1440, xl: 1280, lg: 1080, md: 768, tab: 600, sm: 480 }

const slidesVisibleDecimal = computed(() =>
  props.slidesPerView[currentBreakpoint.value] ?? props.slidesPerView.base
)

const responsiveGap = computed(() =>
  typeof props.gap === 'number' ? props.gap : (props.gap[currentBreakpoint.value] ?? props.gap.base ?? 16)
)

const slideWidth = computed(() => {
  if (!containerWidth.value) return 280
  const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
  return (containerWidth.value - totalGapsWidth) / slidesVisibleDecimal.value
})

const scrollAmount = computed(() => slideWidth.value + responsiveGap.value)

const wrapperStyles = computed(() => ({ gap: `${responsiveGap.value}px`, width: 'max-content' }))

const updateBreakpoint = () => {
  if (!process.client) return
  const width = window.innerWidth
  const bp = Object.entries(BREAKPOINTS).find(([, w]) => width >= w)?.[0] ?? 'base'
  if (currentBreakpoint.value !== bp) {
    currentBreakpoint.value = bp
    nextTick(() => { updateContainerWidth(); setupChildrenClasses() })
  }
}

const updateContainerWidth = () => {
  if (!container.value) return
  containerWidth.value = container.value.getBoundingClientRect().width
}

const setupChildrenClasses = () => {
  nextTick(() => {
    if (!container.value || !containerWidth.value) return
    const wrapper = container.value.querySelector('.carousel-wrapper')
    if (!wrapper) return
    const w = slideWidth.value
    totalSlides.value = wrapper.children.length
    requestAnimationFrame(() => {
      Array.from(wrapper.children).forEach(child => {
        child.style.width = `${w}px`
        child.style.flexShrink = '0'
        child.classList.add('snap-start')
      })
    })
  })
}

const goToSlide = (i) => {
  if (!container.value || !totalSlides.value) return
  container.value.scrollTo({ left: i * scrollAmount.value, behavior: 'smooth' })
  restartAutoplay()
}

const startAutoplay = () => {
  stopAutoplay()
  autoplayTimer = setInterval(() => {
    if (isDragging.value || !totalSlides.value) return
    const next = (currentSlide.value + 1) % totalSlides.value
    currentSlide.value = next
    container.value?.scrollTo({ left: next * scrollAmount.value, behavior: 'smooth' })
  }, props.interval)
}

const stopAutoplay = () => {
  clearInterval(autoplayTimer)
  autoplayTimer = null
}

const restartAutoplay = () => {
  if (isVisible.value) startAutoplay()
}

const onScroll = () => {
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    if (!container.value) return
    const slide = Math.round(container.value.scrollLeft / scrollAmount.value)
    currentSlide.value = Math.max(0, Math.min(slide, totalSlides.value - 1))
  }, 50)
}

const startDrag = (e) => {
  isDragging.value = true; hasScrollStarted = false; isDragHorizontal = false
  startX = e.pageX || e.touches[0].pageX
  startY = e.pageY || e.touches[0].pageY
  scrollStart = container.value.scrollLeft
  if (e.type === 'mousedown') e.preventDefault()
}
const drag = (e) => {
  if (!isDragging.value) return
  const x = e.pageX || e.touches[0].pageX
  const y = e.pageY || e.touches[0].pageY
  const dx = Math.abs(x - startX), dy = Math.abs(y - startY)
  if (!hasScrollStarted && (dx > 5 || dy > 5)) { hasScrollStarted = true; isDragHorizontal = dx > dy }
  if (hasScrollStarted && isDragHorizontal) { e.preventDefault(); container.value.scrollLeft = scrollStart - (x - startX) * 1.2 }
  else if (hasScrollStarted && !isDragHorizontal) endDrag()
}
const endDrag = () => {
  if (!isDragging.value) return
  isDragging.value = false; hasScrollStarted = false; isDragHorizontal = false
  restartAutoplay()
}

onMounted(async () => {
  await nextTick()
  updateBreakpoint(); updateContainerWidth(); setupChildrenClasses()

  window.addEventListener('resize', onResize)

  if (container.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => { updateContainerWidth(); setupChildrenClasses() })
    resizeObserver.observe(container.value)
  }

  if (carouselWrapper.value && window.IntersectionObserver) {
    intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible.value = entry.isIntersecting
      if (entry.isIntersecting) startAutoplay()
      else stopAutoplay()
    }, { threshold: 0.5 })
    intersectionObserver.observe(carouselWrapper.value)
  } else {
    isVisible.value = true
    startAutoplay()
  }
})

const onResize = () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => { updateBreakpoint(); updateContainerWidth(); setupChildrenClasses() }, 150)
}

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  stopAutoplay()
  clearTimeout(scrollTimeout)
  clearTimeout(resizeTimeout)
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>

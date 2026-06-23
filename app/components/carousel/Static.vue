<template>
  <div class="relative w-full" ref="carouselWrapper">
    <button v-if="showLeftArrow" @click="scrollLeft"
      class="w-10 h-10 hidden md:flex justify-center items-center absolute z-10 bg-negro border border-white/20 rounded-full cursor-pointer"
      :style="leftButtonStyle" :disabled="isAtStart" aria-label="Anterior">
      <Icon name="material-symbols:chevron-left-rounded" size="1.5rem" class="text-amarillo" />
    </button>

    <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab lg:cursor-auto select-none"
      :class="isDragging ? 'cursor-grabbing lg:cursor-auto' : ''" @scroll="updateArrows" @mousedown="startDrag"
      @mousemove="drag" @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag"
      @touchend="endDrag">
      <div class="carousel-wrapper flex items-stretch pb-2 px-4 md:px-0"
        :class="wrapperClass" :style="wrapperStyles">
        <slot />
      </div>
    </div>

    <button v-if="showRightArrow" @click="scrollRight"
      class="w-10 h-10 hidden md:flex justify-center items-center absolute z-10 bg-negro border border-white/20 rounded-full cursor-pointer"
      :style="rightButtonStyle" :disabled="isAtEnd" aria-label="Siguiente">
      <Icon name="material-symbols:chevron-right-rounded" size="1.5rem" class="text-amarillo" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  gap: { type: [Number, Object], default: 16 },
  slidesPerView: {
    type: Object,
    default: () => ({ base: 1.2, sm: 1.5, tab: 2.2, md: 2.5, lg: 3, xl: 3, xxl: 3 })
  },
  buttonPosition: {
    type: Object,
    default: () => ({
      top: '50%',
      transform: 'translateY(-50%)',
      left: { base: '0.5rem', md: '-1.25rem' },
      right: { base: '0.5rem', md: '-1.25rem' }
    })
  },
  wrapperClass: { type: String, default: '' }
})

const container = ref(null)
const carouselWrapper = ref(null)
const isAtStart = ref(true)
const isAtEnd = ref(false)
const isDragging = ref(false)
const containerWidth = ref(0)
const currentBreakpoint = ref('base')
const scrollTrigger = ref(0)

let startX = 0, startY = 0, scrollStart = 0
let isDragHorizontal = false, hasScrollStarted = false
let resizeObserver = null, mutationObserver = null

const BREAKPOINTS = { xxl: 1440, xl: 1280, lg: 1080, md: 768, tab: 600, sm: 480 }

const showLeftArrow = computed(() => {
  scrollTrigger.value; containerWidth.value
  if (!container.value) return false
  const { scrollLeft, scrollWidth, clientWidth } = container.value
  return scrollWidth > clientWidth + 2 && scrollLeft > 2
})

const showRightArrow = computed(() => {
  scrollTrigger.value; containerWidth.value
  if (!container.value) return false
  const { scrollLeft, scrollWidth, clientWidth } = container.value
  return scrollWidth > clientWidth + 2 && scrollLeft < scrollWidth - clientWidth - 2
})

const slidesVisibleDecimal = computed(() =>
  props.slidesPerView[currentBreakpoint.value] ?? props.slidesPerView.base
)

const responsiveGap = computed(() =>
  typeof props.gap === 'number' ? props.gap : (props.gap[currentBreakpoint.value] ?? props.gap.base ?? 16)
)

const scrollAmount = computed(() => {
  if (!containerWidth.value) return 280
  const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
  const slideWidth = (containerWidth.value - totalGapsWidth) / slidesVisibleDecimal.value
  return slideWidth + responsiveGap.value
})

const wrapperStyles = computed(() => ({ gap: `${responsiveGap.value}px`, width: 'max-content' }))

const updateBreakpoint = () => {
  if (!process.client) return
  const width = window.innerWidth
  const bp = Object.entries(BREAKPOINTS).find(([, w]) => width >= w)?.[0] ?? 'base'
  if (currentBreakpoint.value !== bp) {
    currentBreakpoint.value = bp
    nextTick(() => { updateContainerWidth(); setupChildrenClasses(); updateArrows() })
  }
}

const updateContainerWidth = () => {
  if (!container.value) return
  containerWidth.value = container.value.getBoundingClientRect().width
}

const updateArrows = () => {
  if (!container.value) return
  const { scrollLeft, scrollWidth, clientWidth } = container.value
  const tol = 2
  requestAnimationFrame(() => {
    containerWidth.value = container.value.getBoundingClientRect().width
    isAtStart.value = scrollWidth <= clientWidth + tol || scrollLeft <= tol
    isAtEnd.value = scrollWidth <= clientWidth + tol || scrollLeft >= scrollWidth - clientWidth - tol
    scrollTrigger.value++
  })
}

const scrollLeft = () => container.value?.scrollBy({ left: -scrollAmount.value, behavior: 'smooth' })
const scrollRight = () => container.value?.scrollBy({ left: scrollAmount.value, behavior: 'smooth' })

const setupChildrenClasses = () => {
  nextTick(() => {
    if (!container.value || !containerWidth.value) return
    const wrapper = container.value.querySelector('.carousel-wrapper')
    if (!wrapper) return
    const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
    const slideWidth = (containerWidth.value - totalGapsWidth) / slidesVisibleDecimal.value
    requestAnimationFrame(() => {
      Array.from(wrapper.children).forEach(child => {
        child.style.width = `${slideWidth}px`
        child.style.flexShrink = '0'
        child.style.minWidth = `${slideWidth}px`
      })
    })
  })
}

const responsiveLeft = computed(() => {
  const l = props.buttonPosition.left
  return typeof l === 'string' ? l : (l?.[currentBreakpoint.value] ?? l?.base ?? '0.5rem')
})
const responsiveRight = computed(() => {
  const r = props.buttonPosition.right
  return typeof r === 'string' ? r : (r?.[currentBreakpoint.value] ?? r?.base ?? '0.5rem')
})
const leftButtonStyle = computed(() => ({ top: props.buttonPosition.top, transform: props.buttonPosition.transform, left: responsiveLeft.value }))
const rightButtonStyle = computed(() => ({ top: props.buttonPosition.top, transform: props.buttonPosition.transform, right: responsiveRight.value }))

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
const endDrag = () => { isDragging.value = false; hasScrollStarted = false; isDragHorizontal = false }

onMounted(async () => {
  await nextTick()
  updateBreakpoint(); updateContainerWidth(); setupChildrenClasses(); updateArrows()

  let resizeTimeout
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => { updateBreakpoint(); updateContainerWidth(); setupChildrenClasses() }, 150)
  })

  if (container.value && window.ResizeObserver) {
    resizeObserver = new ResizeObserver(() => {
      updateContainerWidth(); setupChildrenClasses()
      setTimeout(updateArrows, 50)
    })
    resizeObserver.observe(container.value)
  }

  const wrapper = container.value?.querySelector('.carousel-wrapper')
  if (wrapper && window.MutationObserver) {
    let mutationTimeout
    mutationObserver = new MutationObserver(() => {
      clearTimeout(mutationTimeout)
      mutationTimeout = setTimeout(() => { updateContainerWidth(); setupChildrenClasses(); updateArrows() }, 150)
    })
    mutationObserver.observe(wrapper, { childList: true, subtree: true })
  }

  setTimeout(updateArrows, 500)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  mutationObserver?.disconnect()
})

defineExpose({ scrollLeft, scrollRight, updateArrows, setupChildrenClasses })
</script>

<style scoped>
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
</style>

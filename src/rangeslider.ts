import { calculatePrice } from './calculator'

interface SliderOptions {
  handleSelector: string
  trackSelector: string
  fillSelector: string
  min: number
  max: number
  onChange?: (value: number) => void
}

interface SliderInstance {
  getValue: () => number
}

export function createRangeSlider({
  handleSelector,
  trackSelector,
  fillSelector,
  min,
  max,
  onChange,
}: SliderOptions): SliderInstance {
  const sliderHandle = document.querySelector(handleSelector) as HTMLDivElement
  const sliderTrack = document.querySelector(trackSelector) as HTMLDivElement
  const sliderFill = document.querySelector(fillSelector) as HTMLDivElement

  const trackWidth = sliderTrack.offsetWidth
  const stepCount = max - min
  const snapPoints = Array.from({ length: stepCount + 1 }, (_, i) => (i / stepCount) * 100)

  let isDragging = false
  let result = min

  function getSliderValue(percent: number): number {
    const index = snapPoints.findIndex((point) => point >= percent)
    return min + index
  }

  function snapToClosest(percent: number) {
    return snapPoints.reduce((prev, curr) =>
      Math.abs(curr - percent) < Math.abs(prev - percent) ? curr : prev,
    )
  }

  function updateSlider(percent: number) {
    percent = snapToClosest(percent)
    result = getSliderValue(percent)
    sliderHandle.style.left = `${percent}%`
    sliderFill.style.width = `${percent}%`

    if (onChange) {
      onChange(result)
    }
  }

  sliderHandle.addEventListener('mousedown', function () {
    isDragging = true

    function onMouseMove(event: MouseEvent) {
      if (isDragging) {
        const rect = sliderTrack.getBoundingClientRect()
        let offsetX = event.clientX - rect.left

        offsetX = Math.max(0, Math.min(offsetX, trackWidth))
        const percent = (offsetX / trackWidth) * 100
        updateSlider(percent)
      }
    }

    function onMouseUp() {
      isDragging = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })

  updateSlider(min)
  return {
    getValue: () => result,
  }
}

const slider1 = createRangeSlider({
  handleSelector: '[dk-range="handle"]',
  trackSelector: '[dk-range="track"]',
  fillSelector: '[dk-range="fill"]',
  min: 1,
  max: 3,
  onChange: () => {
    if (calculatePrice) calculatePrice()
  },
})

const slider2 = createRangeSlider({
  handleSelector: '[dk-range="handle2"]',
  trackSelector: '[dk-range="track2"]',
  fillSelector: '[dk-range="fill2"]',
  min: 1,
  max: 10,
  onChange: () => {
    if (calculatePrice) calculatePrice()
  },
})

export { slider1, slider2 }

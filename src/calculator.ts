import { slider1, slider2 } from './rangeslider'

const result = document.querySelector('[dk-calculator="result"]') as HTMLDivElement
const isShortDelay = document.querySelector('[dk-calculator="isShortDelay"]') as HTMLInputElement
const isCleanDesign = document.querySelector('[dk-calculator="isCleanDesign"]') as HTMLInputElement
const needFormAutomation = document.querySelector(
  '[dk-calculator="needFormAutomation"]',
) as HTMLInputElement

export const initCalculator = () => {
  result.innerHTML = '800'
  calculatePrice()

  isCleanDesign.addEventListener('change', calculatePrice)
  isShortDelay.addEventListener('change', calculatePrice)
  needFormAutomation.addEventListener('change', calculatePrice)
}

export const calculatePrice = () => {
  const pageCount = slider2.getValue()
  let price = pageCount === 1 ? 800 : 600 + (pageCount - 1) * 300

  const animationLevelMultiplier = [1, 1.1, 1.3][slider1.getValue() - 1]
  const shortDelayMultiplier = isShortDelay.checked ? 1.25 : 1
  const cleanDesignMultiplier = isCleanDesign.checked ? 0.95 : 1
  const formAutomationFee = needFormAutomation.checked ? 300 : 0

  price =
    price * animationLevelMultiplier * shortDelayMultiplier * cleanDesignMultiplier +
    formAutomationFee

  result.innerHTML = price.toFixed()
}

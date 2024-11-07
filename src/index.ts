import { restartWebflow, type Webflow as WebflowType } from '@finsweet/ts-utils'
import barba from '@barba/core'
import { gsap } from 'gsap'
import { initCalculator } from './calculator'
import { IS_DEV_MODE } from './utils'
import { Draggable } from 'gsap/Draggable'
//import { createRangeSlider } from './rangeslider'

export const Webflow = window.Webflow as WebflowType

Webflow.push(() => {
  gsap.registerPlugin(Draggable)
  initCalculator()

  barba.init({
    debug: IS_DEV_MODE,
    prevent: ({ href }) => {
      return href.includes('#')
    },
    transitions: [
      {
        name: 'fade',
        leave: async (data) => {
          await gsap.to(data.current.container, {
            duration: 0.5,
            opacity: 0,
          })
        },
        enter: (data) => {
          gsap.from(data.next.container, {
            opacity: 0,
            duration: 1,
          })
        },
        afterEnter() {
          restartWebflow()
          initCalculator()
          /*createRangeSlider({
            handleSelector: '[dk-range="handle"]',
            trackSelector: '[dk-range="track"]',
            fillSelector: '[dk-range="fill"]',
            min: 1,
            max: 3,
            onChange: () => {
              console.log('slider1 changed')
            },
          })*/
        },
      },
    ],
  })
})

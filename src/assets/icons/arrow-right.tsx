import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="keyboard_arrow_right" clipPath="url(#clip0_5928_3156)">
      <path
        id="Vector"
        d="M5.72665 11.06L8.77999 8L5.72665 4.94L6.66665 4L10.6667 8L6.66665 12L5.72665 11.06Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_5928_3156">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const ArrowRight = memo(SvgComponent)

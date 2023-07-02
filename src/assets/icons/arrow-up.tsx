import { SVGProps, memo } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="#FFFEFE"
        d="M13.03 9.68a.67.67 0 0 1-1.1.5L8.36 7.2l-3.58 2.88a.67.67 0 0 1-.94-.1.67.67 0 0 1 .1-.97l4-3.22a.67.67 0 0 1 .85 0l4 3.33a.67.67 0 0 1 .24.56Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)

export const ArrowUp = memo(SvgComponent)

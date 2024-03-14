type ZignixLogoProps = {
  width?: number
  height?: number
  color?: string
}

export const ZignixLogo = ({
  width = 200,
  height = 200,
  color = 'var(--splash)'
}: ZignixLogoProps) => {
  return (
    <svg
      width={width}
      className="zignix-logo"
      height={height}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="M433,24H574V967l-141-1V24Zm220,2,330,1v98H785V357l66-1q-0.5-33-1-66H818V191l165,1V455H653V26ZM15,27l330,1V225L147,325v33l66-1V325H345V456H15V258l198-98V126H147v33H15V27ZM654,537l132,1V702h66V537l132,1V702l-49,50,49,49V966H852q-0.5-82.493-1-165H786V966H654V801l49-49-49-50V537ZM15,538l330,1V967H213V637H147V967H15V538Z"
      />
    </svg>
  )
}

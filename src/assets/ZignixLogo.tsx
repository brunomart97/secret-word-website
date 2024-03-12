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
      height={height}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={color}
        fillRule="evenodd"
        className="zignix-logo"
        d="M423,38H564V967l-141-1V38ZM53,39l330,1V237L185,337v33l66-1V337H383V468H53V270l198-98V138H185v33H53V39Zm876,0v99H731q0.5,115.989,1,232h65V303H764q0.5-49.5,1-99H929V468H599q0.5-214.479,1-429H929ZM58,536l330,1V965H256V635H190V965H58V536Zm678,0V701h66q0.5-82.493,1-165H934V702l-49,49,49,49V965H802V800l-66,1V965H604V800l49-49-49-50q0.5-82.493,1-165H736Z"
      />
    </svg>
  )
}

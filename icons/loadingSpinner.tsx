import { cn } from "@/lib/utils";

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number | any;
  className?: string;
}

export const LoadingSpinner = ({
  size = 24,
  className,
  ...props
}: ISVGProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      {...props}
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <linearGradient id="a11">
        <stop offset="0" stopColor="#18020A" stopOpacity="0"></stop>
        <stop offset="1" stopColor="#18020A"></stop>
      </linearGradient>
      <circle
        fill="none"
        stroke="url(#a11)"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray="0 44 0 44 0 44 0 44 0 360"
        cx="100"
        cy="100"
        r="70"
        transformOrigin="center"
      >
        <animateTransform
          type="rotate"
          attributeName="transform"
          calcMode="discrete"
          dur="2"
          values="360;324;288;252;216;180;144;108;72;36"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </svg>
  );
};

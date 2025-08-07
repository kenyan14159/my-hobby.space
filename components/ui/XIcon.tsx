import * as React from "react";

export function XIcon({ className = "", ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <title>X（旧Twitter）</title>
      <path
        d="M17.53 2.47a.75.75 0 0 1 1.06 1.06l-5.22 5.22 5.22 5.22a.75.75 0 0 1-1.06 1.06l-5.22-5.22-5.22 5.22a.75.75 0 0 1-1.06-1.06l5.22-5.22-5.22-5.22A.75.75 0 0 1 6.25 2.47l5.22 5.22 5.22-5.22z"
        fill="currentColor"
      />
    </svg>
  );
} 
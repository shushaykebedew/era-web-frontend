// components/LoadingSpinner.tsx
"use client";

import { useId } from "react";
import { cn } from "@/utils/cn";

interface LoadingSpinnerProps {
  className?: string;
  color?: string;
}

export function LoadingSpinner({
  className,
  color = "currentColor",
}: LoadingSpinnerProps) {
  const uid = useId();
  const id1 = `spinner1_${uid}`;
  const id2 = `spinner2_${uid}`;

  return (
    <svg
      fill={color}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-5 h-5", className)}
      role="status"
      aria-label="Loading"
    >
      <circle cx="4" cy="12" r="3" opacity="1">
        <animate
          id={id1}
          begin={`0;${id2}.end-0.25s`}
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
          fill="freeze"
        />
      </circle>
      <circle cx="12" cy="12" r="3" opacity=".4">
        <animate
          begin={`${id1}.begin+0.15s`}
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
          fill="freeze"
        />
      </circle>
      <circle cx="20" cy="12" r="3" opacity=".3">
        <animate
          id={id2}
          begin={`${id1}.begin+0.3s`}
          attributeName="opacity"
          dur="0.75s"
          values="1;.2"
          fill="freeze"
        />
      </circle>
    </svg>
  );
}

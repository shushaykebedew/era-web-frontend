"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";

export interface DropdownOption<T> {
  value: T;
  label: string;
}

export interface DropdownProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  className?: string;
  renderButton: (props: {
    open: boolean;
    selectedOption?: DropdownOption<T>;
    onClick: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  }) => React.ReactNode;
  renderList: (props: {
    open: boolean;
    activeIndex: number;
    setActiveIndex: (index: number) => void;
    onSelect: (option: DropdownOption<T>) => void;
    options: DropdownOption<T>[];
  }) => React.ReactNode;
}

export function Dropdown<T>({
  value,
  onChange,
  options,
  renderButton,
  renderList,
  className,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === value);
      queueMicrotask(() => setActiveIndex(idx >= 0 ? idx : 0));
    }
  }, [open, value, options]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (options[activeIndex]) {
          onChange(options[activeIndex].value);
        }
        setOpen(false);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  const selectedOption = options.find((o) => o.value === value);

  const onClick = () => setOpen((o) => !o);

  return (
    <div ref={rootRef} className={className}>
      {renderButton({
        open,
        selectedOption,
        onClick,
        onKeyDown: handleKeyDown,
      })}
      {open &&
        renderList({
          open,
          activeIndex,
          setActiveIndex,
          onSelect: (option) => {
            onChange(option.value);
            setOpen(false);
          },
          options,
        })}
    </div>
  );
}

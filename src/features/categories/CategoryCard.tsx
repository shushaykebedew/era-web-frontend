"use client";

import Image from "next/image";
import Link from "next/link";
import { CategoryIcon } from "./CategoryIcon";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { CategoryCardProps } from "@/types/marketing";
import { Award, ArrowRight } from "lucide-react";

const MotionLink = motion.create(Link);

export function CategoryCard({
  category,
  variant = "compact",
}: CategoryCardProps) {
  const href = `/nominees?category=${category.id}`;

  if (variant === "feature") {
    return (
      <MotionLink
        href={href}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "group relative flex min-h-50 sm:min-h-60 lg:min-h-65",
          "2xl:min-h-80 flex-col justify-end overflow-hidden bg-[#13110e] p-6",
          "sm:p-8 lg:p-10 border border-primary/20 rounded-lg shadow-lg hover:border-primary/50 transition-all duration-300",
        )}
      >
        {category.coverImage && (
          <Image
            src={category.coverImage}
            alt=""
            fill
            className="object-cover object-center transition-transform duration-750 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13110e]/95 via-[#13110e]/40 to-transparent" />

        {/* Subtle grid pattern inside */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(201,162,75,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-1.5 text-primary text-[10px] uppercase font-bold tracking-[1.5px] mb-2 font-inter">
            <Award className="w-3.5 h-3.5" />
            <span>ERA Award Category</span>
          </div>

          <h3
            className={cn(
              "font-display text-2xl sm:text-[30px] 2xl:text-[40px] text-foreground",
              "font-bold leading-tight sm:leading-9 2xl:leading-11 mb-4 group-hover:text-primary transition-colors duration-300",
            )}
          >
            {category.name}
          </h3>

          <span
            className={cn(
              "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] font-inter",
              "leading-none text-primary hover:text-primary-light transition-colors",
            )}
          >
            <span>See Nominees</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </MotionLink>
    );
  }

  return (
    <MotionLink
      href={href}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group flex h-full flex-col min-h-70 lg:min-h-90 xl:min-h-100 2xl:min-h-120",
        "justify-between bg-[#13110e] hover:bg-[#1a1713] p-6 sm:p-8 2xl:p-10",
        "border border-primary/15 rounded-lg shadow-md transition-all duration-300 hover:border-primary/45 hover:shadow-[0_6px_24px_rgba(201,162,75,0.05)]",
      )}
    >
      <div>
        <div className="w-12 h-12 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center mb-10 transition-colors duration-300 group-hover:bg-primary/10 group-hover:border-primary/40">
          <CategoryIcon icon={category.icon} className="h-6 w-6 text-primary" />
        </div>

        <h3
          className={cn(
            "font-display text-2xl sm:text-[28px] 2xl:text-[38px] font-bold",
            "leading-tight sm:leading-9 2xl:leading-11 text-foreground transition-colors duration-300 group-hover:text-primary",
          )}
        >
          {category.name}
        </h3>

        <p className="mt-4 text-sm sm:text-base 2xl:text-[22px] font-inter leading-6 2xl:leading-8 text-foreground-muted line-clamp-4">
          {category.description}
        </p>
      </div>

      <span
        className={cn(
          "mt-8 inline-flex items-center gap-2 text-xs xl:text-sm 2xl:text-base",
          "font-inter font-bold tracking-[1.5px] text-primary uppercase mt-auto",
        )}
      >
        <span>View Nominees</span>
        <ArrowRight className="w-3.5 h-3.5 xl:w-5 xl:h-5 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </MotionLink>
  );
}

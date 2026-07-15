"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { fetchNomineeById, fetchNominees } from "@/services/nominees";
import { fetchCategoryById } from "@/services/categories";
import { NomineeDetailShell } from "./NomineeDetailShell";
import { NomineeDetailLoading } from "./NomineeDetailLoading";
import type { Nominee, AwardCategory } from "@/types";

interface NomineeDetailPageProps {
  id: string;
}

export function NomineeDetailPage({ id }: NomineeDetailPageProps) {
  const [nominee, setNominee] = useState<Nominee | null | undefined>(undefined);
  const [category, setCategory] = useState<AwardCategory | null>(null);
  const [prevId, setPrevId] = useState<string | undefined>();
  const [nextId, setNextId] = useState<string | undefined>();

  useEffect(() => {
    async function load() {
      const [found, all] = await Promise.all([
        fetchNomineeById(id),
        fetchNominees(),
      ]);

      if (!found) {
        setNominee(null);
        return;
      }

      setNominee(found);

      if (found.categoryId) {
        fetchCategoryById(found.categoryId).then(setCategory);
      }

      const idx = all.findIndex((n) => n.id === id);
      setPrevId(idx > 0 ? all[idx - 1].id : undefined);
      setNextId(idx < all.length - 1 ? all[idx + 1].id : undefined);
    }

    load();
  }, [id]);

  if (nominee === undefined) return <NomineeDetailLoading />;
  if (nominee === null) return notFound();

  return (
    <NomineeDetailShell
      nominee={nominee}
      category={category ?? undefined}
      prevId={prevId}
      nextId={nextId}
    />
  );
}

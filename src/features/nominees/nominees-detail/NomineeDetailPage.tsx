"use client";

import { useMemo } from "react";
import {
  useNomineeDetail,
  useNominees,
  useCategories,
} from "@/hooks/queries/useNominees";
import { NomineeDetailShell } from "./NomineeDetailShell";
import { NomineeDetailLoading } from "./NomineeDetailLoading";
import NomineeNotFound from "@/app/(marketing)/nominees/[id]/not-found";

interface NomineeDetailPageProps {
  id: string;
}

export function NomineeDetailPage({ id }: NomineeDetailPageProps) {
  const { data: nominee, isLoading: nomineeLoading } = useNomineeDetail(id);
  const { data: allNominees = [] } = useNominees();
  const { data: allCategories = [] } = useCategories();

  const category = useMemo(
    () => allCategories.find((c) => c.id === nominee?.categoryId) ?? null,
    [allCategories, nominee?.categoryId],
  );

  const { prevId, nextId } = useMemo(() => {
    const idx = allNominees.findIndex((n) => n.id === id);
    return {
      prevId: idx > 0 ? allNominees[idx - 1]?.id : undefined,
      nextId:
        idx < allNominees.length - 1 ? allNominees[idx + 1]?.id : undefined,
    };
  }, [allNominees, id]);

  if (nomineeLoading) return <NomineeDetailLoading />;
  if (!nominee) return <NomineeNotFound />;

  return (
    <NomineeDetailShell
      nominee={nominee}
      category={category ?? undefined}
      prevId={prevId}
      nextId={nextId}
    />
  );
}

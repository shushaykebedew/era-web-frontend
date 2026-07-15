import { NomineeDetailPage } from "@/features/nominees/NomineeDetailPage";
import { NomineePageProps } from "@/types/marketing";

export default async function NomineeDetailRoute({ params }: NomineePageProps) {
  const { id } = await params;
  return <NomineeDetailPage id={id} />;
}

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlusIcon } from "@/components/ui/icons";

export function RequestHistoryHeader() {
  return (
    <PageHeader
      title="Past Requests"
      description="Review your previous expert requests, consultations, and conversations."
      action={
        <Button variant="primary">
          <PlusIcon className="size-3.5" />
          New Request
        </Button>
      }
    />
  );
}

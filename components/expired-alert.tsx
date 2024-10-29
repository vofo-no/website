import { CalendarClockIcon } from "lucide-react";

import { formatRelativeMonths } from "@/lib/date";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ExpiredAlertProps {
  expiredAt?: string;
  explanation?: string;
  publishedAt: string;
}

function addOneYear(isoDateStr: string) {
  const d = new Date(isoDateStr);
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

export function ExpiredAlert({
  expiredAt,
  explanation,
  publishedAt,
}: ExpiredAlertProps) {
  const expired =
    new Date() > (expiredAt ? new Date(expiredAt) : addOneYear(publishedAt));

  if (!expired) return;

  return (
    <Alert className="my-6 pl-6 bg-yellow-200">
      <CalendarClockIcon className="h-6 w-6" />
      <AlertDescription>
        {explanation ||
          `Denne teksten er skrevet ${formatRelativeMonths(publishedAt)} og kan inneholde utdatert informasjon.`}
      </AlertDescription>
    </Alert>
  );
}

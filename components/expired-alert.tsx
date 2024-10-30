import { CalendarClockIcon } from "lucide-react";

import { formatRelativeMonths } from "@/lib/date";
import { localeName, parseLocale } from "@/lib/locale";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ExpiredAlertProps {
  expiredAt?: string;
  explanation?: string;
  locale?: string;
  publishedAt: string;
}

function addOneYear(isoDateStr: string) {
  const d = new Date(isoDateStr);
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

function localizedDefaultText(locale: localeName, publishedAt: string) {
  switch (locale) {
    case "en-US":
      return `This text was written ${formatRelativeMonths(publishedAt, locale)}. It may contain outdated information.`;
    case "nn-NO":
      return `Me skreiv denne teksten ${formatRelativeMonths(publishedAt, locale)}. Ver merksam på at opplysningar kan vera utdaterte.`;
    default:
      return `Vi skrev denne teksten ${formatRelativeMonths(publishedAt, locale)}. Vær oppmerksom på at opplysninger kan være utdatert.`;
  }
}

export function ExpiredAlert({
  expiredAt,
  explanation,
  locale,
  publishedAt,
}: ExpiredAlertProps) {
  const expired =
    new Date() > (expiredAt ? new Date(expiredAt) : addOneYear(publishedAt));

  if (!expired) return;

  return (
    <Alert className="my-6 pl-6 bg-yellow-200">
      <CalendarClockIcon className="h-6 w-6" />
      <AlertDescription>
        {explanation || localizedDefaultText(parseLocale(locale), publishedAt)}
      </AlertDescription>
    </Alert>
  );
}

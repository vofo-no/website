import { Square3Stack3DIcon, UsersIcon } from "@heroicons/react/24/outline";
import Button from "components/Button";
import intl from "lib/intl";
import { getQuickKursInfo } from "lib/kursinfo.fetch";
import Link from "next/link";

interface Props {
  param?: string;
}

export default async function QuickStats(props: Props) {
  const data = await getQuickKursInfo(props.param);

  return (
    <div>
      <p>
        Studieforbundene har rapportert
        <br />
        <span className="font-semibold text-crimson-500 text-2xl whitespace-nowrap mr-0.5">
          <Square3Stack3DIcon className="h-6 w-6 inline-block mr-1" />
          {intl.formatNumber(data.courses, {
            maximumSignificantDigits: data.courses.toString().length - 2,
          })}{" "}
          kurs
        </span>{" "}
        med
        <br />
        <span className="font-semibold text-crimson-500 text-2xl whitespace-nowrap mr-0.5">
          <UsersIcon className="h-6 w-6 inline-block mr-1" />
          {intl.formatNumber(data.participants, {
            maximumSignificantDigits: data.participants.toString().length - 3,
          })}{" "}
          deltakere
        </span>{" "}
        i {data.year}
      </p>
      <div className="not-prose">
        <Button as={Link} href="/studieforbund/statistikk">
          Statistikk for {props.param ? data.name : data.name.toLowerCase()}
        </Button>
      </div>
    </div>
  );
}

import { ChartBarIcon } from "@heroicons/react/20/solid";
import { Square3Stack3DIcon, UsersIcon } from "@heroicons/react/24/outline";
import Button from "components/Button";
import { getIntl } from "lib/intl";
import { getQuickKursInfo } from "lib/kursinfo.fetch";
import Link from "next/link";
import React from "react";
import { LocaleName } from "types";

interface Props {
  param?: string;
  locale?: LocaleName;
}

export default async function QuickStats(props: Props) {
  const [data, intl] = await Promise.all([
    getQuickKursInfo(props.param),
    getIntl(props.locale),
  ]);

  return (
    <div>
      <p>
        {intl.formatMessage({ id: "quickstats.body" }, {
          courses: (
            <React.Fragment key="qs-courses">
              <br />
              <span className="font-semibold text-crimson-500 text-2xl whitespace-nowrap mr-0.5">
                <Square3Stack3DIcon className="h-6 w-6 inline-block mr-1" />
                {intl.formatMessage(
                  { id: "quickstats.courses" },
                  {
                    number: intl.formatNumber(data.courses, {
                      maximumSignificantDigits:
                        data.courses.toString().length - 2,
                    }),
                  }
                )}
              </span>
            </React.Fragment>
          ),
          participants: (
            <React.Fragment key="qs-participants">
              <br />
              <span className="font-semibold text-crimson-500 text-2xl whitespace-nowrap mr-0.5">
                <UsersIcon className="h-6 w-6 inline-block mr-1" />
                {intl.formatMessage(
                  { id: "quickstats.participants" },
                  {
                    number: intl.formatNumber(data.participants, {
                      maximumSignificantDigits:
                        data.participants.toString().length - 3,
                    }),
                  }
                )}
              </span>
            </React.Fragment>
          ),
          year: data.year,
        } as Record<string, React.ReactElement | any>)}
      </p>
      <div className="not-prose">
        <Button as={Link} href="/studieforbund/statistikk">
          <ChartBarIcon className="h-5 inline-block mr-1 align-text-bottom" />
          {intl.formatMessage(
            { id: "quickstats.action" },
            { name: props.param ? data.name : data.name.toLowerCase() }
          )}
        </Button>
      </div>
    </div>
  );
}

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
  layout?: "default" | "compact";
}

export default function QuickStats(props: Props) {
  return (
    <React.Suspense fallback={<QuickStatsSkeleton layout={props.layout} />}>
      <QuickStatsLayout {...props} />
    </React.Suspense>
  );
}

function QuickStatsSkeleton(props: Pick<Props, "layout">) {
  if (props.layout === "compact") {
    return (
      <div className="animate-pulse">
        <span className="inline-block bg-gray-200 h-5 w-32 max-w-full my-1"></span>
      </div>
    );
  }
  return (
    <div className="animate-pulse">
      <p className="flex flex-col">
        <span className="inline-block bg-gray-200 h-5 w-32 max-w-full my-1"></span>
        <span className="inline-block bg-gray-200 h-6 w-44 max-w-full my-1"></span>
        <span className="inline-block bg-gray-200 h-6 w-48 max-w-full my-1"></span>
      </p>
      <div>
        <span className="inline-block bg-gray-200 h-10 w-48 max-w-full"></span>
      </div>
    </div>
  );
}

function statisticsHref({ param, year }: { param?: string; year: string }) {
  if (!param) {
    return `/studieforbund/statistikk/${year}`;
  }

  return `/studieforbund/statistikk/${year}/${param}`;
}

async function QuickStatsLayout(props: Props) {
  const [data, intl] = await Promise.all([
    getQuickKursInfo(props.param),
    getIntl(props.locale),
  ]);

  if (props.layout === "compact") {
    return (
      <div className="text-xs">
        <Link
          href={statisticsHref({ param: props.param, year: data.year })}
          className="text-sm"
        >
          <ChartBarIcon className="h-4 inline-block align-text-bottom mr-1" />
          {intl.formatMessage({ id: "quickstats.compact.action" })}
        </Link>
        :{" "}
        {intl.formatMessage({ id: "quickstats.compact.body" }, {
          courses: (
            <React.Fragment key="qs-courses">
              <span className="font-semibold text-sm text-crimson-500 whitespace-nowrap">
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
              <span className="font-semibold text-sm text-crimson-500 whitespace-nowrap">
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
      </div>
    );
  }

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
        <Button
          as={Link}
          href={statisticsHref({ param: props.param, year: data.year })}
        >
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

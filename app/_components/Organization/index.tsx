import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import QuickStats from "app/(website)/studieforbund/QuickStats";
import classNames from "classnames";
import ContactButton from "components/ContactButton";
import { getExtendedInfoFromSsbCode } from "lib/kursinfo.fetch";
import { getOrganizationById } from "lib/sanity.fetch";
import { urlForImage } from "lib/sanity.image";
import Image from "next/image";
import { Suspense } from "react";

import MemberOrganizations from "./MemberOrganizations";

interface Props {
  id?: string;
  showContactInfo?: boolean;
  showExtendedInfo?: boolean;
}

export default async function Organization(props: Props) {
  return (
    <Suspense key={props.id} fallback={<OrganizationLayout />}>
      <OrganizationLayout {...props} />
    </Suspense>
  );
}

async function OrganizationLayout({
  id,
  showContactInfo,
  showExtendedInfo,
}: Props) {
  const data = id ? await getOrganizationById(id) : null;
  const imageUrl =
    data?.logo &&
    urlForImage(data.logo)?.width(256).maxHeight(256).fit("max").url();

  const extendedInfo =
    showExtendedInfo && data?.ssbCode
      ? await getExtendedInfoFromSsbCode(data.ssbCode)
      : undefined;

  return (
    <div className="grid gap-4 grid-cols-[4rem_auto] md:grid-cols-[5rem_auto] mb-4 pt-4 first:pt-0 items-start">
      {imageUrl ? (
        <figure className="not-prose">
          <Image
            src={imageUrl}
            alt={data.logo!.alt || ""}
            height={128}
            width={128}
            placeholder="empty"
          />
        </figure>
      ) : (
        <div className="rounded-full bg-gray-100 aspect-square flex justify-center items-center">
          <BuildingOffice2Icon className="text-gray-300 w-3/4" />
        </div>
      )}
      <div
        className={classNames("flex flex-col", {
          "animate-pulse": !data,
        })}
      >
        <div className="font-roboto text-lg font-medium leading-tight">
          {data ? (
            data.name
          ) : (
            <span className="w-36 inline-block bg-gray-300 h-4 rounded-md "></span>
          )}
        </div>
        <div className="flex-col flex gap-3 text-sm">
          <div className="text-gray-500 line-clamp-1">{data?.description}</div>
          {showContactInfo && data && (
            <div className="flex justify-start flex-wrap gap-x-3 gap-y-1">
              {data.email && (
                <ContactButton protocol="mailto" value={data.email} />
              )}
              {data.phone && (
                <ContactButton protocol="tel" value={data.phone} />
              )}
              {data.url && <ContactButton protocol="url" value={data.url} />}
            </div>
          )}
          {extendedInfo && (
            <>
              <QuickStats param={extendedInfo.param} layout="compact" />
              <MemberOrganizations
                members={Object.values(extendedInfo.organizations)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

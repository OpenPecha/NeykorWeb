import { Suspense } from "react";
import { getsite } from "@/app/actions/getactions";
import SideClient from "./SideClient";
import { StatueSkeleton } from "../Statue/_Components/StatuesSkeleton";

function LoadingStatues() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full p-6">
      {[...Array(9)].map((_, index) => (
        <StatueSkeleton key={index} />
      ))}
    </div>
  );
}

export default function Sacred() {
  return (
    <Suspense fallback={<LoadingStatues />}>
      <SiteContent />
    </Suspense>
  );
}

async function SiteContent() {
  const sitedata = await getsite();
  return <SideClient pilgrimData={sitedata} />;
}

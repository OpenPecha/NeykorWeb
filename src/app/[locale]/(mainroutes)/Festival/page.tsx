import { Suspense } from "react";
import { getFestival } from "@/app/actions/getactions";
import { StatueSkeleton } from "../Statue/_Components/StatuesSkeleton";
import FestivalClient from "./FestivalClient";

function LoadingStatues() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-screen p-6">
      {[...Array(9)].map((_, index) => (
        <StatueSkeleton key={index} />
      ))}
    </div>
  );
}

export default function Festival() {
  return (
    <Suspense fallback={<LoadingStatues />}>
      <FestivalContent />
    </Suspense>
  );
}

async function FestivalContent() {
  const fesdata = await getFestival();
  return <FestivalClient fesdata={fesdata} />;
}

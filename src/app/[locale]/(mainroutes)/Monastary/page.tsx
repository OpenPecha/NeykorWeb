import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component
import { getGonpa } from "@/app/actions/getactions";
import { Card } from "@/components/ui/card";
import LoadingSkeleton from "./Skeleton";
import { getTranslations } from 'next-intl/server';
import { BACKGROUND_IMAGES, SECT_TRANSLATION_KEYS } from "@/lib/utils";

const SECTS = Object.keys(SECT_TRANSLATION_KEYS);

type Monastery = {
  sect: string;
};

type SectGrouping = Record<string, Monastery[]>;
type LocaleProps = { locale: string };

export default function MonasteryDashboardPage({ params }: { params: LocaleProps }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <MonasteryDashboardContent locale={params.locale} />
    </Suspense>
  );
}

const SectCard = ({ 
  sect, 
  monasteries, 
  locale, 
  t 
}: {
  sect: string;
  monasteries: Monastery[];
  locale: string;
  t: (key: string) => string;
}) => {
  const getBackgroundImage = (sect: string) => {
    const lowerSect = sect.toLowerCase();
    return BACKGROUND_IMAGES[lowerSect as keyof typeof BACKGROUND_IMAGES];
  };

  return (
    <Link
      href={`/Monastary/${sect}`}
      className="group block overflow-hidden"
    >
      <Card className="relative aspect-[4/5] overflow-hidden">
        {/* Replace div with background-image with Next.js Image component */}
        <div className="relative w-full h-full">
          <Image
            src={getBackgroundImage(sect)}
            alt={`${sect} monastery background`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            quality={75} // Adjust compression quality (lower = more compression)
            priority={sect === SECTS[0]} // Load first image with priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent z-10" />
        </div>
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
          <div className="space-y-2">
            <h3 className={`text-2xl font-semibold text-white ${
              locale === 'bod' ? 'font-monlamuchen' : 'font-bold'
            }`}>
              {t(SECT_TRANSLATION_KEYS[sect])}
            </h3>
            <p className="text-white/80 text-sm">
              {monasteries.length} Monasteries
            </p>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-sm text-white backdrop-blur-sm">
              View Monastery
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const groupMonasteriesBySect = (monasteries: Monastery[]): SectGrouping => {
  const groupedData: SectGrouping = {};
  
  SECTS.forEach(sect => {
    groupedData[sect] = monasteries.filter(m => m.sect === sect);
  });
  
  groupedData['OTHER'] = monasteries.filter(m => !m.sect || m.sect === "OTHER");
  
  return groupedData;
};

async function MonasteryDashboardContent({ locale }: LocaleProps) {
  const t = await getTranslations('monastery');
  const gonpadata: Monastery[] = await getGonpa();
  
  const groupedMonasteries = groupMonasteriesBySect(gonpadata);

  return (
    <div className="container mx-auto pt-8 px-4">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedMonasteries).map(([sect, monasteries]) => (
          <SectCard
            key={sect}
            sect={sect}
            monasteries={monasteries}
            locale={locale}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}
import { notFound } from "next/navigation";
import DestinationView from "../components/DestinationView";
import Navbar from "../components/Navbar";
import { resolveLocale } from "../locale-bootstrap";
import {
  DESTINATION_SLUGS,
  getDestination,
  isDestinationSlug,
} from "../destinations";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return DESTINATION_SLUGS.map((slug) => ({ slug }));
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await resolveLocale(params);

  if (!isDestinationSlug(slug)) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <DestinationView data={getDestination(slug)} />
    </>
  );
}

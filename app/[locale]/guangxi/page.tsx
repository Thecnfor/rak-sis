import { setRequestLocale } from "next-intl/server";
import DestinationView from "../components/DestinationView";
import Navbar from "../components/Navbar";
import { DESTINATIONS } from "../destinations";

type Props = { params: Promise<{ locale: string }> };

export default async function GuangxiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Navbar />
      <DestinationView data={DESTINATIONS.guangxi} />
    </>
  );
}
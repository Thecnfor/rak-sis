import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactView from "../components/ContactView";
import { bootstrapLocale } from "../locale-bootstrap";

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  await bootstrapLocale(params);
  return (
    <>
      <Navbar />
      <ContactView />
      <Footer />
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { trackLeadContactForm } from "./meta-pixel-client";

type Props = {
  locale: string;
};

export default function LeadPageTracker({ locale }: Props) {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (hasTrackedRef.current) {
      return;
    }

    hasTrackedRef.current = true;
    trackLeadContactForm(locale);
  }, [locale]);

  return null;
}

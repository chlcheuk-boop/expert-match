"use client";

import * as React from "react";
import { REQUESTS } from "@/data/requests";
import type { ExpertRequest } from "@/lib/types";

export interface UseRequestsResult {
  requests: ExpertRequest[];
  isLoading: boolean;
}

/**
 * The single seam between the request history UI and its data source.
 * It currently resolves local mock data asynchronously; swapping in a real
 * fetch means changing this hook only.
 */
export function useRequests(): UseRequestsResult {
  const [requests, setRequests] = React.useState<ExpertRequest[] | null>(null);

  React.useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      if (active) setRequests(REQUESTS);
    }, 320);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  return { requests: requests ?? [], isLoading: requests === null };
}

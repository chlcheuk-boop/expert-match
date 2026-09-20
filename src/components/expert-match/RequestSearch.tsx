"use client";

import { SearchField } from "@/components/ui/SearchField";

export interface RequestSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RequestSearch({ value, onChange, className }: RequestSearchProps) {
  return (
    <SearchField
      value={value}
      onChange={onChange}
      label="Search requests"
      placeholder="Search by topic, expert, or company..."
      className={className}
    />
  );
}

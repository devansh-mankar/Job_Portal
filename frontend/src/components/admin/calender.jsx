"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarD() {
  const [date, setDate] = React.useState(new Date()); // Correct useState syntax

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
}

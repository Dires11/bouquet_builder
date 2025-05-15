"use client";
import { categories } from "@/app/lib/data";
import { useState } from "react";
import BouquetBuilder from "./components/bouquetBuilder";

export default function Home() {
  return <BouquetBuilder />;
}

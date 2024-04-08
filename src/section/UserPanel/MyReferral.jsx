// import { Metadata } from "next"

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select } from "@radix-ui/react-select";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SentDocumentsTable } from "./custom-table/TableSentDocuments";
import { TableMyReferral } from "./custom-table/TableMyReferral";

export default function MyReferral() {
  const { t } = useTranslation();
  const [openForProfilePhoto, setOpenForProfilePhoto] = useState(false);

  const [totalDocumentsCount, setTotalDocumentsCount] = useState(0);

  const handleTotalDocumentsCountChange = (event) => {
    let count = parseInt(event.target.value);
    if (!isNaN(count)) {
      setTotalDocumentsCount(count); // Update the state only if the input is a valid number
    } else {
      setTotalDocumentsCount(0);
    } // Ensure count is at least 1
  };

  return (
    <>
      <div style={{ marginBottom: "30px" }} className=" flex-col md:flex">
        <div className="flex-1 space-y-4 p-2 pt-6">
          <TableMyReferral />
        </div>
      </div>
    </>
  );
}

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
import { ReceivedDocumentsTable } from "./custom-table/TableReceivedDocument";

export default function SentDocuments() {
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
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("Documents")}
            </h2>
            <div className="flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
              {/* <Button>Download</Button> */}
            </div>
          </div>
          <Card style={{ marginBottom: "40px" }}>
            <CardHeader className="space-y-1 ">
              <CardTitle className="text-2xl">Send Document</CardTitle>
              <CardDescription>
                Send Any Document to your team or a user
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
                <div className="grid gap-2 ">
                  <Label htmlFor="documentName">Document Name</Label>
                  <Input
                    id="documentName"
                    type="text"
                    placeholder="Document Name"
                  />
                </div>
                <div className="grid gap-2 ">
                  <Label htmlFor="documentName">Total Documents Count</Label>
                  <Input
                    id="documentName"
                    type="text"
                    placeholder="1, 2, 5"
                    value={totalDocumentsCount}
                    onChange={handleTotalDocumentsCountChange}
                  />
                </div>
                {[...Array(totalDocumentsCount)].map((_, index) => (
                  <div key={index} className="grid gap-2">
                    <Label htmlFor={`documentLink${index + 1}`}>
                      Document Link {index + 1}
                    </Label>
                    <Input
                      id={`documentLink${index + 1}`}
                      type="text"
                      placeholder={`Document Link ${index + 1}`}
                    />
                  </div>
                ))}
                <div className="grid gap-2 ">
                  <Label htmlFor="uploadDocument">Upload Documents</Label>
                  <Input
                    id="uploadDocument"
                    type="file"
                    className="text-foreground"
                  />
                </div>
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="remark">Remark</Label>
                <Textarea id="remark" placeholder="Type your message here." />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Send</Button>
            </CardFooter>
          </Card>
          <Tabs defaultValue="sentDocuments" className="space-y-4 mt-10">
            <TabsList>
              <TabsTrigger value="sentDocuments">Sent Documents</TabsTrigger>
              <TabsTrigger value="receivedDocuments">
                Received Documents
              </TabsTrigger>
            </TabsList>
            <TabsContent value="sentDocuments" className="space-y-4">
              <SentDocumentsTable />
            </TabsContent>

            <TabsContent value="receivedDocuments" className="space-y-4">
              <ReceivedDocumentsTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

"use client";

import { Send } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import { Input } from "@/src/ui/shadcn/components/ui/input";
import { Textarea } from "@/src/ui/shadcn/components/ui/textarea";

const Header = () => {
  return (
    <header className="space-y-4 border-b pb-6">
      <h1 className="text-4xl font-bold">Contact Form</h1>

      <div className="flex items-center justify-between gap-6">
        {/* Controller */}
        <div className="md:flex gap-3 hidden">
          <Button variant={"outline"} asChild>
            <Link href={"mailto:contact@dimasfahmi.pro"}>
              contact@dimasfahmi.pro
            </Link>
          </Button>
        </div>

        <p className="max-w-lg">
          Reach out for inquiries, help, appointments, complaint or any
          assistance. We're here to help!
        </p>
      </div>
    </header>
  );
};

const ContactFormSection = () => {
  return (
    <section className="layout-padding space-y-6">
      <Header />

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="grid grid-cols-1 md:grid-cols-[auto_280px] gap-4"
        suppressHydrationWarning
      >
        {/* Form */}
        <div className="space-y-4">
          {/* Name, Email, Subject */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Input placeholder="Subject" />
          </div>

          <Textarea
            rows={8}
            className="resize-none min-h-48 max-h-48"
            placeholder="Message"
          />
        </div>

        {/* Submit Button */}
        <div>
          <Button className="flex w-full h-full">
            Send <Send />
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ContactFormSection;

import { useState, type FormEvent, type ReactNode } from "react";

import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";

import emailjs from "@emailjs/browser";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SERVICES } from "@/lib/site-data";

type FormState = "idle" | "sending" | "sent" | "error";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function EnquiryForm({
  initialService = "",
}: {
  initialService?: string;
}) {
  const [service, setService] = useState(initialService);
  const [state, setState] = useState<FormState>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!service || state === "sending") return;

    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY
    ) {
      console.error(
        "EmailJS configuration is missing. Check your VITE_EMAILJS_* environment variables.",
      );
      setState("error");
      return;
    }

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    setState("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: String(form.get("name") || ""),
          company: String(form.get("company") || ""),
          email: String(form.get("email") || ""),
          phone: String(form.get("phone") || ""),
          service_interest: service,
          message: String(form.get("message") || ""),
        },
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      formElement.reset();
      setService(initialService);
      setState("sent");
    } catch (error) {
      console.error("EmailJS submission failed:", error);
      setState("error");
    }
  }

  function resetForm() {
    setService(initialService);
    setState("idle");
  }

  if (state === "sent") {
    return (
      <div
        style={{ border: "2px solid #F58220" }}
        className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-white px-6 py-12 text-center shadow-sm sm:px-10"
      >
        <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-8" strokeWidth={1.7} />
        </div>

        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#F58220]">
          Enquiry submitted
        </p>

        <h2 className="mt-3 max-w-sm text-2xl font-semibold tracking-tight text-[#061A34] sm:text-3xl">
          Thank you for reaching out.
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
          Your enquiry has been received. Our team will review your
          requirements and get back to you.
        </p>

        <Button
          type="button"
          onClick={resetForm}
          variant="outline"
          className="mt-8 h-11 rounded-xl border-slate-200 px-5 text-[#061A34] hover:border-[#F58220] hover:bg-orange-50/50"
        >
          Send another enquiry
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Enquiry form"
      className="grid gap-6"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
            minLength={2}
            className="form-input border-sky-200 bg-sky-50/60 text-[#061A34] placeholder:text-slate-400 focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/20"
          />
        </Field>

        <Field label="Company" htmlFor="company">
          <Input
            id="company"
            name="company"
            placeholder="Company name"
            autoComplete="organization"
            className="form-input border-sky-200 bg-sky-50/60 text-[#061A34] placeholder:text-slate-400 focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/20"
          />
        </Field>

        <Field label="Work email" htmlFor="email" required>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            className="form-input border-sky-200 bg-sky-50/60 text-[#061A34] placeholder:text-slate-400 focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/20"
          />
        </Field>

        <Field label="Phone number" htmlFor="phone">
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 00000 00000"
            autoComplete="tel"
            className="form-input border-sky-200 bg-sky-50/60 text-[#061A34] placeholder:text-slate-400 focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/20"
          />
        </Field>
      </div>

      <Field label="Service interest" htmlFor="service" required>
        <Select required value={service} onValueChange={setService}>
          <SelectTrigger
            id="service"
            className="h-12 w-full rounded-xl border-sky-200 bg-sky-50/60 px-4 text-sm shadow-none transition-colors focus:ring-2 focus:ring-sky-400/20 focus:ring-offset-0 data-[placeholder]:text-slate-400"
          >
            <SelectValue placeholder="Select a solution" />
          </SelectTrigger>

          <SelectContent>
            {SERVICES.map((item) => (
              <SelectItem key={item.href} value={item.title}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field label="Project requirements" htmlFor="message" required>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project, technical requirements, or the solution you're looking for..."
          required
          minLength={10}
          className="min-h-36 resize-y rounded-xl border-sky-200 bg-sky-50/60 px-4 py-3 text-sm leading-6 shadow-none transition-colors placeholder:text-slate-400 focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/20"
        />

        <p className="text-xs leading-5 text-slate-400">
          Include any relevant specifications, capacity requirements, or
          project details.
        </p>
      </Field>

      {state === "error" && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
        >
          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            !
          </div>

          <div>
            <p className="text-sm font-medium text-red-800">
              We couldn't send your enquiry.
            </p>
            <p className="mt-1 text-sm leading-5 text-red-700">
              Please try again. You can also contact our team directly.
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-slate-100 pt-5">
        <Button
          type="submit"
          size="lg"
          disabled={state === "sending" || !service}
          className="group h-12 w-full rounded-xl bg-[#F58220] px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#E87512] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-48"
        >
          {state === "sending" ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending enquiry...
            </>
          ) : (
            <>
              <Send className="mr-2 size-4" />
              Send enquiry
              <ArrowRight className="ml-2 size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </>
          )}
        </Button>

        <p className="mt-3 text-xs leading-5 text-slate-400">
          Your project details will be used to respond to your enquiry.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required = false,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid min-w-0 gap-2">
      <Label
        htmlFor={htmlFor}
        className="text-[13px] font-medium text-[#061A34]"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-[#F58220]">
            *
          </span>
        )}
      </Label>

      {children}
    </div>
  );
}

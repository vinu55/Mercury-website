
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Loader2,
  Paperclip,
  Send,
  Upload,
  X,
} from "lucide-react";

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
import { submitEnquiry } from "@/lib/enquiries.functions";

type FormState = "idle" | "sending" | "sent" | "error";

type Attachment = {
  file: File;
  id: string;
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        reject(new Error("Could not read attachment."));
        return;
      }

      resolve(result.split(",")[1] ?? "");
    };

    reader.onerror = () => reject(new Error("Could not read attachment."));
    reader.readAsDataURL(file);
  });
}

export function EnquiryForm({
  initialService = "",
}: {
  initialService?: string;
}) {
  const submit = useServerFn(submitEnquiry);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [service, setService] = useState(initialService);
  const [state, setState] = useState<FormState>("idle");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [fileError, setFileError] = useState("");

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;

    const incoming = Array.from(fileList);
    setFileError("");

    setAttachments((current) => {
      const next = [...current];
      let error = "";

      for (const file of incoming) {
        if (!ALLOWED_TYPES.includes(file.type)) {
          error = "Only JPG, PNG, WebP and PDF files are allowed.";
          continue;
        }

        if (file.size === 0) {
          error = `${file.name} is empty. Choose another file.`;
          continue;
        }

        if (file.size > MAX_FILE_SIZE) {
          error = `${file.name} exceeds the 10 MB per-file limit.`;
          continue;
        }

        const duplicate = next.some(
          ({ file: existing }) =>
            existing.name === file.name && existing.size === file.size,
        );

        if (duplicate) continue;

        if (next.length >= MAX_FILES) {
          error = "You can attach a maximum of 5 files.";
          break;
        }

        next.push({
          file,
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        });
      }

      if (error) setFileError(error);
      return next;
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function removeFile(id: string) {
    setAttachments((current) => current.filter((item) => item.id !== id));
    setFileError("");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!service || state === "sending") return;

    if (attachments.length > MAX_FILES) {
      setFileError("You can attach a maximum of 5 files.");
      return;
    }

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    setState("sending");
    setFileError("");

    try {
      const encodedAttachments = await Promise.all(
        attachments.map(async ({ file }) => ({
          name: file.name,
          type: file.type,
          size: file.size,
          content: await fileToBase64(file),
        })),
      );

      // Your server function must be updated to accept the attachments field.
      await submit({
        data: {
          name: String(form.get("name") || ""),
          company: String(form.get("company") || ""),
          email: String(form.get("email") || ""),
          phone: String(form.get("phone") || ""),
          serviceInterest: service,
          message: String(form.get("message") || ""),
          attachments: encodedAttachments,
        },
      });

      formElement.reset();
      setService("");
      setAttachments([]);
      setState("sent");
    } catch {
      setState("error");
    }
  }

  function resetForm() {
    setService("");
    setAttachments([]);
    setFileError("");
    setState("idle");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  if (state === "sent") {
    return (
      <div className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center sm:px-10">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#F58220] via-[#F58220] to-[#F58220]/20" />

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
          className="min-h-36 resize-y rounded-xl border-sky-200 bg-sky-50/60 px-4 py-3 text-sm leading-6 shadow-none transition-colors placeholder:text-slate-400 focus-visible:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400/20"/>

        <p className="text-xs leading-5 text-slate-400">
          Include any relevant specifications, capacity requirements, or project details.
        </p>
      </Field>

      {/* File attachments */}
      <div className="grid gap-3">
        <div>
          <Label
            htmlFor="project-attachments"
            className="text-[13px] font-medium text-[#061A34]"
          >
            Project files{" "}
            <span className="font-normal text-slate-400">(optional)</span>
          </Label>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Share drawings, equipment photos, or technical specifications.
          </p>
        </div>

        <input
          ref={fileInputRef}
          id="project-attachments"
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
          multiple
          className="sr-only"
          onChange={(e) => addFiles(e.currentTarget.files)}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group flex min-h-32 w-full flex-col items-center justify-center rounded-xl border border-dashed border-sky-300 bg-sky-50/70 px-5 py-6 text-center transition-colors hover:border-sky-400 hover:bg-sky-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40">

          <span className="flex size-11 items-center justify-center rounded-xl border border-sky-200 bg-white text-sky-600 transition-colors group-hover:border-sky-300 group-hover:text-sky-700">
            <Upload className="size-5" />
          </span>

          <span className="mt-3 text-sm font-medium text-[#061A34]">
            Click to upload files
          </span>

          <span className="mt-1 text-xs text-slate-500">
            JPG, PNG, WebP or PDF · 10 MB per file · 5 files maximum
          </span>
        </button>

        {attachments.length > 0 && (
          <div className="grid gap-2" aria-label="Selected attachments">
            {attachments.map(({ file, id }) => (
              <div
                key={id}
                className="flex min-w-0 items-center gap-3 rounded-xl border border-sky-200 bg-sky-50/50 p-3"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  {file.type.startsWith("image/") ? (
                    <ImageIcon className="size-5" />
                  ) : (
                    <FileText className="size-5" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {file.name}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {formatBytes(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFile(id)}
                  aria-label={`Remove ${file.name}`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {fileError && (
          <p role="alert" className="text-sm text-red-600">
            {fileError}
          </p>
        )}
      </div>

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
          className="group h-12 w-full rounded-xl bg-[#F58220] px-6 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#E87512] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-48">
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

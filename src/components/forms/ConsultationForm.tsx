import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { consultationModes, enquiryTopics, resolveRoute } from "@/content/consultation";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Section 11 — the consultation enquiry form.
 * Fields follow the brief exactly: Name, Organisation, Email, Phone, Legal
 * Requirement / Practice Area, Brief Description, Preferred Consultation Mode.
 *
 * SUBMISSION IS MOCKED. `submitEnquiry` below resolves the practice-area route
 * and logs the payload. Replace its body with your API call — nothing else in
 * the form needs to change.
 */

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  organisation: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a contactable number"),
  topic: z.string().min(1, "Please select a practice area"),
  description: z.string().min(20, "A sentence or two helps us route this correctly"),
  mode: z.string().min(1, "Please choose a consultation mode"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you have read the disclaimer" }),
  }),
});

export type ConsultationValues = z.infer<typeof schema>;

async function submitEnquiry(values: ConsultationValues) {
  const payload = {
    ...values,
    routedTo: resolveRoute(values.topic),
    submittedAt: new Date().toISOString(),
    source: window.location.pathname,
  };

  // MOCK: stands in for POST /api/enquiries. Also the place to fire the
  // conversion event for analytics.
  console.info("[consultation] enquiry received", payload);
  await new Promise((resolve) => setTimeout(resolve, 600));
  return payload;
}

export function ConsultationForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const navigate = useNavigate();
  const onDark = tone === "dark";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      organisation: "",
      email: "",
      phone: "",
      topic: "",
      description: "",
      mode: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await submitEnquiry(values);
      navigate("/thank-you");
    } catch {
      toast.error("Something went wrong. Please call us instead.", {
        description: site.contact.phone,
      });
    }
  });

  const fieldTone = onDark
    ? "border-primary-foreground/25 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:border-accent"
    : "";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field label="Name" required error={errors.name?.message} tone={tone}>
        <Input {...register("name")} placeholder="Your full name" className={fieldTone} />
      </Field>

      <Field label="Organisation" error={errors.organisation?.message} tone={tone}>
        <Input
          {...register("organisation")}
          placeholder="Company or institution"
          className={fieldTone}
        />
      </Field>

      <Field label="Email" required error={errors.email?.message} tone={tone}>
        <Input
          type="email"
          {...register("email")}
          placeholder="you@company.com"
          className={fieldTone}
        />
      </Field>

      <Field label="Phone" required error={errors.phone?.message} tone={tone}>
        <Input type="tel" {...register("phone")} placeholder="+91" className={fieldTone} />
      </Field>

      <Field
        label="Legal Requirement / Practice Area"
        required
        error={errors.topic?.message}
        tone={tone}
        className="sm:col-span-2"
      >
        <Select
          value={watch("topic") || undefined}
          onValueChange={(value) => setValue("topic", value, { shouldValidate: true })}
        >
          <SelectTrigger className={fieldTone}>
            <SelectValue placeholder="Select the area your matter falls under" />
          </SelectTrigger>
          <SelectContent>
            {enquiryTopics.map((topic) => (
              <SelectItem key={topic.value} value={topic.value}>
                {topic.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <Field
        label="Brief Description of Requirement"
        required
        error={errors.description?.message}
        tone={tone}
        className="sm:col-span-2"
      >
        <Textarea
          {...register("description")}
          rows={5}
          placeholder="What is happening, and what would you like the outcome to be? Please do not include confidential or privileged material."
          className={fieldTone}
        />
      </Field>

      <Field
        label="Preferred Consultation Mode"
        required
        error={errors.mode?.message}
        tone={tone}
        className="sm:col-span-2"
      >
        <Select
          value={watch("mode") || undefined}
          onValueChange={(value) => setValue("mode", value, { shouldValidate: true })}
        >
          <SelectTrigger className={fieldTone}>
            <SelectValue placeholder="How would you like to speak with us?" />
          </SelectTrigger>
          <SelectContent>
            {consultationModes.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>

      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            checked={watch("consent") === true}
            onCheckedChange={(checked) =>
              setValue("consent", checked === true ? true : (false as never), {
                shouldValidate: true,
              })
            }
            className={onDark ? "border-primary-foreground/30" : ""}
          />
          <label
            htmlFor="consent"
            className={cn(
              "text-xs leading-relaxed",
              onDark ? "text-primary-foreground/60" : "text-muted-foreground",
            )}
          >
            I have read the disclaimer and understand that submitting this enquiry does not create
            an advocate–client relationship, and that this communication is not privileged.
          </label>
        </div>
        {errors.consent?.message ? (
          <p className="mt-2 text-xs text-destructive">{errors.consent.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          variant={onDark ? "accent" : "default"}
          disabled={isSubmitting}
          className="sm:w-auto"
        >
          {isSubmitting ? "Sending…" : site.cta.primary.label}
          {!isSubmitting ? <ArrowRight aria-hidden /> : null}
        </Button>
        <p
          className={cn("text-xs", onDark ? "text-primary-foreground/50" : "text-muted-foreground")}
        >
          {site.contact.responsePromise}
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  tone,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  tone: "light" | "dark";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className={tone === "dark" ? "text-primary-foreground" : undefined}>
        {label}
        {required ? <span className="ml-1 text-accent">*</span> : null}
      </Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

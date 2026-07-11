import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

import Seo from "@/components/Seo";
import BackgroundGlow from "@/components/BackgroundGlow";
import Footer from "@/components/Footer";
import {
  roles,
  rolesForYear,
  programmes,
  yearsOfStudy,
  sections,
  genders,
  residencies,
  type YearOfStudy,
} from "@/data/roles";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RECRUITMENT_FORM_URL = import.meta.env.VITE_RECRUITMENT_SHEET_URL as string | undefined;
const REGISTRATION_PREFIX = "2127";

const roleNames = roles.map((r) => r.name) as [string, ...string[]];

const formSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name"),
    collegeEmail: z
      .string()
      .trim()
      .email("Enter a valid email address")
      .refine((v) => v.toLowerCase().endsWith("@svce.ac.in"), {
        message: "Must be your @svce.ac.in college email",
      }),
    personalEmail: z.string().trim().email("Enter a valid email address"),
    phoneNumber: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
    registrationNumber: z.string().trim().regex(/^\d{9}$/, "Enter the remaining 9 digits"),
    yearOfStudy: z.enum(["II", "III", "IV"], { required_error: "Select your year of study" }),
    programme: z.enum(programmes, { required_error: "Select your programme" }),
    section: z.enum(sections, { required_error: "Select your section" }),
    gender: z.enum(genders, { required_error: "Select your gender" }),
    residency: z.enum(residencies, { required_error: "Select day scholar or hosteller" }),
    rolePreference1: z.enum(roleNames, { required_error: "Select a role" }),
    justification1: z.string().trim().min(20, "Please explain your choice (at least 20 characters)"),
    rolePreference2: z.enum(roleNames, { required_error: "Select a role" }),
    justification2: z.string().trim().min(20, "Please explain your choice (at least 20 characters)"),
    driveLink: z.union([z.string().trim().url("Enter a valid link"), z.literal("")]).optional(),
    codingLanguages: z.string().trim().min(2, "Let us know what you're comfortable with"),
    website: z.string().max(0, "").optional(), // honeypot — must stay empty
  })
  .refine((data) => data.rolePreference1 !== data.rolePreference2, {
    message: "Preference 2 must be different from Preference 1",
    path: ["rolePreference2"],
  })
  .refine(
    (data) => rolesForYear(data.yearOfStudy as YearOfStudy).some((r) => r.name === data.rolePreference1),
    { message: "This role isn't open to your year of study", path: ["rolePreference1"] },
  )
  .refine(
    (data) => rolesForYear(data.yearOfStudy as YearOfStudy).some((r) => r.name === data.rolePreference2),
    { message: "This role isn't open to your year of study", path: ["rolePreference2"] },
  );

type FormValues = z.infer<typeof formSchema>;

export default function Join() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      collegeEmail: "",
      personalEmail: "",
      phoneNumber: "",
      registrationNumber: "",
      section: undefined,
      gender: undefined,
      residency: undefined,
      rolePreference1: undefined,
      justification1: "",
      rolePreference2: undefined,
      justification2: "",
      driveLink: "",
      codingLanguages: "",
      website: "",
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedYear = form.watch("yearOfStudy");
  const pref1 = form.watch("rolePreference1");
  const availableRoles = rolesForYear(selectedYear);
  const availableRolesForPref2 = availableRoles.filter((r) => r.name !== pref1);

  // Clear role selections whenever the eligible set changes under them
  useEffect(() => {
    const stillValid = availableRoles.some((r) => r.name === form.getValues("rolePreference1"));
    if (!stillValid) form.resetField("rolePreference1");
  }, [selectedYear]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (form.getValues("rolePreference2") === pref1) form.resetField("rolePreference2");
  }, [pref1]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSubmit(values: FormValues) {
    if (values.website) return; // honeypot triggered — silently drop

    if (!RECRUITMENT_FORM_URL) {
      toast.error("The recruitment form isn't wired up yet — please email ace@svce.ac.in directly.");
      return;
    }

    setSubmitting(true);
    try {
      const body = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "website") return;
        if (key === "registrationNumber") {
          body.append(key, REGISTRATION_PREFIX + value);
          return;
        }
        body.append(key, value ?? "");
      });

      await fetch(RECRUITMENT_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      setSubmitted(true);
      toast.success("Application submitted! We'll be in touch.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again or email ace@svce.ac.in.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden gradient-page pt-32 pb-20 px-6">
      <Seo
        title="Join ACE"
        description="Apply for a core, executive, or team role with the Association of Computer Engineers at SVCE."
      />
      <BackgroundGlow />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Join ACE</h1>
          <div className="w-20 h-1.5 bg-teal-400 mx-auto rounded-full my-4 shadow-glow" />
          <p className="text-muted-foreground font-medium">
            Recruitment for core, executive, and team roles. Fill this out honestly — we read every response.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-2xl bg-teal-50 border border-teal-200 p-4 mb-8 text-sm text-teal-900"
        >
          <Info size={18} className="shrink-0 mt-0.5 text-teal-600" />
          <p>
            All roles will go through an interview after shortlisting. Final role assignment and selection
            will be decided based on that interview — not on preference order alone.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-[2rem] p-10 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Application received</h2>
            <p className="text-muted-foreground">
              Thanks for applying to ACE. We'll reach out on your college email once shortlisting begins.
            </p>
          </motion.div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="glass rounded-[2rem] p-6 md:p-10 space-y-8">
              {/* Honeypot — hidden from real users, catches naive bots */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] w-px h-px opacity-0"
                {...form.register("website")}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="collegeEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>College Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@svce.ac.in" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="personalEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Personal Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="9876543210"
                          inputMode="numeric"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="registrationNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Registration Number</FormLabel>
                      <FormControl>
                        <div className="flex items-center rounded-md border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                          <span className="px-3 h-10 flex items-center text-sm font-semibold text-muted-foreground bg-muted border-r border-input select-none">
                            {REGISTRATION_PREFIX}
                          </span>
                          <input
                            value={field.value}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                            inputMode="numeric"
                            maxLength={9}
                            placeholder="XXXXXXXXX"
                            className="flex-1 h-10 px-3 py-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
                            onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 9))}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Your register number starts with {REGISTRATION_PREFIX} — enter the remaining 9 digits.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearOfStudy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Study</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {yearsOfStudy.map((y) => (
                            <SelectItem key={y} value={y}>
                              {y} Year
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="programme"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Programme Pursuing</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your programme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {programmes.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select section" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sections.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6 pt-2">
                          {genders.map((g) => (
                            <div key={g} className="flex items-center gap-2">
                              <RadioGroupItem value={g} id={`gender-${g}`} />
                              <Label htmlFor={`gender-${g}`} className="font-normal cursor-pointer">
                                {g}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="residency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Day Scholar / Hosteller</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6 pt-2">
                          {residencies.map((r) => (
                            <div key={r} className="flex items-center gap-2">
                              <RadioGroupItem value={r} id={`residency-${r}`} />
                              <Label htmlFor={`residency-${r}`} className="font-normal cursor-pointer">
                                {r}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t border-border/50 pt-8 space-y-6">
                <FormField
                  control={form.control}
                  name="rolePreference1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Preference 1</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!selectedYear}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={selectedYear ? "Select a role" : "Select your year of study first"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableRoles.map((role) => (
                            <SelectItem key={role.name} value={role.name}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="justification1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Justify Your Choice of Preference 1</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Why this role?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rolePreference2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Preference 2</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={!selectedYear}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={selectedYear ? "Select a role" : "Select your year of study first"}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableRolesForPref2.map((role) => (
                            <SelectItem key={role.name} value={role.name}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="justification2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Justify Your Choice of Preference 2</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Why this role?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="border-t border-border/50 pt-8 space-y-6">
                <FormField
                  control={form.control}
                  name="driveLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Works or Achievements (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Public Google Drive link" {...field} />
                      </FormControl>
                      <FormDescription>
                        Paste a public Drive link to anything relevant to your role — projects, designs, write-ups.
                        Priority will be given to applicants who share their work.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="codingLanguages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Which coding language(s) are you comfortable with?</FormLabel>
                      <FormControl>
                        <Textarea rows={2} placeholder="e.g. Python, JavaScript, C++" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full rounded-full">
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        )}
      </div>

      <Footer />
    </div>
  );
}

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const departments = [
  "Computer Science and Engineering",
  "Artificial Intelligence and Data Science"
] as const;

const yearsOfStudy = [
  "2nd Year",
  "3rd Year",
  "4th Year"
] as const;

const sections = ["A", "B", "C", "D", "E"] as const;

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  registrationNumber: z.string().trim().regex(/^2127\d{9}$/, "Registration number must be in the format 2127*********"),
  collegeEmail: z.string().trim().email("Please enter a valid email address.").endsWith("@svce.ac.in", "Email must end with @svce.ac.in"),
  phoneNumber: z.string().trim().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number."),
  department: z.string({
    required_error: "Please select your department.",
  }),
  section: z.enum(sections, {
    required_error: "Please select your section.",
  }),
  yearOfStudy: z.enum(yearsOfStudy, {
    required_error: "Please select your year of study.",
  }),
  website: z.string().max(0, "").optional(), // honeypot
});

type FormValues = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      registrationNumber: "",
      collegeEmail: "",
      phoneNumber: "",
      department: undefined,
      section: undefined,
      yearOfStudy: undefined,
      website: "",
    },
  });

  const selectedDepartment = form.watch("department");

  async function onSubmit(values: FormValues) {
    if (values.website) return; // honeypot

    const sheetUrl = import.meta.env.VITE_RECRUITMENT_SHEET_URL as string | undefined;
    if (!sheetUrl) {
      toast.error("The registration form isn't wired up to a Google Sheet yet. Please check your .env file.");
      return;
    }

    setSubmitting(true);
    try {
      // Map 'department' to 'programme' because the deployed Google Script expects it
      const payload = {
        ...values,
        programme: values.department
      };

      await fetch(sheetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      onSuccess();
    } catch {
      toast.error("Something went wrong. We couldn't complete your registration. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const selectTriggerClasses = "peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] rounded-none px-0 py-3 focus:ring-0 focus-visible:ring-0 focus-visible:border-transparent text-white transition-colors duration-200 shadow-none";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] w-px h-px opacity-0"
          {...form.register("website")}
        />

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {/* Row 1: Full Name & Registration Number */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative pt-4">
                <FormControl>
                  <div className="relative group">
                    <input
                      id="field-name"
                      className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] py-2 text-white focus:outline-none focus:ring-0 focus:border-transparent transition-colors placeholder-transparent"
                      placeholder="Full Name"
                      {...field}
                    />
                    <label
                      htmlFor="field-name"
                      className="absolute left-0 -top-5 text-[#A1A1AA] text-xs font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#71717A] peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-[#8A2BE2] peer-focus:text-xs cursor-text pointer-events-none"
                    >
                      Full Name
                    </label>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#00F2FE] transition-all duration-300 ease-out peer-focus:w-full shadow-[0_0_15px_rgba(0,242,254,0.6)]" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 absolute -bottom-5 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem className="relative pt-4">
                <FormControl>
                  <div className="relative group">
                    <input
                      id="field-reg"
                      className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] py-2 text-white focus:outline-none focus:ring-0 focus:border-transparent transition-colors placeholder-transparent"
                      placeholder="Registration Number"
                      {...field}
                    />
                    <label
                      htmlFor="field-reg"
                      className="absolute left-0 -top-5 text-[#A1A1AA] text-xs font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#71717A] peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-[#8A2BE2] peer-focus:text-xs cursor-text pointer-events-none"
                    >
                      Registration Number
                    </label>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#00F2FE] transition-all duration-300 ease-out peer-focus:w-full shadow-[0_0_15px_rgba(0,242,254,0.6)]" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 absolute -bottom-5 text-xs" />
              </FormItem>
            )}
          />

          {/* Row 2: Department & Section */}
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className="relative pt-4">
                <div className="absolute left-0 -top-1 text-[#A1A1AA] text-xs font-medium transition-colors">Department</div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <div className="relative group">
                      <SelectTrigger className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] rounded-none px-0 py-3 focus:ring-0 focus-visible:ring-0 focus-visible:border-transparent text-white transition-colors duration-200 shadow-none">
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#00F2FE] transition-all duration-300 ease-out peer-focus-visible:w-full shadow-[0_0_15px_rgba(0,242,254,0.6)]" />
                    </div>
                  </FormControl>
                  <SelectContent className="bg-[#13131A] backdrop-blur-[25px] border-[rgba(255,255,255,0.1)] text-white shadow-2xl rounded-xl">
                    {departments.map((d) => (
                      <SelectItem key={d} value={d} className="focus:bg-[#8A2BE2]/20 focus:text-white rounded-md my-1 cursor-pointer transition-colors duration-200">
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400 absolute -bottom-5 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="section"
            render={({ field }) => (
              <FormItem className="relative pt-4">
                <div className="absolute left-0 -top-1 text-[#A1A1AA] text-xs font-medium transition-colors">Section (Sec)</div>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <div className="relative group">
                      <SelectTrigger className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] rounded-none px-0 py-3 focus:ring-0 focus-visible:ring-0 focus-visible:border-transparent text-white transition-colors duration-200 shadow-none">
                        <SelectValue placeholder="Select your section" />
                      </SelectTrigger>
                      <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#00F2FE] transition-all duration-300 ease-out peer-focus-visible:w-full shadow-[0_0_15px_rgba(0,242,254,0.6)]" />
                    </div>
                  </FormControl>
                  <SelectContent className="bg-[#13131A] backdrop-blur-[25px] border-[rgba(255,255,255,0.1)] text-white shadow-2xl rounded-xl">
                    {sections
                      .filter((s) => {
                        if (selectedDepartment === "Artificial Intelligence and Data Science") {
                          return s === "A" || s === "B";
                        }
                        return true;
                      })
                      .map((s) => (
                        <SelectItem key={s} value={s} className="focus:bg-[#8A2BE2]/20 focus:text-white rounded-md my-1 cursor-pointer transition-colors duration-200">
                          {s}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400 absolute -bottom-5 text-xs" />
              </FormItem>
            )}
          />

          {/* Row 3: College Email & Phone Number */}
          <FormField
            control={form.control}
            name="collegeEmail"
            render={({ field }) => (
              <FormItem className="relative pt-4">
                <FormControl>
                  <div className="relative group">
                    <input
                      id="field-email"
                      type="email"
                      className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] py-2 text-white focus:outline-none focus:ring-0 focus:border-transparent transition-colors placeholder-transparent"
                      placeholder="Email Address"
                      {...field}
                    />
                    <label
                      htmlFor="field-email"
                      className="absolute left-0 -top-5 text-[#A1A1AA] text-xs font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#71717A] peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-[#8A2BE2] peer-focus:text-xs cursor-text pointer-events-none"
                    >
                      College Email Address
                    </label>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#00F2FE] transition-all duration-300 ease-out peer-focus:w-full shadow-[0_0_15px_rgba(0,242,254,0.6)]" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 absolute -bottom-5 text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="relative pt-4">
                <FormControl>
                  <div className="relative group">
                    <input
                      id="field-phone"
                      inputMode="numeric"
                      className="peer w-full bg-transparent border-0 border-b border-[rgba(255,255,255,0.1)] py-2 text-white focus:outline-none focus:ring-0 focus:border-transparent transition-colors placeholder-transparent"
                      placeholder="Phone Number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    />
                    <label
                      htmlFor="field-phone"
                      className="absolute left-0 -top-5 text-[#A1A1AA] text-xs font-medium transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-[#71717A] peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-[#8A2BE2] peer-focus:text-xs cursor-text pointer-events-none"
                    >
                      Phone Number
                    </label>
                    <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#00F2FE] transition-all duration-300 ease-out peer-focus:w-full shadow-[0_0_15px_rgba(0,242,254,0.6)]" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 absolute -bottom-5 text-xs" />
              </FormItem>
            )}
          />



          {/* Year of Study Bento */}
          <FormField
            control={form.control}
            name="yearOfStudy"
            render={({ field }) => (
              <FormItem className="md:col-span-2 pt-8">
                <div className="text-[#A1A1AA] text-xs font-medium mb-4 block uppercase tracking-wider">Year of Study</div>
                <FormControl>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0">
                    {yearsOfStudy.map((year) => {
                      const isSelected = field.value === year;
                      return (
                        <motion.div
                          key={year}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => field.onChange(year)}
                          className={`cursor-pointer rounded-[14px] py-4 px-3 text-center transition-all duration-300 select-none flex items-center justify-center gap-2 relative overflow-hidden border ${isSelected
                              ? "bg-[#13131A] backdrop-blur-md border-[rgba(255,255,255,0.08)] text-white shadow-[0_0_20px_rgba(0,242,254,0.1)]"
                              : "bg-transparent border-transparent text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.7)]"
                            }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeYearIndicator"
                              className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] shadow-[0_0_10px_rgba(0,242,254,0.8)]"
                              initial={false}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            />
                          )}
                          <span className={`font-semibold text-sm tracking-wide relative z-10 ${isSelected ? 'text-white' : ''}`}>{year}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage className="text-red-400 mt-3 text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-10 flex justify-center">
          <motion.button
            type="submit"
            disabled={submitting}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-5 w-full md:w-auto justify-center px-10 py-5 bg-[#13131A] text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(138,43,226,0.3)] hover:shadow-[0_0_50px_rgba(0,242,254,0.5)]"
          >
            {/* Razor-sharp glowing gradient border */}
            <div
              className="absolute inset-0 rounded-full border-2 border-transparent pointer-events-none bg-[length:200%_auto] animate-gradient"
              style={{
                background: 'linear-gradient(#13131A, #13131A) padding-box, linear-gradient(to right, #8A2BE2, #00F2FE, #8A2BE2) border-box'
              }}
            />

            <span className="relative z-10 flex items-center text-lg tracking-wide">
              {submitting ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin text-white" />
                  Processing...
                </>
              ) : (
                "Submit Registration"
              )}
            </span>

            {!submitting && (
              <div className="relative z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/5 group-hover:bg-white/20 transition-all duration-300">
                <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            )}
          </motion.button>
        </div>
      </form>
    </Form>
  );
};

export default RegistrationForm;

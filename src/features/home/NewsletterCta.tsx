"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { SlideUp } from "@/components/ui/animations";
import { NewsletterCtaProps } from "@/types/marketing";
import { Input } from "@/components/ui/Input";
import { useMutation } from "@tanstack/react-query";
import { invitationsService } from "@/services/invitations";
import { CheckCircle2, AlertCircle, MailPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AxiosError } from "axios";

export function NewsletterCta({
  title = "Join the Ceremony Night",
  description = "Subscribe to receive exclusive invitations to the awards ceremony and early access to ticket sales.",
}: NewsletterCtaProps) {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const requestInviteMutation = useMutation({
    mutationFn: invitationsService.requestInvite,
    onSuccess: () => {
      setIsSuccess(true);
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    requestInviteMutation.mutate({ email });
  };

  const errorMessage =
    (requestInviteMutation.error as AxiosError<{ message?: string }> | null)
      ?.response?.data?.message || "An error occurred while submitting your request.";

  return (
    <section className="relative bg-[#0c0c0e] py-16 sm:py-20 lg:py-24 2xl:py-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
      />
      <Container size="narrow" className="text-center relative">
        <SlideUp>
          <div className="mx-auto mb-5 2xl:mb-8 flex h-12 w-12 2xl:h-16 2xl:w-16 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
            <MailPlus className="h-5 w-5 2xl:h-7 2xl:w-7 text-primary" />
          </div>

          <h2
            className={cn(
              "font-display font-semibold text-[32px] sm:text-[40px] lg:text-[48px]",
              "2xl:text-[64px] leading-tight lg:leading-14 2xl:leading-20",
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-157.5 2xl:max-w-200 text-base 2xl:text-[24px]",
              "leading-6 2xl:leading-9 text-foreground-muted",
            )}
          >
            {description}
          </p>

          <div className="relative min-h-[120px] 2xl:min-h-[140px] mt-8 2xl:mt-12 flex justify-center w-full">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center gap-1 p-5 2xl:p-8 bg-success/10 border border-success/30 rounded-lg max-w-lg w-full"
                >
                  <CheckCircle2 className="w-8 h-8 text-success mb-1" />
                  <p className="text-success font-inter font-medium text-sm sm:text-base">
                    Invitation request sent! Please check your email to complete the process.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-2 text-xs text-foreground-muted hover:text-primary transition-colors underline font-inter cursor-pointer"
                  >
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="w-full max-w-158 2xl:max-w-200"
                >
                  <div className="flex flex-col gap-4 2xl:gap-6 sm:flex-row w-full">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email Address
                    </label>
                    <Input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className={cn(
                        "w-full border border-primary/40 font-inter bg-[#1F1B15] px-4 2xl:px-8 h-12.5",
                        "2xl:h-18 text-base 2xl:text-[24px] text-foreground placeholder:text-foreground-muted/50",
                        "focus:border-primary focus:outline-none transition-colors",
                      )}
                    />
                    <Button
                      type="submit"
                      isLoading={requestInviteMutation.isPending}
                      className={cn(
                        "shrink-0 cursor-pointer bg-primary font-inter text-[#402D00] font-bold",
                        "text-[12px] 2xl:text-[20px] leading-4 2xl:leading-6 tracking-[1.2px]",
                        "2xl:tracking-[2px] 2xl:px-10 h-12.5 2xl:h-18",
                        "w-full sm:w-[180px] 2xl:w-[280px]",

                      )}
                    >
                      Request Invite
                    </Button>
                  </div>

                  {requestInviteMutation.isError && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 p-3 bg-danger/10 border border-danger/30 rounded text-danger text-sm font-inter flex items-start gap-2 max-w-158 2xl:max-w-200 text-left mx-auto"
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </SlideUp>
      </Container>
    </section>
  );
}
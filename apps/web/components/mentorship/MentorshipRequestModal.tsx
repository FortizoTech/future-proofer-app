"use client";

import { useEffect, useMemo, useState } from "react";

export type MentorshipProfile = {
  name: string;
  headline?: string;
  location?: string;
  avatarUrl?: string;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mentor: MentorshipProfile | null;
};

type StepId = "intro" | "expectations" | "review";

const MAX_MESSAGE_LEN = 560;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function MentorshipRequestModal({ open, onOpenChange, mentor }: Props) {
  const [step, setStep] = useState<StepId>("intro");
  const [message, setMessage] = useState("");
  const [goals, setGoals] = useState("Career transition to Software Developer");
  const [cadence, setCadence] = useState("1x per week");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const mentorName = mentor?.name ?? "Mentor";

  const aiSuggestion = useMemo(() => {
    const lines = [
      `Hi ${mentorName},`,
      "",
      `I’m reaching out because I’m currently focused on: ${goals}.`,
      `I’d love your guidance on prioritizing the right skills, building a strong portfolio, and preparing for interviews.`,
      "",
      `If you’re open to it, I’m hoping we can meet ${cadence} for 30–45 minutes and I’ll come prepared with specific questions and progress updates.`,
      "",
      "Thank you for considering my request.",
    ];
    return lines.join("\n");
  }, [mentorName, goals, cadence]);

  useEffect(() => {
    if (!open) return;
    // reset per open
    setStep("intro");
    setIsSubmitting(false);
    setSent(false);
    setMessage("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  const canContinue =
    step === "intro"
      ? true
      : step === "expectations"
        ? goals.trim().length > 3
        : message.trim().length > 10;

  const stepIndex: Record<StepId, number> = { intro: 0, expectations: 1, review: 2 };
  const steps: { id: StepId; label: string }[] = [
    { id: "intro", label: "Introduce" },
    { id: "expectations", label: "Expectations" },
    { id: "review", label: "Review & Send" },
  ];

  const goNext = () => {
    const idx = stepIndex[step];
    const nextStep = steps.at(clamp(idx + 1, 0, steps.length - 1))?.id;
    if (nextStep) setStep(nextStep);
  };

  const goBack = () => {
    const idx = stepIndex[step];
    const prevStep = steps.at(clamp(idx - 1, 0, steps.length - 1))?.id;
    if (prevStep) setStep(prevStep);
  };

  const handleSend = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    // For now this is UI-only; later we’ll persist to Supabase `connections` / messaging tables.
    await new Promise((r) => setTimeout(r, 900));
    setIsSubmitting(false);
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[999]">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} />

      <div
        className="absolute left-1/2 top-1/2 w-[min(720px,92vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl"
        style={{ boxShadow: "0 24px 48px rgba(0,0,0,0.16)", border: "1px solid #e2e8f0" }}
      >
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="min-w-0">
            <div className="text-xs font-semibold tracking-widest text-slate-500">
              MENTORSHIP REQUEST
            </div>
            <div className="truncate text-lg font-bold text-slate-900">
              Request mentorship from {mentorName}
            </div>
          </div>
          <button
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            onClick={() => onOpenChange(false)}
          >
            Close
          </button>
        </div>

        {/* Stepper */}
        <div className="px-5 pt-4">
          <div className="flex items-center gap-2">
            {steps.map((s, idx) => {
              const active = idx === stepIndex[step];
              const done = idx < stepIndex[step];
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <div
                    className={[
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                      done ? "bg-blue-600 text-white" : active ? "bg-blue-50 text-blue-700 ring-2 ring-blue-200" : "bg-slate-100 text-slate-500",
                    ].join(" ")}
                  >
                    {idx + 1}
                  </div>
                  <div className={active ? "text-sm font-semibold text-slate-900" : "text-sm text-slate-500"}>
                    {s.label}
                  </div>
                  {idx < steps.length - 1 && <div className="h-px w-8 bg-slate-200" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-5">
          {sent ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="text-sm font-bold text-emerald-900">Request sent</div>
              <div className="mt-1 text-sm text-emerald-800">
                Your mentorship request has been sent to {mentorName}. You’ll see updates in your Network inbox.
              </div>
            </div>
          ) : (
            <>
              {step === "intro" && (
                <div className="grid gap-4 md:grid-cols-[1fr_220px]">
                  <div className="rounded-xl border p-4">
                    <div className="text-sm font-bold text-slate-900">Tell your mentor what you need</div>
                    <div className="mt-1 text-sm text-slate-600">
                      This workflow helps avoid “blank page” anxiety with an AI draft you can edit.
                    </div>
                    <div className="mt-4 grid gap-3">
                      <label className="grid gap-1">
                        <span className="text-xs font-semibold text-slate-600">Your goal</span>
                        <input
                          className="h-11 rounded-xl border px-3 text-sm outline-none focus:border-blue-300"
                          value={goals}
                          onChange={(e) => setGoals(e.target.value)}
                          placeholder="e.g. Become a backend engineer"
                        />
                      </label>
                      <label className="grid gap-1">
                        <span className="text-xs font-semibold text-slate-600">Meeting cadence</span>
                        <select
                          className="h-11 rounded-xl border px-3 text-sm outline-none focus:border-blue-300"
                          value={cadence}
                          onChange={(e) => setCadence(e.target.value)}
                        >
                          <option>1x per week</option>
                          <option>2x per month</option>
                          <option>Monthly</option>
                        </select>
                      </label>
                    </div>
                  </div>

                  <div className="rounded-xl border p-4">
                    <div className="text-xs font-semibold text-slate-600">Mentor</div>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                        {mentor?.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={mentor.avatarUrl} alt="" className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-slate-900">{mentorName}</div>
                        <div className="truncate text-xs text-slate-600">{mentor?.headline ?? ""}</div>
                        <div className="truncate text-xs text-slate-500">{mentor?.location ?? ""}</div>
                      </div>
                    </div>
                    <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                      Tip: keep it short, specific, and respectful of time.
                    </div>
                  </div>
                </div>
              )}

              {step === "expectations" && (
                <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
                  <div className="rounded-xl border p-4">
                    <div className="text-sm font-bold text-slate-900">AI Writing Assistant</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Use this draft as a starting point. You can personalize it before sending.
                    </div>
                    <div className="mt-3 whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-800">
                      {aiSuggestion}
                    </div>
                    <button
                      className="mt-3 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
                      onClick={() => setMessage(aiSuggestion.slice(0, MAX_MESSAGE_LEN))}
                    >
                      Use this draft
                    </button>
                  </div>

                  <div className="rounded-xl border p-4">
                    <div className="text-sm font-bold text-slate-900">Your message</div>
                    <div className="mt-1 text-sm text-slate-600">
                      Mention your goal, what you’re asking for, and how you’ll show up prepared.
                    </div>
                    <textarea
                      className="mt-3 h-48 w-full resize-none rounded-xl border p-3 text-sm outline-none focus:border-blue-300"
                      value={message}
                      onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE_LEN))}
                      placeholder="Type your mentorship request..."
                    />
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>Min. ~10 chars to continue</span>
                      <span>
                        {message.length}/{MAX_MESSAGE_LEN}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {step === "review" && (
                <div className="rounded-xl border p-4">
                  <div className="text-sm font-bold text-slate-900">Review</div>
                  <div className="mt-1 text-sm text-slate-600">
                    Confirm everything looks good before sending your request.
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-xs font-semibold text-slate-600">Goal</div>
                      <div className="mt-1 text-sm font-bold text-slate-900">{goals}</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-xs font-semibold text-slate-600">Cadence</div>
                      <div className="mt-1 text-sm font-bold text-slate-900">{cadence}</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-xs font-semibold text-slate-600">Mentor</div>
                      <div className="mt-1 text-sm font-bold text-slate-900">{mentorName}</div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border bg-white p-3">
                    <div className="text-xs font-semibold text-slate-600">Message</div>
                    <div className="mt-2 whitespace-pre-wrap text-sm text-slate-900">{message}</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex items-center justify-between border-t px-5 py-4">
          <button
            className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50"
            onClick={goBack}
            disabled={sent || step === "intro"}
          >
            Back
          </button>

          <div className="flex items-center gap-2">
            <button
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>

            {step === "review" ? (
              <button
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting || sent || message.trim().length <= 10}
                onClick={handleSend}
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            ) : (
              <button
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
                disabled={!canContinue}
                onClick={goNext}
              >
                Next Step
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



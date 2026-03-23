"use client";

import * as React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface ScrollFAQAccordionProps {
  data?: FAQItem[];
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export default function ScrollFAQAccordion({
  data = [],
  className,
  questionClassName,
  answerClassName,
}: ScrollFAQAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string>(data[0]?.id?.toString() ?? "");

  return (
    <section className={cn("w-full px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-5xl rounded-[32px] bg-[#f7a619] px-5 py-6 sm:px-8 sm:py-8">
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <Sparkles
              className="h-16 w-16 fill-[#59f238] text-black"
              strokeWidth={2.5}
            />
          </div>

          <div className="absolute bottom-6 right-0 hidden translate-x-1/3 rotate-[18deg] lg:block">
            <div className="rounded-[20px] border-[4px] border-black bg-[#ff62bd] p-4 shadow-[7px_7px_0_#000]">
              <Star className="h-8 w-8 fill-black text-black" strokeWidth={2.6} />
            </div>
          </div>

          <div className="relative rounded-[32px] border-[4px] border-black bg-[#ffe410] p-5 shadow-[9px_9px_0_#000] sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-black/65">
                  FAQ
                </p>
                <h2 className="max-w-xl text-[2rem] font-black leading-none tracking-[-0.04em] text-black sm:text-[2.75rem]">
                  Common Questions
                </h2>
              </div>
              <div className="hidden rounded-full border-[3px] border-black bg-white px-4 py-2 text-sm font-bold text-black md:block">
                Ask anything
              </div>
            </div>

            <Accordion.Root
              type="single"
              collapsible
              value={openItem}
              onValueChange={(value) => setOpenItem(value)}
              className="space-y-4"
            >
              {data.map((item) => {
                const isOpen = openItem === item.id.toString();

                return (
                  <Accordion.Item
                    key={item.id}
                    value={item.id.toString()}
                    className={cn(
                      "overflow-hidden rounded-[18px] border-[3px] border-black bg-[#a88cf4] shadow-[0_5px_0_#000]",
                      isOpen && "bg-[#9d83ef]"
                    )}
                  >
                    <Accordion.Header>
                      <Accordion.Trigger
                        className={cn(
                          "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-xl font-bold tracking-[-0.03em] text-black outline-none transition-transform duration-150 sm:px-6 sm:text-[1.15rem]",
                          isOpen && "pb-2",
                          questionClassName
                        )}
                      >
                        <span className="max-w-[85%]">{item.question}</span>
                        <span
                          className={cn(
                            "flex h-9 w-9 flex-none items-center justify-center rounded-full border-[3px] border-black bg-[#f7ddff] transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        >
                          <ChevronDown className="h-5 w-5 text-black" strokeWidth={3} />
                        </span>
                      </Accordion.Trigger>
                    </Accordion.Header>

                    <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                      <div
                        className={cn(
                          "px-5 pb-4 text-[0.92rem] leading-6 text-black/80 sm:px-6",
                          answerClassName
                        )}
                      >
                        <div className="border-t-[3px] border-black/90 pt-3">
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </Accordion.Content>
                  </Accordion.Item>
                );
              })}
            </Accordion.Root>
          </div>
        </div>
      </div>
    </section>
  );
}

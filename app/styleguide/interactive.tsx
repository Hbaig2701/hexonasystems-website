'use client';

import { useState } from 'react';
import { SectionEyebrow } from '@/components/layout/SectionEyebrow';
import { Input, Textarea, Select, Slider } from '@/components/ui/Input';
import { Odometer } from '@/components/ui/Odometer';
import { Button } from '@/components/ui/Button';

/**
 * The client-side half of the styleguide: components that need state to show
 * every state. Kept separate so the rest of /styleguide stays a server
 * component and the page stays cheap.
 */

function Block({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-hairline py-16">
      <SectionEyebrow index={index} label={label} className="mb-10" />
      {children}
    </section>
  );
}

export function StyleguideInteractive() {
  const [leads, setLeads] = useState(200);
  const [play, setPlay] = useState(false);

  return (
    <>
      <Block index="10" label="Inputs">
        <div className="grid gap-8 md:grid-cols-2">
          <Input label="Work email" placeholder="you@company.com" />
          <Input label="Phone" placeholder="+1 416 000 0000" optional />
          <Input
            label="Company name"
            defaultValue="Hexona"
            hint="Focus me. The border goes cyan with a 3px glow."
          />
          <Input
            label="With error"
            defaultValue="hamza@gmail.com"
            error="Please use your work email address."
          />
          <Select label="Annual revenue">
            <option>Under $1M</option>
            <option>$1M–$5M</option>
            <option>$5M–$20M</option>
            <option>$20M+</option>
          </Select>
          <Textarea label="What's driving this?" placeholder="A sentence is plenty." />
          <div className="md:col-span-2">
            <Slider
              label="Inquiries per month"
              value={leads}
              min={10}
              max={2000}
              onChange={setLeads}
              format={(v) => `${v.toLocaleString()} / month`}
              ariaValueText={`${leads} inquiries per month`}
            />
          </div>
        </div>
      </Block>

      <Block index="11" label="Odometer · Moment 3">
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap items-baseline gap-12">
            <div>
              <Odometer value="$415,800" play={play} className="text-[52px] text-accent" rule />
              <p className="type-label mt-8 text-tertiary">Annual leak</p>
            </div>
            <div>
              <Odometer value="$20,000,000+" play={play} className="text-[52px]" />
              <p className="type-label mt-5 text-tertiary">Generated or saved</p>
            </div>
            <div>
              <Odometer value="11.55" play={play} className="text-[52px] text-sealed" />
              <p className="type-label mt-5 text-tertiary">Recoverable / month</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => setPlay(true)} disabled={play}>
              Roll
            </Button>
            <Button variant="ghost" onClick={() => setPlay(false)}>
              Reset
            </Button>
          </div>
          <p className="type-micro max-w-[68ch] text-quaternary">
            The idle state is the final value. That is what the server renders and what a crawler
            sees. The roll is a progressive enhancement over already-correct text. With
            prefers-reduced-motion the final value appears immediately and never rolls.
          </p>
        </div>
      </Block>
    </>
  );
}

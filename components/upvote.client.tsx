'use client';

import { upvoteAction } from "@/actions";
import Image from "next/image";
import { useState } from 'react';

export function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className="bg-purple-951 min-w-[120px]"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? (
        <Image
          src="/static/icons/loading-spinner.svg"
          width="30"
          height="30"
          alt="Loading"          className="m-auto"
        />
      ) : (
        'Up vote!'
      )}
    </button>
  );
}

export default function Upvote({ voting, id }: { voting: number; id: string }) {
  const [state, setState] = useState<{ id: string; voting: number }>({ id, voting });
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);

    try {
      const newState = await upvoteAction(state);
      if (newState) {
        setState(newState);
      }
    } catch (error) {
      console.error('Upvote action failed:', error);
      // Handle the error as needed
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2">{state.voting}</p>
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}

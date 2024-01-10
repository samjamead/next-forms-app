'use client';

import { useRef, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { createTodo } from '@/app/actions';

const initialState = {
  messages: [],
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type='submit' aria-disabled={pending}>
      {pending ? 'Submitting...' : 'Add'}
    </button>
  );
}

export function AddForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(createTodo, initialState);

  useEffect(() => {
    if (state.messages.at(-1) !== 'Failed to create todo') {
      formRef?.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <label htmlFor='todo'>Enter Task</label>
      <input type='text' id='todo' name='todo' required />
      <SubmitButton />
      <ul role='status'>
        {state?.messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </form>
  );
}

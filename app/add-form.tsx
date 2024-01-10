'use client';

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
  const [state, formAction] = useFormState(createTodo, initialState);

  return (
    <form action={formAction}>
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

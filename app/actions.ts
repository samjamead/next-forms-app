'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

export async function createTodo(
  prevState: {
    messages: string[];
  },
  formData: FormData
) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    todo: formData.get('todo'),
  });

  if (!parse.success) {
    return { messages: [...prevState.messages, 'Failed to create todo'] };
  }

  const data = parse.data;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    revalidatePath('/');
    return { messages: [...prevState.messages, `${data.todo}`] };
  } catch (e) {
    return { messages: [...prevState.messages, 'Failed to create todo'] };
  }
}

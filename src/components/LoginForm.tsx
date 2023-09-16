'use client';

import React, { FC, useState } from 'react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  login: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const FormDemo: FC = () => {
  const [error] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signIn('credentials', {
      username: values.login,
      password: values.password,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col p-6 rounded-md border border-slate-200 min-w-[320px] max-w-max max-h-max gap-2 bg-white shadow-lg'
      >
        <FormField
          control={form.control}
          name='login'
          render={({ field }) => (
            <FormItem className='grid mb-[10px]'>
              <FormLabel className='mb-2'>Username</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  autoFocus
                  required
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mb-2'>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className='w-full'
          type='submit'
        >
          Log in
        </Button>
        <FormMessage />
        <p className='text-xs text-center text-red-500'>{error}</p>
      </form>
    </Form>
  );
};

export default FormDemo;

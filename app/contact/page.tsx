"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

function ContactForm() {
  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      category: "",
      message: "",
    },
  });
  const { handleSubmit, reset, formState: { isSubmitting } } = methods;
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: Record<string, string>) => {
    setError('');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      const result = await res.json();
      setError(result.error || 'Failed to send message.');
    }
  };

  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="name"
            control={methods.control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={methods.control}
            rules={{ required: 'Email is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            control={methods.control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="message"
            control={methods.control}
            rules={{ required: 'Message is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us what you're thinking..." rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
          {showSuccess && <p className="text-green-600">Message sent!</p>}
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </Form>
    </FormProvider>
  );
}

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
} 
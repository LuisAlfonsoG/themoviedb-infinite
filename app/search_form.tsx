'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAppState } from './store/zustand';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";


export const inputSearchSchema = z.object({
  search_string: z
    .string({ invalid_type_error: 'Type mismatch', required_error: 'Campo vacío' })
    .min(1, { message: 'El campo no puede quedar vacío, ingresa al menos 1 caracter' })
    .max(10, { message: 'Input demasiado largo: ingresa un máximo de 10 caracteres' })
})

export type InputSearchSchemaType = z.infer<typeof inputSearchSchema>;

export default function SearchForm() {
  const { search_input, updateInput } = useAppState();
  console.log('input: ' + search_input)
  const form = useForm<InputSearchSchemaType>({
    resolver: zodResolver(inputSearchSchema),
    defaultValues: {
      search_string: search_input
    }
  });

  function onSubmit(data: InputSearchSchemaType){
    updateInput(data.search_string);
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit( onSubmit )} className='space-y-3'>
        <FormField
          control={form.control}
          name="search_string"
          render={({ field }) =>
            <FormItem>
              <FormLabel>Inicia tu búsqueda: </FormLabel>
              <FormControl>
                <Input placeholder='nombre de la película...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          }
        />
        <Button type='submit' >buscar</Button>
      </form>
    </Form>
  )


}
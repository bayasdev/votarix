'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Vote } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import dayjs from 'dayjs';

import { ElectionDataResponse } from '@/types';
import { VoteRequest, VoteValidator } from '@/lib/validators/vote';
import Heading from '@/components/shared/heading';
import ConfirmVoteModal from '@/components/modals/confirm-vote-modal';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import VoteCard from '@/app/(landing)/vote/_components/vote/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Alert } from '@/components/ui/alert';
import { useTimer } from '@/hooks/use-timer';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

interface VoteFormProps {
  electionData: ElectionDataResponse | null;
}

const VoteForm: React.FC<VoteFormProps> = ({ electionData }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultSeconds = 10 * 60;
  const [timeLeft, isTimeUp] = useTimer(defaultSeconds);

  useEffect(() => {
    if (isTimeUp) {
      toast({
        title: 'Tiempo agotado',
        description: 'Tu voto no se registró',
        variant: 'destructive',
      });
      router.replace('/vote');
    }
  }, [isTimeUp, router]);
  const form = useForm<VoteRequest>({
    resolver: zodResolver(VoteValidator),
  });

  const onSubmit: SubmitHandler<VoteRequest> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/vote/${electionData?.id}`, data)
      .then(() => {
        toast({
          title: 'Voto registrado',
          description: 'Gracias por participar',
        });
        router.replace('/certificates');
        router.refresh();
      })
      .catch((error) => {
        toast({
          title: 'Ocurrió un error',
          description: JSON.stringify(error?.response?.data),
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsOpen(false);
      });
  };

  if (!electionData) return null;

  return (
    <>
      <ConfirmVoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => onSubmit(form.getValues())}
        isLoading={isLoading}
      />
      <div className="flex flex-col justify-center gap-4 lg:flex-row lg:justify-between">
        <Heading
          title={electionData.name}
          subtitle={electionData.description}
        />
        <div className="text-left lg:text-center">
          <span className="text-sm text-muted-foreground">Tiempo restante</span>
          <div className="text-2xl font-semibold tabular-nums tracking-tight">
            {dayjs.unix(timeLeft as number).format('mm:ss')}
          </div>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            setIsOpen(true);
          })}
          className="flex flex-col gap-6"
        >
          {electionData?.positions.map((position, voteIndex) => (
            <FormField
              key={position.id}
              control={form.control}
              name={`votes.${voteIndex}.positionId`}
              defaultValue={position.id}
              render={() => (
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="max-w-lg space-y-2 text-center">
                    <div className="text-xl font-semibold tracking-tight">
                      {position.name}
                    </div>
                    <Alert>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          Instrucciones:
                        </span>{' '}
                        Marque (1) opción. Si marca más de (1) opción, su voto
                        se anulará. Si no elige ninguna, su voto se considerará
                        blanco.
                      </div>
                    </Alert>
                  </div>
                  <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {position?.parties.map((party, partyIndex) => (
                      <FormField
                        key={party.id}
                        name={`votes.${voteIndex}.selection.${partyIndex}`}
                        control={form.control}
                        defaultValue={{
                          partyId: party.id,
                          isChecked: false,
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <VoteCard party={party}>
                              <FormControl>
                                <CheckboxPrimitive.Root
                                  checked={field.value.isChecked}
                                  onCheckedChange={(checked) => {
                                    field.onChange({
                                      ...field.value,
                                      isChecked: checked,
                                    });
                                  }}
                                  className="peer h-8 w-8 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                >
                                  <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
                                    <Check className="h-8 w-8" />
                                  </CheckboxPrimitive.Indicator>
                                </CheckboxPrimitive.Root>
                              </FormControl>
                            </VoteCard>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              )}
            />
          ))}
          <Button type="submit" size="lg" className="self-center">
            <Vote className="mr-2 h-6 w-6" />
            Votar
          </Button>
        </form>
      </Form>
    </>
  );
};

export default VoteForm;

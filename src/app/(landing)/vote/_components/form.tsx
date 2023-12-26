'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import { ElectionData } from '@/types';
import { VoteRequest, VoteValidator } from '@/lib/validators/vote';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import CandidateResultCard from '@/app/(landing)/vote/_components/candidate-card';
import { RadioGroup } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import ConfirmVoteModal from '@/components/modals/confirm-vote-modal';
import { toast } from '@/components/ui/use-toast';

interface VoteFormProps {
  electionData: ElectionData | null;
}

const VoteForm: React.FC<VoteFormProps> = ({ electionData }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

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

  const handleNullVote = () => {
    setIsLoading(true);

    const data = {
      ballots: electionData?.positions.map((position) => ({
        positionId: position.id,
        isNull: true,
      })),
    };

    axios
      .post(`/api/vote/${electionData?.id}`, data)
      .then(() => {
        toast({
          title: 'Voto anulado',
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

  return (
    <>
      <ConfirmVoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => onSubmit(form.getValues())}
        isLoading={isLoading}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            setIsOpen(true);
          })}
          className="flex flex-col gap-12"
        >
          {electionData?.positions.map((position, ballotIndex) => (
            <FormField
              key={position.id}
              control={form.control}
              name={`ballots.${ballotIndex}.positionId`}
              defaultValue={position.id}
              render={() => (
                <div className="flex flex-col items-center justify-center gap-6">
                  <div className="space-y-2 text-center">
                    <div className="text-xl font-semibold tracking-tight">
                      {position.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Se elige (1) candidato
                    </div>
                  </div>
                  <FormField
                    name={`ballots.${ballotIndex}.candidateId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={`grid gap-12 md:grid-cols-${position.candidates.length}`}
                          >
                            {position?.candidates.map((candidate) => (
                              <FormItem key={candidate.id}>
                                <CandidateResultCard
                                  key={candidate.id}
                                  candidate={candidate}
                                />
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            />
          ))}
          <div className="flex w-full justify-end space-x-2">
            <Button
              type="button"
              variant="destructive"
              onClick={handleNullVote}
            >
              Anular mi voto
            </Button>
            <Button type="submit">
              <Check className="mr-2 h-4 w-4" />
              Votar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default VoteForm;

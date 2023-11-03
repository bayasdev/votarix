'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RowSelectionState, Updater } from '@tanstack/react-table';
import { FileDownIcon } from 'lucide-react';

import { SafeUser } from '@/types';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/modal';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import AddVotersClient from '@/components/dashboard/elections/voters/add-voters-modal/client';
import { Label } from '@/components/ui/label';

interface AddVotersModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleManualUpload: () => void;
  // eslint-disable-next-line no-unused-vars
  handleFileUpload: (file: File | null) => void;
  rowSelection: {};
  // eslint-disable-next-line no-unused-vars
  setRowSelection?: (updater: Updater<RowSelectionState>) => void;
  // eslint-disable-next-line no-unused-vars
  setSelectedData: (data: SafeUser[]) => void;
  isLoading: boolean;
  elegibleVoters: SafeUser[] | null;
}

const AddVotersModal: React.FC<AddVotersModalProps> = ({
  isOpen,
  onClose,
  handleManualUpload,
  handleFileUpload,
  rowSelection,
  setRowSelection,
  setSelectedData,
  isLoading,
  elegibleVoters,
}) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Modal
      title="Agregar votantes"
      description="Seleccione los votantes que participarán en este proceso electoral"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="overflow-x-auto px-1 pt-6">
        <Tabs defaultValue="manual">
          <TabsList>
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="upload">Subir CSV</TabsTrigger>
          </TabsList>
          <TabsContent
            value="manual"
            className="flex max-h-[60vh] flex-col gap-6 overflow-y-auto"
          >
            <AddVotersClient
              elegibleVoters={elegibleVoters}
              rowSelection={rowSelection}
              setRowSelection={setRowSelection}
              onSelectedRowsChange={setSelectedData}
            />
            <div className="flex w-full items-center justify-end space-x-2">
              <Button disabled={isLoading} variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button disabled={isLoading} onClick={handleManualUpload}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Agregar votantes
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="flex flex-col gap-6">
            <Link
              href="/resources/modelo_votantes.csv"
              className={cn(buttonVariants({ variant: 'secondary' }))}
            >
              <FileDownIcon className="mr-2 h-4 w-4" />
              Descargar modelo CSV
            </Link>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFileUpload(file);
              }}
              className="w-full space-y-2"
            >
              <Label htmlFor="file">Archivo CSV</Label>
              <Input
                id="file"
                type="file"
                accept=".csv"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <div className="flex w-full items-center justify-end space-x-2 pt-6">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={onClose}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button disabled={isLoading} type="submit">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Subir archivo
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
};

export default AddVotersModal;

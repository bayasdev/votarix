'use client';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileDownIcon } from 'lucide-react';
import { SafeUser } from '@/types';
import AddVotersClient from '@/components/dashboard/elections/add-voters/client';

interface AddVotersModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleManualUpload: () => void;
  handleFileUpload: () => void;
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
  setSelectedData,
  isLoading,
  elegibleVoters,
}) => {
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
            className="flex max-h-[400vh] flex-col gap-6 overflow-y-auto"
          >
            <AddVotersClient
              elegibleVoters={elegibleVoters}
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
                Confirmar
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="upload" className="flex flex-col gap-6">
            <Button variant="secondary">
              <FileDownIcon className="mr-2 h-4 w-4" />
              Descargar modelo CSV
            </Button>
            <div className="flex flex-col gap-2">
              <Label htmlFor="file">Archivo CSV</Label>
              <Input type="file" id="file" />
            </div>
            <div className="flex w-full items-center justify-end space-x-2">
              <Button disabled={isLoading} variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button disabled={isLoading} onClick={handleFileUpload}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirmar
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  );
};

export default AddVotersModal;

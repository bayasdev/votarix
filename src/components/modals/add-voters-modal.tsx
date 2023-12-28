'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileDown } from 'lucide-react';
import axios from 'axios';

import { SafeUser } from '@/types';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/modal';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/shared/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import AddVotersClient from '@/app/dashboard/elections/[electionId]/voters/_components/modal/client';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import AlertModal from '@/components/modals/alert-modal';
import { useAddVotersModalStore } from '@/stores/add-voters-modal';

interface AddVotersModalProps {
  electionId: string;
  elegibleVoters: SafeUser[] | null;
}

const AddVotersModal: React.FC<AddVotersModalProps> = ({
  electionId,
  elegibleVoters,
}) => {
  const {
    isOpen,
    setIsOpen,
    isLoading,
    setIsLoading,
    selectedRows,
    setSelectedRows,
    setSelectedData,
    selectedData,
  } = useAddVotersModalStore((state) => state);
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [isManualUploadAlertModalOpen, setIsManualUploadAlertModalOpen] =
    useState(false);
  const [isFileUploadAlertModalOpen, setIsFileUploadAlertModalOpen] =
    useState(false);

  const alertModalDescription =
    'Al modificar el padrón electoral se pondrá en cero el proceso electoral. Esta acción no se puede deshacer.';
  const alertModalConfirmText = 'Aceptar';

  const handleManualUpload = () => {
    setIsManualUploadAlertModalOpen(true);
    setIsLoading(true);

    // make an array of {id: string} from selectedData
    const selectedIds = selectedData.map((user) => ({ id: user.id }));

    axios
      .post(`/api/elections/${electionId}/voters/bulkConnect`, selectedIds)
      .then((response) => {
        toast({
          title: 'Votantes agregados',
          description: response?.data,
        });
        router.refresh();
      })
      .catch((error) => {
        toast({
          title: 'Ocurrió un error',
          description: error?.response?.data,
          variant: 'destructive',
        });
      })
      .finally(() => {
        setIsLoading(false);
        setSelectedRows({});
        setIsManualUploadAlertModalOpen(false);
        setIsOpen(false);
      });
  };

  const handleFileUpload = (file: File | null) => {
    setIsFileUploadAlertModalOpen(true);

    if (!file || file.type !== 'text/csv') {
      toast({
        title: 'Ocurrió un error',
        description: 'El archivo debe ser de tipo CSV',
        variant: 'destructive',
      });
      setIsFileUploadAlertModalOpen(false);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    axios
      .post(`/api/elections/${electionId}/voters/bulkUpload`, file)
      .then((response) => {
        toast({
          title: 'Votantes agregados',
          description: response?.data,
        });
        router.refresh();
      })
      .catch((error) => {
        toast({
          title: 'Ocurrió un error',
          description: error?.response?.data,
          variant: 'destructive',
        });
      })
      .finally(() => {
        setIsLoading(false);
        setIsFileUploadAlertModalOpen(false);
        setIsOpen(false);
      });
  };

  return (
    <>
      <AlertModal
        description={alertModalDescription}
        confirmText={alertModalConfirmText}
        isOpen={isManualUploadAlertModalOpen}
        onClose={() => setIsManualUploadAlertModalOpen(false)}
        onConfirm={() => handleManualUpload()}
        isLoading={isLoading}
      />
      <AlertModal
        description={alertModalDescription}
        confirmText={alertModalConfirmText}
        isOpen={isFileUploadAlertModalOpen}
        onClose={() => setIsFileUploadAlertModalOpen(false)}
        onConfirm={() => handleFileUpload(file)}
        isLoading={isLoading}
      />
      <Modal
        title="Agregar votantes"
        description="Seleccione los votantes que participarán en este proceso electoral"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                setSelectedData={setSelectedData}
              />
              <div className="flex w-full items-center justify-end space-x-2">
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => setIsManualUploadAlertModalOpen(true)}
                >
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
                <FileDown className="mr-2 h-4 w-4" />
                Descargar modelo CSV
              </Link>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsFileUploadAlertModalOpen(true);
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
                    onClick={() => setIsOpen(false)}
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
    </>
  );
};

export default AddVotersModal;

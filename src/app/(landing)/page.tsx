import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightCircle, BarChartBig, FileDown } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import TribunalCard from '@/app/(landing)/_components/tribunal-card';

export const metadata: Metadata = {
  title: 'Sistema web de votación electrónica',
};

const LandingPage = () => {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl font-medium sm:text-5xl md:text-6xl lg:text-7xl">
            Ejerce tu derecho al voto
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Con el sistema de votación electrónica {siteConfig.name}, los
            resultados de las elecciones se obtienen en minutos, no en días.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/vote" className={cn(buttonVariants({ size: 'lg' }))}>
              <ArrowRightCircle className="mr-2 h-5 w-5" />
              Ir a votar
            </Link>
            <Link
              href="/results"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              <BarChartBig className="mr-2 h-5 w-5" />
              Resultados
            </Link>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Miembros del Tribunal Electoral
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            El Tribunal Electoral es el órgano encargado de la organización y
            ejecución de los procesos electorales de la{' '}
            {siteConfig.organizationName} ({siteConfig.organizationAbbreviation}
            ).
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 md:max-w-[64rem] lg:grid-cols-3">
          {siteConfig.tribunal.map((member) => (
            <TribunalCard
              key={member.name}
              name={member.name}
              title={member.title}
              imageUrl={member.imageUrl}
            />
          ))}
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Normativa legal
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Conoce los reglamentos que rigen el sistema de votación electrónica{' '}
            {siteConfig.name}.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="elections-regulation">
              <AccordionTrigger>
                Reglamento de elecciones de representantes ante el órgano de
                Cogobierno UNIB.E
              </AccordionTrigger>
              <AccordionContent>
                <Link
                  href="https://unibe.edu.ec/wp-content/uploads/2023/08/REGLAMENTO-DE-ELECCIONES-REPRESENTANTES-ANTE-EL-ORGANO-DE-COGOBIERNO-DE-LA-UNIBE-signed.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Descargar PDF
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="privacy-policy">
              <AccordionTrigger>Política de privacidad</AccordionTrigger>
              <AccordionContent>
                <Link
                  href="/privacy"
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  <ArrowRightCircle className="mr-2 h-4 w-4" />
                  Leer política de privacidad
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default LandingPage;

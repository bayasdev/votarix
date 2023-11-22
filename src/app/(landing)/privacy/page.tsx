import { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import Heading from '@/components/shared/heading';

export const metadata: Metadata = {
  title: 'Política de privacidad',
};

const PrivacyPage = () => {
  return (
    <div className="container flex flex-col gap-6">
      <Heading
        title="Política de privacidad"
        subtitle="Ultima actualización: 22 de noviembre de 2023"
      />
      <div className="prose max-w-none">
        <p>
          La presente política de privacidad tiene por objeto informar a los
          usuarios del sistema de votación electrónica {siteConfig.name} sobre
          el tratamiento de sus datos personales, de acuerdo con lo establecido
          en la Consitución de la República del Ecuador, la Ley Orgánica de
          Protección de Datos Personales y demás normativa aplicable.
        </p>
        <p>
          Al utilizar el sistema de votación electrónica {siteConfig.name}, el
          usuario acepta la presente política de privacidad y autoriza el
          tratamiento de sus datos personales de acuerdo con lo establecido en
          la misma.
        </p>
        <h3>1. Responsable del tratamiento de sus datos personales</h3>
        <p>
          El responsable del tratamiento de sus datos personales es la{' '}
          {siteConfig.organizationName} ({siteConfig.organizationAbbreviation}),
          con domicilio en las calles: {siteConfig.organizationAddress} y,
          correo electrónico: {siteConfig.organizationEmail}.
        </p>
        <h3>2. Datos personales tratados</h3>
        <p>
          Los datos personales que se tratan en el sistema de votación
          electrónica {siteConfig.name} son los siguientes:
        </p>
        <ul>
          <li>Nombre completo</li>
          <li>Cédula de identidad</li>
          <li>Correo electrónico</li>
          <li>Contraseña</li>
          <li>Rol dentro del sistema</li>
          <li>Preferencias electorales</li>
        </ul>
        <h3>3. Finalidad del tratamiento de sus datos personales</h3>
        <p>
          Los datos personales que se tratan en el sistema de votación
          electrónica {siteConfig.name} se tratan con la finalidad de:
        </p>
        <ul>
          <li>Identificar a los usuarios del sistema</li>
          <li>
            Verificar la identidad y la elegibilidad de los usuarios para
            ejercer su derecho al voto
          </li>
          <li>Registrar y contabilizar los votos emitidos por los usuarios</li>
          <li>
            Garantizar la seguridad, transparencia y eficiencia del proceso
            electoral
          </li>
          <li>
            Realizar estadísticas y estudios sobre el comportamiento electoral
          </li>
          <li>
            Comunicar a los usuarios los resultados electorales y otras
            informaciones de interés
          </li>
          <li>Cumplir con las obligaciones legales y reglamentarias</li>
        </ul>
        <h3>4. Divulgación de sus datos personales</h3>
        <p>
          El sistema de votación electrónica {siteConfig.name} no venderá,
          alquilará ni compartirá sus datos personales con terceros, excepto en
          los siguientes casos:
        </p>
        <ul>
          <li>
            Cuando sea necesario para cumplir con las obligaciones legales y
            reglamentarias
          </li>
          <li>
            Cuando sea necesario para garantizar la seguridad, transparencia y
            eficiencia del proceso electoral
          </li>
          <li>
            Cuando sea necesario para cumplir con los fines del tratamiento de
            sus datos personales
          </li>
          <li>
            Cuando sea necesario para la prestación de servicios de terceros
            contratados por la {siteConfig.organizationName} (
            {siteConfig.organizationAbbreviation})
          </li>
        </ul>
        <h3>5. Seguridad de sus datos personales</h3>
        <p>
          El sistema de votación electrónica {siteConfig.name} implementa
          estrictas medidas de seguridad para proteger sus datos personales de
          cualquier acceso no autorizado, modificación o divulgación.
        </p>
        <p>
          Sin embargo, debido a la naturaleza de Internet, la{' '}
          {siteConfig.organizationName} ({siteConfig.organizationAbbreviation})
          no puede garantizar la seguridad absoluta de sus datos personales
          durante la transmisión y/o almacenamiento en sus servidores.
        </p>
        <h3>6. Derechos de los usuarios</h3>
        <p>
          Los usuarios del sistema de votación electrónica {siteConfig.name}{' '}
          tienen los siguientes derechos:
        </p>
        <ul>
          <li>
            Derecho de acceso: derecho a solicitar información sobre el
            tratamiento de sus datos personales
          </li>
          <li>
            Derecho de rectificación: derecho a solicitar la modificación de sus
            datos personales cuando sean inexactos o incompletos
          </li>
          <li>
            Derecho de cancelación: derecho a solicitar la eliminación de sus
            datos personales
          </li>
          <li>
            Derecho de oposición: derecho a oponerse al tratamiento de sus datos
            personales
          </li>
          <li>
            Derecho de limitación: derecho a solicitar la limitación del
            tratamiento de sus datos personales
          </li>
          <li>
            Derecho de portabilidad: derecho a solicitar la portabilidad de sus
            datos personales
          </li>
        </ul>
        <p>
          Para ejercer sus derechos, los usuarios del sistema de votación
          electrónica {siteConfig.name} deben enviar una solicitud por escrito a
          la dirección de correo electrónico: {siteConfig.organizationEmail}.
        </p>
        <p>
          La {siteConfig.organizationName} (
          {siteConfig.organizationAbbreviation}) responderá a las solicitudes de
          los usuarios en un plazo máximo de 30 días.
        </p>
        <h3>7. Modificaciones de la política de privacidad</h3>
        <p>
          La presente política de privacidad puede ser modificada en cualquier
          momento por la {siteConfig.organizationName} (
          {siteConfig.organizationAbbreviation}).
        </p>
        <p>
          La {siteConfig.organizationName} (
          {siteConfig.organizationAbbreviation}) publicará en su sitio web las
          modificaciones de la presente política de privacidad.
        </p>
        <p>
          La {siteConfig.organizationName} (
          {siteConfig.organizationAbbreviation}) recomienda a los usuarios del
          sistema de votación electrónica {siteConfig.name} revisar
          periódicamente la presente política de privacidad.
        </p>
        <h3>8. Contacto</h3>
        <p>
          Si tiene alguna pregunta sobre la presente política de privacidad,
          puede contactar con la {siteConfig.organizationName} (
          {siteConfig.organizationAbbreviation}) a través de la dirección de
          correo electrónico: {siteConfig.organizationEmail}.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPage;

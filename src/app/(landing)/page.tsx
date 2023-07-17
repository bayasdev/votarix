import Image from 'next/image';
import ContainerLanding from '@/src/components/landing/common/Container';
import Hero from '@/src/components/landing/common/Hero';

const members = [
  {
    name: 'Mgst. Myriam Álvarez',
    position: 'Presidenta',
    photo:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  {
    name: 'Dr. Thelman Cabrera',
    position: 'Secretario',
    photo:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  {
    name: 'Mgst. Ana Quintana',
    position: 'Vocal (Representante de los docentes)',
    photo:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  {
    name: 'Sr. Emilio Zapata',
    position: 'Vocal (Representante de los estudiantes)',
    photo:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  {
    name: 'Verónica Quito',
    position: 'Vocal (Representante de los trabajadores)',
    photo:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
];

const LandingPage = () => {
  return (
    <>
      <Hero />
      <ContainerLanding>
        <div className="py-12 flex flex-col gap-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-3xl font-medium text-center">
              Consejo Tribunal Electoral UNIB.E
            </div>
            <hr className="border-primary border-4 w-32" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {members.map((person, index) => (
              <div
                className="flex flex-col items-center text-center shadow-md gap-2 p-8 rounded-xl"
                key={index}
              >
                <Image
                  className="w-32 h-32 rounded"
                  src={person.photo}
                  width={128}
                  height={128}
                  alt="Member photo"
                />
                <div className="font-bold">{person.name}</div>
                <div className="text-gray-600">{person.position}</div>
              </div>
            ))}
          </div>
        </div>
      </ContainerLanding>
    </>
  );
};

export default LandingPage;

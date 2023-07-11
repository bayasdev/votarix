import ContainerLanding from '@/src/components/landing/common/Container';
import Hero from '@/src/components/landing/common/Hero';

const LandingPage = (
  {
    listUser = [
      {
        name: "Mgst. Myriam Álvarez",
        position: "Presidenta",
        photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
      {
        name: "Dr. Thelman Cabrera",
        position: "Secretario",
        photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
      {
        name: "Mgst. Ana Quintana",
        position: "Vocal (Representante de los docentes)",
        photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
      {
        name: "Sr. Emilio Zapata",
        position: "Vocal (Representante de los estudiantes)",
        photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
      {
        name: "Verónica Quito",
        position: "Vocal (Representante de los trabajadores)",
        photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      }
    ],
  }
) => {
  return (<>
    <Hero />
    <ContainerLanding>
      <div className="bg-gradient-to-b from-white-300 to-white-500 w-full py-8">
        <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center items-center justify-center">
          <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed" >
            Consejo Tribunal Electoral UNIB.E
          </div>
          <div className='mt-2 border-primary border-4 w-32'></div>
        </div>
      </div>
      <div className='grid sm:grid-cols-10 grid-cols-1 gap-4 mt-6 mb-10'>
        {listUser.map((person, index) => (
          <div className="col-span-2 flex flex-col items-center shadow w-full p-4 rounded-md ">
            <img className="w-32 h-32 rounded"
              src={person.photo}
              alt="Card cover image" />
            <div className="font-bold text-center mt-2">{person.name}</div>
            <div className="text-center text-[#64748b]">{person.position}</div>
          </div>
        ))}
      </div>
    </ContainerLanding>
  </>);
};

export default LandingPage;

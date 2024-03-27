import { useNavigate } from 'react-router-dom';

const HomePage = () => {

  const navigate = useNavigate()
  
  return (
    <div>
      <div className="container d-flex justify-content-center pt-5">
        <div onClick={() => navigate('/tours/book')} className='main_header' style={{background: 'rgba(255, 255, 255, 0.3)', borderRadius: '50px'}}>
        <button className='p-3 main_header btn' style={{ borderRadius: '50px', opacity: '90%'}}>
          <h3 className='animate_animated animate_rubberBand' style={{fontWeight: 'bold', fontSize: '45px'}}>Choose your next destination</h3>
        </button>
        </div>
      </div>
      <img  style={{width: '100%'}} id="video-background" src={'https://firebasestorage.googleapis.com/v0/b/tours-app-20084.appspot.com/o/gallery%2Fpietro-de-grandi-T7K4aEPoGGk-unsplash.jpg?alt=media&token=828fa40b-8e5c-4339-b685-1ef0e1afb3c6'}/>
        {/* <video style={{width: '100%'}} autoPlay muted loop id="video-background">
          <source src="https://firebasestorage.googleapis.com/v0/b/tours-management-d55e4.appspot.com/o/gallery%2Fvideo%20(2160p).mp4?alt=media&token=6951bcde-e8d5-4226-9a01-f932b1fee3a9" type="video/mp4" />
        </video> */}
    </div>
  );
};

export default HomePage;




import './Home.css';
import blood from '../../Images/blood.jpg';
import {useNavigate} from 'react-router-dom' ;
const Home = () => {
  const Navigate=useNavigate()
  return (
    <div className='Home'>
      <h1 className='Blood-Buddy'>
          Blood-Buddy
      </h1>
        <div className="home-container">
            <div className='Project-Description'>
                <div className='Description'>
                  <h1>
                    Hi there...
                  </h1>
                  <h5>
                    Are you ready to make a difference? 
                  </h5>
                  <p>
                    Our Blood Donor website connects donors with those in need, creating a powerful network of life-savers. Join our community of compassionate individuals dedicated to saving lives through the simple act of blood donation.
                  </p>

                </div>
                  <img src={blood} alt='Im'/>
            </div>
            <div className='Footer'>
                <div className='Explore'>
                  <h3>
                      Join Now 👇
                  </h3>
                  <div className='ExploreButtons'>
                    <button onClick={()=>Navigate('/login')}>
                        Login
                    </button>
                    <p style={{paddingLeft:'1em',paddingRight:'1em',fontSize:'2vw'}}>
                      
                    </p>
                    <button onClick={()=>Navigate('/register')}>
                        SignUp
                    </button>
                  </div>
                </div>
                <div className='Dev'>
                  <h3>
                    About Me
                  </h3>
                  <p>
                  👋 Hello, I'm Pavan Sri Sai🩶, the creator and visionary behind the Blood Buddy website. Fueled by a passion for technology and a deep commitment to humanity.
                  </p>
                  <div className="contact">
                      <a href='https://www.linkedin.com/in/akula-pavansrisai/'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8a0505" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
                      <a href='mailto:pavansrisai2614@gmail.com'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8a0505" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-horizontal"><path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/></svg></a>                  
                      <a href='https://github.com/srisai-2614'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8a0505" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
                  </div>
                  
                </div>
            </div>
        </div>
    </div>

  );
};

export default Home;

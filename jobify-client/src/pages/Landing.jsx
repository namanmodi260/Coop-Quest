import styled from 'styled-components';
import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/logo3-removebg.png';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg';
import { NewLogo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        {/* <NewLogo /> */}
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
           Coop-Quest : Elevate your job search with our intuitive platform. Effortlessly manage applications, track statuses, and stay organized. Your personalized career journey begins here!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        
        </div>
        <img src={main} alt="job hunt" className="img main-img" style={{width:"650px"}} />
      </div>
    </Wrapper>
  );
};
export default Landing;

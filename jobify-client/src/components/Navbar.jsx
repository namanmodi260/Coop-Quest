import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';

import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';
import { ThemeContext } from 'styled-components';
import ThemeToggle from './ThemeToggle';
const Navbar = () => {
  const { toggleSidebar,isAuthorized,toggleAuthorized } = useDashboardContext();
   function handleAuthClick() {
    // tokenClient.callback = async (resp) => {
    //   if (resp.error !== undefined) {
    //     throw (resp);
    //   }
    
    //   await listUpcomingEvents();
    // };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({prompt: 'consent'});
      toggleAuthorized();
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      return;
      tokenClient.requestAccessToken({prompt: ''});
    }
  }
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
          <button className={isAuthorized ? 'btn cal-btn disabled' : 'btn cal-btn'} onClick={handleAuthClick}>{isAuthorized ? "Logged In" : "Sign in With Google"}</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

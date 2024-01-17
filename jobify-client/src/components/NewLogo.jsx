import logo from '../assets/images/logo3-removebg.png';

const NewLogo = () => {
  return (
    <img
      src={logo}
      alt="jobify"
      className="logo"
      style={{
        width: '20%',
        display: 'block',
        marginLeft: '0px',
        marginRight: 'auto',
        paddingTop: '140px',
      }}
    />
  );
};
export default NewLogo;

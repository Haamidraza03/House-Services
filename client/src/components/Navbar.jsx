
import Logo from './logoh.jpg';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

function BasicExample() {
  const {currentUser} = useSelector((state)=>state.user)
  const {currentSp} = useSelector((state)=>state.sp)
  return (
      <Navbar expand="lg" className="bg-body-tertiary fixed-top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className='fs-5 ms-0'><Link to="/"><img src={Logo} alt="logo" className="img-fluid rounded-circle ms-0 me-2" width="35"/></Link>Housyy <span id='hsp'>- House Service Providers</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto m-0">
            <Link to="/" className='fs-5 nav-link active me-3'>Home</Link>
            <Link to="/about" className='fs-5 nav-link active me-3'>About Us</Link>
            <Link to="/contact" className='fs-5 nav-link active me-3'>Contact Us</Link>
            <Link to="/profile" className='fs-5 nav-link active'>
              {currentSp ? (
                <img src={currentSp.profilePicture} title='Your Profile' alt="profile" width="43" className='rounded-circle' />
              ) : currentUser ? (
                <img src={currentUser.profilePicture} title='Your Profile' alt="profile" width="43" className='rounded-circle' />
              ) : (
                <li>Login/SignUp</li>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default BasicExample;
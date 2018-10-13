import * as React from 'react';
import Icon from 'react-fa';
import { Link } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';

import './header.css';

const styleButtonLink: React.CSSProperties = {
  padding: 0,
}

class AppHeader extends React.Component<{}, {isOpen: boolean}> {
  constructor(props: any) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  public toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  public render() {
    return (
     <Navbar className="ml-auto" color="light" light={true} expand="md">
       <NavbarBrand className="nav-link" href="/">LotWCS</NavbarBrand>
       <NavbarToggler onClick={this.toggle} />
       <Collapse isOpen={this.state.isOpen} navbar={true}>
        <Nav className="ml-auto" navbar={true}>
          <NavItem><Link className="nav-link" to="/skills">Skills</Link></NavItem>
          <NavItem><Link className="nav-link" to="/chi">Chi</Link></NavItem>
          <NavItem><Link className="nav-link" to="/virtues">Virtues</Link></NavItem>
          <NavItem><Link className="nav-link" to="/equipment">Equipment</Link></NavItem>
          <NavItem><Link className="nav-link" to="/conditions">Conditions</Link></NavItem>
          <NavItem><Link className="nav-link" to="/kungfu" >{"Kung\u00A0Fu"}</Link></NavItem>
          <NavItem><Link className="nav-link" to="/loresheets">Loresheets</Link></NavItem>
        </Nav>
        <Nav className="ml-auto w-100 justify-content-end" navbar={true}>
          <NavItem><Link className="nav-link" to="/history">History</Link></NavItem>
          <NavItem><Link className="nav-link" to="/print">Full sheet</Link></NavItem>
          <NavItem><Link className="nav-link" style={styleButtonLink} to="/config"><Button className="seconday"><Icon name="cog" /></Button></Link></NavItem>
        </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default AppHeader;

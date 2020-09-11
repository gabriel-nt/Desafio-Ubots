import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface HeaderProps {
  initial?: boolean;
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  initial = true,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <h2>Ubots</h2>
      <nav>
        <Link to="/">{initial ? 'Listagem de Clientes' : 'Voltar'}</Link>
      </nav>
    </header>
  </Container>
);

export default Header;

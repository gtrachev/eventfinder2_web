import styled from "styled-components";

interface StyledNavProps {
  readonly showMobile: boolean;
}

const StyledNav = styled.nav<StyledNavProps>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(4, 136, 237, 1);
  z-index: 10;
  .activatedNavHeader {
    h2 {
      color: #ffbd0d;
    }
  }
  .mobile-menu {
    background: #112d32;
    padding: 1rem;
    display: none;
    z-index: 30;
    position: fixed;
    top: 64px;
    right: 0;
    border-radius: 0 0 0 10px;
  }
  @media (max-width: 720px) {
    .hamburger-menu {
      display: block;
    }
    .hide-mobile {
      display: none;
    }
    .mobile-menu {
      display: block;
    }
  }
`;

export default StyledNav;

import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 1030px) {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  margin-top: -100px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Card = styled.div`
  p {
    color: #fff;
    font-size: 16px;
  }

  > div {
    width: 100%;
    height: 56px;
    margin-top: 8px;
    border-radius: 8px;
    background: #fff;
    border: 1px solid #e6e6f0;
    outline: 0;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-size: 20px;
      color: #363f5f;
      font-weight: normal;
    }
  }
`;

export const TableContainer = styled.section`
  @media (max-width: 1030px) {
    overflow: scroll;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      width: 0px;
    }
  }

  p {
    margin-top: 24px;
    color: #969cb3;
  }

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #969cb3;
      font-weight: normal;
      padding: 20px 32px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #969cb3;

      &.title {
        color: #363f5f;
      }

      &.success {
        color: #12a454;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }

    tbody {
      & tr {
        a {
          color: #363f5f;
          cursor: pointer;
          text-decoration: none;
        }

        transition: transform 0.2s;

        &:hover {
          transform: translateX(10px);
        }
      }
    }
  }
`;

export const SelectBox = styled.div`
  position: relative;

  & + .select-block {
    margin-top: 1.4rem;
  }

  & label {
    color: #fff;
    font-size: 16px;
  }

  & select {
    width: 100%;
    height: 56px;
    margin-top: 8px;
    border-radius: 8px;
    background: #fff;
    border: 1px solid #e6e6f0;
    outline: 0;
    padding: 0 16px;
    color: #363f5f;
    font-weight: normal;
  }

  &:focus-within::after {
    width: calc(100% - 3.2rem);
    height: 2px;
    content: '';
    background: black;
    position: absolute;
    left: 1.6rem;
    right: 1.6rem;
    bottom: 0;
  }
`;

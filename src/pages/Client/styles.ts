import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 20px;
  padding-bottom: 50px;
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px 0 20px;
  flex-direction: row;

  h2 {
    color: #363f5f;
    padding-left: 20px;
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

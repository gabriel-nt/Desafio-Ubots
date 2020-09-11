import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FiUserCheck, FiShoppingCart } from 'react-icons/fi';
import api from '../../services/api';
import Header from '../../components/Header';

import { Container, TableContainer, Title } from './styles';

import { Client as ClientProps, Sale } from '../Dashboard/index';
import {
  formatDocument,
  formatDate,
  formatValue,
} from '../../utils/formatValue';

interface ClientParams {
  client: string;
}

interface Wine {
  product: string;
  quantity: number;
}

interface SalesProps extends Sale {
  itens: [
    {
      produto: string;
      variedade: string;
      categoria: string;
    },
  ];
}

const Client: React.FC = () => {
  const { params } = useRouteMatch<ClientParams>();

  const [wine, setWine] = useState<Wine | null>();
  const [sales, setSales] = useState<SalesProps[]>([]);
  const [client, setClient] = useState<ClientProps | null>();

  useEffect(() => {
    async function loadSales(): Promise<void> {
      const responseSales = await api.get<SalesProps[]>(
        '598b16861100004905515ec7',
      );
      const responseClients = await api.get<ClientProps[]>(
        '598b16291100004705515ec5',
      );

      const client = responseClients.data.find(
        client => String(client.id) === params.client,
      );

      const purchases = responseSales.data.filter(
        sale => client?.cpf.replace('-', '.') === formatDocument(sale.cliente),
      );

      const itens = purchases.map(sale => sale.itens.map(item => item.produto));
      const updateItens: string[] = [];
      const productList: Wine[] = [];
      const quantityList: number[] = [];

      itens.forEach(item => {
        item.forEach(value => {
          updateItens.push(value);
        });
      });

      updateItens.forEach(item => {
        if (!productList.find(value => value.product === item)) {
          const quantity = updateItens.filter(value => value === item).length;
          quantityList.push(quantity);
          productList.push({
            product: item,
            quantity,
          });
        }
      });

      const maxValue = quantityList.reduce((a, b) => {
        return Math.max(a, b);
      });

      setClient(client);
      setSales(purchases);
      setWine(productList.find(value => value.quantity === maxValue));
    }

    loadSales();
  }, [params.client]);

  return (
    <>
      <Header initial={false} />
      <Container>
        <Title>
          <FiUserCheck size={30} color="#363f5f" />
          <h2>Seus Dados</h2>
        </Title>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Nº de Compras</th>
                <th>R$ Compras</th>
                <th>Vinho Indicado</th>
              </tr>
            </thead>

            <tbody>
              <tr key={client?.id}>
                <td>{client?.id}</td>
                <td className="title">{client?.nome}</td>
                <td className="success">{sales.length}</td>
                <td>
                  {formatValue(
                    sales.reduce((total, value) => total + value.valorTotal, 0),
                  )}
                </td>
                <td>{wine?.product}</td>
              </tr>
            </tbody>
          </table>
        </TableContainer>

        <Title>
          <FiShoppingCart size={30} color="#363f5f" />
          <h2>Suas Compras</h2>
        </Title>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {sales.map(sale => (
                <tr key={sale.codigo}>
                  <td>{sale.codigo}</td>
                  <td className="title">{client?.nome}</td>
                  <td className="success">{formatValue(sale.valorTotal)}</td>
                  <td>{formatDate(sale.data)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Client;

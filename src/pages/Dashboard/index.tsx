import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';

import income from '../../assets/income.svg';
import total from '../../assets/total.svg';

import {
  formatDocument,
  formatValue,
  formatDate,
} from '../../utils/formatValue';

import {
  Container,
  CardContainer,
  Card,
  TableContainer,
  SelectBox,
} from './styles';

export interface Sale {
  codigo: string;
  data: string;
  cliente: string;
  valorTotal: number;
  nomeCliente: string;
}

export interface Client {
  id: number;
  nome: string;
  cpf: string;
  date: string;
  totalBuy: number;
  numberPurchases: number;
  totalPurchases: number;
}

const Dashboard: React.FC = () => {
  const [hightPurchase, setHightPurchase] = useState<Client | null>();
  const [sales, setSales] = useState<Sale[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function loadSales(): Promise<void> {
      const responseSales = await api.get<Sale[]>('598b16861100004905515ec7');
      const responseClients = await api.get<Client[]>(
        '598b16291100004705515ec5',
      );

      const updateClients = responseClients.data.map(client => {
        const purchases = responseSales.data.filter(
          sale => client.cpf.replace('-', '.') === formatDocument(sale.cliente),
        );

        if (purchases) {
          const totalPurchases = purchases.reduce(
            (total, value) => total + value.valorTotal,
            0,
          );

          return {
            ...client,
            totalPurchases,
            numberPurchases: purchases.length,
          };
        }

        return client;
      });

      const sortClients = updateClients.sort((a, b) => {
        return b.totalPurchases - a.totalPurchases;
      });

      setClients(sortClients);
      setSales(responseSales.data);
    }

    loadSales();
  }, []);

  const handleMaxValuePurchases = useCallback(() => {
    const sortClients = clients.sort((a, b) => {
      return b.totalPurchases - a.totalPurchases;
    });

    setHightPurchase(null);
    setClients([...sortClients]);
  }, [clients]);

  const handleMaxPurchase = useCallback(() => {
    const sales2016 = sales
      .filter(sale => sale.data.indexOf('2016') !== -1)
      .map(value => value.valorTotal);
    const maxValue = sales2016.reduce((a, b) => {
      return Math.max(a, b);
    });

    const maxSale = sales.find(sale => sale.valorTotal === maxValue);
    clients.forEach(value => {
      if (maxSale) {
        if (value.cpf.replace('-', '.') === formatDocument(maxSale.cliente)) {
          const client = {
            ...value,
            date: maxSale.data,
            totalBuy: maxSale.valorTotal,
          };

          setHightPurchase(client);
        }
      }
    });
  }, [clients, sales]);

  const handleClients = useCallback(() => {
    const sortClients = clients.sort((a, b) => {
      return b.numberPurchases - a.numberPurchases;
    });

    setClients([...sortClients]);
    setHightPurchase(null);
  }, [clients]);

  const handleSetFilter = useCallback(
    value => {
      switch (value) {
        case '1':
          handleMaxValuePurchases();
          break;
        case '2':
          handleMaxPurchase();
          break;
        case '3':
          handleClients();
          break;
        default:
          handleMaxValuePurchases();
          break;
      }
    },
    [handleMaxValuePurchases, handleMaxPurchase, handleClients],
  );

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <SelectBox>
            <label htmlFor="filter">Filtro</label>
            <select
              onChange={e => {
                handleSetFilter(e.target.value);
              }}
            >
              <option value="1">Maior valor em Compras</option>
              <option value="2">Maior venda de 2016</option>
              <option value="3">Cliente fiéis</option>
            </select>
          </SelectBox>
          <Card>
            <p>Nº de Clientes</p>
            <div>
              <h1>{hightPurchase ? '1' : clients.length}</h1>
              <img src={income} alt="Income" />
            </div>
          </Card>

          <Card>
            <p>Total das Vendas</p>
            <div>
              <h1>
                {hightPurchase
                  ? formatValue(hightPurchase.totalBuy)
                  : formatValue(
                      clients.reduce(
                        (total, value) => total + value.totalPurchases,
                        0,
                      ),
                    )}
              </h1>
              <img src={total} alt="Total" />
            </div>
          </Card>
        </CardContainer>

        <TableContainer>
          <p>* OBS: Clique no ID do cliente para ver suas informações</p>
          {hightPurchase ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Documento</th>
                  <th>Total</th>
                  <th>Data</th>
                </tr>
              </thead>

              <tbody>
                <tr key={hightPurchase.id}>
                  <td>{hightPurchase.id}</td>
                  <td className="title">{hightPurchase.nome}</td>
                  <td className="success">{hightPurchase.cpf}</td>
                  <td>{formatValue(hightPurchase.totalBuy)}</td>
                  <td>{formatDate(hightPurchase.date)}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Documento</th>
                  <th>Compras</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {clients.map(client => (
                  <tr key={client.id}>
                    <td>
                      <Link to={`/clients/${client.id}`}>{client.id}</Link>
                    </td>
                    <td className="title">{client.nome}</td>
                    <td className="success">{client.cpf}</td>
                    <td>{client.numberPurchases}</td>
                    <td>{formatValue(client.totalPurchases)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;

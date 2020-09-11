import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.mocky.io/v2/',
});

export default api;

// const updateSales = responseSales.data.map(sale => {
//   const client = responseClients.data.find(
//     item => item.cpf.replace('-', '.') === formatDocument(sale.cliente),
//   );

//   if (client) {
//     return {
//       ...sale,
//       nomeCliente: client.nome,
//     };
//   }

//   return sale;
// });

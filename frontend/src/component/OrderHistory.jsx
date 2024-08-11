import React, { useEffect, useState } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { getOrdersByUserId } from '../modules/fetch';
import { jwtDecode } from 'jwt-decode';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = window.localStorage.getItem('token');
  const { id: user_id } = jwtDecode(token);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrdersByUserId(user_id, token);
      setOrders(data.orders);
    };
    fetchOrders();
  }, [user_id, token]);

  return (
    <Box p={5} w="100%">
      <Text fontSize="3xl" fontWeight="bold">Riwayat pembayaran Iuran Bulanan</Text>
      <Table variant="simple" mt={4} size="lg" w="100%" border="1px solid black" style={{borderCollapse: 'collapse'}}>
        <Thead>
          <Tr>
            <Th border="1px solid black">Bulan Bayar</Th>
            <Th border="1px solid black">Jenis Pembayaran</Th>
            <Th border="1px solid black">Bukti Bayar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td border="1px solid black">{order.bulan_bayar}</Td>
              <Td border="1px solid black">{order.metode_pembayaran}</Td>
              <Td border="1px solid black">
                <a href={`http://localhost:3000/uploads/${order.bukti_bayar}`} target="_blank" rel="noopener noreferrer">
                  <img src={`http://localhost:3000/uploads/${order.bukti_bayar}`} alt="Bukti Bayar" width="100" />
                </a>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderHistory;

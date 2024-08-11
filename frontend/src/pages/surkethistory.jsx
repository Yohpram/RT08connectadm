import React, { useEffect, useState } from 'react';
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'; // Import Table components from Chakra UI
import { getSurketsByUserId } from '../modules/fetch';
import {jwtDecode} from 'jwt-decode'; // Corrected the import for jwt-decode

const OrderHistory = () => {
  const [surkets, setSurkets] = useState([]);
  const token = window.localStorage.getItem('token');
  const { id: user_id } = jwtDecode(token);

  useEffect(() => {
    const fetchSurket = async () => {
      try {
        const data = await getSurketsByUserId(user_id, token);
        setSurkets(data.surkets); // Corrected to access the correct property
      } catch (error) {
        console.error('Error fetching surkets:', error);
      }
    };
    fetchSurket();
  }, [user_id, token]);

  return (
    <Box p={5} w="100%">
      <Text fontSize="3xl" fontWeight="bold">Riwayat Pembuatan Surket</Text>
      <Table variant="simple" mt={4} size="lg" w="100%" border="1px solid black" style={{borderCollapse: 'collapse'}}> {/* Add borderCollapse here */}
        <Thead>
          <Tr>
            <Th border="1px solid black">NIK</Th> {/* Add border here */}
            <Th border="1px solid black">Nama</Th> {/* Add border here */}
            <Th border="1px solid black">tempat lahir</Th> {/* Add border here */}
            <Th border="1px solid black">tanggal lahir</Th> {/* Add border here */}
            <Th border="1px solid black">Agama</Th> {/* Add border here */}
            <Th border="1px solid black">Keterangan</Th> {/* Add border here */}
            <Th border="1px solid black">dibuat pada</Th> {/* Add border here */}
            {/* Add more headers as needed */}
          </Tr>
        </Thead>
        <Tbody>
          {surkets.length > 0 ? (
            surkets.map((surket) => (
              <Tr key={surket.id}>
                <Td border="1px solid black">{surket.nik}</Td> {/* Add border here */}
                <Td border="1px solid black">{surket.nama}</Td> {/* Add border here */}
                <Td border="1px solid black">{surket.tempat_lahir}</Td> {/* Add border here */}
                <Td border="1px solid black">{surket.tanggal_lahir}</Td> {/* Add border here */}
                <Td border="1px solid black">{surket.agama}</Td> {/* Add border here */}
                <Td border="1px solid black">{surket.keperluan}</Td> {/* Add border here */}
                <Td border="1px solid black">{surket.created_at}</Td> {/* Add border here */}
                {/* Add more cells as needed */}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="2" border="1px solid black">No data available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderHistory;

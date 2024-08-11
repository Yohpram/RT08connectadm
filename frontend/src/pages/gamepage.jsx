import React, { useState, useEffect } from 'react';
import { Box, ChakraProvider, Image, Text, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const GamePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <ChakraProvider>
      {isLoading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          {/* Kotak 1 dengan Gambar dan Keterangan */}
          <Link to="/suket">
            <Box
              width="200px"
              margin="20"
              rounded="lg"
              _hover={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transform: 'scale(1.05)',
              }}
              textAlign="center"
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/6877/6877313.png"
                alt="Deskripsi Gambar 1"
                objectFit="cover"
                width="100%"
                height="200px"
                rounded="lg"
              />
              <Text mt="2">Pembuatan Surat Keterangan</Text>
            </Box>
          </Link>

          {/* Kotak 2 dengan Gambar dan Keterangan */}
          <Link to="/products/36">
            <Box
              width="200px"
              margin="20"
              rounded="lg"
              _hover={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transform: 'scale(1.05)',
              }}
              textAlign="center"
            >
              <Image
                src="https://sterncohen.com/wp-content/uploads/2023/03/Stock_Options_Guidance.png"
                alt="Deskripsi Gambar 2"
                objectFit="cover"
                width="100%"
                height="200px"
                rounded="lg"
              />
              <Text mt="2">Konfirmasi Pembayaran Iuran Bulanan</Text>
            </Box>
          </Link>
        </Box>
      )}
    </ChakraProvider>
  );
};

export default GamePage;

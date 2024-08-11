import {
  Button,
  Flex,
  Image,
  Text,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Import corrected
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const token = window.localStorage.getItem("token");
    return !!token;
  });
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  
  const getUser = () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLogin(true);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLogin(false);
        setUserId(null);
      }
    } else {
      setIsLogin(false);
      setUserId(null);
    }
  };

  useEffect(() => {
    getUser();
  }, [window.localStorage.getItem("token")]);

  const [showBorder, setShowBorder] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowBorder(scrollPosition > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      w="95%"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      paddingY="0.5rem"
      bg="gray.100"
      color="black"
      position="sticky"
      zIndex="5"
      top={0}
      borderBottom={showBorder ? "none" : "1px solid black"}
      transition="border-bottom 0.3s ease-in-out"
    >
      <Link to="/">
        <Flex
          align="center"
          mr={5}
          cursor="pointer"
          _hover={{ color: "gray" }}
          transition="color 0.2s ease-in-out"
        >
          <Image src="/logo8.jpg" maxHeight={10} maxWidth={10} />
          <Text fontSize="xl" fontWeight="bold" fontStyle="oblique" align="right">
            RT8Connect
          </Text>
        </Flex>
      </Link>
      <HStack>
        {/* Menambahkan menu untuk ke home */}
        <Link to="/home">
          <Button margin={1}>Home</Button>
        </Link>
        {/* Menambahkan menu untuk layanan */}
        <Link to="/gamepage">
          <Button margin={1}>Pelayanan Administrasi Warga</Button>
        </Link>
        <Link to="/review">
          <Button margin={1}>Saran & Layanan</Button>
        </Link>
        {/* Menambahkan menu untuk about us */}
        <Link to="/about">
          <Button margin={1}>About Us</Button>
        </Link>
        {isLogin && userId && (
          <Menu>
            <MenuButton
              as={Avatar}
              size="sm"
              bg="gray.800"
              _hover={{ opacity: "50%" }}
            ></MenuButton>
            <MenuList>
              <MenuItem as={Link} to={`/user/${userId}`}>
                Biodata
              </MenuItem>
              <MenuItem as={Link} to="/order-history">
                Riwayat Iuran Bulanan
              </MenuItem>
              <MenuItem as={Link} to="/surkethistory">
                Riwayat Pembuatan Surat Keterangan
              </MenuItem>
              <MenuItem as={Link} to="/pesan">
                Messages
              </MenuItem>
              <MenuItem
                onClick={() => {
                  window.localStorage.removeItem("token");
                  setIsLogin(false);
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
        {!isLogin && (
          <Link to="/login">
            
          </Link>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;

"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "/firebase";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  Grid,
  useTheme
} from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  setDoc
} from "firebase/firestore";
import Brightness4 from "@mui/icons-material/Brightness4";
import Brightness7 from "@mui/icons-material/Brightness7";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import {
  Create,        
  Book,           
  Apple,           
  Kitchen,         
  Medication,
  Lightbulb,       
  CleaningServices,
  LocalDining,     
  Devices,         
  LocalLaundryService, 
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const itemIcons = {
  Pens: Create,
  Fruits: Apple,
  Notebook: Book,
  Meds: Medication,
  Supplies: CleaningServices,
  Kitchenware: Kitchen,
  Bulbs: Lightbulb,
  Plates: LocalDining,
  Laundry: LocalLaundryService,
  Laptop: Devices,
  // Add more mappings as needed
};

const defaultIcon = "/assets/bamboo.png"; // Fallback image for unknown items

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 3,
  p: 3,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const theme = useTheme(); 

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        position: 'relative',
        backgroundColor: darkMode ? "#121212" : "#f5f5f5",
        backgroundImage: darkMode 
          ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/bgi.jpg')` 
          : `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/assets/bg.jpg')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Header */}
      <Box
        width="100%"
        padding={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
          boxShadow: 2,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Image src="/assets/panda.png" alt="PandaStock Logo" width={75} height={70} />
          <Typography variant="body" fontSize="2.5rem" fontWeight={600} ml={2} color={darkMode ? "#ffffff" : "#000000"}>
            PandaStock
          </Typography>
        </Box>
        {/* Dark/Light Mode Toggle */}
        <IconButton
          onClick={() => setDarkMode(!darkMode)}
          sx={{
            color: darkMode ? '#fff' : '#000',
          }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>

      {/* About Section */}
      <Box
        width="80%"
        maxWidth="900px"
        mt={4}
        mb={8}
        p={3}
        borderRadius={1}
        textAlign="center"
        
      >
        {/* Title */}
        <Typography
          variant="body"
          fontSize="3rem"
          fontWeight={500}
          color={darkMode ? "#ffffff" : "#000000"}
          display="block"   // Ensures it starts on a new line
          gutterBottom      // Adds bottom margin for spacing
        >
          Welcome to PandaStock!
        </Typography>
        
        {/* Description */}
        <Typography
          variant="body"
          fontSize="1.3rem"
          color={darkMode ? "#ffffff" : "#000000"}
          display="block" 
        >
          PandaStock is a cute, panda-themed personal inventory management system built with React.js, Material-UI, and Firebase. Our platform helps you effortlessly keep track of your belongings at home, combining functionality with a playful touch of panda charm. Whether you’re organizing household items, monitoring supplies, or keeping tabs on your favorite things, PandaNest is here to make home inventory management easy and enjoyable!
        </Typography>
      </Box>

      {/* Modal for Adding Items */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" color={darkMode ? "#ffffff" : "#000000"}>
            Add Item
          </Typography>
          <Stack direction="row" spacing={2} width="100%">
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              InputProps={{ style: { color: darkMode ? "#ffffff" : "#000000" } }}
              InputLabelProps={{ style: { color: darkMode ? "#ffffff" : "#000000" } }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      {/* Add New Item Button */}
      <Button
        variant="contained"
        sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: darkMode ? '#ffffff' : '#000000',
          color: darkMode ? '#000000' : '#ffffff',
          boxShadow: 3,
          position: 'fixed',
          bottom: 30,
          right: 30,
          '&:hover': {
            backgroundColor: darkMode ? '#ddd' : '#333',
          },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Button>

      {/* Inventory Items */}
      <Box width="80%" maxWidth="1200px" mt={4} textAlign="center">
        <Typography variant="body"
          fontSize="3rem"
          fontWeight={500}
          color={darkMode ? "#ffffff" : "#000000"}
          display="block"  
          gutterBottom      
          >
          Bamboo Stalks
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {inventory.map(({ name, quantity }) => {
            // Determine icon to use
            const Icon = itemIcons[name.toLowerCase()] || defaultIcon;
            const isPNG = typeof Icon === "string"; 
            return (
              <Grid item xs={2.4} key={name}>
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: 250,
                    height: 250,
                    p: 2,
                    borderRadius: 2,
                    bgcolor: darkMode ? "#333333" : "#ffffff",
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid",
                    borderColor: darkMode ? "#444444" : "#dddddd",
                    textAlign: "center",
                  }}
                >
                  {/* Item Icon */}
                  <Box sx={{ mb: 2 }}>
                    {isPNG ? (
                      <Image
                        src={Icon}
                        alt={`${name} icon`}
                        width={80}
                        height={80}
                        style={{
                          filter: darkMode ? "invert(1) brightness(2)" : "none",
                        }}
                      />
                    ) : (
                      <Icon sx={{ fontSize: 60, color: darkMode ? "#ffffff" : "#000000" }} />
                    )}
                  </Box>
                  <Typography variant="h6" mt={2} color={darkMode ? "#ffffff" : "#000000"}>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography variant="body1" color={darkMode ? "#cccccc" : "#555555"}>
                    Quantity: {quantity}
                  </Typography>
                  <Stack direction="row" spacing={2} mt={2}>
                    <IconButton
                      onClick={() => addItem(name)}
                      sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                    >
                      <AddCircleOutline />
                    </IconButton>
                    <IconButton
                      onClick={() => removeItem(name)}
                      sx={{ color: darkMode ? "#ffffff" : "#000000" }}
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

import Button from '@mui/material/Button'
import { Grid } from '@mui/material'
import { Routes, Route, Link } from "react-router-dom";

import ViewArtPage from './pages/ViewArtPage'
import AddArtPage from './pages/AddArtPage'
import LoginPage from './pages/LoginPage'
function App() {
  return (
    <>
        <Grid container justifyContent="center" columns={12}>
        <Routes>
          <Route path="/" element={<LoginPage />} /> 
          <Route path="/view/:uuid" element={<ViewArtPage />} />
          <Route path="/add" element={<AddArtPage />} />
        </Routes>
        </Grid>
    </>
  );
}

export default App;

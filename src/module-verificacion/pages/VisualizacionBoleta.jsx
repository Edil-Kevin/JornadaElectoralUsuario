import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SearchIcon from '@mui/icons-material/Search';
import ReactPaginate from 'react-paginate';

import {
  Box,
  Button, Grid, LinearProgress, TextField, Typography
} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import { Container } from "@mui/system";
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { BotonBack } from "../components/botonback";
import { BreadCrumbsCustom } from "../components/BreadCrumbsCustom";
import { useVerficacionStore } from '../hooks/useVerificacionStore';
import '../styles/style.css';

  export const VisualizacionBoleta = () => {
    const navigate = useNavigate();

    const [searchBoleta, setSearchBoleta] = useState('');
    const params = useParams();
    const { jornadasFolio } = useVerficacionStore();
    const jornadaEncontrar = jornadasFolio.find(jornada => jornada.jornadaModel.idJornada === params.id);
    
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    
    const handlePageChange = ({ selected }) => {
      setCurrentPage(selected);
    };
    
    const [boletasFiltradas, setBoletasFiltradas] = useState(jornadaEncontrar.boletas);
    
    useEffect(() => {
      const filtered = jornadaEncontrar.boletas.filter((boleta) =>
        boleta.idBoleta.toLowerCase().includes(searchBoleta.toLowerCase())
      );
      setBoletasFiltradas(filtered);
      setCurrentPage(0);
    }, [searchBoleta, jornadaEncontrar]);
    
    const paginatedBoletas = useMemo(() => {
      const startIndex = currentPage * itemsPerPage;
      return boletasFiltradas.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, boletasFiltradas]);
    
    const handleSearchChange = event => {
      const value = event.target.value.toLowerCase();
      setSearchBoleta(value);
    };
    
  	const plantilla1 = (idBoleta) => {
      navigate("/verificacion/visualizacion/boleta/"+params.id+"/group/"+idBoleta);
    };

    if (status === "checking")
      return (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      );
    else
      return (
        <Box pt="1.5rem"     
          sx={{						
              height: "auto",
              flexGrow: 1,
              overflowY: { sx: "none", md: "auto" },
            }}>
        <Container
          maxWidth="md"
          sx={{
            boxShadow: 1,
            backgroundColor: "white",
            borderRadius: { xs: "1rem", md: "2rem" },
                      overflowY: "auto",
            p: "2rem",    
          }}
        >
              {/* Bradcrumbs */}
              <BreadCrumbsCustom
						routes={[
							{
								name: "VERIFICACIÓN",
								url: "/verificacion",
							},
              {
								name: "JORNADAS ELECTORALES",
								url: "/verificacion/visualizacion",
							},
						]}
						currentRoute="BOLETAS"
					></BreadCrumbsCustom>
          {/* Bradcrumbs */}
          {jornadaEncontrar.boletas.length > 0 ? (
            <>
            <Typography
              color="initial"
              mb="1rem"
              align="center"
              sx={{
                fontSize: {
                  xs: "1.3rem",
                  sm: "1.4rem",
                  md: "1.6rem",
                  lg: "1.8rem",
                  xl: "1.8rem",
                },
              }}
            >
              A CONTINUACIÓN SE MUESTRAN LAS BOLETAS DE {jornadaEncontrar.jornadaModel.nombreJornada}
            </Typography>
            <Box 
              ml={{											
                  xs: 2,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
              }} 
              mr={{											
                  xs: 2,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
              }} 
              sx={{ 
                  display: 'flex', 
                  justifyContent:'flex-end' }}>
                  <TextField
                      id="input-with-icon-textfield"
                      label="Ingrese el nombre de la boleta a buscar"
                      sx={{ width: {
                          xs: "100%",
                          sm: "100%",
                          md: "50%",
                          lg: "40%",
                          xl: "40%",
                      } }}
                      size="normal"
                      placeholder="Ejemplo: Electoral..."
                      onChange={(e) => setSearchBoleta(e.target.value)}
                      InputProps={{
                          endAdornment: (
                          <InputAdornment position="end">
                              <SearchIcon/>
                          </InputAdornment>
                      ),
                      }}
                      variant="standard"
                  />
              </Box>
              <Box ml={1} mr={1} mt={4} mb={1}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  {paginatedBoletas.map((boleta, index) => (
                    <Grid item xs={4} sm={4} md={6} key={index}>
                      <Card
                        sx={{ minWidth: 247 }}
                        onClick={() => plantilla1(boleta.idBoleta)}
                        style={{
                          backgroundColor: "#5438849e",
                          color: "#FFFFFF",
                        }}
                      >
                        <CardContent>
                          <Typography sx={{ fontSize: 16, opacity: 1 }} color="text" gutterBottom>
                          BOLETA PERTENECIENTE A LA JORNADA:
                          </Typography>
                          <Typography sx={{ fontSize: 14, opacity: 0.8 }} color="yellow" gutterBottom>
                           {jornadaEncontrar.jornadaModel.nombreJornada}
                          </Typography>
                          <Typography variant="h7" component="div">
                            ID DE LA BOLETA:
                          </Typography>
                          <Typography variant="h6" component="div">
                            {boleta.idBoleta}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            onClick={() => plantilla1(boleta.idBoleta)}
                            sx={{
                              color: "#364691",
                              "&:hover": {},
                            }}
                            size="large"
                            endIcon={<ArrowOutwardIcon />}
                          >
                            Detalles
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        pageCount={Math.ceil(boletasFiltradas.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
                </Box>
                </>
                ):
                (
                        <>
                    <Typography style={{ textAlign: "center", fontWeight: "bold", fontSize: 18, color: "#ff0000" }}>
                        No se encontraron sentidos en la boleta por el momento, intente más tarde.
                    </Typography>

                     <BotonBack url="/verificacion/visualizacion"/>
                         </>
                    
                )}
    </Container>
	</Box>
      );
  };
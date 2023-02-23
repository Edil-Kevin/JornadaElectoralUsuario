import BallotIcon from '@mui/icons-material/Ballot';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// ----------- Bradcrumbs ----------
// import { experimentalStyled as styled } from '@mui/material/styles';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import HomeIcon from '@mui/icons-material/Home';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import { emphasize, styled } from '@mui/material/styles';
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  }); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591
  
// ----------- Bradcrumbs ----------

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const rows = [
    { id: 1, lastName: 'JORNADA NO F ELECTORAL 2021'},
    { id: 2, lastName: 'JORNADA NO F ELECTORAL 2022'},
    { id: 3, lastName: 'JORNADA NO F ELECTORAL 2023'},
    { id: 4, lastName: 'JORNADA NO F ELECTORAL 2024'},
    { id: 5, lastName: 'JORNADA NO F ELECTORAL 2025'},
    { id: 6, lastName: 'JORNADA NO F ELECTORAL 2026'}, 
    { id: 7, lastName: 'JORNADA NO F ELECTORAL GOBERNADOR ORDINARIA 2021'},
    { id: 8, lastName: 'JORNADA NO F ELECTORAL GOBERNADOR ORDINARIA 2022'}, 
    { id: 9, lastName: 'JORNADA NO F ELECTORAL GOBERNADOR ORDINARIA 2023'},
  ];

export const JornadasNoFormales = () => {
	const navigate = useNavigate();
	const plantilla1 = () => {
		navigate("/verificacion/visualizacionnf/boletanf");
	};
    const [searchJornada, setSearchJornada] = useState('');
	return (
        // En este Box esta el espacio entre el AppBar y el contenido
		<Box pt="1.5rem"     
        sx={{						
            height: "auto",
            flexGrow: 1,
            overflowY: { sx: "none", md: "auto" },
          }}>
			<Container
				// maxWidth="md"
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
                    <Box align="center" display="flex" justifyContent="center" mb={2}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <StyledBreadcrumb
                            component="a"
                            href="/verificacion"
                            label="Verificación"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                            icon={<AllInboxIcon fontSize="small" />}
                            label="Jornadas" 
                            />
                        </Breadcrumbs>
                        </Box>
                {/* Bradcrumbs */}
					<Typography
						color="initial"
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
                        A continuación se muestran las jornadas no formales de votación activa
					</Typography>
                    <Box 
                    mt={1}
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
                            label="Ingrese el nombre de la jornada a buscar"
                            sx={{ width: {
                                xs: "100%",
                                sm: "100%",
                                md: "50%",
                                lg: "45%",
                                xl: "45%",
                            } }}
                            size="normal"
                            placeholder="Ejemplo: Jornada..."
                            onChange={(e) => setSearchJornada(e.target.value)}
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
                <Box ml={1} mr={1} mt={4} mb={1} align="center" display="flex" justifyContent="center">
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {rows.filter((jornada) => jornada.lastName.toLowerCase().includes(searchJornada)
                    || jornada.lastName.toUpperCase().includes(searchJornada)
                    ).map((jornada) => (
                    <Grid item xs={4} sm={4} md={4} key={jornada.id}>
                        <Card 
                        sx={{ minWidth: 247 }} 
                        onClick={plantilla1}
                        style={{ 
                          // border: "1px solid #D0D0D0", 
                          // background: "#373637"
                          backgroundColor: "#373736",
                      }} >
                          <CardContent>

                            <Typography variant="h6" component="div" color="white">
                            {jornada.lastName}	
                            </Typography>
                          </CardContent>
                          <CardActions >
                            <Box  align="center" display="flex" justifyContent="center" width="100%" mb={1}>
                            <Button 
                                onClick={plantilla1}
                                startIcon = {<BallotIcon />}
                                sx={{
									// backgroundColor: "#eba302",
                                    backgroundColor: {
                                        xs: "#373736",
                                        sm: "#373736",
                                        md: "#eba302",
                                        lg: "#eba302",
                                        xl: "#eba302",
                                    },
									// color: "#fff",
                                    color:{
                                        xs: "#f0b91a",
                                        sm: "#f0b91a",
                                        md: "#fff",
                                        lg: "#fff",
                                        xl: "#fff",
                                    },
                                    fontSize: {
                                        xs: "1rem",
                                        sm: "1rem",
                                        md: "1rem",
                                        lg: "0.9rem",
                                        xl: "0.95rem",
									},
									textAlign: "center",
                                    width: {
                                        xs: "90%",
                                        sm: "85%",
                                        md: "85%",
                                        lg: "80%",
                                        xl: "87%",
                                    },
									"&:hover": {
										background: "linear-gradient(45deg, #fecd0d 30%, #f0b91a 90%)",
                                        color: "#FFFFFF",
									},
								}}>
                                Verificar boletas
                                </Button>
                                </Box>
                          
                          </CardActions>
                        </Card>

                            </Grid>
                            ))}
                        </Grid>
                </Box>
			</Container>
		</Box>
	);
};

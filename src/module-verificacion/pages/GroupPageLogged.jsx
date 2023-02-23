import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, Typography } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// ----------- Bradcrumbs ----------
// import { experimentalStyled as styled } from '@mui/material/styles';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import BallotIcon from '@mui/icons-material/Ballot';
import Groups2Icon from '@mui/icons-material/Groups2';
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
  
  const rows = [
    { id: 1, folio:'JE22-ORD-GHR41S', sentido: 'Matias Oropeza Oropeza '},
    { id: 2, folio:'JE22-ORD-GHR42S', sentido: 'Isidoro Arriaga Arriaga'},
    { id: 3, folio:'JE22-ORD-GHR43S', sentido: 'Octaviano Cristobal'},
    { id: 4, folio:'JE22-ORD-GHR44S', sentido: 'Gerard Hermilo Buenrostro'},
    { id: 5, folio:'JE22-ORD-GHR45S', sentido: 'Paola Gaspar Hurtado'},
    { id: 6, folio:'JE22-ORD-GHR46S', sentido: 'Melissa Librado Rojas'}, 
    { id: 7, folio:'JE22-ORD-GHR47S', sentido: 'Karime Nereida Pardo'},
    { id: 8, folio:'JE22-ORD-GHR48S', sentido: 'Elizabeth Cristian Balam'}, 
    { id: 9, folio:'JE22-ORD-GHR49S', sentido: 'Nahomi Elvia Vilchis'},
    { id: 10, folio:'JE22-ORD-GHR411S', sentido: 'Matias Oropeza Oropeza '},
    { id: 11, folio:'JE22-ORD-GHR412S', sentido: 'Isidoro Arriaga Arriaga'},
    { id: 12, folio:'JE22-ORD-GHR413S', sentido: 'Octaviano Cristobal'},
    { id: 13, folio:'JE22-ORD-GHR414S', sentido: 'Gerard Hermilo Buenrostro'},
    { id: 14, folio:'JE22-ORD-GHR415S', sentido: 'Paola Gaspar Hurtado'},
    { id: 15, folio:'JE22-ORD-GHR416S', sentido: 'Melissa Librado Rojas'}, 
    { id: 16, folio:'JE22-ORD-GHR417S', sentido: 'Karime Nereida Pardo'},
    { id: 17, folio:'JE22-ORD-GHR418S', sentido: 'Elizabeth Cristian Balam'}, 
    { id: 18, folio:'JE22-ORD-GHR419S', sentido: 'Nahomi Elvia Vilchis'},
  ];

export const GroupPageLogged = () => {
	const navigate = useNavigate();
  const [searchJornada, setSearchJornada] = useState('');
	const onCancel = () => {
		navigate("/verificacion/visualizacionnf/boletanf");
	};
	return (
		<Box pt="1.5rem" 
    align="center" display="flex" justifyContent="center" 
    sx={{						
      height: "auto",
      flexGrow: 1,
      overflowY: { sx: "none", md: "auto" },
    }}
      >
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
                <Box align="center" display="flex" justifyContent="center" mb={2}>
					            <Breadcrumbs aria-label="breadcrumb" maxItems={2}>
                            <StyledBreadcrumb
                            component="a"
                            href="/verificacion"
                            label="Verificación"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                            component="a"
                            href="/verificacion/visualizacionnf"
                            icon={<AllInboxIcon fontSize="small" />}
                            label="Jornadas" 
                            />
							              <StyledBreadcrumb 
                            component="a"
                            href="/verificacion/visualizacionnf/boletanf"
                            icon={<BallotIcon fontSize="small" />}
                            label="Boletas" 
                            />
                            <StyledBreadcrumb
                            label="Folios"
                            icon={<Groups2Icon fontSize="small" />}
                            />
                        </Breadcrumbs>
                      </Box>
                {/* Bradcrumbs */}
                <Typography
                  color="initial"
                  mb="1rem"
                  align="center"
                  sx={{
                        fontSize: {
                          xs: "1.2rem",
                          sm: "1.3rem",
                          md: "1.4rem",
                          lg: "1.5rem",
                          xl: "1.5rem",
                      },
                      }}
                    >
                       Folios y sus sentidos de acuerdo a la boleta *name de la boleta*
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
                        md: 10,
                        lg: 10,
                        xl: 10,
                    }} 
                    mb={3}
                    sx={{ 
                        display: 'flex', 
                        justifyContent:'flex-end' }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Ingrese el nombre o folio"
                            sx={{ width: {
                                xs: "100%",
                                sm: "100%",
                                md: "50%",
                                lg: "40%",
                                xl: "40%",
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
                    <Box 
                      sx={{ width: {
                          xl: "70%",
                          lg: "70%",
                          md: "70%",
                          sm: "85%",
                          xs: "100%",
							            },
                          boxShadow: 5,
                          }}>
          <TableContainer component={Paper} >
            <Table aria-label="simple table">
              <TableHead style={{background: "#783a9cad", color: "white"}}>
                <TableRow >
                  <TableCell 
                  align="center" 
                  style={{color: "#EEEBDF", 
                    fontSize: "1.2rem",
                                }} >FOLIOS</TableCell>
                  <TableCell align="center" style={{color: "#EEEBDF", fontSize: "1.2rem",
                                }}>SENTIDOS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{background: "#d0afd3db"}}>
              {rows.filter((jornada) => jornada.folio.toLowerCase().includes(searchJornada)
                            || jornada.folio.toUpperCase().includes(searchJornada)
                            || jornada.sentido.toLowerCase().includes(searchJornada)
                            || jornada.sentido.toUpperCase().includes(searchJornada)
                            ).map((jornada) => (
                  <TableRow 
                    key={jornada.folio}
                  > 
                    <TableCell  style={{ width: "30%", color:"BLACK", fontSize:"1.05rem"}}>
                    {jornada.folio}</TableCell>
                    <TableCell style={{ width: "60%", color:"BLACK", fontSize:"1.05rem"}}>{jornada.sentido}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
			</Container>
		</Box>
	);
};

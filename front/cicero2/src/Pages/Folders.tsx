/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import Box from "@mui/material/Box";
import SideBar from '../Components/SideBar';
import { Container, FormControl, Grid, IconButton, InputLabel, ListItem, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import Header from '../Components/Header';
import SearchIcon from '@mui/icons-material/Search';
import './Folders.css';
import { getElementError } from '@testing-library/react';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { height, margin } from '@mui/system';
import { Link } from 'react-router-dom';


export default function Folders(){

    const [SelectChoice, setSelectChoice] = React.useState('Afficher affaires en cours et clôturées');
    const [filter, setFilter] = useState("");

    const elements = [
        {'id':1, 'folder':23, 'employee':'Jacques', 'clôturé' : 'en cours'},
        {'id':2, 'folder':123, 'employee':'Michel', 'clôturé' : 'en cours'},
        {'id':3, 'folder':44, 'employee':'René', 'clôturé' : 'en cours'},
        {'id':4, 'folder':11, 'employee':'Pierre', 'clôturé' : 'clôturée'},
    ]

    function handleChangeSelect(event:any){
        setSelectChoice(event.target.value)
    }


    const FormStyle = {
        minWidth:200
    }

    const MainStyle = {
        justifyContent : 'flex-end'
    }

    const handleSearchChange = (e:any) => {
        setFilter(e.target.value);
      };

    const searchContainer = {
        display: "flex",
        //backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    };
    const searchIcon = {
        alignSelf: "flex-end",
    marginBottom: "5px",
    };

    const searchInput = {
        width: "160px",
        margin: "5px",
    };

    const StyleAll = {
        width : '100%'
    }

    const styletable = {
        border:'2px solid black',
    
         margin:'0 auto',
         marginTop:5,
        //padding:4,
        maxWidth: '75%',
    }

    const StyleCell = {
       boder:'1px solid grey',
       height:40
    }

    const getElement = (id:number) => {

        console.log(SelectChoice.toLowerCase() + ' | ' + elements[id].clôturé.toLowerCase())

        if (elements[id].employee.toLowerCase().includes(filter.toLowerCase()) && SelectChoice.toLowerCase().includes(elements[id].clôturé.toLowerCase())) {

            return (
                <TableRow key={id}>
                    <TableCell component="th" scope="row" align="center" width={'15%'} >{elements[id].id}</TableCell>
                    <TableCell align="center" width={'15%'} sx={StyleCell}>{elements[id].clôturé}</TableCell>
                    <TableCell align="center" sx={StyleCell}>{elements[id].employee}</TableCell>
                    <TableCell align="center" width={'15%'} sx={StyleCell}>
                        
                    <Link to={'/modify'}>
                        
                       <NoteAltIcon />
                    </Link>
                        <DeleteIcon/>                    
                    </TableCell>
                </TableRow>
                // <ListItem key={id}>
                //     {elements[id].employee}
                //     {elements[id].clôturé}
                // </ListItem>
    
            )
        }

        
    }

    return (

    <Grid sx={StyleAll}>
        <Header/>
        <Box sx={{ display: 'flex', minWidth: 700 }}>
            <SideBar />
            <main className='main'>

                <Box maxWidth="lg" sx={MainStyle}>
                    <Grid sx={{ display: 'flex', justifyContent:'space-between', marginTop:5}}>
                        <h3>Dossiers</h3>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                            <FormControl fullWidth sx={FormStyle}>
                                <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={SelectChoice}
                                    label="Trier par"
                                    onChange={handleChangeSelect}
                                >
                                    <MenuItem value={'Afficher affaires en cours et clôturées'}>Afficher affaires en cours et clôturées</MenuItem>
                                    <MenuItem value={'En cours'}>En cours</MenuItem>
                                    <MenuItem value={'Clôturées'}>Clôturées</MenuItem>
                                </Select>
                            </FormControl>


                            <Toolbar>
                                <Box sx={searchContainer}>
                                    <SearchIcon sx={searchIcon} />
                                    <TextField
                                    sx={searchInput}
                                    onChange={handleSearchChange}
                                    label="Recherche"
                                    variant="standard"
                                    />
                                </Box>
                            </Toolbar>
                        </Box>
                    </Grid>
                </Box>
            
                    <Table aria-label="customized table" sx={styletable}>
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Code</TableCell>
                            <TableCell align="center">Statut</TableCell>
                            <TableCell align="center">Clients</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(elements).map(                        
                                (id:any) => getElement(id)
                            )}
                        </TableBody>

                    </Table>
            </main>
        </Box>
    </Grid>
    );
} 
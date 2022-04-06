import { Grid } from '@mui/material';
import logo from '../assets/img/cicero_logo.png';

const styleHeader = {
    background: '#000000',
    color: '#fff',
};
const styleLogo = {
    width: '10%',
    fit: 'contain',
    maxHeight: '60px',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '20px',
};

export default function Header(){
    return (
        <Grid item xs={12} md={12} style={{ height: '10%'}} sx={styleHeader}>
            <img src={logo} alt="logo" style={styleLogo}/>
        </Grid>
    );
} 
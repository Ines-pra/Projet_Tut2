import { Stack } from '@mui/material';
import { height } from '@mui/system';
import logo from '../assets/img/cicero_logo.png';

const styleHeader = {
    background: '#000000',
    color: '#fff',
    width: '100%',
    height: '70px',
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
        <Stack sx={styleHeader}>
            <img src={logo} alt="logo" style={styleLogo}/>
        </Stack>
    );
} 
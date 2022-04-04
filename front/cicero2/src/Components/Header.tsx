import { Stack } from '@mui/material';

const styleHeader = {
    background: '#535454',
    color: '#fff',
    width: '100%',
};

export default function Header(){
    return (
        <Stack sx={styleHeader}>
            <img src="https://www.cicero.fr/sites/default/files/styles/logo_cicero_large/public/logo_cicero_large.png?itok=QZ-_jZ-_" alt="logo" />
        </Stack>
    );
} 
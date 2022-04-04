import { Stack } from '@mui/material';

const styleHeader = {
    background: '#535454',
    color: '#fff',
    width: '100%',
};

export default function Header(){
    return (
        <Stack sx={styleHeader}>
            <h1>HEADER</h1>
        </Stack>
    );
} 
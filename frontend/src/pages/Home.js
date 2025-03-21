import { Container, Typography, Paper } from '@mui/material';
import DesenvolvedoresChart from '../components/Home/DesenvolvedoresChart';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Desenvolvedores por Nível
      </Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
        <DesenvolvedoresChart />
      </Paper>
    </Container>
  );
}

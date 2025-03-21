import { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';

export default function DesenvolvedoresChart() {
  const [data, setData] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem('token');

    axios.get('http://localhost:8000/api/desenvolvedores-por-nivel', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(response => setData(response.data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, []);

  if (data.length === 0) return <p>Carregando...</p>;

  return (
    <BarChart
      series={[
        { data: data.map(d => d.masculino), label: 'Homens', color: '#3f51b5' },
        { data: data.map(d => d.feminino), label: 'Mulheres', color: '#e91e63' },
      ]}
      height={300}
      xAxis={[{ data: data.map(d => d.nivel), scaleType: 'band' }]}
      margin={{ top: 20, bottom: 40, left: 50, right: 10 }}
    />
  );
}

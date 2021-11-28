import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import axios from 'axios';


import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const ContenedorMain = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: left;
`;
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {

  //State
  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCripto = async() => {
      //evitar ejecución en la primera vez
      if (moneda === '') return;
      
      //consultar api
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      //mostrar spinner
      setCargando(true);
      //ocultar spinner y mostrar resultado
      setTimeout(() => {
        setCargando(false);
        setResultado(resultado.data.DISPLAY[cripto][moneda]);
      }, 3000);
    }
    cotizarCripto();
  }, [moneda, cripto])

  //Mostrar Spinner o resultado
  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>

  return (
    <ContenedorMain>
        <Contenedor>
        <div>
          <Imagen
            src={imagen}
            alt="imagen crypto"
          />
        </div>
        <div>
          <Heading>Cotizador de Criptomonedas</Heading>
          <Formulario
            setMoneda={setMoneda}
            setCripto={setCripto}
          />
        </div>
      </Contenedor>
      {componente}
    </ContenedorMain>
  );
}

export default App;

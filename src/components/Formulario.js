import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

import Error from './Error';

//custom hook
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({setMoneda, setCripto}) => {

    //State de las crypto
    const [crypto, setCrypto] = useState([]);
    const [error, setError] = useState(false);


    const monedas = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ]

    //useMoneda
    const [moneda, SelecionMoneda] = useMoneda('Elige tu moneda', '', monedas);

    //useCryptoMoneda
    const [cryptoMoneda, SelectCrypto] = useCriptomoneda('Elige tu criptomoneda', '', crypto);

    //Ejecutar llamado al API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setCrypto(resultado.data.Data)
        }
        consultarAPI();
    }, [])

    //Cuando se da submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar
        if (moneda === '' || cryptoMoneda === '') {
            setError(true);
            return;
        }
        //pasar datos al componente principal
        setError(false);
        setMoneda(moneda)
        setCripto(cryptoMoneda)
    }

    return (
        <form onSubmit={cotizarMoneda}>

            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            
            <SelecionMoneda />

            <SelectCrypto />

            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    )
}
Formulario.propTypes ={
    setMoneda: PropTypes.func.isRequired,
    setCripto: PropTypes.func.isRequired
}

export default Formulario


import { Container, Row, Col, InputGroup, InputGroupText, Input } from 'reactstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PokeTarjeta from '../Componentes/PokeTarjeta';
import { PaginationControl } from 'react-bootstrap-pagination-control';


const Index = () => {
    const [pokemones, setPokemones] = useState([]);
    const [busqueda, setBusqueda] = useState([]);
    const [listado, setListado] = useState([]);
    const [filtro, setFilro] = useState('');
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(12);
    const [total, setTotal] = useState(0);
    

    useEffect( () =>{
        getPokemones(offset)
        getBusqueda()
        
    },[])

    const getPokemones = async(o) => {
        const liga = 'https://pokeapi.co/api/v2/pokemon?limit='+limit+'&offset='+o;
        axios.get(liga).then( async(response) => {
            const respuesta = response.data;
            setPokemones(respuesta.results);
            setListado(respuesta.results);
           setTotal(respuesta.count);

        } )
    }

    const getBusqueda = async(o) => {
        const liga = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
        axios.get(liga).then( async(response) => {
            const respuesta = response.data;
            setBusqueda(respuesta.results);
           

        } )
    }

   const buscar = async(e) => {
    if(e.keyCode == 13) {
        if(filtro.trim() != '') {
            setListado([]);
            setTimeout( () => {
                setListado(busqueda.filter(p => p.name.includes(filtro)))
            }, 100 )
        }
    } else if(filtro.trim() == '') {
        setListado([]);
        setTimeout( () => {
            setListado(pokemones);
        },100 );
    }
   }

   const goPage = async(p) => {
    setListado([]);
    await getPokemones( (p==1) ? 0 : ((p-1)*12) );
    setOffset(p);
   }

    return (
        <Container className='shadow gb-danger mt-3'>
            <Row>
                <Col xs='12'>
                <InputGroup className='mt-3 mb-3'>
                <InputGroupText><i  className="fa-solid fa-search"></i></InputGroupText>
                <Input value={filtro} onChange={(e) => {setFilro(e.target.value)}} onKeyUpCapture={buscar} placeholder="Buscar"></Input>
                </InputGroup>
                </Col>
            </Row>
            <Row className="mt-3">
                { listado.map( (pok,i) => (
                    
                    <PokeTarjeta poke={pok} key={i}></PokeTarjeta>
                ) ) }
                { listado.length == 0 ?
                <Col className='text-center fs-2 mb-3'>No Existe</Col> : '' }
                <PaginationControl last={true} limit={limit} total={total}
                page={offset} changePage={page =>goPage(page)}></PaginationControl>
            </Row>

        </Container>
    );
};

export default Index;
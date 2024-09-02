import { useState, useEffect } from "react";
import axios from 'axios';
import { Col, Card, CardBody, CardFooter, CardImg, Badge} from 'reactstrap';

import { Link } from "react-router-dom";


const PokeTarjeta = (params) => {
    const [pokemon, setPokemon] = useState([]);
    const [imagen, setImagen] = useState('');
    const [cardClass, setCardClass] = useState('d-none');
    const [loadClass, setLoadClass] = useState('');

    useEffect( () => {
        getPokemon()
        },[]);

        const getPokemon = async() => {
            const liga = params.poke.url;
        axios.get(liga).then( async(response) => {
            const respuesta = response.data;
            setPokemon(respuesta);
            if (respuesta.sprites.other.dream_world.front_default != null) {
                setImagen(respuesta.sprites.other.dream_world.front_default);
            } else {
                setImagen(respuesta.sprites.other['official-artwork'].front_default);
            }
            setCardClass('');
            setLoadClass('d-none')

        } )

    }

   
    return (
       
            <Col sm='5' lg='3' className='mb-3'>
                 
                <Card className={'shadow border-4 border-warning' +cardClass}>
                    <CardImg src={imagen} height='150' className='p-2'></CardImg>
                    <CardBody className='text-center'>
                        <Badge  pill color='primary'>Nro  {pokemon.id}</Badge>
                        <label  className='fs-5 text-capitalize'>{pokemon.name}</label>
                        </CardBody>
                        <CardFooter className='bg-warning'>
                            <Link to={'/pokemon/'+pokemon.name} className='btn btn-dark'>
                            <i className='fa-solid fa-arrow-up-right-from-square'></i> Detalle
                            </Link>
                        </CardFooter>
                </Card>
                <Card >
                
                </Card> 
            
            </Col>

       
    );
};

export default PokeTarjeta;
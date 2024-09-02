import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardBody, CardText, Badge, Progress } from "reactstrap";
import axios from "axios";
import PokeTarjeta from "../Componentes/PokeTarjeta";




const Detalle = () => {
const {id} =useParams();
const [pokemon, setPokemon] = useState([]);
const [especie, setEspecie] = useState([]);
const [habitat, setHabitat] = useState('Desconocido');
const [descripcion, setDescripcion] = useState([]);
const [imagen, setImagen] = useState([]);
const [tipos, setTipos] = useState([]);
const [estadisticas, setEstadisticas] = useState([]);
const [evoluciones, setEvoluciones] = useState([]);
const [listaEevoluciones, setListaEvoluciones] = useState([]);
const [cardClass, setCardClass] = useState('d-none');
const [loadClass, setLoadClass] = useState('');
const [habilidades, setHabilidades] = useState([]);

useEffect( () => {
    getPokemon()
    },[id])

const getPokemon = async() => {
    const liga = 'https://pokeapi.co/api/v2/pokemon/'+id;
    axios.get(liga).then(async(response) => {
        const respuesta = response.data;
        setPokemon(respuesta);
        if (respuesta.sprites.other.dream_world.front_default != null) {
            setImagen(respuesta.sprites.other.dream_world.front_default);
        } else {
            setImagen(respuesta.sprites.other['official-artwork'].front_default);
        }
        await getTipos(respuesta.types);
        await getEspecie(respuesta.species.name);
        await getHabilidades(respuesta.abilities);
        await getEstadisticas(respuesta.stats);
        setCardClass('');
        setLoadClass('d-none')
    })
  }

  const getEstadisticas = async(es) => {
    let listaEstadistica = [];
    es.forEach( (h) => {
        axios.get(h.stat.url).then( async(response) =>{
            listaEstadistica.push({'nombre': response.data.names[5].name, 'valor':h.base_stat});
            setEstadisticas(listaEstadistica)
        } )
    } )
  }

  const getHabilidades = async(hab) => {
    let listaHabilidades = [];
    hab.forEach( (h) => {
        axios.get(h.ability.url).then( async(response) =>{
            listaHabilidades.push(response.data.names[5].name);
            setHabilidades(listaHabilidades);
        } )
    } )
  }

  const getTipos = async(tip) => {
    let listaTipos = [];
    tip.forEach( (t) => {
        axios.get(t.type.url).then( async(response) =>{
            listaTipos.push(response.data.names[5].name);
            setTipos(listaTipos);
        } )
    } )
  }

  const getEspecie = async(esp) => {
    const liga = 'https://pokeapi.co/api/v2/pokemon-species/'+esp;
    axios.get(liga).then(async(response) => {
        const respuesta = response.data;
        setEspecie(respuesta);
        if(respuesta.habitat != null) {
           await getHabitat(respuesta.habitat.url)
        }
        await getDescripcion(respuesta.flavor_text_entries);
        await getEvoluciones(respuesta.evolution_chain.url);
    })

  }

  const getEvoluciones = async(ev)=> {
        axios.get(ev).then(async(response) => {
            const respuesta = response.data;
            let lista = respuesta.chain.species.url.replace('-species', '')
            lista += procesaEvoluciones(respuesta.chain);
            setEvoluciones(lista);
            let apoyo = lista.split(' ');
            let list =[];
            apoyo.forEach(ap =>{
                if(ap != ''){
                    list.push({url:ap})
                }
            })
            setListaEvoluciones(list)
        })
    }

    const procesaEvoluciones = (info)=> {
            let res = ' ';
            if(info.evolves_to.length > 0) {
                res += info.evolves_to[0].species.url.replace('-species', '')
                return res+' '+procesaEvoluciones(info.evolves_to[0]);
            } else {
                return res;
            }
        }
  

  
  const getHabitat = async(hab)=> {
        axios.get(hab).then(async(response) => {
            setHabitat(response.data.names[1].name)
        })
  }

  const getDescripcion = async(desc) => {
        let texto = '';
        desc.forEach( (d)=> {
            if (d.language.name == 'es') {
                texto = d.flavor_text;
            }
            if(texto == '' && desc.length > 0) {
                texto = desc[0].flavor_text;
            }
        } )
        setDescripcion(texto);
  }



    return (
        <Container className='shadow gb-danger mt-6'>
            <Row>
                <Col>
                <Card className='shadow mt-3 mb-3'>
                    <CardBody  className='mt-12'>
                        <Row>
                            <Col className='text-end '>
                              <Link to='/' className='btn btn-primary'>
                              <i color="primary" className="fa-solid fa-home"></i> Inicio
                              </Link>

                            </Col>
                        </Row>
                        
                            <Row className={cardClass}>
                                <Col xs='12' md='6'>
                                    <CardText className='h1 text-capitalize'>{pokemon.name}</CardText>
                                    <CardText className='fs-5 text-start  '>{descripcion}</CardText>
                                    <CardText className='fs-4 text-start'>
                                        Altura: <b>{(pokemon.height)/10} m</b>
                                    
                                    </CardText>
                                    <CardText className='fs-4 text-start'>
                                        Peso: <b>{(pokemon.weight)/10} kg</b>
                                    </CardText>
                                    <CardText className='fs-4 text-start'>
                                        Tipo:&nbsp;  
                                         { tipos.map( (tip,i) => (
                                            <Badge pill className='me-1' color= 'primary' key={i}>
                                                {tip}

                                            </Badge>
                                        ) ) }
                                    </CardText>
                                    <CardText className='fs-4 text-start'>
                                        Habilidades:&nbsp;   
                                         { habilidades.map( (hab,i) => (
                                            <Badge pill className='me-1' color= 'dark' key={i}>
                                                {hab}

                                            </Badge>
                                        ) ) }
                                    </CardText>
                                    <CardText className='fs-4 text-capitalize text-start'>
                                        Habitat: <b>{(habitat)}</b>
                                    </CardText>
                                </Col>
                                <Col xs='12' md='6'>
                                        <img src={imagen} className='img-fluid'></img>
                                </Col>
                                <Col xs='12' md='12 mt-3' >
                                <CardText className='fs-4 text-center'><b>Estadisticas</b></CardText>
                                </Col>
                                {estadisticas.map( (es,i) => (
                                    <Row key={i}>
                                        <Col className='text-start' xs='6' md='3'><b>{es.nombre}</b></Col>
                                        <Col xs='6' md='9'>
                                        <Progress className='my-2' value={es.valor}>{es.valor}</Progress>
                                        </Col>
                                    </Row>
                                ) )}

                                <Col xs='12' md='12 mt-3'>
                                <CardText className='fs-4 text-center'><b>Evolución</b></CardText>
                                </Col>
                                { listaEevoluciones.map( (pok,i) => (
                                    <PokeTarjeta poke={pok} key={i}></PokeTarjeta>
                                ) ) }
                                
                            </Row>

                  </CardBody>

                </Card>
                </Col>
            </Row>
          

        </Container>
    )

}


export default Detalle;
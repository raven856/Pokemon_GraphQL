import React, { useEffect, useState } from 'react';
import { useLazyQuery} from '@apollo/client';
import { GET_BY_SPECIESID} from '../../GraphQL/Queries';
import { Input, Button, Space, Form, Card, message, Spin, Modal, } from 'antd';
import { GithubOutlined, InfoCircleTwoTone } from '@ant-design/icons'
const Home = () => {
    const [value, setValue] = useState('');
    const [showCard, setShowCard] = useState(false);
    const [pokemon, setPokemon] = useState(null);
    const [pokemonId, setPokemonId] = useState(143);
    const [getPokemonByPId, { data, loading, error }] = useLazyQuery(GET_BY_SPECIESID);

    useEffect(()=>{
        getPokemonByPId({ variables: { id: Number(pokemonId) } });
    },[])

    useEffect(()=>{
        if(data) {
            let newP = {};
            newP.name = capitalize(data.pokemon_v2_pokemonspecies[0].name);
            newP.sprite = JSON.parse(data.pokemon_v2_pokemonsprites[0].sprites).front_default
            if(data.pokemon_v2_pokemonspecies_aggregate.nodes[0]!= null){
                newP.habitat = data.pokemon_v2_pokemonspecies_aggregate.nodes[0].pokemon_v2_pokemonhabitat ? capitalize(data.pokemon_v2_pokemonspecies_aggregate.nodes[0].pokemon_v2_pokemonhabitat.name) : '???';
            }
            newP.captureRate = data.pokemon_v2_pokemonspecies[0].capture_rate;
            newP.abilities = [];
            for(let i = 0; i < 4; i++){
                newP.abilities.push('---')
            }
            let abilities = data.pokemon_v2_pokemon[0].pokemon_v2_pokemonabilities;
            let i = 0;
            for(let item of abilities){
                newP.abilities[i] = ((item.pokemon_v2_ability.name).toUpperCase());
                i++;
            }   
            newP.stats = {};
            let stats = data.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats;
            newP.stats.hp = stats[0].base_stat;
            newP.stats.attack = stats[1].base_stat;
            newP.stats.defense = stats[2].base_stat;
            newP.stats.speed = stats[5].base_stat;
            setPokemon(newP);
            setShowCard(true);
        }
    },[data]);
 
    const handleChange = (event) => {
        //only empty strings and numbers
        if (/(^$)|(^[0-9]+$)/.test(event.target.value)) {
            setValue(event.target.value);
          }
    };

    const handleSubmit = () => { 
        if(value != ''){
            if (Number(value) <= 890) {
                getPokemonByPId({ variables: { id: Number(value) } });
                setPokemonId(Number(value));
            } else {
                message.warning('Too high');
            }
        }
        
        setValue('');
    };

    const handleRandom = () => {
        let rand = (Math.floor(Math.random() * 890) + 1);
        console.log(rand);
        setPokemonId(rand);
        getPokemonByPId({ variables: { id: rand } });
        
        setValue('');
    };

    const capitalize = (str) => {
        if(typeof str === 'string') {
            return str.replace(/^\w/, c => c.toUpperCase());
        } else {
            return '';
        }
    };

    let cardStyle = { backgroundColor: 'PeachPuff', width: '300px', }, 
        graphqlStyle = { color: 'Green', fontWeight: 'bold', }, 
        reactStyle = { color: 'Red', fontWeight: 'bold', }, 
        antdStyle = { color: 'blue', fontWeight: 'bold', }

    const info = () => {
        Modal.info({
          title: 'By Ralph Venuto,',
          content: (
            <div>
           
                <p>This app fetches data using <a href='https://graphql.org/' style={graphqlStyle}>GraphQL</a>.</p>
                <p>Pokemon searched will be <span style={{fontWeight:'bold'}}>cached</span> and will not need another web request. You can see this by the <span style={{fontWeight:'bold'}}>spinner</span> that appears after a new search.</p>
                <p>I was already familiar with <span style={{fontWeight:'bold'}}>REST APIs</span>. So I decided to use <a href='https://graphql.org/' style={graphqlStyle}>GraphQL</a> as a learning experience.</p>
                <p>I build this in two days with no tutorial.</p>
                Technologies used: <a href='https://reactjs.org/' style={reactStyle}>ReactJS</a> | <a href='https://ant.design/' style={antdStyle}>AntD</a> | <a href='https://graphql.org/' style={graphqlStyle}>GraphQL</a>  
                <br/>
                <p>See my source code: <a href='https://github.com/raven856/Pokemon_GraphQL' style={{fontWeight: 'bold'}}>GitHub <GithubOutlined /> </a></p>
                Data source:
                <br/>
                <a href='https://pokeapi.co/'>https://pokeapi.co/</a>
                <br/>
                <a href='https://beta.pokeapi.co/graphql/console/'>https://beta.pokeapi.co/graphql/console/</a>
            </div>
          ),
          onOk() {},
        });
      };

    return (
        <>
            
            <div className='center'>            
                <h1>Pokemon API!</h1>      
                <Form layout="vertical">                  
                <p>Enter a Pokedex Id</p>    
                <Space>    
                    <Input
                            placeholder='Pokedex Id'
                            maxLength={3}
                            value={value}
                            onChange={handleChange}
                            style={{width: '100px'}}
                        />
                    <Button type="primary" onClick={handleSubmit}>Search!</Button>
                </Space>
                </Form>          
                <Button type="danger" onClick={handleRandom} style={{margin:"10px"}}>Random!</Button>
            </div>     

            <div className='card'>
                <Spin spinning={loading}>
                {(showCard && pokemon) &&
                    <Card
                        title={
                            <>
                        <span >{pokemon.name}</span><span style={{float:'right', fontWeight: 'normal'}}>Id: {pokemonId}</span>
                        <br/>
                        <img src={pokemon.sprite} style={{width:'100px',height:'100px'}}></img>
                        </>
                    }
                        style={cardStyle}
                        >
                        <p>Habitat: {pokemon.habitat}</p>
                        <p>Capture Rate: {pokemon.captureRate}</p>
                        <p>HP: {pokemon.stats.hp}</p>
                        <p>Attack: {pokemon.stats.attack}</p>
                        <p>Defense: {pokemon.stats.defense}</p>
                        <p>Speed: {pokemon.stats.speed}</p>
                        <p style={{textAlign:'center'}}>Abilities</p>
                        <div>
                            {<>
                            <p>
                                <span style={{marginLeft:'10px'}}>{pokemon.abilities[0]}</span>   <span style={{float:'right', marginRight:'10px'}}>{pokemon.abilities[1]}</span>
                            </p>
                            <p>
                                <span style={{marginLeft:'10px'}}>{pokemon.abilities[2]}</span>   <span style={{float:'right', marginRight:'10px'}}>{pokemon.abilities[3]}</span>
                            </p>
                            </>}
                        </div>
                        </Card>            
                }
                </Spin>
            </div>       
            <div className='center'> <Button type="default" onClick={info} style={{margin:'10px'}}><InfoCircleTwoTone />Click Here!</Button> </div>
                      
        </>
    )
}
export default Home;
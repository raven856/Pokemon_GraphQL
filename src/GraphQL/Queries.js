import {gql} from '@apollo/client';

export const GET_ALL = gql`
    query MyQuery {
        pokemon_v2_pokemonspeciesname(where: {language_id: {_eq: 8}}) {
        id
        name
        language_id
        pokemon_species_id
        }
    }
`;

// export const GET_BY_SPECIESID = gql`
//     query MyQuery {
//         pokemon_v2_pokemonspeciesname(where: {language_id: {_eq: 8}, pokemon_species_id: {_eq: 1}}) {
//         id
//         name
//         language_id
//         pokemon_species_id
//         }
//     }
// `;
export const GET_BY_SPECIESID = gql`
    query MyQuery($id: Int!) {
        pokemon_v2_pokemonspecies(where: {id: {_eq: $id}}) {
            name
            capture_rate
            id
          }
        pokemon_v2_pokemonsprites(where: {pokemon_id: {_eq: $id}}) {
            sprites
          }
        pokemon_v2_pokemonspecies_aggregate(where: {id: {_eq: $id}}) {
            nodes {
                pokemon_v2_pokemonhabitat {
                name
                }
            }
        }
        pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
            name
            pokemon_v2_pokemonabilities {
              ability_id
              pokemon_v2_ability {
                name
                pokemon_v2_abilityeffecttexts(where: {language_id: {_eq: $id}}) {
                  effect
                }
              }
            }
          }
        pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
            name
            pokemon_v2_pokemonstats {
                pokemon_v2_stat {
                name
                }
                base_stat
            }
        }
    }
`;
// export const GET_BY_SPECIESID = gql`
//     query MyQuery($id: Int!) {
//         pokemon_v2_pokemonspeciesname(where: {language_id: {_eq: 8}, pokemon_species_id: {_eq: $id}}) {
//         name
//         pokemon_species_id
//         }
//     }
// `;

// pokemon_v2_pokemonsprites(where: {pokemon_id: {_eq: 1}}) {
//     id
//     sprites
//     pokemon_id
//   }

// query MyQuery {
//     pokemon_v2_pokemonhabitat(where: {pokemon_v2_pokemonspecies: {pokemon_v2_pokemonspecies: {pokemon_v2_pokemonspeciesnames: {name: {_eq: "Venusaur"}}}}}) {
//       name
//     }
//   }
  
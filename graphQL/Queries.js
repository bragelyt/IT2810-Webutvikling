import { gql } from "apollo-boost";


/** Fetching lisgings at search**/
const GET_SEARCH_RESULTS = gql`
    query($neighbourhood: String!, $beds: Int!, $minimum_nights: Int!, $sorter: String!, $page: Int!){
        listings(neighbourhood: $neighbourhood,
            beds: $beds,
            minimum_nights: $minimum_nights,
            _page: $page,
            _sort:[$sorter]){
            id,
            picture_url,
            name,
            host_name,
            neighbourhood,
            bathrooms,
            beds,
            price,
            square_feet,
            minimum_nights
        }
    }`;


/** Search query constant**/
const GET_SINGLE_ITEM = gql`
query($id: ID!){
    listing(id: $id){
        id,
        name,
        host_name,
        city,
        bathrooms,
        square_feet,
        picture_url,
        neighbourhood,
        beds,
        price,
        minimum_nights,
        latitude,
        longitude,
        country,
        host_response_time,
        host_response_rate,
        host_is_superhost,
        host_identity_verified,
        host_picture_url,
        room_type,
        description,
    }
}`;



export { GET_SEARCH_RESULTS, GET_SINGLE_ITEM};
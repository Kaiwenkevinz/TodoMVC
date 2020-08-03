import { itemConstants } from '../_constants/item.constants';
import { tokenConfig } from './user.actions';
import { authHeader } from '../_helpers';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// const token = 

// const config = {
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Token ${token}`,
//     }
//   };

// GET ITEMS
export const getItems = () => (dispatch, getState) => {
    
    let url = `${API_URL}/api/todos/`;

    axios.get(url, authHeader())
        .then(res => {
            dispatch({
                type: itemConstants.GET_ITEMS,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

// // DELETE_ITEMS
// export const deleteItems = (id) => (dispatch, getState) => {
//     const url = `${API_URL}/api/items/${id}/`;
//     console.log("deleteitems")

//     axios.delete(url, tokenConfig(getState))
//         .then(res => {
//             dispatch(createMessage({
//                 deleteItem: 'Item deleted'
//             }));
//             dispatch({
//                 type: DELETE_ITEMS,
//                 payload: id
//             });
//         })
//         .catch(err => console.log(err));
// }

// // CREATE_ITEM
// export const createItem = (item) => (dispatch, getState) => {
//     let url = `${API_URL}/api/items/`;
//     axios.post(url, item, tokenConfig(getState))
//         .then(res => {
//             dispatch(createMessage({
//                 createItem: 'Item created'
//             }));
//             dispatch({
//                 type: CREATE_ITEM,
//                 payload: res.data
//             });
//         })
//         .catch(err => {
//             const errors = {
//                 msg: err.response.data,
//                 status: err.response.status
//             }
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: errors
//             })
//         });
// }

// // UPDATE_ITEM
// export const updateItem = (item) => (dispatch, getState) => {
//     let url = `${API_URL}/api/items/${item.id}/`;

//     axios.put(url, item, tokenConfig(getState))
//         .then(res => {
//             dispatch({
//                 type: UPDATE_ITEM,
//                 payload: res.data
//             });
//         })
//         .catch(err => console.log(err));
// }
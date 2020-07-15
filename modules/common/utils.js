import Axios from 'axios';
import {LIMIT} from './constants';

export const getAllImages = (page) => {
  return Axios({
    method: 'GET',
    url: `https://picsum.photos/v2/list?page=${page}&limit=${LIMIT}`,
  }).then((response) => {
    return response.data;
  });
};

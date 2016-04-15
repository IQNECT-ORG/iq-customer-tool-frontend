import { normalize, arrayOf } from 'normalizr';
import * as schemas from './schemas';

export const getBrands = async function() {
  try {
    let response = await fetch('https://iq.api/api/brand', {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    let brands = await response.json();
    return normalize(brands, arrayOf(schemas.brand));
  } catch(err) {
    throw err;
  }
};
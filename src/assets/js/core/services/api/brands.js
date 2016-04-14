
export const getBrands = async function() {
  try {
    let brands = await fetch('https://iq.api/api/brand');

    return brands;
  } catch(err) {
    throw err;
  }
};
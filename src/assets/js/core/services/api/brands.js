
export const getBrands = async function() {
  try {
    let brands = await fetch('https://www.example.com/');

    return brands;
  } catch(err) {
    throw err;
  }
};
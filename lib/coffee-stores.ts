import { MapboxType } from '@/types';

const getListOfCoffeeStorePhotos = async () => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query="coffee shop"&page=1&perPage=10&orientation=landscape`
    );
    const photos = await response.json();
    const results = photos?.results || [];
    return results?.map((result: { urls: any }) => result.urls['small']);
  } catch (error) {
    console.error('Error retrieving a photo', error);
  }
};

const transformCoffeeData = (
  idx: number,
  result: MapboxType,
  photos: Array<string>
) => {
  return {
    id: result.id,
    address: result.properties?.address || '',
    name: result.text,
    imgUrl: photos.length > 0 ? photos[idx] : '',
    // 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
  };
};

export const fetchCoffeeStores = async (longLat: string, limit: number) => {
  try {
  const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?limit=${limit}&proximity=${longLat}&access_token=${process.env.MAPBOX_API}`);
  const data = await response.json();
  const photos = await getListOfCoffeeStorePhotos();

  return data?.features?.map((result: MapboxType, idx: number) => 
    transformCoffeeData(idx, result, photos) || []);
  } catch (error) {
    console.error('Error while fetching coffee stores', error);
    return [];
  }
};

// Esto no me va, es v6 de MapBox
// https://api.mapbox.com/search/geocode/v6/forward?q=coffee&limit=6&proximity=-79.74821107381995%2C43.96440273715606&access_token=${process.env.MAPBOX_API}

// Esto como en el curso y funciona bien, es v5 de MapBox
// https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?limit=6&proximity=-79.74821107381995%2C43.96440273715606&access_token=${process.env.MAPBOX_API}


export const fetchCoffeeStore = async (id: string, queryId: string) => {
  try {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${id}.json?proximity=ip&access_token=${process.env.MAPBOX_API}`);
    const data = await response.json();
    const photos = await getListOfCoffeeStorePhotos();
    const coffeeStore = data?.features?.map((result: MapboxType, idx: number) => 
      transformCoffeeData(parseInt(queryId), result, photos) || []);

    return coffeeStore.length > 0 ? coffeeStore[0] : {};
    } catch (error) {
      console.error('Error while fetching coffee stores', error);
      return {};
    }
};

// Esto no me va, es v6 de MapBox
// https://api.mapbox.com/search/geocode/v6/forward?q=poi.584115602705&proximity=ip&access_token=pk.eyJ1IjoicXVhbnR1bWNvZGVhaSIsImEiOiJjbHp3eWw5cm8wcXQ1MnRzaXFjY2g5Y2syIn0.G4gh4dLIi3ZrHGzkzaQweg
// https://api.mapbox.com/search/geocode/v6/forward?q=poi.584115602705&proximity=ip&access_token=${process.env.MAPBOX_API}

// Esto como en el curso y funciona bien, es v5 de MapBox
// https://api.mapbox.com/geocoding/v5/mapbox.places/poi.584115602705.json?proximity=ip&access_token=${process.env.MAPBOX_API}







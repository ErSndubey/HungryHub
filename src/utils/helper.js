import { ResData_API_URL } from "../config";

//Filter function
export const filterData = (searchText, restaurants) => {
  if (!searchText) {
    return restaurants;
  }
  return restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
  );
};

//getRestaurant function

export const getRestaurants = async (
  setRestaurants,
  setFilteredRestaurants
) => {
  try {
    const data = await fetch(ResData_API_URL);
    if (!data.ok) {
      throw new Error("Network response was not ok.");
    }

    const json = await data.json();
    console.log(json);
    // Detect if the user is accessing from a mobile device (including Android)
    const isMobileDevice = window.innerWidth <= 768; // Adjust the width as needed for your design

    // Choose the appropriate index based on the device type
    const restaurantsIndex = isMobileDevice ? 3 : 2;

    setRestaurants(
      json?.data?.cards[restaurantsIndex]?.card?.card?.gridElements
        ?.infoWithStyle?.restaurants
    );

    setFilteredRestaurants(
      json?.data?.cards[restaurantsIndex]?.card?.card?.gridElements
        ?.infoWithStyle?.restaurants
    );

    return [setRestaurants, setFilteredRestaurants];
  } catch (error) {
    console.error(
      "An error occurred while fetching or processing data:",
      error
    );
  }
};

//handle search
export const handleSearch = (
  setFilteredRestaurants,
  searchText,
  restaurants,
  setErrorMessage
) => {
  // Filter data function call
  const filteredData = filterData(searchText, restaurants);
  setFilteredRestaurants(filteredData);
  if (filteredData.length === 0) {
    setErrorMessage(`Sorry, we couldn't find any results for "${searchText}"`);
  } else {
    setErrorMessage("");
  }
};

//cart quantity control buttons

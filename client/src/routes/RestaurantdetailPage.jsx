import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'


const RestaurantdetailPage = () => {
  const { id } = useParams()
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await RestaurantFinder.get(`/${id}`)
        setSelectedRestaurant(response.data.data.restaurants)
      }
      fetchData()
    } catch (err) {

    }
    
  }, [])
  return (
    <div>{selectedRestaurant && selectedRestaurant.name}</div>
  )
}

export default RestaurantdetailPage
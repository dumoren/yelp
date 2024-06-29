import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext'
import RestaurantFinder from '../apis/RestaurantFinder'
import { useNavigate } from 'react-router-dom'


const UpdateRestaurant = (props) => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {restaurants} = useContext(RestaurantsContext)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("")

  useEffect(() => {
    const fetchData = async() => {
      const response = await RestaurantFinder.get(`/${id}`)
      console.log(response.data.data)
      setName(response.data.data.restaurants.name)
      setLocation(response.data.data.restaurants.location)
      setPriceRange(response.data.data.restaurants.price_range)
    }

    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange
    })
    navigate("/")

  }

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input value = {name} onChange = {(e) => {
            setName(e.target.value)
          }} id = "name" type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input value = {location} onChange = {(e) => {
            setLocation(e.target.value)
          }} id = "location" type="text" className="form-control" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="price_range">Price Ranges</label>
          <input value = {priceRange} onChange = {(e) => {
            setPriceRange(e.target.value)
          }} id = "price_range" type="number" className="form-control" />
        </div>
        <button type = "submit" className='btn btn-primary' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
   
  )
}

export default UpdateRestaurant

require('dotenv').config()

const express = require("express")
const db = require("./db")
const cors = require('cors')


const app = express()
app.use(cors())
app.use(express.json())

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("select * from restaurants")
    res.json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows
      }
      
    })
  } catch (err) {
    console.log(err);
  }

})

//get a restaurant

app.get("/api/v1/restaurants/:id", async (req, res) => {
  const id = req.params.id
  try {
    const result = await db.query(`SELECT * FROM restaurants where id=$1`, [id])
    res.status(200).json({
      status: "success",
      data: {
        restaurants: result.rows[0]
      }
    })
  } catch (err) {
      console.log(err);
  }
  
})


//create a restaurant 

app.post("/api/v1/restaurants", async (req, res) => {


  try {
    const results = await db.query("INSERT INTO restaurants (name, location, price_range) values($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }

    })
  } catch (err) {

  }
  
  
})

//update restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
    // console.log(req.body);

    try {
      const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id])
      res.status(200).json({
        status: "success",
        data: {
          restaurant: results.rows[0]
        }
  
      })
    } catch (err) {
      console.log(err);
    }
    
})

//delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants where id = $1", [req.params.id])
    res.status(200).json({
      status: "success"
    })
  } catch(err) {
    console.log(err);
  }
  
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
})

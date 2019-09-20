import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'


function App() {

  const [listUser, setListUser] = useState([])
  const [loadData, setLoadData] = useState(10)

  const getData = () => {
    axios.get("https://randomuser.me/api/?results=100")
      .then(res =>
        setListUser(res.data.results)
      )
  }

  const getMoreData = (scroll, scrollWidth, width) => {
    scrollWidth - scroll === width && setLoadData(loadData + 10)
  }

  const sortByCity = () => {
    let sortedData = listUser.sort((a, b) => {
      if(a.location.city < b.location.city) { return -1; }
      if(a.location.city > b.location.city) { return 1; }
      return 0;
    })
    setListUser([])
    setTimeout(() => {
      setListUser(sortedData)
    }, 50);
  }

  const sortByColor = () => {
    let sortedData = listUser.sort((a, b) => {
      return a.dob.age - b.dob.age;
    })
    setListUser([])
    setTimeout(() => {
      setListUser(sortedData)
    }, 50);
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className="App">
      <div className="header">
        <h2>Qoala Test</h2>
        <button className="btn btn-color" onClick={() => sortByColor()}>Color</button>
        <button className="btn btn-city" onClick={() => sortByCity()}>Cities</button>
      </div>
      <div className="body"  onScroll={(e) => getMoreData(e.currentTarget.scrollLeft, e.currentTarget.scrollWidth, e.currentTarget.clientWidth)}>
        {
          listUser.slice(0, loadData).map((val, index) => {
            return (
              <div key={index} className="card" style={ val.dob.age < 21 ? {background: "lightsalmon"} : (val.dob.age > 21 && val.dob.age < 56) ? {background: "lightgreen"} : {background: "lightblue"} }>
                <div className="user-info-container">
                  <img src={val.picture.large} />
                  <p>{val.name.title + " " + val.name.first + " " + val.name.last}</p>
                  <p>{val.dob.age}</p>
                </div>
                <p>{val.location.city} {val.location.state} {val.location.postcode}</p>
                <p>{val.email}</p>
                <p>{val.registered.date}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
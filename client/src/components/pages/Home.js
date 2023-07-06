import React from "react"
import HomeData from "../utils/HomeData"
import HomeData2 from "../utils/HomeData2"
import HomeData3 from "../utils/HomeData3"
// import { useLocation } from "react-router-dom"

function Home() {
  // const [currentUser, setCurrentUser] = useState(null)
  // const [hasUser, setHasUser] = useState(false)
  // const location = useLocation()
  // useEffect(() => {
  //   const user = location.state?.user
  //   console.log(user)
  //   user ? setCurrentUser(user) : setCurrentUser(null)
  //   user ? setHasUser(true) : setHasUser(false)
  // })
  return (
    <div className="home-padding">
      <div>{<HomeData />}</div>
      <div>{<HomeData2 />}</div>
      <div>{<HomeData3 />}</div>
    </div>
  )
}

export default Home

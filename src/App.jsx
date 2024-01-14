import { useState , useEffect } from "react"
import axios from "axios"
import { useParams, Link, useLocation, Route, Routes} from "react-router-dom"


function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
 

  useEffect(() => {
    const fetchUsers = async () => {
      const {data} = await axios.get('https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users')
      setUsers(data)
    }
  fetchUsers()
  }, [])

  useEffect (() => {
    const fetchPosts = async () => {
      const {data} = await axios.get(`https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/posts`)
      setPosts(data)
    }
    fetchPosts()
  }, [])

  const Home = () => {
    return(
      <div>
        <h1>Welcome!</h1>
      </div> 
      )
  }

  const Users = ({users}) => {
    return(
      <div>
        <h1>Users</h1>
        <ul>
          {
            users.map((user) => {
              return(
                <li key={user.id}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  const SingleUser = ({users}) => {
    const params = useParams()
    const id = params.id*1

    const user = users.find((user) => {
        return user.id === id
    })
    
    if(!user){
        return null
    }

    return(
        <div>
            <h1>{user.name}</h1>
            <ul>
              <li>Username: {user.username}</li>
              <li>Email; {user.email}</li>
              <li>Phone: {user.phone}</li>
              <li>Website: {user.website}</li>
            </ul>
            <Link to='/users'>
                Back to all Users
            </Link>
        </div>
    )
}

  const Posts = () => {
    return(
      <div>
        <h1>Posts</h1>
        <ul>
          {
            posts.map((post) => {
              return(
                <li key={post.id}>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  const SinglePost = ({posts}) => {
    const params = useParams()
    const id = params.id*1

    const post = posts.find((post) => {
        return post.id === id
    })

    if(!post){
        return null
    }

    return(
        <div>
            <h1>{post.title}</h1>
            <Link to='/posts'>
                Back to all Posts
            </Link>
        </div>
    )

}


  return (
    <>
    <div>
       <nav>
        <Link to='/'>Home</Link>
        <Link to='/users'>Users - {users.length}</Link>
        <Link to='/posts'>Posts - {posts.length}</Link>
       </nav> 

       <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/users'element={<Users users={users}/>} ></Route>
          <Route path='/users/:id' element={<SingleUser users={users}/>}/>
          <Route path='/posts' element={<Posts posts={posts}/>}></Route>
          <Route path='/posts/:id' element={<SinglePost posts={posts}/>}/>
       </Routes>
      
       
    </div>
     
    </>
  )
}

export default App

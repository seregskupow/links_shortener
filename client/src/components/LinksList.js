import React,{useContext,useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'

export const LinksList = ({ links }) => {
  const {loading, request, error, clearError} = useHttp()
  const {token} = useContext(AuthContext);
  const [dispLinks,setLinks] = useState([]);
  useEffect(() => {
    setLinks(links);
  }, [links])
  if (!dispLinks.length) {
    return <p className="center">No links yet...</p>
  }
  const handleDelete = async (id)=>{
    try{
     let response= await request('/api/link/delete','POST',{id},{
      Authorization: `Bearer ${token}`
    })
    setLinks(dispLinks=>dispLinks.filter(item=>item._id!==id));
      window.M.toast({html:response.msg});
    }catch(e){window.M.toast({html:"Something went wrong"}) }
    
  }
  
  return (
    <div className="" style={{maxHeight:"850px",overflow:'auto',marginTop:"80px"}}>
    <table>
      <thead>
      <tr style={{borderColor:"#9e579d"}}>
        <th>№</th>
        <th>Original link</th>
        <th>Short link</th>
        <th>Open the link</th>
        <th>Delete the link</th>
      </tr>
      </thead>

      <tbody>
      { dispLinks && dispLinks.map((link, index) => {
        return (
          <tr className="t-row" style={{borderColor:"#252d3f"}} key={link._id}>
            <td>{index + 1}</td>
            <td style={{maxWidth:"150px",wordWrap:"break-word"}}>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Open</Link>
            </td>
            <td>
            <a class="waves-effect waves-light btn red accent-2" onClick={()=>handleDelete(link._id)}>Delete</a>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
    </div>
  )
}

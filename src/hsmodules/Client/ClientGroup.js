import React,{useState} from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

export default function ClientGroup({list,closeModal,choosen,dupl,reg,depen}) {
    const [selectedClient, setSelectedClient]=useState("") 
    const handleRow= async(Client)=>{
        await setSelectedClient(Client)
        const    newClientModule={
            selectedClient:Client,
            show :'detail'
        }
       // choosen(Client)
        closeModal()

      // await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
    }

    return ( 
        <div>
             <div className="table-container pullup  vscrola"  id="scrollableDiv">
               {/*  <InfiniteScroll
                        dataLength={facilities.length}
                        next={getFacilities}
                        hasMore={total>facilities.length}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                    > */}
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth  ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Last Name">Last Name</abbr></th>
                                        <th>First Name</th>
                                        <th><abbr title="Middle Name">Middle Name</abbr></th>
                                       <th><abbr title="Age">Age</abbr></th>
                                        <th><abbr title="Gender">Gender</abbr></th> 
                                        <th><abbr title="Phone">Phone</abbr></th>
                                        <th><abbr title="Email">Email</abbr></th>
                                        {/* <th><abbr title="Tags">Tags</abbr></th> */}
                                        <th><abbr title="Actions">Actions</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {list.map((Client, i)=>(

                                            <tr key={Client._id} onClick={()=>handleRow(Client)}  className={Client._id===(selectedClient?._id||null)?"is-selected":""}>
                                            <td>{i+1}</td>
                                            <th>{Client.lastname}</th>
                                            <td>{Client.firstname}</td>
                                            <td>{Client.middlename}</td>
                                           <td>{Client.dob && <>{formatDistanceToNowStrict(new Date(Client.dob))}</>}</td>
                                            <td>{Client.gender}</td>
                                             <td>{Client.phone}</td>
                                            <td>{Client.email}</td>
                                           {/*  <td>{Client.clientTags}</td> */}
                                            <td><button className="button selectadd" onClick={()=>dupl(Client)}>Duplicate</button><button className="button selectadd" onClick={()=>reg(Client)}>Register</button><button className="button selectadd" onClick={()=>depen(Client)}>Dependent</button></td>
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                   {/*  </InfiniteScroll> */}
              </div>                      
        </div>
    )
}

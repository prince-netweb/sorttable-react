import React, { useState } from 'react'
import { data } from "./Data"
import { useSearchParams } from 'react-router-dom'
import { AiOutlineArrowDown } from "react-icons/ai";
import { BiUpArrowAlt } from "react-icons/bi";
import "./Home.css"
const Home = () => {
    const [ param, setparam ] = useSearchParams()

    const [ user, setuser ] = useState( data )
    const [ active, setactive ] = useState( "asc" )
    const [ direction, setDirection ] = useState( () => param.get( "direction" ) );
    const data1 = param.get( "direction" )
    const username = param.get( "name" )
    const namehandle = ( column, direction ) => {
        if ( active === "asc" ) {

            setparam( { name: column, direction: "asc" } )
            setactive( "des" )
        } else if ( active === "des" ) {
            setparam( { name: column, direction: "des" } )
            setactive( "int" )
        } else if ( active === "int" ) {
            setparam( { name: column, direction: "int" } )
            setactive( "asc" )
        }

    }

    const asc =  username &&[ ...user ].sort( ( a, b ) => a[username].localeCompare( b[username] ) )

    const des = username&&[ ...user ].sort( ( a, b ) => b[username].localeCompare( a[username] ) )
 

    let filterdata = data1 === 'asc' ? asc : data1 === "des" ? des : data1 === "int" ? user : user;

    return (
        <div>
            <h2 style={ {  width:"300px" ,margin: "auto"  } }>Colored Table Header</h2>

            <table>
                <thead>
                    <tr>
                    <th onClick={ () => namehandle( 'name', "asc" ) }>name  <span> { username==="name" && active==="asc" ?<AiOutlineArrowDown/>: username==="name" && active ==="int"?<AiOutlineArrowDown/>:<BiUpArrowAlt/>}</span></th>
                        <th onClick={ () => namehandle( 'dial_code', "asc" ) }>dial_code <span className='down'> {active==="asc" && username==="dial_code"  ?<AiOutlineArrowDown/>:active ==="int" &&  username==="dial_code"?<AiOutlineArrowDown/>:<BiUpArrowAlt/>}</span></th>
                        <th onClick={ () => namehandle( 'code', "asc" ) }>code <span className='down'> {active==="asc" && username==="code" ?<AiOutlineArrowDown/>:active ==="int" && username==="code"?<AiOutlineArrowDown/>:<BiUpArrowAlt/>}</span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterdata.map( ( item ) => (
                            <tr key={ item.name }>
                                <td>{ item.name }</td>
                                <td>{ item.dial_code }</td>
                                <td>{ item.code }</td>
                            </tr>
                        ) )
                    }
                </tbody>


            </table>




        </div>
    )
}

export default Home
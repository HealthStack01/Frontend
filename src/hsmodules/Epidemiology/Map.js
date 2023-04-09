// import React,{useState,useContext,useEffect} from 'react'
// import { MapContainer, TileLayer, useMap, Marker, Popup, GeoJSON } from 'react-leaflet'
// import L  from 'leaflet';
// import icon from 'leaflet/dist/images/marker-icon.png';
// import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// /* import *  as hospData from "../../data/nigeriahealthfacilities.json" */

// import 'leaflet/dist/leaflet.css'
// let DefaultIcon = L.icon({
//     iconUrl: icon,
//     shadowUrl: iconShadow
// });
// const data = require("../../data/nigeriahealthfacilities.json");
// /*
// let iconImage =L.icon({
//     iconUrl: icon,
// }) */
// //const fetcher=(...args)=>fetch(..args).then(response=>resp.json())
// //inside component
// //const url = "link"
// //const {data, error}=useSwr(url,{fetcher})

// //const hosp=data && !error?data.slice(0,100)
// L.Marker.prototype.options.icon =DefaultIcon;

// export default function Map() {
//     const [position, setPosition]=useState([9.0820,8.6753])
//     const [position2, setPosition2]=useState([7.418090,3.905210])
//     const [zoom, setZoom]=useState(5)
//     const [scrollwh, setScrollWl]=useState(false)
//     const hpdata=data.features.slice(0,100)

// useEffect(() => {

//    navigator.geolocation.getCurrentPosition((position)=>{
//       console.log(position)
//       setPosition2([ position.coords.latitude, position.coords.longitude  ])
//   })
//   //console.log(hospData.features.length)

//   return () => {
//    // setPosition([9.081999,8.675277])
//   }
// }, [])

//   return (
//     <div>
//         <MapContainer className="map" center={position}  zoom={zoom} scrollWheelZoom={scrollwh}>
//         <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <GeoJSON data={hpdata}/>
//       {/*  <Marker position={position} >
//             <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//         </Marker>  */}
//         </MapContainer>

//     </div>
//   )
// }

import React, {useEffect, useState, useContext,  useRef} from "react";
import "leaflet/dist/leaflet.css";
import "./style.css";
import {UserContext, ObjectContext} from "../../context";
import client from "../../feathers";
import {useMap, MapContainer, TileLayer, Marker,Popup } from "react-leaflet";

import { Icon } from "leaflet"; 

/* import L from "leaflet"; */


/* import MarkerClusterGroup from 'react-leaflet-cluster' */

/* import "leaflet.markercluster"; */

/* import icon from "leaflet/dist/images/marker-icon.png"; */
/* import iconShadow from "leaflet/dist/images/marker-shadow.png"; */


/* let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon; */

const data = require("./nigeriahealthfacilities.json");
const epidalerts=""

function Mapper() {
  const hpdata = data.features.slice(0, 100);

  const map = useMap();

  const hospGeoJson = new L.GeoJSON(hpdata, {
    onEachFeature: (feature = {}, layer) => {
      const {properties = {}} = feature;
      const {name} = properties;

      if (!name) return;

      layer.bindPopup(`<p>${name}</p>`);
    },
  });

  hospGeoJson.addTo(map);

  // const markersBar = L.markerClusterGroup();

  // markersBar.addLayer(hospGeoJson);

  // map.addLayer(markersBar);
}

export default function Map() {
  const StoreServ = client.service("epidalerts");
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext); //,setUser
  const points=useRef([])

  const getFacilities = async () => {
    setLoading(true);
 
      const findStore = await StoreServ.find({
        query: {
          /*  $limit:20, */
          $sort: {
            createdAt: -1,
          },
        },
      });
      await setFacilities(findStore.data);
      points.current=findStore.data
      setLoading(false);
     
  }
  useEffect(() => {
  
      getFacilities();
   
    StoreServ.on("created", obj => getFacilities());
    StoreServ.on("updated", obj => getFacilities());
    StoreServ.on("patched", obj => getFacilities());
    StoreServ.on("removed", obj => getFacilities());
    return () => {

    };
  }, []);
  const customIcon = new Icon({
    iconUrl:require ("leaflet/dist/images/marker-icon.png"),
    iconSize:[35,35],
    iconAnchor:[1,4],
    popupAnchor:[0,5]
  })

//[9.082, 8.6753]
  return (
    <>
    {/* {
      points.current.map((site,i)=>(
        <div key={1}>
        location: [{site.geolocation.coordinates[0]},{site.geolocation.coordinates[1]}]
        </div>
      ))
    } */}
    <div id="map" style={{height: "100vh"}}>
      <MapContainer center={ [state.coordinates.latitude, state.coordinates.longitude] } zoom={13} >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Mapper /> */}
     {/*  [mark.geolocation.coordinates] */}
     {
      points.current.map((site,i)=>(

        site.geolocation.coordinates[0]&&     
        <Marker  key={i}  position={[site.geolocation.coordinates[0],site.geolocation.coordinates[1]]} icon={customIcon} >
             <Popup>
                <div>
                  <b>Facility Name:</b>{site.location}, {site.facility}</div>
                  <div>  <b>Status:</b> {site.status} </div>
                  <div> { site.match.length>0 && 
                 <> <b>Disease:</b> 
                  
                  {site.match.map((diag,i)=>(
                      <div key={i}>
                          {diag}
                      </div>
                    ))
                  } </>  }</div>
                <div>  <b>Action:</b> {site.action}
                </div>
             </Popup>
          </Marker>
 ))}
      </MapContainer>
    </div>   
    </>    
  );
}

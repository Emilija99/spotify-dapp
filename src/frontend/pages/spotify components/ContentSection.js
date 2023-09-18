import React from "react";
import "./ContentSection.scss";
import { useNavigate } from "react-router-dom";
import Card from './Card.js';
import SectionHeader from './SectionHeader.js';
import Image1 from '../../images/music.png'
import {ethers} from 'ethers'
//import { artistsArrayToString } from "@utils";

const ContentSection = ({ title = "empty", data = [], type = "album" }) => {
  console.log(data)
  const mockData1=[{id:0,name:"Some song 0",artist:"Rihanna",image:{Image1}},
  {id:1,name:"Some song 1",artist:"Rihanna",image:{Image1}},
  {id:2,name:"Some song 2",artist:"Rihanna",image:{Image1}},
  {id:3,name:"Some song 3",artist:"Rihanna",image:{Image1}},
  {id:4,name:"Some song 4",artist:"Rihanna",image:{Image1}},
  {id:5,name:"Some song 5",artist:"Rihanna",image:{Image1}},
  {id:6,name:"Some song 6",artist:"Rihanna",image:{Image1}},
  {id:8,name:"Some song 7",artist:"Rihanna",image:{Image1}},
  {id:9,name:"Some song 7",artist:"Rihanna",image:{Image1}},
  {id:10,name:"Some song 7",artist:"Rihanna",image:{Image1}},];
  const navigate=useNavigate()
  
  return (
    <section className="home-section">
    
      
      <div className="grid-cards">
        {type === "album" &&
          data.map((song) => (
            <div onClick={()=>{console.log('cao');navigate(song.link,{state:song})}}>
            <Card
            
            key={song.itemId}
            title={song.name}
            subtitle={song.artistName}
            subtitleLink="#"
            image={song.image}
            price={ethers.utils.formatEther(song.price)}
            
          />
          </div>
          ))}

        {type === "artist" &&
          data.map((artist) => (
            <Card
              className="grid-item"
              key={artist.id}
              title={artist.name}
              subtitle={"Artist"}
              image={artist?.images[1]?.url}
              imageRounded={true}
            />
          ))}
      </div>
    </section>
  );
};

export default ContentSection;
import React from 'react'
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase"
import { enterRoom } from "../features/appSlice";
function SidebarOption({Icon,title, addChannelOption,id}) {
  const [channels, loading, error]= useCollection(db.collection("rooms"));

  const dispatch = useDispatch();

    const addChannel=() => {
       const channelName = prompt("Please enter channel name:");

       if(channelName){
        db.collection("rooms").add({
            name: channelName,
        });
       }

    };

    const selectChannel =() => {
     if(id){
         dispatch(
             enterRoom({
             roomId: id,
         })
         );
     }

    };
    return <SidebarOptionContainer
    onClick={addChannelOption?addChannel:selectChannel}>
        {Icon && <Icon fontSize='small' style={{padding:10}}/> }
        {Icon ? ( 
        <h3>{title}</h3>):
        (<SidebarOptionChannel>
        <span>#</span>{title}
        </SidebarOptionChannel>)}
    </SidebarOptionContainer>;


}
export default SidebarOption;

const SidebarOptionContainer =styled.div`
display:flex;
font-size:12px;
padding-left:2px;
align-items:center;
cursor:pointer;
:hover{
    opacity:0.6;
    background-color: #340e36;
    color:white;

    >h3{
        font-weight:500;
    }

    >h3>span{
        padding:15px;
    }
}`;
const SidebarOptionChannel =styled.h3`

padding:10px 0;
font-weight:500;
margin-left:2rem;
`;

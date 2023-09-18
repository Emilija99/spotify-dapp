import React,{useState} from 'react'
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useStore } from '../store/StoreContext';
import { getIncomeEvents } from '../contract scripts/eventQueries';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import './Earnings.scss'
import './Artist.scss'
function Earnings() {
  const [events,setEvents]=useState([])
  const {marketContract,account,signer,isArtist,artist}=useStore()
  const [loaded,setLoaded]=useState(false)
  const fee=isArtist?artist.fee:0;
  const loadEvents=async()=>{
        const eventss=await getIncomeEvents(marketContract,account,signer);
        console.log(eventss)
        setEvents(eventss)
        setLoaded(true)
  }
  const convertTimestampToString=(timestamp)=>{
    const date=new Date(timestamp*1000);
    const string=`Date: ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return string
  }
  const customStyles={
    headCells:{
      style:{
        backgroundColor:'#88B04B',
        fontWeight:'bolder'
      }
    },
	rows:{
		style:{
			padding:'5px',
			border:'0px solid red',
			margin:'0px !important'
		}
	},
	cells:{
		style:{
			border:'none'
		}
	},
	table:{
		style:{
			marginTop:'30px'
		}
	}
  }
  const conditionalRowStyles=[
  {
	  when:row=>row.type==='resale',
	  style:{
		  backgroundColor:'#EFC050',
		  border:'1px solid #EFC050'
	  }
  },
   {
	  when:row=>row.type==='purchase',
	  style:{
		  backgroundColor:'#B565A7',
		  border:'1px solid #B565A7'
	  }
  }
  ]
  
  const columns=[{
    name:'Event',
    cell:row=>(<div>{row.type==='resale'?'Your art was sold so  you received your artist fee':'Your token was purchased by another user'
  }</div>)},{
    name:'Time of transaction',
    selector:row=>convertTimestampToString(row.timestamp)
  },{
    name:'Amount of ETH you earned',
    selector:row=>row.type==='resale'?`$${ethers.utils.formatEther(fee)}ETH`:`$${ethers.utils.formatEther(row.value)}ETH`
  },{
    name:'Transaction',
    cell:row=>(
        <Link to={`https://sepolia.etherscan.io/tx/${row.transactionHash}`} target='_blank'>{row.transactionHash}</Link>
    )
  },
  {
    name:'Link to token involved',
    cell:row=>(
        <Link to={`/artist/${row.artist}/${row.tokenId}`} >NFT token</Link>
    )
  }
]
  useEffect(()=>{
    !loaded &&loadEvents()
  },)
  return (
  <>
  <h1 className='featuredTitle artistPageTitle'>My Earnings:</h1>

    	
    <DataTable
    theme='dark'
    columns={columns}
    data={events}
    striped={false}
    customStyles={customStyles}
	conditionalRowStyles={conditionalRowStyles}
    
/>

</>
  )
}

export default Earnings
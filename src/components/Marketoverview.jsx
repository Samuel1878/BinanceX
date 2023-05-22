import "../Ani.css"
import { useNavigate } from "react-router-dom";
import {useGetCryptosQuery} from "../Services/CryptoAPI.js";
import Loader from "./loader";
import { useEffect, useState } from "react";
import millify from "millify";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function OverView () {
    const navigate = useNavigate();
    const [cryptos,setCryptos] = useState();
    let count = 10;
    const {data:cryptosList,isError, error, isFetching} = useGetCryptosQuery(count);
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
    }));
    useEffect(()=>{
         setCryptos(cryptosList && cryptosList?.data?.coins);
         console.log(cryptosList);
   
    },[cryptosList]);
    if(isFetching){
            return (<Loader/>)
    }else if (isError){
        console.log(error)
    } return (<div className="containerBox">
        <h1>
            Most polular Cryptocurrencies <span><a href="/market">Overview</a></span>
        </h1>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"> Coins</StyledTableCell>
            <StyledTableCell align="center">Last price</StyledTableCell>
            <StyledTableCell align="center">24h price</StyledTableCell>
            <StyledTableCell align="center">MarketCap</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{backgroundColor:"var(--bg-color)", color:"var(--title)"}}>
          {cryptos?.map((currency) => (
            <StyledTableRow key={currency.uuid} >
              <StyledTableCell component="th" scope="row" style={{color:"var(--title)"}}>
                <img id="marketOverIconsX" src={currency.iconUrl} alt="icon"></img>{currency.name}
                <span id="marketOverSymbolX">{currency.symbol}</span>
              </StyledTableCell>
              <StyledTableCell style={{color:"var(--textLow)"}}align="center">{millify(currency.price)} USD </StyledTableCell>
              <StyledTableCell style={(currency.change>0)?{color:"var(--bull)"}:{color:"var(--bear)"}} align="center">{currency.change}%</StyledTableCell>
              <StyledTableCell style={{color:"var(--textLow)", fontWeight:"bolder"}}align="center">{millify(currency.marketCap)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     <h2>Sign up now to build your own portfolio for free</h2>
     <button onClick={()=>navigate("/account")}>Get Started</button>
    </div>

)}
export default OverView;
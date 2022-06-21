import React,{ useState, useEffect } from 'react'
import styled from 'styled-components'
import { minPriceFilter, maxPriceFilter } from '../redux/filter/filterAction'
import { useSelector, useDispatch } from 'react-redux'

const StyledDiv=styled.div`
  width: 15rem;
  height: 100px;
  background-color: white;
  position: relative;

  .progressShadow{
    width: 14.6rem;
    height: 4px;
    background-color: #777;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    &::before{
      content: '';
      position: absolute;
      top: -0.3rem;
      right: -0.1rem;
      width: 15px;
      height: 15px;
      background-color: #777;
      border-radius: 50%;
    }
    &::after{
      content: '';
      position: absolute;
      top: -0.3rem;
      left: -0.1rem;
      width: 15px;
      height: 15px;
      background-color: #777;
      border-radius: 50%;
    }
  }

  .choosedPrice{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0.6rem;
    gap: 0.3rem;
    font-family: 'Oswald','Roboto',sens-serif;
    font-weight: bold;
    font-size: 1.1rem;
    color: #000;
  }
  .priceRange{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 4rem;
    font-family: 'Oswald','Roboto',sens-serif;
    font-weight: bold;
    font-size: 0.8rem;
    color: #444;
  }

  input{
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0,-50%);
    width: 15rem;
    height: 5px;
    -webkit-appearance: none;
    background: none;
    pointer-events: none;
    &::-webkit-slider-thumb{
      -webkit-appearance: none;
      width: 17px;
      height: 17px;
      pointer-events: auto;
      background-color: orangered;
      border-radius: 50%;
      cursor:pointer;
    }
    &::-moz-range-thumb{
      -webkit-appearance: none;
      width: 17px;
      height: 17px;
      pointer-events: auto;
      background-color: orangered;
      border-radius:50%;
      cursor:pointer;
    }
    &::-webkit-slider-thumb:hover{
      border:2px solid #242424;
    }
    &::-moz-range-thumb:hover{
      border:2px solid #242424;
    }
  }
`
  const ProgressBar=styled.div.attrs(props => ({
    style: {
      left:`${props.minP}%`,
      right:`${props.maxP}%`, 
    },
  }))`
    height: 5px;
    position: absolute;
    background-color: orangered;
    top: 50%;
    left: 0;
    transform:translate(0,-50%); 
  `

const CustomRange = () => {
  const filterState=useSelector(state=>state.filterState)
  const dispatch=useDispatch()
  const {minValue,maxValue}=filterState
  const [minPrice,setMinPrice]=useState(0)
  const [maxPrice,setMaxPrice]=useState(0)
  const priceGap=100;

  useEffect(()=>{
    setMinPrice(minValue/1000*100)
    setMaxPrice(100 - maxValue/1000*100)
  },[minValue,maxValue])

  const calcMinValue=(event)=>{
    if(maxValue-event.target.value>priceGap){
      dispatch(minPriceFilter(event.target.value))
    }else{
      const calcMin=Number(maxValue) - Number(priceGap)
      dispatch(minPriceFilter(calcMin))
    }
  }
  
  const calcMaxValue=(event)=>{
    if(event.target.value-minValue>priceGap){
      dispatch(maxPriceFilter(event.target.value))
    }else{
      const calcMax=Number(minValue) + Number(priceGap)
      dispatch(maxPriceFilter(calcMax))
    }
  }
  
  return (
    <StyledDiv>
      <div className='progressShadow'></div>
      <ProgressBar minP={minPrice} maxP={maxPrice} />
      <input type='range' min='0' max='1000' step='10' value={minValue} onChange={calcMinValue}/>
      <input type='range' min='0' max='1000' step='10' value={maxValue} onChange={calcMaxValue}/>
      <div className='choosedPrice'>
        <span>${minValue}</span>
        <span>-</span>
        <span>${maxValue}</span>
      </div>
      <div className='priceRange'>
        <span>$0</span>
        <span>$500</span>
        <span>$1000</span>
      </div>
    </StyledDiv>
  )
}

export default CustomRange
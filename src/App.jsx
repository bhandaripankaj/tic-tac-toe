import './App.css';
import { Box, Button, Chip, Modal, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Stack } from '@mui/system';
const style = {
  textAlign:"center",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius:10,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};
const button = {
  bgcolor:"red",
  // color:"#fff",
  marginTop:"10%",
  marginRight:"1%",
  width:100,
  height:100,
  "&:hover": { bgcolor: "red" }
}
const boxStyle={
    width:300,
    bgcolor:"#e1bee7",
    margin:"auto",
    marginTop:"10%",
    borderRadius:"10px",
    paddingBottom:"5px"
}
let valueOfArray = [
  {
    value:""
  },
  {
    value:""
  },
  {
    value:""
  },
  {
    value:""
  },
  {
    value:""
  },
  {
    value:""
  },
  {
    value:""
  },
  {
    value:""
  },
  {
    value:""
  }
]
function App() {
 const [play,setPlay] = useState(false)
 const [selected,setSelect] = useState([])
 const [value,setValue] = useState("")
 const [open, setOpen] = useState(false);
 let [newArry,setnewArry] = useState([...valueOfArray])
 const [selectIcon, setSelectIcon] = useState("")
 const [selectNot, setSelectNot] = useState(false)
 const [run, setRun] = useState(false)

let array = []

function checkWinner(inupt) {
  const winnerArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const key of winnerArray) {
    const [a, b, c] = key;
    if (inupt&&
      newArry[a].value === inupt &&
      newArry[b].value === inupt &&
      newArry[c].value === inupt
    ) {
      setOpen(true)
      return true;
    }
    // return null
  }
}
    function clickItm(key){
      if(!selectIcon){
        setSelectNot(true)
        return
      }
      setPlay(true)
      array.push(key)
      setSelect([...new Set([...selected,...array])])
      if(newArry[key].value ===""){
        if(value === "" && selectIcon){
          setValue(selectIcon)
          newArry[key].value = selectIcon
        } else if(value === "x"){
          setValue("o")
          newArry[key].value = "o"
    }else if(value === "o"){
      setValue("x")
      newArry[key].value = "x"
    } 
      }
    setnewArry([...newArry])
    } 
  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
      // onClick={() => clickItm(sx.key)}
        sx={{
          display:"flex",
          alignContent:"center",
          alignItems:"center",
          justifyContent:"center",
          justifyItems:"center",
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#4527a0'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : '#fff'),
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
          p: 1,
          cursor:"pointer",
          borderRadius: 0,
          fontSize: '0.875rem',
          fontWeight: '700',
          ...sx,
        }}
       
        {...other}
      >
    {/* { checkValue(sx.key) &&<TripOriginIcon sx={{ fontSize: "100px" }} />} */}
      </Box>
    );
  }
  Item.propTypes = {
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
      ),
      PropTypes.func,
      PropTypes.object,
    ]),
  };
  function renderIcon(key,itm){
    let check = selected.some(itm=>itm===key)
    return(
      <>
       {play&& check && itm ==="o"&& (<TripOriginIcon sx={{ fontSize: "100px" }} />) }
       {play&& check && itm ==="x"&& (<CloseIcon  sx={{ fontSize: "130px",color:"#78909c" }}/>) }
      </>
    )
  }
  const handleClose = () =>{
    setOpen(false);
   setnewArry(newArry.map(el=>{
    el.value = ""
   return el
  }))
  setSelect([])
  array = []
  setPlay(false)
  setValue("")
  setSelectIcon("")
  setRun(false)
  }
  const selectTicTac = (icon) => {
    setSelectIcon(icon)
    setSelectNot(false)
    setRun(true)
  };
  useEffect(()=>{
    checkWinner(value)
  },[value])
  
  return (
    <>
     <Box className="App">
      <img src='tic-tac.png'  alt='tic-tac' style={{position:"absolute",width:"200px" ,margin:"-150px 0px 0px -700px"}}></img>
      <Box
      sx={{...boxStyle}}
      >
      {selectNot&& <p>Please select any one!</p> }
     {!run && ( 
      <>
      <Button onClick={() => selectTicTac("o")}  color="secondary"><TripOriginIcon sx={{ fontSize: "80px",color:"#ffff",":hover":{bgcolor:"#ce93d8",width:90,height:90 }}}/></Button>
       <Button onClick={() => selectTicTac("x")} color="secondary"><CloseIcon sx={{ fontSize: "95px" ,color:"#78909c",":hover":{bgcolor:"#ce93d8"} }}/></Button>
        <Chip color="warning" label="Please Select"/>
      </>
     )}
     {run&&(
      <>
      <Stack spacing={1} alignItems="center" alignContent={"center"}>
            <Stack direction="row" spacing={1}>
            <Typography style={{fontSize:"30px",marginTop:"15px"}}>Player</Typography>
            {!value && selectIcon==="o" && 
            (<TripOriginIcon sx={{ fontSize: "80px",color:"#ffff"}}/>)  
            }
             {!value && selectIcon==="x" && 
            (<CloseIcon sx={{ fontSize: "80px",color:"#78909c"}}/>)  
            }  
             {value && value==="x" && 
            (<TripOriginIcon sx={{ fontSize: "80px",color:"#ffff"}}/>)  
            }
             {value && value==="o" && 
            (<CloseIcon sx={{ fontSize: "80px",color:"#78909c"}}/>)  
            } 
            </Stack>
          </Stack>
      </>
     )}
      </Box>
      <Box 
      sx={{
        display:"flex",
        margin:"auto",
        marginTop:"1%",
        padding:"0.4% 0.4% 0.4% 0.4%",
        color:"#4caf50",
        borderRadius:10,
        bgcolor:"#673ab7",
        maxWidth:520,
        maxHeight:900,
        border:1,
        borderColor:"white",
        }}> 

        <div style={{ width: '100%'}}>
      <Box
        sx={{
          display: 'grid',
          columnGap: 0,
          rowGap: 0,
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 120px)',
        }}
      >
      {newArry.map((itm,i)=>(
        <Item 
        onClick={() => clickItm(i)} 
         sx={{ 
          borderRadius:`${(i===0)?"30px":"0px"} ${(i===2)?"30px":"0px"} ${(i===8)?"30px":"0px"} ${(i===6)?"30px":"0px"}` , 
          borderRight:`${(i === 0||i===1||i===3||i===4||i===6||i===7)?"1px solid":"none" }`,
          borderTop:`${(i === 3||i===4||i===5||i===6||i===7||i===8)?"1px solid":"none" }`,
          key:i+1 
          }}> 
          {renderIcon(i,itm.value)}
        </Item>
      )) }
      </Box>
    </div>
      </Box>
     </Box>
   
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style,color:"#ef6c00"}}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
           You Win The Game!
          </Typography>
          <Button onClick={handleClose} sx={{marginTop:5,color:"#fff",bgcolor:"#66bb6a" ,":hover":{bgcolor:"#66bb6a"}}}  variant="text">Play again</Button>
        </Box>
      </Modal>
    </>
  );
}

export default App;

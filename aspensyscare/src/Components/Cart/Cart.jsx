import styled from '@emotion/styled'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button,  FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import RecentViews from '../LandingPage/Carousel/RecentViews';
import AddIcon from '@mui/icons-material/Add';
const Container = styled(Box)`
    width:100%;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:20px;
`
const Headdingcont = styled(Box)`
    width:90%;
`
const Container_Cart = styled(Box)`
    width:90%;
    display:flex;
    flex-direction:row;
    justify-content:center;
    gap:20px;
`
const Amountcont = styled(Box)`
    width:25%;
    border-radius:16px;
    display:flex;
    flex-direction:column;
    gap:1rem;
`
const AmountDetailscont = styled(Box)`
    width:80%;
    display:flex;
    height:max-content;
    flex-direction:column;
    border-radius:16px;
    padding:10px;
    background-color:#d9d9d9;
`
const AmountDetailsrow=styled(Box)`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    padding: 10px;
    `
const Detailescont = styled(Box)`
    width:70%;
    display:flex;
    flex-direction:column;
    flex-wrap:nowrap;
`
const SizeButtom = styled(Button)`
    line-height: 1.5;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    background-color:green;
    padding: 6px 6px;
    min-width: 50px;
    font-size: 12px;
`
const ButtomBox = styled(Box)`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:row;
    flex-wrap:nowrap;
    gap:10px;
    align-items:center;
    margin-top:5px;
`
const Cart = () => {
    useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);
    const [expandedItem, setExpandedItem] = useState('panel1');
    const [expandedAddress, setExpandedAddress] = useState();
    const [expandedPay, setExpandedPay] = useState();

    const handleOpen = (panel) => (event, isExpanded) => {
        // console.log(panel)
        // console.log(isExpanded)
        // setExpanded(isExpanded ? panel : false);
        if (panel === 'panel1') {
            setExpandedPay(false)
            setExpandedAddress(false)
            setExpandedItem(panel)
            
        }
        if (panel === 'panel2') {
            setExpandedPay(false)
            setExpandedItem(false)
            setExpandedAddress(panel)
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
        if (panel === 'panel3') {
            setExpandedItem(false)
            setExpandedAddress(false)
            setExpandedPay(panel)
        }
    };
    const handleChange = (panel) => (event, isExpanded) => {
        // console.log(panel)
        // console.log(isExpanded)
        // setExpanded(isExpanded ? panel : false);
        if (panel === 'panel1') {
            setExpandedPay(false)
            setExpandedAddress(false)
            setExpandedItem(panel)
           
        }
        if (panel === 'panel2') {
            setExpandedPay(false)
            setExpandedItem(false)
            setExpandedAddress(panel)
        }

    };


    const [val, setVal] = useState(1);
    const handelvalue = (str) => {
        console.log(str)
        const replaced = str.match(/\d+/);
        if (replaced !== '') {
            setVal(replaced[0]);
        }
    }

    // address work start

    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setError(false);
    };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (value === 'best') {
    //         setError(false);
    //     } else if (value === 'worst') {
    //         setError(true);
    //     } else {
    //         setError(true);
    //     }
    // };

    const takeValue = (e) => {
        console.log(e.target.value)
    }
    // payment start


    const handleSubmitpayment = () => {
        console.log('hello ia m payment')
    }
    return (
        <Container >
            <Headdingcont >
                <Typography variant='h2' style={{ fontSize: '18px', padding: '10px', fontWeight: 600 }}>Your Cart</Typography>
            </Headdingcont>
            <Container_Cart>
                <Detailescont>
                    <Accordion expanded={expandedItem === 'panel1'}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        // style={{ backgroundColor: '#d9d9d9' }}
                        >
                            <Typography sx={{ width: '90%', flexShrink: 0 }}>
                                Your Cart
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Box
                                style={{ width: '95%', display: 'flex', flexWrap: 'nowrap', flexDirection: 'raw', alignItems: 'flex-end', borderBottom: '2px solid #d9d9d9' }}>
                                <Typography style={{ width: '45%', padding: '5px', display: 'flex', justifyContent: 'flex-start' }}>items</Typography>
                                <Typography style={{ width: '20%', padding: '5px', display: 'flex', justifyContent: 'center' }}>size</Typography>
                                <Typography style={{ width: '20%', padding: '5px', display: 'flex', justifyContent: 'center' }}> quantity</Typography>
                                <Typography style={{ width: '15%', padding: '5px', display: 'flex', justifyContent: 'flex-end' }}>price</Typography>
                            </Box>

                            <Box style={{ width: '95%', display: 'flex', flexDirection: 'raw', flexWrap: 'nowrap', alignItems: 'center', borderBottom: '2px solid #d9d9d9' }}>
                                {/* ----------------------item box start------------------ */}
                                <Box style={{ width: '45%', display: 'flex', flexDirection: 'raw', alignItems: 'flex-start', padding: '5px', marginTop: '10px' }}>
                                    <Box style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                        <img width="auto" style={{ backgroundColor: '#d9d9d9' }}
                                            height={100} alt="" src='./Image/products/small-dish-wash01.png' />
                                        <Box style={{ width: '100%', display: 'flex', flexDirection: 'raw', justifyContent: 'space-between' }}>
                                            <Typography variant='subtitle2' style={{ fontSize: '12px', color: 'red', cursor: 'pointer' }}>remove</Typography>
                                            <Typography variant='subtitle2' style={{ fontSize: '12px', color: 'blue', cursor: 'pointer' }}>move to wishlist</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant='h2'
                                        style={{ padding: '5px', fontSize: '16px', fontWeight: 600, }}>product name(50ml)
                                    </Typography>
                                </Box>
                                {/* ----------------------item box end------------------ */}
                                {/* ----------------------size box start------------------ */}
                                <Box style={{ width: '20%', padding: '5px', display: 'flex', justifyContent: 'space-around' }}>
                                    <Box><SizeButtom variant='contained' style={{ backgroundColor: 'green' }} >50ml</SizeButtom></Box>
                                    <Box><SizeButtom variant='contained' style={{ backgroundColor: 'gray' }}>100ml</SizeButtom></Box>
                                </Box>
                                {/* ----------------------size box end------------------ */}
                                {/* ----------------------Quantity box start------------------ */}
                                <Box style={{ width: '20%', padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <RemoveCircleRoundedIcon style={{ fontSize: '18px', }} />
                                    <input
                                        type="text"
                                        value={val}
                                        onChange={(e) => handelvalue(e.target.value)}
                                        style={{ width: '60px', height: '25px', border: '2px solid black', display: 'flex', textAlign: 'center', borderRadius: '3px' }} />
                                    <AddCircleRoundedIcon style={{ fontSize: '18px', }} />
                                </Box>
                                {/* ----------------------Quantity box end------------------ */}
                                {/* ----------------------Price box start------------------ */}
                                <Box style={{ width: '15%', padding: '5px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <CurrencyRupeeIcon style={{ fontSize: '16px' }} />
                                    <Typography variant='h2' style={{ fontSize: '14px', fontWeight: 600 }}>750</Typography>
                                </Box>
                                {/* ----------------------Price box end------------------ */}
                            </Box>

                            <Box style={{ width: '95%', display: 'flex', flexDirection: 'raw', flexWrap: 'nowrap', alignItems: 'center', borderBottom: '2px solid #d9d9d9' }}>
                                {/* ----------------------item box start------------------ */}
                                <Box style={{ width: '45%', display: 'flex', flexDirection: 'raw', alignItems: 'flex-start', padding: '5px', marginTop: '10px' }}>
                                    <Box style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                        <img width="auto" style={{ backgroundColor: '#d9d9d9' }}
                                            height={100} alt="" src='./Image/products/small-dish-wash01.png' />
                                        <Box style={{ width: '100%', display: 'flex', flexDirection: 'raw', justifyContent: 'space-between' }}>
                                            <Typography variant='subtitle2' style={{ fontSize: '12px', color: 'red', cursor: 'pointer' }}>remove</Typography>
                                            <Typography variant='subtitle2' style={{ fontSize: '12px', color: 'blue', cursor: 'pointer' }}>move to wishlist</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant='h2'
                                        style={{ padding: '5px', fontSize: '16px', fontWeight: 600, }}>product name(50ml)
                                    </Typography>
                                </Box>
                                {/* ----------------------item box end------------------ */}
                                {/* ----------------------size box start------------------ */}
                                <Box style={{ width: '20%', padding: '5px', display: 'flex', justifyContent: 'space-around' }}>
                                    <Box><SizeButtom variant='contained' style={{ backgroundColor: 'green' }} >50ml</SizeButtom></Box>
                                    <Box><SizeButtom variant='contained' style={{ backgroundColor: 'gray' }}>100ml</SizeButtom></Box>
                                </Box>
                                {/* ----------------------size box end------------------ */}
                                {/* ----------------------Quantity box start------------------ */}
                                <Box style={{ width: '20%', padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <RemoveCircleRoundedIcon style={{ fontSize: '18px', }} />
                                    <input
                                        type="text"
                                        value={val}
                                        onChange={(e) => handelvalue(e.target.value)}
                                        style={{ width: '60px', height: '25px', border: '2px solid black', display: 'flex', textAlign: 'center', borderRadius: '3px' }} />
                                    <AddCircleRoundedIcon style={{ fontSize: '18px', }} />
                                </Box>
                                {/* ----------------------Quantity box end------------------ */}
                                {/* ----------------------Price box start------------------ */}
                                <Box style={{ width: '15%', padding: '5px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <CurrencyRupeeIcon style={{ fontSize: '16px' }} />
                                    <Typography variant='h2' style={{ fontSize: '14px', fontWeight: 600 }}>750</Typography>
                                </Box>
                                {/* ----------------------Price box end------------------ */}
                            </Box>

                            <Box style={{ width: '95%', display: 'flex', flexDirection: 'raw', flexWrap: 'nowrap', alignItems: 'center', borderBottom: '2px solid #d9d9d9' }}>
                                {/* ----------------------item box start------------------ */}
                                <Box style={{ width: '45%', display: 'flex', flexDirection: 'raw', alignItems: 'flex-start', padding: '5px', marginTop: '10px' }}>
                                    <Box style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                        <img width="auto" style={{ backgroundColor: '#d9d9d9' }}
                                            height={100} alt="" src='./Image/products/small-dish-wash01.png' />
                                        <Box style={{ width: '100%', display: 'flex', flexDirection: 'raw', justifyContent: 'space-between' }}>
                                            <Typography variant='subtitle2' style={{ fontSize: '12px', color: 'red', cursor: 'pointer' }}>remove</Typography>
                                            <Typography variant='subtitle2' style={{ fontSize: '12px', color: 'blue', cursor: 'pointer' }}>move to wishlist</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant='h2'
                                        style={{ padding: '5px', fontSize: '16px', fontWeight: 600, }}>product name(50ml)
                                    </Typography>
                                </Box>
                                {/* ----------------------item box end------------------ */}
                                {/* ----------------------size box start------------------ */}
                                <Box style={{ width: '20%', padding: '5px', display: 'flex', justifyContent: 'space-around' }}>
                                    <Box><SizeButtom variant='contained' style={{ backgroundColor: 'green' }} >50ml</SizeButtom></Box>
                                    <Box><SizeButtom variant='contained' style={{ backgroundColor: 'gray' }}>100ml</SizeButtom></Box>
                                </Box>
                                {/* ----------------------size box end------------------ */}
                                {/* ----------------------Quantity box start------------------ */}
                                <Box style={{ width: '20%', padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <RemoveCircleRoundedIcon style={{ fontSize: '18px', }} />
                                    <input
                                        type="text"
                                        value={val}
                                        onChange={(e) => handelvalue(e.target.value)}
                                        style={{ width: '60px', height: '25px', border: '2px solid black', display: 'flex', textAlign: 'center', borderRadius: '3px' }} />
                                    <AddCircleRoundedIcon style={{ fontSize: '18px', }} />
                                </Box>
                                {/* ----------------------Quantity box end------------------ */}
                                {/* ----------------------Price box start------------------ */}
                                <Box style={{ width: '15%', padding: '5px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <CurrencyRupeeIcon style={{ fontSize: '16px' }} />
                                    <Typography variant='h2' style={{ fontSize: '14px', fontWeight: 600 }}>750</Typography>
                                </Box>
                                {/* ----------------------Price box end------------------ */}
                            </Box>
                            
                            <Button variant='contained' onClick={handleOpen('panel2')}
                                style={{ backgroundColor: 'green', marginTop: '10px' }}>Select Address
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                    {/* onChange={handleOpen('panel2')} */}
                    <Accordion expanded={expandedAddress === 'panel2'} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography sx={{ width: '90%', flexShrink: 0 }}>
                                Delivery Address
                            </Typography>
                            {
                                expandedAddress === 'panel2' ?
                                    <Typography variant='subtitle' sx={{ fontSize: '14px', color: 'blueviolet', zIndex: 9, }}
                                        onClick={handleChange('panel1')}>change</Typography> : ''
                            }
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* <form onSubmit={handleSubmit}> */}
                                <FormControl sx={{ m: 3 }} error={error} variant="standard" onChange={(e) => takeValue(e)}>
                                    <Box style={{ width: '70%', height: '65px', overFlow: 'hidden', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '1rem' }} >
                                        <input type="radio" id="html" name="address" value="HTML" defaultChecked />
                                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                                                <Typography variant='h2' style={{ fontSize: '14px', fontWeight: 600 }}>name</Typography>
                                                <Typography variant='body'
                                                    style={{ height: 'fit-content', fontSize: '12px', backgroundColor: '#d9d9d9', padding: '0 4px', borderRadius: '5px' }}>Home</Typography>
                                                <Typography variant='body' style={{}}>9898988989</Typography>
                                            </Box>
                                            <Box style={{ display: 'flex', flexDirection: 'row' }}   >
                                                <Typography variant='h2' style={{ fontSize: '12px', fontWeight: 600 ,color:'gray'}}>
                                                    name jkhjkhdf dfjdsfhsd afhjdfh djafdlaf, gghgfdhdfh fghdf hdfghfgdhfg hdg fg h dgh fghdghghfg hfgdhdf
                                                </Typography>
                                            </Box>
                                        </label>
                                    </Box>
                                    <Box style={{ width: '70%', height: '65px', overFlow: 'hidden', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '1rem' }} >
                                        <input type="radio" id="html1" name="address" value="java" />
                                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                                            <Box style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                                                <Typography variant='h2' style={{ fontSize: '14px', fontWeight: 600 }}>name</Typography>
                                                <Typography variant='body'
                                                    style={{ height: 'fit-content', fontSize: '12px', backgroundColor: '#d9d9d9', padding: '0 4px', borderRadius: '5px' }}>Home</Typography>
                                                <Typography variant='body' style={{}}>9898988989</Typography>
                                            </Box>
                                            <Box style={{ display: 'flex', flexDirection: 'row' }}   >
                                                <Typography variant='h2' style={{ fontSize: '12px', fontWeight: 600 ,color:'gray'}}>
                                                    name jkhjkhdf dfjdsfhsd afhjdfh djafdlaf, gghgfdhdfh fghdf hdfghfgdhfg hdg fg h dgh fghdghghfg hfgdhdf
                                                </Typography>
                                            </Box>
                                        </label>
                                    </Box>
                                </FormControl>
                                <Box style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                                    <Typography variant="h3" style={{ width: 'max-content', cursor: 'pointer', display: 'flex', fontSize: '14px', color: "blueviolet", justifyContent: 'flex-start', alignItems: 'center', gap: '.2rem' }}>
                                        <AddIcon style={{ fontSize: '20px' }} fontSize='large' />Add New Address
                                    </Typography>
                                    <Button variant='contained' onClick={handleOpen('panel3')}
                                        style={{ backgroundColor: 'green', marginTop: '10px' }}>Proceed to pay</Button>
                                </Box>

                                {/* </form> */}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expandedPay === 'panel3'}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography sx={{ width: '90%', flexShrink: 0 }}>
                                Payment
                            </Typography>
                            {
                                expandedPay === 'panel3' ?
                                    <Typography variant='subtitle' sx={{ fontSize: '14px', color: 'blueviolet', zIndex: 9, }}
                                        onClick={handleChange('panel2')}>change</Typography> : ''
                            }

                        </AccordionSummary>
                        <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <form onSubmit={handleSubmitpayment}
                                style={{ width: '95%', display: 'flex', flexWrap: 'nowrap', flexDirection: 'column', alignItems: 'flex-end' }}
                            >
                                <FormControl sx={{ m: 3 }} error={error} variant="standard" style={{ width: '100%', }}>

                                    <RadioGroup
                                        aria-labelledby="demo-error-radios"
                                        name="quiz"
                                        value={value}
                                        onChange={handleRadioChange}
                                        style={{ width: '100%' }}
                                    >
                                        <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                                        <FormControlLabel value="wallets" control={<Radio />} label="Wallets" />
                                        <FormControlLabel value="Credit/debit/AtmCard" control={<Radio />} label="Credit/debit/AtmCard" />
                                        <FormControlLabel value="Net Banking" control={<Radio />} label="Net Banking" />
                                        <FormControlLabel value="emi" control={<Radio />} label="EMI (Easy Installments" />
                                        <FormControlLabel value="case" control={<Radio />} label="Case On Delivery" />
                                    </RadioGroup>
                                </FormControl>
                                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant='contained' style={{ backgroundColor: 'green', marginTop: '10px' }}>
                                    Place Order
                                </Button>
                            </form>
                        </AccordionDetails>
                    </Accordion>
                </Detailescont>
                <Amountcont>
                <Typography style={{ fontSize: '16px',fontWeight:600 }}>Price details</Typography>
                    <AmountDetailscont>
                        <AmountDetailsrow style={{borderBottom:'1.4px solid gray'}}>
                            <Typography>Price</Typography>
                            <Typography><CurrencyRupeeIcon style={{ fontSize: '14px' }} />1300</Typography>
                        </AmountDetailsrow>
                        <AmountDetailsrow style={{borderBottom:'1.4px solid gray'}}>
                            <Typography>Discount</Typography>
                            <Typography><CurrencyRupeeIcon style={{ fontSize: '14px' }} />50</Typography>
                        </AmountDetailsrow>
                        <AmountDetailsrow style={{borderBottom:'1.4px solid gray'}}>
                            <Typography>Delivery</Typography>
                            <Typography><CurrencyRupeeIcon style={{ fontSize: '14px' }} />100</Typography>
                        </AmountDetailsrow>
                    </AmountDetailscont>
                    <AmountDetailscont>
                        <AmountDetailsrow>
                            <Typography>Subtotal</Typography>
                            <Typography><CurrencyRupeeIcon style={{ fontSize: '14px' }} />1350</Typography>
                        </AmountDetailsrow>
                    </AmountDetailscont>
                </Amountcont>
            </Container_Cart>
            <Box style={{ width: '100%' }}>

                <Box>
                    <RecentViews />
                </Box>
            </Box>
        </Container>
    )
}

export default Cart

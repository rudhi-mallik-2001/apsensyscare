import * as React from "react";
import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Modal,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import RecentViews from "../LandingPage/Carousel/RecentViews";
import { useDispatch, useSelector } from "react-redux";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddAddressModal from "./AddAddressModal";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../Store/Slices/cartSlice";
import { toast } from "react-toastify";
import { CreateOrder, CreateSigneture } from "../../Api/Api";
// import { useLocation } from "react-router-dom";

const stylemodal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const Headdingcont = styled.div`
  width: 90%;
`;
const ContainerCart = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;
const Amountcont = styled.div`
  width: 25%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const AmountDetailscont = styled.div`
  width: 80%;
  display: flex;
  height: max-content;
  flex-direction: column;
  border-radius: 16px;
  padding: 10px;
  background-color: #d9d9d9;
`;
const AmountDetailsrow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
`;
const Detailescont = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const SizeButtom = styled(Button)`
  line-height: 1.5;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  background-color: green;
  padding: 6px 6px;
  min-width: 50px;
  font-size: 12px;
`;

const Cart = (props) => {
  const { handelLogin } = props;
  // const productId = useLocation();
  const dispatch = useDispatch();
  const [expandedItem, setExpandedItem] = useState("panel1");
  const [expandedAddress, setExpandedAddress] = useState();
  const [expandedPay, setExpandedPay] = useState();

  const [openmod, setOpen] = React.useState(false);
  const handleOpendilog = () => setOpen(true);
  const handleClosedilog = () => setOpen(false);

  const sizes = useSelector((state) => state.size);
  const size = sizes.sizes.size;
  const addressess = useSelector((state) => state.address);
  const address = addressess.address.address;
  const userdetails = useSelector((state) => state.users);
  const user = userdetails.users.details;
  console.log(user)
  const userName=user !== undefined ? user[0].f_name +" "+ user[0].l_name : ""
  const userPhone=user !== undefined ? user[0].phone_number : ""
  const userEmail=user !== undefined ? user[0].email_address : ""
  console.log();
  const handleOpen = (panel) => (event, isExpanded) => {
    // console.log(panel)
    // console.log(isExpanded)
    // setExpanded(isExpanded ? panel : false);
    if (panel === "panel1") {
      setExpandedPay(false);
      setExpandedAddress(false);
      setExpandedItem(panel);
    }
    if (panel === "panel2") {
      setExpandedPay(false);
      setExpandedItem(false);
      setExpandedAddress(panel);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    if (panel === "panel3") {
      if (address !== undefined) {
        setExpandedItem(false);
        setExpandedAddress(false);
        setExpandedPay(panel);
      } else {
        toast.error("please add Address", { position: "top-center" });
      }
    }
  };
  const handleChange = (panel) => (event, isExpanded) => {
    // console.log(panel)
    // console.log(isExpanded)
    // setExpanded(isExpanded ? panel : false);
    if (panel === "panel1") {
      setExpandedPay(false);
      setExpandedAddress(false);
      setExpandedItem(panel);
    }
    if (panel === "panel2") {
      setExpandedPay(false);
      setExpandedItem(false);
      setExpandedAddress(panel);
    }
  };
  // address work start

  const [orderType, setOrderType] = useState("case");
  const [error, setError] = useState(false);

  const handleRadioChange = (event) => {
    setOrderType(event.target.value);
    setError(false);
  };
  console.log("i am radio :- ", orderType)
  const takeValue = (e) => {
    console.log(e.target.value);
  };
  // payment start

  const handelOrder = async (amount) => {
     console.log("hello ia m payment",amount);
    if (orderType === 'case') {
      console.log(orderType)
    } else if (orderType === 'online') {
      CreateOrder(amount).then((res) => {
        console.log(res)
        const res_order_id = "";
        var options = {
          "key": "rzp_test_dt0Vsxsmad0Ry3", // Enter the Key ID generated from the Dashboard
          "amount": `${amount*100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Apsensys Care", //your business name
          "description": "Test Transaction",
          "image": "https://apsensyscare.com/favicon.ico",
          "order_id": `${res_order_id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
          "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            "name": `${userName}`, //your customer's name
            "email":`${userEmail}`,
            "contact": `${userPhone}` //Provide the customer's phone number for better conversion rates 
          },
          "handler": function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
            // var hash = CryptoJS.HmacSHA256("message", "secret");
            // var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
            const signeture={
              'res_order_id':res_order_id,
              'razorpay_payment_id':response.razorpay_payment_id,
              'razorpay_signature':response.razorpay_signature
            }
            CreateSigneture(signeture).then((resp)=>{
              console.log(resp)
            }) 
              
          },
          "notes": {
            "address": "Razorpay Corporate Office"
          },
          "theme": {
            "color": "#3399cc"
          }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      })

    }
  };

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [cart, dispatch]);
  // console.log(cart)
  const handleAddToCart = (product) => {
    // console.log(product)
    const temp = "";
    dispatch(addToCart([product, temp]));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  return (
    <Container>
      <Headdingcont>
        <Typography
          variant="h2"
          style={{ fontSize: "18px", padding: "10px", fontWeight: 600 }}
        >
          Your Cart
        </Typography>
      </Headdingcont>
      {cart.cartItems.length === 0 ? (
        <Box
          style={{
            width: "100%",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h1"
            style={{ fontSize: "20px", fontWeight: "600", color: "red" }}
          >
            Your cart is empty
          </Typography>
        </Box>
      ) : (
        <ContainerCart>
          <Detailescont>
            <Accordion expanded={expandedItem === "panel1"}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "90%", flexShrink: 0 }}>
                  Your Cart
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    width: "95%",
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "raw",
                    alignItems: "flex-end",
                    borderBottom: "2px solid #d9d9d9",
                  }}
                >
                  <Typography
                    style={{
                      width: "45%",
                      padding: "5px",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    items
                  </Typography>
                  <Typography
                    style={{
                      width: "20%",
                      padding: "5px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    size
                  </Typography>
                  <Typography
                    style={{
                      width: "20%",
                      padding: "5px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    quantity
                  </Typography>
                  <Typography
                    style={{
                      width: "15%",
                      padding: "5px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    price
                  </Typography>
                </div>

                {cart.cartItems &&
                  cart.cartItems.map((cartItem, idx) => (
                    <div key={idx.toString()}
                      style={{
                        width: "95%",
                        display: "flex",
                        flexDirection: "raw",
                        flexWrap: "nowrap",
                        alignItems: "center",
                        borderBottom: "2px solid #d9d9d9",
                      }}
                    >
                      {/* ----------------------item box start------------------ */}
                      <div
                        style={{
                          width: "45%",
                          display: "flex",
                          flexDirection: "raw",
                          alignItems: "flex-start",
                          padding: "5px",
                          marginTop: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <img
                            width="auto"
                            style={{ backgroundColor: "#d9d9d9" }}
                            height={100}
                            alt={cartItem.name}
                            src={`${process.env.REACT_APP_URL}/Image/all_products/${cartItem.product_image}`}
                          />
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "raw",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              style={{
                                fontSize: "12px",
                                color: "red",
                                cursor: "pointer",
                              }}
                              onClick={() => handleRemoveFromCart(cartItem)}
                            >
                              remove
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              style={{
                                fontSize: "12px",
                                color: "blue",
                                cursor: "pointer",
                              }}
                            >
                              move to wishlist
                            </Typography>
                          </div>
                        </div>
                        <Typography
                          variant="h2"
                          style={{
                            padding: "5px",
                            fontSize: "16px",
                            fontWeight: 600,
                          }}
                        >
                          {cartItem.name}({cartItem.itemSize}ml)
                        </Typography>
                      </div>
                      {/* ----------------------item box end------------------ */}
                      {/* ----------------------size box start------------------ */}
                      <div
                        style={{
                          width: "20%",
                          padding: "5px",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <div>
                          <SizeButtom
                            onClick={handleOpendilog}
                            variant="contained"
                            style={{ backgroundColor: "green" }}
                          >

                            {cartItem.itemSize}ml
                          </SizeButtom>
                        </div>
                        <Modal
                          open={openmod}
                          onClose={handleClosedilog}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={stylemodal}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Select a Size
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              {size !== undefined ? size.map((items, idx) => {
                                return (
                                  <SizeButtom
                                    variant="contained"
                                    style={{
                                      backgroundColor: "green",
                                      margin: "1rem",
                                    }}
                                    key={idx.toString()}
                                  >
                                    {items.size_value}ml
                                  </SizeButtom>
                                );
                              }) : null}
                            </Typography>
                          </Box>
                        </Modal>
                        {/* <div><SizeButtom variant='contained' style={{ backgroundColor: 'gray' }}>100ml</SizeButtom></div> */}
                      </div>
                      {/* ----------------------size box end------------------ */}
                      {/* ----------------------Quantity box start------------------ */}
                      <div
                        style={{
                          width: "20%",
                          padding: "5px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <RemoveCircleRoundedIcon
                          style={{ fontSize: "18px", cursor: "pointer" }}
                          onClick={() => handleDecreaseCart(cartItem)}
                        />
                        <div
                          style={{
                            width: "30px",
                            height: "max-content",
                            textAlign: "center",
                          }}
                        >
                          {cartItem.cartQuantity}
                        </div>
                        <AddCircleRoundedIcon
                          style={{ fontSize: "18px", cursor: "pointer" }}
                          onClick={() => handleAddToCart(cartItem)}
                        />
                      </div>
                      {/* ----------------------Quantity box end------------------ */}
                      {/* ----------------------Price box start------------------ */}
                      <div
                        style={{
                          width: "15%",
                          padding: "5px",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <CurrencyRupeeIcon style={{ fontSize: "16px" }} />
                        <Typography
                          variant="h2"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          {cartItem.price}
                        </Typography>
                      </div>
                      {/* ----------------------Price box end------------------ */}
                    </div>
                  ))}
                <Button
                  variant="contained"
                  onClick={handleOpen("panel2")}
                  style={{ backgroundColor: "green", marginTop: "10px" }}
                >
                  Select Address
                </Button>
              </AccordionDetails>
            </Accordion>
            {/* onChange={handleOpen('panel2')} */}
            <Accordion expanded={expandedAddress === "panel2"}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography sx={{ width: "90%", flexShrink: 0 }}>
                  Delivery Address
                </Typography>
                {expandedAddress === "panel2" ? (
                  <Typography
                    variant="subtitle"
                    sx={{ fontSize: "14px", color: "blueviolet", zIndex: 9 }}
                    onClick={handleChange("panel1")}
                  >
                    change
                  </Typography>
                ) : (
                  ""
                )}
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* <form onSubmit={handleSubmit}> */}
                  <FormControl
                    sx={{ m: 3 }}
                    error={error}
                    variant="standard"
                    onChange={(e) => takeValue(e)}
                  >{
                      address !== undefined ?
                        address.map((items, idx) => {
                          return (
                            <div key={idx.toString()}
                              style={{
                                width: "70%",
                                height: "65px",
                                overFlow: "hidden",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                gap: "1rem",
                              }}
                            >
                              {idx === 0 ?
                                <input
                                  type="radio"
                                  id={`${items.id}`}
                                  name="address"
                                  value={`${items.id}`}
                                  defaultChecked
                                /> :
                                <input
                                  type="radio"
                                  id={`${items.id}`}
                                  name="address"
                                  value={`${items.id}`}
                                />
                              }
                              <label for={`${items.id}`}
                                style={{ display: "flex", flexDirection: "column" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "1rem",
                                  }}
                                >
                                  <Typography
                                    variant="h2"
                                    style={{ fontSize: "14px", fontWeight: 600 }}
                                  >
                                    {items.name}
                                  </Typography>
                                  <Typography
                                    variant="body"
                                    style={{
                                      height: "fit-content",
                                      fontSize: "12px",
                                      backgroundColor: "#d9d9d9",
                                      padding: "0 4px",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    Home
                                  </Typography>
                                  <Typography variant="body" style={{}}>
                                    {items.contact}
                                  </Typography>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                  <Typography
                                    variant="h2"
                                    style={{
                                      fontSize: "12px",
                                      fontWeight: 600,
                                      color: "gray",
                                    }}
                                  >
                                    {items.house_flat_office}{items.area_landmark}{items.city}{items.state}{items.pincode}
                                  </Typography>
                                </div>
                              </label>
                            </div>
                          )
                        })

                        : null
                    }
                  </FormControl>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <AddAddressModal handelLogin={handelLogin} />
                    <Button
                      variant="contained"
                      onClick={handleOpen("panel3")}
                      style={{
                        width: "max-content",
                        cursor: "pointer",
                        display: "flex",
                        fontSize: "12px",
                        color: "white",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: ".2rem",
                        backgroundColor: "green",
                      }}
                    >
                      Proceed to pay
                    </Button>
                  </div>

                  {/* </form> */}
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expandedPay === "panel3"}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography sx={{ width: "90%", flexShrink: 0 }}>
                  Payment
                </Typography>
                {expandedPay === "panel3" ? (
                  <Typography
                    variant="subtitle"
                    sx={{ fontSize: "14px", color: "blueviolet", zIndex: 9 }}
                    onClick={handleChange("panel2")}
                  >
                    change
                  </Typography>
                ) : (
                  ""
                )}
              </AccordionSummary>
              <AccordionDetails
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    width: "95%",
                    display: "flex",
                    flexWrap: "nowrap",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <FormControl
                    sx={{ m: 3 }}
                    error={error}
                    variant="standard"
                    style={{ width: "100%" }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-error-radios"
                      name="quiz"
                      value={orderType}
                      onChange={handleRadioChange}
                      style={{ width: "100%" }}
                    >

                      <FormControlLabel
                        value="online"
                        control={<Radio />}
                        label="Pay Online"
                      />
                      <FormControlLabel
                        value="case"
                        control={<Radio />}
                        label="Case On Delivery"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    sx={{ mt: 1, mr: 1 }}
                    type="buttom"
                    variant="contained"
                    style={{ width: '200px', backgroundColor: "green", marginTop: "10px" }}
                    onClick={() => { handelOrder(cart.cartTotalAmount) }}
                  >
                    {orderType === 'case' ? "Place Order" : 'Pay'}
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          </Detailescont>
          <Amountcont>
            <Typography style={{ fontSize: "16px", fontWeight: 600 }}>
              Price details
            </Typography>
            <AmountDetailscont>
              <AmountDetailsrow style={{ borderBottom: "1.4px solid gray" }}>
                <Typography style={{ fontWeight: "600" }}>Price</Typography>
                <Typography>
                  <div
                    style={{
                      minWidth: "70px",
                      height: "max-content",
                      textAlign: "center",
                    }}
                  >
                    <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                    {cart.cartTotalAmount}
                  </div>
                </Typography>
              </AmountDetailsrow>
              <AmountDetailsrow style={{ borderBottom: "1.4px solid gray" }}>
                <Typography style={{ fontWeight: "600" }}>Discount</Typography>
                <Typography
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                  }}
                >
                  <RemoveOutlinedIcon
                    style={{ color: "red", fontSize: "14px" }}
                  />

                  <div
                    style={{
                      width: "70px",
                      height: "max-content",
                      textAlign: "center",
                    }}
                  >
                    <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                    50
                  </div>
                </Typography>
              </AmountDetailsrow>
              <AmountDetailsrow style={{ borderBottom: "1.4px solid gray" }}>
                <Typography style={{ fontWeight: "600" }}>Delivery</Typography>
                <Typography
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    alignItems: "center",
                  }}
                >
                  <AddOutlinedIcon
                    style={{ color: "green", fontSize: "14px" }}
                  />
                  <div
                    style={{
                      width: "70px",
                      height: "max-content",
                      textAlign: "center",
                    }}
                  >
                    <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                    50
                  </div>
                </Typography>
              </AmountDetailsrow>
            </AmountDetailscont>
            <AmountDetailscont>
              <AmountDetailsrow>
                <Typography style={{ fontWeight: "600" }}>Subtotal</Typography>
                <Typography>
                  <CurrencyRupeeIcon style={{ fontSize: "14px" }} />
                  {cart.cartTotalAmount - 50 + 50}
                </Typography>
              </AmountDetailsrow>
            </AmountDetailscont>
          </Amountcont>
        </ContainerCart>
      )}
      <div style={{ width: "100%" }}>
        <RecentViews />
      </div>
    </Container>
  );
};

export default Cart;

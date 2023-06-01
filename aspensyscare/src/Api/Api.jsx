import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const CreateOrder= async(amount)=>{
    return await axios.post('/createOrder',amount)
    .then((res)=>res.data)
}
export const CreateSigneture= async(signeture)=>{
    return await axios.post('/createSigneture',signeture)
    .then((res)=>res.data)
}

// Api for redux store sclices start
export const fatchSizes = createAsyncThunk('size/sizedetails', async() => {
    return await axios
        .post("/size")
        .then((response) => response.data)
});
export const fetchBanner = createAsyncThunk('banner/fetchbanner', async() => {
    return await axios
        .post("/fatch_baner")
        .then((response) => response.data)
});
export const fetchCategory = createAsyncThunk('category/fetchCategory', async() => {
    return await axios
        .post("/fatch_category")
        .then((response) => response.data)
});
export const getAddress= createAsyncThunk('user/address', async(id) => {
    return await axios
        .post("/getAddress",id)
        .then((response) => response.data)
});
export const magnifying = createAsyncThunk('images/magnifying', async(id) => {
    return await axios
        .post("/magnifying",id)
        .then((response) => response.data)
});
export const productData = createAsyncThunk('product/productdetails', async(id) => {
    return await axios
        .post("/productdetails",id)
        .then((response) => response.data)
});
export const AllProducts = createAsyncThunk('products/fetchProducts', async() => {
    return await axios
        .post("/products")
        .then((response) => response.data)
});
export const fetchUsers = createAsyncThunk('user/fetchUsers', async (login) => {
    return await axios
        .post("/login_user", login)
        .then((response) => response.data)
});
export const PushUserCart = async (productdetails,userId) => {
    
    let productId = productdetails.map((item) => item.id);
    let names = productdetails.map((item) => item.name);
    let cartQuantity = productdetails.map((item) => item.cartQuantity);
    let itemSize = productdetails.map((item) => item.itemSize);
    await axios
        .post("/backend_api/usercart", [productId,names,cartQuantity,itemSize,userId])
        .then((req, res) => {
            console.log("done");
        })
        .catch((err) => {
            console.log(err);
        });
};
export const pushUsers = createAsyncThunk('user/login_push_user', async (login) => {
    return await axios
        .post("/login_push_user", login)
        .then((response) => response.data)
});
// Api for redux store sclices end

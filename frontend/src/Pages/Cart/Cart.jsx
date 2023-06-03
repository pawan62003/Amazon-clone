import { useDisclosure, useToast } from "@chakra-ui/react";
import { useState,useContext, useEffect,useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import useRazorpay from 'react-razorpay'
import axios from "axios";
import CartItems from "../../Components/Cart/CartItems.jsx";
import "../../CSS/Cart.css";
import {
  getCartProducts,
  deleteCartProduct,deleteAllCartProduct
} from "../../Redux/Cart/cart.action.js";
import Address from "../../Components/Cart/Address.jsx"

const Cart = () => {
  // const { data } = useSelector((store) => store.cartReducer);
  const [data,setData] = useState([]);

  useEffect(async()=>{
    const res = await axios.get(`https://grumpy-goat-singlet.cyclic.app/cart`, {
      headers: {
         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDY0NzhkZmU2OTlkODgxODE5NWZkZjUiLCJhZG1pbklEIjoiNjQ2NDc4ZGZlNjk5ZDg4MTgxOTVmZGY1IiwiaWF0IjoxNjg1NzI3Njg2fQ.I8CZxLN4FH9dkuOL-HyIpN1d0_Qd8hJwg4zfpoxMVb4' 
        },
    });
    setData(res.data);
  },[])


  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const Razorpay = useRazorpay()
  const navigate = useNavigate();
  const [userAddress,setUserAddress]=useState();
  const [order,setOrder]=useState([]);

  let totalQuantity = data.length

  let price1 = data.map(el => el.price*el.qty);



  let TotalOriginalPrice = price1.reduce((res, sum) => res + sum, 0);
  let totalOriginalPrice = TotalOriginalPrice.toLocaleString("en-IN");

  let price2 = data.map((el) => el.price * el.quantity);
  let TotalCurrentlPrice = price2.reduce((res, sum) => res + sum, 0);
  let totalCurrentlPrice = TotalCurrentlPrice.toLocaleString("en-IN");

  //discount price
  let discountPrice = TotalOriginalPrice - 0;
  discountPrice = discountPrice.toLocaleString("en-IN");

  useEffect(() => {
    if (data.length >= 0) {
      dispatch(getCartProducts());
    }
  }, []);

  const handleSubmit=(obj,arr)=>{
    setUserAddress({...obj})
    onClose()
    handlePayment(TotalOriginalPrice,arr)
  }

  const handleRemove = (id) => {
    dispatch(deleteCartProduct(id)).then(() =>
      toast({
        title: "Item Removed!",
        description: "Item has been removed from the cart.",
        status: "success",
        duration: 6000,
        isClosable: true,
      })
    );
  };

  const handlePayment = useCallback(
    async (totalAmount,arr) => {
      console.log(arr)
      const options = {
        key: 'rzp_test_Q6qLBPFz8pzc23',
        amount: Number(totalAmount*100),
        // amount: totalprice * 100,
        currency: 'INR',
        name: 'Amaze',
        description: 'Payment Getway',
        image: 'https://example.com/your_logo',
        
        handler:  (response)=> {
          console.log("res",response)
          // dispatch(deleteAllCartProduct(arr[0].userID))
          navigate("/")

         
        },
        prefill: {
          name: userAddress?.name,
          contact: userAddress?.phone,
        },
        notes: {
          address: 'Amaze Corporation',
        },
        theme: {
          color:"#F79401",
        },
      }      
      const rzpay = new Razorpay(options);
      rzpay.open()
    },
    [Razorpay]
  )
  return (
    <div className="cart__container__main">
      <div className="cart__container__product">
        <div id="cart__box1">
          <div>
            <p href="/#">Shopping Cart </p>
          </div>
        </div>

      

        <div className="cart__components__container">
          {data.map((item) => (
            <CartItems key={item._id} {...item} handleRemove={handleRemove} />
          ))}
         
        </div>
      </div>
      <div className="cart__container__price">
        <div>PRICE DETAILS</div>
        <div className="cart_price">
          <div>
            <p>Price {totalQuantity} items</p>
            <p>₹ {totalOriginalPrice}</p>
          </div>
          <div>
            <p>Discount</p>
            <p>− ₹ 00</p>
          </div>
          <div>
            <p>Delivery Charges</p>
            <p>Free</p>
          </div>
          <div>
            <p>Total Amount</p>
            <p>₹ {totalOriginalPrice}</p>
          </div>
          <div>
            <p></p>
          </div>
          <div >
            <button onClick={onOpen}>PLACE ORDER</button>
          </div>
        </div>
      </div>
      {isOpen && <Address isOpen={isOpen} onOpen={onOpen} onClose={onClose}  handleSubmit={handleSubmit} data={data}/>}
    </div>
  );
};

export default Cart;

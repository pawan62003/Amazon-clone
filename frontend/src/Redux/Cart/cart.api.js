import axios from "axios"

export const getCartProductsApi=async(url)=>{
    const res = await axios.get(`https://grumpy-goat-singlet.cyclic.app/cart`, {
        headers: {
           token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDY0NzhkZmU2OTlkODgxODE5NWZkZjUiLCJhZG1pbklEIjoiNjQ2NDc4ZGZlNjk5ZDg4MTgxOTVmZGY1IiwiaWF0IjoxNjg1NzI3Njg2fQ.I8CZxLN4FH9dkuOL-HyIpN1d0_Qd8hJwg4zfpoxMVb4' 
          },
      });
      return res.data;
}
export const postCartProductsApi=async(url,payload)=>{
    const res = await axios({
        method: "post",
        url: `${url}`,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: { ...payload },
      })
      return res.data;
}
export const patchCartProductsApi=async(url,payload)=>{
    const res = await axios({
        method: "patch",
        url: `${url}`,
        headers: {
          token: localStorage.getItem("token"),
        },
        data: { ...payload },
      })
      return res.data;
}
export const  deleteCartProductsApi=async(url)=>{
    const res = await axios({
        method: "delete",
        url: `${url}`,
        headers: {
          token: localStorage.getItem("token"),
        }
      })
      return res.data;
}
export default async function Authorized(axios,_url,methodtype,_data){
    let data=null;
    const tokenVerify='1851sd818s8d8a12!@3#4'
    axios
    .get("http://localhost:4000/token")
    .then((response) => response.data)
    .then((response) => {
        localStorage.setItem("token", response.data);
    });
    const options = {
        url: `http://localhost:4000/${_url}`,
        method: methodtype,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            token:
            localStorage.getItem("token").replace(/\"/g, "") + tokenVerify,
        },
        data:_data
    };
    await axios(options)
    .then((response) => response.data)
    .then((response) => {
        data=response.data;
    })
  .catch(function (error) {
      console.log(error);
    });   
    setTimeout(() => {return data;}, 1000);
    return data;
}
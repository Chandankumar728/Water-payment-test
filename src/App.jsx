import axios from "axios";
import usePaynimo from "./hooks/usePayNimo";

export default function App() {
  const {handlePayment}=usePaynimo()

  const afterSuccess=()=>{
    console.log("afterSuccessssssssssssssssssssss")
  }
  const errorFunction=()=>{
    console.log("Error:fasdasdas ")
  }

  const payNow = () => {
    axios.post(
      "https://smartulb.co.in/auth/api/water/paynimo/payment-initiate",
      {applicationId: "33"},
      {
        headers: {
          "Authorization": `Bearer 62194|qxWrW5RZeWb5CPTAsOAnN518ygD1ShFbwz7KjqCu`,
          Accept: 'application/json',
          "API-KEY": "eff41ef6-d430-4887-aa55-9fcf46c72c99"
        }
      }
    )
    .then((res) => {
      console.log("Order ID Generated", res);
      console.log( res?.data?.data?.hash,"Order ID Generated..............")
      if (res.data.status === true) {
        handlePayment(res,afterSuccess,errorFunction);
       
      } else {
       
      }
    })
    .catch((error) => {
      console.error("Error generating Order ID", error);
    
    });
  };
  



  // const handlePayment = async (result) => {
  //   console.log(result?.data?.data?.hash,"dsfghfjgkhlj")
  //   var reqJson = {
  //     "features": {
  //       "enableAbortResponse": true,
  //       "enableExpressPay": true,
  //       "enableInstrumentDeRegistration": true,
  //       "enableMerTxnDetails": true,
  //       "enableNewWindowFlow": true,
  //     },
  //     "consumerData": {
  //       "deviceId": "WEBSH2",    //possible values "WEBSH1" or "WEBSH2"
      
  //       "token": `${result?.data?.data?.hash}`,
  //       // "token":"0b125f92d967e06135a7179d2d0a3a12e246dc0ae2b00ff018ebabbe747a4b5e47b5eb7583ec29ca0bb668348e1e2cd065d60f323943b9130138efba0cf109a9",
  //       // "token":"e91809d366257172df60ece760aa43792a968f07953c38ecfa5230c8c058d409e3cb873981217f4a31195513d882157d04463ab42364d04844accd0532ff4a23",
  //       // "returnUrl": "https://pgproxyuat.in.worldline-solutions.com/linuxsimulator/MerchantResponsePage.jsp",    //merchant response page URL
  //       // "returnUrl": "https://pgproxyuat.in.worldline-solutions.com/linuxsimulator/MerchantResponsePage.jsp",    //merchant response page URL
  //       // "returnUrl": "https://smartulb.co.in/citizen",    //merchant response page URL
  //       "responseHandler": (res)=>{
  //         if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0300") {
  //           // success block
  //           window.localStorage.setItem("successBlock", JSON.stringify(res))
  //           console.log(res, "sucees")
  //         } else if (typeof res != "undefined" && typeof res.paymentMethod != "undefined" && typeof res.paymentMethod.paymentTransaction != "undefined" && typeof res.paymentMethod.paymentTransaction.statusCode != "undefined" && res.paymentMethod.paymentTransaction.statusCode == "0398") {
  //           // initiated block
  //           console.log(res, "initiated")
  //         } else {
  //           // error block
  //           console.log(res, "error block")
  //         }
  //       },
  //       "paymentMode": "all",
  //       "merchantLogoUrl": "https://www.paynimo.com/CompanyDocs/company-logo-vertical.png",  //provided merchant logo will be displayed
  //       "merchantId": result?.data?.data?.marchantId,
  //       // "merchantId": "L3348",
  //       // "merchantId": "L3348",
  //       // 'consumerMobileNo': "6299068110",
  //       // 'consumerEmailId': "abc@gmail.com",
  //       "currency": "INR",
  //       // "consumerId": "c964634",
  //       "consumerId": `${result?.data?.data?.consumerId}`,
  //       // "txnId": result?.data?.data?.txnid,   //Unique merchant transaction ID
  //       "txnId": `${result?.data?.data?.txnid}`,   //Unique merchant transaction ID
  //       "items": [{
  //         "itemId": "first",
  //         "amount": `${result?.data?.data?.amount}`,
  //         "comAmt": "0"
  //       }],
  //       "customStyle": {
  //         "PRIMARY_COLOR_CODE": "#45beaa",   //merchant primary color code
  //         "SECONDARY_COLOR_CODE": "#FFFFFF",   //provide merchant's suitable color code
  //         "BUTTON_COLOR_CODE_1": "#2d8c8c",   //merchant's button background color code
  //         "BUTTON_COLOR_CODE_2": "#FFFFFF"   //provide merchant's suitable color code for button text
  //       }
  //     }
  //   };
  //   $.pnCheckout(reqJson);
  //   if (reqJson.features.enableNewWindowFlow) {
  //     pnCheckoutShared.openNewWindow();
  //   }
  // }

  return (
    <div>

      <button
        onClick={payNow}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold mt-3 ml-4 py-2 px-4 rounded shadow-lg transition-transform transform hover:scale-105"
      >
        Pay Now
      </button>

    </div>

  )
}
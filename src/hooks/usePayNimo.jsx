import React from 'react';

const usePaynimo = () => {
  const handlePayment = async (result, apiFunction, errorFunction) => {
    console.log(result?.data?.data?.hash, 'dsfghfjgkhlj');
    var reqJson = {
      features: {
        enableAbortResponse: true,
        enableExpressPay: true,
        enableInstrumentDeRegistration: true,
        enableMerTxnDetails: true,
        enableNewWindowFlow: true
      },
      consumerData: {
        deviceId: 'WEBSH2', //possible values "WEBSH1" or "WEBSH2"
        token: `${result?.data?.data?.hash}`,
        responseHandler: (res) => {
          if (
            typeof res != 'undefined' &&
            typeof res.paymentMethod != 'undefined' &&
            typeof res.paymentMethod.paymentTransaction != 'undefined' &&
            typeof res.paymentMethod.paymentTransaction.statusCode !=
              'undefined' &&
            res.paymentMethod.paymentTransaction.statusCode == '0300'
          ) {
            // success block
            apiFunction();
            window.localStorage.setItem('successBlock', JSON.stringify(res));
            console.log(res, 'sucees');
          } else if (
            typeof res != 'undefined' &&
            typeof res.paymentMethod != 'undefined' &&
            typeof res.paymentMethod.paymentTransaction != 'undefined' &&
            typeof res.paymentMethod.paymentTransaction.statusCode !=
              'undefined' &&
            res.paymentMethod.paymentTransaction.statusCode == '0398'
          ) {
            // initiated block
            console.log(res, 'initiated');
          } else {
            // error block
            errorFunction()
            console.log(res, 'error block');
          }
        },
        paymentMode: 'all',
        merchantLogoUrl:
          'https://www.paynimo.com/CompanyDocs/company-logo-vertical.png', //provided merchant logo will be displayed
        merchantId: result?.data?.data?.marchantId,
        // 'consumerMobileNo': "6299068110",
        // 'consumerEmailId': "abc@gmail.com",
        currency: 'INR',
        consumerId: `${result?.data?.data?.consumerId}`, //Unique merchant transaction ID
        txnId: `${result?.data?.data?.txnid}`, //Unique merchant transaction ID
        items: [
          {
            itemId: 'first',
            amount: `${result?.data?.data?.amount}`,
            comAmt: '0'
          }
        ],
        customStyle: {
          PRIMARY_COLOR_CODE: '#45beaa', //merchant primary color code
          SECONDARY_COLOR_CODE: '#FFFFFF', //provide merchant's suitable color code
          BUTTON_COLOR_CODE_1: '#2d8c8c', //merchant's button background color code
          BUTTON_COLOR_CODE_2: '#FFFFFF' //provide merchant's suitable color code for button text
        }
      }
    };
    $.pnCheckout(reqJson);
    if (reqJson.features.enableNewWindowFlow) {
      pnCheckoutShared.openNewWindow();
    }
  };

  return { handlePayment };
};

export default usePaynimo;
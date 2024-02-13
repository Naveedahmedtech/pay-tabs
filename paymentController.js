const { v4: uuidv4 } = require("uuid");
const axios = require("axios");


const oneTimePayment = async (req, res) => {
  const { description, amount } = req.body;
  44;
  const callbackUrl = `${process.env.DUMMY_LIVE}/payment/callback`;

  //   const returnUrl = `${process.env.LIVE_SERVER}/payment/return`;
  try {
    const response = await axios.post(
      "https://secure-global.paytabs.com/payment/request",
      {
        profile_id: process.env.PAYTAB_PROFILE_ID,
        tran_type: "sale",
        tran_class: "ecom",
        cart_id: uuidv4(),
        cart_description: description || "DEFAULT",
        cart_currency: "PKR",
        cart_amount: amount || 10000,
        callback: callbackUrl,
        // return: returnUrl,
        hide_shipping: true,
        show_save_card: false,
      },
      {
        headers: {
          Authorization: process.env.PAYTAB_SERVER_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // return res.redirect(response?.data?.redirect_url);
    return res.status(200).json({
      status: true,
      result: { redirectUrl: response?.data?.redirect_url },
    });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json("Internal Server Error");
  }
};

const paymentCallback = (req, res) => {
  try {
    return res.status(200).json({ body: req.body });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json("Internal Server Error");
  }
};

module.exports = {
  oneTimePayment,
  paymentCallback,
};

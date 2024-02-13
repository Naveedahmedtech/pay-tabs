### Project Setup

clone the project

```
  git clone git@github.com:Naveedahmedtech/pay-tabs.git
```

install dependencies

```
 npm i
```

start the server

```
npm run start
```

# PayTabs Payment Integration

This project includes the implementation of a one-time payment process using PayTabs. The code consists of two main functions: `oneTimePayment` and `paymentCallback`, which are designed to handle payment requests and callbacks, respectively.

## oneTimePayment Function

The `oneTimePayment` function initiates a payment request to PayTabs. It requires a description and an amount, which are retrieved from the request body. This function generates a unique `cart_id` using the `uuidv4` function, constructs a payment request with necessary details (including the transaction type, currency, and amount), and sends this request to PayTabs using the `axios` HTTP client.

### Callback and Return URLs

- **Callback URL**: This is a server-side endpoint (`${process.env.DUMMY_LIVE}/payment/callback`) where PayTabs sends the transaction's result. The callback URL is used by PayTabs to notify the server about the payment outcome (success or failure) without any user interaction. It's crucial for processing the payment result and updating the payment status in the server's database or performing other backend logic based on the payment outcome.

- **Return URL**: Though commented out in the provided code, the return URL (`${process.env.LIVE_SERVER}/payment/return`) is typically a client-side endpoint where users are redirected after completing or cancelling a payment on the PayTabs payment page. This URL is useful for providing users with a payment summary, confirmation message, or further instructions based on the payment result. It enhances the user experience by offering feedback on the payment process. If a return URL is not provided, PayTabs defaults to using its own page to notify the user of the payment outcome. This means that the user experience will be handled by PayTabs, and users may not be redirected back to your application's custom page after the payment process.

The function attempts to post the payment request to PayTabs, and upon success, it returns a JSON response to the client with a `redirectUrl`, which is the URL to the PayTabs payment page where the user completes the payment.

## Handling Absence of Return URL

It's important to note that if you do not provide a return URL, PayTabs will handle the final step of the payment process by redirecting the user to a PayTabs-owned page. This page will inform the user of the payment outcome. While this ensures the user is informed, integrating a custom return URL allows for a more seamless and branded user experience, directing users back to your application with personalized feedback based on the payment result.


## paymentCallback Function

The `paymentCallback` function is designed to handle the callback from PayTabs. It simply returns the request body as a JSON response, which includes details about the payment transaction. This function can be expanded to include logic for processing the payment result, such as updating the order status in the database.

## Usage

To use these functions, ensure the following environment variables are set:

- `PAYTAB_PROFILE_ID`: Your PayTabs profile ID.
- `PAYTAB_SERVER_KEY`: Your PayTabs server key for authorization.
- `DUMMY_LIVE`: The base URL for your callback endpoint. (must start with https)

## Integration Steps

1. Set up the required environment variables.
2. Implement the `oneTimePayment` function to initiate payment requests.
3. Implement the `paymentCallback` function to handle callbacks from PayTabs.
4. Ensure your server is publicly accessible for PayTabs to send callbacks to the specified URL.

## Conclusion

This implementation provides a basic setup for integrating PayTabs payment services into your application, focusing on one-time payments. The use of callback and return URLs is crucial for handling payment outcomes and enhancing user experience.


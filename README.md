# IOI Gaming

![IOI HomePage](https://elisv.com/ioi.png)

IOI (Pronounced Eye-O-Eye) is a fictional e-commerce platform that was built for gaming enthusiast to hunt for deals. As a shop owner you are able to managed everything from the admin area including adding products, view orders, and much more. The project was built using mern.

## Admin Area

### 1. Dashboard

![Dashboard](https://user-images.githubusercontent.com/69530035/132143117-39ee2945-0375-434b-9453-070481e0bcee.gif)
Store owners have a dashboard where they can track their weekly orders, revenue, profit margin, and order average.

### 2. Orders

![Orders](https://user-images.githubusercontent.com/69530035/132143814-9b59422a-637e-44e7-bbd0-22033f091da5.gif)
View order details such as shipping and bill address, the items that were purchased as well as their price per item, quantity and total.

### 3. Categories

![Categories](https://github.com/elisvcodes/IOIGaming/blob/master/gifs/categories.gif)
Admin has the ability to create, update and delete categories as well as setting categories as featured so that they are shown on the homepage.

### 4. Products

![Products](https://user-images.githubusercontent.com/69530035/132146700-721cadfe-37c1-4619-8bd4-cf89c0655d61.gif)
Create, update and delete products. Upload as many images per product as you want as well have the ability to select multiple categories per product.

### 5. Pages

![Products](https://user-images.githubusercontent.com/69530035/132147339-1fd05baf-1831-4897-9b4b-17495fb59dff.gif)
Create unique pages that can be retrieved from the api. Retrievable data includes hero image, link to where the hero image is pointing to as well as page description.

## Client Area

### 1. Searching & Filtering

![searching](https://github.com/elisvcodes/IOIGaming/blob/master/gifs/searching.gif)

Website visitors have the ability to search for different products as well as filter based on different categories and price ranges.

### 2. Adding items to cart
![cart](https://github.com/elisvcodes/IOIGaming/blob/master/gifs/cart.gif)

When you find something that catches your eye, you can add that said item into the cart and increment/decrement how many quantities of the item you want to buy.

### 3. Checkout
![checkout](https://github.com/elisvcodes/IOIGaming/blob/master/gifs/checkout.gif)

An e-commerce platform wouldn't be complete without a secure way to process payments. That's why I chose to use Stripe as my middleman that will process the payments. All orders are viable from the admin area. Also, each order is identified by a unique order number, which I think is very useful and cool to have.

## Built With

For this project, I chose to work with the mern stack and material UI.

## Known bugs/Future updates

- The graph in the admin area needs to be updated to reflect each new week. For now, it seems to show all orders that are placed on any given weekday.
- Not a bug, but a feature that will be added is a way to switch orders as shipped.

## Installation & Usage

Before running this project locally, make sure to visit each folder and run the following command from the terminal:

```
npm install
```

Once all of the required packages are installed, visit each folder once again from the terminal and run the following command inside the server:

```
node app.js
```

inside the client/admin folder run:

```
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Contact

Project Link: [https://ioi.elisv.com/](https://ioi.elisv.com/)

## License

###### [MIT](https://choosealicense.com/licenses/mit/)

# Next.js React Project

This is a simple React application built with Next.js. It consists of three pages:

- **Login Page**: A page for user authentication.
- **Product List Page**: Displays a list of products.
- **Product Detail Page**: Shows detailed information about a specific product.

## Prerequisites

Before starting the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Setup

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Project

To run the project in development mode:

```bash
npm run dev
```

## Running the Unit Tests

Not all unit tests have been written yet due to limited time. Only a unit test example has been created to cover the complete middleware code.

```bash
npm run test
```

## Testing Instructions

1. **Mock User**:  
   A mock user is available for testing purposes. You can log in using the following credentials:

   - **Username**: `user`
   - **Password**: `user123`

2. **Product List**:  
   After logging in, you will be redirected to the product list page where a list of products will be displayed.

3. **Product Detail**:  
   Clicking on any product will take you to the product detail page for that specific item. You will be able to see detailed information about the product, including its description, price, and image.

4. **Tabs on Product Detail Page**:  
   The product detail page consists of two tabs:

   - **Product Details Tab**: Displays the detailed information about the product.
   - **Comments Tab**: Displays a list of comments made by users for that product.

5. **Adding Comments**:  
   You can add comments to a product. After submitting your comment:

   - Your comment will appear at the top of the list in the Comments Tab.
   - The mock data for that product will be updated to reflect the new average rating and total comment count.
   - The updated values (average rating and total comment count) will also be reflected in the product detail page via state management.
   - The product rating on the product list page will be updated as well when you return there, ensuring that the latest rating is displayed.

6. **Slow Network Simulation**:
   The responses from the service endpoints are deliberately delayed by 1 seconds using setTimeout.
   The purpose of this is to simulate slow networks, allowing the skeleton, loading, and other UI elements to be more prominently displayed on the screen.

7. **Notes for reviewer**:
   Comments starting with "Note:" have been added to explain why this approach was chosen and provide insights into the methods used. It will be helpful to read these notes while reviewing the code.

8. **ENV**:
   I specifically didn't add the .env file to .gitignore so that it can be tested with the values inside it. It only contains JWT_SECRET, which is used for generating and validating the JWT token.

9. **Unit Tests**:
   Not all unit tests have been written yet due to limited time. Only a unit test example has been created to cover the complete middleware code.

## Mock Data Updates

- The mock product data used for both the product list and the product detail page is updated dynamically:
  - **Average Rating**: After a comment is added, the average rating is recalculated.
  - **Total Comments Count**: The total number of comments is incremented.
  - These changes are reflected in the UI as well as in the mock data state, ensuring consistency across pages.

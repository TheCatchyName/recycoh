import { Spinner, Footer } from "flowbite-react";
import blogReducer from "../reducers/blogReducer";
import users from "../services/users";
import Blog from "./Blog";
import Product from "./Product"
import { BarChart } from '@mui/x-charts/BarChart';

const UserView = ({ userInView }) => {
  if (userInView === undefined) {
    return <Spinner/>;
  }
  const totalVotes = userInView.blogs
    .map((blog) => blog.likes)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    const { recycles, products } = userInView;
    const chartData = {};
    const chartSetting = {
      yAxis: [
        {
          label: 'Count',
        },
      ],
      height: 300,
    };
  
    recycles.forEach((recycle) => {
      const { dateCreated, product, quantity } = recycle;
      const parsedDate = new Date(dateCreated);
      const formattedDate = parsedDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });
    
      // Initialize all components to '0' for each date
      if (!chartData[formattedDate]) {
        chartData[formattedDate] = {};
        products.forEach((product) => {
          product.components.forEach((component) => {
            const [stack, label] = component.split(' - ');
            chartData[formattedDate][label] = 0;
          });
        });
      }
    
      // Increment the quantities for the respective components
      const productDetails = products.find((p) => p.id === product);
      if (productDetails) {
        productDetails.components.forEach((component) => {
          const [stack, label] = component.split(' - ');
          const parsedQuantity = parseInt(quantity, 10); // Parsing quantity as an integer
    
          chartData[formattedDate][label] += parsedQuantity;
        });
      }
    });
    
    console.log(chartData);
    const formattedData = [];
  
    Object.keys(chartData).forEach((formattedDate) => {
      const entry = chartData[formattedDate];
      const dataEntry = {};
  
      Object.keys(entry).forEach((key) => {
        // Ensure the value is a number before pushing it to formattedData
        const quantity = parseInt(entry[key], 10);
    
        // Check if it's a valid number before adding to the dataEntry
        if (!isNaN(quantity)) {
          dataEntry[key] = quantity;
        }
      });
      dataEntry["xDate"] = formattedDate
      formattedData.push(dataEntry);
    });

    
    const sortedFormattedData = formattedData.sort((a, b) => {
      const dateA = new Date(a.xDate);
      const dateB = new Date(b.xDate);
      return dateA - dateB;
    });
  
    let components = new Set();
  
    recycles.forEach((recycle) => {
      const { product } = recycle;
      const productDetails = products.find((p) => p.id === product);
      if (productDetails) {
        productDetails.components.forEach((component) => {
          components.add(component);
        });
      }
    });
  
    const series = Array.from(components).map((component) => {
      const [stack, label] = component.split(' - ');
      return {
        dataKey: label,
        label: label,
        stack: stack,
      };
    });
  
  return (
    <section class="bg-white dark:bg-gray-900 flex flex-col min-h-screen">
      <div class="py-20 px-0 mx-auto w-2/3	 lg:py-20">
        <h2 class="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white">
          u/{userInView.username}
        </h2>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Items recycled by {userInView.username}
        </h2>

        <BarChart
          dataset={sortedFormattedData}
          xAxis={[{ scaleType: 'band', dataKey: 'xDate' }]}
          series={series}
          {...chartSetting}
        />
        <h2 class="mb-8 items-center text-lg font-semibold text-gray-900 dark:text-white">
          {totalVotes} likes
        </h2>
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Posts added by {userInView.username}
        </h2>
        {userInView.blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Products added by {userInView.username}
        </h2>
        {userInView.products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default UserView;

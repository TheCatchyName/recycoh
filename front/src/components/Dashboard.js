import BlogFooter from "./BlogFooter";
const Dashboard = () => {
    const totalRecycled = 1000; // Replace with your data
  const categories = [
    { name: 'Category 1', percent: 20 }, // Replace with your data
    { name: 'Category 2', percent: 30 }, // Replace with your data
    { name: 'Category 3', percent: 15 }, // Replace with your data
  ];
  return (
            <div id="app">
            <header className="bg-teal-800 text-white p-4">
            <h2 className="text-left text-2xl">Your Waste And Recycling At A Glance.</h2>
            </header>
            <div className="bg-teal-700" style={{ marginTop: '0px' }}>
            
            </div>

            <div className="user-profile flex mt-20 mr-4 justify-end">
            <img src="./img/profile_picture.jpeg" alt="User Avatar" className="w-20 h-20 rounded-full mr-4" />
            <div>
                <p className="text-gray-600 text-lg">Good Morning,</p>
                <p className="text-2xl">
                <strong>John Doe</strong>
                </p>
            </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                <div className="bar-graph flex justify-center items-end">
                        {categories.map((category) => (
                <div className="bar w-12 text-center" key={category.name}>
                <div className={`bar-inner h-${category.percent} bg-teal-400 border-2 border-teal-600`}></div>
                    <p className="font-sans">{category.name}</p>
            </div>
          ))}
        </div>
      </div>

            <main className="flex justify-center items-center h-screen">
            <div className="container bg-white p-4 rounded-lg shadow-lg text-center w-80 md:w-96">
                <h2 className="text-teal-500 text-2xl">Recycling Categories</h2>
                <ul className="category-list list-none flex flex-wrap justify-center">
                {categories.map((category) => (
                    <li key={category.name} className="category-item m-4 p-4 bg-teal-500 text-white rounded-lg flex items-center text-xl">
                    <span className="category-name mr-2">
                        {category.name}:
                    </span>
                    <span className="category-percent font-bold">
                        {category.percent}%
                    </span>
                    </li>
                ))}
                </ul>
            </div>
            </main>
        </div>
     
     
    //  this
  );
};

export default Dashboard;

import { Outlet, useNavigation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default MainLayout;

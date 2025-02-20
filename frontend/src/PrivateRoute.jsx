import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // ✅ Import PropTypes

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login-retail" />; // Updated to /login-retail for consistency
};

// ✅ Prop validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

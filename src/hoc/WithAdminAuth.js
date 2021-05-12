import UseAdminAuth from '../customHooks/UseAdminAuth';

const WithAdminAuth = props => UseAdminAuth(props) && props.children;

export default WithAdminAuth
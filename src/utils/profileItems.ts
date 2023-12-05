import {
  LogoutOutlined,
  SafetyOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import LogoutComponent from '@components/profile/logout';
import OrdersComponent from '@components/profile/orders';
import SecurityComponent from '@components/profile/security';
import UserInfoComponent from '@components/profile/userinfo';

export const profileLinks = [
  { icon: UserOutlined, label: 'Account', component: UserInfoComponent },
  { icon: SafetyOutlined, label: 'Security', component: SecurityComponent },
  { icon: ShoppingCartOutlined, label: 'Orders', component: OrdersComponent },
  { icon: LogoutOutlined, label: 'Logout', component: LogoutComponent },
];

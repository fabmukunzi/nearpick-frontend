import React, { useState } from 'react';
import { Button, Card, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '@store/reducers/users';
import { useRouter } from 'next/router';

const LogoutComponent = () => {
  const { Text } = Typography;
  const { push } = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(undefined));
    push('/auth/login');
  };

  return (
    <Card className="border-none min-h-[100%]">
      <div className="flex flex-col gap-4 justify-center items-center">
        <Text className="">Are you sure you want to logout?</Text>
        <div className="w-32">
          <Button className="w-32 bg-primary" onClick={handleLogout}>
            Logout
          </Button>
          {/* <Button>Cancel</Button> */}
        </div>
      </div>
    </Card>
  );
};

export default LogoutComponent;

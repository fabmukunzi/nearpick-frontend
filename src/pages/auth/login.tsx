import React from 'react';
import Login from '@components/auth/login';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center ">
      <Head>
        <title>Izimart | Login</title>
      </Head>
      <Login />
    </div>
  );
};

export default LoginPage;

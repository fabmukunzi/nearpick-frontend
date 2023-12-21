import React from 'react';
import Signup from '@components/auth/register';
import Head from 'next/head';

const SignupPage = () => {
  return (
    <div className="w-screen flex justify-center items-center">
      <Head>
        <title>Izimart | Signup</title>
      </Head>
      <Signup />
    </div>
  );
};

export default SignupPage;

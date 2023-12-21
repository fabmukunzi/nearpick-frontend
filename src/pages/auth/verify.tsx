
import React from 'react';
import Verify from '@components/auth/verifyAuth';
import Head from 'next/head';

const VerifyPage= () => {
  return (
    <div className='flex justify-center items-center '>
      <Head>
        <title>Izimart | Verify</title>
      </Head>
        <Verify />
    </div>
  );
};

export default VerifyPage;

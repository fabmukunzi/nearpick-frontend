import { useVerifyEmailQuery } from '@store/actions/auth';
import { Button, Result, Spin } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const VerifyEmailPage = () => {
  const { query } = useRouter();
  const token = query.token as string;
  const { data, isLoading } = useVerifyEmailQuery(
    { token: token },
    { skip: !query.token }
  );
  return (
    <div className="flex justify-center items-center min-h-[50%]">
      <Head>
        <title>Izimart | verify email</title>
      </Head>
      {isLoading && (
        <div className="flex justify-center items-center flex-col min-h-[100%]">
          <Spin />
          <p>Verifying your account</p>
        </div>
      )}
      {!data && !isLoading && (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Button
              className="bg-primary"
              onClick={() => location.reload()}
              type="primary"
            >
              Try Again
            </Button>
          }
        />
      )}
      {data && (
        <Result
          status="success"
          // title="200"
          subTitle="Your account has been verified."
          extra={
            <Button
              className="bg-primary"
              onClick={() => (location.href = '/auth/login')}
              type="primary"
            >
              Go to login
            </Button>
          }
        />
      )}
    </div>
  );
};

export default VerifyEmailPage;

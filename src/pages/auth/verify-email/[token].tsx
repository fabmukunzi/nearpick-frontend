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
    <Spin
      spinning={isLoading}
      size="large"
      tip="Verifying your account"
      wrapperClassName={`${isLoading ? 'h-screen' : ''}`}
    >
      <div className="flex justify-center items-center">
        <Head>
          <title>Izimart | verify email</title>
        </Head>
        {data &&
          data?.message !== 'Your account has verified successfully' &&
          !isLoading && (
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
    </Spin>
  );
};

export default VerifyEmailPage;

import { Card, Button, Typography } from 'antd';
import { useRouter } from 'next/router';

export default function Custom404() {
  const { Title } = Typography;
  const router = useRouter();
  return (
    <Card className="flex items-center flex-col h-screen justify-center font-bold text-3xl">
      <Title>Page Not Found</Title>
      <Button
        onClick={() => {
          router.push('/');
        }}
      >
        Go Home
      </Button>
    </Card>
  );
}

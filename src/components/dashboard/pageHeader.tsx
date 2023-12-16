import { Breadcrumb, Button, Card, Typography } from 'antd';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  icon?: React.ReactNode;
  title?: string;
  action?: () => void;
  actionLabel?: string;
  extra?: React.ReactNode;
}

const { Text } = Typography;

const PageHeader: FC<Props> = ({ icon, title, action, actionLabel, extra }) => {
  const { push, route } = useRouter();
  return (
    <div className="">
      {/* <Breadcrumb
        items={[
          {
            href: '#',
            // onClick: () => push(routes.analytics.url),
            title: (
              <div className="flex items-center gap-2">
                <span>{route?.split('/')[1]}</span>
              </div>
            ),
          },
          {
            title: <Text className="capitalize">{route?.split('/')[2]}</Text>,
          },
        ]}
      /> */}
      {title && (
        <Card className="bg-gray-50 border-primary" size="small">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <Text className="text-lg md:text-xl font-semibold">{title}</Text>
            <div className="flex flex-wrap items-center gap-5">
              {extra}
              {action && (
                <Button className='bg-primary' onClick={action} icon={icon}>
                  {actionLabel}
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PageHeader;

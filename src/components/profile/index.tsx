import { useWindowResize } from '@utils/hooks/useWindowResize';
import { profileLinks } from '@utils/profileItems';
import { Button, Card, Typography } from 'antd';
import { useState } from 'react';

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(profileLinks[0]);
  const { width } = useWindowResize();
  return (
    <div className="flex md:mx-36 xxs:px-page gap-4 xxs:flex-col md:flex-row mx-auto w-full">
      <Card className="border-primary md:w-[25%] xxs:mt-5 md:mt-0">
        <div className="flex md:flex-col gap-4">
          {profileLinks.map((item, index) => (
            <Button
              key={index}
              icon={<item.icon />}
              onClick={() => setActiveTab(item)}
              className={`border w-28 md:w-32 transition-all text-base ${
                item.label === activeTab.label
                  ? 'bg-primary hover:text-white'
                  : 'bg-white text-primary border-primary'
              }`}
            >
              {width >= 768 && item.label}
            </Button>
          ))}
        </div>
      </Card>
      <Card className="md:w-3/5 border-primary min-h-[100%]" size="small">
        {<activeTab.component />}
      </Card>
    </div>
  );
};

export default ProfileComponent;

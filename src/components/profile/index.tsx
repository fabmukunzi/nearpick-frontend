import { profileLinks } from '@utils/profileItems';
import { Button, Card } from 'antd';
import { useState } from 'react';

const ProfileComponent = () => {
  const [activeTab, setActiveTab] = useState(profileLinks[0]);
  return (
    <div className="flex mx-36 gap-4">
      <Card className="border-primary" style={{ width: '25%' }}>
        <div className="flex flex-col gap-4">
          {profileLinks.map((item, index) => (
            <Button
              key={index}
              icon={<item.icon />}
              onClick={() => setActiveTab(item)}
              className={`border w-32 transition-all text-base ${
                item.label === activeTab.label
                  ? 'bg-primary hover:text-white'
                  : 'bg-white text-primary border-primary'
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </Card>
      <Card className="w-3/4 border-primary min-h-[100%]">
        {<activeTab.component />}
      </Card>
    </div>
  );
};

export default ProfileComponent;

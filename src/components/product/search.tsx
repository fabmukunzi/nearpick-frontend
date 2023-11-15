import React, { useState } from 'react';
import { Button, Input, Modal } from 'antd';

const SearchModel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      // title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Input className="p-4" />
    </Modal>
  );
};

export default SearchModel;

import React, { memo, useCallback, useEffect } from 'react';

import { country, site } from '@/data';

import { Address, Site, SiteStatus } from '@/common/models';

import { SiteForm } from '../Shared';

interface CreateSiteProps {
  onClose: () => void;
}

const Create = ({ onClose }: CreateSiteProps) => {
  const { saveSite } = site.actions();
  const { getCountries } = country.actions();

  const handleCreate = useCallback(
    (values: Site) => {
      saveSite(values);
      onClose();
    },
    [onClose, saveSite],
  );

  useEffect(() => {
    getCountries();
  }, [getCountries]);

  return (
    <SiteForm
      initialValues={{
        id: 0,
        name: '',
        description: '',
        floor: 0,
        status: 'ACTIVE' as SiteStatus,
        addressId: 0,
        address: {} as Address,
        createdAt: new Date(),
        updatedAt: new Date(),
      }}
      onSubmit={handleCreate}
      onCancel={onClose}
    />
  );
};

export default memo(Create);

import { useFetchWrapper } from '@/hooks';

import { paths } from '@/common/constants';
import { PageOptions, SiteFilter } from '@/common/interfaces';
import { Site } from '@/common/models';

const useSiteServices = () => {
  const api = useFetchWrapper();

  const getSitesOverview = () => api.get(paths.API.SITES_OVERVIEW, {});

  const getSites = (pageOptions?: PageOptions, filters?: SiteFilter) =>
    api.get(paths.API.SITES, {
      searchParams: {
        crudQuery: JSON.stringify({
          where: {
            status: filters?.status,
          },
          page: pageOptions?.page,
          pageSize: pageOptions?.pageSize,
          orderBy: pageOptions?.orderBy,
        }),
      },
    });

  const getSite = (id: string) =>
    api.get(paths.build(paths.API.SITES_ID, id), {
      searchParams: {
        crudQuery: JSON.stringify({}),
      },
    });

  const createOrUpdateSite = (data: Site) =>
    api.post(paths.API.SITES, { json: data });

  const removeSite = (id: number) =>
    api.delete(paths.build(paths.API.SITES_ID, id.toString()), {});

  const changeImage = (image: File, siteId: number) => {
    const formData = new FormData();
    formData.append('file', image);
    return api.post(
      paths.build(paths.API.SITES_ID_CHANGE_IMAGE, siteId.toString()),
      { body: formData },
    );
  };

  return {
    changeImage,
    createOrUpdateSite,
    getSite,
    getSites,
    getSitesOverview,
    removeSite,
  };
};

export default useSiteServices;

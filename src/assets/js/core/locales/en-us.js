import dotize from 'dotize';

export const rawMessages = {
  app: {
    addNewBrand: 'Add New brand',
    addNewCoupon: 'Add New Coupon',
    createImageCampaign: 'Create Image Campaign',
    createMagazineCampaign: 'Create Magazine Campaign',
    createVideoCampaign: 'Create Video Campaign',
    next: 'Next',
    back: 'Back',
    save: 'Save',
    del: 'Delete',
    upload: 'Upload',
    searchCampaigns: 'Search Campaigns',

    campaignTypes: {
      image: 'Image',
      magazine: 'Magazine',
      video: 'Video'
    },

    menu: {
      createCampaign: 'Create Campaign',
      dashboard: 'Dashboard',
      catalogue: 'Manage',
      analytics: 'Analytics',
      help: 'Help',
      brands: 'Brands',
      campaigns: 'Campaigns',
      coupons: 'Coupons'
    },
    analytics: {
      header: 'Analytics',
      headerSelectCampaign: 'Analytics / Select Campaign'
    },
    campaigns: {
      headerSelectBrand: 'Select a Brand',
      headerChooseCampaignType: 'Choose Campaign Type',
      headerCreateCampaign: 'Create Campaign',
      campaignDetails: 'Campaign Details',
    },
    catalogue: {
      brands: {
        header: 'Manage / Brands'
      },
      campaigns: {
        header: 'Manage / Campaigns'
      },
      coupons: {
        header: 'Manage / Coupons'
      }
    }
  }
}

export default {
  locales: 'en-US',
  messages: dotize.convert(rawMessages)
};
export const strict = false;

export const state = () => {
  return {
    navVisible: true,
    previewDisclaimer: true,
  };
};

export const getters = {
  NAV_VISIBLE: (s: { navVisible: any }) => s.navVisible,
  PREVIEW_DISCLAIMER: (s: any) => s.previewDisclaimer,
};

export const mutations = {
  SET_NAV_VISIBLE: (s: { navVisible: any }, payload: any) => {
    s.navVisible = payload;
  },
  SET_PREVIEW_DISCLAIMER: (s: any, payload: any) => {
    s.previewDisclaimer = payload;
  },
};

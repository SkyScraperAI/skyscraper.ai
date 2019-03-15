export const state = () => {
  return {
    navVisible: true,
  };
};

export const getters = {
  NAV_VISIBLE: (s: { navVisible: any; }) => s.navVisible
};

export const mutations = {
  SET_NAV_VISIBLE: (s: { navVisible: any; }, payload: any) => {
    s.navVisible = payload;
  },
};

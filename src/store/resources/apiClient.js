import http from "./http";
import urls from "./urls";

const apiClient = {
  auth: {
    signup(payload) {
      return http.post(urls.signup, payload);
    },
    login(payload) {
      return http.post(urls.login, payload);
    },
    logout() {
      return http.get(urls.logout);
    },
  },
  client_profile: {
    get_client_profile() {
      return http.get(urls.client_profile);
    },
    get_industry_sectors() {
      return http.get(urls.industry_sectors);
    },
    create_client_profile(payload) {
      return http.post(urls.client_profile, payload);
    },
  },
  profile_threat: {
    profile_threat(payload) {
      return http.post(urls.profile_threat, payload);
    },
  },
  admin: {
    upload_threat_catalog_excel(payload) {
      return http.post(urls.upload_threat_catalog_excel, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    upload_risk_excel(payload) {
      return http.post(urls.upload_risk_excel, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
  },
};

export default apiClient;

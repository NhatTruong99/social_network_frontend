import rootInstance from "./rootInstance";
import TokenService from "../token.service";
import { refreshToken } from "../../redux/actions/AuthActions";

const setup = (store) => {
    rootInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["Authorization"] = 'Bearer ' + token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const { dispatch } = store;
    rootInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/auth/signin" && err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        const rs = await rootInstance.post("/auth/refreshtoken", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });

                        const { accessToken } = rs.data;

                        dispatch(refreshToken(accessToken));
                        TokenService.updateLocalAccessToken(accessToken);

                        return rootInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};

export default setup;
interface animeConfig {
  sankadonghub: {
    siteName: string;
    description: string;
    logo: string;
    favicon: string;
    image: string;
  };

  sankadonghubApi: {
    apiUrl: string;
    baseUrlPath: string;
  };
}

const animeConfig: animeConfig = {
  sankadonghub: {
    siteName: "XianStream",
    description: "Nonton donghua gratis ga pake karcis hanya di XianStream",
    logo: "/images/logo.png",
    favicon: "/favicon.png",
    image: "/images/sankadonghub.jpg",
  },

  sankadonghubApi: {
    apiUrl: "https://www.sankavollerei.com",
    baseUrlPath: "/anime/donghua",
  },
};

export default animeConfig;

import axios from "axios";

const fifaCM = axios.create({
    baseURL: "https://www.fifacm.com",
});

fifaCM.defaults.headers.common["Cookie"] = {
    statsui: "career",
    cf_clearance:
        "SNtszygXTzDCWCDywK87W4pA6xM8W_M6zCMwbb3GbNY-1697977317-0-1-63bda67a.f5083c78.34bcf99a-0.2.1697977317",
    theme: "light",
    currency: "usd",
    PHPSESSID: "ncm30cjq0j1rbvd0a5sa5h7d9q",
};
fifaCM.defaults.headers.common["Accept"] =
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8";
fifaCM.defaults.headers.common["Accept-Encoding"] = "gzip, deflate, br";
fifaCM.defaults.headers.common["Accept-Language"] =
    "tr-TR,tr;q=0.8,en-US;q=0.5,en;q=0.3";
fifaCM.defaults.headers.common["Connection"] = "keep-alive";
fifaCM.defaults.headers.common["Host"] = "www.fifacm.com";
fifaCM.defaults.headers.common["User-Agent"] =
    "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/118.0";
fifaCM.defaults.headers.common["Sec-Fetch-Dest"] = "document";
fifaCM.defaults.headers.common["Sec-Fetch-Mode"] = "navigate";
fifaCM.defaults.headers.common["Sec-Fetch-Site"] = "none";
fifaCM.defaults.headers.common["Sec-Fetch-User"] = "?1";
fifaCM.defaults.headers.common["TE"] = "trailers";
fifaCM.defaults.headers.common["Upgrade-Insecure-Requests"] = "1";

export default fifaCM;

/**
 * TMDB API Cache Layer
 * Cache kết quả API vào sessionStorage để tránh gọi lại API khi user
 * navigate qua lại giữa các trang trong cùng một session.
 */

const CACHE_PREFIX = "cineverse_tmdb_";
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 phút

/**
 * Lấy cache từ sessionStorage
 */
function getCache(key) {
    try {
        const raw = sessionStorage.getItem(CACHE_PREFIX + key);
        if (!raw) return null;
        const { data, expiry } = JSON.parse(raw);
        if (Date.now() > expiry) {
            sessionStorage.removeItem(CACHE_PREFIX + key);
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

/**
 * Lưu cache vào sessionStorage
 */
function setCache(key, data) {
    try {
        sessionStorage.setItem(
            CACHE_PREFIX + key,
            JSON.stringify({ data, expiry: Date.now() + CACHE_TTL_MS })
        );
    } catch {
        // sessionStorage đầy hoặc private mode, bỏ qua
    }
}

/**
 * Map để lưu pending requests (tránh gọi nhiều request cùng URL cùng lúc)
 */
const pending = new Map();

/**
 * Wrapper cho axios instance - tự động cache GET requests
 * @param {import('axios').AxiosInstance} axiosInstance
 * @param {string} url
 * @returns {Promise<import('axios').AxiosResponse>}
 */
export async function cachedGet(axiosInstance, url) {
    // 1. Kiểm tra cache
    const cached = getCache(url);
    if (cached) {
        return { data: cached };
    }

    // 2. Nếu đang có request cùng URL, dùng chung promise (request deduplication)
    if (pending.has(url)) {
        return pending.get(url);
    }

    // 3. Gọi API mới
    const promise = axiosInstance.get(url).then((response) => {
        setCache(url, response.data);
        pending.delete(url);
        return response;
    }).catch((error) => {
        pending.delete(url);
        throw error;
    });

    pending.set(url, promise);
    return promise;
}

/**
 * Xóa toàn bộ cache của TMDB
 */
export function clearTmdbCache() {
    const keys = Object.keys(sessionStorage).filter(k => k.startsWith(CACHE_PREFIX));
    keys.forEach(k => sessionStorage.removeItem(k));
}

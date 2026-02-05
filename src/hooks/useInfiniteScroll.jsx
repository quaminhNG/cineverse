import { useRef, useState, useEffect } from "react";

/**
 * Custom Hook: useInfiniteScroll
 * Tạo hiệu ứng cuộn vô tận cho danh sách ngang bằng cách lặp lại phần tử.
 * * @param {Array} items - Mảng dữ liệu gốc.
 * @param {Object} options - Các tùy chọn cấu hình (repeatCount, bufferSets).
 */
const useInfiniteScroll = (items, options = {}) => {
    // --- 1. KHỞI TẠO BIẾN CẤU HÌNH (SETUP) ---

    // Lấy giá trị từ options hoặc dùng mặc định (Destructuring assignment with default values)
    // repeatCount: Số lần nhân bản danh sách gốc (mặc định 30 lần để tạo cảm giác vô tận).
    // bufferSets: Số lượng set đệm an toàn ở 2 đầu trước khi thực hiện "dịch chuyển tức thời".
    const { repeatCount = 30, bufferSets = 5 } = options;

    // Tính tổng số lượng item sau khi đã nhân bản
    const totalItems = items.length * repeatCount;

    // useRef: Tạo tham chiếu đến thẻ DOM container (để thao tác scroll mà không gây re-render).
    const containerRef = useRef(null);

    // useState: Lưu trữ index của item đang nằm ở chính giữa màn hình (Active Index).
    // Khởi tạo giá trị ban đầu là item nằm ở chính giữa danh sách khổng lồ.
    const [activeIndex, setActiveIndex] = useState(
        Math.floor(totalItems / 2)
    );

    // --- 2. HÀM SCROLL ĐẾN VỊ TRÍ CHỈ ĐỊNH (HELPER FUNCTION) ---
    const scrollToIndex = (index) => {
        const container = containerRef.current;
        if (!container) return; // Guard clause: Nếu chưa có DOM thì thoát

        // Lấy thẻ DOM con tại vị trí index
        const item = container.children[index];
        if (!item) return;

        // TÍNH TOÁN VỊ TRÍ SCROLL (MATH LOGIC)
        // Mục tiêu: Đưa item ra chính giữa khung nhìn (container).
        // Công thức: Vị trí item (item.offsetLeft) 
        //            - Nửa màn hình (container.offsetWidth / 2) 
        //            + Nửa item (item.offsetWidth / 2)
        const containerCenter = container.offsetWidth / 2;
        const itemCenter = item.offsetWidth / 2;
        const scrollLeft = item.offsetLeft - containerCenter + itemCenter;

        // Thực hiện cuộn mượt (smooth) đến vị trí đã tính
        container.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
        });
    };

    // --- 3. HÀM XỬ LÝ SỰ KIỆN SCROLL (CORE LOGIC) ---
    // Hàm này sẽ được gọi liên tục mỗi khi người dùng cuộn chuột
    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        // A. TÌM ITEM ĐANG ACTIVE (ĐANG Ở GIỮA)
        // Xác định tâm của khung nhìn hiện tại
        const center = container.scrollLeft + container.offsetWidth / 2;

        let closestIndex = 0;
        let minDistance = Infinity; // Khởi tạo khoảng cách nhỏ nhất là vô cùng
        const children = container.children;

        // Vòng lặp tìm item nào có tâm gần với tâm khung nhìn nhất
        for (let i = 0; i < children.length; i++) {
            const item = children[i];
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            const distance = Math.abs(center - itemCenter); // Trị tuyệt đối khoảng cách

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }

        // B. LOGIC "DỊCH CHUYỂN TỨC THỜI" (INFINITE LOOP TRICK)
        const itemWidth = children[0].offsetWidth; // Lấy chiều rộng 1 item
        const singleSetWidth = itemWidth * items.length; // Chiều rộng của 1 bộ danh sách gốc

        // Ngưỡng trái: Nếu cuộn qua mốc này -> Đang ở quá gần đầu
        const leftThreshold = singleSetWidth * bufferSets;
        // Ngưỡng phải: Nếu cuộn qua mốc này -> Đang ở quá gần cuối
        const rightThreshold = singleSetWidth * (repeatCount - bufferSets);

        // Khoảng cách dịch chuyển (dời đi 10 set một lúc để an toàn)
        const jumpSets = 10;
        const jumpOffset = singleSetWidth * jumpSets;

        // Kiểm tra và dịch chuyển thanh cuộn
        if (container.scrollLeft < leftThreshold) {
            // Nếu quá gần đầu trái -> Nhảy vọt về phía phải (cộng thêm pixel)
            container.scrollLeft += jumpOffset;
        } else if (container.scrollLeft > rightThreshold) {
            // Nếu quá gần đầu phải -> Nhảy vọt về phía trái (trừ bớt pixel)
            container.scrollLeft -= jumpOffset;
        }
        // Lưu ý: Việc gán container.scrollLeft trực tiếp diễn ra tức thì, mắt thường không thấy được.

        // Cập nhật state active index mới tìm được
        setActiveIndex(closestIndex);
    };

    // --- 4. KHỞI TẠO BAN ĐẦU (INITIALIZATION) ---
    useEffect(() => {
        if (items.length === 0) return;

        // Tính lại index chính giữa mỗi khi danh sách items hoặc repeatCount thay đổi
        const newTotalItems = items.length * repeatCount;
        const centerIndex = Math.floor(newTotalItems / 2);
        setActiveIndex(centerIndex);

        // Thực hiện cuộn ngay lập tức đến vị trí giữa khi component vừa load
        const container = containerRef.current;
        if (container) {
            // Dùng setTimeout để đẩy việc này xuống cuối hàng đợi sự kiện (Event Loop)
            // Đảm bảo DOM đã render xong kích thước các phần tử con thì tính toán mới đúng.
            setTimeout(() => {
                const item = container.children[centerIndex];
                if (!item) return;

                const containerCenter = container.offsetWidth / 2;
                const itemCenter = item.offsetWidth / 2;
                const scrollLeft = item.offsetLeft - containerCenter + itemCenter;

                container.scrollTo({
                    left: scrollLeft,
                    behavior: "auto", // Quan trọng: "auto" để cuộn tức thì, không có hiệu ứng chạy chạy
                });
            }, 50); // Delay 50ms
        }
    }, [items.length, repeatCount]);

    // --- 5. TRẢ VỀ KẾT QUẢ (EXPOSE) ---
    return {
        containerRef,   // Gán vào thẻ cha (ul/div)
        activeIndex,    // Index của item đang được highlight
        setActiveIndex, // Hàm set thủ công (ít dùng)
        scrollToIndex,  // Hàm để scroll programmatically (khi bấm nút Next/Prev)
        handleScroll,   // Gán vào sự kiện onScroll của thẻ cha
        totalItems,     // Tổng số lượng item ảo
    };
};

export default useInfiniteScroll;
/* ==========================================================================
   CHATBOX.JS – Trợ Lý Du Lịch Thông Minh Chạm Đắk Lắk
   Tự động khởi tạo, lưu lịch sử, tích hợp sâu với hệ thống Chạm Đắk Lắk
   ========================================================================== */

(function () {
  'use strict';

  // --- KNOWLEDGE BASE CHO DU LỊCH ĐẮK LẮK ---
  const KNOWLEDGE_BASE = [
    {
      keywords: ['đặt phòng', 'khách sạn', 'homestay', 'resort', 'glamping', 'nhà nghỉ', 'chỗ ở', 'thuê phòng', 'traveloka', 'lee house', 'lak tented camp', 'cốm camp'],
      title: 'Dịch Vụ Đặt Phòng Homestay, Khách Sạn & Glamping',
      reply: `Dạ, Chạm Đắk Lắk đã ra mắt <strong>Dịch vụ Đặt phòng Trực tuyến</strong>đối soát giá chuẩn Traveloka với các tọa độ mới nổi và đẹp nhất:\n\n` +
        `•  <strong>Lee's House BMT:</strong>Homestay view đồi, hồ bơi vô cực ngắm hoàng hôn (~820k/đêm).\n` +
        `•  <strong>Lak Tented Camp:</strong>Glamping lều sinh thái biệt lập ven Hồ Lắk (~1.850k/đêm).\n` +
        `•  <strong>Cốm Camp Glamping:</strong>Cắm trại ven suối nước tự nhiên, tiệc BBQ (~520k/đêm).\n` +
        `•  <strong>Arul Homestay:</strong>Ngủ nhà dài cổ truyền thống của người Ê Đê buôn Ako Dhông (~430k/đêm).\n` +
        `•  <strong>Mường Thanh Luxury (5 sao) & Sài Gòn Ban Mê (4 sao):</strong>Khách sạn trung tâm tiện nghi đẳng cấp.\n` +
        `•  <strong>Nice Hotel BMT:</strong>Khách sạn & nhà nghỉ sạch sẽ, siêu tiết kiệm chỉ từ ~270k/đêm.\n\n` +
        `Hệ thống có tính toán số đêm, tổng tiền tự động và giữ phòng nhanh chóng qua Zalo!`,
      card: {
        tag: 'Giá chuẩn Traveloka',
        title: 'Dịch Vụ Đặt Phòng Chạm Đắk Lắk',
        desc: 'Homestay view đồi, glamping ven suối & khách sạn trung tâm BMT với ưu đãi độc quyền.',
        img: 'anh dia danh/08_lees_house.jpg',
        url: 'dat-phong.html',
        btnText: ' Xem & Đặt Phòng Ngay'
      },
      actions: [
        { text: ' Homestay Lee’s House', query: 'Lee House có gì đẹp?' },
        { text: ' Glamping Cốm Camp', query: 'Cốm Camp Glamping ven suối' },
        { text: ' Khách sạn 5 sao BMT', query: 'Khách sạn Mường Thanh Buôn Ma Thuột' }
      ]
    },
    {
      keywords: ['lịch trình', 'tour', 'kế hoạch', 'lộ trình', '2 ngày', '2n1đ', '3 ngày', '3n2đ', '1 ngày', 'đi đâu', 'chơi gì'],
      title: 'Gợi ý Lịch trình Khám phá Đắk Lắk',
      reply: `Dạ, Chạm Đắk Lắk xin gợi ý bạn lịch trình <strong>2 Ngày 1 Đêm (2N1Đ)</strong>trọn vẹn nhất:\n\n` +
        `• <strong>Ngày 1: Hồn cốt Phố Núi & Văn hóa Cà phê</strong>\n` +
        `  - Sáng: Check-in <em>Bảo tàng Thế giới Cà phê</em>Ghé <em>Làng cà phê Trung Nguyên</em>thưởng thức ly Robusta thơm nồng.\n` +
        `  - Chiều: Khám phá <em>Buôn Akô Dhông</em>cổ kính của người Ê Đê  Viếng <em>Chùa Sắc Tứ Khải Đoan</em>.\n` +
        `  - Tối: Thưởng thức bún đỏ, ghé Chợ đêm hoặc ngắm phố tại <em>Soul Roastery / Shinin Coffee</em>.\n\n` +
        `• <strong>Ngày 2: Kỳ quan Đại Ngàn Hùng Vĩ</strong>\n` +
        `  - Sáng: Chinh phục cụm thác huyền thoại <em>Dray Nur - Dray Sáp</em>(cách BMT ~30km).\n` +
        `  - Chiều: Tham quan <em>Hồ Lắk</em>thơ mộng, trải nghiệm thuyền độc mộc và check-in <em>Đá Voi Mẹ Yang-Tao</em>.\n\n` +
        `Bạn có muốn tùy chỉnh lịch trình theo sở thích riêng không?`,
      card: {
        tag: 'Lịch trình được yêu thích',
        title: 'Tour Trải Nghiệm Đắk Lắk 2N1Đ',
        desc: 'Trọn gói check-in các điểm di sản, thưởng thức cà phê thượng hạng và ẩm thực Tây Nguyên.',
        img: 'anh dia danh/02_thac_dray_nur.jpg',
        url: 'Dat_lich_trinh.html',
        btnText: ' Mở trang Đặt Lịch Trình'
      },
      actions: [
        { text: ' Điểm check-in hot', query: 'Địa điểm check-in đẹp' },
        { text: ' Quán cà phê đẹp', query: 'Quán cà phê view đẹp BMT' },
        { text: ' Thuê Hướng dẫn viên', query: 'Hướng dẫn viên địa phương' }
      ]
    },
    {
      keywords: ['địa điểm', 'thăm quan', 'tham quan', 'checkin', 'check-in', 'chụp hình', 'cảnh đẹp', 'danh lam', 'thác'],
      title: 'Top Địa Điểm Check-in Tuyệt Đẹp',
      reply: `Đắk Lắk sở hữu vô vàn tọa độ thiên nhiên và văn hóa đặc sắc:\n\n` +
        `1. <strong>Thác Dray Nur & Dray Sáp:</strong>Dòng thác hùng vĩ bậc nhất Tây Nguyên với bọt tung trắng xóa.\n` +
        `2. <strong>Bảo tàng Thế giới Cà phê:</strong>Kiến trúc nhà dài cách điệu uốn lượn, điểm check-in triệu like.\n` +
        `3. <strong>Hồ Lắk & Biệt Điện Bảo Đại:</strong>Hồ nước ngọt tự nhiên lớn nhất Tây Nguyên, bình yên và thơ mộng.\n` +
        `4. <strong>Đá Voi Mẹ Yang-Tao:</strong>Tảng đá granite nguyên khối khổng lồ hình dáng chú voi phục.\n` +
        `5. <strong>Buôn Akô Dhông:</strong>Buôn làng Ê Đê trù phú, giữ nguyên vẹn nếp nhà dài truyền thống.\n` +
        `6. <strong>Vườn quốc gia Yok Đôn:</strong>Trải nghiệm mô hình du lịch ngắm voi thân thiện trong môi trường tự nhiên.`,
      card: {
        tag: 'Điểm đến biểu tượng',
        title: 'Bảo tàng Thế giới Cà phê BMT',
        desc: 'Không gian triển lãm văn hóa cà phê toàn cầu với kiến trúc Châu Âu giao thoa Tây Nguyên.',
        img: 'anh dia danh/01_bao_tang_ca_phe.jpg',
        url: 'dia-diem.html',
        btnText: ' Xem toàn bộ Địa Điểm'
      },
      actions: [
        { text: ' Thác Dray Nur', query: 'Thác Dray Nur có gì?' },
        { text: ' Vườn Yok Đôn', query: 'Vườn quốc gia Yok Đôn' },
        { text: ' Gợi ý tour 2N1Đ', query: 'Lịch trình 2 ngày 1 đêm' }
      ]
    },
    {
      keywords: ['cà phê', 'cafe', 'quán cà phê', 'coffee', 'view đẹp', 'sống ảo', 'uống cà phê'],
      title: 'Các Quán Cà Phê Cực Chill Tại Buôn Ma Thuột',
      reply: `Đến Thủ phủ Cà phê thì nhất định phải ghé những quán mang đậm phong vị Tây Nguyên này nhé:\n\n` +
        `• <strong>Arul Coffee (Buôn Akô Dhông):</strong>Quán cà phê trong ngôi nhà dài cổ Ê Đê nguyên bản, không gian mộc mạc, đậm chất sử thi.\n` +
        `• <strong>Soul Roastery (Nguyễn Khuyến):</strong>Thánh địa của cà phê đặc sản Fine Robusta BMT rang mộc thơm lừng.\n` +
        `• <strong>Lee's House (Xã Cư Êbur):</strong>Mệnh danh "Tiểu Bali" với view thung lũng, vườn hoa và hồ bơi vô cực.\n` +
        `• <strong>Shin In Coffee & House of Lens:</strong>Không gian ấm cúng, thiết kế vintage cực nhiều góc sống ảo lung linh.`,
      card: {
        tag: 'Văn hóa bản địa',
        title: 'Arul Coffee – Nhà dài cổ Ê Đê',
        desc: 'Thưởng thức cà phê pha phin truyền thống bên bếp lửa giữa buôn làng Akô Dhông.',
        img: 'anh dia danh/11_arul_coffee.jpg',
        url: 'dia-diem.html',
        btnText: ' Xem chi tiết tọa độ'
      },
      actions: [
        { text: ' Lee’s House BMT', query: 'Lee House có gì đẹp?' },
        { text: ' Đặc sản ăn kèm', query: 'Đặc sản Buôn Ma Thuột' }
      ]
    },
    {
      keywords: ['đặc sản', 'món ăn', 'ăn gì', 'bún đỏ', 'cơm lam', 'gà nướng', 'muối kiến', 'bò một nắng', 'cà đắng', 'rượu cần', 'mua quà'],
      title: 'Đặc Sản Ẩm Thực & Quà Biếu Đắk Lắk',
      reply: `Đến Đắk Lắk, bạn nhớ dành bụng để thưởng thức ngay những món trứ danh này:\n\n` +
        ` <strong>Bún đỏ Buôn Ma Thuột:</strong>Sợi bún to đỏ au từ hạt điều, nước dùng riêu cua béo ngọt, ăn kèm rau cần nước luộc.\n` +
        ` <strong>Cơm lam & Gà sa lửa Bản Đôn:</strong>Gà ta thả đồi nướng than giòn bì chấm muối ớt rừng thơm phức.\n` +
        ` <strong>Bò một nắng chấm muối kiến vàng:</strong>Đặc sản Krông Pa chua thanh, cay nồng và bùi bùi.\n` +
        ` <strong>Gỏi cà đắng cá cơm:</strong>Vị đắng nhẹ thanh mát kết hợp cá cơm giòn rụm.\n\n` +
        ` <strong>Quà mang về:</strong>Cà phê Robusta mộc, Hạt Mắc-ca sấy nứt vỏ, Bột Ca-cao nguyên chất và Rượu cần Y Miên.`,
      card: {
        tag: 'Mua sắm & Quà biếu',
        title: 'Đặc Sản Đắk Lắk Tuyển Chọn',
        desc: 'Hạt dinh dưỡng, cà phê đặc sản và nông sản hữu cơ chứng nhận OCOP.',
        img: 'anh dia danh/09_soul_roastery.jpg',
        url: 'dac-san.html',
        btnText: ' Khám phá Đặc Sản'
      },
      actions: [
        { text: ' Mua cà phê Robusta', query: 'Cà phê Đắk Lắk loại nào ngon?' },
        { text: ' Quán bún đỏ ngon', query: 'Ăn bún đỏ ở đâu ngon?' }
      ]
    },
    {
      keywords: ['hướng dẫn viên', 'hdv', 'guide', 'dẫn tour', 'thuyết minh', 'sinh viên bản địa'],
      title: 'Dịch vụ Hướng Dẫn Viên Bản Địa',
      reply: `Chạm Đắk Lắk kết nối bạn với mạng lưới <strong>Hướng dẫn viên sinh viên & người bản địa</strong>nhiệt huyết:\n\n` +
        `•  <strong>Am hiểu tường tận:</strong>Kể bạn nghe những câu chuyện sử thi Đăm Săn, phong tục mẫu hệ Ê Đê, văn hóa Cồng Chiêng.\n` +
        `•  <strong>Kiêm photographer:</strong>Sẵn sàng hỗ trợ bạn săn những góc ảnh check-in độc đáo nhất.\n` +
        `•  <strong>Chi phí linh hoạt & minh bạch:</strong>Hỗ trợ du khách chu đáo từ phương tiện đến quán ăn bản địa giá gốc.`,
      card: {
        tag: 'Người đồng hành tin cậy',
        title: 'Hướng Dẫn Viên Chạm Đắk Lắk',
        desc: 'Chọn người dẫn đường nhiệt huyết, thân thiện cho chuyến đi của bạn.',
        img: 'anh dia danh/07_buon_ako_dhong.jpg',
        url: 'huong-dan-vien.html',
        btnText: ' Xem danh sách HDV'
      },
      actions: [
        { text: ' Đặt lịch HDV ngay', query: 'Hotline liên hệ tư vấn' },
        { text: ' Xem các tour gợi ý', query: 'Lịch trình 2 ngày 1 đêm' }
      ]
    },
    {
      keywords: ['thời tiết', 'mùa nào', 'tháng mấy', 'thời điểm', 'khi nào nên đi', 'mùa mưa', 'mùa khô', 'hoa cà phê'],
      title: 'Thời Điểm Du Lịch Đắk Lắk Đẹp Nhất',
      reply: `Đắk Lắk có 2 mùa rõ rệt, mỗi mùa mang một vẻ đẹp quyến rũ riêng:\n\n` +
        ` <strong>Mùa khô (Tháng 12 – Tháng 4): THỜI ĐIỂM VÀNG</strong>\n` +
        `  - Tháng 12: Mùa hoa dã quỳ vàng rực triền đồi & không khí se lạnh dễ chịu.\n` +
        `  - Tháng 2 – Tháng 4: <em>Mùa hoa cà phê nở trắng trời</em>đại ngàn như tuyết phủ, tỏa hương thơm ngát say đắm.\n` +
        `  - Tháng 3: Thường diễn ra Lễ hội Cà phê Buôn Ma Thuột và Đua voi Hồ Lắk.\n\n` +
        ` <strong>Mùa mưa (Tháng 5 – Tháng 11):</strong>\n` +
        `  - Thích hợp chiêm ngưỡng các dòng thác (Dray Nur, Dray Sáp, Gia Long) cuồn cuộn nước trắng xóa hùng vĩ.`,
      actions: [
        { text: ' Xem ảnh mùa hoa', query: 'Địa điểm check-in đẹp' },
        { text: ' Đặt xe & Tour', query: 'Cách đặt tour & thuê xe' }
      ]
    },
    {
      keywords: ['di chuyển', 'xe khách', 'máy bay', 'sân bay', 'thuê xe', 'xe máy', 'taxi', 'đi lại', 'đến buôn ma thuột'],
      title: 'Kinh Nghiệm Di Chuyển & Đi Lại Tại Đắk Lắk',
      reply: `Cách đến Buôn Ma Thuột cực kỳ thuận tiện:\n\n` +
        ` <strong>Đường hàng không:</strong>Sân bay Buôn Ma Thuột (BMV) có các chuyến bay thẳng hàng ngày từ Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng (Vietnam Airlines, Vietjet, Bamboo).\n` +
        ` <strong>Xe khách / Limousine:</strong>Từ TP.HCM đi khoảng 6-8 tiếng (nhà xe Tiến Oanh, Hoàng Kim, Long Vân Limousine giường nằm phòng đôi).\n\n` +
        ` <strong>Thuê xe máy tại BMT:</strong>Giá chỉ từ <strong>120.000đ - 150.000đ/ngày</strong>, giao nhận tận nơi tại sân bay hoặc khách sạn. Đường sá BMT rất rộng rãi và thoáng mát!`,
      actions: [
        { text: ' Đặt phòng khách sạn', query: 'Đặt phòng homestay khách sạn' },
        { text: ' Lịch trình 2N1Đ', query: 'Lịch trình 2 ngày 1 đêm' }
      ]
    },
    {
      keywords: ['hotline', 'liên hệ', 'số điện thoại', 'sđt', 'zalo', 'tư vấn viên', 'gặp người', 'trực tiếp'],
      title: 'Kênh Hỗ Trợ Trực Tiếp Chạm Đắk Lắk',
      reply: `Bạn cần tư vấn chi tiết hơn hoặc hỗ trợ đặt tour, đặt phòng khẩn cấp? Đội ngũ Chạm Đắk Lắk luôn sẵn sàng:\n\n` +
        ` <strong>Hotline 24/7:</strong><a href="tel:0912345678" style="color:#fde047; font-weight:700; text-decoration:underline;">0912.345.678</a>\n` +
        ` <strong>Zalo Hỗ trợ:</strong><a href="https://zalo.me" target="_blank" style="color:#fde047; font-weight:700; text-decoration:underline;">0912.345.678 (Chạm Đắk Lắk)</a>\n` +
        ` <strong>Email:</strong>lienhe@chamdaklak.vn\n` +
        ` <strong>Văn phòng:</strong>TP. Buôn Ma Thuột, Tỉnh Đắk Lắk.\n\n` +
        `Bạn có thể để lại số điện thoại ngay tại khung chat này, tư vấn viên sẽ gọi lại sau 5 phút nhé!`,
      actions: [
        { text: ' Xem trang Đặt Phòng', query: 'Đặt phòng homestay khách sạn' },
        { text: ' Đặt Lịch Trình Online', query: 'Lịch trình 2 ngày 1 đêm' }
      ]
    },
    {
      keywords: ['chào', 'hello', 'hi', 'bạn là ai', 'chào bạn', 'hey', 'alo'],
      title: 'Lời Chào',
      reply: `Dạ xin chào quý khách!  Mình là <strong>Trợ Lý Ảo Chạm Đắk Lắk</strong>.\n\n` +
        `Mình có thể hỗ trợ bạn:\n` +
        `• Đặt phòng homestay, glamping, khách sạn chuẩn giá Traveloka\n` +
        `• Gợi ý lịch trình du lịch từ 1 đến 3 ngày\n` +
        `• Giới thiệu các địa điểm check-in, thác nước, bản làng\n` +
        `• Tìm các quán cà phê đẹp & món ngon đặc sản Đắk Lắk\n` +
        `• Kết nối Hướng dẫn viên địa phương & tư vấn đặt tour.\n\n` +
        `Hôm nay bạn dự định khám phá điều gì ở Buôn Ma Thuột?`,
      actions: [
        { text: ' Đặt phòng Traveloka', query: 'Đặt phòng homestay khách sạn' },
        { text: ' Lịch trình 2N1Đ', query: 'Lịch trình 2 ngày 1 đêm' },
        { text: ' Điểm check-in đẹp', query: 'Địa điểm check-in đẹp' },
        { text: ' Quán cà phê chill', query: 'Quán cà phê đẹp BMT' }
      ]
    },
    {
      keywords: ['cảm ơn', 'thanks', 'thank you', 'tuyệt vời', 'ok', 'cảm ơn bạn'],
      title: 'Lời Cảm Ơn',
      reply: `Dạ không có gì ạ!  Chúc bạn có một chuyến hành trình đến với Đắk Lắk thật nhiều niềm vui, trải nghiệm đáng nhớ và những bức ảnh sống ảo tuyệt đẹp!\n\n` +
        `Nếu cần thêm bất kỳ thông tin gì trong chuyến đi, bạn cứ mở khung chat này lên nhé. Mình luôn ở đây hỗ trợ bạn 24/7! `,
      actions: [
        { text: ' Xem trang Đặt Phòng', query: 'Đặt phòng homestay khách sạn' },
        { text: ' Xem trang Đặt Lịch Trình', query: 'Lịch trình 2 ngày 1 đêm' }
      ]
    }
  ];

  // Fallback response khi không khớp từ khóa
  function getFallbackResponse(query) {
    return {
      reply: `Cảm ơn bạn đã hỏi về: "<em>${escapeHTML(query)}</em>". \n\n` +
        `Mình là Trợ lý Chạm Đắk Lắk. Bạn có thể chọn nhanh một trong các chủ đề phổ biến dưới đây để mình hỗ trợ bạn chính xác nhất nhé:`,
      actions: [
        { text: ' Đặt phòng Traveloka', query: 'Đặt phòng homestay khách sạn' },
        { text: ' Lịch trình 2N1Đ gợi ý', query: 'Lịch trình 2 ngày 1 đêm' },
        { text: ' Địa điểm check-in hot', query: 'Địa điểm check-in đẹp' },
        { text: ' Quán cà phê đẹp BMT', query: 'Quán cà phê đẹp BMT' },
        { text: ' Đặc sản ngon phải thử', query: 'Đặc sản Buôn Ma Thuột' },
        { text: ' Hotline tư vấn', query: 'Hotline liên hệ tư vấn' }
      ]
    };
  }

  // Chuẩn hóa tiếng Việt để tìm kiếm
  function normalizeText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd');
  }

  // Tìm kiếm câu trả lời phù hợp nhất
  function findBestMatch(userQuery) {
    const rawLower = userQuery.toLowerCase().trim();
    const normalized = normalizeText(userQuery);

    let bestItem = null;
    let highestScore = 0;

    for (const item of KNOWLEDGE_BASE) {
      let score = 0;
      for (const kw of item.keywords) {
        const kwNorm = normalizeText(kw);
        if (rawLower.includes(kw.toLowerCase())) {
          score += 3;
        } else if (normalized.includes(kwNorm)) {
          score += 2;
        }
      }
      if (score >highestScore) {
        highestScore = score;
        bestItem = item;
      }
    }

    if (highestScore >0 && bestItem) {
      return bestItem;
    }
    return getFallbackResponse(userQuery);
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- QUẢN LÝ LỊCH SỬ CHAT (localStorage) ---
  const STORAGE_KEY = 'cdl_chatbox_messages_v2';

  function loadHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length >0) return parsed;
      }
    } catch (e) {
      console.warn('Chatbox storage read error:', e);
    }
    // Tin nhắn mặc định khởi đầu
    return [
      {
        sender: 'bot',
        text: `Xin chào! Mình là <strong>Trợ Lý Ảo Chạm Đắk Lắk</strong>\n\nBạn đang lên kế hoạch du hí Buôn Ma Thuột, cần tìm homestay/khách sạn giá rẻ, địa điểm check-in hay quán cà phê đẹp? Bấm chọn gợi ý bên dưới hoặc gõ câu hỏi nhé!`,
        time: getCurrentTime(),
        actions: [
          { text: ' Đặt phòng Traveloka', query: 'Đặt phòng homestay khách sạn' },
          { text: ' Lịch trình 2N1Đ', query: 'Lịch trình 2 ngày 1 đêm' },
          { text: ' Điểm check-in đẹp', query: 'Địa điểm check-in đẹp' },
          { text: ' Quán cà phê view đẹp', query: 'Quán cà phê đẹp BMT' }
        ]
      }
    ];
  }

  function saveHistory(messages) {
    try {
      // Giữ tối đa 30 tin nhắn gần nhất để tối ưu lưu trữ
      const trimmed = messages.slice(-30);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.warn('Chatbox storage save error:', e);
    }
  }

  function getCurrentTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  }

  // --- TẠO GIAO DIỆN CHAT DOM ---
  function buildWidgetMarkup() {
    return `
      <!-- Launcher FAB Button --><div class="cdl-chat-fab-wrap"><!-- Proactive Peek Bubble --><div class="cdl-chat-peek" id="cdlChatPeek"><div class="cdl-peek-emblem"></div><div class="cdl-peek-text-wrap"><span class="cdl-peek-title">Trợ Lý Chạm Đắk Lắk</span><span class="cdl-peek-subtitle">Cần đặt phòng, gợi ý tour & quán ngon? Chat ngay! </span></div><button class="cdl-peek-close" id="cdlPeekClose" title="Đóng gợi ý"></button></div><button class="cdl-chat-fab" id="cdlChatToggleBtn" aria-label="Mở khung trò chuyện hỗ trợ"><div class="cdl-fab-icon-chat"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div><div class="cdl-fab-icon-close"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div><span class="cdl-fab-badge-online" title="Trợ lý trực tuyến"></span></button></div><!-- Main Chat Window Popup --><div class="cdl-chat-window" id="cdlChatWindow" role="dialog" aria-modal="true" aria-hidden="true"><!-- Header --><div class="cdl-chat-header"><div class="cdl-hdr-brand"><div class="cdl-hdr-avatar-wrap"><div class="cdl-hdr-avatar" title="Chạm Đắk Lắk"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></svg></div><span class="cdl-hdr-status-dot"></span></div><div class="cdl-hdr-text"><h4 class="cdl-hdr-title">Chạm Đắk Lắk <span class="cdl-hdr-badge">AI 24/7</span></h4><span class="cdl-hdr-sub"><span class="cdl-hdr-sub-dot"></span>Trực tuyến • Sẵn sàng giải đáp
              </span></div></div><div class="cdl-hdr-controls"><button class="cdl-hdr-btn" id="cdlChatResetBtn" title="Làm mới cuộc trò chuyện" aria-label="Làm mới"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path><path d="M3 21v-5h5"></path></svg></button><button class="cdl-hdr-btn" id="cdlChatCloseBtn" title="Thu nhỏ" aria-label="Đóng"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div></div><!-- Banner Bar --><div class="cdl-chat-banner"><div class="cdl-banner-left"><span>Chào bạn đến với xứ sở Cà phê & Thác nước!</span></div><a href="dat-phong.html" class="cdl-banner-action">Đặt Phòng Ngay →</a></div><!-- Messages Area --><div class="cdl-chat-messages" id="cdlChatMessages"></div><!-- Horizontal Quick Chips Bar --><div class="cdl-chat-chips-bar" id="cdlChipsBar"><button type="button" class="cdl-chip" data-query="Đặt phòng homestay khách sạn">Đặt phòng Traveloka</button><button type="button" class="cdl-chip" data-query="Lịch trình 2 ngày 1 đêm">Tour 2N1Đ gợi ý</button><button type="button" class="cdl-chip" data-query="Địa điểm check-in đẹp">Điểm check-in hot</button><button type="button" class="cdl-chip" data-query="Quán cà phê đẹp BMT">Quán cà phê chill</button><button type="button" class="cdl-chip" data-query="Đặc sản Buôn Ma Thuột">Đặc sản nổi tiếng</button><button type="button" class="cdl-chip" data-query="Hướng dẫn viên địa phương">Thuê Hướng dẫn viên</button><button type="button" class="cdl-chip" data-query="Thời điểm du lịch đẹp nhất">Mùa hoa cà phê</button><button type="button" class="cdl-chip" data-query="Hotline liên hệ tư vấn">Hotline hỗ trợ</button></div><!-- Input Footer --><div class="cdl-chat-footer"><form class="cdl-chat-form" id="cdlChatForm"><textarea
              class="cdl-chat-input"
              id="cdlChatInput"
              placeholder="Nhập câu hỏi (ví dụ: đặt phòng, tour 2N1Đ, quán cà phê...)"
              rows="1"
            ></textarea><button type="submit" class="cdl-chat-send" id="cdlChatSend" title="Gửi tin nhắn" disabled><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></button></form><div class="cdl-chat-footnote"><span>Chạm Đắk Lắk • Trợ lý du lịch số</span><a href="ve-chung-toi.html">Về chúng tôi</a></div></div></div>`;
  }

  // --- CHÍNH THỨC KHỞI TẠO CONTROLLER ---
  function initChatbox() {
    let root = document.getElementById('cdlChatWidgetRoot');
    if (!root) {
      root = document.createElement('div');
      root.id = 'cdlChatWidgetRoot';
      root.className = 'cdl-chat-widget-root';
      root.innerHTML = buildWidgetMarkup();
      document.body.appendChild(root);
    }

    const fabBtn = document.getElementById('cdlChatToggleBtn');
    const chatWin = document.getElementById('cdlChatWindow');
    const closeBtn = document.getElementById('cdlChatCloseBtn');
    const resetBtn = document.getElementById('cdlChatResetBtn');
    const peekBubble = document.getElementById('cdlChatPeek');
    const peekClose = document.getElementById('cdlPeekClose');
    const msgContainer = document.getElementById('cdlChatMessages');
    const form = document.getElementById('cdlChatForm');
    const input = document.getElementById('cdlChatInput');
    const sendBtn = document.getElementById('cdlChatSend');
    const chipsBar = document.getElementById('cdlChipsBar');

    let messages = loadHistory();
    let isOpen = false;
    let hasInteracted = false;

    // Hiển thị tin nhắn ban đầu
    renderMessages();

    // Tự động bung bong bóng Peek chào mời sau 3.5 giây nếu người dùng chưa mở chat
    setTimeout(() =>{
      if (!isOpen && !hasInteracted && peekBubble) {
        peekBubble.classList.add('show');
      }
    }, 3500);

    // Xử lý bật/tắt chat
    function toggleChat(open) {
      if (typeof open === 'boolean') {
        isOpen = open;
      } else {
        isOpen = !isOpen;
      }

      if (isOpen) {
        chatWin.classList.add('is-open');
        fabBtn.classList.add('is-open');
        chatWin.setAttribute('aria-hidden', 'false');
        if (peekBubble) peekBubble.classList.remove('show');
        hasInteracted = true;
        scrollToBottom();
        setTimeout(() =>input.focus(), 250);
      } else {
        chatWin.classList.remove('is-open');
        fabBtn.classList.remove('is-open');
        chatWin.setAttribute('aria-hidden', 'true');
      }
    }

    fabBtn.addEventListener('click', () =>toggleChat());
    closeBtn.addEventListener('click', () =>toggleChat(false));

    // Đóng peek bubble
    if (peekClose) {
      peekClose.addEventListener('click', (e) =>{
        e.stopPropagation();
        peekBubble.classList.remove('show');
        hasInteracted = true;
      });
    }

    if (peekBubble) {
      peekBubble.addEventListener('click', () =>{
        peekBubble.classList.remove('show');
        toggleChat(true);
      });
    }

    // Reset lịch sử
    resetBtn.addEventListener('click', () =>{
      if (confirm('Bạn muốn làm mới cuộc trò chuyện này?')) {
        localStorage.removeItem(STORAGE_KEY);
        messages = loadHistory();
        renderMessages();
      }
    });

    // Auto-resize input textarea & check button state
    input.addEventListener('input', () =>{
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 80) + 'px';
      sendBtn.disabled = !input.value.trim();
    });

    input.addEventListener('keydown', (e) =>{
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtn.disabled) {
          form.dispatchEvent(new Event('submit'));
        }
      }
    });

    // Submit form tin nhắn
    form.addEventListener('submit', (e) =>{
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      addUserMessage(text);
      input.value = '';
      input.style.height = 'auto';
      sendBtn.disabled = true;

      // Phản hồi từ trợ lý ảo
      handleBotReply(text);
    });

    // Bấm suggestion chip
    if (chipsBar) {
      chipsBar.addEventListener('click', (e) =>{
        const chip = e.target.closest('.cdl-chip');
        if (!chip) return;
        const q = chip.dataset.query || chip.textContent.trim();
        handleUserQuickAction(q);
      });
    }

    // Xử lý nút bấm trong tin nhắn
    msgContainer.addEventListener('click', (e) =>{
      const actionBtn = e.target.closest('.cdl-action-btn');
      if (actionBtn && actionBtn.dataset.query) {
        e.preventDefault();
        handleUserQuickAction(actionBtn.dataset.query);
      }
    });

    function handleUserQuickAction(queryText) {
      addUserMessage(queryText);
      handleBotReply(queryText);
    }

    function addUserMessage(text) {
      const msg = {
        sender: 'user',
        text: text,
        time: getCurrentTime()
      };
      messages.push(msg);
      saveHistory(messages);
      renderMessages();
    }

    function handleBotReply(userQuery) {
      showTypingIndicator();

      // Giả lập thời gian suy nghĩ của bot (400 - 750ms)
      const delay = Math.floor(Math.random() * 350) + 400;

      setTimeout(() =>{
        hideTypingIndicator();
        const match = findBestMatch(userQuery);

        const botMsg = {
          sender: 'bot',
          text: match.reply,
          card: match.card || null,
          actions: match.actions || null,
          time: getCurrentTime()
        };

        messages.push(botMsg);
        saveHistory(messages);
        renderMessages();
      }, delay);
    }

    function showTypingIndicator() {
      hideTypingIndicator();
      const row = document.createElement('div');
      row.className = 'cdl-msg-row bot';
      row.id = 'cdlTypingRow';
      row.innerHTML = `
        <div class="cdl-msg-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></svg></div><div class="cdl-typing-indicator"><div class="cdl-typing-dot"></div><div class="cdl-typing-dot"></div><div class="cdl-typing-dot"></div></div>`;
      msgContainer.appendChild(row);
      scrollToBottom();
    }

    function hideTypingIndicator() {
      const el = document.getElementById('cdlTypingRow');
      if (el) el.remove();
    }

    function renderMessages() {
      msgContainer.innerHTML = '';
      messages.forEach((m) =>{
        const row = document.createElement('div');
        row.className = `cdl-msg-row ${m.sender}`;

        let avatarHTML = '';
        if (m.sender === 'bot') {
          avatarHTML = `
            <div class="cdl-msg-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"></path></svg></div>`;
        }

        let cardHTML = '';
        if (m.card) {
          cardHTML = `
            <div class="cdl-rich-card"><img src="${m.card.img}" alt="${escapeHTML(m.card.title)}" class="cdl-rich-card-img" loading="lazy" /><div class="cdl-rich-card-body"><span class="cdl-rich-card-tag">${m.card.tag}</span><div class="cdl-rich-card-title">${m.card.title}</div><div class="cdl-rich-card-desc">${m.card.desc}</div><a href="${m.card.url}" class="cdl-rich-card-btn">${m.card.btnText}</a></div></div>`;
        }

        let actionsHTML = '';
        if (m.actions && m.actions.length >0) {
          actionsHTML = `
            <div class="cdl-msg-actions">${m.actions
                .map(
                  (a) =>`<button type="button" class="cdl-action-btn" data-query="${escapeHTML(a.query)}">${a.text}</button>`
                )
                .join('')}
            </div>`;
        }

        // Format newlines
        const formattedText = m.text.replace(/\n/g, '<br/>');

        row.innerHTML = `
          ${avatarHTML}
          <div class="cdl-msg-bubble-wrap"><div class="cdl-msg-bubble"><div>${formattedText}</div>${cardHTML}
              ${actionsHTML}
            </div><div class="cdl-msg-time">${m.time || ''}</div></div>`;

        msgContainer.appendChild(row);
      });

      scrollToBottom();
    }

    function scrollToBottom() {
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    // Phím tắt ESC để đóng khung chat
    window.addEventListener('keydown', (e) =>{
      if (e.key === 'Escape' && isOpen) {
        toggleChat(false);
      }
    });
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbox);
  } else {
    initChatbox();
  }
})();

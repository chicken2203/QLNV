# Hệ thống quản lý nhân sự
Hệ thông quản lý nhân sự

### Công nghệ
- [ReactJs] xây dựng web app: Material UI v4, Redux-Toolkit, Erget dashboard template

### Chạy dự án trên local

- Clone dự án và cài đặt package
```sh
// Bước 1: clone code dự án
git clone https://gitlab.oceantech.com.vn/loi_93-trung_2k/l3-oceantech
// Bước 2: di chuyển vào thư mục làm việc
cd l3-oceantech
// Bước 3: cài đặt package thư mục gốc
yarn install
// Bước 4: chạy ứng dụng
npm run start

- local app: http://localhost:3000
- api: https://em-v2.oceantech.com.vn/em/


Username: admin
Password: admin

### Các scripts 
```sh
// Khởi chạy client
npm run start
// build code cho product 
npm run build 
```

### Các bước làm việc với git
#### Khi triển khai 1 task (Tạo merge request)
```
- Step 1: Chọn toàn bộ code đã thay đổi/thêm mới trong lúc code
Command: git add .
- Step 2 [*]: Lưu toàn bộ code vừa chọn vào bộ nhớ tạm
Command: git stash
- Step 3 [*]: Tạo ra 1 nhánh mới từ nhánh main. Theo quy tắc: feature/id_task/tên_người_lam/tiêu_đề_task
Ví dụ: feature/99/buitrung/show-config-data
Command: git checkout -b feature/99/buitrung/show-config-data
- Step 4: Đẩy toàn bộ code vừa chọn từ bộ nhớ tạm ra nhán vừa mới tạo
- Step 5: (Optional: Tiến hành viết code cho task của mình)
- Step 5.1: Chọn toàn bộ code đã thay đổi/thêm mới để chuẩn bị tạo commit
Command: git add .
- Step 6: Tạo commit với nội dung công việc và phải có nghĩa
Command: git commit -m"Show config data in admin page"
- Step 7: Đẩy commit lên nhánh và tạo Merge Request 
Command: git push origin Tên nhánh
Ví dụ: git push origin feature/99/buitrung/show-config-data
===> Nếu thành công nó sẽ xuất ra được 1 đường link ở trong terminal, bấm vào để tạo MR

* Những lưu ý khi Tạo merge request
[Critical] Không push code lên nhánh main
[Normal] Trong lúc tạo MR phải kiểm tra lại toàn bộ các code đã thêm mới/thay đổi
[Normal] Xóa toàn bộ console.log khi làm code và kiểm tra cú pháp, quy tắt đặt tên có đề cập ở cuối trang
```

#### Một số lệnh git khác
- git stash: Khi đã sửa file và muốn lấy code mới nhất, có 2 cách để làm. Một là git add ., git commit để lưu code đã làm. Hai là dùng git stash để bỏ qua những file đã sửa và lưu tạm thời, rồi git pull để lấy code về. Để lấy code đã sửa trước đó chạy git stash pop.
- git cherry-pick 
- git reset --hard ID_COMMIT (reset lại về commit)
- git branch  (Chọn nhánh)
- git log   (Kiểm tra số lượng commit)
- git revert ID_COMMIT (Hoàn tác commmit)

### Quy tắc khi viết code
```
Sau đây là một số quy chuẩn đặt tên thường dùng trong dự án:
- Tên lớp đặt theo PascalCase, ví dụ: UserClass, CategoryClass…
- Tên hàm và phương thức sử dụng camelCase, ví dụ getUser, getCategory…
- Tên biến cũng sử dụng camelCase loginUser, categoryList…
- Tên hằng số thì đặc biệt, viết hoa hết và cách nhau bởi dấu gạch dưới DISCOUNT_PERCENT, LIMIT_RATE…
- Tên bảng, tên cột trong Database sử dụng underscore và sử dụng danh từ số nhiều, ví dụ bảng oauth_clients, oauth_refresh_tokens.

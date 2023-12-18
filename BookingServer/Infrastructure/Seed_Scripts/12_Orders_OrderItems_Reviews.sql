SET DATEFORMAT DMY;
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(1,N'Bùi Đoàn Khánh Ân','anbuibz54@gmail.com','Pending','20/10/2023','21/10/2023','15/9/2023');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(1,N'Bùi Đoàn Khánh Ân','anbuibz54@gmail.com','Pending','25/10/2023','29/10/2023','19/9/2023');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(1,N'Bùi Đoàn Khánh Ân','anbuibz54@gmail.com','Pending','30/10/2023','31/10/2023','15/10/2023');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(1,N'Bùi Đoàn Khánh Ân','anbuibz54@gmail.com','Pending','20/11/2023','21/11/2023','15/11/2023');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(1,N'Bùi Đoàn Khánh Ân','anbuibz54@gmail.com','Pending','20/12/2023','21/12/2023','15/12/2023');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(1,N'Bùi Đoàn Khánh Ân','anbuibz54@gmail.com','Pending','2/10/2023','4/10/2023','29/9/2023');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(1,N'Bùi Đoàn Khánh Ân','anbuibz54@gmail.com','Pending','2/1/2023','5/1/2023','15/12/2022');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(1,N'Bùi Đoàn Khánh Ân','anbuibz54@gmail.com','Pending','2/11/2023','4/11/2023','30/10/2023');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(1,N'Bùi Đoàn Khánh Ân','anbuibz54@gmail.com','Pending','5/12/2023','8/12/2023','1/12/2023');

insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(3,N'Thanh Ngân','20521644@gm.uit.edu.vn','Pending','20/10/2023','21/10/2023','15/9/2023');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(3,N'Thanh Ngân','20521644@gm.uit.edu.vn','Pending','20/10/2023','21/10/2023','15/9/2023');
insert into Orders(User_Id,Customer_Name,Email,Status,Check_In_Date,Check_Out_Date,Order_Date) values(3,N'Thanh Ngân','20521644@gm.uit.edu.vn','Pending','20/10/2023','21/10/2023','15/9/2023');
go
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(1,1,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(1,2,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(2,3,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(2,4,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(3,5,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(3,6,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(4,7,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(4,8,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(5,9,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(5,10,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(6,11,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(6,12,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(7,13,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(7,14,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(8,15,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(8,16,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(9,17,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(9,18,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(10,19,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(10,20,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(11,8,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(11,5,1,500000);
--Oder1
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(12,13,1,500000);
insert into OrderItems(Order_Id,Room_Id,User_Id,Price) values(12,14,1,500000);
go
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(1,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(1,2,4,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(2,3,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(2,1,3,N'Nhân viên rất nhiệt tình hỗ trợ, phòng được trang trí đơn giản nhưng rất ấm cúng','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(3,2,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(3,3,3,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(4,1,1,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(4,3,4,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(5,2,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(5,2,3,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(6,2,5,N'Nhân viên rất nhiệt tình hỗ trợ, phòng được trang trí đơn giản nhưng rất ấm cúng','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(6,1,2,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(7,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(7,1,4,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(8,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(8,1,4,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(8,3,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(8,3,2,'Nhân viên rất nhiệt tình hỗ trợ, phòng được trang trí đơn giản nhưng rất ấm cúng','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(10,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(10,1,1,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(11,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(11,3,2,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(12,2,3,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(12,1,4,N'Nhân viên rất nhiệt tình hỗ trợ, phòng được trang trí đơn giản nhưng rất ấm cúng','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(13,1,3,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(13,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(13,1,4,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(14,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(14,1,1,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(14,1,3,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(15,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(15,1,3,N'View đẹp, vị trí gần bx liên tỉnh nên nếu đi xe khách thì thuận tiện để di chuyển vào chỗ nghỉ. Có dịch vụ thuê xe máy, chỉ cần báo trước cho lễ tân 15p. Xe mới, chạy êm. Hai bạn nhân viên Giang và Hà hỗ trợ mình tận tình từ lúc đặt phòng và mọi thứ khi lưu trú. Một chỗ nghỉ đáng để tham khảo vì giá cả hợp lý và sự thân thiện từ nhân viên, cho tới sự tận tình trong dịch vụ.','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(15,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(16,1,4,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(1,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(1,1,4,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(1,1,2,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(1,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(16,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(19,1,5,'U mê lun ó','2023-04-22 10:34:23');
insert into Reviews(Room_Id,User_Id,Score,Content,CreatedAt) values(1,1,5,'U mê lun ó','2023-04-22 10:34:23');


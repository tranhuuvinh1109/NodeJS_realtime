const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: '*'
	}
});

const PORT = process.env.PORT || 3001;

// Lưu trữ thông tin người dùng trong các room
const usersInRooms = {};
const fixedRoomName = "room1"; // Tên room cố định
const videoLink = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
let isPlaying = false;
let videoTime = 0; // Thời gian của video (tính theo giây)

// Hàm cập nhật thời gian của video và phát tán đến tất cả các client trong room
function updateVideoTime (time) {
	videoTime = time;
	io.to(fixedRoomName).emit('videoTime', videoTime);
}

io.on('connection', (socket) => {
	console.log('Người dùng đã kết nối:', socket.id);

	socket.on('joinRoom', ({ username, roomName }) => {
		if (roomName !== fixedRoomName) {
			console.log('Tên room không hợp lệ.');
			return;
		}

		socket.join(fixedRoomName);

		if (!usersInRooms[fixedRoomName]) {
			usersInRooms[fixedRoomName] = [];
		}
		usersInRooms[fixedRoomName].push(username);

		console.log(`Danh sách username trong ${fixedRoomName}:`, usersInRooms[fixedRoomName]);

		// Gửi link video tới client vừa tham gia room "room1"
		socket.emit('videoLink', { link: videoLink });

		// Gửi trạng thái hiện tại của video cho client vừa tham gia room "room1"
		socket.emit('isPlaying', isPlaying);

		// Gửi thời gian hiện tại của video cho client vừa tham gia room "room1"
		socket.emit('videoTime', videoTime);
	});

	socket.on('play', ({ roomName }) => {
		if (roomName !== fixedRoomName) {
			console.log('Tên room không hợp lệ.');
			return;
		}

		// Cập nhật trạng thái phát video
		isPlaying = true;

		// Gửi sự kiện 'play' và trạng thái phát video đến tất cả client trong room
		io.to(fixedRoomName).emit('play');
		// Gửi thời gian hiện tại của video đến tất cả client trong room
		io.to(fixedRoomName).emit('videoTime', videoTime);
	});

	socket.on('pause', ({ roomName }) => {
		if (roomName !== fixedRoomName) {
			console.log('Tên room không hợp lệ.');
			return;
		}

		// Cập nhật trạng thái tạm dừng video
		isPlaying = false;

		// Gửi sự kiện 'pause' và trạng thái tạm dừng video đến tất cả client trong room
		io.to(fixedRoomName).emit('pause');
		// Gửi thời gian hiện tại của video đến tất cả client trong room
		io.to(fixedRoomName).emit('videoTime', videoTime);
	});

	socket.on('seek', ({ time }) => {
		// Cập nhật thời gian của video và phát tán đến tất cả các client trong room
		updateVideoTime(time);
		console.log('updated video time-->', time);
	});

	socket.on('videoTime', (time) => {
		// Nhận thời gian video từ client và cập nhật vào biến videoTime
		videoTime = time;
		console.log('videoTime from client-->', time);
		io.to(fixedRoomName).emit('videoTime', videoTime);
	});

	socket.on('disconnect', () => {
		console.log('Người dùng đã ngắt kết nối:', socket.id);
		// Xử lý các công việc cần thiết khi người dùng ngắt kết nối (nếu có)
	});
});

server.listen(PORT, () => {
	console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

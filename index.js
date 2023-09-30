const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = socketIo(server, {
	cors: {
		origin: '*'
	}
});
const PORT = process.env.PORT || 3001;
// Danh sách dự án mẫu với randomNumber thay đổi liên tục
const projects = [
	{
		id: 1,
		projectName: "Project name 1",
		user: {
			id: 1,
			avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Adam Smith",
			email: "adam@gmail.com",
		},
		status: "done",
		randomNumber: 100,
	},
	{
		id: 2,
		projectName: "Project name 2",
		user: {
			id: 2,
			avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Tran Hong Duc",
			email: "tranhongduc@gmail.com",
		},
		status: "training",
		randomNumber: 80,
	},
	{
		id: 3,
		projectName: "Project name 3",
		user: {
			id: 3,
			avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Phan Tan Quynh",
			email: "phantanquynh@gmail.com",
		},
		status: "done",
		randomNumber: 100,
	},
	{
		id: 4,
		projectName: "Project name 4",
		user: {
			id: 4,
			avatar: "https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Nguyen Van Khoa",
			email: "KhoaKun27@gmail.com",
		},
		status: "training",
		randomNumber: 50,
	}
];

io.on('connection', (socket) => {
	socket.emit('initialProjects', projects);

	const updateRandomNumbers = () => {
		projects.forEach((project) => {
			project.randomNumber = Math.floor(Math.random() * 100);
		});
		io.emit('updateProjects', projects);
	};

	setInterval(updateRandomNumbers, 3000);
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

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
const projects = [
	{
		id: 1,
		projectName: "Project name 1",
		user: {
			id: 1,
			avatar:
				"https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Adam Smith",
			email: "adam@gmail.com",
		},
		status: "done",
		progress: 0,
		linkDrive:
			"https://drive.google.com/drive/folders/1BNV9GQAVJcZpUcV6HLwzfjE6e9cWvwQe?usp=sharing",
		createAt: "2020-07-25T14:10:26.113Z",
	},
	{
		id: 2,
		projectName: "Project name 2",
		user: {
			id: 2,
			avatar:
				"https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Tran Hong Duc",
			email: "tranhongduc@gmail.com",
		},
		status: "training",
		progress: 0,
		linkDrive:
			"https://drive.google.com/drive/folders/1BNV9GQAVJcZpUcV6HLwzfjE6e9cWvwQe?usp=sharing",
		createAt: "2020-07-25T14:10:26.113Z",
	},
	{
		id: 3,
		projectName: "Project name 3",
		user: {
			id: 3,
			avatar:
				"https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Phan Tan Quynh",
			email: "phantanquynh@gmail.com",
		},
		status: "done",
		progress: 0,
		linkDrive:
			"https://drive.google.com/drive/folders/1BNV9GQAVJcZpUcV6HLwzfjE6e9cWvwQe?usp=sharing",
		createAt: "2020-07-25T14:10:26.113Z",
	},
	{
		id: 4,
		projectName: "Project name 4",
		user: {
			id: 4,
			avatar:
				"https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Nguyen Van Khoa",
			email: "KhoaKun27@gmail.com",
		},
		status: "training",
		progress: 0,
		linkDrive:
			"https://drive.google.com/drive/folders/1BNV9GQAVJcZpUcV6HLwzfjE6e9cWvwQe?usp=sharing",
		createAt: "2020-07-25T14:10:26.113Z",
	},
	{
		id: 5,
		projectName: "Project name 5",
		user: {
			id: 5,
			avatar:
				"https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Le Tien Dat",
			email: "Dat1lit@gmail.com",
		},
		status: "training",
		progress: 0,
		linkDrive:
			"https://drive.google.com/drive/folders/1BNV9GQAVJcZpUcV6HLwzfjE6e9cWvwQe?usp=sharing",
		createAt: "2020-07-25T14:10:26.113Z",
	},
	{
		id: 6,
		projectName: "Project name 5",
		user: {
			id: 5,
			avatar:
				"https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Le Tien Dat",
			email: "Dat1lit@gmail.com",
		},
		status: "training",
		progress: 0,
		linkDrive:
			"https://drive.google.com/drive/folders/1BNV9GQAVJcZpUcV6HLwzfjE6e9cWvwQe?usp=sharing",
		createAt: "2020-07-25T14:10:26.113Z",
	},
	{
		id: 7,
		projectName: "Project name 5",
		user: {
			id: 5,
			avatar:
				"https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Le Tien Dat",
			email: "Dat1lit@gmail.com",
		},
		status: "training",
		progress: 0,
		linkDrive:
			"https://drive.google.com/drive/folders/1BNV9GQAVJcZpUcV6HLwzfjE6e9cWvwQe?usp=sharing",
		createAt: "2020-07-25T14:10:26.113Z",
	},
	{
		id: 8,
		projectName: "Project name 5",
		user: {
			id: 5,
			avatar:
				"https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Le Tien Dat",
			email: "Dat1lit@gmail.com",
		},
		status: "training",
		progress: 0,
		linkDrive:
			"https://drive.google.com/drive/folders/1BNV9GQAVJcZpUcV6HLwzfjE6e9cWvwQe?usp=sharing",
		createAt: "2020-07-25T14:10:26.113Z",
	},
	{
		id: 9,
		projectName: "Project name 5",
		user: {
			id: 5,
			avatar:
				"https://khoinguonsangtao.vn/wp-content/uploads/2022/08/hinh-nen-ronaldo-1.jpg",
			username: "Le Tien Dat",
			email: "Dat1lit@gmail.com",
		},
		status: "training",
		progress: 0,
		linkDrive:
			"https://drive.google.com/drive/folders/1BNV9GQAVJcZpUcV6HLwzfjE6e9cWvwQe?usp=sharing",
		createAt: "2020-07-25T14:10:26.113Z",
	},
];

function getRandomNumberInRange (a, b) {
	const randomNumber = Math.floor(Math.random() * (b - a + 1)) + a;

	return randomNumber;
}

io.on('connection', (socket) => {
	socket.emit('initialProjects', projects);

	const updateRandomNumbers = () => {
		const randomIndex = Math.floor(Math.random() * projects.length);
		projects.forEach((project, index) => {
			if (randomIndex === index) {
				if (project.progress === 100) {
					return;
				}
				project.progress = getRandomNumberInRange(project.progress, 100)
			}
			return;


		});
		io.emit('updateProjects', projects);
	};

	setInterval(updateRandomNumbers, 3000);
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const fs = require('fs');
const path = require('path');

const SAVE_PATH = path.join(__dirname, 'mock_users.json');

const getMockUsers = () => {
    try {
        if (!fs.existsSync(SAVE_PATH)) return [];
        const data = fs.readFileSync(SAVE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        console.error('Error reading mock users:', e);
        return [];
    }
};

const saveMockUser = (user) => {
    try {
        const users = getMockUsers();
        const index = users.findIndex(u => u.email === user.email);
        if (index >= 0) {
            users[index] = { ...users[index], ...user };
        } else {
            users.push({ ...user, id: Date.now() });
        }
        fs.writeFileSync(SAVE_PATH, JSON.stringify(users, null, 2));
        return users[index >= 0 ? index : users.length - 1];
    } catch (e) {
        console.error('Error saving mock user:', e);
        return user;
    }
};

module.exports = { getMockUsers, saveMockUser };

const { User } = require('../src/database/models');
async function test() {
    try {
        const user = await User.create({
            firstName: 'Test',
            lastName: 'User',
            email: 'test' + Date.now() + '@example.com',
            password: 'Password123!',
            role: 'user'
        });
        console.log('User created:', user.id);
    } catch (e) {
        console.error('Error creating user:', e.errors ? e.errors.map(err => err.message) : e.message);
    }
    process.exit();
}
test();

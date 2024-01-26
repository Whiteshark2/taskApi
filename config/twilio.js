const cron=require('node-cron')
const moment=require('moment')
const Twilio = require('twilio');
const Task=require('../model/task')
const User=require('../model/user')

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioClient = new Twilio(accountSid, authToken);
// updating task priority based on due date in DB
// runs per minute
cron.schedule('* * * * *', async () => {
    try {
        const today = moment().startOf('day');
        const tomorrow = moment(today).add(1, 'day');
        const tasksToUpdate = await Task.find({
            due_date: {
                $gte: today.toDate(),
                $lt: tomorrow.toDate(),
            },
        });

        for (const task of tasksToUpdate) {
            task.priority = calculatePriority(moment(task.due_date));
            await task.save();
        }

        console.log('Task priorities updated successfully.');
    } catch (error) {
        console.error('Error updating task priorities:', error);
    }
});

//calling user based on priority User
// runs on per 5minute
cron.schedule('*/5 * * * *', async () => {
    try {
        const users = await User.find().sort({ priority: 1});

        for (const user of users) {
            const tasksToCall = await Task.find({
                user: user._id,
                status: 'todo',
                due_date: { $lt: new Date() },
            });

            if (tasksToCall.length > 0) {
                await makeVoiceCall(user.phone);
                console.log(`Voice call made to user ${user.phone}.`);
                break; 
            }
        }

        console.log('Voice calls completed.');
    } catch (error) {
        console.error('Error making voice calls:', error);
    } finally {
        
    }
});


function calculatePriority(dueDate) {
    const today = moment().startOf('day');
    const diffInDays = dueDate.diff(today, 'days');

    if (diffInDays === 0) {
        return 0;
    } else if (diffInDays >= 1 && diffInDays <= 2) {
        return 1; 
    } else if (diffInDays >= 3 && diffInDays <= 4) {
        return 2; 
    } else {
        return 3; 
    }
}

async function makeVoiceCall(phoneNumber) {
    
    try {
        const call = await twilioClient.calls.create({
            to: phoneNumber,
            from:'+12408216760',
            url: 'http://demo.twilio.com/docs/voice.xml', 
        });

        console.log('Call SID:', call.sid);
    } catch (error) {
        console.error('Error making voice call:', error);
    }
}

module.exports = cron;

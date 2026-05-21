import inngest from '../inngest/client.js';

// export const sendNewsletterJob = inngest.createFunction(
// 	{ id: 'send-newsletter', name: 'Send Newsletter' },
// 	{ cron: '0 9 * * 5' }, // Every Friday at 9:00 AM
// 	async ({ event, step }) => {
// 		// get recent  newsletters from db
// 		// get user from db
// 		// const users = [
// 		// 	{ name: 'lios', email: 'lois@gmail.com' },
// 		// 	{ name: 'lios', email: 'lois@gmail.com' },
// 		// ];
// 		// // loop through it
// 		// for (const user of users) {
// 		// 	const emailContent = `
// 		//     <h1>Weekly Newsletter</h1>
// 		//     <p>Hello ${user.name},</p>
// 		//     <p>Here is your weekly update!</p>
// 		// `;

// 		// 	await sendEmail({
// 		// 		to: user.email,
// 		// 		subject: 'Your Weekly Newsletter',
// 		// 		body: emailContent,
// 		// 	});
// 		// }

// 		//use steps than the above code to make your job rebust
// 		// Step 1: Fetch users
// 		const users = await step.run('fetch-users', async () => {
// 			// fetch users from DB
// 			return [{ name: 'lios', email: 'lois@gmail.com' }];
// 		});

// 		// Step 2: Send emails
// 		await step.run('send-emails', async () => {
// 			for (const user of users) {
// 				const emailContent = `
//           <h1>Weekly Newsletter</h1>
//           <p>Hello ${user.name},</p>
//           <p>Here is your weekly update!</p>
//         `;
// 				try {
// 					await sendEmail({
// 						to: user.email,
// 						subject: 'Your Weekly Newsletter',
// 						body: emailContent,
// 					});
// 				} catch (err) {
// 					// Log or handle error
// 					console.error(`Failed to send to ${user.email}:`, err);
// 				}
// 			}
// 		});
// 	}
// );

// BATCHING IF YOU HAVE TOO MUCH EMAIL TO AVOID HITING RATE LIMIT

// import inngest from '../inngest/client.js';
// // import your sendEmail function
// // import { sendEmail } from '../utils/email.js';

// function chunkArray(array, size) {
// 	const result = [];
// 	for (let i = 0; i < array.length; i += size) {
// 		result.push(array.slice(i, i + size));
// 	}
// 	return result;
// }

// export const sendNewsletterJob = inngest.createFunction(
// 	{ id: 'send-newsletter', name: 'Send Newsletter' },
// 	{ cron: '0 9 * * 5' }, // Every Friday at 9:00 AM
// 	async ({ event, step }) => {
// 		// Step 1: Fetch users
// 		const users = await step.run('fetch-users', async () => {
// 			// fetch users from DB
// 			return [{ name: 'lios', email: 'lois@gmail.com' }]; // Replace with real DB fetch
// 		});

// 		const batchSize = 50;
// 		const userBatches = chunkArray(users, batchSize);

// 		// Step 2: Send emails in batches
// 		for (let i = 0; i < userBatches.length; i++) {
// 			await step.run(`send-emails-batch-${i + 1}`, async () => {
// 				const batch = userBatches[i];
// 				await Promise.all(
// 					batch.map(async (user) => {
// 						const emailContent = `
//                             <h1>Weekly Newsletter</h1>
//                             <p>Hello ${user.name},</p>
//                             <p>Here is your weekly update!</p>
//                         `;
// 						try {
// 							await sendEmail({
// 								to: user.email,
// 								subject: 'Your Weekly Newsletter',
// 								body: emailContent,
// 							});
// 						} catch (err) {
// 							console.error(`Failed to send to ${user.email}:`, err);
// 						}
// 					})
// 				);
// 			});
// 		}
// 	}
// );

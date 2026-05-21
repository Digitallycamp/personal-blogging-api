import { Inngest } from 'inngest';

const inngest = new Inngest({
	name: 'Newsletter Job Scheduler',
	region: 'us1', // Specify your region
	apiKey: process.env.INNGEST_API_KEY, // Ensure you have your API key in .env
});

export default inngest;

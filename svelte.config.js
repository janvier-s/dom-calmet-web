import adapter from '@sveltejs/adapter-cloudflare';

export default { 
    kit: { 
        adapter: adapter(),
        prerender: {
            handleMissingId: 'ignore',
            handleHttpError: 'warn'
        }
    } 
};

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://gmn-95.github.io',
	base: '/ctrl-s',
	integrations: [
		starlight({
			title: 'Ctrl+S',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/gmn-95',
				},
			],
			logo: {
				src: './src/assets/logo/Logo.png',
				alt: 'Ctrl+S',
				replacesTitle: true,
			},
			favicon: '/logo-icon.png',
			sidebar: [
				{
					label: 'DevOps',
					items: [{ autogenerate: { directory: 'devops' } }],
				},
				{
					label: 'Linux',
					items: [{ autogenerate: { directory: 'linux' } }],
				},
				{
					label: 'Infraestrutura',
					items: [{ autogenerate: { directory: 'infraestrutura' } }],
				},
				{
					label: 'Referências',
					items: [{ autogenerate: { directory: 'referencias' } }],
				},
			],
		}),
	],
});

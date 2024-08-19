import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

import './typewriter'

export default function HomeHero() {
	useEffect(() => {
		var app = document.getElementById('typewriter');

		var typewriter: any = new (window as any).Typewriter(app, {
			loop: true,
			delay: 50,
			deleteSpeed: 50,
			skipAddStyles: true
		});
		
		typewriter.typeString('sin vueltas')
			.pauseFor(2500)
			.deleteAll()
			.typeString('fácilmente')
			.pauseFor(2500)
			.deleteAll()
			.typeString('hoy mismo')
			.pauseFor(2500)
			.deleteAll()
			.typeString('via API')
			.pauseFor(2500)
			.deleteAll()
			.typeString('con PHP')
			.pauseFor(2500)
			.deleteAll()
			.typeString('con Python')
			.pauseFor(2500)
			.deleteAll()
			.typeString('con Node')
			.pauseFor(2500)
			.deleteAll()
			.typeString('con Ruby')
			.pauseFor(2500)
			.start();
	}, []);

	return (
		<>
			<h1
			className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-6xl !leading-[1.1] text-balance"
			>
			Conectate a <br />AFIP&nbsp;<span id="typewriter" className="text-gradient_indigo-purple">sin vueltas</span>
			</h1>

			<p
			className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 text-balance"
			>
			Certificados, codigo, tutoriales, soporte, todo lo que necesitas 
			para usar los web services de AFIP en un solo lugar.
			</p>

			<div className="flex items-center gap-x-2" slot="right-header">
			<a
				href={siteConfig.links.sdkPython}
				target="_blank"
				rel="noreferrer"
				aria-label="python sdk"
			>
				<img className="w-[40px] h-[40px]" src="/images/icons/python.svg" alt="python" />
			</a>
			<a
				href={siteConfig.links.sdkJs}
				target="_blank"
				rel="noreferrer"
				aria-label="js sdk"
			>
				<img className="w-[40px] h-[40px]" src="/images/icons/js.svg" alt="js" />
			</a>
			<a
				href={siteConfig.links.sdkPhp}
				target="_blank"
				rel="noreferrer"
				aria-label="php sdk"
			>
				<img className="w-[40px] h-[40px]" src="/images/icons/php.svg" alt="php" />
			</a>
			<a
				href={siteConfig.links.sdkRuby}
				target="_blank"
				rel="noreferrer"
				aria-label="ruby sdk"
			>
				<img className="w-[40px] h-[40px]" src="/images/icons/ruby.svg" alt="ruby" />
			</a>
			<a
				href={siteConfig.links.docs}
				target="_blank"
				rel="noreferrer"
				aria-label="api docs"
			>
				<img className="w-[46px] h-[20px]" src="/images/icons/api.svg" alt="api" />
			</a>
			</div>

			<div className="flex items-left lg:items-center space-y-4 flex-col lg:flex-row lg:space-x-4 lg:space-y-0">
				<a
					href={siteConfig.links.docs}
					target="_blank"
					rel="noreferrer"
					aria-label="documentacion"
					className={'w-fit ' + cn(buttonVariants({ size: "lg" }))}
				>
					Comenzar gratis
				</a><a
					href={siteConfig.links.discord}
					target="_blank"
					rel="noreferrer"
					aria-label="documentacion"
					className={'w-fit ' + cn(buttonVariants({ size: "lg", variant: 'secondary' }))}
				>
					<svg className="h-[20px]"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor"><path fill="currentColor" d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg>
					&nbsp;Comunidad Afip SDK
				</a>
			</div>
		</>
	)
}

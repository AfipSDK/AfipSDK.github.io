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
				<img className="w-[40px]" src="/images/icons/python.svg" alt="python" />
			</a>
			<a
				href={siteConfig.links.sdkJs}
				target="_blank"
				rel="noreferrer"
				aria-label="js sdk"
			>
				<img className="w-[40px]" src="/images/icons/js.svg" alt="js" />
			</a>
			<a
				href={siteConfig.links.sdkPhp}
				target="_blank"
				rel="noreferrer"
				aria-label="php sdk"
			>
				<img className="w-[40px]" src="/images/icons/php.svg" alt="php" />
			</a>
			<a
				href={siteConfig.links.sdkRuby}
				target="_blank"
				rel="noreferrer"
				aria-label="ruby sdk"
			>
				<img className="w-[40px]" src="/images/icons/ruby.svg" alt="ruby" />
			</a>
			<a
				href={siteConfig.links.docs}
				target="_blank"
				rel="noreferrer"
				aria-label="api docs"
			>
				<img className="h-[20px]" src="/images/icons/api.svg" alt="api" />
			</a>
			</div>

			<div className="flex items-center space-x-2 md:space-x-4">
			<a
				href={siteConfig.links.docs}
				target="_blank"
				rel="noreferrer"
				aria-label="documentacion"
				className={cn(buttonVariants({ size: "lg" }))}
			>
				Comenzar gratis
			</a>
			</div>
		</>
	)
}

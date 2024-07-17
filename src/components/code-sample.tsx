import { useEffect, useState } from "react";

import './prism';

export default function CodeSample() {
	const [activeLang, setActiveLang] = useState<'js'|'php'|'ruby'|'python'|'api'>('js');

	useEffect(() => {
		(window as any).Prism.highlightAll();
	}, []);

	return (
		<div className="hero-figure anime-element">
			<svg
				className="placeholder"
				width="528"
				height="396"
				viewBox="0 0 528 396"
			>
				<rect width="528" height="396" style={{fill: 'transparent'}} />
			</svg>
			<div
				className="hero-figure-box hero-figure-box-01"
				data-rotation="45deg"
			></div>
			<div
				className="hero-figure-box hero-figure-box-02"
				data-rotation="-45deg"
			></div>
			<div
				className="hero-figure-box hero-figure-box-03"
				data-rotation="0deg"
			></div>
			<div
				className="hero-figure-box hero-figure-box-04"
				data-rotation="-135deg"
			></div>
			<div className="hero-figure-box hero-figure-box-05"></div>
			<div className="hero-figure-box hero-figure-box-06"></div>
			<div className="hero-figure-box hero-figure-box-07"></div>
			<div
				className="hero-figure-box hero-figure-box-08"
				data-rotation="-22deg"
			></div>
			<div
				className="hero-figure-box hero-figure-box-09"
				data-rotation="-52deg"
			></div>
			<div
				className="hero-figure-box hero-figure-box-10"
				data-rotation="-50deg"
			></div>
			<div className="code-sample hero-figure-box hero-figure-box-code">
				<div className="code-tabs">
					<div className="tabs">
						<div className={`${activeLang === 'js' && 'active'}`} onClick={() => setActiveLang('js')}>
						<img className="max-w-[20px]" src="/images/icons/js.svg" alt="js" /><span className="file">Factura.js</span>
						</div>
						<div className={`${activeLang === 'php' && 'active'}`} onClick={() => setActiveLang('php')}>
						<img className="max-w-[20px]" src="/images/icons/php.svg" alt="php" /><span className="file">Factura.php</span>
						</div>
						<div className={`${activeLang === 'ruby' && 'active'}`} onClick={() => setActiveLang('ruby')}>
						<img className="max-w-[20px]" src="/images/icons/ruby.svg" alt="ruby" /><span className="file">Factura.rb</span>
						</div>
						<div className={`${activeLang === 'python' && 'active'}`} onClick={() => setActiveLang('python')}>
						<img className="max-w-[20px]" src="/images/icons/python.svg" alt="python" /><span className="file">Factura.py</span>
						</div>
						<div className={`${activeLang === 'api' && 'active'}`} onClick={() => setActiveLang('api')}>
						<img className="max-w-[20px]" src="/images/icons/api.svg" alt="api" /><span className="file">Factura</span>
						</div>
					</div>
					<pre className={`line-numbers language-js ${activeLang === 'js' && 'active'}`} style={{whiteSpace: 'pre-wrap'}}>
						<code>
						{`
						const Afip = require('@afipsdk/afip.js');

						const afip = new Afip({ CUIT: 20409378472 });

						const data = {
							'PtoVta' 	: 1,  // Punto de venta
							'CbteTipo' 	: 6,  // Tipo de comprobante
							'ImpTotal' 	: 121, // Importe total
							// ... etc.
						};

						const res = await afip.ElectronicBilling.createVoucher(data);

						console.log({ 
							'cae' : res['CAE'], 
							'vencimiento' : res['CAEFchVto'] 
						});
						`}

						</code>
					</pre>
					<pre className={`line-numbers language-php ${activeLang === 'php' && 'active'}`} style={{whiteSpace: 'pre-wrap'}}>
						<code>
						{`
						use Afip;

						$afip = new Afip(array('CUIT' => 20409378472));

						$data = array(
							'PtoVta' 	=> 1, // Punto de venta
							'CbteTipo' 	=> 6, // Tipo de comprobante
							'ImpTotal' 	=> 121, // Importe total
							// ... etc.
						);

						$res = $afip->ElectronicBilling->CreateVoucher($data);

						var_dump(array(
							'cae' => $res['CAE'], 
							'vencimiento' => $res['CAEFchVto']
						));
						`}

						</code>
					</pre>
					<pre className={`line-numbers language-ruby ${activeLang === 'ruby' && 'active'}`} style={{whiteSpace: 'pre-wrap'}}>
						<code>
						{`
						require "afip"

						afip = Afip.new({ "CUIT": 20409378472 })

						data = {
							"PtoVta": 1, # Punto de venta
							"CbteTipo": 6, # Tipo de comprobante
							"ImpTotal": 121, # Importe total
							# ... etc.
						}

						res = afip.ElectronicBilling.createVoucher(data)

						puts {
							"cae": res["CAE"], 
							"vencimiento": res["CAEFchVto"]
						}
						`}

						</code>
					</pre>
					<pre className={`line-numbers language-python ${activeLang === 'python' && 'active'}`} style={{whiteSpace: 'pre-wrap'}}>
						<code>
						{`
						from afip import Afip

						afip = Afip({ "CUIT": 20409378472 })

						data = {
							"PtoVta": 1, # Punto de venta
							"CbteTipo": 6, # Tipo de comprobante
							"ImpTotal": 121, # Importe total
							# ... etc.
						}

						res = afip.ElectronicBilling.createVoucher(data)

						print({
							"cae": res["CAE"], 
							"vencimiento": res["CAEFchVto"]
						})
						`}

						</code>
					</pre>
					<pre className={`line-numbers language-shell ${activeLang === 'api' && 'active'}`} style={{whiteSpace: 'pre-wrap'}}>
						<code>
						{`
						curl --location 'https://app.afipsdk.com/api/v1/afip/requests' \\
						--data '{
							"environment": "dev",
							"method": "FECAESolicitar",
							"wsid": "wsfe",
							"params": {
								"FeCAEReq" : {
									"FeDetReq" : { 
										"FECAEDetRequest" : {
											"CbteFch" : 20240313,
											"ImpTotal" : 121,
											...
										}
									}
								}
							}
						}'
						`}
						</code>
					</pre>
				</div>
			</div>
		</div>
	)
}

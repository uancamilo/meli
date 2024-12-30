import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Index = () => {
	const [productData, setProductData] = useState(null);
	const router = useRouter();

	// Obtener el producto
	const solicitudProducto = async (access_data) => {
		try {
			const accessToken = access_data?.access_token;
			const itemIds = "MCO1307136367"; // ID del producto
			//Petición GET a la API de Mercado Libre
			const response = await fetch(
				`https://api.mercadolibre.com/items?ids=${itemIds}`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					redirect: "follow",
				}
			);

			const data = await response.json();
			if (response.ok) {
				setProductData(data);
			} else {
				console.log(`Error ${response.status}: ${data.message}`);
				if (response.status === 401) solicitudAcceso();
			}
		} catch (error) {
			console.error("Error al realizar la petición:", error);
		}
	};

	// Solicitar acceso
	const solicitudAcceso = async () => {
		try {
			if (typeof window === "undefined") {
				console.error("El entorno no es un navegador.");
				return;
			}
			const code = new URLSearchParams(window.location.search).get("code");

			if (code) {
				// Crear encabezados
				const myHeaders = new Headers();
				myHeaders.append("Accept", "application/json");
				myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

				// Crear cuerpo de la solicitud
				const urlencoded = new URLSearchParams();
				urlencoded.append("grant_type", "authorization_code");
				urlencoded.append("client_id", process.env.NEXT_PUBLIC_APP_ID);
				urlencoded.append("client_secret", process.env.NEXT_PUBLIC_SECRET_KEY);
				urlencoded.append("code", code);
				urlencoded.append("redirect_uri", process.env.NEXT_PUBLIC_REDIRECT_URI);

				// Opciones de la solicitud
				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: urlencoded,
					redirect: "follow",
				};

				// Realizar la solicitud
				const response = await fetch(
					"https://api.mercadolibre.com/oauth/token",
					requestOptions
				);
				const data = await response.json();

				if (response.ok) {
					// Guardar datos en localStorage y redirigir
					localStorage.setItem("access_data", JSON.stringify(data));
					router.push("/"); // Redirige a la página principal
				} else {
					// Manejo de errores
					console.error(
						`Error ${response.status}: ${
							data?.message || "Ocurrió un error inesperado."
						}`
					);
				}
			} else {
				console.error("No se encontró un código en la URL.");
				redirecionAuth();
			}
		} catch (error) {
			console.error("Error al realizar la petición:", error);
		}
	};

	//Redirigir a la autorización
	const redirecionAuth = () => {
		const authUrl = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${process.env.NEXT_PUBLIC_APP_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`;
		window.location.href = authUrl;
	};

	useEffect(() => {
		try {
			const accessData = localStorage.getItem("access_data");
			if (accessData) {
				const access_data = JSON.parse(accessData);
				solicitudProducto(access_data);
			} else {
				solicitudAcceso();
			}
		} catch (error) {
			console.error("Error parsing access_data from localStorage", error);
		}
	}, []);

	return (
		<div>
			{productData ? (
				<>
					<div className="container mx-auto p-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-blue-500 text-white p-4">
								<h2 className="text-lg font-bold">Columna 1</h2>
								<p>Contenido de la primera columna.</p>
							</div>
							<div>
								<h1>{productData[0]?.body.title}</h1>
								<pre>{JSON.stringify(productData, null, 2)}</pre>
							</div>
						</div>
					</div>
				</>
			) : (
				<p>Cargando datos del producto...</p>
			)}
		</div>
	);
};

export default Index;

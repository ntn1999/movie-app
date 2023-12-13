function Footer() {
	return (
		<footer className="bg-gray-300">
			<div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div className="flex justify-center text-teal-600 sm:justify-start">
						<img
							src="https://fptsoftware.com/-/media/project/fpt-software/fso/systems/logo/logo.svg?as=1&iar=0&extension=webp&modified=20230519141554&hash=A28FD0836414E4F10707ECCC57D396B2"
							alt=""
						/>
					</div>

					<p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
						Copyright &copy; 2024. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

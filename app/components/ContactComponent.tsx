import Image from "next/image"
import React from "react"

const ContactComponent: React.FC = () => {
	return (
		<div>
			<section
				className='h-[80vh] lg:h-[912px] bg-cover  bg-center bg-no-repeat '
				style={{ backgroundImage: `url(/images/breadcrumb-bg.jpg)` }}>
				<div
					className='container mx-auto flex    justify-center items-center text-white
				font-extrabold text-2xl md:text-5xl lg:text-8xl  h-full'>
					Contact
				</div>
			</section>

			<section className='contact-widget spad bg-yellow-950 h-96'>
				<div className='container mx-auto'>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						<div className='contact__widget__item text-center mt-40'>
							<div className='contact__widget__item__icon'>
								<i className='fa text-white fa-phone text-2xl'></i>
							</div>
							<div className='contact__widget__item__text'>
								<h4 className='font-semibold text-white'>Telefon</h4>
								<a
									href='tel:+387644432644'
									className='text-blue-500'>
									+387644432644
								</a>
							</div>
						</div>
						<div className='contact__widget__item text-center mt-40'>
							<div className='contact__widget__item__icon'>
								<i className='fa fa-map-marker text-2xl text-white'></i>
							</div>
							<div className='contact__widget__item__text'>
								<h4 className='font-semibold text-white'>Email</h4>
								<a
									href='mailto:denisjakubec@hotmail.com'
									className='text-blue-500'>
									denisjakubec@hotmail.com
								</a>
							</div>
						</div>
						<div className='contact__widget__item text-center mt-40'>
							<div className='contact__widget__item__icon'>
								<i className='fa fa-map-marker text-2xl text-white'></i>
							</div>
							<div className='contact__widget__item__text'>
								<h4 className='font-semibold text-white'>GitHub</h4>
								<a
									href='https://github.com/JDenny0'
									className='text-blue-500'>
									https://github.com/JDenny0
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>

			<footer className='footer bg-yellow-950 text-white'>
				<div className='container mx-auto py-6 text-center '>
					<div className='footer__top '>
						<div className='footer__top__logo flex justify-center items-center mb-8 border-solid border-b-white'>
							<a href='#'>
								<Image
									src='/images/logo/PhotographyLogo.png'
									alt='Logo'
									width={200}
									height={50}
									className='  w-52 h-6'
								/>
							</a>
						</div>
					</div>
					<div className='footer__copyright mt-4'>
						<p>
							&copy; {new Date().getFullYear()} Denis Photography. All rights
							reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default ContactComponent

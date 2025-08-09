import React from 'react'


interface PersoneCardProps {
	imageUrl: string;
	name: string;
	imageSize?: 'sm' | 'md' | 'lg';
}

const PersonCard: React.FC<PersoneCardProps> = ({ imageUrl, name, imageSize = 'sm' }) => {
	const sizeClasses = {
		sm: 'w-12 h-12',
		md: 'w-16 h-16',
		lg: 'w-20 h-20',
	};

	return (
		<>
			<div className="flex flex-col items-center space-y-2">
				<div className={`rounded-full overflow-hidden ${sizeClasses[imageSize]}`}>
					<img
						src={imageUrl}
						alt={name}
						className="w-full h-full object-cover"
					/>
				</div>
				<p className="text-center font-medium text-white">{name}</p>
			</div>
		</>
	)
}

export default PersonCard
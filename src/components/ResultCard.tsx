import {
	ArrowForwardIcon,
	ArrowRightIcon,
	EmailIcon,
	PhoneIcon,
} from '@chakra-ui/icons'
import {
	Avatar,
	HStack,
	Text,
	Box,
	VStack,
	IconButton,
	Circle,
} from '@chakra-ui/react'

export default function ResultCard() {
	return (
		<HStack mb={3} bg='white' shadow='xl' p={5} spacing={3} borderRadius='xl'>
			<Circle p={1} bg='teal.300'>
				<Avatar src='' alt='SY' size='lg' />
			</Circle>
			<VStack color='black' alignItems='flex-start' spacing='1'>
				<Text as='h4' fontWeight='bold'>
					{' '}
					Shalom Chioma
				</Text>
				<Text as='p' color='gray.600' fontSize='0.9rem'>
					{' '}
					45, church street alapere, ketu
				</Text>
				<HStack color='gray.400' justifyContent='space-between' flexWrap='wrap'>
					<HStack>
						<EmailIcon />
						<Text as='p' fontSize='0.9rem'>
							Yusuphshamsondeen@gmail.com
						</Text>
					</HStack>
					<HStack>
						<PhoneIcon />
						<Text fontSize='0.9rem'>07011359405</Text>
					</HStack>
					<IconButton
						shadow='xl'
						aria-label='view results'
						alignSelf='flex-end'
						colorScheme='teal'
						transition='all .3s'
						icon={<ArrowForwardIcon color='white' />}
						_hover={{ shadow: '2xl', transform: 'scale(1.1)' }}
					/>
				</HStack>
			</VStack>
		</HStack>
	)
}
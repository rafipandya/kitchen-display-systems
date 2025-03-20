import Items from '@/components/shared/Items'
import { Box, Grid2 } from '@mui/material'
import React from 'react'

function page() {
    return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
		  		{Array.from(Array(4)).map((_, index) => (
				<Grid2 key={index} size={{ xs: 2, sm: 4, md: 3 }}>
					<Items />
				</Grid2>
			))}
			</Grid2>
	  	</Box>
    )
}

export default page
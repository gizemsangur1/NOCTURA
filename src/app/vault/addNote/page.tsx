import { Button, Grid, TextField } from '@mui/material'
import React from 'react'

export default function AddNote() {
  return (
	<Grid container sx={{marginTop:10,width:"100%",border:"1px solid white",padding:"10px"}}>
		<Grid size={12} sx={{width:"100%"}}>
			<TextField multiline sx={{width:"100%"}}/>
		</Grid>
		<Button>SAVE</Button>
	</Grid>
  )
}

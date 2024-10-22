import React from 'react'
import { Skeleton, SkeletonCircle, SkeletonTex,Stack } from '@chakra-ui/react'


export const ProfileBreating = () => {
  return (
<>
<Stack w={"65%"} margin="auto">
  <Skeleton height='200px'/>
  <Skeleton height='20px'/>
  <Skeleton height='20px'/>
  <Skeleton height='20px'/>
  <Skeleton height='20px'/>
  <Skeleton height='20px'/>
</Stack>
</>
  )
}

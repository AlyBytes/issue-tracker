import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren, ReactNode } from 'react'

// interface Props{                     //we have type that defines the shape 
//     children: ReactNode
// }
// const ErrorMessage = (props: Props) => {
//   return (
//     <div>ErrorMessage</div>
//   )
// } --->instead we use propsWithChildren


const ErrorMessage = ({children}: PropsWithChildren) => {
    if(!children) return null;
    return (
    //   <div>ErrorMessage</div>
    <Text color="red" as='p'>{children}</Text>
    )
  }


export default ErrorMessage
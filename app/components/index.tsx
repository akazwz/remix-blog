import styled from 'styled-components'

export type FlexBoxProps = Partial<{
  alignItems: string
  justifyContent: string
  flexDirection: string
}>

export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
`
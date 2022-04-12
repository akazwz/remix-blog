import styled from 'styled-components'

export type FlexProps = Partial<{
  alignItems: string
}>

export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
`
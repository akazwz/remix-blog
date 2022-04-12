import styled from 'styled-components'
import { Property } from 'csstype'
import FlexDirection = Property.FlexDirection
import JustifyContent = Property.JustifyContent
import AlignItems = Property.AlignItems

export type FlexBoxProps = Partial<{
  alignItems: AlignItems
  justifyContent: JustifyContent
  flexDirection: FlexDirection
}>

export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
`
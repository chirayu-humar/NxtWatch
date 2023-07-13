import styled from 'styled-components'

const OuterHome = styled.div`
  min-height: 100vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${props => (props.isDark ? '#181818' : '#f9f9f9')};
`

export default OuterHome

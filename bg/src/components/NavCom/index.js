import styled from 'styled-components'
export const NavComWrapper = styled.div`
background-color:#fff;
margin-top:1rem;
padding:0 2rem;
padding-bottom:1rem;
.tabItem{
    padding:.2rem;
    color:#888;
    cursor: pointer;
}
.tabItem:hover{
    background-color:#f7f7f7 ;
}
.active{
    display:block;
    background-color:#f7f7f7 ;
    /* color:#000 !important; */
}
`
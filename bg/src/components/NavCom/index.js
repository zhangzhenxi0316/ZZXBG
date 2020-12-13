import styled from 'styled-components'
export const NavComWrapper = styled.div`
background-color:#20232a ;
margin-top:1rem;
padding:0 5rem;
padding-bottom:1rem;
border-radius:.5rem;
/* text-align:center; */
.tabItem{
    padding:.2rem;
    color:#fff;
    cursor: pointer;
}
.tabItem:hover{
    background-color:black ;
}
.active{
    display:block;
    background-color:#f7f7f7 ;
    /* color:#000 !important; */
}
.ant-tabs-tabpane {
    max-height:300px;
    overflow-x: hidden;
    overflow-y: scroll;
}
.ant-tabs-tabpane::-webkit-scrollbar {
        display: none;
    }
.footer{
    color:#888;
    font-style: italic;
    text-align:center;
    margin-top:1rem;
    cursor: pointer;
}
`
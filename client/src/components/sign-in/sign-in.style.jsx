import styled from 'styled-components';

export const SignInContainer = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;

    .buttons{
        display: flex;
        justify-content: space-between;
    }

    @media screen and (max-width:800px){
     width:280px;

     .buttons{
         display:grid;
         padding-top:20px;
     }
    }
`;

export const TitleContainer = styled.h2`
     margin: 10px 0;
`;
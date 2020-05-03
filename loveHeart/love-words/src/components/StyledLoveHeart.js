import styled from 'styled-components';

const StyledWrapper = styled.div`
  .heart {
    animation:heartbeat 1s infinite;
    -webkit-animation:heartbeat 1s infinite;
    width:5rem;
    height:5rem;
    background:#f4b0f3;
    position:fixed;
    filter:drop-shadow(0px 0px 20px #f4b0f3);
    transform: rotate(45deg);
    left:50%;
    top:50%;
    margin-top:-12rem;
    margin-left:-2.5rem;
    color:#fff;
  }
  .heart:before,.heart:after {
    content:"";
    position:absolute;
    width:5rem;
    height:5rem;
    background:#f4b0f3;
    border-radius:2.5rem;
  }
  .heart:before {
    left:-3rem;
  }
  .heart:after {
    left:0;
    top:-3rem;
  }
  @keyframes heartbeat {
    0% {
      transform:rotate(45deg) scale(0.8,0.8);
      opacity:1;
    }
    25% {
      transform:rotate(45deg) scale(1,1);
      opacity:0.8;
    }
    100% {
      transform:rotate(45deg) scale(0.8,0.8);
      opacity:1;
    }
  }
`;
export default StyledWrapper;

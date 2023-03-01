import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;500;600;700;800&family=Nunito+Sans:wght@300;400;600;700;800&display=swap');

/* *::-webkit-scrollbar-track{
	-webkit-box-shadow: inset 0 0 6px 12px rgba(0,0,0,0.08);
	border-radius: 8px;
	background-color: #FeFeFe;
} */



*.dark::-webkit-scrollbar {
  width: 7px;
}

*::-webkit-scrollbar {
  width: 7px;
}

*::-webkit-scrollbar-track {
  background: inherit;
}

*::-webkit-scrollbar-thumb {
  background-color: inherit;
  border-radius: 4px;
  border: 3px solid gray;
  background-color : gray;
}

*{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    scroll-behavior: smooth;
    font-family: 'Manrope', sans-serif;
}
html{
  scroll-behavior: smooth;

}
#root{
    margin:0 auto;
}

h1,h2,h3,h4,h5,h6,p{
  padding: 0;margin: 0
}

h1{ 
  font-size:32px !important;
}

h2{ font-size:24px !important;}


h4{ font-size:18px !important; font-weight:bold !important}

h5{ font-size:16px !important; font-weight:500 !important}
h6{ font-size:12px !important; font-weight:700 !important}


button{
  font-size:14px !important;
  font-weight:600 !important;
}
body{
  width:100vw
  height: 100vh;
  overflow-y:hidden;
  font-size:1rem;


}

label { 
  font-size:0.8rem;
}

p {
  margin:0.6rem 0;
  font-size:0.9rem
}
 
a{
  text-decoration:none;
  color: black
 }




/* text editor*/
.rs-picker-default .rs-picker-toggle.rs-btn {
    padding-top: 7px;
    padding-bottom: 7px;
    width: 282px;
    position: relative;
    margin-right: 16px;;

    @media(max-width: 768px){
      width:100%;
      display:none;
    }
}

/* picked date align */
.rs-picker-default .rs-picker-toggle {
    position: relative;
    padding-right: 67px;
    display: inline-block;
    outline: none;
    cursor: pointer;
    color: #575757;
    border: 1px solid #e5e5ea;
    padding-left: 44px;
    z-index:2000;

}
/* calander align */
.rs-picker-toggle-caret {
    display: inline-block;
    margin-: 240px;
    position: absolute;
    top: 8px;
    right: 12px;
    font-weight: 500;
    color: #8e8e93;
}

/* ok button style */
.rs-picker-toolbar-right-btn-ok { 
    text-align: center; 
    cursor: pointer;
    outline: 0 ; 
    border: none; 
    padding: 8px 12px; 
    font-size: 14px; 
    border-radius: 30px;
    color: #fff;
    background-color: #3498ff;
    width: 100px;
}


.rs-picker-menu .rs-calendar .rs-calendar-table-cell-content {
    padding-left: 0;
    padding-right: 0;
    border-radius: 21px;
    display: inline-block;
    position: relative;
    z-index:1000;
 
}

.label-btn{
    padding:0.5rem 1rem;
    border-radius:2px;
    margin-bottom:0.4rem;
    cursor: pointer;
    width:100%;
    font-size:14px;
    font-weight:medium;
    transition: all 0.5s ease-in-out;
    border: 0.1px solid #eee;

  }

.label-btn:hover{
    background:#f2f2f2;
  }

  @keyframes divanimation {
    from {
      width: 0%;
      opacity:0;
    }
    to {
      width: 100%;
      opacity:1;
    }
  }

  /*Input focus sticky top label*/
.form__input:not(:placeholder-shown).form__input:not(:focus)+ .form__label{
  top: -.5rem;
  left: .8rem;
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 10;
}
`;

export const PlacementWrapper = styled.div`
  animation: divanimation 0.6s;
  -webkit-animation: divanimation 0.6s;
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  transition: width 2s, height 4s;
`;

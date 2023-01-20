import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import GlobalCustomButton from "./components/buttons/CustomButton";
import {Typography} from "@mui/material";
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <NotFoundImageOverlay>
        <NotFoundImageContainer imageUrl="https://i.imgur.com/U3vTGjX.png" />

        <NotFoundImageText>404! PAGE NOT FOUND.</NotFoundImageText>

        <Typography
          sx={{
            fontsize: "0.8rem",
            margin: "1.5rem 0",
          }}
        >
          The page you're looking for has been removed, deleted or possibly
          never existed
        </Typography>

        <GlobalCustomButton onClick={() => navigate("/app")}>
          <HomeIcon fontSize="small" sx={{marginRight: "5px"}} />
          Go To Homepage
        </GlobalCustomButton>
      </NotFoundImageOverlay>
                        
    </>
  );
}

export const NotFoundImageOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const NotFoundImageContainer = styled.div`
  display: inline-block;
  background-image: ${({imageUrl}) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;
`;

export const NotFoundImageText = styled.h5`
  font-size: 28px;
  color: #004e98;
`;

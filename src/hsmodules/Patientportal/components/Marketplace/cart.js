import {
  Stack,
  Typography,
  CardMedia,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const removeCart = () => {};

const addToCart = () => {};

export default function Cart({cart}) {
  return (
    <Stack my="20px">
      <Card>
        <CardMedia
          component="img"
          width="30%"
          height="60px"
          image={cart?.img}
          alt={cart?.name}
        />
        <CardContent>
          <Stack>
            <Typography
              variant="p"
              fontSize="14px"
              fontWeight="semibold"
              color="text.secondary"
            >
              {cart?.name}
            </Typography>
          </Stack>
          <Stack>
            <Typography
              variant="p"
              fontSize="16px"
              fontWeight="bold"
              color="text.secondary"
            >
              {cart?.price}
            </Typography>
          </Stack>
        </CardContent>
        <Stack>
          <CardActions>
            <ButtonGroup>
              <Button
                aria-label="reduce"
                onClick={() => {
                  removeCart(cart);
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button
                aria-label="increase"
                onClick={() => {
                  addToCart(cart);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </CardActions>
        </Stack>
      </Card>
    </Stack>
  );
}

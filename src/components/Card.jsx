import { Box, useStyleConfig } from "@chakra-ui/react";



function Card(props) {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("Card", { variant });

  return (
    <Box __css={styles} {...rest} border="0PX SOLID RED" backgroundColor={"white"} margin="auto" height={"100%"} borderRadius="20px">
      {children}
    </Box>
  );
}

export default Card;